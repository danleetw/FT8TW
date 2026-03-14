package com.bg7yoz.ft8cn.rigs;

import androidx.lifecycle.MutableLiveData;

import com.bg7yoz.ft8cn.Ft8Message;
import com.bg7yoz.ft8cn.connector.BaseRigConnector;

import com.bg7yoz.ft8cn.GeneralVariables;

import android.util.Log;
import com.bg7yoz.ft8cn.LogExt;

import com.bg7yoz.ft8cn.R;
import java.nio.charset.StandardCharsets;

import com.bg7yoz.ft8cn.ui.ToastMessage;

import com.bg7yoz.ft8cn.rigs.policy.YaesuCatPolicy;

/**
 * 电台的抽象类。
 * @author BGY70Z
 * @date 2023-03-20
 */
public abstract class BaseRig {
	static final String  TAG = "BaseRig";
    private long freq;//当前频率值
    public MutableLiveData<Long> mutableFrequency = new MutableLiveData<>();
    private int controlMode;//控制模式
    private OnRigStateChanged onRigStateChanged;//当电台的一些状态发生变化的回调
    private int civAddress;//CIV地址
    private int baudRate;//波特率
    private boolean isPttOn=false;//ptt是否打开
    private BaseRigConnector connector = null;//连接电台的对象
	
	private float swr=0f;// 目前SWR
	
	private int noRespCnt=0; // 嘗試跟電台連絡次數
	

    public abstract boolean isConnected();//确认电台是否连接

    public abstract void setUsbModeToRig();//设置电台上边带方式

    public abstract void setFreqToRig();//设置电台频率
	
	
	//電台策略
	protected YaesuCatPolicy catPolicy;
	protected YaesuCatPolicy getCatPolicy() {
        return catPolicy;
    }
	
	protected void setCatPolicy(YaesuCatPolicy policy) {
        this.catPolicy = policy;
    }
	
	
	public static String bytesToHex(byte[] bytes) {
    StringBuilder sb = new StringBuilder();
		for (byte b : bytes) {
			sb.append(String.format("%02X", b)); // 大寫：0A1F，改成 %02x 是小寫：0a1f
		}
		return sb.toString();
	}
	
	
	
	

	public static void SendtoSSE(String msg) { // Send Command
	    String fntcolor="black";
		
		if (msg.contains("➡️")) {
			fntcolor = "blue";
		} else if ( msg.contains("⬅️") || msg.contains("ℹ")) {
			fntcolor = "green";
		}	
		  else if ( msg.contains("⚠") ) {
			fntcolor = "red";  
		}
		
        GeneralVariables.sendToSSE(TAG , "D", "<font color=\""+fntcolor+"\">"+msg+"</font>");
    }
	public static void SendtoSSE(byte[] cmdBytes) { // Send Command
		try {
			String msg = new String(cmdBytes, "UTF-8");  // 或可用 StandardCharsets.UTF_8
			BaseRig.SendtoSSE("HEX:["+bytesToHex(cmdBytes) + "] " + msg);
		} catch (Exception e) {
			Log.e("SendCommand", "無法將 byte[] 轉為字串: " + e.getMessage());
		}
    }
	
	public static void SendtoSSE(String msg,byte[] cmdBytes) { // Send Command
		try {
			String msg1 = new String(cmdBytes, "UTF-8");  // 或可用 StandardCharsets.UTF_8
			BaseRig.SendtoSSE(msg + "Hex:["+bytesToHex(cmdBytes) + "] ["+ msg1+"]");
		} catch (Exception e) {
			Log.e("SendCommand", "無法將 byte[] 轉為字串: " + e.getMessage());
		}
    }
	
	public static void SendtoSSE(String msg1,String msg2) { // Send Command
		SendtoSSE(msg1 + msg2);
    }
	
	

    public abstract void onReceiveData(byte[] data);//当电台发送回数据的动作

    public abstract void readFreqFromRig();//从电台读取频率

    public abstract String getName();//获取电台的名字

    private final OnConnectReceiveData onConnectReceiveData = new OnConnectReceiveData() {
        @Override
        public void onData(byte[] data) {
			String s = new String(data);
			//GeneralVariables.log(TAG,"OnConnectReceiveData Rig:"+GeneralVariables.instructionSet+" onReceiveData:"+s);
			
			//GeneralVariables.sendToSSE("ReceiveData:"+s);
            onReceiveData(data);
        }
    };

    public void setPTT(boolean on) {//设置PTT打开或关闭
		//LogExt.e(TAG, "setPTT:" );
		LogExt.d(TAG, "➡️ " + GeneralVariables.getStringFromResource(R.string.SSE_setPTT)+":" + on );
		//BaseRig.SendtoSSE(TAG + "➡️ " + GeneralVariables.getStringFromResource(R.string.SSE_setPTT)+":" + on);
		
		noRespCnt+=1; //電台連絡次數加1
		
        isPttOn=on;
        if (onRigStateChanged != null) {
			LogExt.d(TAG, "onRigStateChanged != null" );
            onRigStateChanged.onPttChanged(on);
        }
		else
		{
		LogExt.e(TAG, "onRigStateChanged == null" );
		}
    }

//    public void sendWaveData(float[] data) {
//        //留给ICOM电台使用
//    }
    public void sendWaveData(Ft8Message message) {
        //留给ICOM电台使用
		//BaseRig.SendtoSSE("➡️ Send Wave Data:" + message);
    }

    public long getFreq() {
        return freq;
    }
	

    public void setFreq(long freq) {
        if (freq == this.freq) return;
        if (freq == 0) return;
        if (freq == -1) return;
		
		//GeneralVariables.sendToSSE("Set freq:"+freq + " "+TAG);
		SSE_setFreqToRig(TAG , String.valueOf(freq) );
	
		
        mutableFrequency.postValue(freq);
        this.freq = freq;
        if (onRigStateChanged != null) {
            onRigStateChanged.onFreqChanged(freq);
        }
    }

    public void setConnector(BaseRigConnector connector) {
        this.connector = connector;

        this.connector.setOnRigStateChanged(onRigStateChanged);
        this.connector.setOnConnectReceiveData(new OnConnectReceiveData() {
            @Override
            public void onData(byte[] data) {
				String s = new String(data);
				
				//GeneralVariables.log(TAG,"set Connector Rig:"+GeneralVariables.instructionSet+" onReceiveData:"+s);
				//GeneralVariables.sendToSSE("ReceiveData:"+s);
				// 先統一記錄到 SSE
				BaseRig.SendtoSSE("⬅️ RX [" + bytesToHex(data) + "]"+data);
				
				
                onReceiveData(data);
            }
        });
    }

    public void setControlMode(int mode) {
        controlMode = mode;
        if (connector != null) {
            connector.setControlMode(mode);
        }
    }

    public int getControlMode() {
        return controlMode;
    }

    public static String byteToStr(byte[] data) {
        StringBuilder s = new StringBuilder();
        for (int i = 0; i < data.length; i++) {
            s.append(String.format("%02x ", data[i] & 0xff));
        }
        return s.toString();
    }

    public BaseRigConnector getConnector() {
        return connector;
    }

    public OnRigStateChanged getOnRigStateChanged() {
        return onRigStateChanged;
    }

    public void setOnRigStateChanged(OnRigStateChanged onRigStateChanged) {
        this.onRigStateChanged = onRigStateChanged;
    }

    public int getCivAddress() {
        return civAddress;
    }

    public void setCivAddress(int civAddress) {
        this.civAddress = civAddress;
    }

    public int getBaudRate() {
        return baudRate;
    }

    public void setBaudRate(int baudRate) {
        this.baudRate = baudRate;
    }

    public boolean isPttOn() {
        return isPttOn;
    }


    /**
     * 2023-08-16 由DS1UFX提交修改（基于0.9版），增加(tr)uSDX audio over cat的支持。
     */
    public boolean supportWaveOverCAT() {
        return false;
    }

    public void onDisconnecting() {
    }
	
	/* 2025/1/1 BV6LC */
	public float getSwr() {
        return swr;
    }
	
	
	public void setTimeToRig( String timeStr)//設定電台時間
	{
		//this.SendtoSSE(TAG + "➡️"+ GeneralVariables.getStringFromResource(R.string.sse_setTimeToRig) +":"+timeStr);
		LogExt.i(TAG, "➡️"+ GeneralVariables.getStringFromResource(R.string.sse_setTimeToRig) +":"+timeStr );
		noRespCnt+=1; //電台連絡次數加1
	}
	
	
	
	public static void SSE_rigModel(String tag, String  rigModel)// Rig Model Name
	{
		//SendtoSSE( tag + "ℹ️"+GeneralVariables.getStringFromResource(R.string.sse_rigModel)+":"+rigModel  ); 
		LogExt.d(TAG, GeneralVariables.getStringFromResource(R.string.sse_rigModel)+":"+rigModel );
	}
	
	//public void SSE_currntFrequency(String tag, byte[] cmdBytes)// 收到目前頻率
	//{
	//	SendtoSSE( tag + "  "+String.format(GeneralVariables.getStringFromResource(R.string.current_frequency)
    //                , BaseRigOperation.getFrequencyAllInfo(freq))   ); //⬅️收到目前頻率
	//}
	
	public void SSE_onPttChanged(String tag, boolean onOff)// PTT目前情況
	{
		String state = onOff ? "ON" : "Off";
		LogExt.d(TAG, "➡️"+ GeneralVariables.getStringFromResource(R.string.SSE_onPttChanged)+":" + state );
		//SendtoSSE( tag + "ℹ️ "+ GeneralVariables.getStringFromResource(R.string.SSE_onPttChanged)+":" + state  ); 
	}
	
	public void SSE_onFreqChanged(String tag, long freq)// 目前頻率
	{
		LogExt.i(TAG,  String.format(GeneralVariables.getStringFromResource(R.string.SSE_onFreqChanged))
                    + ":"+String.valueOf(freq/1000000f) +" MHz" );
		//SendtoSSE( tag + " ℹ️"+String.format(GeneralVariables.getStringFromResource(R.string.SSE_onFreqChanged))
        //            + ":"+String.valueOf(freq/1000000f) +" MHz"  ); 
					
		GeneralVariables.SendtoSSE_field("freq",String.valueOf(freq/1000000f) +" MHz"  );	
					
	}
	
	public void SSE_CurrntPower(String tag, String power)// 目前輸出功率
	{
		LogExt.i( tag ,String.format(GeneralVariables.getStringFromResource(R.string.SSE_CurrPwr))
                    + ":"+power+" W"  ); 
					
		GeneralVariables.SendtoSSE_field("power",power +" W"  );		
	}
	
	public void SSE_CurrntPower(String tag, float power)// 目前輸出功率
	{
		SSE_CurrntPower	(tag , String.valueOf(power) );
	}
	
	
	
	public void SSE_readFrequency(String tag, byte[] cmdBytes)// 讀取目前頻率
	{
		
		SendtoSSE( tag + " ℹ️"+ GeneralVariables.getStringFromResource(R.string.SSE_onFreqChanged)+":"  , cmdBytes  ); //⬅️收到目前頻率
	}
	
	public void SSE_readFrequency(String tag, String rData)// 收到目前頻率
	{
		SendtoSSE( tag +" ℹ️" + GeneralVariables.getStringFromResource(R.string.SSE_onFreqChanged) + ":" + rData  ); //⬅️收到目前頻率
	}
	
	
	public void SSE_readFreqFromRig(String tag , byte[] cmdBytes )
	{
		//SendtoSSE( tag +"️➡️"+ GeneralVariables.getStringFromResource(R.string.sse_read_freq) + ":" , cmdBytes ); // ➡️讀取頻率
		LogExt.i(tag , "️➡️"+ GeneralVariables.getStringFromResource(R.string.sse_read_freq) + ":" + cmdBytes );
		noRespCnt+=1; //電台連絡次數加1
	}
	
	public void SSE_readMeters(String tag, byte[] cmdBytes)//顯示電台S表
	{
		//SendtoSSE( tag + "➡️" + GeneralVariables.getStringFromResource(R.string.SSE_readMeters) , cmdBytes  );
		LogExt.i(tag , "️➡️"+ GeneralVariables.getStringFromResource(R.string.SSE_readMeters) + ":" + cmdBytes );
		
		noRespCnt+=1; //電台連絡次數加1
	}
	
	/// 可以傳String 或是 Float
	public void SSE_readSwr(String tag, String rData) //⬅️收到目前SWR:
	{
		//SendtoSSE( tag + "️ ℹ️" + GeneralVariables.getStringFromResource(R.string.SSE_readSwr)+":"  , rData  );
		LogExt.i(tag , "️ℹ️"+ GeneralVariables.getStringFromResource(R.string.SSE_readSwr)+":"  + rData );
		GeneralVariables.SendtoSSE_field("swr",rData);	
		
	}
	
	public void SSE_readSwr(String tag, Float swr) //⬅️收到目前SWR:
	{
		SSE_readSwr(tag , String.valueOf( swr));
		//SendtoSSE( tag + "️ ⬅️" + GeneralVariables.getStringFromResource(R.string.SSE_readSwr)+":"  + String.valueOf( swr)  );
		//GeneralVariables.SendtoSSE_field("swr",String.valueOf( swr) );	
	}
	
	public void SSE_readPower(String tag, byte[] cmdBytes)//顯示輸出Power
	{
		//SendtoSSE( tag + "➡️" + GeneralVariables.getStringFromResource(R.string.SSE_readPwr) , cmdBytes  );
		LogExt.i(tag , "️➡️"+ GeneralVariables.getStringFromResource(R.string.SSE_readPwr)+":" + cmdBytes );
		noRespCnt+=1; //電台連絡次數加1
	}
	
	
	public void SSE_receiveData(String tag, String rData)
	{
		//SendtoSSE( tag +"⬅️" +GeneralVariables.getStringFromResource(R.string.sse_received_data)+":" + rData  ); 
		LogExt.i(tag , "️⬅️"+ GeneralVariables.getStringFromResource(R.string.sse_received_data)+":" + rData );
		//noRespCnt=0; //電台連絡次數歸零 (要回應的內容是確認過有用的才算有回應)
	}
	
	public void radioResponsed(){
		noRespCnt=0; //電台連絡次數歸零
	}
	
	public void checkradioResponsed(){
			if(noRespCnt>=8) {	
				//noRespAlert=false;
				//noRespAlertshowed=true; //發射週期只顯示一次
				ToastMessage.show("Rig no response!!!" );
				noRespCnt=0;
			}
	}
	
	
	
	public void SSE_setFreqToRig(String tag, byte[] cmdBytes)
	{
		//SendtoSSE( tag + "➡️"+ GeneralVariables.getStringFromResource(R.string.SSE_setFreqToRig)+":"   , cmdBytes  );
		LogExt.i(tag , "️➡️"+ GeneralVariables.getStringFromResource(R.string.SSE_setFreqToRig)+":"  + cmdBytes );
		
		noRespCnt+=1; //電台連絡次數加1
	}
	
	public void SSE_setFreqToRig(String tag, String freq)
	{
		//SendtoSSE( tag + "➡️"+ GeneralVariables.getStringFromResource(R.string.SSE_setFreqToRig) +":"  + freq  );
		LogExt.i(tag , "️➡️"+ GeneralVariables.getStringFromResource(R.string.SSE_setFreqToRig) +":"  + freq  );
		noRespCnt+=1; //電台連絡次數加1
	}
	
	public void SSE_setUsbModeToRig(String tag, byte[] cmdBytes)
	{
		//SendtoSSE( tag + "➡️"+ GeneralVariables.getStringFromResource(R.string.SSE_setUsbModeToRig) +":"  + new String(cmdBytes, StandardCharsets.UTF_8)   );
		LogExt.i(tag , "️➡️"+ GeneralVariables.getStringFromResource(R.string.SSE_setUsbModeToRig) +":"  + new String(cmdBytes, StandardCharsets.UTF_8) );
		noRespCnt+=1; //電台連絡次數加1
	}
	
	public void SSE_setVfo(String tag, byte[] cmdBytes)
	{
		//SendtoSSE( tag + "➡️"+ GeneralVariables.getStringFromResource(R.string.SSE_setVfo) +":" , cmdBytes  ); //➡️設定VFO Mode:
		LogExt.i(tag , "️➡️"+ GeneralVariables.getStringFromResource(R.string.SSE_setVfo) +":"+ cmdBytes ); //➡️設定VFO Mode:
		noRespCnt+=1; //電台連絡次數加1
	}
	
	public void SSE_connect(String tag)
	{
		//SendtoSSE( tag + "ℹ️ "+ GeneralVariables.getStringFromResource(R.string.SSE_connect) );     //"與電台連線":
		LogExt.i(tag , "️➡️"+ GeneralVariables.getStringFromResource(R.string.SSE_connect) ); //"與電台連線":
	}
	public void SSE_disConnect(String tag)
	{
		//SendtoSSE( tag + "️⚠"+ GeneralVariables.getStringFromResource(R.string.SSE_disconnect ) ); //"與電台中斷":
		LogExt.i(tag , "️➡️"+ GeneralVariables.getStringFromResource(R.string.SSE_disconnect ) ); //"與電台中斷":
	}
	
	public void SSE_show(String tag,String msg)
	{
		//SendtoSSE( tag + "️ℹ️"+ msg ); //"一般訊息":
		LogExt.i(tag ,  msg ); //"一般訊息":
	}

}
