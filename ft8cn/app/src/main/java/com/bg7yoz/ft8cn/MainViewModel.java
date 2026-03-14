package com.bg7yoz.ft8cn;
/**
 * -----2022.5.6-----fGetQTHRunnable
 * MainViewModel类，用于解码FT8信号以及保存与解码有关的变量数据。生存于APP的整个生命周期。
 * 1.解码的总条数。decoded_counter和mutable_Decoded_CounterdisconnectRig，将出现
 * 连续的周期内录音动作重叠，造成第二个录音动作失败。所以，第二个周期的录音开始前，要停止前一个周期的录音，造成的结果就是每一次录音
 * 的开始时间要晚于周期开始300毫秒（模拟器的结果），实际录音的长度一般在14.77秒左右
 * <p>
 *
 * 2023-08-16 由DS1UFX提交修改（基于0.9版），增加(tr)uSDX audio over cat的支持。
 *
 * @author BG7YOZ
 * @date 2022.8.22
 * 2025/11/18 修正發射時Transmit還是Null時的問題
 */

import static com.bg7yoz.ft8cn.GeneralVariables.getStringFromResource;

import android.Manifest;
import android.content.pm.PackageManager;
import androidx.core.app.ActivityCompat;

import android.annotation.SuppressLint;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothProfile;
import android.content.Context;
import android.media.AudioManager;
import android.os.Handler;
import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.bg7yoz.ft8cn.callsign.CallsignDatabase;
import com.bg7yoz.ft8cn.callsign.CallsignInfo;
import com.bg7yoz.ft8cn.callsign.OnAfterQueryCallsignLocation;
import com.bg7yoz.ft8cn.connector.BluetoothRigConnector;
import com.bg7yoz.ft8cn.connector.CableConnector;
import com.bg7yoz.ft8cn.connector.CableSerialPort;
import com.bg7yoz.ft8cn.connector.ConnectMode;
import com.bg7yoz.ft8cn.connector.FlexConnector;
import com.bg7yoz.ft8cn.connector.IComWifiConnector;
import com.bg7yoz.ft8cn.connector.X6100Connector;
import com.bg7yoz.ft8cn.database.ControlMode;
import com.bg7yoz.ft8cn.database.DatabaseOpr;
import com.bg7yoz.ft8cn.database.OnAfterQueryFollowCallsigns;
import com.bg7yoz.ft8cn.database.OperationBand;
import com.bg7yoz.ft8cn.flex.FlexRadio;
import com.bg7yoz.ft8cn.ft8listener.FT8SignalListener;
import com.bg7yoz.ft8cn.ft8listener.OnFt8Listen;
import com.bg7yoz.ft8cn.ft8transmit.FT8TransmitSignal;
import com.bg7yoz.ft8cn.ft8transmit.OnDoTransmitted;
import com.bg7yoz.ft8cn.ft8transmit.OnTransmitSuccess;
import com.bg7yoz.ft8cn.html.LogHttpServer;
import com.bg7yoz.ft8cn.icom.WifiRig;
import com.bg7yoz.ft8cn.log.QSLCallsignRecord;
import com.bg7yoz.ft8cn.log.QSLRecord;
import com.bg7yoz.ft8cn.log.SWLQsoList;
import com.bg7yoz.ft8cn.log.ThirdPartyService;
import com.bg7yoz.ft8cn.rigs.BaseRig;
import com.bg7yoz.ft8cn.rigs.BaseRigOperation;
import com.bg7yoz.ft8cn.rigs.ElecraftRig;
import com.bg7yoz.ft8cn.rigs.Flex6000Rig;
import com.bg7yoz.ft8cn.rigs.FlexNetworkRig;
import com.bg7yoz.ft8cn.rigs.GuoHeQ900Rig;
import com.bg7yoz.ft8cn.rigs.IcomRig;
import com.bg7yoz.ft8cn.rigs.InstructionSet;
import com.bg7yoz.ft8cn.rigs.KenwoodKT90Rig;
import com.bg7yoz.ft8cn.rigs.KenwoodTS2000Rig;
import com.bg7yoz.ft8cn.rigs.KenwoodTS570Rig;
import com.bg7yoz.ft8cn.rigs.KenwoodTS590Rig;
import com.bg7yoz.ft8cn.rigs.OnRigStateChanged;
import com.bg7yoz.ft8cn.rigs.TrUSDXRig;
import com.bg7yoz.ft8cn.rigs.Wolf_sdr_450Rig;
import com.bg7yoz.ft8cn.rigs.XieGu6100NetRig;
import com.bg7yoz.ft8cn.rigs.XieGu6100Rig;
import com.bg7yoz.ft8cn.rigs.XieGuRig;
import com.bg7yoz.ft8cn.rigs.Yaesu2Rig;
import com.bg7yoz.ft8cn.rigs.Yaesu2_847Rig;
import com.bg7yoz.ft8cn.rigs.Yaesu38Rig;
import com.bg7yoz.ft8cn.rigs.Yaesu38_450Rig;
import com.bg7yoz.ft8cn.rigs.Yaesu39Rig;
import com.bg7yoz.ft8cn.rigs.YaesuDX10Rig;
import com.bg7yoz.ft8cn.rigs.QrpQmxRig; // BV6LC
import com.bg7yoz.ft8cn.spectrum.SpectrumListener;
import com.bg7yoz.ft8cn.timer.OnUtcTimer;
import com.bg7yoz.ft8cn.timer.UtcTimer;
import com.bg7yoz.ft8cn.ui.ToastMessage;
import com.bg7yoz.ft8cn.wave.HamRecorder;
import com.bg7yoz.ft8cn.wave.OnGetVoiceDataDone;
import com.bg7yoz.ft8cn.x6100.X6100Radio;
import com.bg7yoz.ft8cn.rigs.TX500MPRig;
import com.bg7yoz.ft8cn.rigs.YaesuFTX1Rig;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Objects;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import com.bg7yoz.ft8cn.log.PSKReporter; // PSKReporter

import android.app.Application;
import androidx.lifecycle.AndroidViewModel;
import androidx.annotation.NonNull;

import java.util.function.Consumer;

import android.location.Location;
import android.location.LocationListener;
import android.os.Bundle;
import android.content.Context;
import androidx.core.app.ActivityCompat;
import android.content.pm.PackageManager;
import android.location.LocationManager;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.Locale;

import android.app.Activity;

import android.os.Looper;

import android.os.SystemClock;
import android.os.Build;

import com.bg7yoz.ft8cn.maidenhead.MaidenheadGrid;
import com.bg7yoz.ft8cn.timer.GprmcUdpReceiver;
import com.google.android.gms.maps.model.LatLng;
import java.net.DatagramSocket;
import java.util.concurrent.atomic.AtomicBoolean;

//public class MainViewModel extends ViewModel {
//public class MainViewModel extends AndroidViewModel {	
//public class MainViewModel {
public class MainViewModel extends AndroidViewModel {	
	/* 0817 private static MainViewModel instance = null;
	*/
	
	// 錄音權限是否取得
	public final MutableLiveData<Boolean> audioPermissionGranted = new MutableLiveData<>(false);
	private boolean recorderInitialized = false;
	public final MutableLiveData<Boolean> coreInitialized = new MutableLiveData<>(false);
	public final MutableLiveData<Boolean> isReady = new MutableLiveData<>(false);
	private boolean coreInitStarted = false;
	
	public MutableLiveData<Boolean> showFloatView = new MutableLiveData<>(true);
	
	private boolean spectrumRunning = false;
	
	
	
	
	public void onAudioPermissionGranted() {
        //audioPermissionGranted.postValue(true);
		//audioPermissionGranted.setValue(true); // ✅ 改 setValue，避免還沒生效
		audioPermissionGrantedFlag = true;
		handler.post(() -> {
			audioPermissionGranted.setValue(true);
			tryStartAudioPipeline();
		});
		
		
        //tryStartAudioPipeline();
    }
	
	private void tryStartAudioPipeline() {
		LogExt.d("MainViewModel", "tryStartAudioPipeline() called");
		LogExt.d("MainViewModel", "audioPermissionGranted=" + audioPermissionGranted.getValue());
		LogExt.d("MainViewModel", "configIsLoaded=" + configIsLoaded);
		
	    if (coreInitStarted) {
			LogExt.d("BOOT", "tryStartAudioPipeline() ignored, already started");
			return;
		}
		
		
        if (recorderInitialized) return;
		
        if (!Boolean.TRUE.equals(audioPermissionGranted.getValue())) return;
        if (!configIsLoaded) return;

		LogExt.d("MainViewModel", ">>> initAll()");
		coreInitStarted = true;

        initRecorderAndTimers();
        recorderInitialized = true;
    }
	
	
	
	
	
	private final Application application;
	
	private final Handler handler = new Handler(Looper.getMainLooper());
	
	

	
	
	
	
	/*
	private MainViewModel(Application application) {
    this.application = application;
    initAll();  // 你原本建構子的初始化全部搬進去
	}
	*/
	public MainViewModel(@NonNull Application application) {
        super(application);
        this.application = application;
		//initAll();  // 你原本建構子的初始化全部搬進去
		initBasics();   // ⭐只做資料庫、LiveData初始值等，不 start 任何東西
    }
	
	private void initBasics() {
		LogExt.d(TAG, "initBasics()");

		databaseOpr = DatabaseOpr.getInstance(getContext(), "data.db");
		mutableIsDecoding.postValue(false);
		mutableIsFlexRadio.setValue(false);
		mutableIsXieguRadio.setValue(false);
		mutableFt8MessageList.setValue(ft8Messages);
	}
	
	
	
	/* 0817
	public static synchronized void initialize(Application application) {
		if (instance == null) {
				instance = new MainViewModel(application);
		}
	}*/
	
	/*public static MainViewModel getInstance() {
		if (instance == null) {
			throw new IllegalStateException("MainViewModel尚未初始化");
		}
		return instance;
	}
	*/
	
	
	
    String TAG = "MainViewModel";
    public boolean configIsLoaded = false;
	private boolean audioPermissionGrantedFlag = false;
	
	public PSKReporter pskReport; // 公共的 PSKReporter 實例

    private static MainViewModel viewModel = null;//当前存在的实例。
    //public static Application application;

    /** 供跨 Activity 共用：由 MainActivity 設定，GridTrackerMainActivity 取用 */
    public static void setMainInstance(MainViewModel vm) { viewModel = vm; }
    public static MainViewModel getMainInstance() { return viewModel; }


    //public int decoded_counter = 0;//解码的总条数
    public final ArrayList<Ft8Message> ft8Messages = new ArrayList<>();//消息列表
    public UtcTimer UiUtcClockTimer;//同步触发动作的计时器。


    //public CallsignDatabase callsignDatabase = null;//呼号信息的数据库
    public DatabaseOpr databaseOpr;//配置信息，和相关数据的数据库


    public MutableLiveData<Integer> mutable_Decoded_Counter = new MutableLiveData<>();//解码的总条数
    public int currentDecodeCount = 0;//本次解码的条数
    public MutableLiveData<ArrayList<Ft8Message>> mutableFt8MessageList = new MutableLiveData<>();//消息列表
    public MutableLiveData<Long> timerSec = new MutableLiveData<>();//当前UTC时间。更新频率由UtcTimer确定，未触发时约100毫秒。
    public MutableLiveData<Boolean> mutableIsRecording = new MutableLiveData<>();//是否处于录音状态
    public MutableLiveData<Boolean> mutableHamRecordIsRunning = new MutableLiveData<>();//HamRecord是否运转
    public MutableLiveData<Float> mutableTimerOffset = new MutableLiveData<>();//本周期的时间延迟
    public MutableLiveData<Boolean> mutableIsDecoding = new MutableLiveData<>();//会触发频谱图中的标记动作
    public ArrayList<Ft8Message> currentMessages = null;//本周期解码的消息（用于画到频谱上）

    public MutableLiveData<Boolean> mutableIsFlexRadio = new MutableLiveData<>();//是不是flex电台
    public MutableLiveData<Boolean> mutableIsXieguRadio = new MutableLiveData<>();//是不是flex电台

    private final ExecutorService getQTHThreadPool = Executors.newCachedThreadPool();
    private final ExecutorService sendWaveDataThreadPool = Executors.newCachedThreadPool();
    private final GetQTHRunnable getQTHRunnable = new GetQTHRunnable(this);
    private final SendWaveDataRunnable sendWaveDataRunnable = new SendWaveDataRunnable();
	
	// 解碼耗時（毫秒）
	private final MutableLiveData<Long> decodeDurationMs = new MutableLiveData<>(0L);
	public LiveData<Long> getDecodeDurationMs() {
		return decodeDurationMs;
	}
	
	

	//用于显示生成共享日志过程的变量
    public MutableLiveData<String> mutableShareInfo=new MutableLiveData<>("");//分享数据的状态
    public MutableLiveData<Integer> mutableSharePosition=new MutableLiveData<>(0);//分享数据当前的位置
    public MutableLiveData<Boolean> mutableShareRunning=new MutableLiveData<>(false);//是否正在生成分享数据
    public MutableLiveData<Integer> mutableShareCount=new MutableLiveData<>(0);//共享的总数
    public MutableLiveData<Boolean> mutableImportShareRunning=new MutableLiveData<>(false);//是否正在导入分享数据

	// GPS_TIME
	private final MutableLiveData<Long> utcOffsetUpdate = new MutableLiveData<>();
	public LiveData<Long> getUtcOffsetUpdate() {
		return utcOffsetUpdate;
	}
	public void notifyUtcOffsetUpdated(long offset) {
		utcOffsetUpdate.postValue(offset);
	}


    public HamRecorder hamRecorder;//用于录音的对象
    public FT8SignalListener ft8SignalListener;//用于监听FT8信号并解码的对象
    public FT8TransmitSignal ft8TransmitSignal;//用于发射信号用的对象
    public SpectrumListener spectrumListener;//用于画频谱的对象
    public boolean markMessage = true;//是否标记消息开关

    //控制电台的方式
    public OperationBand operationBand = null;
	private boolean BTisConnecting = false;  // 用於追踪當前BT連接狀態
	private boolean BT2isConnecting = false;  // 用於追踪當前BT連接狀態
	private boolean BTisDisConnecting = false;  // 用於追踪當前BT連接狀態

    private SWLQsoList swlQsoList = new SWLQsoList();//用于记录SWL的QSO对象，对SWL QSO做判断，防止重复。
	
	


    public MutableLiveData<ArrayList<CableSerialPort.SerialPort>> mutableSerialPorts = new MutableLiveData<>();
    private ArrayList<CableSerialPort.SerialPort> serialPorts;//串口列表
    public BaseRig baseRig;//电台
	
    private final OnRigStateChanged onRigStateChanged = new OnRigStateChanged() {
	//private final OnRigStateChanged baseRigCallback = new OnRigStateChanged() {	
        @Override
        public void onDisconnected() {
            //与电台连接中断
			LogExt.d(TAG, getStringFromResource(R.string.disconnect_rig) +" " + GeneralVariables.btListen);
			
			if(GeneralVariables.btListen) {
				ToastMessage.show(getStringFromResource(R.string.disconnect_rig));
				//GeneralVariables.sendToSSE("⚠️與電台中斷連線");
				baseRig.SSE_disConnect(TAG ); //"⚠️與電台中斷連線
				GeneralVariables.btListen=false;
				//GeneralVariables.hasShownUsbSelectDialog=false;
			}
        }

        @Override
        public void onConnected() {
            //与电台建立连接
			//GeneralVariables.sendToSSE(TAG); //"ℹ️與電台連線 "
			
			// --- 防呆：baseRig 尚未初始化時避免 crash ---
			if (baseRig == null) {
				GeneralVariables.sendToSSE("MainViewModel", "E",
					"⚠️ baseRig is null in onConnected() — skipping SSE_connect");
				return;
			}
			
			
			
			baseRig.SSE_connect(TAG ); //"ℹ️與電台連線 "
			GeneralVariables.btListen=true;
            ToastMessage.show(getStringFromResource(R.string.connected_rig));
			
			
			
			
			
			
        }

        @Override
        public void onPttChanged(boolean isOn) {
			//GeneralVariables.sendToSSE("ℹ️ "+ TAG +" onPttChanged:" + isOn);
			baseRig.SSE_onPttChanged(TAG , isOn);

        }

        @Override
        public void onFreqChanged(long freq) {
			// SSE
			baseRig.SSE_onFreqChanged(TAG ,freq );
					
            //当前频率:%s
            ToastMessage.show(String.format(getStringFromResource(R.string.current_frequency)
                    , BaseRigOperation.getFrequencyAllInfo(freq)));
            //把频率的变化写回到全局变量中
            GeneralVariables.band = freq;
            GeneralVariables.bandListIndex = OperationBand.getIndexByFreq(freq,GeneralVariables.isFT4);
            GeneralVariables.mutableBandChange.postValue(GeneralVariables.bandListIndex);
			GeneralVariables.btListen=true;

            databaseOpr.getAllQSLCallsigns();//通联成功的呼号读出来

        }

        @Override
        public void onRunError(String message) {
			//GeneralVariables.sendToSSE("⚠️onRunError:" + message);
			//baseRig.SSE_show( TAG , "onRunError:" + message );
            //与电台通讯出现错误，
			LogExt.e(TAG , String.format(getStringFromResource(R.string.radio_communication_error),message ) );
                    
            ToastMessage.show(String.format(getStringFromResource(R.string.radio_communication_error)
                    , message));
			GeneralVariables.btListen=false;
        }
		
    };

    //发射信号用的消息列表
    //public ArrayList<Ft8Message> transmitMessages = new ArrayList<>();
    //public MutableLiveData<ArrayList<Ft8Message>> mutableTransmitMessages = new MutableLiveData<>();
    public MutableLiveData<Integer> mutableTransmitMessagesCount = new MutableLiveData<>();


    public boolean deNoise = false;//在频谱中抑制噪声

    //*********日志查询需要的变量********************
    public boolean logListShowCallsign = false;//在日志查询列表的表现形式
    public String queryKey = "";//查询的关键字
    public int queryFilter = 0;//过滤，0全部，1，确认，2，未确认
    public MutableLiveData<Integer> mutableQueryFilter = new MutableLiveData<>();
    public ArrayList<QSLCallsignRecord> callsignRecords = new ArrayList<>();
    //public ArrayList<QSLRecordStr> qslRecords=new ArrayList<>();
    //********************************************
    //关注呼号的列表
    //public ArrayList<String> followCallsign = new ArrayList<>();


    //日志管理HTTP SERVER
    private  LogHttpServer httpServer;

    /**
     * 获取MainViewModel的实例，确保存在唯一的MainViewModel实例，该实例在APP的全部生存周期中。
     *
     * @param owner ViewModelStoreOwner 所有者，一般为Activity或Fragment。
     * @return MainViewModel 返回一个MainViewModel实例
     */
	/*
    public static MainViewModel getInstance(ViewModelStoreOwner owner) {
        if (viewModel == null) {
            viewModel = new ViewModelProvider(owner).get(MainViewModel.class);
        }
        return viewModel;
    }*/
	
	
	
	public Context getContext() {
		//return getApplication().getApplicationContext();
		return application.getApplicationContext();
	}
	

    /**
     * 获取消息列表中指定的消息
     *
     * @param position 在Mutable类型的列表中的位置
     * @return 返回一个Ft8Message类型的解码后的信息
     */
    public Ft8Message getFt8Message(int position) {
        return Objects.requireNonNull(ft8Messages.get(position));
    }

    /**
     * MainViewModel的构造函数主要完成一下事情：
     * 1.创建与UTC同步的时钟，时钟是UtcTimer类，内核是用Timer和TimerTask实现的。回调函数是多线程的，要考虑线程安全的问题。
     * 2.创建Mutable型的解码消息列表。
     */
    //@RequiresApi(api = Build.VERSION_CODES.N)
    //public MainViewModel() {
		

	/*
	public MainViewModel(@NonNull Application application) {
        super(application); // 一定要呼叫父類別建構子	
	*/
	
	private void initRecorderAndTimers() {
		// 目前你真正的初始化全都在 initAll()，先直接轉呼叫
		//initAll();
		new Handler(Looper.getMainLooper()).post(() -> {
			initAll();
		});
		
	}
	
	private void initAll() {
		//Context context = application.getApplicationContext();
        //获取配置信息。
        //databaseOpr = DatabaseOpr.getInstance(GeneralVariables.getMainContext()
        //        , "data.db");
		
		LogExt.e("BOOT", ">>> initAll() ENTER");
		//UiUtcClockTimer.start();
		
		if (UiUtcClockTimer != null) {
			UiUtcClockTimer.start();
		} else {
			LogExt.e("BOOT", "❌ utcTimer is null, skip start()");
		}
		
		
		
		LogExt.d(TAG, "startListen(): initAll-----------------------------");
		
		databaseOpr = DatabaseOpr.getInstance(getContext() , "data.db");
				

        mutableIsDecoding.postValue(false);//解码状态
        //创录音对象
        hamRecorder = new HamRecorder(null);
		
		GeneralVariables.hamRecorder = hamRecorder;
		
        
		// ✅ 一開始就啟動錄音（預設從 MIC，後面 connectRig() 會依需要切到 LAN）
        if (!hamRecorder.isRunning()) {
            hamRecorder.startRecord();
        }
		
		
		
		//GeneralVariables.sendToSSE(TAG ,":hamRecorder.startRecord();");
		LogExt.d(TAG , "Call hamRecorder.startRecord()");

        mutableIsFlexRadio.setValue(false);
        mutableIsXieguRadio.setValue(false);

        // 建立用於顯示時間、UTC時間同步的計時器
        UiUtcClockTimer = new UtcTimer(1000, false, new OnUtcTimer() {
            @Override
            public void doHeartBeatTimer(long utc) {//不触发时的时钟信息

            }

            @Override
            public void doOnSecTimer(long utc) {//当指定间隔时触发时
                timerSec.postValue(utc);//发送当前UTC时间
                mutableIsRecording.postValue(hamRecorder.isRunning());
                mutableHamRecordIsRunning.postValue(hamRecorder.isRunning());//发送当前计时器状态
            }
        });
		
		
		//同步一下时间。microsoft的NTP服务器
        //UtcTimer.syncTime(null);
		
        UiUtcClockTimer.start();

        

        mutableFt8MessageList.setValue(ft8Messages);

        //创建监听对象，回调中的动作用于处理解码、发射、关注的呼号列表添加等操作
		if (ft8SignalListener != null) {
			ft8SignalListener.stopListen();  // 停掉 timer
			ft8SignalListener = null;
		}
		
		
        ft8SignalListener = new FT8SignalListener(databaseOpr, new OnFt8Listen() {
            @Override
            public void beforeListen(long utc) {
                mutableIsDecoding.postValue(true);
            }

			// 解碼後
            @Override
            public void afterDecode(long utc, float time_sec, int sequential
                    , ArrayList<Ft8Message> messages, boolean isDeep) {
                if (messages.size() == 0) return;

                synchronized (ft8Messages) {
                    ft8Messages.addAll(messages);//添加消息到列表

				//Log.d(TAG, "!!!ft8Messages size: " + ft8Messages.size());
                GeneralVariables.deleteArrayListMore(ft8Messages);//删除多余的消息,FT8CN限定的可展示消息的总数量
				}
                mutableFt8MessageList.postValue(ft8Messages);//触发添加消息的动作，让界面能观察到
                mutableTimerOffset.postValue(time_sec);//本次时间偏移量

				if (ft8TransmitSignal != null) { // 增加判斷Null就不執行
					findIncludedCallsigns(messages);//查找符合条件的消息，放到呼叫列表中
				}
				
				// 

				int maxTransmitDelay = GeneralVariables.isFT4 ? 1500 : 2400; // FT4 發射為6秒，所以允許7.5-6=1.5秒 FT8發射為12.6秒，所以允選15-12.6=2.4
				if ( ft8TransmitSignal != null  && ft8TransmitSignal.isActivated() ){
					Long timecost = getDecodeDurationMs().getValue();
					
					if (timecost == null) {
						LogExt.d(TAG, "decodeDurationMs is null, skip transmit parse");
						return;
					}
					
					if (timecost
                                                        + GeneralVariables.pttDelay <= maxTransmitDelay)
														//+ GeneralVariables.transmitDelay <= maxTransmitDelay)
                                                        //+ GeneralVariables.transmitDelay <= 2000)
						{
							ft8TransmitSignal.parseMessages(messages);//解析消息，并处理
						}
					else
						LogExt.e(TAG, "超過時間:"+ (timecost + GeneralVariables.pttDelay) );
					//	{
					//		// 超過呼叫時間
					//		ToastMessage.show("Over transmit limit!");
					//	}
															
				}
				
				
				

                currentMessages = messages;

                // 發射模式中，把 TX 訊息加入瀑布圖顯示
                if (ft8TransmitSignal != null
                        && ft8TransmitSignal.isActivated()
                        && ft8TransmitSignal.getCurrentMessage() != null) {
                    if (currentMessages == null) {
                        currentMessages = new ArrayList<>();
                    }
                    currentMessages.add(ft8TransmitSignal.getCurrentMessage());
                }

                if (isDeep) {
                    currentDecodeCount += messages.size();
                } else {
                    currentDecodeCount = messages.size();
                }

                mutableIsDecoding.postValue(false);//解码的状态，会触发频谱图中的标记动作


                getQTHRunnable.messages = messages;
				if (!getQTHThreadPool.isShutdown()) {
					getQTHThreadPool.execute(getQTHRunnable);//用线程池的方式查询归属地
				}

                //此变量也是告诉消息列表变化的
                mutable_Decoded_Counter.postValue(
                        currentDecodeCount);//告知界面消息的总数量

                if (GeneralVariables.saveSWLMessage) {
                    databaseOpr.writeMessage(messages);//把SWL消息写到数据库
                }
                //检查QSO of SWL,并保存到SWLQSOTable中的通联列表qsoList中
                if (GeneralVariables.saveSWL_QSO) {
                    swlQsoList.findSwlQso(messages, ft8Messages, new SWLQsoList.OnFoundSwlQso() {
                        @Override
                        public void doFound(QSLRecord record) {
                            databaseOpr.addSWL_QSO(record);//把SWL QSO保存到数据库
                            ToastMessage.show(record.swlQSOInfo());
                        }
                    });
                }
                //从列表中查找呼号和网格对应关系，并添加到表中
                getCallsignAndGrid(messages);
				
				
				// BV6LC
				//int frequency =  (int)GeneralVariables.band;        // 頻率
				String swVersion=GeneralVariables.VERSION;
				String myCallSign=GeneralVariables.myCallsign;
				String myGrid=GeneralVariables.getMyGrid();
				
				if(GeneralVariables.enablePskSpot){
				// 初始化 pskReport
					if (pskReport == null) { // Init Psk Class
						try {
							pskReport = new PSKReporter(
								GeneralVariables.myCallsign,  // 接收呼號
								GeneralVariables.getMyGridBySetting(),   // 接收網格
								3,                          // 發送模式
								//"EFHW",           // 天線資訊
								GeneralVariables.antenna,           // 天線資訊
								"FT8TW "+GeneralVariables.VERSION,                // 軟體名稱,
								GeneralVariables.rigName						// 設備名稱
							);
							//Log.d(TAG, "PSKReporter initialized successfully.#############################################");
						} catch (Exception e) {
							LogExt.e(TAG, "Failed to initialize PSKReporter: " + e.getMessage()+"#########################################");
						}
						
						//if (GeneralVariables.sseServer != null) {
						GeneralVariables.sseServer.addMonitorMessage(TAG , "D","sendReportAsync");
						//}
						
						pskReport.sendReportAsync();	
					}
					else{
						pskReport.updateReceiverData(GeneralVariables.myCallsign,GeneralVariables.getMyGridBySetting(),GeneralVariables.antenna,GeneralVariables.rigName);
					}

					
					for (Ft8Message message : messages) {
						// 獲取呼號和其他資訊
						String fromCallsign = message.getCallsignFrom(); // 發送呼號 getCallsignTo
						String toCallsign = message.getCallsignTo();     // 接收呼號
						//System.out.println(" ------------------ msg_frq:"+message.freq_hz+ " Freq:" +" gred:"+message.maidenGrid +" Band:" +message.band);
						
						String grid = message.getMaidenheadGrid(databaseOpr);
						String snr = message.getdB().replaceAll("[^\\d-]", "").trim(); // 移除非數字字符
						int snrInt = Integer.parseInt(snr);
						byte snrByte = (byte) snrInt;


						// 示例：將訊息內容輸出到日誌
						/*
						Log.d("DecodeResult", "From: [" + fromCallsign + "], To: " + toCallsign 
									+ ", Grid: " + grid + ", DB: " + snr + ", Frequency: " + message.band
									+ " Ver:" + swVersion + " MyCallSign:" + myCallSign +
									" MyGrid:"+myGrid + " Band:"+ ((int) message.band )
									+ " GV BAND:" + ((int)GeneralVariables.band)
									);		
						*/
						try {
							pskReport.addReport(fromCallsign, snrInt, 00, (int) message.band + (int) message.freq_hz, System.currentTimeMillis() / 1000, "FT8",grid);	
							
							
							//GeneralVariables.sendToSSE(fromCallsign);
						} catch (Exception e) {
							e.printStackTrace();

						}
					}
					if(pskReport.firstTime() || GeneralVariables.enablePskSpotChange){
						 ToastMessage.show("Start PSK Report...");
						 GeneralVariables.sendToSSE(TAG , "I", "ℹ️ Send Report to Psk Async");
						 //GeneralVariables.sseServer.addMonitorMessage("Send Report to Psk Async");
						
						 GeneralVariables.enablePskSpotChange=false;
					} // 如果是首次接收到就先上傳
				}
				
            }
        });
		
		ft8SignalListener.setOnDecodeTimingListener(costMs -> {
			decodeDurationMs.postValue(costMs);
		});



        ft8SignalListener.setOnWaveDataListener(new FT8SignalListener.OnWaveDataListener() {
            @Override
            public void getVoiceData(int duration, boolean afterDoneRemove, OnGetVoiceDataDone getVoiceDataDone) {
				//GeneralVariables.sendToSSE(TAG, "-----------------------hamRecorder.getVoiceData");
				LogExt.d(TAG , "ft8SignalListener.setOnWaveDataListener_getVoiceData");
                hamRecorder.getVoiceData(duration, afterDoneRemove, getVoiceDataDone);
				// 真正錄音的地方 BV6LC
            }
        });


        ft8SignalListener.startListen(); 

        //频谱监听对象
        spectrumListener = new SpectrumListener(hamRecorder);


        //创建发射对象，回调：发射前，发射后、QSL成功后。
        ft8TransmitSignal = new FT8TransmitSignal(databaseOpr, new OnDoTransmitted() {
            private boolean needControlSco() {//根据控制模式，确定是不是需要开启SCO
                if (GeneralVariables.connectMode == ConnectMode.NETWORK) {
                    return false;
                }
                if (GeneralVariables.controlMode != ControlMode.CAT) {
                    return true;
                }
                return baseRig != null && !baseRig.supportWaveOverCAT();
            }

            @Override
            public void onBeforeTransmit(Ft8Message message, int functionOder) {
                if (GeneralVariables.controlMode == ControlMode.CAT
                        || GeneralVariables.controlMode == ControlMode.RTS
                        || GeneralVariables.controlMode == ControlMode.DTR) {
                    if (baseRig != null) {
                        //if (GeneralVariables.connectMode != ConnectMode.NETWORK) stopSco();
                        // btListen=true 時保持 BT SCO 通道，讓音訊透過 BT 傳到無線電
                        if (needControlSco() && !GeneralVariables.btListen) stopSco();
                        // BT 音訊模式：切換到 COMMUNICATION 模式讓 AudioTrack 走 SCO
                        if (GeneralVariables.btListen) {
                            AudioManager am = (AudioManager) getContext()
                                    .getSystemService(Context.AUDIO_SERVICE);
                            if (am != null) am.setMode(AudioManager.MODE_IN_COMMUNICATION);
                        }
                        baseRig.setPTT(true);
                    }
                }
                if (ft8TransmitSignal != null && ft8TransmitSignal.isActivated()) {
					// 加入呼叫視窗中
                    GeneralVariables.transmitMessages.add(message);
                    //mutableTransmitMessages.postValue(GeneralVariables.transmitMessages);
                    mutableTransmitMessagesCount.postValue(1);
					
					
					// ← 額外加到解碼訊息列表中 2025/11/12
					ft8Messages.add(message);//添加消息到列表
					mutableFt8MessageList.postValue(ft8Messages);
					
					
					
                }
            }

            @Override
            public void onAfterTransmit(Ft8Message message, int functionOder) {
                if (GeneralVariables.controlMode == ControlMode.CAT
                        || GeneralVariables.controlMode == ControlMode.RTS
                        || GeneralVariables.controlMode == ControlMode.DTR) {
                    if (baseRig != null) {
                        baseRig.setPTT(false);
                        //if (GeneralVariables.connectMode != ConnectMode.NETWORK) startSco();
                        if (needControlSco() && !GeneralVariables.btListen) startSco();
                        // BT 音訊模式：恢復 NORMAL 模式
                        if (GeneralVariables.btListen) {
                            AudioManager am = (AudioManager) getContext()
                                    .getSystemService(Context.AUDIO_SERVICE);
                            if (am != null) am.setMode(AudioManager.MODE_NORMAL);
                        }
                    }
                }
            }

            @Override
            public void onTransmitByWifi(Ft8Message msg) {
                if (GeneralVariables.connectMode == ConnectMode.NETWORK) {
                    if (baseRig != null) {
                        if (baseRig.isConnected()) {
                            sendWaveDataRunnable.baseRig = baseRig;
                            sendWaveDataRunnable.message = msg;
                            //以线程池的方式执行网络数据包发送
                            sendWaveDataThreadPool.execute(sendWaveDataRunnable);
                        }
                    }
                }
            }

            //2023-08-16 由DS1UFX提交修改（基于0.9版），用于(tr)uSDX audio over cat的支持。
            @Override
            public boolean supportTransmitOverCAT() {
                if (GeneralVariables.controlMode != ControlMode.CAT) {
                    return false;
                }
                if (baseRig == null) {
                    return false;
                }
                if (!baseRig.isConnected() || !baseRig.supportWaveOverCAT()) {
                    return false;
                }
                return true;
            }

            @Override
            public void onTransmitOverCAT(Ft8Message msg) {//通过CAT发送音频消息
                if (!supportTransmitOverCAT()) {
                    return;
                }
                sendWaveDataRunnable.baseRig = baseRig;
                sendWaveDataRunnable.message = msg;
                sendWaveDataThreadPool.execute(sendWaveDataRunnable);
            }

        }, new OnTransmitSuccess() {//当通联成功时
            @Override
            public void doAfterTransmit(QSLRecord qslRecord) {
                databaseOpr.addQSL_Callsign(qslRecord);//两个操作，把呼号和QSL记录下来
				// 记录到第三方服务，耗时可能较长
				new Thread(new Runnable() {
					@Override
					public void run() {
						if (GeneralVariables.enableCloudlog){
							ThirdPartyService.UploadToCloudLog(qslRecord);
						}
						if (GeneralVariables.enableQRZ){
							ThirdPartyService.UploadToQRZ(qslRecord);
						}
					}
				}).start();
                if (qslRecord.getToCallsign() != null) {//把通联成功的分区加入到分区列表
                    GeneralVariables.callsignDatabase.getCallsignInformation(qslRecord.getToCallsign()
                            , new OnAfterQueryCallsignLocation() {
                                @Override
                                public void doOnAfterQueryCallsignLocation(CallsignInfo callsignInfo) {
                                    GeneralVariables.addDxcc(callsignInfo.DXCC);
                                    GeneralVariables.addItuZone(callsignInfo.ITUZone);
                                    GeneralVariables.addCqZone(callsignInfo.CQZone);
                                }
                            });
                }
            }
        });
	
        //打开HTTP SERVER
        httpServer = new LogHttpServer(this, LogHttpServer.DEFAULT_PORT);
        try {
            httpServer.start(30000); // 30秒 socket read timeout，避免手機瀏覽器上傳慢時被截斷（預設5秒）
        } catch (IOException e) {
            LogExt.e(TAG, "http server error:" + e.getMessage());
        }
		
		GeneralVariables.ft8TransmitSignal =ft8TransmitSignal;
		
		
		coreInitialized.postValue(true);
		LogExt.e("BOOT", "coreInitialized = true");
		
    }
	

    public void setTransmitIsFreeText(boolean isFreeText) {
        if (ft8TransmitSignal != null) {
            ft8TransmitSignal.setTransmitFreeText(isFreeText);
        }
    }

    public boolean getTransitIsFreeText() {
        if (ft8TransmitSignal != null) {
            return ft8TransmitSignal.isTransmitFreeText();
        }
        return false;
    }


    /**
     * 查找符合条件的消息，放到呼叫列表中
     *
     * @param messages 消息
     */
    private synchronized void findIncludedCallsigns(ArrayList<Ft8Message> messages) {
        LogExt.d(TAG, "findIncludedCallsigns: 查找关注的呼号");
		
		if (ft8TransmitSignal == null) return; // 避免中斷
		
		/*
        if (ft8TransmitSignal.isActivated() && ft8TransmitSignal.sequential != UtcTimer.getNowSequential()) {
            return;
        }*/
		
        int count = 0;
        for (Ft8Message msg : messages) {
            //与我的呼号有关，与关注的呼号有关
            //if (msg.getCallsignFrom().equals(GeneralVariables.myCallsign)
            if (GeneralVariables.checkIsMyCallsign(msg.getCallsignFrom()) 			//來自我自己呼叫的
                    //|| msg.getCallsignTo().equals(GeneralVariables.myCallsign)
                    || GeneralVariables.checkIsMyCallsign(msg.getCallsignTo()) 		//呼叫跟我有關
                    || GeneralVariables.callsignInFollow(msg.getCallsignFrom())		// 呼叫者是我關注的乎號
                    || (GeneralVariables.callsignInFollow(msg.getCallsignTo()) && (msg.getCallsignTo() != null))
                    //|| (GeneralVariables.autoFollowCQ && msg.checkIsCQ())) 			{//是CQ，并且允许关注CQ
					||  msg.checkIsCQ()) 											{//是CQ
                //看是不是通联成功的呼号的消息
                msg.isQSL_Callsign = GeneralVariables.checkQSLCallsign(msg.getCallsignFrom());
				msg.isFollow_Callsign = GeneralVariables.callsignInFollow(msg.getCallsignFrom());
				
                if (!GeneralVariables.checkIsExcludeCallsign(msg.callsignFrom)) {//不在排除呼号前缀的，才加入列表
                    count++;
                    GeneralVariables.transmitMessages.add(msg);
                }
            }
        }
        GeneralVariables.deleteArrayListMore(GeneralVariables.transmitMessages);//删除多余的消息
        //mutableTransmitMessages.postValue(GeneralVariables.transmitMessages);
        mutableTransmitMessagesCount.postValue(count);
    }

    /**
     * 清除传输消息列表
     */
    public void clearTransmittingMessage() {
        GeneralVariables.transmitMessages.clear();
        mutableTransmitMessagesCount.postValue(0);
    }


    /**
     * 从消息列表中查找呼号和网格的对应关系
     *
     * @param messages 消息列表
     */
    private void getCallsignAndGrid(ArrayList<Ft8Message> messages) {
        for (Ft8Message msg : messages) {
            if (GeneralVariables.checkFun1(msg.extraInfo)) {//检查是不是网格
                //如果内存表中没有，或不一致，就写入数据库中
                if (!GeneralVariables.getCallsignHasGrid(msg.getCallsignFrom(), msg.maidenGrid)) {
                    databaseOpr.addCallsignQTH(msg.getCallsignFrom(), msg.maidenGrid);//写数据库
                }
                GeneralVariables.addCallsignAndGrid(msg.getCallsignFrom(), msg.maidenGrid);
            }
        }
    }

    /**
     * 清除消息列表
     */
    public void clearFt8MessageList() {
        ft8Messages.clear();
        mutable_Decoded_Counter.postValue(ft8Messages.size());
        mutableFt8MessageList.postValue(ft8Messages);
    }


    /**
     * 删除单个文件
     *
     * @param fileName 要删除的文件的文件名
     */
    public static void deleteFile(String fileName) {
        File file = new File(fileName);
        // 如果文件路径所对应的文件存在，并且是一个文件，则直接删除
        if (file.exists() && file.isFile()) {
            file.delete();
        }
    }

    /**
     * 向关注的呼号列表添加呼号
     *
     * @param callsign 呼号
     */
    public void addFollowCallsign(String callsign) {
        if (!GeneralVariables.followCallsign.contains(callsign)) {
            GeneralVariables.followCallsign.add(callsign);
            databaseOpr.addFollowCallsign(callsign);
        }
    }


    /**
     * 从数据库中获取关注的呼号列表
     */
    public void getFollowCallsignsFromDataBase() {
        databaseOpr.getFollowCallsigns(new OnAfterQueryFollowCallsigns() {
            @Override
            public void doOnAfterQueryFollowCallsigns(ArrayList<String> callsigns) {
                for (String s : callsigns) {
                    if (!GeneralVariables.followCallsign.contains(s)) {
                        GeneralVariables.followCallsign.add(s);
                    }
                }
            }
        });
    }


    /**
     * 设置操作载波频率。如果电台没有连接，就有操作
     */
    public void setOperationBand() {
		
		
		LogExt.d(TAG, "setPTT:[" );
        if (!isRigConnected()) {
			LogExt.d(TAG, "#### Not is RigConnected()" );
            return;
        }
		else
		{
			LogExt.i(TAG, "#### RigConnected()" );
		}

        //先设置上边带，再设置频率
		LogExt.i(TAG, "#### Set USB" );
        baseRig.setUsbModeToRig();//设置上边带

        //此处延迟1秒发送第二个指令，是防止协谷X6100断开连接的问题
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
				if (baseRig != null) {
					//GeneralVariables.log(TAG,"setFreq() " + GeneralVariables.band ); // 紀錄一下
					baseRig.setFreq(GeneralVariables.band);//设置频率
					
					//GeneralVariables.log(TAG,"setFreqToRig() " + baseRig.getFreq() ); // 紀錄一下
					baseRig.setFreqToRig();
					
					
					

				} else {
					LogExt.e(TAG, "電台物件為空值!!!");
				}
				
            }
        }, 800);
    }

    public void setCivAddress() {
        if (baseRig != null) {
            baseRig.setCivAddress(GeneralVariables.civAddress);
        }
    }

    public void setControlMode() {
		
        if (baseRig != null) {
			if(GeneralVariables.controlMode == ControlMode.VOX) // 如果切到VOX則切斷電台連線
				disconnectRig(); 
			else
			    baseRig.setControlMode(GeneralVariables.controlMode);
        }
    }

	
	
	
	



    /**
     * 通过USB连接电台
     *
     * @param context context
     * @param port    串口
     */
    public void connectCableRig(Context context, CableSerialPort.SerialPort port) {
		LogExt.i(TAG, "connectCableRig(): start");
		
		try{
			//BV6LC
			disconnectRig();  // 先確保乾淨斷線
			
			LogExt.i(TAG, "connectCableRig(): after disconnect, calling connectRig()...");
			connectRig();
			
			
			if (GeneralVariables.controlMode == ControlMode.VOX) {//如果当前是VOX，就改成CAT模式
				GeneralVariables.controlMode = ControlMode.CAT;
				 LogExt.i(TAG, "controlMode changed to CAT");
			}
			//connectRig();
			

			if (baseRig == null) {
				LogExt.e(TAG, "connectCableRig(): baseRig == null after connectRig() !!!");
				LogExt.i(TAG, "connectCableRig fail ==null");
				return;
			}
			 LogExt.i(TAG, "connectCableRig(): baseRig created: " + baseRig.getClass().getSimpleName());
			
			baseRig.setControlMode(GeneralVariables.controlMode);
			CableConnector connector = new CableConnector(context, port, GeneralVariables.baudRate
					//, GeneralVariables.controlMode);
					, GeneralVariables.controlMode,baseRig);
					
			// 把 connector 串入 rig
			LogExt.i(TAG, "MainViewModel: 開始呼叫 setConnector()[");
			baseRig.setConnector(connector);	
			LogExt.i(TAG, "connector assigned to baseRig");
			
			LogExt.i(TAG, "MainViewModel: 完成 setConnector()]");

			//2023-08-16 由DS1UFX提交修改（基于0.9版），用于(tr)uSDX audio over cat的支持。
			connector.setOnCableDataReceived(new CableConnector.OnCableDataReceived() {
				@Override
				public void OnWaveReceived(int bufferLen, float[] buffer) {
					LogExt.i(TAG, "call hamRecorder.doOnWaveDataReceived");
					hamRecorder.doOnWaveDataReceived(bufferLen, buffer);
				}
			});

			baseRig.setOnRigStateChanged(onRigStateChanged);
			baseRig.setConnector(connector);
			connector.connect();

			//晚1秒钟设置模式，防止有的电台反应不过来
			new Handler().postDelayed(new Runnable() {
				@Override
				public void run() {
					LogExt.i(TAG, "postDelayed: setOperationBand()");
					setOperationBand();//设置载波频率
				}
			}, 1000);
		} catch (Exception e) {
			       LogExt.e(TAG, "Exception in connectCableRig(): " + e.getMessage(), e);
		}
    }
	
	//BV6LC Close USB
	public synchronized void releaseConnector() {
		if (baseRig != null) {
			if (baseRig.getConnector() != null) {
				baseRig.getConnector().disconnect();
				baseRig.setConnector(null);
			}
			//baseRig = null;
		}
	}
	
	public synchronized void disconnectRig() {
		LogExt.d(TAG, "### disconnectRig() called");
		// 印出呼叫堆疊
		LogExt.d(TAG, "======================"+Log.getStackTraceString(new Exception("Stack Trace")));
		try {
			if (baseRig != null) {
				LogExt.d(TAG, "# baseRig != null: " + baseRig.getClass().getSimpleName());
				if (baseRig.getConnector() != null) {
					baseRig.getConnector().disconnect();  // CableConnector 負責把 SerialPort 關閉
				}
				baseRig = null;
			}
			else{
				LogExt.d(TAG, "# baseRig == null");
			}
		} catch (Exception e) {
			LogExt.e(TAG, "### disconnectRig error: " + e.getMessage());
		}
	}
	
	

	public void connectBluetoothRig(Context context, String btname) { // 如果傳入BT名稱，則先找到Device後，叫用下一段程式連線藍牙
		
		if (btname == null || btname.isEmpty()) {
			LogExt.e(TAG, "connectBluetoothRig: btname is null or empty, skip");
			return;
		}
		
		//BV6LC 2025/5/30
		disconnectRig();
		GeneralVariables.controlMode = ControlMode.CAT;
	
	
		BluetoothAdapter bluetoothAdapter;
		bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
		// 檢查權限是否已授予
		if (ActivityCompat.checkSelfPermission(context, Manifest.permission.BLUETOOTH_CONNECT) != PackageManager.PERMISSION_GRANTED) {
			// 提示需要授權
			ToastMessage.show("Bluetooth permission is required.");
			return;
		}
		if (bluetoothAdapter == null) {
            return;
        }
		// 由手機藍牙清單逐一尋找
		for (BluetoothDevice device : bluetoothAdapter.getBondedDevices()) {
			//if (device.getName().equals(btname) ) {
			if ( Objects.equals(btname, device.getName()) ) {	// 避免NULL
				connectBluetoothRig(context,device);
				//continue; // 找到則連線並完成
				return ; // 改成找到就結束
			}
        }
	}
    public void connectBluetoothRig(Context context, BluetoothDevice device) {
        GeneralVariables.controlMode = ControlMode.CAT;//蓝牙控制模式，只能是CAT控制
		//BTisConnecting=false;
		if(BTisConnecting){
			return;
		}
		BTisConnecting=true;

        connectRig();
        if (baseRig == null) {
			BTisConnecting=false;
            return;
        }
        baseRig.setControlMode(GeneralVariables.controlMode);
        BluetoothRigConnector connector = BluetoothRigConnector.getInstance(context, device.getAddress()
                , GeneralVariables.controlMode);

        baseRig.setOnRigStateChanged(onRigStateChanged);
        baseRig.setConnector(connector);


        new Handler().postDelayed(new Runnable() {//蓝牙连接是需要时间的，等3秒再设置频率
            @Override
            public void run() {
                setBlueToothOn();
            }
        }, 3000);


        new Handler().postDelayed(new Runnable() {//蓝牙连接是需要时间的，等2秒再设置频率
            @Override
            public void run() {
                setOperationBand();//设置载波频率
            }
        }, 2000);
		BTisConnecting=false;
    }

    /**
     * 以网络方式连接到ICOM、协谷X6100系列电台
     * @param wifiRig ICom,XieGu Wifi模式的电台
     */
    public void connectWifiRig(WifiRig wifiRig) {
		
		// BV6LC 2025/5/30
		disconnectRig();
		
        if (GeneralVariables.connectMode == ConnectMode.NETWORK) {
            if (baseRig != null) {
                if (baseRig.getConnector() != null) {
                    baseRig.getConnector().disconnect();
                }
            }
        }

        GeneralVariables.controlMode = ControlMode.CAT;//网络控制模式
        //目前Icom与协谷x6100共用同一种连接器
        IComWifiConnector iComWifiConnector = new IComWifiConnector(GeneralVariables.controlMode
                ,wifiRig);
        iComWifiConnector.setOnWifiDataReceived(new IComWifiConnector.OnWifiDataReceived() {
            @Override
            public void OnWaveReceived(int bufferLen, float[] buffer) {
                hamRecorder.doOnWaveDataReceived(bufferLen, buffer);
            }

            @Override
            public void OnCivReceived(byte[] data) {

            }
        });

        iComWifiConnector.connect();
        connectRig();//给baseRig赋值

        baseRig.setControlMode(GeneralVariables.controlMode);
        baseRig.setOnRigStateChanged(onRigStateChanged);
        baseRig.setConnector(iComWifiConnector);

        new Handler().postDelayed(new Runnable() {//蓝牙连接是需要时间的，等2秒再设置频率
            @Override
            public void run() {
                setOperationBand();//设置载波频率
            }
        }, 1000);
    }

    /**
     * 连接到flexRadio
     *
     * @param context   context
     * @param flexRadio flexRadio对象
     */
    public void connectFlexRadioRig(Context context, FlexRadio flexRadio) {
		
		//BV6LC 2025/5/30
		disconnectRig();
		
        if (GeneralVariables.connectMode == ConnectMode.NETWORK) {
            if (baseRig != null) {
                if (baseRig.getConnector() != null) {
                    baseRig.getConnector().disconnect();
                }
            }
        }
        GeneralVariables.controlMode = ControlMode.CAT;//网络控制模式
        FlexConnector flexConnector = new FlexConnector(context, flexRadio, GeneralVariables.controlMode);
        flexConnector.setOnWaveDataReceived(new FlexConnector.OnWaveDataReceived() {
            @Override
            public void OnDataReceived(int bufferLen, float[] buffer) {
                hamRecorder.doOnWaveDataReceived(bufferLen, buffer);
            }
        });
        flexConnector.connect();
        connectRig();

        baseRig.setOnRigStateChanged(onRigStateChanged);
        baseRig.setConnector(flexConnector);
//
        new Handler().postDelayed(new Runnable() {//连接是需要时间的，等2秒再设置频率
            @Override
            public void run() {
                setOperationBand();//设置载波频率
            }
        }, 3000);
    }

    /**
     * 连接到协谷Radio
     *
     * @param context   context
     * @param xieguRadio X6100Radio对象
     */
    public void connectXieguRadioRig(Context context, X6100Radio xieguRadio) {
        if (GeneralVariables.connectMode == ConnectMode.NETWORK) {
            if (baseRig != null) {
                if (baseRig.getConnector() != null) {
                    baseRig.getConnector().disconnect();
                }
            }
        }
        GeneralVariables.controlMode = ControlMode.CAT;//网络控制模式
        X6100Connector xieguConnector = new X6100Connector(context, xieguRadio, GeneralVariables.controlMode);
        xieguConnector.setOnWaveDataReceived(new X6100Connector.OnWaveDataReceived() {
            @Override
            public void OnDataReceived(int bufferLen, float[] buffer) {
                //Log.e(TAG,String.format("data len:%d",bufferLen));
                hamRecorder.doOnWaveDataReceived(bufferLen, buffer);
            }
        });


        xieguConnector.connect();
        connectRig();
        xieguConnector.setBaseRig(baseRig);
        //接收电台发回的数据
        xieguRadio.setOnReceiveDataListener(new X6100Radio.OnReceiveDataListener() {
            @Override
            public void onDataReceive(byte[] data) {
                baseRig.onReceiveData(data);
            }
        });


        baseRig.setOnRigStateChanged(onRigStateChanged);
        baseRig.setConnector(xieguConnector);

        new Handler().postDelayed(new Runnable() {//连接是需要时间的，等2秒再设置频率
            @Override
            public void run() {
                setOperationBand();//设置载波频率
            }
        }, 3000);
    }


    /**
     * 根据指令集创建不同型号的电台
     */
    public void connectRig() {
		LogExt.d(TAG, "###   connectRig(): called");
        baseRig = null;
        //此处判断是用什么类型的电台，ICOM,YAESU 2,YAESU 3

		try{
			LogExt.d(TAG, "### InstructionSet=" + GeneralVariables.instructionSet);
			switch (GeneralVariables.instructionSet) {
				case InstructionSet.ICOM:
					BaseRig.SSE_rigModel(TAG , "IcomRig,civAddres,true");
					baseRig = new IcomRig(GeneralVariables.civAddress,true);
					break;
				case InstructionSet.ICOM_756:
					BaseRig.SSE_rigModel(TAG , "IcomRig,civAddres,false(ICOM_756)");
					baseRig = new IcomRig(GeneralVariables.civAddress,false);
					break;
				case InstructionSet.YAESU_2: //FT-818
					BaseRig.SSE_rigModel(TAG , "Yaesu2Rig(FT-818)");
					baseRig = new Yaesu2Rig();
					break;
				case InstructionSet.YAESU_847:
					BaseRig.SSE_rigModel(TAG , "Yaesu2_847Rig");
					baseRig = new Yaesu2_847Rig();
					break;
				case InstructionSet.YAESU_3_9:
					BaseRig.SSE_rigModel(TAG , "Yaesu39Rig(false)");
					baseRig = new Yaesu39Rig(false);//yaesu3代指令，9位频率,usb模式
					break;
				case InstructionSet.YAESU_3_9_U_DIG:
					BaseRig.SSE_rigModel(TAG , "Yaesu39Rig(true)(U_DIG)");
					baseRig = new Yaesu39Rig(true);//yaesu3代指令，9位频率,data-usb模式
					break;
				case InstructionSet.YAESU_3_8:
					BaseRig.SSE_rigModel(TAG , "YAESU_3_8");
					baseRig = new Yaesu38Rig();//yaesu3代指令，8位频率
					break;
				case InstructionSet.YAESU_3_450:
					BaseRig.SSE_rigModel(TAG , "Yaesu38_450Rig(YAESU_3_450)");
					baseRig = new Yaesu38_450Rig();//yaesu3代指令，8位频率
					break;
				case InstructionSet.KENWOOD_TK90:
					BaseRig.SSE_rigModel(TAG , "KenwoodKT90Rig(KENWOOD_TK90)");
					baseRig = new KenwoodKT90Rig();//建伍TK90
					break;
				case InstructionSet.YAESU_DX10: // 6
					BaseRig.SSE_rigModel(TAG , "YaesuDX10Rig");
					baseRig = new YaesuDX10Rig();//YAESU DX10 DX101
					break;
				case InstructionSet.KENWOOD_TS590: // 7
					BaseRig.SSE_rigModel(TAG , "KenwoodTS590Rig");
					baseRig = new KenwoodTS590Rig();//KENWOOD TS590
					break;
				case InstructionSet.GUOHE_Q900: // 8
					BaseRig.SSE_rigModel(TAG , "GuoHeQ900Rig");
					baseRig = new GuoHeQ900Rig();//国赫Q900
					break;
				case InstructionSet.XIEGUG90S://协谷，USB模式
					BaseRig.SSE_rigModel(TAG , "XieGuRig(XIEGUG90S)");
					baseRig = new XieGuRig(GeneralVariables.civAddress);//协谷G90S
					break;
				case InstructionSet.ELECRAFT:
					BaseRig.SSE_rigModel(TAG , "ElecraftRig");
					baseRig = new ElecraftRig();//ELECRAFT
					break;
				case InstructionSet.FLEX_CABLE:
					BaseRig.SSE_rigModel(TAG , "Flex6000Rig(CABLE)");
					baseRig = new Flex6000Rig();//FLEX6000
					break;
				case InstructionSet.FLEX_NETWORK:
					BaseRig.SSE_rigModel(TAG , "FlexNetworkRig");
					baseRig = new FlexNetworkRig();
					break;
				case InstructionSet.XIEGU_6100_FT8CNS:
					if (GeneralVariables.connectMode == ConnectMode.NETWORK) {//只在网络模式下工作
						BaseRig.SSE_rigModel(TAG , "XieGu6100NetRig");
						baseRig = new XieGu6100NetRig(GeneralVariables.civAddress);//协谷6100ft8cns模式
					}else{//否则使用传统的模式
						BaseRig.SSE_rigModel(TAG , "XieGu6100Rig");
						baseRig = new XieGu6100Rig(GeneralVariables.civAddress);//协谷6100
					}
					break;
				case InstructionSet.XIEGU_6100:
					BaseRig.SSE_rigModel(TAG , "XieGu6100Rig");
					baseRig = new XieGu6100Rig(GeneralVariables.civAddress);//协谷6100
					break;
				case InstructionSet.KENWOOD_TS2000:
					BaseRig.SSE_rigModel(TAG , "KenwoodTS2000Rig(KENWOOD_TS2000)");
					baseRig = new KenwoodTS2000Rig();//建伍TS2000
					break;
				case InstructionSet.WOLF_SDR_DIGU:
					BaseRig.SSE_rigModel(TAG , "Wolf_sdr_450Rig(WOLF_SDR_DIGU)");
					baseRig = new Wolf_sdr_450Rig(false);
					break;
				case InstructionSet.WOLF_SDR_USB:
					BaseRig.SSE_rigModel(TAG , "Wolf_sdr_450Rig(WOLF_SDR_USB)");
					baseRig = new Wolf_sdr_450Rig(true);
					break;
				case InstructionSet.TRUSDX:
					BaseRig.SSE_rigModel(TAG , "TrUSDXRig");
					baseRig = new TrUSDXRig();//(tr)uSDX
					break;
				case InstructionSet.KENWOOD_TS570:
					BaseRig.SSE_rigModel(TAG , "KenwoodTS570Rig");
					baseRig = new KenwoodTS570Rig();//KENWOOD TS-570D
					break;
				case InstructionSet.QRPLAB_QMX:
					BaseRig.SSE_rigModel(TAG , "QrpQmxRig");
					baseRig = new QrpQmxRig();// 
					break;	
				case InstructionSet.TX_500MP:
					BaseRig.SSE_rigModel(TAG , "TX_500MP");
					baseRig = new TX500MPRig();// 
					break;		
				
				case InstructionSet.YAESU_FTX1: // 25
					BaseRig.SSE_rigModel(TAG , "Yaesu_FTX1");
					baseRig = new YaesuFTX1Rig();//YAESU FTX1
					break;				
				 default:
					BaseRig.SSE_rigModel(TAG , "Unknown value,no baseRig created");
					LogExt.d(TAG, "### InstructionSet: unknown value, no baseRig created");
					break;
			}
			
			if (baseRig == null) {
				LogExt.d(TAG, "### baseRig still null after switch!");
			} else {
				Log.d(TAG, "### baseRig created: " + baseRig.getClass().getSimpleName());
			}
			
			
			
			
			
		}catch (Exception e) {
			LogExt.e(TAG, "### Exception in connectRig(): " + e.getMessage(), e);
		}
		

        if ((GeneralVariables.instructionSet == InstructionSet.FLEX_NETWORK)
                || ((GeneralVariables.instructionSet == InstructionSet.ICOM
                || GeneralVariables.instructionSet==InstructionSet.XIEGU_6100
                || GeneralVariables.instructionSet==InstructionSet.XIEGU_6100_FT8CNS)
                && GeneralVariables.connectMode == ConnectMode.NETWORK)) {
            hamRecorder.setDataFromLan();
        } else {
            if (GeneralVariables.controlMode != ControlMode.CAT || baseRig == null
                    || !baseRig.supportWaveOverCAT()) {
                hamRecorder.setDataFromMic();
            } else {
                hamRecorder.setDataFromLan();
            }
        }

        mutableIsFlexRadio.postValue(GeneralVariables.instructionSet == InstructionSet.FLEX_NETWORK);
        mutableIsXieguRadio.postValue(GeneralVariables.instructionSet == InstructionSet.XIEGU_6100_FT8CNS);

    }


    /**
     * 检察电台是否处于连接状态,两种情况：rigBaseClass没建立，串口没连接成功
     *
     * @return 是否连接
     */
    public boolean isRigConnected() {
        if (baseRig == null) {
			LogExt.d(TAG, "#### baseRig == null" );
            return false;
        } else {
			LogExt.d(TAG, "baseRig.isConnected:" + baseRig.isConnected());
            return baseRig.isConnected();
        }
    }

    /**
     * 获取串口设备列表
     */
    public void getUsbDevice() {
        //serialPorts =
        //        CableSerialPort.listSerialPorts( getContext() );
        //mutableSerialPorts.postValue(serialPorts);
		//BV6LC
		try {
			//serialPorts = CableSerialPort.listSerialPorts(getContext());
			//mutableSerialPorts.postValue(serialPorts);
			ArrayList<CableSerialPort.SerialPort> ports = CableSerialPort.listSerialPorts(getContext());
			//mutableSerialPorts.postValue(ports);
			mutableSerialPorts.setValue(ports); 

		} catch (Exception e) {
			Log.e(TAG, "Error getting serial ports: " + e.getMessage());
			mutableSerialPorts.postValue(new ArrayList<>()); // 傳回空列表避免UI掛掉
		}
		
		
		
    }


    public void startSco() {
        AudioManager audioManager = (AudioManager) getContext()
                .getSystemService(Context.AUDIO_SERVICE);
        if (audioManager == null) return;
        if (!audioManager.isBluetoothScoAvailableOffCall()) {
            //蓝牙设备不支持录音
            ToastMessage.show(getStringFromResource(R.string.does_not_support_recording));
            return;
        }
        audioManager.setBluetoothScoOn(true);
        audioManager.startBluetoothSco();//71毫秒
        audioManager.setSpeakerphoneOn(false);//进入耳机模式
    }

    public void stopSco() {
        AudioManager audioManager = (AudioManager) getContext()
                .getSystemService(Context.AUDIO_SERVICE);
        if (audioManager == null) return;
        if (audioManager.isBluetoothScoOn()) {
            audioManager.setBluetoothScoOn(false);
            audioManager.stopBluetoothSco();
            audioManager.setSpeakerphoneOn(true);//退出耳机模式
        }

    }


    public void setBlueToothOn() {
        AudioManager audioManager = (AudioManager) getContext()
                .getSystemService(Context.AUDIO_SERVICE);
		if(BT2isConnecting){
			return;
		}
		else{
			BT2isConnecting=true;
		}
        if (audioManager == null)
		{
			BT2isConnecting=false;
			return;
		}
        if (!audioManager.isBluetoothScoAvailableOffCall()) {
            //蓝牙设备不支持录音
            ToastMessage.show(getStringFromResource(R.string.does_not_support_recording));
        }

        /*
        播放音乐的对应的就是MODE_NORMAL, 如果使用外放播则调用audioManager.setSpeakerphoneOn(true)即可.
        若使用耳机和听筒,则需要先设置模式为MODE_IN_CALL(3.0以前)或MODE_IN_COMMUNICATION(3.0以后).
         */
		/*
        audioManager.setMode(AudioManager.MODE_NORMAL);//178毫秒
        audioManager.setBluetoothScoOn(true);
        audioManager.stopBluetoothSco();
        audioManager.startBluetoothSco();//71毫秒
        audioManager.setSpeakerphoneOn(false);//进入耳机模式
		*/
		// 設定為通話模式，以便準備 Bluetooth SCO 使用的音訊環境
		//audioManager.setMode(AudioManager.MODE_IN_COMMUNICATION);
		audioManager.setMode(AudioManager.MODE_NORMAL);
		// 停止可能已經開啟的 Bluetooth SCO
		audioManager.stopBluetoothSco();
		audioManager.setBluetoothScoOn(true);  // 設置 SCO 可用
		audioManager.startBluetoothSco();      // 啟動 SCO 連接
		// 使用 Handler 延遲 200 毫秒後執行其他操作
		new Handler().postDelayed(() -> {
			// 延遲後確保揚聲器關閉，進入耳機模式
			audioManager.setSpeakerphoneOn(false);
			// 其他可能的操作
		}, 500); // 延遲 500 毫秒
		// 確保揚聲器關閉，進入耳機模式
        //audioManager.setSpeakerphoneOn(false);
		
        //进入到蓝牙耳机模式
        if(isBTConnected()) {
			ToastMessage.show(getStringFromResource(R.string.bluetooth_headset_mode));
		}
		
		GeneralVariables.btListen = true;
		BT2isConnecting=false;
    }

    public void setBlueToothOff() {
		//ToastMessage.show("Broken BT");
		GeneralVariables.btListen = false;
		if (BTisDisConnecting)
			return;
		BTisDisConnecting=true;
        AudioManager audioManager = (AudioManager) getContext()
                .getSystemService(Context.AUDIO_SERVICE);
        if (audioManager == null) {
			BTisDisConnecting=false;
			return;
		}
		// 停止 Bluetooth SCO
		if (audioManager.isBluetoothScoOn()) { //切換模式時，必須先停止 Bluetooth SCO 音訊傳輸，然後再設定為正常模式。順序很重要，否則可能會導致無法成功切換：
			audioManager.stopBluetoothSco();
			audioManager.setBluetoothScoOn(false);
		}
		// 切換模式到正常模式
		//audioManager.setMode(AudioManager.MODE_NORMAL);
		//audioManager.setSpeakerphoneOn(true); // 重新開啟手機的擴音器 //退出耳机模式
		// 使用 Handler 延遲 200 毫秒，確保 SCO 完全停止
		new Handler().postDelayed(() -> {
			// 切換回正常模式
			audioManager.setMode(AudioManager.MODE_NORMAL);
		}, 5000); // 延遲 200 毫秒
				new Handler().postDelayed(() -> {
			// 切換回正常模式
			audioManager.setSpeakerphoneOn(true); // 重新開啟手機的擴音器，退出耳機模式
		}, 5000); // 延遲 200 毫秒

        //离开蓝牙耳机模式
		if(GeneralVariables.controlMode == ControlMode.CAT && GeneralVariables.connectMode==ConnectMode.BLUE_TOOTH) // 如果是藍芽模式才顯示
			ToastMessage.show(getStringFromResource(R.string.bluetooth_Headset_mode_cancelled));
		//GeneralVariables.btListen = false;
		BTisDisConnecting=false;
    }


    /**
     * 查询蓝牙是否连接
     *
     * @return 是否
     */
    @SuppressLint("MissingPermission")
    public boolean isBTConnected() {
        BluetoothAdapter blueAdapter = BluetoothAdapter.getDefaultAdapter();
        if (blueAdapter == null) return false;

        //蓝牙头戴式耳机，支持语音输入输出
        int headset = blueAdapter.getProfileConnectionState(BluetoothProfile.HEADSET);
        int a2dp = blueAdapter.getProfileConnectionState(BluetoothProfile.A2DP);
        return headset == BluetoothAdapter.STATE_CONNECTED || a2dp == BluetoothAdapter.STATE_CONNECTED;
    }

    private static class GetQTHRunnable implements Runnable {
        MainViewModel mainViewModel;
        ArrayList<Ft8Message> messages;

        public GetQTHRunnable(MainViewModel mainViewModel) {
            this.mainViewModel = mainViewModel;
        }


        @Override
        public void run() {
            CallsignDatabase.getMessagesLocation(
                    GeneralVariables.callsignDatabase.getDb(), messages);
            mainViewModel.mutableFt8MessageList.postValue(mainViewModel.ft8Messages);
        }
    }

    private static class SendWaveDataRunnable implements Runnable {
        BaseRig baseRig;
        //float[] data;
        Ft8Message message;

        @Override
        public void run() {
            if (baseRig != null && message != null) {
                baseRig.sendWaveData(message);//实际生成的数据是12.64+0.04,0.04是生成的0数据
            }
        }
    }
	
	
	/**
    * 設定電台時間 BV6LC
    */
    public void setRigTime(String timeStr) { // 135532 13:55:32
        if (!isRigConnected()) {
			//ToastMessage.show("!isRigConnected");
            return;
        }

        //先设置上边带，再设置频率
        //baseRig.setUsbModeToRig();//设置上边带

        //此处延迟1秒发送第二个指令，是防止协谷X6100断开连接的问题
        new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
            @Override
            public void run() {

                baseRig.setTimeToRig(timeStr);//設定電台時間
                //baseRig.setFreqToRig();
            }
        }, 800);
    }
	
	
	//BV6LC 
	
	protected void onCleared() {
		//disconnectRig();  // 當 ViewModel 被系統銷毀時，自動斷線 2025/6/7這樣會造成旋轉畫面中斷的問題，所以移除。
		
		super.onCleared();
		//1. 停掉解码监听，不再触发 afterDecode()
		if (ft8SignalListener != null) {
			ft8SignalListener.stopListen();
		}
		// 停止TransmitSingal的Timer
		if (ft8TransmitSignal != null) {
			//ft8TransmitSignal.dispose();
			ft8TransmitSignal = null;
		}
		// 停掉 UtcTimer，內部會取消所有 Timer/TimerTask & ExecutorService
		if (UiUtcClockTimer != null) {
			UiUtcClockTimer.stop();
			UiUtcClockTimer = null;
		}
		
		if (httpServer != null) {
			httpServer.stop();       // 停掉 NanoHTTPD 监听线程
			httpServer = null;       // 丢掉引用
		}

	}
	
	private MutableLiveData<Boolean> usbDeviceRefreshEvent = new MutableLiveData<>();
	public LiveData<Boolean> getUsbDeviceRefreshEvent() {
		Log.d(TAG, "====== getUsbDeviceRefreshEvent=============");
		return usbDeviceRefreshEvent;
	}
	public void triggerUsbDeviceRefresh() {
		usbDeviceRefreshEvent.postValue(true);
	}
	
	
	
	
	public void syncTimeWithGpsOrNetwork(Context context, Activity activity, Runnable onSuccess, Consumer<String> onError) {
		// 檢查定位權限
		if (ActivityCompat.checkSelfPermission(context, Manifest.permission.ACCESS_FINE_LOCATION)
				!= PackageManager.PERMISSION_GRANTED) {
			ActivityCompat.requestPermissions(activity, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 1);
		}

		LocationManager locationManager = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);
		boolean gpsEnabled = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);

		AtomicBoolean finished = new AtomicBoolean(false);
		DatagramSocket[] udpSocketRef = { null };
		LocationListener[] gpsListenerRef = { null };

		// ── NTP fallback：GPS timeout 或兩者都失敗時執行 ──
		final Runnable fallbackToNtp = () -> {
			if (!finished.compareAndSet(false, true)) return;
			DatagramSocket s = udpSocketRef[0];
			if (s != null && !s.isClosed()) s.close();
			ToastMessage.show("GPS Timeout.." + GeneralVariables.getStringFromResource(R.string.using_network_time_sync));
			UtcTimer.syncTime(new UtcTimer.AfterSyncTime() {
				@Override
				public void doAfterSyncTimer(int secTime) {
					restartAllTimersIfNeeded(secTime);
					showTimeSyncToast(secTime);
					setRigTime(UtcTimer.getGPSTimeStr());
					onSuccess.run();
				}
				@Override
				public void syncFailed(IOException e) {
					ToastMessage.show(e.getMessage());
					onError.accept(e.getMessage());
				}
			});
		};

		ToastMessage.show(GeneralVariables.getStringFromResource(R.string.using_gps_time_sync));

		// ① UDP GPRMC：永遠 3 秒 timeout，與 Android GPS 競速
		udpSocketRef[0] = GprmcUdpReceiver.receiveOnce(10100, 3000, new GprmcUdpReceiver.Callback() {
			@Override
			public void onSuccess(long gpsTimeMs, double lat, double lng) {
				if (!finished.compareAndSet(false, true)) return;
				handler.removeCallbacks(fallbackToNtp);
				// 取消 Android GPS（需在 main thread）
				new Handler(Looper.getMainLooper()).post(() -> {
					LocationListener gpsListener = gpsListenerRef[0];
					if (gpsListener != null) locationManager.removeUpdates(gpsListener);
				});
				int trueDelay = (int)(gpsTimeMs - System.currentTimeMillis());
				SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
				ToastMessage.show("GPRMC UTC Time: " + sdf.format(new Date(gpsTimeMs)));
				applyGpsSyncResult(trueDelay, lat, lng, onSuccess);
			}

			@Override
			public void onFailed(String reason) {
				if ("Cancelled".equals(reason)) return; // 被 GPS 取消，正常退出
				// GPS 不可用時 UDP 失敗直接 NTP；GPS 可用時讓 GPS handler timeout 決定
				if (!gpsEnabled) fallbackToNtp.run();
			}
		});

		// ② Android GPS：與 UDP 同時啟動，只在 GPS 可用時
		if (gpsEnabled) {
			LocationListener listener = new LocationListener() {
				@Override
				public void onLocationChanged(@NonNull Location location) {
					long gpsTime1 = getAccurateGpsUtcTime(location);
					if (gpsTime1 <= 0) { fallbackToNtp.run(); return; }
					if (!finished.compareAndSet(false, true)) return;
					handler.removeCallbacks(fallbackToNtp);
					locationManager.removeUpdates(this);
					// 取消 UDP socket
					DatagramSocket s = udpSocketRef[0];
					if (s != null && !s.isClosed()) s.close();

					int trueDelay = (int)(gpsTime1 - System.currentTimeMillis());
					double lat = location.getLatitude();
					double lng = location.getLongitude();

					// 顯示 GPS 時間 toast（保留原有格式）
					SimpleDateFormat sdf    = new SimpleDateFormat("HH:mm:ss");
					SimpleDateFormat sdfQmx = new SimpleDateFormat("HHmmss");
					Date date = new Date(location.getTime());
					ToastMessage.show("GPS UTC Time: " + sdf.format(date));
					setRigTime(sdfQmx.format(date));

					applyGpsSyncResult(trueDelay, lat, lng, onSuccess);
				}

				@Override
				public void onStatusChanged(String provider, int status, Bundle extras) {
					// Android 8 以後已廢棄，保留以避免 AbstractMethodError
				}
			};
			gpsListenerRef[0] = listener;
			locationManager.requestSingleUpdate(LocationManager.GPS_PROVIDER, listener, Looper.getMainLooper());
			handler.postDelayed(fallbackToNtp, 10_000);
		}
	}

	/**
	 * 套用 GPS/GPRMC 時間同步結果：更新 UtcTimer、更新 GRID、顯示偏差 toast。
	 * 可從任意執行緒呼叫（toast/LiveData 內部已保證 thread-safe）。
	 */
	private void applyGpsSyncResult(int trueDelay, double lat, double lng, Runnable onSuccess) {
		UtcTimer.setTotalDelay(trueDelay);
		int slotMs = GeneralVariables.isFT4
				? FT8Common.FT4_SLOT_TIME_MILLISECOND
				: FT8Common.FT8_SLOT_TIME_MILLISECOND;
		UtcTimer.ChgsyncTime(trueDelay % slotMs);

		// 若有有效經緯度則更新 GRID
		if (lat != 0.0 || lng != 0.0) {
			String grid = MaidenheadGrid.getGridSquare(new LatLng(lat, lng));
			if (!grid.isEmpty()) {
				GeneralVariables.setMyMaidenheadGrid(grid);
				databaseOpr.writeConfig("grid", grid, null);
			}
		}

		showTimeSyncToast(trueDelay);
		onSuccess.run();
	}

	/** 顯示時間同步偏差 toast（偏快／偏慢／準確） */
	private void showTimeSyncToast(int offsetMs) {
		if (offsetMs > 100) {
			ToastMessage.show(String.format(GeneralVariables.getStringFromResource(R.string.utc_time_sync_delay_slow), offsetMs));
			notifyUtcOffsetUpdated(offsetMs);
		} else if (offsetMs < -100) {
			ToastMessage.show(String.format(GeneralVariables.getStringFromResource(R.string.utc_time_sync_delay_faster), -offsetMs));
			notifyUtcOffsetUpdated(offsetMs);
		} else {
			ToastMessage.show(GeneralVariables.getStringFromResource(R.string.config_clock_is_accurate));
		}
	}

	
	
	/**
	 * 使用 GPS fix + monotonic clock 推算「現在」的精準 UTC 時間
	 * 適合 FT8 / FT4 slot 對齊
	 *
	 * @return UTC millis，若不可用回傳 -1
	 */
	public static long getAccurateGpsUtcTime(Location location) {
		if (location == null) return -1;

		// elapsedRealtimeNanos 是 API 17+ 才有
		if (Build.VERSION.SDK_INT < Build.VERSION_CODES.JELLY_BEAN_MR1) {
			return -1;
		}

	    long gpsFixUtcMillis = location.getTime(); // ⭐ 真 GPS UTC
		long gpsFixElapsedNanos = location.getElapsedRealtimeNanos();
		long nowElapsedNanos = SystemClock.elapsedRealtimeNanos();

		long deltaMillis =
				(nowElapsedNanos - gpsFixElapsedNanos) / 1_000_000L;

		return gpsFixUtcMillis + deltaMillis;
	}
	
	
	public void restartAllTimersIfNeeded(int offsetMs) {
		// 門檻值：避免小抖動一直重啟
		if (Math.abs(offsetMs) < 200) {
			LogExt.i("MainViewModel", "⏱ offset " + offsetMs + "ms，略過 Timer 重啟");
			return;
		}

		LogExt.d("MainViewModel", "🔄 offset=" + offsetMs + "ms，重啟所有 Timer");

		handler.post(() -> {
			if (ft8SignalListener != null) {
				ft8SignalListener.restartTimer();
			}
			if (ft8TransmitSignal != null) {
				ft8TransmitSignal.restartTimer();
			}
		});
				
		
		
	}
	
	
	public void notifyConfigLoaded() {
		LogExt.d("MainViewModel", "notifyConfigLoaded()");
		LogExt.e("BOOT", "notifyConfigLoaded() CALLED");
		
		
		
		configIsLoaded = true;
		
		
		/*if (!Boolean.TRUE.equals(coreInitialized.getValue())) {
			Log.e("BOOT", "core not ready, delay notifyConfigLoaded");
			return;
		}*/
		
		tryStartAudioPipeline();
		isReady.postValue(true); // ✅ 我真的好了
	}
		
	
	
	public boolean isSpectrumRunning() {
        return spectrumRunning;
    }

    public void markSpectrumStarted() {
        Log.d("SpectrumOwner", "Spectrum marked as STARTED");
        spectrumRunning = true;
    }

    public void markSpectrumStopped() {
        Log.d("SpectrumOwner", "Spectrum marked as STOPPED");
        spectrumRunning = false;
    }
	
	
	
	
	
	
}