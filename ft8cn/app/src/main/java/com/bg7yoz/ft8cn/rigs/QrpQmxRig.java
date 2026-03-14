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

/**
 * QMX          TS590,与YAESU3代指令接近，命令结构使用Yaesu3Command,指令在KenwoodTK90RigConstant中。
 * @ date 2025/7/26 BV6LC Support SSE Monitor
 * @ date 2025/7/26 BV6LC 無輸出僅告、無回應警告
 */
public class QrpQmxRig extends BaseRig {
    private static final String TAG = "QrpQmxRig";
    private final StringBuilder buffer = new StringBuilder();

    private Timer readFreqTimer = new Timer();
    private int swrInt=0;
	private float swrFloat=0f;
	private float alertSwrFloat=2.4f;
    private int alc=0;
    private boolean alcMaxAlert = false;
    private boolean swrAlert = false;
	
	private boolean noPowerAlert = false;       // 無輸出警告
	private boolean noPowerAlertshowed = false;
	private int noPowerAlertCnt = 0;       // 無輸出警告
	
	private boolean noRespAlert = false;       //  電台無回應警告
	private boolean noRespAlertshowed = false;
	//private int noRespCnt=0; // 嘗試跟電台連絡次數
	

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
						readPower();//读Power
						//noRespCnt+=1;
                    }else {
                        readFreqFromRig();//读频率
						swrAlert=false; // BV6LC
						noPowerAlert=false; //BV6LC 無功率輸出警告
						noPowerAlertCnt=0;
						noPowerAlertshowed=false;
						
						//noRespAlert = false;       //  電台無回應警告
						//noRespAlertshowed = false;
						//noRespCnt=0;
						
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
            //clearBufferData();//清空一下缓存
			
			SSE_readMeters( TAG , QrpQmxRigConstant.setReadMeters() ); // ➡️讀取Meter
            getConnector().sendData(QrpQmxRigConstant.setReadMeters());
						
        }
    }
	
	private void readPower(){
        if (getConnector() != null) {
            //clearBufferData();//清空一下缓存
			
			SSE_readPower( TAG , QrpQmxRigConstant.setReadPower() ); // ➡️讀取Meter
            getConnector().sendData(QrpQmxRigConstant.setReadPower());
						
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
		//noRespCnt +=1;
		
		Log.i(TAG, "###: 設定PTT[" + on);
		
        super.setPTT(on);
        if (getConnector() != null) {
			Log.i(TAG, "###: getConnector!=NULL");
            switch (getControlMode()) {
                case ControlMode.CAT://以CIV指令
                    getConnector().setPttOn(QrpQmxRigConstant.setPTTState(on));
                    break;
                case ControlMode.RTS:
                case ControlMode.DTR:
                    getConnector().setPttOn(on);
                    break;
            }
        }
		else
			Log.i(TAG, "###: getConnector==NULL");
		Log.i(TAG, "###: 設定PTT]");
    }

    @Override
    public boolean isConnected() {
		
        if (getConnector() == null) {
			Log.i(TAG, "BaseRig: getConnector() == null");
            return false;
			
        }
		boolean connected = getConnector().isConnected();
		Log.i(TAG, "BaseRig: isConnected() ="+connected);
		
        return connected;
    }

    @Override
    public void setUsbModeToRig() {
        if (getConnector() != null) {

			SSE_setUsbModeToRig(TAG, QrpQmxRigConstant.setOperationUSBMode() ); // 設定USB Mode
			
            getConnector().sendData(QrpQmxRigConstant.setOperationUSBMode());
        }
    }

    @Override
    public void setFreqToRig() {
		
        if (getConnector() != null) {
			//super.SendtoSSE("➡️設定頻率:" + TAG +" ", QrpQmxRigConstant.setTS590OperationFreq(getFreq()) );
			SSE_setFreqToRig ( TAG ,  QrpQmxRigConstant.setTS590OperationFreq(getFreq())); //設定頻率
			
			
			getConnector().sendData(QrpQmxRigConstant.setTS590OperationFreq(getFreq()));
        }
		else
		{
			//GeneralVariables.log(TAG,"GetConnector is NULL!!!");
		}
    }

    @Override
    public void onReceiveData(byte[] data) {
        String s = new String(data);
		
		// BV6LC
		//GeneralVariables.log(TAG,"onReceiveData:"+s);
		
		
		// 1️⃣ 將收到的內容加入 buffer（QMX 用 ';' 當結尾）
        
		
		
		s=s.replace('\r', ';');
		buffer.append(s);
		GeneralVariables.sendToSSE(TAG , "D", "onReceiveData:"+s + " Buffer:"+buffer);
		boolean endsWithSemicolon = buffer.toString().endsWith(";");
		
		// 2️⃣ 以 ';' 作為完整指令分界
        String[] commands = buffer.toString().split(";");
		int completeCount = endsWithSemicolon ? commands.length : commands.length - 1;
		
		
		
		
		// 3️⃣ 若最後一筆不是以 ';' 結尾，代表還沒收完 → 暫時留著
        if (!buffer.toString().endsWith(";") && commands.length > 0) {
            buffer.setLength(0);
            buffer.append(commands[commands.length - 1]); // 留下未完整的最後一筆
        } else {
            buffer.setLength(0); // 全部完整，清空 buffer
        }
		
		// 4️⃣ 逐筆處理已收完的命令
        for (int i = 0; i < completeCount ; i++) {
            String cmdStr = commands[i].trim();
			//if (cmdStr.isEmpty()) continue;
			GeneralVariables.sendToSSE(TAG, "D", "🧩 Parse Cmd: " + cmdStr);
			
			Yaesu3Command cmd = Yaesu3Command.getCommand(cmdStr);
			
			if (cmd == null) {
				GeneralVariables.sendToSSE(TAG, "D","❌ Unrecognized command, skip: " + cmdStr);
				continue; // 或 continue; 根據邏輯選擇跳過
			}
			
			String id = cmd.getCommandID(); // 安全呼叫			
			
			if (id.equalsIgnoreCase("FA")) {//频率
				//noRespCnt=0; //表示有回應
				super.radioResponsed();//有回應
				long tempFreq=Yaesu3Command.getFrequency(cmd);
                if (tempFreq!=0) {//如果tempFreq==0，说明频率不正常
					SSE_onFreqChanged(TAG, tempFreq); //收到目前頻率
					setFreq(Yaesu3Command.getFrequency(cmd));
                }
				
				
				
			}
			else if (id.equalsIgnoreCase("PC")){
				super.radioResponsed();//有回應
				float power = Float.parseFloat(cmd.getData());
				//GeneralVariables.setPower(power);
				GeneralVariables.mutablePower.postValue(power);
				
				if(power<=1) // 功率輸出太小
				{
					noPowerAlertCnt+=1;
					if (noPowerAlertCnt>=3)
						noPowerAlert=true;
				}
				
				SSE_CurrntPower(TAG , power/10f );
			}else if (id.equalsIgnoreCase("SW")){//meter
				super.radioResponsed();//有回應
				
				if (cmd.getData().length() < 1) {
					Log.w(TAG, "❗收到空命令，跳過處理");
					GeneralVariables.sendToSSE(TAG, "D","❌ SW : " + cmd.getData().length());
					continue;
				}
				
				String formatted = cmd.getData().substring(0, 1) + "." + cmd.getData().substring(1); // "1.11"
				SSE_readSwr(TAG , formatted); //⬅️收到目前SWR
				float swrFloat = Float.parseFloat(formatted);
				GeneralVariables.setSwl(swrFloat);
                showAlert();
            }

		}
		
		// 強制清掉太大的 buffer
		if (buffer.length() > 500) {
			GeneralVariables.sendToSSE(TAG, "W", "⚠️ Buffer 超長，自動清除");
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
		
        if (alc > QrpQmxRigConstant.ts_590_alc_alert_max) {//网络模式下不警告ALC
            if (!alcMaxAlert) {
                alcMaxAlert = true;
                //ToastMessage.show(GeneralVariables.getStringFromResource(R.string.alc_high_alert));
            }
        } else {
            alcMaxAlert = false;
        }

		if(noPowerAlert && (!noPowerAlertshowed) ) {
			noPowerAlert=false;
			noPowerAlertshowed=true; //發射週期只顯示一次
			ToastMessage.show("No Power output!" );
		}
		



    }
    @Override
    public void readFreqFromRig() {
        if (getConnector() != null) {
            //clearBufferData();//清空一下缓存
			
            SSE_readFreqFromRig( TAG , QrpQmxRigConstant.setReadOperationFreq() ); //➡️讀取頻率
			//noRespCnt +=1;
			getConnector().sendData(QrpQmxRigConstant.setReadOperationFreq());
			

			super.checkradioResponsed(); // 檢查電台回應狀況
			
			
        }
    }

    @Override
    public String getName() {
        return "QRP QMX";
    }

    public QrpQmxRig() {
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                if (getConnector()!=null){
					SSE_setVfo( TAG , QrpQmxRigConstant.setVFOMode() );
                    getConnector().sendData(QrpQmxRigConstant.setVFOMode());
                }
            }
        },START_QUERY_FREQ_DELAY-500);
		

		
        readFreqTimer.schedule(readTask(), START_QUERY_FREQ_DELAY,QUERY_FREQ_TIMEOUT);
    }
	
	@Override
    public void setTimeToRig(String timeStr) {
		super.setTimeToRig(timeStr);
		
		ToastMessage.show("Set QMX Time: " + timeStr);
        if (getConnector() != null) {
			String command = "TM" + timeStr + ";";
			
            getConnector().sendData(command.getBytes());
        }

    }
	
	
}
