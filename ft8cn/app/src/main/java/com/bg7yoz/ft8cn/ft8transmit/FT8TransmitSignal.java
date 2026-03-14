package com.bg7yoz.ft8cn.ft8transmit;
/**
 * 与发射信号有关的类。包括分析通联过程的自动程序。
 * @author BGY70Z
 * @date 2023-03-20
 * @author BV6LC 
 * @date 2025-10-07
 * 發射及解碼後自動通連程式
 * @author BV6LC
  */

import android.annotation.SuppressLint;
import android.content.Context;
import android.media.AudioAttributes;
import android.media.AudioDeviceInfo;
import android.media.AudioFormat;
import android.media.AudioManager;
import android.media.AudioTrack;
import android.os.Build;

import android.util.Log;
import com.bg7yoz.ft8cn.LogExt;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.Observer;

import com.bg7yoz.ft8cn.FT8Common;
import com.bg7yoz.ft8cn.Ft8Message;
import com.bg7yoz.ft8cn.GeneralVariables;
import com.bg7yoz.ft8cn.R;
import com.bg7yoz.ft8cn.connector.ConnectMode;
import com.bg7yoz.ft8cn.database.ControlMode;
import com.bg7yoz.ft8cn.database.DatabaseOpr;
import com.bg7yoz.ft8cn.log.QSLRecord;
import com.bg7yoz.ft8cn.rigs.BaseRigOperation;
import com.bg7yoz.ft8cn.timer.OnUtcTimer;
import com.bg7yoz.ft8cn.timer.UtcTimer;
import com.bg7yoz.ft8cn.ui.ToastMessage;
import com.bg7yoz.ft8cn.maidenhead.MaidenheadGrid;

import com.bg7yoz.ft8cn.Ft8DecodedMessage;

import java.util.ArrayList;
//import java.util.AbstractMap;
import java.util.Map;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import java.util.stream.Collectors;

import android.os.Handler;
import android.os.Looper;


public class FT8TransmitSignal {
    private static final String TAG = "FT8TransmitSignal";

    private boolean transmitFreeText = false;
    private String freeText = "FREE TEXT";

	private Ft8Message currentMessage; //目前訊息
	
    //private final DatabaseOpr databaseOpr;//配置信息，和相关数据的数据库
	private static DatabaseOpr databaseOpr;//配置信息，和相关数据的数据库
	
    private TransmitCallsign toCallsign;//目标呼号
    public MutableLiveData<TransmitCallsign> mutableToCallsign = new MutableLiveData<>();

    private int functionOrder = 6;
    public MutableLiveData<Integer> mutableFunctionOrder = new MutableLiveData<>();//指令的顺序变化
    private boolean activated = false;//是否处于可以发射的模式
    public MutableLiveData<Boolean> mutableIsActivated = new MutableLiveData<>();
    public int sequential;//发射的时序
    public MutableLiveData<Integer> mutableSequential = new MutableLiveData<>();
	
	// 本次發射用的音頻（不寫回設定）
	private float currentTxFrequency = -1;
	
	
	
    private boolean isTransmitting = false;
    public MutableLiveData<Boolean> mutableIsTransmitting = new MutableLiveData<>();//是否处于发射状态
    public MutableLiveData<String> mutableTransmittingMessage = new MutableLiveData<>();//当前消息的内容

    //public MutableLiveData<Integer> currentOrder = new MutableLiveData<>();//当前要发射的指令

    //********************************************
    //此处的信息是用于保存QSL的
    private long messageStartTime = 0;//消息开始的时间
    private long messageEndTime = 0;//消息结束的时间
    private String toMaidenheadGrid = "";//目标的网格信息
    private int sendReport = 0;//我发送到对方的报告
    private int sentTargetReport = -100;//
	
	private boolean cqOnce=false; // 只呼叫一次


    private int receivedReport = 0;//我接收到的报告
    private int receiveTargetReport = -100;//发送给对方的信号报告
	
	private boolean send73 = false;//已經發送73給對方
	private boolean saveQso = false;//已經儲存
	
    //********************************************
    private final OnTransmitSuccess onTransmitSuccess;//一般是用于保存QSL数据


    //防止播放中止，变量不能放在方法中
    private AudioAttributes attributes = null;
    private AudioFormat myFormat = null;
    private AudioTrack audioTrack = null;

    public UtcTimer transmitSlotTimer;
	private boolean transmithasFiredInitial = false;


    public ArrayList<FunctionOfTransmit> functionList = new ArrayList<>();
    public MutableLiveData<ArrayList<FunctionOfTransmit>> mutableFunctions = new MutableLiveData<>();
	
	private final Handler mainHandler = new Handler(Looper.getMainLooper());
	
	// Score 用
	// 權重參數設定
	double WEIGHT_QSL =     -100.0;       // QSL過
	double WEIGHT_CQ_ZONE =   20.0;       // 新的CQ ZONE
	double WEIGHT_ITU_ZONE =  20.0;	   // 新的ITU ZONE
	double WEIGHT_DXCC_ZONE = 20.0;	   // 新的DXCC ZONE
	double WEIGHT_DIST=1;                // 距離權重
	double WEIGHT_SNR = 1.0;          	// SNR 的權重
	double WEIGHT_CALLING_ME ;          // 正在呼叫我
	double WEIGHT_FOLLOW_CALLSIGN=1300.0;  // Follow_Call_Sign
	
	double WEIGHT_TARGET = 2.0;      // 目標呼號匹配的權重
	double WEIGHT_IS_CQ = 1.5;       // 是否為 CQ 的權重
	double WEIGHT_FREQ_OFFSET = 0.5; // 頻率偏移的權重
	
	

    private final OnDoTransmitted onDoTransmitted;//一般是用于打开关闭PTT
    
	
	//private final ExecutorService doTransmitThreadPool = Executors.newCachedThreadPool(); 把執行續限制為2個，避免記憶體超用
	private final ExecutorService doTransmitThreadPool = Executors.newFixedThreadPool(2);
	
	
	
    private final DoTransmitRunnable doTransmitRunnable = new DoTransmitRunnable(this);


    /**
     * 发射模块的构造函数，需要两个回调，一个是当发射时（有两个动作，用于打开/关闭PTT），另一个时当成功时(用于保存QSL)。
     *
     * @param databaseOpr       数据库
     * @param doTransmitted     当发射前后时的回调
     * @param onTransmitSuccess 当发射成功时的回调
     */
    public FT8TransmitSignal(DatabaseOpr databaseOpr
            , OnDoTransmitted doTransmitted, OnTransmitSuccess onTransmitSuccess) {
        this.onDoTransmitted = doTransmitted;//用于打开关闭PTT的事件
        this.onTransmitSuccess = onTransmitSuccess;//用于保存QSL的事件
        this.databaseOpr = databaseOpr;

        setTransmitting(false);
        setActivated(false);


        //观察音量设置的变化
        GeneralVariables.mutableVolumePercent.observeForever(new Observer<Float>() {
            @Override
            public void onChanged(Float aFloat) {
                if (audioTrack != null) {
                    audioTrack.setVolume(aFloat);
                }
            }
        });
		
		//觀察Power的變化
		GeneralVariables.mutablePower.observeForever(newPower -> {
			if (newPower != null && currentMessage != null && newPower > 0) {
				mutableTransmittingMessage.postValue(
					String.format(" (%.0fHz) %s (%.1fw)",
						//GeneralVariables.getBaseFrequency(),
						currentTxFrequency,
						currentMessage.getMessageText(),
						newPower / 10.0f)
				);
			}
		});
		
		
		restartTimer(); // 依據isFT4 建立7.5秒 15秒Timer
		
        
		setScoreWeight(); // 設定初始權重
    }
	public void setScoreWeight(){
				// 依照方案給權重
		switch (GeneralVariables.autoFollowCQOrder){
			case 1: // Dist(Far)
				WEIGHT_DIST=200.0;                // 距離權重 /1000
				WEIGHT_CALLING_ME = 1300.0;     // 正在呼叫我
				break;
			case 2: // Dist(Near)
				WEIGHT_DIST=-200.0;                // 距離權重 /1000
				WEIGHT_CALLING_ME = 1300.0;     // 正在呼叫我
				break;				
			case 3: // ITU/CQ/DXCC
				WEIGHT_CQ_ZONE =   201.0;       // 新的CQ ZONE
				WEIGHT_ITU_ZONE =  201.0;	   // 新的ITU ZONE
				WEIGHT_DXCC_ZONE =  201.0;	   // 新的DXCC ZONE
				WEIGHT_CALLING_ME = 1300.0;     // 正在呼叫我
				break;
			case 4: // ITU
				WEIGHT_CQ_ZONE =   1.0;       // 新的CQ ZONE
				WEIGHT_ITU_ZONE =  201.0;	   // 新的ITU ZONE
				WEIGHT_DXCC_ZONE =  1.0;	   // 新的DXCC ZONE
				WEIGHT_CALLING_ME = 1300.0;     // 正在呼叫我
				break;
			case 5: // CQ
				WEIGHT_CQ_ZONE =   201.0;       // 新的CQ ZONE
				WEIGHT_ITU_ZONE =  1.0;	   // 新的ITU ZONE
				WEIGHT_DXCC_ZONE =  1.0;	   // 新的DXCC ZONE
				WEIGHT_CALLING_ME = 1300.0;     // 正在呼叫我
				break;
			case 6: // DX Zone
				WEIGHT_CQ_ZONE =   1.0;       // 新的CQ ZONE
				WEIGHT_ITU_ZONE =  1.0;	   // 新的ITU ZONE
				WEIGHT_DXCC_ZONE =  201.0;	   // 新的DXCC ZONE
				WEIGHT_CALLING_ME = 1300.0;     // 正在呼叫我
				break;
			default: // 0 ASAP
				WEIGHT_SNR = 20.0;          	// SNR 的權重 (max:4~-27 + 30= 34~3) 200/10
				WEIGHT_CALLING_ME = 1300.0;     // 正在呼叫我
				break;
		}
	}
	

    /**
     * 立即发射
     */
    //@RequiresApi(api = Build.VERSION_CODES.N)
    public void transmitNow() {
        if (GeneralVariables.myCallsign.length() < 3) {
            ToastMessage.show(GeneralVariables.getStringFromResource(R.string.callsign_error));
            return;
        }
        ToastMessage.show(String.format(GeneralVariables.getStringFromResource(R.string.adjust_call_target)
                , toCallsign.callsign));

        //把信号报告相关的复位
        //resetTargetReport();
		
		long slotLength = GeneralVariables.isFT4 ? FT8Common.FT4_SLOT_TIME_MILLISECOND : FT8Common.FT8_SLOT_TIME_MILLISECOND;
		

        if (UtcTimer.getNowSequential() == sequential) {
			long slotOffset = UtcTimer.getSystemTime() % slotLength;
            if (slotOffset < 2500) {
                setTransmitting(false);
                doTransmit();
            } else {
				ToastMessage.show(String.format(GeneralVariables.getStringFromResource(R.string.tx_skip_slot_timeout), slotOffset));
				LogExt.d(TAG, "transmitNow() 跳過：時隙內已過 " + slotOffset + "ms");
				GeneralVariables.log(TAG, "TX 跳過：時隙內已過 " + slotOffset + "ms (>2500ms)");
			}
        }
		else
		{
			ToastMessage.show(String.format(GeneralVariables.getStringFromResource(R.string.tx_skip_wrong_sequence), UtcTimer.getNowSequential(), sequential));
			LogExt.d(TAG, "transmitNow() 跳過：utc="+ UtcTimer.getNowSequential() + " Seq="+sequential );
			GeneralVariables.log(TAG, "TX 跳過：時序不對 (目前=" + UtcTimer.getNowSequential() + " 需要=" + sequential + ")");
		}
    }

    //发射信号
    //@RequiresApi(api = Build.VERSION_CODES.N)
    public void doTransmit() {
        //if (!activated) { 如果已經發送中則不要重複執行，避免記憶體OOM
		
		mutableSequential.postValue(sequential);//通知发射时序改变
		
		if (!activated) {
			ToastMessage.show(GeneralVariables.getStringFromResource(R.string.tx_skip_not_activated));
			LogExt.d(TAG, "doTransmit() 跳過：activated=false");
			GeneralVariables.log(TAG, "TX 跳過：發射未啟用 (activated=false)");
            return;
        }
		if (isTransmitting) {
			ToastMessage.show("TX 跳過：上一次發射尚未完成");
			LogExt.d(TAG, "doTransmit() 跳過：isTransmitting=true");
			GeneralVariables.log(TAG, "TX 跳過：上一次發射尚未完成 (isTransmitting=true)");
            return;
        }
        //检测是不是黑名单频率，WSPR-2的频率，频率=电台频率+声音频率
        if (BaseRigOperation.checkIsWSPR2(
                GeneralVariables.band + Math.round(GeneralVariables.getBaseFrequency()))) {
            ToastMessage.show(String.format(GeneralVariables.getStringFromResource(R.string.use_wspr2_error)
                    , BaseRigOperation.getFrequencyAllInfo(GeneralVariables.band)));
            setActivated(false);
            return;
        }
        
		
		if( (functionOrder==4 || functionOrder==5)  ) // 發送RR73或是73完成  本來是4,5 改成3,4加快
		{
				
				if( !saveQso){ // 稍後再來檢查，如果是人為選入4,5但是沒有收到任何訊息報告時要怎麼處理
					LogExt.d(TAG, "4,5 ----doTransmit()發射完成，發射時紀錄(doTransmit)" ); //RR73/RRR, 73
					doComplete();//保存到数据库
				}
				
				// 把呼叫完成的，也從候選清單移除
				GeneralVariables.delOneCandidateInfo_CQME(toCallsign.callsign);
				GeneralVariables.delOneCandidateInfo_CQ(toCallsign.callsign);
		}
		
		
        doTransmitThreadPool.execute(doTransmitRunnable);
		
        mutableFunctions.postValue(functionList);
    }

    /**
     * 设置呼叫，生成发射消息列表
     *
     * @param transmitCallsign 目标呼号
     * @param functionOrder    命令顺序
     * @param toMaidenheadGrid 目标网格
     */
    @SuppressLint("DefaultLocale")
    //@RequiresApi(api = Build.VERSION_CODES.N)
    public void setTransmit(TransmitCallsign transmitCallsign
            , int functionOrder, String toMaidenheadGrid) {

		//saveQso = false; // 買個保險，設定傳送時把QSO已經記錄設成False
		
        messageStartTime = 0;//复位起始的时间
		
		if (transmitCallsign == null) {
		//if (transmitCallsign.isEmpty()) {	
			LogExt.e(TAG, "setTransmit: 呼號物件空白, abort setting transmit");
			return;
		}

        Log.d(TAG, "準備發射資料(setTransmit)...");
        if (GeneralVariables.checkFun1(toMaidenheadGrid)) {
            this.toMaidenheadGrid = toMaidenheadGrid;
        } else {
            this.toMaidenheadGrid = "";
        }
        mutableToCallsign.postValue(transmitCallsign);//设定呼叫的目标对象（含报告、时序，频率，呼号）
        toCallsign = transmitCallsign;//设定呼叫的目标
		
		
		
		
		
        //mutableToCallsign.postValue(toCallsign);//设定呼叫的目标

        if (functionOrder == -1) {//说明是回复消息
            //此时的toMaidenheadGrid是extraInfo
			
            this.functionOrder = GeneralVariables.checkFunOrderByExtraInfo(toMaidenheadGrid) + 1;

			
            if (this.functionOrder == 6) {//如果已经是73了，就改到消息1
                this.functionOrder = 1;
            }
        } else {
            this.functionOrder = functionOrder;//当前指令的序号
        }
		
		
		
		
		
		// 設定呼叫頻率
		/*
        if (transmitCallsign.frequency == 0) {
            transmitCallsign.frequency = GeneralVariables.getBaseFrequency();
        }
        if (GeneralVariables.synFrequency) {//如果是同频发送，就与目标呼号频率一致
            setBaseFrequency(transmitCallsign.frequency);
        }
		*/
		/*boolean isCQ = "CQ".equalsIgnoreCase(transmitCallsign.callsign);
		if (isCQ) {
			currentTxFrequency = GeneralVariables.getBaseFrequency(); // 使用者設定
		} else {
			if (GeneralVariables.synFrequency && transmitCallsign.frequency > 0) {
				currentTxFrequency = transmitCallsign.frequency; // 跟頻
			} else {
				currentTxFrequency = GeneralVariables.getBaseFrequency();
			}
		}*/
		// 檢查是否需要切換聲音頻率
		updateTxFrequencyForCurrentState();

		
        //mutableSequential.postValue(GeneralVariables.ft8TransmitSignal.sequential^1);//通知发射时序改变
		mutableSequential.postValue(
				GeneralVariables.ft8TransmitSignal.sequential );
		
        generateFun();
        mutableFunctionOrder.postValue(functionOrder);

    }

    @SuppressLint("DefaultLocale")
    public void setBaseFrequency(float freq) {
        GeneralVariables.setBaseFrequency(freq);
        //写到数据中
        databaseOpr.writeConfig("freq", String.format("%.0f", freq), null);
    }

    /**
     * 根据消息号，生成对应的消息
     *
     * @param order 消息号
     * @return FT8消息
     */
	 
	public Ft8Message getFunctionCommand(int order) {
		if (toCallsign == null || toCallsign.callsign == null) {
		//if (toCallsign.isEmpty() || toCallsign.callsign.isEmpty()) {	
			Log.e(TAG, "getFunctionCommand: toCallsign is null, using default CQ message");
			return new Ft8Message("CQ", GeneralVariables.myCallsign, GeneralVariables.getMyMaidenhead4Grid());
		}
		return getFunctionCommand(order,toCallsign.callsign);
		
		
		
		
		
	}
	
    public Ft8Message getFunctionCommand(int order,String toCallsignStr) {
		String resu="";
		
		
        switch (order) {
            //发射模式1，BG7YOY BG7YOZ OL50
            case 1:
                //resetTargetReport();//把给对方的信号报告记录复位成-100	
				//return new Ft8Message(1, 0, toCallsign.callsign, GeneralVariables.myCallsign
                //        , GeneralVariables.getMyMaidenhead4Grid());
				return new Ft8Message(1, 0, toCallsignStr, GeneralVariables.myCallsign
                        , GeneralVariables.getMyMaidenhead4Grid());		
            //发射模式2，BG7YOY BG7YOZ -10
            case 2:
				if (toCallsign != null) {
					sentTargetReport = toCallsign.snr;
					//return new Ft8Message(1, 0, toCallsign.callsign
					//        , GeneralVariables.myCallsign, toCallsign.getSnr());
					return new Ft8Message(1, 0, toCallsignStr
							, GeneralVariables.myCallsign, toCallsign.getSnr());	
				}else {
					Log.e(TAG, "toCallsign is null in case 2");
					sentTargetReport = -100;  // 預設
					return new Ft8Message(1, 0, toCallsignStr, GeneralVariables.myCallsign, "-10"); // 給預設報告
				}

				
            //发射模式3，BG7YOY BG7YOZ R-10
            case 3:
				if (toCallsign != null) {
					sentTargetReport = toCallsign.snr;
					//return new Ft8Message(1, 0, toCallsign.callsign
					//        , GeneralVariables.myCallsign, "R" + toCallsign.getSnr());
					return new Ft8Message(1, 0, toCallsignStr
							, GeneralVariables.myCallsign, "R" + toCallsign.getSnr());		
				}else {
					    Log.e(TAG, "toCallsign is null in case 3");
						sentTargetReport = -100;
						return new Ft8Message(1, 0, toCallsignStr, GeneralVariables.myCallsign, "R-10");// 給預設報告
				}
				
            //发射模式4，BG7YOY BG7YOZ RRR
            case 4:
                //return new Ft8Message(1, 0, toCallsign.callsign
                //        , GeneralVariables.myCallsign, "RR73");
				return new Ft8Message(1, 0, toCallsignStr
                        , GeneralVariables.myCallsign, "RR73");		
            //发射模式5，BG7YOY BG7YOZ 73
            case 5:
                //return new Ft8Message(1, 0, toCallsign.callsign
                //        , GeneralVariables.myCallsign, "73");
				return new Ft8Message(1, 0, toCallsignStr
                        , GeneralVariables.myCallsign, "73");
						
            //发射模式6，CQ BG7YOZ OL50
            case 6:
                //resetTargetReport();//把给对方的信号报告,接收到对方的信号报告记录复位成-100
                Ft8Message msg = new Ft8Message(1, 0, "CQ", GeneralVariables.myCallsign
                        , GeneralVariables.getMyMaidenhead4Grid());
                msg.modifier = GeneralVariables.toModifier;

                return msg;
        }

        return new Ft8Message("CQ", GeneralVariables.myCallsign
                , GeneralVariables.getMyMaidenhead4Grid());
    }

    /**
     * 生成指令序列
     */
    public void generateFun() {
        //ArrayList<FunctionOfTransmit> functions = new ArrayList<>();
        //GeneralVariables.noReplyCount = 0;
        functionList.clear();
		
		if (functionOrder == 6){ //如果当前的指令序列是6(CQ)，那么就只生成一个消息
			functionList.add(new FunctionOfTransmit(6, getFunctionCommand(6), false));
		}
		else{
			for (int i = 1; i <= 6; i++) {
				functionList.add(new FunctionOfTransmit(i, getFunctionCommand(i), false));
			}
		}
		
		for (int i = 0; i < functionList.size(); i++) {
            functionList.get(i).setCurrentOrder(functionOrder);
        }
		
        mutableFunctions.postValue(functionList);
        //setCurrentFunctionOrder(functionOrder);//设置当前消息
    }

    /**
     * 为了最大限度兼容，把32位浮点转换成16位整型，有些声卡不支持32位的浮点。
     *
     * @param buffer 32位浮点音频
     * @return 16位整型
     */
    private short[] float2Short(float[] buffer) {
        short[] temp = new short[buffer.length + 8];//多出8个为0的数据包，是为了兼容QP-7C的RP2040音频判断
        for (int i = 0; i < buffer.length; i++) {
            float x = buffer[i];
            if (x > 1.0)
                x = 1.0f;
            else if (x < -1.0)
                x = -1.0f;
            temp[i] = (short) (x * 32767.0);
        }
        return temp;
    }

    private void playFT8Signal(Ft8Message msg) {
		
		if (audioTrack != null) {
			LogExt.e(TAG, "⚠ 上一次 AudioTrack 尚未清除，強制 release");
			audioTrack.release();
			audioTrack = null;
		}
		
		
		boolean isFT4 = GeneralVariables.isFT4; // 依目前模式決定
		
		if(isFT4)
			LogExt.d(TAG, "--------------playFT4Signal-----------");
		else
			LogExt.d(TAG, "--------------playFT8Signal-----------");
		
        if (GeneralVariables.connectMode == ConnectMode.NETWORK) {//网络方式就不播放音频了
            Log.d(TAG, "playFT8Signal: 进入网络发射程序，等待音频发送。");


            if (onDoTransmitted != null) {//处理音频数据，可以给ICOM的网络模式发送
                onDoTransmitted.onTransmitByWifi(msg);
            }


            //long now = System.currentTimeMillis();
			long now = UtcTimer.getSystemTime();
			int maxDuration = GeneralVariables.isFT4 ? 5500 : 13100; // FT4 大約 4.5 秒音頻，保險抓 5.5 秒
			
            while (isTransmitting) {//等待音频数据包发送完毕再退出，以触发afterTransmitting
                try {
                    Thread.sleep(1);
                    //long current = System.currentTimeMillis() - now;
					long current = UtcTimer.getSystemTime() - now;
                    //if (current > 13100) {//实际发射的时长
					if (current > maxDuration) {//实际发射的时长
                        isTransmitting = false;
                        break;
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            Log.d(TAG, "playFT8Signal: 退出网络音频发送。");
            afterPlayAudio();
            return;
        }

        //进入到CAT串口传输音频方式
        //2023-08-16 由DS1UFX提交修改（基于0.9版），用于(tr)uSDX audio over cat的支持。
        if (GeneralVariables.controlMode == ControlMode.CAT) {
            Log.d(TAG, "playFT8Signal: try to transmit over CAT");

            if (onDoTransmitted != null) {//处理音频数据，可以给truSDX的CAT模式发送
                if (onDoTransmitted.supportTransmitOverCAT()) {
                    onDoTransmitted.onTransmitOverCAT(msg);

                    //long now = System.currentTimeMillis();
					long now = UtcTimer.getSystemTime();
					int maxDuration = GeneralVariables.isFT4 ? 5500 : 13000; // FT4 大約 4.5 秒音頻，保險抓 5.5 秒
					
                    while (isTransmitting) {//等待音频数据包发送完毕再退出，以触发afterTransmitting
                        try {
                            Thread.sleep(1);
                            //long current = System.currentTimeMillis() - now;
							long current = UtcTimer.getSystemTime() - now;
							
                            //if (current > 13000) {//实际发射的时长
							if (current > maxDuration) {//实际发射的时长
                                isTransmitting = false;
                                break;
                            }
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                    Log.d(TAG, "playFT8Signal: transmitting over CAT is finished.");
                    afterPlayAudio();
                    return;
                }
            }
        }


        //进入声卡模式
		// PlayFT8
        float[] buffer;
        //buffer = GenerateFT8.generateFt8(msg, GeneralVariables.getBaseFrequency()
        //        , GeneralVariables.audioSampleRate);

		int sampleRate = GeneralVariables.audioSampleRate;				
		
		LogExt.d(TAG, " 發射頻率="+ currentTxFrequency ); 
		
		buffer = Ft8DecodedMessage.generateFt8(
            msg,
            //GeneralVariables.getBaseFrequency(),
			currentTxFrequency,   // 用指定頻率回應
            sampleRate,
            isFT4
            //GeneralVariables.volumePercent // 若你的 JNI 支援 volume 參數
		);
		
				
        if (buffer == null) {
			ToastMessage.show("TX 失敗：FT8 音訊信號生成失敗 (buffer=null)");
			LogExt.e(TAG, "playFT8Signal: generateFt8 返回 null");
			GeneralVariables.log(TAG, "TX 失敗：FT8 音訊信號生成失敗 (buffer=null)");
            afterPlayAudio();
            return;
        }

		int durationMs = isFT4 ? 4500 : 12500; // 粗略長度，用於預留緩衝大小
		int bufferSize = sampleRate * durationMs / 1000 * 2;
		
		LogExt.d(TAG, String.format("播放 FT%s 訊號: %.0fHz, 長度約 %.1fs",
            isFT4 ? 4 : 8,
            //GeneralVariables.getBaseFrequency(),
			currentTxFrequency,
            durationMs / 1000.0));
		


        Log.d(TAG, String.format("playFT8Signal: 准备声卡播放....位数：%s,采样率：%d"
                , GeneralVariables.audioOutput32Bit ? "Float32" : "Int16"
                , GeneralVariables.audioSampleRate));
				
				
				
        // BT 音訊模式：用 VOICE_COMMUNICATION 路由到 BT SCO 裝置
        // 非 BT 模式：用 MEDIA 路由到喇叭（原本行為）
        if (GeneralVariables.btListen) {
            attributes = new AudioAttributes.Builder()
                    .setUsage(AudioAttributes.USAGE_VOICE_COMMUNICATION)
                    .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
                    .build();
        } else {
            attributes = new AudioAttributes.Builder()
                    .setUsage(AudioAttributes.USAGE_MEDIA)
                    .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
                    .build();
        }

        //myFormat = new AudioFormat.Builder().setSampleRate(FT8Common.SAMPLE_RATE)
        myFormat = new AudioFormat.Builder().setSampleRate(GeneralVariables.audioSampleRate)
                .setEncoding(GeneralVariables.audioOutput32Bit ? //浮点与整型
                        AudioFormat.ENCODING_PCM_FLOAT : AudioFormat.ENCODING_PCM_16BIT)
                .setChannelMask(AudioFormat.CHANNEL_OUT_MONO).build();
        int mySession = 0;
		
		
		
        audioTrack = new AudioTrack(attributes, myFormat
                , GeneralVariables.audioOutput32Bit ? GeneralVariables.audioSampleRate * 15 * 4
                : GeneralVariables.audioSampleRate * 15 * 2//浮点与整型
                , AudioTrack.MODE_STATIC
                , mySession);

		if (audioTrack == null) {
			ToastMessage.show("TX 失敗：AudioTrack 初始化失敗，無法播放音訊");
			Log.e(TAG, "❌ AudioTrack 初始化失敗，無法播放音訊！");
			GeneralVariables.log(TAG, "TX 失敗：AudioTrack 初始化失敗，無法播放音訊");
			afterPlayAudio();
			return;
		}

		// 嘗試將音訊輸出路由到 USB 設備（含平板常見的 USB_ACCESSORY 類型）
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
			try {
				AudioManager audioManager =
					(AudioManager) GeneralVariables.getMainContext()
						.getSystemService(Context.AUDIO_SERVICE);
				if (audioManager != null) {
					StringBuilder deviceLog = new StringBuilder("Audio out:");
					boolean routed = false;
					for (AudioDeviceInfo device :
							audioManager.getDevices(AudioManager.GET_DEVICES_OUTPUTS)) {
						deviceLog.append(" [t=").append(device.getType())
								.append(" ").append(device.getProductName()).append("]");
						if (!routed && (device.getType() == AudioDeviceInfo.TYPE_USB_DEVICE
								|| device.getType() == AudioDeviceInfo.TYPE_USB_HEADSET
								|| device.getType() == AudioDeviceInfo.TYPE_USB_ACCESSORY)) {
							boolean ok = audioTrack.setPreferredDevice(device);
							deviceLog.append("→USB route=").append(ok);
							routed = true;
						}
					}
					GeneralVariables.log(TAG, deviceLog.toString());
				}
			} catch (Exception e) {
				Log.e(TAG, "⚠️ 設置 USB 音訊輸出設備失敗: " + e.getMessage());
			}
		}

        //区分32浮点和整型
        int writeResult;
        if (GeneralVariables.audioOutput32Bit) {
            writeResult = audioTrack.write(buffer, 0, buffer.length
                    , AudioTrack.WRITE_NON_BLOCKING);
        } else {
            short[] audio_data = float2Short(buffer);
            writeResult = audioTrack.write(audio_data, 0, audio_data.length
                    , AudioTrack.WRITE_NON_BLOCKING);
        }

        if (buffer.length > writeResult) {
            Log.e(TAG, String.format("播放缓冲区不足：%d--->%d", buffer.length, writeResult));
        }

        //检查写入的结果，如果是异常情况，则直接需要释放资源
        if (writeResult == AudioTrack.ERROR_INVALID_OPERATION
                || writeResult == AudioTrack.ERROR_BAD_VALUE
                || writeResult == AudioTrack.ERROR_DEAD_OBJECT
                || writeResult == AudioTrack.ERROR) {
            //出异常情况
			ToastMessage.show("TX 失敗：AudioTrack 寫入錯誤 (code=" + writeResult + ")");
            Log.e(TAG, String.format("播放出错：%d", writeResult));
			GeneralVariables.log(TAG, "TX 失敗：AudioTrack 寫入錯誤 (code=" + writeResult + ")");
            afterPlayAudio();
            return;
        }
		

		
        audioTrack.setNotificationMarkerPosition(buffer.length);
        audioTrack.setPlaybackPositionUpdateListener(new AudioTrack.OnPlaybackPositionUpdateListener() {
            @Override
            public void onMarkerReached(AudioTrack audioTrack) {
                afterPlayAudio();
            }

            @Override
            public void onPeriodicNotification(AudioTrack audioTrack) {

            }
        });
        if (audioTrack != null && audioTrack.getState() == AudioTrack.STATE_INITIALIZED) {
            try {
				audioTrack.play();
				audioTrack.setVolume(GeneralVariables.volumePercent);
			} catch (IllegalStateException e) {
				LogExt.e(TAG, "❌ play() 發生 IllegalStateException：" + e.getMessage());
				afterPlayAudio(); // 強制觸發回收
				return;
			}
        }
		else {
			LogExt.d(TAG, "❌ AudioTrack 尚未初始化成功，無法播放！");
			afterPlayAudio();
			return;
		}
		
    }

    /**
     * 播放完声音后的处理动作。包括回调onAfterTransmit,用于关闭PTT
     */
    private void afterPlayAudio() {
        if (onDoTransmitted != null) {
            onDoTransmitted.onAfterTransmit(getFunctionCommand(functionOrder), functionOrder);
        }
        isTransmitting = false;
        mutableIsTransmitting.postValue(false);
        if (audioTrack != null) {
            audioTrack.release();
            audioTrack = null;
        }
    }

    //当通联成功时的动作
    private void doComplete() {
        //messageEndTime = UtcTimer.getSystemTime();//获取结束的时间
		
		
		if (saveQso) {
			LogExt.d(TAG, "QSO already saved, skip.");
			//GeneralVariables.sendToSSE(TAG + "!! QSO already saved, skip." );
			return;
		}
		saveQso = true;
		
		LogExt.d(TAG, "   doComplete() ✅ 雙方交換信號報告，直接視為完成 QSO");
		GeneralVariables.qsoCnt++;
		databaseOpr.writeConfig("qsoCnt", String.valueOf(GeneralVariables.qsoCnt), null);
						
		//GeneralVariables.sendToSSE(TAG , "✅ 雙方交換信號報告，直接視為完成 QSO" );

        //如对方没有网格，就从历史呼号与网格对应表中查找
        toMaidenheadGrid = GeneralVariables.getGridByCallsign(toCallsign.callsign, databaseOpr);

        if (messageStartTime == 0) {//如果起始时间没有，就取现在的
            messageStartTime = UtcTimer.getSystemTime();
        }


        //从历史记录中查信号报告
        //此处处理信号报告，是因为保存的信号报告经常与实际通联的信号报告不一致。
        //遍历接收到对方的信号报告
        for (int i = GeneralVariables.transmitMessages.size() - 1; i >= 0; i--) {
            Ft8Message message = GeneralVariables.transmitMessages.get(i);
            if ((GeneralVariables.checkFun3(message.extraInfo)
                    || GeneralVariables.checkFun2(message.extraInfo))
                    && (message.callsignFrom.equals(toCallsign.callsign)
                    && GeneralVariables.checkIsMyCallsign(message.callsignTo))) {
                    //&& message.callsignTo.equals(GeneralVariables.myCallsign))) {
                receiveTargetReport = getReportFromExtraInfo(message.extraInfo);
                break;
            }
        }
        //遍历我发送给对方的信号报告
        for (int i = GeneralVariables.transmitMessages.size() - 1; i >= 0; i--) {
            Ft8Message message = GeneralVariables.transmitMessages.get(i);
            if ((GeneralVariables.checkFun3(message.extraInfo)
                    || GeneralVariables.checkFun2(message.extraInfo))
                    && (message.callsignTo.equals(toCallsign.callsign)
                    && GeneralVariables.checkIsMyCallsign(message.callsignFrom))) {
                    //&& message.callsignFrom.equals(GeneralVariables.myCallsign))) {
                sentTargetReport = getReportFromExtraInfo(message.extraInfo);
                break;
            }
        }


        messageEndTime = UtcTimer.getSystemTime();
		
        if (onDoTransmitted != null) {//用于保存通联记录
            onTransmitSuccess.doAfterTransmit(new QSLRecord(
                    messageStartTime,
                    messageEndTime,
                    GeneralVariables.myCallsign,
                    GeneralVariables.getMyMaidenhead4Grid(),
                    toCallsign.callsign,
                    toMaidenheadGrid,
                    sentTargetReport != -100 ? sentTargetReport : sendReport,
                    receiveTargetReport != -100 ? receiveTargetReport : receivedReport,//如果给对方的信号报告是不是-100，就用发给对方的信号报告记录
                    GeneralVariables.isFT4 ? "FT4" : "FT8",
                    GeneralVariables.band,
                    //Math.round(GeneralVariables.getBaseFrequency()
					Math.round(currentTxFrequency))
            );

            GeneralVariables.addQSLCallsign(toCallsign.callsign);//把通联成功的呼号添加到列表中
			ToastMessage.show(String.format("[QSO] : %s , at %s", toCallsign.callsign
                    , BaseRigOperation.getFrequencyAllInfo(GeneralVariables.band)));
        }

    }

    /**
     * 设置当前要发射的指令顺序
     *
     * @param order 顺序
     */
    public void setCurrentFunctionOrder(int order) {
        functionOrder = order;
        for (int i = 0; i < functionList.size(); i++) {
            functionList.get(i).setCurrentOrder(order);
        }
        //if (order == 1) {
        //    resetTargetReport();//复位信号报告
        //}
        //if (order == 4 || order == 5) {
        //    updateQSlRecordList(order, toCallsign);
        //}
        mutableFunctions.postValue(functionList);
    }


    /**
     * 当目标是复合呼号（非标准信号），JTDX回复可能会缩短
     *
     * @param fromCall 对方的呼号
     * @param toCall   我的目标呼号
     * @return 是不是
     */
    private boolean checkCallsignIsCallTo(String fromCall, String toCall) {
        if (toCall.contains("/")) {//当对方的呼号在斜线时，JTDX会把/后面的字符去掉
            return toCall.contains(fromCall);
        } else {
            return fromCall.equals(toCall);
        }
    }

    /**
     * 检查消息中from中有目标呼号的数量。当有目标呼号呼叫我的消息，返回0，如果目标呼号呼叫别人，返回值应当大于1
     *
     * @param messages 消息列表
     * @return 0：有目标呼叫我的，1：没有任何目标呼号发出的消息，>1：有目标呼号呼叫别人的消息
     */
    private int checkTargetCallMe(ArrayList<Ft8Message> messages) {
        int fromCount = 1;
        for (int i = messages.size() - 1; i >= 0; i--) {
            Ft8Message ft8Message = messages.get(i);
            if (ft8Message.getSequence() == sequential) continue;//同一个时序下的消息不做解析
            if (toCallsign == null) {
                continue;
            }
            //if (ft8Message.getCallsignTo().equals(GeneralVariables.myCallsign)
            if (GeneralVariables.checkIsMyCallsign(ft8Message.getCallsignTo())
                    && checkCallsignIsCallTo(ft8Message.getCallsignFrom(), toCallsign.callsign)) {
                return 0;
            }
            if (checkCallsignIsCallTo(ft8Message.getCallsignFrom(), toCallsign.callsign)) {
                fromCount++;//计数器，from是目标呼号的情况
            }
        }
        return fromCount;
    }

    /**
     * 检测本消息列表中对方回复消息的序号，如果没有,返回-1
     *
     * @param messages 消息列表
     * @return 消息的序号
     */
    private int checkFunctionOrdFromMessages(ArrayList<Ft8Message> messages) {
		int retVal=-1;
		
		// 優先處理回應我的呼叫對象的回應，後面才來處理沒回應時，撈別人的CQ
		//Log.d(TAG, "====== Check others step:checkFunctionOrdFromMessages");
		
		if (toCallsign != null && toCallsign.callsign!=null ) { // 如果目前沒有呼叫對象，傳回預設值-1

			for (int i = messages.size() - 1; i >= 0; i--) 
			{
				Ft8Message ft8Message = messages.get(i);
				
				LogExt.d(TAG, String.format("解析訊息: from=%s → to=%s , 我是=%s, 呼叫對象=%s",
					ft8Message.getCallsignFrom(), ft8Message.getCallsignTo(), GeneralVariables.myCallsign, toCallsign.callsign));
				
				
				
				if (ft8Message.getSequence() == sequential) {
					LogExt.d(TAG, "同一个时序下的消息不做解析 checkFunctionOrdFromMessages");
					continue;//同一个时序下的消息不做解析
				}

				if ( GeneralVariables.checkIsMyCallsign(ft8Message.getCallsignTo()) && // 對象是我
					ft8Message.getCallsignFrom().equals(toCallsign.callsign)
						/*&& checkCallsignIsCallTo(ft8Message.getCallsignFrom(), toCallsign.callsign)*/) 
				{
					//--TODO ----检查起始时间是不是0，如果是0，补充起始时间。因为有的呼叫会越过第一步
					LogExt.d(TAG, "================= 對象是我---");
					
					
					
					
					
					
					
					
					
					
					if (GeneralVariables.checkFun3(ft8Message.extraInfo) ||
							 GeneralVariables.checkFun2(ft8Message.extraInfo)) 
					{
						//从消息中取信号报告，如果不正确（-100），那么就取消息中的信号报告
						receivedReport = getReportFromExtraInfo(ft8Message.extraInfo);
						receiveTargetReport=receivedReport; //对方给我的信号报告，要保存下来
				 
						if (receivedReport == -100) 
						{//如果不正确，就取訊息报告
							receivedReport = ft8Message.report;
						}
						//Log.d(TAG, " --- !!receivedReport:" + receiveTargetReport  );
					}
					
					sendReport = messages.get(i).snr;//把接收到的信号保存下来
					
					//Log.d(TAG, " --- receivedReport:" + receiveTargetReport + " sendReport Rpt:"+ sendReport );
					
					retVal = GeneralVariables.checkFunOrder(ft8Message);//检查消息的序号
					
					
					//if (receivedReport != -100 && sentTargetReport != -100 && !saveQso) {
					//	//Log.d(TAG, "✅ 雙方交換信號報告，直接視為完成 QSO");
					//	doComplete();
					//}
					
					
					
					
					//Log.d(TAG, " --- After CheckFunOrder receivedReport:" + receivedReport + " sendReport Rpt:"+ sendReport );
					
					LogExt.d(TAG, "Yes");
					
					
					break;
				} // 對象是我
				else{
					Log.d(TAG, "================= 對象不是我--- Ret:"+GeneralVariables.checkFunOrder(ft8Message));//检查消息的序号
					
				}
			} // ---- For
			
		}
		//Log.d(TAG, " ==== Order===:"+ retVal );
        return retVal;
    }

    /**
     * 从扩展消息中获取对方给的信号报告，获取失败，值-100
     *
     * @param extraInfo 扩展消息
     * @return 信号报告
     */
    private int getReportFromExtraInfo(String extraInfo) {
        String s = extraInfo.replace("R", "").trim();
        try {
            return Integer.parseInt(s);
        } catch (Exception e) {
            return -100;
        }
    }

    /**
     * 检查是不是属于排除的消息：
     * 1.与发射的时序相同
     * 2.不在相同的波段
     * 3.呼号是排除的字头
     *
     * @param msg 消息
     * @return 是/否
     */
    private boolean isExcludeMessage(Ft8Message msg) {
        return msg.getSequence() == sequential || msg.band != GeneralVariables.band
                || GeneralVariables.checkIsExcludeCallsign(msg.callsignFrom);
    }

    

    public void updateQSlRecordList(int order, TransmitCallsign toCall) {
        //if (toCall == null) return;
		//if (toCall.isEmpty()) return;
        //if (toCall.callsign.equals("CQ")) {
		if (isCQ(toCall.callsign)) {	
			Log.d(TAG,"  ----toCall.callsign.equals(CQ)");
			return;
		}
		Log.d(TAG,"  ----updateQSlRecordList:"+order);
        QSLRecord record = GeneralVariables.qslRecordList.getRecordByCallsign(toCall.callsign);
        if (record == null) {
            toMaidenheadGrid = GeneralVariables.getGridByCallsign(toCallsign.callsign, databaseOpr);
            record = GeneralVariables.qslRecordList.addQSLRecord(new QSLRecord(
                    messageStartTime,
                    messageEndTime,
                    GeneralVariables.myCallsign,
                    GeneralVariables.getMyMaidenhead4Grid(),
                    toCallsign.callsign,
                    toMaidenheadGrid,
                    sentTargetReport != -100 ? sentTargetReport : sendReport,
                    receiveTargetReport != -100 ? receiveTargetReport : receivedReport,//如果给对方的信号报告是不是-100，就用发给对方的信号报告记录
                    "FT8",
                    GeneralVariables.band,
                    //Math.round(GeneralVariables.getBaseFrequency()
					Math.round(currentTxFrequency)
					));
        }
        //根据消息序列更新内容
        switch (order) {
            case 1://更新网格，和对方消息的SNR
                record.setToMaidenGrid(toMaidenheadGrid);
                record.setSendReport(sentTargetReport != -100 ? sentTargetReport : sendReport);
                GeneralVariables.qslRecordList.deleteIfSaved(record);
                break;
            case 2://更新对方返回的信号报告，和对方的信号报告
            case 3:
                record.setSendReport(sentTargetReport != -100 ? sentTargetReport : sendReport);
                record.setReceivedReport(receiveTargetReport != -100 ? receiveTargetReport : receivedReport);
                GeneralVariables.qslRecordList.deleteIfSaved(record);
                break;

            //当RR73或73的状态下，就保存日志。
            case 4:
            case 5:
				Log.d(TAG,"  === receiveTargetReport:"+receiveTargetReport+" sentTargetReport:"+sentTargetReport);
				//if(receiveTargetReport==-100){
						// 未曾收到訊號報告，請回到訊號報告
						//functionOrder=1;
						//GeneralVariables.forceOnce=true;
						//Log.d("DecodeResult","  ----No Sig report ----- Back to Step 1");
				//	}
				//	else{
						//if( !saveQso){
						//doComplete();//保存到数据库
						//record.saved = true;
						//saveQso=true;
						//Log.d("DecodeResult","  ----Save QSO ----");
						//}
				//	}
				//receiveTargetReport
                break;
        }

    }
	
	
	
	void callFromCQME(String msg)
	{
		if(!GeneralVariables.candidateCallSignList_CQME.isEmpty() )
		{
			LogExt.d(TAG, "   呼叫後，回到CQ模式前，檢查呼叫我的候選名單中撈取!!!");
			Map<String, Object> candidateInfo=GeneralVariables.getCandidateInfo_CQME(false);
			String toCallSignStr = (String) candidateInfo.get("callSign");
			int NextOrder = (int) candidateInfo.get("order");
			float freq = (float) candidateInfo.get("freq");
			int seq = (int) candidateInfo.get("seq");
			int snrInt = (int) candidateInfo.get("snr");
			String maidenGrid=(String) candidateInfo.get("maidengrid");
						
									
			//移除其它相同的呼號
			GeneralVariables.delOneCandidateInfo_CQME(toCallSignStr);	
			GeneralVariables.delOneCandidateInfo_CQ(toCallSignStr);	
						
						
			NextOrder += 1;
			if(NextOrder>=6)
				NextOrder=1;
						
			functionOrder = NextOrder;
						
			//toCallsign.callsign=toCallSignStr;
						
			LogExt.d(TAG , "呼叫對象:"+toCallSignStr+ " functionOrder:"+functionOrder );
						
			resetTargetReport();
			GeneralVariables.noReplyCount=0;
			generateFun();
			setCurrentFunctionOrder(functionOrder);//设置当前消息
			mutableToCallsign.postValue(toCallsign);
			
			setTransmit(new TransmitCallsign(0, 0, toCallSignStr,  freq
										, seq, snrInt), functionOrder, maidenGrid );	 
		}								
	}

	/* 自動cq AUTOCQ 自動回應模式
	   解析訊息模式
	   處理訊息 parse BV6LC
	*/
	public void parseMessages(ArrayList<Ft8Message> msgList) 
	{
		double score;
		int FunOrder;
		
		String snr;
		int snrInt=-100;
		
		String maidenGrid="";
		
		String myCallSign;
		String myGrid;
		String fromCallsign; // 發送呼號 getCallsignTo
		String toCallsignStr ;     // 接收呼號
		
		String ScoreStr;
		
		int NextOrder;
		int respOrder=-1;
		
		
		// 儲存最佳呼號資訊
		Ft8Message bestMessage = null;
		double highestScore = 0;
		String bestTarget="";
		int bestFunOrder=0;
		String bestmaidenGrid="";
		float bestFreqHz=0.0f;
		int bestSnr=-100;
		
		boolean newCadedate=false;
		//int FunOrder=1;
		int parserSeq=sequential;
		
		String DebugStr;


		
		Ft8Message msg; // 暫存每一則訊息
		String grid ;	// 暫存每一則訊息的位置
		int dist=0; 	// 暫存每一訊息的距離
		
		
		DebugStr="";
		
		
		int loopCount = 0; // 檢查最佳CQ對象用於排除時防呆
		int maxLoops = 10; // 自行定義最大嘗試次數

		
		
		
		if ( GeneralVariables.myCallsign.length() < 3) 
			{
				LogExt.d(TAG, "   XXXX ====== myCallsign.length() < 3 ==== 自己呼號沒設定，不用處理"  );
				return; // 自己呼號沒設定，不用處理
			}

		ArrayList<Ft8Message> messages = new ArrayList<>(msgList); // 複製一套，避免執行續衝突修改到
		// 先檢查收到的資訊，依照目前處理進度，決定後續要處理方式
		if( (messages.size() > 0))
		{
			parserSeq=messages.get(0).getSequence(); // 取得目前處理順序
		}
		
		//mutableSequential.postValue(sequential^1);//通知发射时序改变
		//mutableSequential.postValue(sequential);//通知发射时序改变

		
		LogExt.d(TAG , " ●●●●●●解析訊息模式 parseMessages() 目前funOrd:"+functionOrder + " 處理順序:" + parserSeq+ " 我的發射順序:"+sequential +" MsgSize:"+messages.size() + isTransmitting);
		if(toCallsign!=null)
		{
			DebugStr=" ●● To:" + toCallsign.callsign ;
		}	
		
		
		// 尋找最佳呼號
		if ( (messages.size() > 0) && parserSeq!=sequential) // 有訊息而且不同周期才跑，避免拖慢速度，顯示太多資訊
		{	
			respOrder = checkFunctionOrdFromMessages(messages);//检查消息中对方回复的消息序号，-1为没有收到
			DebugStr=DebugStr+ " Resp:"+ respOrder;
			
			loopCount = 0;
			
			DebugStr="   ====== 找最佳呼號-循環開始" + DebugStr ;
			
			LogExt.d(TAG, DebugStr );
			DebugStr="";
			
			myCallSign=GeneralVariables.myCallsign;
			myGrid=GeneralVariables.getMyGrid();
			
			long best_freq_hz=0;
			
			
			// 從收到訊息中，檢查最佳CQ對象，以及有呼叫我的對象
			while(true)
			{	
				// 依續檢查所有收到訊息
				highestScore=0;
				
				for (int i = messages.size() - 1; i >= 0; i--) 
				{
					dist=0;
					ScoreStr="";
					score=0;
					FunOrder=-1;
					
					msg = messages.get(i);
					// 獲取呼號和其他資訊
					
					fromCallsign = msg.getCallsignFrom(); 				// 發送呼號 getCallsignTo
					toCallsignStr = msg.getCallsignTo();				// 接收呼號
					grid = msg.getMaidenheadGrid(databaseOpr);
					parserSeq=msg.getSequence();						// 取得目前處理順序
					
					// 🔁 跟頻：對方是目前通聯對象，就算他在 CQ 也要跟
					if (
						GeneralVariables.synFrequency
						&& toCallsign != null
						&& fromCallsign.equals(toCallsign.callsign)
						&& msg.freq_hz > 0
					) {
						if (Math.abs(currentTxFrequency - msg.freq_hz) > 1) {
							currentTxFrequency = msg.freq_hz;
							toCallsign.frequency= msg.freq_hz;
							LogExt.d(TAG, "🎯 跟頻更新（decode）→ " + currentTxFrequency + " Hz");
						}
					}
					
					
					
					
					FunOrder=GeneralVariables.checkFunOrder(msg); 		//取得本訊息的順序
					snr = msg.getdB().replaceAll("[^\\d-]", "").trim(); // 移除非數字字符 取得訊號報告
					snrInt = Integer.parseInt(snr);
					maidenGrid=msg.getmaidenGrid();
					
					LogExt.d(TAG, "Check ：" + msg.getMessageText() +" "+ fromCallsign);
					
					if (FunOrder>=6)
					{
						//FunOrder=6;
						FunOrder=0;
					}
					
					
					// 忽略在 FailCallSign 清單中的訊息
					if ( GeneralVariables.failCallSignList.contains(fromCallsign) && // 在呼叫清單中
						 !((GeneralVariables.checkIsMyCallsign(msg.getCallsignTo()) &&
							!GeneralVariables.checkFun4(msg.extraInfo) && 
							!GeneralVariables.checkFun5(msg.extraInfo)))   )  // 不是在CQ我
						 {
						LogExt.d(TAG, "XXX ==== 已經存在失敗清單中，不處理" + fromCallsign);
						continue;
					}
					// 忽略在 isExcludeMessage 清單中的訊息
					if ( GeneralVariables.checkIsExcludeCallsign(fromCallsign) )
					{
						LogExt.d(TAG, "XXX ==== 忽略清單，不處理" + fromCallsign);
						continue;
					}
					
					
					if (toCallsign!=null && toCallsign.callsign.equals(fromCallsign) )
					{
						LogExt.d(TAG, "XXX ==== "+ fromCallsign +" 通訊中，移除，避免稍後RR73/73之後又被抓來" );
						continue;
						
					}
					
					//  My Watch List
					if(GeneralVariables.callsignInFollow( msg.getCallsignFrom() )  && !msg.isQSL_Callsign  ) { //  My Watch List 2025/11/28 排除已經呼叫過
						ScoreStr=ScoreStr+ "/我的關注清單My Trace Call Sign:"+((WEIGHT_CALLING_ME)*FunOrder +" ");
						score += WEIGHT_FOLLOW_CALLSIGN;
					}
					
					// 呼叫的是我，而且不是73
					if( GeneralVariables.checkIsMyCallsign(msg.getCallsignTo() ) && // 呼叫的是我
						!GeneralVariables.checkFun4(msg.extraInfo) &&        		// 而且不是73
						!GeneralVariables.checkFun5(msg.extraInfo) &&
						!myCallSign.equals(fromCallsign) )							// 發出呼叫的也不是我自己
					{
						
						ScoreStr=ScoreStr+ "/呼叫的是我，而且不是RR73或是73:"+((WEIGHT_CALLING_ME)*FunOrder +"，把呼叫我的加入候選清單(FunOrd):"+FunOrder);
						//score+=WEIGHT_CALLING_ME;	
						score+=((WEIGHT_CALLING_ME)*FunOrder); // 乘以呼叫Order 2,3,4,5,6 	

						// 加入呼叫清單，而且自failCallSignList.remove("BX2AKO");移除
						GeneralVariables.addOneCandidateInfo(msg.getCallsignFrom(),FunOrder,msg.freq_hz, msg.getSequence() , snrInt , maidenGrid,msg.getMessageText());
						GeneralVariables.failCallSignList.remove(msg.getCallsignFrom());
					}
					
					
					// 單純CQ
					if( msg.getCallsignTo().equals("") && // CQ
						msg.isQSL_Callsign) 
					{
						ScoreStr=ScoreStr+ "/通聯過";
					}
					
					
					
					// 沒有通聯過才計算	
					if( msg.getCallsignTo().equals("") && // CQ
						!msg.isQSL_Callsign) 
					{            
						ScoreStr=ScoreStr+ "/單純呼叫CQ Only:"+WEIGHT_IS_CQ;
						score+=WEIGHT_IS_CQ;	
						

						if(msg.isPotaSota) // SOTA/POTA
						{
							ScoreStr=ScoreStr+ "/SOTA/POTA:"+500 + "/把呼叫SOTA/POTA的加入候選清單(FunOrd):"+FunOrder ;
							score+= 500; // 
							
							GeneralVariables.addOneCandidateInfo(msg.getCallsignFrom(),FunOrder,msg.freq_hz, msg.getSequence() , snrInt , maidenGrid,msg.getMessageText());
						}
						
						if(msg.fromCq)
						{
							ScoreStr=ScoreStr+ "/新的CQ區域:"+WEIGHT_CQ_ZONE + " Sco:"+WEIGHT_CQ_ZONE;
							score += WEIGHT_CQ_ZONE; // 
						}
						
						if(msg.fromItu)
						{
							ScoreStr=ScoreStr+ "/新的ITU區域:"+WEIGHT_ITU_ZONE + " Sco:"+WEIGHT_ITU_ZONE;
							score += WEIGHT_ITU_ZONE; //
						}
							
						if(msg.fromDxcc)
						{
							ScoreStr=ScoreStr+ "/新的DXCC區域:"+WEIGHT_DXCC_ZONE + " Sco:"+ WEIGHT_DXCC_ZONE;
							score += WEIGHT_DXCC_ZONE; // 
						}
						
						// 計算距離分數	
						dist=(int) MaidenheadGrid.getDist(grid,myGrid) /1000;
						ScoreStr=ScoreStr+ "/Dist Sco:"+ (dist * WEIGHT_DIST );
						score += (dist * WEIGHT_DIST ); // 
						

						// 計算訊號分數									
						ScoreStr=ScoreStr+ "/SnrInt:"+( (snrInt+30) * WEIGHT_SNR);
						score+= ( (snrInt+30) * WEIGHT_SNR); // 
					}
					
					//if(ScoreStr!="" && GeneralVariables.autoFollowCQ) // 只有自動CQ時才要算分數
					if (!ScoreStr.isEmpty() && GeneralVariables.autoFollowCQ)
					{	
						if(score>0 && score> highestScore)// 分數比較高的放入Best中
						{ 
							
							highestScore=score;
						
							bestTarget=fromCallsign;
							bestMessage=msg;
							bestmaidenGrid=maidenGrid;
							bestFreqHz=msg.freq_hz;
							bestSnr=snrInt;
							bestFunOrder=FunOrder;

							LogExt.d(TAG, "== for =:"+ i +"** From["+ fromCallsign + "] " + ScoreStr + highestScore+" "+bestFunOrder + " Seq:"+msg.getSequence()+ " Grid:"+maidenGrid);
						}
						else
						{
							LogExt.d(TAG, "== for =:"+ i +"From["+ fromCallsign + "] " + ScoreStr + " Seq:"+msg.getSequence()  );
						}
						
					}	
				}
			
				// 如果找到最高分的訊息，或 FailCallSign 已經清空，退出迴圈 (Break)
				if ( (bestMessage != null) || 
						GeneralVariables.failCallSignList.isEmpty() ) {
					break;
				}
					
				// 若未找到有效訊息，移除 FailCallSign 的第一個元素並重新計算
				if ( (bestMessage == null) && (!GeneralVariables.failCallSignList.isEmpty()) ) {
					GeneralVariables.failCallSignList.remove(0);
					LogExt.d(TAG,"  找不到最佳呼號，將忽略清單第一個元素移除");
				}	
				
				loopCount++;
				if (loopCount > maxLoops) { 
					LogExt.e(TAG, "超過最大迴圈次數，強制跳出，避免無限循環");
					break;
				}
			}
			
			LogExt.d(TAG,"   ====== 找最佳呼號-循環結束===Best Target:[ "+bestTarget + " ] Score: ["+highestScore +" ] Ord:"+bestFunOrder);		
			
			String candidates = GeneralVariables.candidateCallSignList_CQME.stream()
								.map(m -> String.valueOf(m.get("callSign"))) // 換成你實際的 key
								.collect(Collectors.joining(", "));
			LogExt.d(TAG, "   1:曾經呼叫過我的候選呼叫清單：" + candidates );
			
			GeneralVariables.SendtoSSE_field("callmelist", "");  // 清除CallMe List
			for (Map<String, Object> m : GeneralVariables.candidateCallSignList_CQME) 
			{
				//String TmpcallSignStr = String.valueOf(m.get("callSign"));
				String TmpMsgText = String.valueOf(m.get("msgtext"));
				GeneralVariables.SendtoSSE_field("callmelist", TmpMsgText);  // 一筆一筆送
				//LogExt.d(TAG, "   ADD：[" + TmpcallSignStr +"]" );
				//LogExt.d(TAG, "📡 呼叫過我的: " + callSign);
			}
			
			GeneralVariables.SendtoSSE_field("ignorelist", "");  // 清除CallMe List
			for (String TmpcallSign : GeneralVariables.failCallSignList) {
				GeneralVariables.SendtoSSE_field("ignorelist", TmpcallSign);  // 清除CallMe List
			}
			
			candidates = String.join(",", GeneralVariables.failCallSignList);
			LogExt.d(TAG, "   3:-目前忽略清單：" + candidates );
			
		}	
		if( parserSeq==sequential) // ------------我發射中
		{
			LogExt.d(TAG, "    相同發射周期，已檢查是否完成CQ(RR73/73)，後續不處理!!!");
			return;
		}
		
		
		// 沒有收到任何訊息，以下可以忽略了
		if ( messages.size() == 0) 
		{

			// 若上一輪剛發送 73 或 RR73，則直接切換回 CQ 模式
			   if (functionOrder == 4 || functionOrder == 5) {
					   LogExt.d(TAG, "發送 73/RR73 後解碼空白 → 直接進入 CQ 模式");
					   resetToCQ();
					   //toCallsign.callsign = "CQ";
					   //functionOrder = 6;
					   //generateFun();
					   //setCurrentFunctionOrder(functionOrder);
					   //mutableToCallsign.postValue(toCallsign);
					   //mutableFunctionOrder.postValue(functionOrder);

					   // 立即啟動下一輪 CQ
					   setTransmit(
							   new TransmitCallsign(
									   0, 0, "CQ", GeneralVariables.getBaseFrequency(),
									   sequential, -33
							   ),
							   functionOrder,
							   ""
					   );
					   return;
			   }
			
				LogExt.d(TAG, "XXXX ====== msgList.size() == 0 ==== 沒收到訊息，也不算沒回應，可能是電台有問題" );
				return; // 沒收到訊息，也不算沒回應，可能是電台有問題
		}
		
		if( GeneralVariables.forceOnce )
		{    //要求Force Once
			GeneralVariables.forceOnce=false;
			LogExt.d(TAG, "====== 使用者選取動作，忽略收到順序!!===="  );
			return;
		}	
		
		
		// 進入呼叫後判斷
		
		if(toCallsign!=null) 
		{	
	        // 如果無回應，而且超過次數，則重設為CQ，方便後面重新抓下一個呼叫對象
			if(respOrder==-1)
			{
				//if(toCallsign.callsign!="CQ")
				if (!"CQ".equalsIgnoreCase(toCallsign.callsign))	
				{	
					GeneralVariables.noReplyCount += 1;
					
					
					LogExt.d(TAG, "functionOrder:"+functionOrder+" 未回應次數+1:" +GeneralVariables.noReplyCount);	
					
				}
				GeneralVariables.SendtoSSE_field("cqcnt",String.valueOf(GeneralVariables.noReplyCount ));	
				GeneralVariables.SendtoSSE_field("maxretry",String.valueOf(GeneralVariables.noReplyLimit));			
				
				// 目前呼叫中,超過呼叫限制
				if ( (GeneralVariables.noReplyCount >= (GeneralVariables.noReplyLimit) && (GeneralVariables.noReplyLimit > 0 )) 
					  || cqOnce
					)  //超過呼叫次數
				{
					if(cqOnce)
					{
						LogExt.d(TAG, "    老主顧只呼叫一次" );
					}
					else
					{
						LogExt.d(TAG, "    超過呼叫次數!!! ※※※※※※functionOrder:"+functionOrder+" 未回應次數歸零" );
						
						// 把目前呼號存入呼叫失敗清單中
						//if( toCallsign.callsign!="CQ")
						if (!"CQ".equalsIgnoreCase(toCallsign.callsign))
						{	
							LogExt.d(TAG, "把"+ toCallsign.callsign +"加入呼叫失敗清單!!" );
							if( !GeneralVariables.failCallSignList.contains(toCallsign.callsign) )
							{
							  GeneralVariables.failCallSignList.add(toCallsign.callsign);
							}
						}
						
						
					} 
					cqOnce=false;
					
					LogExt.d(TAG, "   目前呼叫失敗清單：" + String.join(", ", GeneralVariables.failCallSignList));
					
					// 把呼叫不成功，從候選清單移除
					GeneralVariables.delOneCandidateInfo_CQME(toCallsign.callsign);
					GeneralVariables.delOneCandidateInfo_CQ(toCallsign.callsign);
					
					
					LogExt.d(TAG, "將"+ toCallsign.callsign +"移除候選呼叫清單!!" );
					String candidates = GeneralVariables.candidateCallSignList_CQME.stream()
									.map(m -> String.valueOf(m.get("callSign"))) // 換成你實際的 key
									.collect(Collectors.joining(", "));
					LogExt.d(TAG, "   目前候選呼叫清單：" + candidates );
					
					GeneralVariables.noReplyCount=0;
					toCallsign.callsign="CQ";
					resetTargetReport();
					// 暫時放CQ，看看下面能不能撈到其他呼叫對象
					
				}
				
				
			}
			GeneralVariables.SendtoSSE_field("cqcnt",String.valueOf(GeneralVariables.noReplyCount ));	
			
			
			
			// 
			//LogExt.d(TAG, " toCallSign:"+toCallsign.callsign);
			//if (toCallsign.callsign=="CQ" || toCallsign.callsign=="" ) // --------------------------呼叫所有人中
			if ("CQ".equalsIgnoreCase(toCallsign.callsign) || toCallsign.callsign.isEmpty() ) // --------------------------呼叫所有人中
			{
				LogExt.d(TAG, "   目前呼叫對象:"+toCallsign.callsign + " AutoCQ:"+ GeneralVariables.autoFollowCQ);
				
				//if(GeneralVariables.autoFollowCQ &&  bestMessage!=null) // 如果有選自動回應CQ，則指派最可行呼號
				if(bestMessage!=null) // 如果有選自動回應CQ，則指派最可行呼號
				{
					functionOrder=bestFunOrder+1;
					maidenGrid=bestmaidenGrid; // 取得最佳呼叫者的maidenGrid
				
					if(functionOrder==0)
						{
						functionOrder=1;
						//LogExt.d(TAG, " functionOrder -1->"+functionOrder);
						}
						
					LogExt.d(TAG, " functionOrder:"+functionOrder);
					
					// 最佳CQ是1,加上1=2 ，所以判斷應該是<=2
					// 如果目前清單選出來的Order 都只是1，檢查候選清單有沒有人選，從候選清單找到分數較高者
					if(functionOrder<=2 && !GeneralVariables.candidateCallSignList_CQME.isEmpty() )
					{
						//LogExt.d(TAG, " 目前清單選出來的Order 都只是1，檢查有沒有候選清單比較高的!!!");
						callFromCQME(" 目前清單選出來的Order 都只是1，檢查有沒有候選清單比較高的!!!");
						return;
					}
					else
					{
						LogExt.d(TAG, " 呼叫CQ中，沒有候選名單，從最佳名單中選取!!!");
						
						toCallsign.callsign=bestMessage.getCallsignFrom();
						NextOrder=bestFunOrder+1;
						
						if(NextOrder>=6)
							NextOrder=1;
						
						functionOrder=NextOrder;
						
						LogExt.d(TAG , "目前沒有指定對象，指定最佳呼叫對象:"+bestTarget+ " bestFunOrder:"+functionOrder +" toCallsign.callsign:"+toCallsign.callsign);
							
						resetTargetReport();	
						generateFun();
						setCurrentFunctionOrder(functionOrder);//设置当前消息
						mutableFunctionOrder.postValue(functionOrder);				
						
						mutableToCallsign.postValue(toCallsign);
						
					
						setTransmit(new TransmitCallsign(0, 0, toCallsign.callsign,  bestFreqHz
													, parserSeq, bestSnr), functionOrder, bestmaidenGrid);	 
						return;
					}
				}
				
				// 從之前保存呼號尋找
				
				if(!GeneralVariables.candidateCallSignList_CQME.isEmpty() )
				{
					//LogExt.d(TAG, "   沒有最佳CQ名單，直接從呼叫我的候選名單中撈取!!!");
					callFromCQME("   沒有最佳CQ名單，直接從呼叫我的候選名單中撈取!!!");
					return;
				}
				else
				{
					LogExt.d(TAG , "   找不到最佳呼號，也沒有呼叫過我的候選名單");
				}

			}	
			else // --------------呼叫指定對象中(非CQ)
			{
				LogExt.d(TAG, "   目前指定對象:"+toCallsign.callsign);
				if (respOrder!=-1) //---- 呼叫對象有回應
				{	
					functionOrder=respOrder+1;
					
					if((respOrder==4) ||  (respOrder==5)) // 收到 發送RR73或是73完成 本來是4,5改成3,4 加快
					{
						
						if( !saveQso){ // 稍後再來檢查，如果是人為選入4,5但是沒有收到任何訊息報告時要怎麼處理
							LogExt.d(TAG, "   呼叫中，收到4:RR73,5:73 ，寫入QSL----2" );
							doComplete();//保存到数据库
						}
					}
					if(functionOrder==6)
					{
						
						if(!GeneralVariables.candidateCallSignList_CQME.isEmpty() )
								{
								//LogExt.d(TAG, "   沒有最佳CQ名單，直接從呼叫我的候選名單中撈取!!!");
								callFromCQME("呼叫完成，還有人呼叫我，緊接呼叫：");
								return;
						}
						else
						{
							resetToCQ();
							LogExt.d(TAG , "Reset to CQ");
						}	
					}
					else
					{	
						setCurrentFunctionOrder(functionOrder);//设置当前消息
						mutableFunctionOrder.postValue(functionOrder);	
						LogExt.d(TAG, "functionOrder:"+functionOrder+" 未回應次數歸零" );
						GeneralVariables.noReplyCount=0;
						return;
					}
				}
				else //---- 呼叫對象沒有回應
				{
					boolean polite=true; // 嚴格模式
					if(!polite){
						// 如果已經完成QSO,但是收不到對方的73，我自己發73
						if ( (functionOrder ==3) || (functionOrder ==4) || (functionOrder ==5)) 
						{
							
							functionOrder +=2; 
							LogExt.d(TAG, "●●●●，已經收到訊號報告，但是對方沒回應，我自己發RR73/73 ●●●●● Ord:"+functionOrder);
							
							if( !saveQso){ // 稍後再來檢查，如果是人為選入4,5但是沒有收到任何訊息報告時要怎麼處理
								LogExt.d(TAG, "3,4,5 目前在3,4,5對方沒回應----紀錄為QSO" );
								doComplete();//保存到数据库
							}
							cqOnce=true;
							
							if (functionOrder>=6)
							{
								functionOrder=6;
								resetToCQ();
							}
							else
							{	
								setCurrentFunctionOrder(functionOrder);//设置当前消息
								mutableFunctionOrder.postValue(functionOrder);	
								setTransmit(new TransmitCallsign(0, 0, toCallsign.callsign, 0
															, parserSeq, -33), functionOrder, "");
								return;							
							}		
						}
					}	
					
					// 如果呼叫中，而且目前還是 functionOrder-1 (第一次呼叫，對方還沒回應過我) 或是CQ中
					if (functionOrder==1 || functionOrder==6){
							if(!GeneralVariables.candidateCallSignList_CQME.isEmpty() )
								{
								//LogExt.d(TAG, "   沒有最佳CQ名單，直接從呼叫我的候選名單中撈取!!!");
								callFromCQME("第一階段呼叫"+toCallsign.callsign+"後，步驟funOrder:"+functionOrder+" 未回應次數:" +GeneralVariables.noReplyCount);
								return;
								}
						
								
					}	
					

					// 繼續呼叫
					generateFun();
					setCurrentFunctionOrder(functionOrder);//设置当前消息
					mutableToCallsign.postValue(toCallsign);
					mutableFunctionOrder.postValue(functionOrder);				

					
					LogExt.d(TAG , "沒收到回應，但是也沒有比較好的方案，繼續呼叫!!");
					return;
						
					
				}
				
				if(functionOrder==6)
				{
					if(!GeneralVariables.candidateCallSignList_CQME.isEmpty() )
					{
					//LogExt.d(TAG, "   沒有最佳CQ名單，直接從呼叫我的候選名單中撈取!!!");
						callFromCQME("呼叫後，回到CQ模式前，檢查呼叫我的候選名單中撈取!!!");
						return;
					}
				}
				
				
					
			}
			
			
			if(!GeneralVariables.candidateCallSignList_CQME.isEmpty() )
			{
			//LogExt.d(TAG, "   沒有最佳CQ名單，直接從呼叫我的候選名單中撈取!!!");
				callFromCQME("呼叫後，回到CQ模式前，檢查呼叫我的候選名單中撈取!!!");
				return;
			}
			
			
			// 最後直接cq
			resetToCQ();
			
			
			
			//toCallsign.callsign="CQ";
			//functionOrder=6;
			
			//generateFun();
			//restTransmitting();
			//resetToCQ();
			
			resetTargetReport();
			
			//generateFun();
			setCurrentFunctionOrder(functionOrder);//设置当前消息
			mutableToCallsign.postValue(toCallsign);
			mutableFunctionOrder.postValue(functionOrder);				
			/*setTransmit(new TransmitCallsign(0, 0, toCallsign.callsign,  GeneralVariables.getBaseFrequency()
													, sequential, snrInt), functionOrder, "");	 */
		}
		else
		{
			LogExt.d(TAG, "   ●●●●目前沒有設定呼叫對象!!!! NULL NULL●●●●●●●" );
			resetToCQ();
		}
			
		
		
	}
	// Parser 結束 -----------------------------------------------------------------------------------------------------------
	// Parser 結束 -----------------------------------------------------------------------------------------------------------
	// Parser 結束 -----------------------------------------------------------------------------------------------------------
		

    /**
     * 检查关注列表中，有没有正在CQ的消息，且不是我现在的目标呼号
     *
     * @param messages 关注的消息列表
     * @return 目标呼号，没有返回NULL
     */
    public boolean getNewTargetCallsign(ArrayList<Ft8Message> messages) {
        if (toCallsign == null) return false;
		//if (toCallsign.isEmpty()) return false;
        for (int i = messages.size() - 1; i >= 0; i--) {
            Ft8Message ft8Message = messages.get(i);
            if (ft8Message.band != GeneralVariables.band) {//如果消息不在相同的波段内，不理会
                continue;
            }
            //不是CQ,不理会
            if (!ft8Message.checkIsCQ()) {
                continue;
            }
            //不是当前的目标呼号，且之前没有通联成功过
            if ((!ft8Message.getCallsignFrom().equals(toCallsign.callsign)
                    && (!GeneralVariables.checkQSLCallsign(ft8Message.getCallsignFrom())))) //之前没有联通成功过
            {
                functionOrder = 1; 

                toCallsign.callsign = ft8Message.getCallsignFrom();
                return true;
            }


        }
        return false;
    }

    public boolean isSynFrequency() {
        return GeneralVariables.synFrequency;
    }


    public boolean isActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
        if (!this.activated) {//强制关闭发射
            setTransmitting(false);
        }
        mutableIsActivated.postValue(activated);
    }

    public boolean isTransmitting() {
        return isTransmitting;
    }

    public Ft8Message getCurrentMessage() {
        return currentMessage;
    }

    public void setTransmitting(boolean transmitting) {
        if (GeneralVariables.myCallsign.length() < 3 && transmitting) {
            ToastMessage.show(GeneralVariables.getStringFromResource(R.string.callsign_error));
            return;
        }

        if (!transmitting) {//停止发射
            if (audioTrack != null) {
                if (audioTrack.getState() != AudioTrack.STATE_UNINITIALIZED) {
                    audioTrack.pause();
                }
                if (onDoTransmitted != null) {//通知一下，已经不发射了
					//ToastMessage.show(String.format("!!!!!!XXXXRun %s",functionOrder));
                    onDoTransmitted.onAfterTransmit(getFunctionCommand(functionOrder), functionOrder);
                }
            }
        }

        mutableIsTransmitting.postValue(transmitting);
        isTransmitting = transmitting;
    }

    /**
     * 复位发射程序到6,时序也会改变
     */
    //@RequiresApi(api = Build.VERSION_CODES.N)
    public void restTransmittingAndChangeSeq() {
        if (GeneralVariables.myCallsign.length() < 3) {
            return;
        }
        //要判断我的呼号类型，才能确定i3n3 !!!
        int i3 = GenerateFT8.checkI3ByCallsign(GeneralVariables.myCallsign);
		
		
		sequential=(UtcTimer.getNowSequential()+1) % 2;
		
		
		LogExt.d(TAG, "Seq:" + sequential );
		//ToastMessage.show("CallSeq  "+sequential);
		
        setTransmit(new TransmitCallsign(i3, 0, "CQ", sequential)
                , 6, "");
				

		// 補上第一次發射
		long slotLen = GeneralVariables.isFT4
        ? FT8Common.FT4_SLOT_TIME_MILLISECOND   // 7500ms
        : FT8Common.FT8_SLOT_TIME_MILLISECOND;  // 15000ms
		
		// 對齊 UTC slot 開始的延遲時間
		long now = UtcTimer.getSystemTime();
		long offset = now % slotLen;
		long delayToNext = slotLen - offset;
		if (delayToNext < 0) delayToNext += slotLen;

		// 加上預設延遲（audio start offset）
		delayToNext += GeneralVariables.transmitDelay;
		if (delayToNext < 10) {
			delayToNext += slotLen;
			LogExt.e(TAG, "⚠ slot 邊界過近，強制延後一個 slot");
		}

		// ⭐⭐ 立即觸發一次 doTransmit（模擬一次完整 slot 流程）⭐⭐
		if (activated && (offset < 2500)) {  // 限定 slot 開始前 2.5 秒內才啟動
			LogExt.d(TAG, "⏱立即觸發一次 doTransmit()");
			doTransmit();
			
			//handler.postDelayed(() -> {
			//	doTransmit();  // ❗ 這裡會觸發 playFT8Signal()
			//}, delayToNextSlot + 100);  // 多延遲 100ms 等待 AudioTrack 初始化完成
			
			
		}		
				
    }

    /**
     * 把给对方的信号记录复位成-100；
     */
    public void resetTargetReport() {
        receiveTargetReport = -100;
        sentTargetReport = -100;
		send73=false;
		saveQso=false;
    }

    /**
     * 复位发射程序到6，不会改变时序
     */
    //@RequiresApi(api = Build.VERSION_CODES.N)
    public void resetToCQ() {
		
		
		
        resetTargetReport();
		
        if (toCallsign == null) {
		//if (toCallsign.isEmpty()) {	
			if(GeneralVariables.myCallsign.length()>0){
				//要判断我的呼号类型，才能确定i3n3 !!!
				int i3 = GenerateFT8.checkI3ByCallsign(GeneralVariables.myCallsign);
				//setTransmit(new TransmitCallsign(i3, 0, "CQ", (UtcTimer.getNowSequential() + 1) % 2)
				setTransmit(new TransmitCallsign(i3, 0, "CQ", sequential )
						, 6, "");
				//toCallsign.callsign = "CQ";		
				
				
				
			}
			else{
				ToastMessage.show("CallSign Empty");
			}
        } else {
            functionOrder = 6;
            toCallsign.callsign = "CQ";
            //mutableToCallsign.postValue(toCallsign);//设定呼叫的目标
            
			
			// ⭐⭐ 強制重新設定 CQ 的發射頻率 ⭐⭐
			updateTxFrequencyForCurrentState();
			//currentTxFrequency = GeneralVariables.getBaseFrequency();
			mutableToCallsign.postValue(toCallsign);
			
			generateFun();
			
        }
    }
	
	
	/**
     * 呼叫指定呼號
     */
    //@RequiresApi(api = Build.VERSION_CODES.N)
    public void callToCallSign(String callSign, int otherSequential, boolean nextseq,int snr,float otherFreqHz) {
		if (GeneralVariables.myCallsign == null || GeneralVariables.myCallsign.isEmpty()) {
			ToastMessage.show("My callsign is empty");
			return;
		}
		
		resetTargetReport();
		GeneralVariables.targetCallsign = callSign;
		GeneralVariables.targetCallsignsnr = snr;
		functionOrder = 1;
		GeneralVariables.noReplyCount = 0;
		
		
		// 決定要用的 slot（根據 useOppositeSeq 決定是否與對方相反）
		int seq = nextseq  ? (otherSequential + 1) % 2 : sequential;
		
		sequential=seq;
		
		
		// 更新 toCallsign 並通知 UI
		if (toCallsign == null) {
		//if (toCallsign.isEmpty()) {	
			//ToastMessage.show("Call Sign null");
			toCallsign = new TransmitCallsign(
					GenerateFT8.checkI3ByCallsign(GeneralVariables.myCallsign),
					0,
					callSign,
					GeneralVariables.getBaseFrequency(),
					seq,
					snr
			);
		} else {
			//ToastMessage.show("Call Sign not null");
			//toCallsign.callsign = callSign;
			//toCallsign.sequential = seq;
			float txFreq;
			// 同頻呼叫 → 用對方聲音頻率
			if (GeneralVariables.synFrequency && otherFreqHz > 0) {
				txFreq = otherFreqHz;
				toCallsign.frequency= otherFreqHz;
			} else {
				txFreq = GeneralVariables.getBaseFrequency();
			}
			
			toCallsign = new TransmitCallsign(
					GenerateFT8.checkI3ByCallsign(GeneralVariables.myCallsign),
					0,
					callSign,
					//GeneralVariables.getBaseFrequency(),
					txFreq,
					seq,
					snr
			);		
		}
		mutableToCallsign.postValue(toCallsign);
		mutableSequential.postValue(sequential);
		
		
		//檢查是否需要切換聲音頻率
		updateTxFrequencyForCurrentState();
		
		// 產生發射內容
		generateFun();
		setCurrentFunctionOrder(functionOrder);
		setTransmit(toCallsign, functionOrder, "");
    }
	
	public boolean isCallingCQ()
	{
		if(toCallsign==null)
		{
			return true;
		}
		else if("CQ".equals(toCallsign.callsign))
			{
				return true;
			}
		return false;	
	}

    /**
     * 设置发射时间延迟，这个延迟时间，也是给上一个周期解码的一个时间
     *
     * @param sec 毫秒
     */
    public void setTimer_sec(int sec) {
        transmitSlotTimer.setTime_sec(sec);
    }

    public boolean isTransmitFreeText() {
        return transmitFreeText;
    }

    public void setFreeText(String freeText) {
        this.freeText = freeText;
    }

    public void setTransmitFreeText(boolean transmitFreeText) {
        
		this.transmitFreeText = transmitFreeText;
        if (transmitFreeText) {
            ToastMessage.show(GeneralVariables.getStringFromResource(R.string.trans_free_text_mode));
        } else {
            ToastMessage.show((GeneralVariables.getStringFromResource(R.string.trans_standard_messge_mode)));
        }
    }


    //private static class DoTransmitRunnable implements Runnable {
	private class DoTransmitRunnable implements Runnable {	
        FT8TransmitSignal transmitSignal;

        public DoTransmitRunnable(FT8TransmitSignal transmitSignal) {
            this.transmitSignal = transmitSignal;
        }

        @SuppressLint("DefaultLocale")
        @Override
        public void run() {
            //todo 此处可能要修改，维护一个列表。把每个呼号，网格，时间，波段，记录下来
            if (transmitSignal.functionOrder == 1 || transmitSignal.functionOrder == 2) {//当消息处于1或2时，说明开始了通联
                transmitSignal.messageStartTime = UtcTimer.getSystemTime();
            }
            if (transmitSignal.messageStartTime == 0) {//如果起始时间没有，就取现在的
                transmitSignal.messageStartTime = UtcTimer.getSystemTime();
            }

            //用于显示将要发射的消息内容
            Ft8Message msg;
            if (transmitSignal.transmitFreeText) {
                msg = new Ft8Message("CQ", GeneralVariables.myCallsign, transmitSignal.freeText);
                msg.i3 = 0;
                msg.n3 = 0;
            } else {
                msg = transmitSignal.getFunctionCommand(transmitSignal.functionOrder);
				
            }
			
			transmitSignal.currentMessage = msg; // 將目前發射訊息存下來
			
            msg.modifier = GeneralVariables.toModifier;
			//msg.freq_hz = GeneralVariables.getBaseFrequency();
			msg.freq_hz = currentTxFrequency;
			
			
			msg.band = GeneralVariables.band;

            if (transmitSignal.onDoTransmitted != null) {
                //此处用于处理PTT等事件
                transmitSignal.onDoTransmitted.onBeforeTransmit(msg, transmitSignal.functionOrder);
            }
			//ToastMessage.show(String.format("Send %s",transmitSignal.functionOrder)); BV6LC

            transmitSignal.isTransmitting = true;
            transmitSignal.mutableIsTransmitting.postValue(true);


			// 顯示發射訊息
			//if(GeneralVariables.Power>0)
			//	transmitSignal.mutableTransmittingMessage.postValue(String.format(" (%.0fHz) %s (%.1fw)"
			//			, GeneralVariables.getBaseFrequency()
			//			, msg.getMessageText(),GeneralVariables.Power/10.0f));
			//else				
				transmitSignal.mutableTransmittingMessage.postValue(String.format(" (%.0fHz) %s"
						//, GeneralVariables.getBaseFrequency()
						, currentTxFrequency
						, msg.getMessageText()));
					
					
			LogExt.d(TAG ,  " 開始發射 Ord:"+transmitSignal.functionOrder+String.format(" 發射:(%.0fHz) %s Cnt=%d/%d"
                    //, GeneralVariables.getBaseFrequency()
					, currentTxFrequency
                    , msg.getMessageText() ,GeneralVariables.noReplyCount+1 , GeneralVariables.noReplyLimit) );
			
			//mutableSequential.postValue(toCallsign.sequential^1);//通知发射时序改变
			
			GeneralVariables.SendtoSSE_field("cq",msg.getMessageText());	
			GeneralVariables.SendtoSSE_field("maxretry",String.valueOf(GeneralVariables.noReplyLimit));			
					
			

			/*	
			// 寫入發射紀錄
			if (GeneralVariables.saveSWLMessage) {
				ArrayList<Ft8Message> savemsgs = new ArrayList<>();//放在呼叫界面，关注的列表
				LogExt.d(TAG, "寫入紀錄");
					savemsgs.add(msg);
                    //databaseOpr.writeMessage(messages);//把SWL消息写到数据库
					databaseOpr.writeMessage(savemsgs);//把SWL消息写到数据库
            }
			*/
			
					
					
			long delay = GeneralVariables.transmitDelay;		
			//if (mainViewModel.isRigConnected()) {
			delay += GeneralVariables.pttDelay;    // 電台連線：PTT + 延遲
			//}
			if(delay<=500)
				delay=500;
				

            //电台动作可能有要有个延迟时间，所以时间并不一定完全准确
            try {//给电台一个100毫秒的响应时间
                Thread.sleep(delay); //给PTT指令后，电台一个响应时间，默认100毫秒 (依照Config設定決定)
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            
			
			transmitSignal.playFT8Signal(msg);
        }
    }
	
	public void restartTimer() {
		
			// 1. 停止舊 Timer
			if (transmitSlotTimer != null) {
				transmitSlotTimer.stop();
			}
			
			// 2. 設定下一個 slot 才發射（安全）
			int nowSeq = UtcTimer.getNowSequential();
			sequential = (nowSeq + 1) % 2;
			mutableSequential.setValue(sequential);

			// 3. 每個 slot 長度（FT4=7500ms，FT8=15000ms）
			int slotLen = GeneralVariables.isFT4
					? FT8Common.FT4_SLOT_TIME_MILLISECOND
					: FT8Common.FT8_SLOT_TIME_MILLISECOND;

			LogExt.d(TAG, "重新啟動發射 Timer，下一個 slot sequential=" + sequential);

			// 4. 建立 Timer（後續規律每 7.5/15 秒觸發）
			transmitSlotTimer = new UtcTimer(slotLen, false, new OnUtcTimer() {
				@Override
				public void doHeartBeatTimer(long utc) {
				}

				@Override
				public void doOnSecTimer(long utc) {

					LogExt.d(TAG, "Timer!!! Seq=" + sequential +
							" NowSeq=" + UtcTimer.getNowSequential() +
							" activated=" + activated);

					if (GeneralVariables.isLaunchSupervisionTimeout()) {
						setActivated(false);
						//ToastMessage.show("TX 停止：發射監管超時 (" + GeneralVariables.launchSupervisionCount() / 1000 + "秒)");
						//LogExt.d(TAG, "發射監管超時!! 停止發射");
						//GeneralVariables.log(TAG, "TX 停止：發射監管超時 (" + GeneralVariables.launchSupervisionCount() / 1000 + "秒)");
						return;
					}

					if (UtcTimer.getNowSequential() == sequential && activated) {
						if (GeneralVariables.myCallsign.length() < 3) {
							ToastMessage.show(GeneralVariables.getStringFromResource(R.string.callsign_error));
							return;
						}
						LogExt.d(TAG, "doTransmit() 定時發射");
						doTransmit();
					}
				}
			});

			// 5. 計算距離下一個 slot 的剩餘時間
			long now = UtcTimer.getSystemTime();
			long offset = now % slotLen;
			long delayToNext = slotLen - offset;
			if (delayToNext < 0) delayToNext += slotLen;

			// 加上音頻延遲補償
			delayToNext += GeneralVariables.transmitDelay;

			// 防止 delay 接近 0ms 造成錯槽
			if (delayToNext < 10) {
				delayToNext += slotLen;
				LogExt.e(TAG, "⚠ slot 邊界過近，強制延後一個 slot");
			}

			LogExt.d(TAG, String.format("slotLen=%d offset=%d delayToNext=%d",
					slotLen, offset, delayToNext));

			// ⭐⭐⭐ 6. 對齊 slot → 先發射一次 → 再啟動 Timer ⭐⭐⭐
			new Handler(Looper.getMainLooper()).postDelayed(() -> {

				// 🔥 第一次 slot 對齊 → 立即發射
				if (activated && !transmithasFiredInitial) {
					transmithasFiredInitial=true;
					doTransmit();
					//mainHandler.postDelayed(() -> {
					//	LogExt.d(TAG, "⏱ Slot 對齊 → 延遲發射 "+GeneralVariables.transmitDelay);
					//	doTransmit();
					//}, GeneralVariables.transmitDelay);  // ★ 加上 pl_trans_delay
					
					
				}

				// 然後啟動週期性 Timer
				transmitSlotTimer.start();
				LogExt.d(TAG, "✅ transmitSlotTimer 已啟動，進入週期性發射");

			}, delayToNext);
			
			
			

	}	

	// 依具目前呼叫狀況，確認是否需要調整聲音頻率
	private void updateTxFrequencyForCurrentState() {
		if (toCallsign == null || "CQ".equalsIgnoreCase(toCallsign.callsign)) {
			currentTxFrequency = GeneralVariables.getBaseFrequency();
		} else {
			if (GeneralVariables.synFrequency && toCallsign.frequency > 0) {
				currentTxFrequency = toCallsign.frequency;
			} else {
				currentTxFrequency = GeneralVariables.getBaseFrequency();
			}
		}

		LogExt.d(TAG, "🎯 updateTxFrequency → " + currentTxFrequency + " Hz");
		
	}
	public void setCurrentTxFrequency(float freq) {
		this.currentTxFrequency = freq;
		LogExt.d(TAG, "🎯 UI 指定 Tx 頻率 = " + freq + " Hz");
	}
	private static boolean isCQ(String callsign) {
		return callsign == null || callsign.isEmpty() || "CQ".equalsIgnoreCase(callsign);
	}
	
	
	
}
