package com.bg7yoz.ft8cn.rigs;

import static com.bg7yoz.ft8cn.GeneralVariables.QUERY_FREQ_TIMEOUT;
import static com.bg7yoz.ft8cn.GeneralVariables.START_QUERY_FREQ_DELAY;

import android.os.Handler;
import android.util.Log;

import com.bg7yoz.ft8cn.GeneralVariables;
import com.bg7yoz.ft8cn.R;
import com.bg7yoz.ft8cn.database.ControlMode;
import com.bg7yoz.ft8cn.ui.ToastMessage;

import java.util.Timer;
import java.util.TimerTask;

import com.bg7yoz.ft8cn.rigs.common.SWRConverter;

/**
 * KENWOOD TS590,与YAESU3代指令接近，命令结构使用Yaesu3Command,指令在KenwoodTK90RigConstant中。
 * @ date 2025/7/26 BV6LC Support SSE Monitor
 */
public class KenwoodTS590Rig extends BaseRig {
    private static final String TAG = "KenwoodTS590Rig";
    private final StringBuilder buffer = new StringBuilder();

    private Timer readFreqTimer = new Timer();
    //private int swrInt=0;
	//private float swrFloat=0f;
	private float alertSwrFloat=2.4f;
    private int alc=0;
    private boolean alcMaxAlert = false;
    private boolean swrAlert = false;
	
	
	// BV6LC 2025/11/16 新增SWR讀取
	private int swrInt=0;
	private float swrFloat=0f;
	
	private static final SWRConverter.CalEntry[] ICOM_SWR_TABLE = {
		new SWRConverter.CalEntry(0,   1.0f),
		new SWRConverter.CalEntry(6,  1.5f),
		new SWRConverter.CalEntry(12,  2.0f),
		new SWRConverter.CalEntry(18, 3.0f),
		new SWRConverter.CalEntry(30, 10.0f) // 最高值
	};
	private final SWRConverter swrConv = new SWRConverter(ICOM_SWR_TABLE);
	
	
	/*
	// ----------------------------------------
    // 初始化校準表
	
    private static final CalTableEntry[] SWR_CAL_TABLE = {
        new CalTableEntry(0, 1.0f),
        new CalTableEntry(6, 1.5f),
        new CalTableEntry(12, 2.0f),
        new CalTableEntry(18, 3.0f),
        new CalTableEntry(30, 10.0f)
    };
	
	private static final CalTableFloat SWR_CAL = new CalTableFloat(SWR_CAL_TABLE);
	
	// SWR 轉換函數
    private static float convertSWR(int rawValue) {
         if (SWR_CAL.size == 0) {
            return (float) rawValue;
        }

        int i = 0;
        while (i < SWR_CAL.size && rawValue >= SWR_CAL.table[i].raw) {
            i++;
        }

        if (i == 0) {
            return SWR_CAL.table[0].val;
        }

        if (i == SWR_CAL.size) {
            //return SWR_CAL.table[i - 1].val;
			return 150.0f;
        }

        if (SWR_CAL.table[i].raw == SWR_CAL.table[i - 1].raw) {
            return SWR_CAL.table[i].val;
        }

        float deltaRaw = (float) (SWR_CAL.table[i].raw - SWR_CAL.table[i - 1].raw);
        float deltaVal = (float) (SWR_CAL.table[i].val - SWR_CAL.table[i - 1].val);
        float interpolation = (SWR_CAL.table[i].raw - rawValue) * deltaVal / deltaRaw;

        return SWR_CAL.table[i].val - interpolation;
    }
	
	// CalTableFloat and CalTableEntry
    static class CalTableFloat {
        int size;
        CalTableEntry[] table;

        CalTableFloat(CalTableEntry[] table) {
            this.table = table;
            this.size = table.length;
        }
    }
	static class CalTableEntry {
        int raw;
        float val;

        CalTableEntry(int raw, float val) {
            this.raw = raw;
            this.val = val;
        }
    }
	*/
	
	
	
	// --------------------------------------------------------
	

    private TimerTask readTask() {
        return new TimerTask() {
            @Override
            public void run() {
                try {
                    if (!isConnected()) {
                        readFreqTimer.cancel();
                        readFreqTimer.purge();
                        readFreqTimer = null;
                        return;
                    }
                    if (isPttOn()){
                        readMeters();//读METER
						readPower();
                    }else {
                        readFreqFromRig();//读频率
						swrAlert=false; // BV6LC
                    }

                } catch (Exception e) {
                    Log.e(TAG, "readFreq error:" + e.getMessage());
                }
            }
        };
    }

    /**
     * 读取Meter RM;
     */
    private void readMeters(){
        if (getConnector() != null) {
            clearBufferData();//清空一下缓存
			
			//super.SendtoSSE( "➡️讀取Meter:" + TAG +" ", KenwoodTK90RigConstant.setRead590Meters()  );
			SSE_readMeters( TAG , KenwoodTK90RigConstant.setRead590Meters() ); // ➡️讀取Meter
            getConnector().sendData(KenwoodTK90RigConstant.setRead590Meters());
        }
    }
	
	private void readPower(){
        if (getConnector() != null) {
            //clearBufferData();//清空一下缓存
			
			//SSE_readPower( TAG , QrpQmxRigConstant.setReadPower() ); // ➡️讀取Meter
			SSE_readPower( TAG , "Read Power".getBytes() ); // ➡️讀取Meter
            getConnector().sendData("PC;".getBytes());
						
        }
    }
	

    /**
     * 清空缓存数据
     */
    private void clearBufferData() {
        buffer.setLength(0);
    }

    @Override
    public void setPTT(boolean on) {
        super.setPTT(on);
        if (getConnector() != null) {
            switch (getControlMode()) {
                case ControlMode.CAT://以CIV指令
                    getConnector().setPttOn(KenwoodTK90RigConstant.setTS590PTTState(on));
                    break;
                case ControlMode.RTS:
                case ControlMode.DTR:
                    getConnector().setPttOn(on);
                    break;
            }
        }
    }

    @Override
    public boolean isConnected() {
        if (getConnector() == null) {
            return false;
        }
        return getConnector().isConnected();
    }

    @Override
    public void setUsbModeToRig() {
        if (getConnector() != null) {
			
			//super.SendtoSSE("➡️設定USB Mode:"+ TAG, KenwoodTK90RigConstant.setTS590OperationUSBMode() );
			
			
			SSE_setUsbModeToRig(TAG, KenwoodTK90RigConstant.setTS590OperationUSBMode() ); // 設定USB Mode
            getConnector().sendData(KenwoodTK90RigConstant.setTS590OperationUSBMode());
        }
    }

    @Override
    public void setFreqToRig() {
        if (getConnector() != null) {
			
			//super.SendtoSSE("➡️設定頻率:" + TAG +" ", KenwoodTK90RigConstant.setTS590OperationFreq(getFreq()) );
			SSE_setFreqToRig ( TAG ,  KenwoodTK90RigConstant.setTS590OperationFreq(getFreq()) ); //設定頻率
			
            getConnector().sendData(KenwoodTK90RigConstant.setTS590OperationFreq(getFreq()));
        }
    }

    @Override
    public void onReceiveData(byte[] data) {
        String s = new String(data);
		
		// BV6LC
		//GeneralVariables.log(TAG,"onReceiveData:"+s);
		s = s.replace(';', '\r');
		buffer.append(s);
		
		GeneralVariables.sendToSSE(TAG, "D", "onReceiveData:" + s + " Buffer:" + buffer);
		
		 // 分段命令
		String[] commands = buffer.toString().split("\r");
		int completeCount = buffer.toString().endsWith("\r") ? commands.length : commands.length - 1;
		
		
		// 處理完成的命令
		for (int i = 0; i < completeCount; i++) {
			String cmdStr = commands[i].trim();
			if (cmdStr.isEmpty()) continue;

			GeneralVariables.sendToSSE(TAG, "D", "🧩 Parse Cmd: " + cmdStr);
			Yaesu3Command cmd = Yaesu3Command.getCommand(cmdStr);

			if (cmd == null) {
				GeneralVariables.sendToSSE(TAG, "D", "❌ 無法解析指令: " + cmdStr);
				continue;
			}

			SSE_receiveData(TAG, cmd.getCommandID() + cmd.getData());

			String id = cmd.getCommandID();
			if (id.equalsIgnoreCase("FA")) {
				super.radioResponsed();
				long freq = Yaesu3Command.getFrequency(cmd);
				if (freq != 0) {
					SSE_onFreqChanged(TAG, freq);
					setFreq(freq);
				}
			} else if (id.equalsIgnoreCase("RM")) {
				super.radioResponsed();
				if (Yaesu3Command.is590MeterSWR(cmd)) {
					swrInt = Yaesu3Command.get590ALCOrSWR(cmd);
					//swrFloat = convertSWR(swrInt);
					swrFloat = swrConv.convert(swrInt); // 改成共用轉換器
					
					SSE_readSwr(TAG, swrFloat);
					GeneralVariables.setSwl(swrFloat);
				}
				if (Yaesu3Command.is590MeterALC(cmd)) {
					alc = Yaesu3Command.get590ALCOrSWR(cmd);
				}
				showAlert();
			}
		}
        
		
		// 保留未完整的最後一筆
		if (!buffer.toString().endsWith("\r")) {
			if (commands.length > 0) {
				buffer.setLength(0);
				buffer.append(commands[commands.length - 1]);
			} else {
				// 避免空陣列導致錯誤
				GeneralVariables.sendToSSE(TAG, "W", "⚠️ 無有效命令，跳過保留");
				buffer.setLength(0);
			}
		}

		// 安全：避免 buffer 無限制成長
		if (buffer.length() > 1000) {
			GeneralVariables.sendToSSE(TAG, "W", "⚠️ Buffer 太長，自動清除");
			buffer.setLength(0);
		}

    }
    private void showAlert() {

		if (!GeneralVariables.enableswrAlcAlert) return;//不顯示警告
		
		Log.d(TAG, "--Show Alert:"+ (swrFloat) +" /"+alertSwrFloat);
		if (swrFloat >= alertSwrFloat) {	
            if (!swrAlert) {
                swrAlert = true;
                // BV6LC ToastMessage.show(GeneralVariables.getStringFromResource(R.string.swr_high_alert));
				ToastMessage.show(String.format( GeneralVariables.getStringFromResource(R.string.swr_high_alert) , swrFloat ,alertSwrFloat) );
            }
        } else {
            swrAlert = false;
        }
        if (alc > KenwoodTK90RigConstant.ts_590_alc_alert_max) {//网络模式下不警告ALC
            if (!alcMaxAlert) {
                alcMaxAlert = true;
                //ToastMessage.show(GeneralVariables.getStringFromResource(R.string.alc_high_alert));
            }
        } else {
            alcMaxAlert = false;
        }

    }
    @Override
    public void readFreqFromRig() {
        if (getConnector() != null) {
            clearBufferData();//清空一下缓存
			
			//BaseRig.SendtoSSE("➡️讀取頻率:" + TAG +" ", KenwoodTK90RigConstant.setTS590ReadOperationFreq() );
			SSE_readFreqFromRig( TAG , KenwoodTK90RigConstant.setTS590ReadOperationFreq() ); //➡️讀取頻率
			
            getConnector().sendData(KenwoodTK90RigConstant.setTS590ReadOperationFreq());
        }
    }

    @Override
    public String getName() {
        return "KENWOOD TS-480/590";
    }

    public KenwoodTS590Rig() {

		
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                if (getConnector()!=null){
                    getConnector().sendData(KenwoodTK90RigConstant.setTS590VFOMode());
                }
            }
        },START_QUERY_FREQ_DELAY-500);
        readFreqTimer.schedule(readTask(), START_QUERY_FREQ_DELAY,QUERY_FREQ_TIMEOUT);
    }
}
