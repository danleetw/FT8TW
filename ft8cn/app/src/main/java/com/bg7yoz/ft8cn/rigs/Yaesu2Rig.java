package com.bg7yoz.ft8cn.rigs;

import static com.bg7yoz.ft8cn.GeneralVariables.QUERY_FREQ_TIMEOUT;
import static com.bg7yoz.ft8cn.GeneralVariables.START_QUERY_FREQ_DELAY;

import android.util.Log;

import com.bg7yoz.ft8cn.GeneralVariables;
import com.bg7yoz.ft8cn.R;
import com.bg7yoz.ft8cn.database.ControlMode;
import com.bg7yoz.ft8cn.ui.ToastMessage;

import java.util.Timer;
import java.util.TimerTask;

/**
 * YAESU的部分电台，回送的数据不是连续的，所以，要做一个缓冲区，接受5字节长度。满了就复位。或发送指令时，就复位。
 * @ date 2025/7/21 找到一個Bug，FT-818頻率查詢功能不正常
 * @ date 2025/7/26 BV6LC Support SSE Monitor
 */
public class Yaesu2Rig extends BaseRig{
    private static final String TAG="[Yaesu2Rig]";
    private Timer readFreqTimer = new Timer();

    private int swrInt = 0;
	private float swrFloat=0f;
	private float alertSwrFloat=2.4f;
		
    private int alc = 0;
    private boolean alcMaxAlert = false;
    private boolean swrAlert = false;
	
		// ----------------------------------------
    // 初始化校準表
	
    private static final CalTableEntry[] SWR_CAL_TABLE = {
        new CalTableEntry(0, 1.0f),
        new CalTableEntry(1, 1.4f),
        new CalTableEntry(2, 1.8f),
        new CalTableEntry(3, 2.13f),
		new CalTableEntry(4, 2.25f),
        new CalTableEntry(5, 3.7f),
        new CalTableEntry(6, 6.0f),
		new CalTableEntry(7, 7.0f),
        new CalTableEntry(8, 8.f),
        new CalTableEntry(9, 9.0f),
        new CalTableEntry(10, 10.0f),
		new CalTableEntry(11, 10.5f),
        new CalTableEntry(12, 10.0f),
        new CalTableEntry(13, 10.0f),
		new CalTableEntry(14, 10.0f),
        new CalTableEntry(15, 10.0f)
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
			return 15.0f;
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
	// --------------------------------------------------------

	
	
	

    private TimerTask readTask(){
        return new TimerTask() {
            @Override
            public void run() {
                try {
                    if (!isConnected()){
                        readFreqTimer.cancel();
                        readFreqTimer.purge();
                        readFreqTimer=null;
                        return;
                    }
                    if (isPttOn()) {
                        readMeters();
                    } else {
                        readFreqFromRig();
                    }
                }catch (Exception e)
                {
                    Log.e(TAG, "readFreq error:"+e.getMessage() );
                }
            }
        };
    }


    @Override
    public void setPTT(boolean on) {
        super.setPTT(on);

        if (getConnector()!=null){
            switch (getControlMode()){
                case ControlMode.CAT://以CIV指令
                    getConnector().setPttOn(Yaesu2RigConstant.setPTTState(on));
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
        if (getConnector()==null) {
            return false;
        }
        return getConnector().isConnected();
    }

    @Override
    public void setUsbModeToRig() {
        if (getConnector()!=null){
			
			SSE_setUsbModeToRig(TAG, Yaesu2RigConstant.setOperationUSBMode() ); //設定USB Mode
			//super.SendtoSSE("➡️設定USB Mode:" + TAG +" ", Yaesu2RigConstant.setOperationUSBMode() );
            getConnector().sendData(Yaesu2RigConstant.setOperationUSBMode());
        }
    }

    @Override
    public void setFreqToRig() {
        if (getConnector()!=null){
			//super.SendtoSSE("➡️設定頻率:" + TAG +" ", Yaesu2RigConstant.setOperationFreq(getFreq()) );
			SSE_setFreqToRig ( TAG , Yaesu2RigConstant.setOperationFreq(getFreq())  ); //➡️設定頻率
			GeneralVariables.SendtoSSE_field("freq",String.valueOf(getFreq()/1000000f) );
			
            getConnector().sendData(Yaesu2RigConstant.setOperationFreq(getFreq()));
        }
    }


	public static String bytesToHex(byte[] bytes) {
		StringBuilder sb = new StringBuilder();
		for (byte b : bytes) {
			sb.append(String.format("%02X", b)); // 大寫：0A、FF 等
		}
		return sb.toString();
	}

    @Override
    public void onReceiveData(byte[] data) {
        //YAESU 817的指令，返回频率是5字节的，METER是2字节的。
        //Meter是2字节的，第一字节高位功率，0-A，低位ALC 0-9,第二字节高位驻波比，0-C，0为高驻波，低位音频输入0-8
		//GeneralVariables.SendtoSSE_field("freq",String.valueOf(data.length) +" " + bytesToHex(data));
		
		//super.SendtoSSE(String.valueOf(data.length) +" " + bytesToHex(data));
		SSE_receiveData( TAG ,  String.valueOf(data.length) +" " + bytesToHex(data) ); // 收到資料
		
        if (data.length == 5) {//频率
            long freq = Yaesu2Command.getFrequency(data);
            if (freq > -1) {
				//BaseRig.SendtoSSE("⬅️收到目前頻率:" + TAG +" "+ freq );
				
				//GeneralVariables.SendtoSSE_field("freq",String.valueOf(freq/1000000f) );
				SSE_onFreqChanged(TAG, freq); // 收到目前頻率
				
                setFreq(freq);
            }
		} else if (	data.length == 3) { // 頻率 // BV6LC FT-818不會抓頻率
			long freq = Yaesu2Command.getFrequency(data);
			if (freq > -1) {
				SSE_onFreqChanged(TAG, freq); // 收到目前頻率
				//BaseRig.SendtoSSE("⬅️ 收到目前頻率:" + TAG +" "+ freq );
				//GeneralVariables.SendtoSSE_field("freq",String.valueOf(freq/1000000f) );
				setFreq(freq);
			}
        } else if (data.length == 2) {//METERS
            alc = (data[0] & 0x0f);
            swrInt = (data[1] & 0x0f0) >> 4;
			swrFloat=convertSWR(swrInt);
			GeneralVariables.setSwl(swrFloat); // BV6LC
            showAlert();
			//BaseRig.SendtoSSE("⬅️收到目前SWR:"+swrFloat + " "+TAG);
			SSE_readSwr(TAG , swrFloat); //⬅️收到目前SWR
        }

    }

    /**
     * 读取Meter RM;
     */
    private void readMeters() {
        if (getConnector() != null) {
			
			SSE_readMeters( TAG , Yaesu2RigConstant.readMeter()  );

            getConnector().sendData(Yaesu2RigConstant.readMeter());
			
        }
    }
	
	/*
	private void readPower(){
        if (getConnector() != null) {
			SSE_readPower( TAG , Yaesu2RigConstant.readPower() ); // ➡️讀取Meter
            getConnector().sendData(Yaesu2RigConstant.readPower());
						
        }
    }*/
	
	
	
	
	
    private void showAlert() {

		//if (swr > Yaesu2RigConstant.swr_817_alert_min) {
        if (GeneralVariables.enableswrAlcAlert && swrFloat > alertSwrFloat) {
            if (!swrAlert) {
                swrAlert = true;
                //ToastMessage.show(GeneralVariables.getStringFromResource(R.string.swr_high_alert));
				ToastMessage.show(String.format( GeneralVariables.getStringFromResource(R.string.swr_high_alert) , swrFloat ,alertSwrFloat) );
            }
        } else {
            swrAlert = false;
        }
        if (GeneralVariables.enableswrAlcAlert && alc >= Yaesu2RigConstant.alc_817_alert_max) {//网络模式下不警告ALC
            if (!alcMaxAlert) {
                alcMaxAlert = true;
                ToastMessage.show( String.format(GeneralVariables.getStringFromResource(R.string.alc_high_alert) , alc) );
            }
        } else {
            alcMaxAlert = false;
        }

    }
    @Override
    public void readFreqFromRig(){
        if (getConnector()!=null){
            //clearBuffer();//清除一下缓冲区
			//BaseRig.SendtoSSE("➡️讀取頻率:" + TAG +" ", Yaesu2RigConstant.setReadOperationFreq() );
			
			SSE_readFreqFromRig( TAG , Yaesu2RigConstant.setReadOperationFreq() ); //➡️讀取頻率
            getConnector().sendData(Yaesu2RigConstant.setReadOperationFreq());
        }
    }

    @Override
    public String getName() {
        return "YAESU 817 series";
    }

    public Yaesu2Rig() {
        readFreqTimer.schedule(readTask(),START_QUERY_FREQ_DELAY,QUERY_FREQ_TIMEOUT);
    }

}
