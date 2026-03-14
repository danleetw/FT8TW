package com.bg7yoz.ft8cn;
/**
 * 常用变量。关于mainContext有内存泄漏的风险，以后解决。
 * mainContext
 * 2025/7/1 增加程式執行時間紀錄
 */

import android.annotation.SuppressLint;
import android.content.Context;
import android.util.Log;

import androidx.lifecycle.MutableLiveData;
import androidx.appcompat.app.AppCompatDelegate;

import com.bg7yoz.ft8cn.callsign.CallsignDatabase;
import com.bg7yoz.ft8cn.callsign.CallsignInfo; //BV6LC
import com.bg7yoz.ft8cn.connector.ConnectMode;
import com.bg7yoz.ft8cn.database.ControlMode;
import com.bg7yoz.ft8cn.database.DatabaseOpr;
import com.bg7yoz.ft8cn.ft8transmit.QslRecordList;
import com.bg7yoz.ft8cn.html.HtmlContext;
import com.bg7yoz.ft8cn.rigs.BaseRigOperation;
import com.bg7yoz.ft8cn.timer.UtcTimer;
import com.bg7yoz.ft8cn.ft8transmit.FT8TransmitSignal;

import com.bg7yoz.ft8cn.wave.HamRecorder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import java.util.List;
import java.text.SimpleDateFormat;
import java.util.Locale;
import java.util.Date;
import java.util.TimeZone;

import java.io.IOException;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileInputStream;
import java.io.OutputStreamWriter;
import java.io.BufferedWriter;

import java.io.FileWriter;
import java.io.InputStreamReader;

import java.net.NetworkInterface; //BV6LC
import java.net.SocketException;  //BV6LC
import java.util.Enumeration;     //BV6LC
import java.net.InetAddress;      //BV6LC
import java.net.Inet4Address;     //BV6LC

import com.bg7yoz.ft8cn.LogExt;


import android.os.Handler;
import android.os.Looper;




public class GeneralVariables {
    private static final String TAG = "GeneralVariables";
    public static String VERSION = BuildConfig.VERSION_NAME;//版本号"0.62（Beta 4）";
    public static String BUILD_DATE = BuildConfig.apkBuildTime;//编译的时间
    public static int MESSAGE_COUNT = 3000;//消息的最大缓存数量
	//public static int MESSAGE_COUNT = 50000;//消息的最大缓存数量
    public static boolean saveSWLMessage=false;//保存解码消息开关
    public static boolean saveSWL_QSO=false;//保存解码消息消息中的QSO开关
	public static boolean enableCloudlog=false;//是否启用Cloudlog自动同步
	public static boolean enableQRZ=false;//是否启用qrz自动同步
	public static int qrzUploadOpt=0; // 上傳Qrz選項
	
	public static boolean enablePskSpot=true;//是否上傳到PSK Reporter (預設上傳到PskRporter BV6LC)
	public static boolean enablePskSpotChange=false;//是否更動過上傳到PSK Reporter設定
	public static String antenna="";// 天線型號 PSK Reporter
	public static int gpsPrecision=1; //0:low 1:medinu 2:high 3:Ultra High
	
	public static boolean enableswrAlcAlert=true;//是否提示SWR/ALC
	
	public static boolean forceOnce=false; // 依照使用者指示，不理會接收到的資訊，強制發送
	
	public static String sotamat="";// SOTAMAT資訊
	public static String rigName ="";// RigName資訊
	
	
    //public static boolean deepDecodeMode=false;//是否开启深度解码
	public static int deepDecodeMode=1;//是否开启深度解码

    public static boolean audioOutput32Bit =true;//音频输出类型true=float,false=int16
    public static int audioSampleRate=12000;//发射音频的采样率
	
	public static boolean isFT4 = false; //進入FT4模式
	
	public static int darkModeSetting = 2;  // 0=依系統設定，1=淺色模式，2=深色模式
	//觀察DarkMode
	public static final MutableLiveData<Integer> mutableDarkModeSetting = new MutableLiveData<>();
	
	
	public static HamRecorder hamRecorder; 
	
	public static MutableLiveData<Boolean> mutableIsFT4 = new MutableLiveData<>(false); // 監控isFT4
	
	public static void setIsFT4(boolean value) {
	   isFT4 = value;
	   new Handler(Looper.getMainLooper()).post(() -> {
			   mutableIsFT4.setValue(value);
	   });
	   //GeneralVariables.ft8TransmitSignal.restartUtcTimer();
    }
	
	
	
	
	
	

    public static MutableLiveData<Float> mutableVolumePercent = new MutableLiveData<>();
    public static float volumePercent = 0.8f;//播放音频的音量,是百分比 //預設為0.5f 改成0.8f
	
	public static MutableLiveData<Float> mutableSwr = new MutableLiveData<>(); // SWR值
	
	public static Float Swr=0f;   // 發射時SWR
	//public static Float Power=0f; // 發射時Power
	public static final MutableLiveData<Float> mutablePower = new MutableLiveData<>(0f);
	

    public static int flexMaxRfPower=10;//flex电台的最大发射功率
    public static int flexMaxTunePower=10;//flex电台的最大调谐功率

    private Context mainContext;
    public static CallsignDatabase callsignDatabase = null;

    public void setMainContext(Context context) {
        mainContext = context;
    }

    public static boolean isChina = true;//语言是不是中国
    public static boolean isTraditionalChinese = true;//语言是不是繁体中文
    //public static double maxDist = 0;//最远距离

    //各已经通联的分区列表
    public static final Map<String, String> dxccMap = new HashMap<>();
    public static final Map<Integer, Integer> cqMap = new HashMap<>();
    public static final Map<Integer, Integer> ituMap = new HashMap<>();

    private static final Map<String, Integer> excludedCallsigns = new HashMap<>();
	
	
	private static final String LOG_FILE_NAME = "ft8tw_log.txt";
	private static long programStartTimeMillis = 0; // 記錄啟動時間
	private static String startTimeStr;             // 紀錄啟動字串
	public  static boolean timeSynced=false;             // 已經執行過時間同步了
	
	private static final SimpleDateFormat  fullTimeFormatter_yymmddhhmmss = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.US);
	static {
		fullTimeFormatter_yymmddhhmmss.setTimeZone(TimeZone.getDefault()); // 用手機目前的時區
	}
	
	private static String LastErrorMessage="";
	private static BufferedWriter logWriter = null; // 寫入用File Handel
	private static final Object logLock = new Object(); // 為避免多執行緒寫入錯亂
	
	private static final long MIN_LOG_INTERVAL_MS = 3000; // 最短記錄間隔：3秒
	private static final Map<String, Long> throttledLogMap = new HashMap<>();
	
	public static SseServer sseServer;// SSE Server實體
	public static FT8TransmitSignal ft8TransmitSignal = null;
	
	public static int qsoCnt=0; //曾經通聯記錄
	
	public static int qsoFilterOpt=0;
	//public static int qsoFilterMode=0; //曾經通聯記錄篩選，0:永久 1:Value最近Value天 2:最近Value小時
	//public static int qsoFilterValue=0; //曾經通聯記錄
	
	
	/*
	// Monitor 用的訊息
	// 訊息記錄類別
    public static class MonitorMessageRecord {
        private long timestamp;
        private String message;
        
        public MonitorMessageRecord(long timestamp, String message) {
            this.timestamp = timestamp;
            this.message = message;
        }
        
        public long getTimestamp() {
            return timestamp;
        }
        
        public String getMessage() {
            return message;
        }
        
        @Override
        public String toString() {
            return "MessageRecord{timestamp=" + timestamp + ", message='" + message + "'}";
        }
    }
	
	// 訊息清單
    private static List<MonitorMessageRecord> monitorMessageQueue = new ArrayList<>();
	
	/**
     * 新增訊息到清單中（使用目前時間戳記）
     * @param message 要新增的訊息
     */
	/* 
    public static void addMonitorMessage(String message) {
        long currentTimestamp = System.currentTimeMillis();
        MonitorMessageRecord record = new MonitorMessageRecord(currentTimestamp, message);
        monitorMessageQueue.add(record);
    }
	*/
	/**
     * 取出最早的一筆記錄（FIFO）
     * @return 最早的 MessageRecord，如果清單為空則返回 null
     */
	 
	/* 
    public static MonitorMessageRecord getEarliestMessage() {
        if (monitorMessageQueue.isEmpty()) {
            return null;
        }
        // 移除並返回第一筆記錄（最早新增的）
        return monitorMessageQueue.remove(0);
    }
	*/
	
	private static final SimpleDateFormat timeFormatter = new SimpleDateFormat("HH:mm:ss", Locale.US);
	static {
		timeFormatter.setTimeZone(TimeZone.getDefault()); // 用手機目前的時區
	}
	
	
	
	//public static boolean hasShownUsbSelectDialog = false; //是否選擇過USB裝置了

    /**
     * 添加排除的字头
     *
     * @param callsigns 呼号
     */
    public static synchronized void addExcludedCallsigns(String callsigns) {
        excludedCallsigns.clear();
        String[] s = callsigns.toUpperCase().replace(" ", ",")
                .replace("|", ",")
                .replace("，", ",").split(",");
        for (int i = 0; i < s.length; i++) {
            if (s[i].length() > 0) {
                excludedCallsigns.put(s[i], 0);
            }
        }
    }

    /**
     * 查找是否含有排除的字头
     *
     * @param callsign 呼号
     * @return 是否
     */
    public static synchronized boolean checkIsExcludeCallsign(String callsign) {
		LogExt.d(TAG , "check Is Exclude Call sign:"+ callsign);
        Iterator<String> iterator = excludedCallsigns.keySet().iterator();
        while (iterator.hasNext()) {
            String key = iterator.next();
            if (callsign.toUpperCase().indexOf(key) == 0) {
				LogExt.d(TAG , "Excluded!!"+ key);
                return true;
            }
        }
        return false;
    }

    /**
     * 获取排除呼号前缀的列表
     *
     * @return 列表
     */
    public static synchronized String getExcludeCallsigns() {
        StringBuilder calls = new StringBuilder();
        Iterator<String> iterator = excludedCallsigns.keySet().iterator();
        int i = 0;
        while (iterator.hasNext()) {
            String key = iterator.next();
            if (i == 0) {
                calls.append(key);
            } else {
                calls.append(",").append(key);
            }
            i++;
        }
        return calls.toString();
    }


    //通联记录列表，包括成功与不成功的
    public static QslRecordList qslRecordList = new QslRecordList();

    //此处有内存泄露警告，但Application Context不应该会内存泄露，所以注释掉
    @SuppressLint("StaticFieldLeak")
    private static GeneralVariables generalVariables = null;

    public static GeneralVariables getInstance() {
        if (generalVariables == null) {
            generalVariables = new GeneralVariables();
        }
        return generalVariables;
    }

    public static Context getMainContext() {
        return GeneralVariables.getInstance().mainContext;
    }


    public static MutableLiveData<String> mutableDebugMessage = new MutableLiveData<>();
    public static int QUERY_FREQ_TIMEOUT = 2000;//轮询频率变化的时间间隔。2秒
    public static int START_QUERY_FREQ_DELAY = 2000;//开始轮询频率的时间延迟

    public static final int DEFAULT_LAUNCH_SUPERVISION = 15 * 60 * 1000;//发射监管默认值,15分钟 因為選項裡面只有15分鐘沒有10分鐘，
    private static String myMaidenheadGrid = "";
    public static MutableLiveData<String> mutableMyMaidenheadGrid = new MutableLiveData<>();

    public static int connectMode = ConnectMode.USB_CABLE;//连接方式USB==0,BLUE_TOOTH==1
	public static MutableLiveData<Integer> mutableconnectMode = new MutableLiveData<>();

	

	
	public static String btName = "";		// 藍芽裝置MAC BV6LC
	public static boolean btListen = false;	// 藍芽監聽中  BV6LC

    //public static String bluetoothDeviceAddress=null;//可以用于连接的蓝牙设备地址


    //用于记录呼号于网格的对应关系 todo---应当把此处列表也放到后台追踪信息里
    //public static ArrayList<CallsignMaidenheadGrid> callsignMaidenheadGrids=new ArrayList<>();
    public static final Map<String, String> callsignAndGrids = new ConcurrentHashMap<>();
    //private static final Map<String,String> callsignAndGrids=new HashMap<>();

    public static String myCallsign = "";//我的呼号
    public static String toModifier = "";//呼叫的修饰符
    private static float baseFrequency = 1000;//声音频率
	
	public static String targetCallsign = "";// 準備呼叫的對方呼號
	public static int targetCallsignsnr = -33;// 準備呼叫的對方呼號

    public static boolean simpleCallItemMode=false;//紧凑型消息

    public static MutableLiveData<Float> mutableBaseFrequency = new MutableLiveData<>();
	public static String cloudlogServerAddress = "";//cloudlog的服务器地址
	public static String cloudlogApiKey = "";//cloudlog的APIKEY
	public static String cloudlogStationID = "";//cloudlog的站点ID
	
	public static String qrzApiKey = ""; //qrz的key

    public static boolean synFrequency = false;//同频发射
    public static int transmitDelay = 500;//发射延迟时间，这个时间也是给上一个周期的解码时间
    public static int pttDelay = 100;//PTT的响应时间，在给电台PTT指令后，一般电台会有一个响应时间，此处默认是100毫秒
    public static int civAddress = 0xa4;//civ地址
    public static int baudRate = 19200;//波特率
    public static long band = 14074000;//载波频段
    public static int serialDataBits=8;//默认是8
    public static int serialParity = 0;//UsbSerialPort.PARITY_NONE默认是0，即：无
    public static int serialStopBits=1;//停止位的对应关系：1=1,2=3,3=1.5
    public static int instructionSet = 0;//指令集，0:icom，1:yaesu 2 代，2:yaesu 3代。
    public static int bandListIndex = -1;//电台波段的索引值
    public static MutableLiveData<Integer> mutableBandChange = new MutableLiveData<>();//波段索引值变化
    public static int controlMode = ControlMode.VOX;
    public static int modelNo = 0;
    public static int launchSupervision = DEFAULT_LAUNCH_SUPERVISION;//发射监管
    public static long launchSupervisionStart = UtcTimer.getSystemTime();//自动发射的起始时间
    public static int noReplyLimit = 0;//呼叫无回应次数0==忽略

    public static int noReplyCount = 0;//没有回应的次数

    //下面4个参数是ICOM网络方式连接的参数
    public static String icomIp = "255.255.255.255";
    public static int icomUdpPort = 50001;
    public static String icomUserName = "ic705";
    public static String icomPassword = "";


    public static boolean autoFollowCQ = true;//自动关注CQ 自動CQ autoCallFollow
    //public static boolean autoAddFollow = true;//自动呼叫关注的呼号 (CQ順序)
	
	public static int autoFollowCQOrder = 0;//自動CQ的順序
	
    public static ArrayList<String> QSL_Callsign_list = new ArrayList<>();//QSL成功的呼号
    public static ArrayList<String> QSL_Callsign_list_other_band = new ArrayList<>();//在其它波段QSL成功的呼号

    // FailCallSign 清單
    public static List<String> failCallSignList = new ArrayList<>();
	// 候選呼叫清單
    //public static List<String> candidateCallSignList = new ArrayList<>();
	public static List<Map<String, Object>> candidateCallSignList_CQME = new ArrayList<>(); // 候選清單
	public static List<Map<String, Object>> candidateCallSignList_CQ = new ArrayList<>();   // CQ清單


    public static final ArrayList<String> followCallsign = new ArrayList<>();//关注的呼号

    public static ArrayList<Ft8Message> transmitMessages = new ArrayList<>();//放在呼叫界面，关注的列表
	
	public static boolean js8call = false;//是否開始測試JS8
	

    public static void setMyMaidenheadGrid(String grid) {
        myMaidenheadGrid = grid;
        mutableMyMaidenheadGrid.postValue(grid);
    }

    public static String getMyMaidenheadGrid() {
        return myMaidenheadGrid;
    }
	
	public static String getMyMaidenheadGrid(int length) {
		String grid;
		grid=myMaidenheadGrid;
		
		grid = grid.substring(0, 
							  Math.min( length,
										grid.length()
									   )
							);
									
        return grid;
    }

    public static float getBaseFrequency() {
        return baseFrequency;
    }

    public static void setBaseFrequency(float baseFrequency) {
        mutableBaseFrequency.postValue(baseFrequency);
        GeneralVariables.baseFrequency = baseFrequency;
    }
	
	public static void setSwl(float swl) {
        mutableSwr.postValue(swl);
        GeneralVariables.Swr = swl;
    }
	

	
	
	public static void setConnetMode(Integer mode){
		mutableconnectMode.postValue(connectMode); // 初始化時設定值
		GeneralVariables.connectMode=mode;
	}

	public static String getCloudlogServerAddress() {
		 return cloudlogServerAddress;
	}
	public static String getCloudlogStationID() {
		return cloudlogStationID;
	}
	public static String getCloudlogServerApiKey() {
		return cloudlogApiKey;
	}
	public static String getQrzApiKey() {
		return qrzApiKey;
	}
	

    @SuppressLint("DefaultLocale")
    public static String getBaseFrequencyStr() {
        return String.format("%.0f", baseFrequency);
    }

    public static String getCivAddressStr() {
        return String.format("%2X", civAddress);
    }

    public static String getTransmitDelayStr() {
        return String.valueOf(transmitDelay);
    }

    public static String getBandString() {
        return BaseRigOperation.getFrequencyAllInfo(band);
    }

    /**
     * 查有没有通联成功的呼号
     *
     * @param callsign 呼号
     * @return 是否存在
     */
    public static boolean checkQSLCallsign(String callsign) {
        return QSL_Callsign_list.contains(callsign);
    }

    /**
     * 查别的波段有没有通联成功的呼号
     *
     * @param callsign 呼号
     * @return 是否存在
     */
    public static boolean checkQSLCallsign_OtherBand(String callsign) {
        return QSL_Callsign_list_other_band.contains(callsign);
    }

    /**
     * 检查呼号中是不是含有我的呼号
     * @param callsign 呼号
     * @return boolean
     */
    static public boolean checkIsMyCallsign(String callsign){
        if ( GeneralVariables.myCallsign == null || GeneralVariables.myCallsign.length() == 0 || callsign==null || callsign.trim().length() == 0) return false;
        //String temp = getShortCallsign(GeneralVariables.myCallsign);
        //return callsign.contains(temp);
		//2025/11/28 不是回應我的也誤判
		String myCall = GeneralVariables.myCallsign.trim().toUpperCase();
		String msgCall = callsign.trim().toUpperCase();
    
		return msgCall.equals(myCall) // BV6LC → BV6LC ✅
			|| msgCall.startsWith(myCall + "/") //BV6LC/P → ✅
			|| msgCall.endsWith("/" + myCall); //HB9/BV6LC → ✅
		
		
    }

    /**
     * 对于复合呼号，获取去掉前缀或后缀的呼号
     * @return 呼号
     */
    static public String getShortCallsign(String callsign){
        if (callsign.contains("/")){
            String[] temp = callsign.split("/");
            int max =0;
            int max_index =0;
            for (int i = 0; i < temp.length; i++) {
                if (temp[i].length()>max){
                    max = temp[i].length();
                    max_index=i;
                }
            }
            return temp[max_index];
        }else{
            return callsign;
        }
    }

    /**
     * 查该呼号是不是在关注的呼号列表中
     *
     * @param callsign 呼号
     * @return 是否存在
     */
    public static boolean callsignInFollow(String callsign) {
        return followCallsign.contains(callsign);
    }

    /**
     * 向通联成功的呼号列表添加
     *
     * @param callsign 呼号
     */
    public static void addQSLCallsign(String callsign) {
        if (!checkQSLCallsign(callsign)) {
            QSL_Callsign_list.add(callsign);
        }
    }

    public static String getMyMaidenhead4Grid() {
        if (myMaidenheadGrid!=null && myMaidenheadGrid.length() > 4) {
            return myMaidenheadGrid.substring(0, 4);
        }
        return myMaidenheadGrid;
    }

    public static String getMyGrid(){
		if (myMaidenheadGrid!=null && myMaidenheadGrid.length() > 4) {
			return myMaidenheadGrid.substring(0, 4);
		}
		return myMaidenheadGrid;
    }
	
	public static String getMyGridBySetting(){
		String grid;
		grid=myMaidenheadGrid;
		
		grid=grid.substring(0, Math.min( (GeneralVariables.gpsPrecision*2+4),
																				grid.length() )
														);
		
        return grid;
    }

    /**
     * 自动程序运行起始时间
     */
    public static void resetLaunchSupervision() {
        launchSupervisionStart = UtcTimer.getSystemTime();
    }

    /**
     * 或取自动程序的运行时长
     *
     * @return 毫秒
     */
    public static int launchSupervisionCount() {
        return (int) (UtcTimer.getSystemTime() - launchSupervisionStart);
    }

    public static boolean isLaunchSupervisionTimeout() {
        if (launchSupervision == 0) return false;//0是不监管
        return launchSupervisionCount() > launchSupervision;
    }

    /**
     * 从extraInfo中查消息顺序
     *
     * @param extraInfo 消息中的扩展内容
     * @return 返回消息序号
     */
    public static int checkFunOrderByExtraInfo(String extraInfo) {
        if (checkFun5(extraInfo)) return 5; //73 
        if (checkFun4(extraInfo)) return 4; // RR73 RRR
        if (checkFun3(extraInfo)) return 3;  // R?
        if (checkFun2(extraInfo)) return 2;  // -10
        if (checkFun1(extraInfo)) return 1;  // PLXX
        return -1;
    }

    /**
     * 检查消息的序号，如果解析不出来，就-1
     *
     * @param message 消息
     * @return 消息序号
     */
    public static int checkFunOrder(Ft8Message message) {
        if (message.checkIsCQ()) {
			//Log.d(TAG,"  CheckFunOrder--- message.checkIsCQ()---");
			return 6;
		}
		//Log.d(TAG,"  CheckFunOrder--- extraInfo---:"+message.extraInfo);
        return checkFunOrderByExtraInfo(message.extraInfo);

    }


    //是不是网格报告
    public static boolean checkFun1(String extraInfo) {
        //网格报告必须是4位,或没有网格
        return (extraInfo.trim().matches("[A-Z][A-Z][0-9][0-9]") && !extraInfo.equals("RR73"))
                || (extraInfo.trim().length() == 0);

    }

    //是不是信号报告,如-10
	public static boolean checkFun2(String extraInfo) {
		if (extraInfo == null || extraInfo.trim().length() < 2) {
			//Log.d(TAG, "Check 2 <2!!!---");
			return false; // 長度不足 2 位
		}

		try {
			int value = Integer.parseInt(extraInfo.trim()); // 將字串轉為整數
			//Log.d(TAG, "Check 2 value---:" + value);

			// 檢查範圍是否符合條件
			return (value >= -99 && value <= -1) || (value >= 0 && value <= 72);
		} catch (NumberFormatException e) {
			//Log.d(TAG, "Check 2 parse failed---" + e.getMessage());
			return false; // 非法數字格式
		}
	}


    //是不是带R的信号报告,如R-10
	public static boolean checkFun3(String extraInfo) {
		// 檢查輸入是否為 null 或長度不足
		if (extraInfo == null || extraInfo.trim().length() < 2) {
			return false;
		}

		// 去除空格並準備檢查
		String trimmed = extraInfo.trim();

		// 確保第一位或第二位是 'R'
		if (!(trimmed.charAt(0) == 'R' || (trimmed.length() > 1 && trimmed.charAt(1) == 'R'))) {
			return false;
		}

		// 提取數值部分
		String numberPart = trimmed.replaceFirst("R", "").trim();

		try {
			// 解析數字
			int number = Integer.parseInt(numberPart);

			// 無負號的範圍 0 到 72
			if (number >= 0 && number <= 72) {
				return true;
			}

			// 負數範圍 -1 到 -99
			if (number >= -99 && number <= -1) {
				return true;
			}

		} catch (NumberFormatException e) {
			// 非法數字格式
			return false;
		}

		// 其他情況返回 false
		return false;
	}
    //是不是RRR或RR73值
    public static boolean checkFun4(String extraInfo) {
        return extraInfo.trim().equals("RR73") || extraInfo.trim().equals("RRR");
    }

    //是不是73值
    public static boolean checkFun5(String extraInfo) {
        return extraInfo.trim().equals("73");
    }


    /**
     * 判断是不是信号报告，如果是，把值赋给 report
     * @param extraInfo 消息扩展
     * @return 信号报告值,没找到是-100
     */
    public static int checkFun2_3(String extraInfo){
        if (extraInfo.equals("73")) return -100;
        if (extraInfo.matches("[R]?[+-]?[0-9]{1,2}")){
            try {
                return Integer.parseInt(extraInfo.replace("R",""));
            } catch (Exception e) {
                return -100;
            }
        }
        return -100;
    }

    /**
     * 判断是不是网格报告，如果是，把值赋给 report
     * @param extraInfo 消息扩展
     * @return 信号报告
     */
    public static boolean checkFun1_6(String extraInfo){
        return  extraInfo.trim().matches("[A-Z][A-Z][0-9][0-9]")
                && !extraInfo.trim().equals("RR73");
    }
    /**
     * 检查是否是通联结束：RRR、RR73、73
     * @param extraInfo 消息后缀
     * @return 是否
     */
    public static boolean checkFun4_5(String extraInfo){
        return extraInfo.trim().equals("RR73")
                || extraInfo.trim().equals("RRR")
                ||extraInfo.trim().equals("73");
    }

    /**
     * 从String.xml中提取字符串
     *
     * @param id id
     * @return 字符串
     */
    public static String getStringFromResource(int id) {
        if (getMainContext() != null) {
            return getMainContext().getString(id);
        } else {
            return "";
        }
    }


    /**
     * 把已经通联的DXCC分区添加到集合中
     *
     * @param dxccPrefix DXCC前缀
     */
    public static void addDxcc(String dxccPrefix) {
        dxccMap.put(dxccPrefix, dxccPrefix);
    }

    /**
     * 查看是不是已经通联的DXCC分区
     *
     * @param dxccPrefix DXCC前缀
     * @return 是否
     */
    public static boolean getDxccByPrefix(String dxccPrefix) {
        return dxccMap.containsKey(dxccPrefix);
    }

    /**
     * 把CQ分区加到列表里
     *
     * @param cqZone cq分区编号
     */
    public static void addCqZone(int cqZone) {
        cqMap.put(cqZone, cqZone);
    }

    /**
     * 查是否存在已经通联的CQ分区
     *
     * @param cq cq分区编号
     * @return 是否存在
     */
    public static boolean getCqZoneById(int cq) {
        return cqMap.containsKey(cq);
    }

    /**
     * 把itu分区添加到已通联的ITU列表中
     *
     * @param itu itu编号
     */
    public static void addItuZone(int itu) {
        ituMap.put(itu, itu);
    }

    /**
     * 查Itu分区在不在已通联的列表中
     *
     * @param itu itu编号
     * @return 是否存在
     */
    public static boolean getItuZoneById(int itu) {
        return ituMap.containsKey(itu);
    }

    //用于触发新的网格
    public static MutableLiveData<String> mutableNewGrid = new MutableLiveData<>();

    /**
     * 把呼号与网格的对应关系添加到呼号--网格对应表，
     *
     * @param callsign 呼号
     * @param grid     网格
     */
    public static void addCallsignAndGrid(String callsign, String grid) {
        if (grid.length() >= 4) {
            callsignAndGrids.put(callsign, grid);
            mutableNewGrid.postValue(grid);
        }
    }

    /**
     * 呼号--网格对应表。以呼号查网格
     * 如果内存中没有，应当到数据库中查一下。
     *
     * @param callsign 呼号
     * @return 是否有对应的网格
     */
    public static boolean getCallsignHasGrid(String callsign) {
        return callsignAndGrids.containsKey(callsign);
    }

    /**
     * 呼号--网格对应表。以呼号查网格，条件是呼号和网格都对应的上。
     * 此函数的目的是，为了更新对应表的数据库
     *
     * @param callsign 呼号
     * @param grid     网格
     * @return 是否有对应的网格
     */
    public static boolean getCallsignHasGrid(String callsign, String grid) {
        if (!callsignAndGrids.containsKey(callsign)) return false;//说明根本没有这个呼号
        String s = callsignAndGrids.get(callsign);
        if (s == null) return false;
        return s.equals(grid);
    }

    public static String getGridByCallsign(String callsign, DatabaseOpr db) {
        String s = callsign.replace("<", "").replace(">", "");
        if (getCallsignHasGrid(s)) {
            return callsignAndGrids.get(s);
        } else {
            db.getCallsignQTH(callsign);
            return "";
        }
    }
	public static String getCountryByCallsign(String callsign, DatabaseOpr db) { // BV6LC
        String s = callsign.replace("<", "").replace(">", "");
		// 創建 CallsignDatabase 的實例
		
		CallsignInfo callsignInfo =GeneralVariables.callsignDatabase.getCallInfo(callsign);
		Log.d(TAG, "====Country ====" + callsignInfo.CountryNameCN);
		return callsignInfo.CountryNameCN;

    }

    /**
     * 遍历呼号--网格对应表，生成HTML
     *
     * @return HTML
     */
    public static String getCallsignAndGridToHTML() {
        StringBuilder result = new StringBuilder();
        int order = 0;
        for (String key : callsignAndGrids.keySet()) {
            order++;
            HtmlContext.tableKeyRow(result,order % 2 != 0,key,callsignAndGrids.get(key));
        }
        return result.toString();
    }

    public static synchronized void deleteArrayListMore(ArrayList<Ft8Message> list) {
        if (list.size() > GeneralVariables.MESSAGE_COUNT) {
            while (list.size() > GeneralVariables.MESSAGE_COUNT) {
                list.remove(0);
            }
        }
    }

    /**
     * 判断是否为整数
     *
     * @param str 传入的字符串
     * @return 是整数返回true, 否则返回false
     */

    public static boolean isInteger(String str) {
        if (str != null && !"".equals(str.trim()))
            return str.matches("^[0-9]*$");
        else
            return false;
    }

    /**
     * 输出音频的数据类型，网络模式不可用
     */
    public  enum AudioOutputBitMode{
        Float32,
        Int16
    }
	
	/**
     * 创建一个临时文件。
     *
     * @param context Context
     * @param prefix  前缀
     * @param suffix  扩展名
     * @return File结构的文件
     */
    public static File getTempFile(Context context, String prefix, String suffix) {
        File tempDir = context.getExternalCacheDir();
        if (tempDir == null) {
            // 处理错误情况，无法获取临时目录
            Log.e(TAG, "创建临时文件出错！无法获取临时目录");
            return null;
        }

        try {
            //tempFile.deleteOnExit(); // 文件会在虚拟机退出时删除
            return File.createTempFile(prefix, suffix, tempDir);
        } catch (IOException e) {
            Log.e(TAG, "创建临时文件出错！" + e.getMessage());
            return null;
        }
    }

    /**
     * 把文本数据写入到文件
     *
     * @param file File
     * @param data 文本数据
     */
    public static void writeToFile(File file, String data) {
        FileOutputStream fileOutputStream = null;
        try {
            fileOutputStream = new FileOutputStream(file, true);
            fileOutputStream.write(data.getBytes());
            Log.e(TAG, "文件数据写入完成！");
        } catch (IOException e) {
            Log.e(TAG, String.format("写文件出错：%s", e.getMessage()));
        } finally {
            try {
                if (fileOutputStream != null) {
                    fileOutputStream.close();
                }
            } catch (IOException e) {
                Log.e(TAG, String.format("关闭写文件出错：%s", e.getMessage()));
            }
        }
    }


    /**
     * 保存数据包缓存文件
     *
     * @param context 上下文
     * @param prefix  前缀
     * @param suffix  扩展名
     * @param data    数据
     * @return 文件对象
     */
    public static File writeToTempFile(Context context, String prefix, String suffix, String data) {
        File file = getTempFile(context, prefix, suffix);
        writeToFile(file, data);
        if (file != null) {
            file.deleteOnExit(); // 文件会在虚拟机退出时删除
        }
        return file;
    }


    /**
     * 删除文件夹
     *
     * @param dir 文件夹
     * @return 是否成功删除
     */
    public static boolean deleteDir(File dir) {
        if (dir == null) return false;
        if (dir.isDirectory()) {
            String[] children = dir.list();
            if (children != null) {
                for (String child : children) {
                    boolean success = deleteDir(new File(dir, child));
                    if (!success) {
                        return false;
                    }
                }
            }
        }
        return dir.delete();
    }

    public static void clearCache(Context context) {
        try {
            File dir = context.getExternalCacheDir();
            deleteDir(dir);
        } catch (Exception e) {
            // Handle exception
        }
    }
	
	
	
	// 候選清單------------------------------------------------------------------------------------
	
	// 取得一筆候選呼叫清單
	public static Map<String, Object> getCandidateInfo_CQME(Boolean Newest) {
		
		if (GeneralVariables.candidateCallSignList_CQME.isEmpty()) {
			return null; // 如果清單為空，返回 null
		}
		
		
		Map<String, Object> candidateInfo;
		
		if (Newest) {
				// 抓取清單中的最後一筆
				candidateInfo = GeneralVariables.candidateCallSignList_CQME.remove(GeneralVariables.candidateCallSignList_CQME.size() - 1);
			} else {
				// 找到清單中 "order" 值最高的項目
				int maxOrderIndex = 0;
				int maxOrder = (int) GeneralVariables.candidateCallSignList_CQME.get(0).get("order");

				for (int i = 1; i < GeneralVariables.candidateCallSignList_CQME.size(); i++) {
					int currentOrder = (int) GeneralVariables.candidateCallSignList_CQME.get(i).get("order");
					if (currentOrder >= maxOrder) { // 本來是大於，但是大於等於可以抓到最後一筆呼叫順序更高的
						maxOrder = currentOrder;
						maxOrderIndex = i;
					}
				}

				// 移除並取得 "order" 值最高的項目
				candidateInfo = GeneralVariables.candidateCallSignList_CQME.remove(maxOrderIndex);
			}

        Map<String, Object> result = new HashMap<>();
        result.put("callSign", candidateInfo.get("callSign"));
        result.put("order", candidateInfo.get("order"));
        result.put("freq", candidateInfo.get("freq"));
        result.put("seq", candidateInfo.get("seq"));
        result.put("snr", candidateInfo.get("snr"));
		result.put("maidengrid", candidateInfo.get("maidengrid"));
		result.put("msgtext", candidateInfo.get("msgtext"));
		
		// 順便清掉相同的候選人
		delOneCandidateInfo_CQME((String) candidateInfo.get("callSign"));
		
        return result;
    }
	
	// 刪除候選呼叫清單中一筆資料
	public static void delOneCandidateInfo_CQME(String callSign) {
		Iterator<Map<String, Object>> iterator = GeneralVariables.candidateCallSignList_CQME.iterator();

		while (iterator.hasNext()) {
			Map<String, Object> topCandidate = iterator.next(); // 獲取當前元素

			String candedateCallSign = (String) topCandidate.get("callSign");

			if (callSign.equals(candedateCallSign)) {
				iterator.remove(); // 安全移除當前元素
				System.out.println("Removed candidate: " + callSign);
			}
		}
    }
	
	
	// 新增到候選呼叫清單中
	public static void addOneCandidateInfo(String fromCallsign,
											int Order,
											float freq,
											int seq,
											int snr,
											String maidenGrid,
											String msgText
											) {
												
		boolean updated = false;
		
		if(fromCallsign == null || fromCallsign.trim().isEmpty())
		{
			LogExt.d(TAG, "Can add Empty CallSign to candidate List");
			return;
		}
			
		
		// 清除兩百個以上的Queue
		while (GeneralVariables.candidateCallSignList_CQME.size() >= 200) {
            GeneralVariables.candidateCallSignList_CQME.remove(0); // 移除最舊的元素
            LogExt.d(TAG, "Removed oldest candidate due to queue size exceeding MaxQueue");
        }
		
		
		
		if( Order <4 && fromCallsign!="..."){ // 小於等於3才能進候選清單，4,5算已經完成了。
			/*
			Map<String, Object> candidate = new HashMap<>();
			candidate.put("callSign", fromCallsign);
			candidate.put("order",  Order);
			candidate.put("freq", freq);
			candidate.put("seq", seq);
			candidate.put("snr", snr);
			GeneralVariables.candidateCallSignList.add(candidate);
			Log.d(TAG,"==Add Candedate Call Sign =========:"+fromCallsign +" Order:"+ Order ); 	
			*/
			
			// 檢查清單中是否已存在相同的 CallSign
			for (Map<String, Object> candidate : GeneralVariables.candidateCallSignList_CQME) {
				String existingCallSign = (String) candidate.get("callSign");

				if (existingCallSign.equals(fromCallsign)) {
					int existingOrder = (int) candidate.get("order");

					// 如果清單中已有相同 CallSign，且 Order 更高，則更新
					if (Order > existingOrder) {
						candidate.put("order", Order);
						candidate.put("freq", freq);
						candidate.put("seq", seq);
						candidate.put("snr", snr);
						candidate.put("maidengrid", maidenGrid);
						candidate.put("msgtext", msgText);
						
						LogExt.d(TAG, "==Updated Candedate Call Sign =========:" + fromCallsign + " Order:" + Order);
					}
					updated = true; // 標記已處理
					break;
				}
			}

			// 如果清單中沒有相同的 CallSign，則新增
			if (!updated) {
				Map<String, Object> candidate = new HashMap<>();
				candidate.put("callSign", fromCallsign);
				candidate.put("order", Order);
				candidate.put("freq", freq);
				candidate.put("seq", seq);
				candidate.put("snr", snr);
				candidate.put("maidengrid", maidenGrid);
				candidate.put("msgtext", msgText);
				GeneralVariables.candidateCallSignList_CQME.add(candidate);
				LogExt.d(TAG, "==Added Candedate Call Sign =========:" + fromCallsign + " Order:" + Order);
			}
				
			
			
			
		}
    }
	
	
	
	
	
	
	 /* =============================================================================
     *  CQ ONLY － 只在對方純 CQ 且「沒有」呼叫我的情況下才用到的候選清單
     *  與 candidateCallSignList_CQME 的差異：
     *    - 沒有 order 欄位，改用 score 來排序
     *    - 檢索時預設挑最高分；若 newest==true 則拿最後一筆
     * ============================================================================= */
	 
	 
	 //-------------------------------CQ清單，每組呼叫一次需要15*2 =30 秒 10分鐘*60=600 600/30= 20 保留最後二十組
    /**
     * 新增或更新 CQ-Only 候選<br/>
     * - 相同呼號若已存在，只有在『score 更高』時才覆寫（freq / seq / snr 同步更新）<br/>
     * - score 由呼叫端計算（距離、SNR…）後傳入
     */
    public static void addOneCandidateInfo_CQ(String callSign,
											  int order,
                                              float freq,
                                              int   seq,
                                              int   snr,
											  String maidenGrid,
											  double score
                                              ) {

        boolean updated = false;
		int finalOrder=order;
		if (finalOrder==6)
		{
			finalOrder=0;
		}
			
		
		// 清除兩百個以上的Queue
		while (GeneralVariables.candidateCallSignList_CQ.size() >= 20) {
            GeneralVariables.candidateCallSignList_CQ.remove(0); // 移除最舊的元素
            LogExt.d(TAG, "Removed oldest candidate due to queue size exceeding MaxQueue");
        }
		

        for (Map<String, Object> item : candidateCallSignList_CQ) {
            if (callSign.equals(item.get("callSign"))) {
                double oldScore = ((Number) item.get("score")).doubleValue();
                if (score > oldScore) {      
				// 只有更高分才更新
				
                    item.put("order",  finalOrder);
					
					item.put("freq",  freq);
					item.put("seq",   seq);
					item.put("snr",   snr);
					item.put("maidengrid",   maidenGrid);
					item.put("score", score);
					
                }
                updated = true;
                break;
            }
        }

        if (!updated) {
            Map<String, Object> m = new HashMap<>();
            m.put("callSign", callSign);
            m.put("order",     finalOrder);
            m.put("freq",      freq);
			m.put("seq",      seq);
            m.put("snr",      snr);
			m.put("maidengrid",   maidenGrid);
			m.put("score",    score);
            candidateCallSignList_CQ.add(m);
        }
    }
	
	
	 
	 

    /** 取得一筆 CQ-Only 候選；回傳後即從清單中移除 */
    public static Map<String, Object> getCandidateInfo_CQ(boolean newest) {

        if (candidateCallSignList_CQ.isEmpty()) {
            return null;
        }

        Map<String, Object> picked;

        if (newest) {
            // 直接拿最後一筆
            picked = candidateCallSignList_CQ.remove(candidateCallSignList_CQ.size() - 1);
        } else {
            /* 找 score 最高（分數相同時，保留較新的那一筆） */
            int bestIndex = 0;
            double bestScore = ((Number) candidateCallSignList_CQ.get(0).get("score")).doubleValue();

            for (int i = 1; i < candidateCallSignList_CQ.size(); i++) {
                double score = ((Number) candidateCallSignList_CQ.get(i).get("score")).doubleValue();
                if (score >= bestScore) {          // >= 可確保較新的覆蓋較舊的
                    bestScore = score;
                    bestIndex = i;
                }
            }
            picked = candidateCallSignList_CQ.remove(bestIndex);
        }

        /* 順手把同呼號的殘留項清掉，避免重複 */
        delOneCandidateInfo_CQ((String) picked.get("callSign"));

        return picked;
    }

    /** 從 CQ-Only 清單中刪掉指定呼號（安全 Iterator） */
    public static void delOneCandidateInfo_CQ(String callSign) {
        Iterator<Map<String, Object>> it = candidateCallSignList_CQ.iterator();
        while (it.hasNext()) {
            Map<String, Object> item = it.next();
            if (callSign.equals(item.get("callSign"))) {
                it.remove();
            }
        }
    }

    
	// 初始化錯誤紀錄檔案Handle
	public static void initLogFile(Context context) {
		try {
			File logFile = new File(context.getFilesDir(), LOG_FILE_NAME);
			logWriter = new BufferedWriter(new FileWriter(logFile, true));
			
			
			// 記錄啟動時間
			programStartTimeMillis = System.currentTimeMillis();
			startTimeStr = fullTimeFormatter_yymmddhhmmss.format(new Date(programStartTimeMillis));
		
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static String DurationStr(){
		long crashTimeMillis = System.currentTimeMillis();
		String crashTimeStr = fullTimeFormatter_yymmddhhmmss.format(new Date(crashTimeMillis));
		// 計算運行時間（毫秒轉小時:分鐘）
		long durationMillis = crashTimeMillis - programStartTimeMillis;
		long hours = durationMillis / (1000 * 60 * 60);
		long minutes = (durationMillis / (1000 * 60)) % 60;
		long seconds = (durationMillis / 1000) % 60;
		
		String durationStr = String.format(Locale.US, "%d 小時 %d 分鐘 %d 秒", hours, minutes, seconds);
		return durationStr;
	}

	// 寫入錯誤紀錄
    public static void writeErrorLog(Context context, String logContent) {
		
		
		//String crashTimeStr = fullTimeFormatter_yymmddhhmmss.format(new Date(crashTimeMillis));
		/*
		// 計算運行時間（毫秒轉小時:分鐘）
		long durationMillis = crashTimeMillis - programStartTimeMillis;
		long hours = durationMillis / (1000 * 60 * 60);
		long minutes = (durationMillis / (1000 * 60)) % 60;
		long seconds = (durationMillis / 1000) % 60;
		String durationStr = String.format(Locale.US, "%d 小時 %d 分鐘 %d 秒", hours, minutes, seconds);
		*/
		String durationStr = DurationStr();
		
		long crashTimeMillis = System.currentTimeMillis();
		String crashTimeStr = fullTimeFormatter_yymmddhhmmss.format(new Date(crashTimeMillis));
        try (FileOutputStream fos = context.openFileOutput(LOG_FILE_NAME, Context.MODE_PRIVATE);
             OutputStreamWriter writer = new OutputStreamWriter(fos)) {
			writer.write("===== App Version: " + BuildConfig.VERSION_NAME + "\n");  // 加入版本資訊
			writer.write("===== App Started at " + startTimeStr + " =====\n");
			writer.write("===== App Crashed at " + crashTimeStr + " =====\n");
			writer.write("已運行時間：" + durationStr + "\n");
            writer.write(logContent);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
	
	/**
     * 讀取 ft8tw_log.txt 的內容
     *
     * @param context 應用程式 Context
     * @return 錯誤日誌內容
     */
    public static String readErrorLog(Context context) {
        File logFile = new File(context.getFilesDir(), LOG_FILE_NAME);

        if (!logFile.exists()) {
            return null; // 沒有日誌
        }

        StringBuilder stringBuilder = new StringBuilder();
        try (FileInputStream fis = new FileInputStream(logFile);
             InputStreamReader isr = new InputStreamReader(fis);
             BufferedReader reader = new BufferedReader(isr)) {

            String line;
			int maxLines = 500; // 或控制最大長度
			int lineCount = 0;
			
            while ((line = reader.readLine()) != null) {
                stringBuilder.append(line).append("\n");
				lineCount++;
				if (lineCount >= maxLines) break;
            }
			reader.close();

        } catch (IOException e) {
            Log.e("LogUtil", "Error reading log file", e);
            return null;
        }

        return stringBuilder.toString();
    }
	
	// 寫入Log
	
	public static void log(String tag, String message) {

		
        // 標準 Log 輸出
        Log.d(tag, message);
		
		if (logWriter == null) {
			Log.d(tag, "Log file not init!!!");
			return;
		}
		
		// ---- 檢查是否重複訊息	
		// key 是 tag+message
		String key = tag + message;
		long now = System.currentTimeMillis();
		long lastTime = throttledLogMap.getOrDefault(key, 0L);

		// 如果太快出現重複訊息，略過
		if (now - lastTime < MIN_LOG_INTERVAL_MS) {
			return;
		}
		throttledLogMap.put(key, now);
		
		
		

        // 將日誌寫入檔案
		if(LastErrorMessage!=message){
			//File logFile = new File(getMainContext().getFilesDir(),LOG_FILE_NAME);
			//try (FileWriter writer = new FileWriter(logFile, true)) {
			//	writer.write(tag + ": " + message + "\n");
			//} catch (IOException e) {
			//	Log.e("CustomLog", "Failed to write log to file", e);
			//}
			try{
				logWriter.write(timeFormatter.format(new Date()) + " " + tag + ": " + message + "\n");
				logWriter.flush();
			}catch (IOException e) {
				Log.e(TAG, "Failed to write log to file", e);
			}
		}
    }
	
	// 清空 Log 檔案內容
    public static void clearLogFile() {
        File logFile = new File(getMainContext().getFilesDir(), LOG_FILE_NAME);
        try (FileWriter writer = new FileWriter(logFile, false)) { // false 表示覆寫模式
            // 覆寫檔案，等於清空內容
            writer.write("");
            Log.d("CustomLog", "Log file cleared successfully.");
        } catch (IOException e) {
            Log.e("CustomLog", "Failed to clear log file", e);
        }
    }
	
	
	
	public static String getLocalIpAddress() {
		try {
			for (Enumeration<NetworkInterface> en = NetworkInterface.getNetworkInterfaces(); en.hasMoreElements();) {
				NetworkInterface intf = en.nextElement();
				for (Enumeration<InetAddress> enumIpAddr = intf.getInetAddresses(); enumIpAddr.hasMoreElements();) {
					InetAddress inetAddress = enumIpAddr.nextElement();
					if (!inetAddress.isLoopbackAddress() && inetAddress instanceof Inet4Address) {
						return inetAddress.getHostAddress();
					}
				}
			}
		} catch (SocketException ex) {
			//Log.e("IP Address", ex.toString());
		}
		return "127.0.0.1";
	}
	
	public  static void sendToSSE(String tag,String debugMode, String message){
		if (GeneralVariables.sseServer != null) {
			GeneralVariables.sseServer.addMonitorMessage(tag , debugMode, message);
		}
	}
	public  static void SendtoSSE_field(String fieldName , String fieldValue){
		if (GeneralVariables.sseServer != null) {
			GeneralVariables.sseServer.addMonitorMessage_field(fieldName,fieldValue);
		}
	}
	
}



