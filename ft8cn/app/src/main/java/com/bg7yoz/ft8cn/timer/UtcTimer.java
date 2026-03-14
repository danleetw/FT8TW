package com.bg7yoz.ft8cn.timer;
/**
 * UtcTimer类，用于实现FT8在各通联周期开始时触发的动作。FT8的通联因为需要时钟同步，以UTC时间为基准，每15秒一个周期（FT4为7.5秒）。
 * 该类采用Timer和TimerTask来实现定时触发动作。
 * 由于FT8需要时钟同步（精度为秒），在每一个周期开始触发动作，所以，目前以100毫秒为心跳，检测是否处于周期（对UTC时间以周期的秒数取模）的开始，
 * 如果是，则回调doHeartBeatTimer函数，为防止重复动作，触发后会等待1秒钟后再进入新的心跳周期（因为是以秒数取模）。
 * 注意！！为防止回调动作占用时间过长，影响下一个动作的触发，所以，回调都是以多线程的方式调用，在使用时要注意线程安全。
 * <p>
 * @author BG7YOZ
 * @date 2022.5.7
 * 2025/7/1 
 */

import android.annotation.SuppressLint;

import org.apache.commons.net.ntp.NTPUDPClient;
import org.apache.commons.net.ntp.TimeInfo;

import java.io.IOException;
import java.net.InetAddress;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;


import com.bg7yoz.ft8cn.GeneralVariables;
import com.bg7yoz.ft8cn.FT8Common;

import com.bg7yoz.ft8cn.LogExt;
import java.util.UUID;

public class UtcTimer {
	private static final String TAG = "UtcTimer";
	private final String instanceId = UUID.randomUUID().toString().substring(0, 6);
	
    private static final long MIN_TIME_BW_UPDATES = 1000; // 1 second [MODIFIED]
    private static final float MIN_DISTANCE_CHANGE_FOR_UPDATES = 1.0f; // 1 meter [MODIFIED]
    private final int periodMs; // 週期（毫秒為單位）
    private final boolean doOnce;
    private final OnUtcTimer onUtcTimer;


    private long utc;
    public static int delay = 0;		//时钟总的延时，（毫秒）
	public static int total_delay = 0;	//總體時間延遲(包含分鐘)，（毫秒）
    private boolean running = false;//用来判断是否触发周期的动作

    private final Timer secTimer = new Timer();
    private final Timer heartBeatTimer = new Timer();
    private int time_sec = 0;//时间的偏移量；
    private final ExecutorService cachedThreadPool = Executors.newCachedThreadPool();
	
	// 新增這行：給 syncTime 用的 thread pool
	private static final ExecutorService ntpThreadPool = Executors.newCachedThreadPool();
	
	private final AtomicBoolean secTaskRunning = new AtomicBoolean(false);
    private final AtomicBoolean heartBeatRunning = new AtomicBoolean(false);
    private final ExecutorService threadPool = new ThreadPoolExecutor(
        2, 2, 60L, TimeUnit.SECONDS, new LinkedBlockingQueue<>(100)
    );
	
	private static final SimpleDateFormat sdf_yyyyMMdd = new SimpleDateFormat("yyyyMMdd");
	private static final SimpleDateFormat sdf_HHmmss = new SimpleDateFormat("HHmmss");
	private static final SimpleDateFormat sdf_HHmmss_phone_timezone = new SimpleDateFormat("HHmmss");
	private static final SimpleDateFormat sdf_HH_mm_ss = new SimpleDateFormat("HH:mm:ss");
	private static final SimpleDateFormat sdf_yyyyMMdd_HHmmss = new SimpleDateFormat("yyyyMMdd-HHmmss");
	private static final SimpleDateFormat sdf_fullDatetime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	// 正確放在 static 區塊內，這樣才合法
	static {
		TimeZone UtcTimeZone =TimeZone.getTimeZone("GMT");
		TimeZone currentTimeZone = TimeZone.getDefault();
		
		sdf_yyyyMMdd.setTimeZone(UtcTimeZone);
		sdf_HHmmss.setTimeZone(UtcTimeZone);
		sdf_HHmmss_phone_timezone.setTimeZone(currentTimeZone);
		
		sdf_HH_mm_ss.setTimeZone(UtcTimeZone);
		sdf_yyyyMMdd_HHmmss.setTimeZone(UtcTimeZone);
		sdf_fullDatetime.setTimeZone(UtcTimeZone);
	}
	
	
	
	
    private final Runnable doSomething = new Runnable() {
        @Override
        public void run() {
            onUtcTimer.doOnSecTimer(utc);
        }
    };
    private final ExecutorService heartBeatThreadPool = Executors.newCachedThreadPool();
    private final Runnable doHeartBeat = new Runnable() {
        @Override
        public void run() {
            onUtcTimer.doHeartBeatTimer(utc);
        }
    };

    /**
     * 类方法。获得UTC时间的字符串表示结果。
     *
     * @param time 时间。
     * @return String 以字符串方式显示UTC时间。
     */
    @SuppressLint("DefaultLocale")
    public static String getTimeStr(long time) {
        long curtime = time / 1000;
        long hour = ((curtime) / (60 * 60)) % 24;//小时
        long sec = (curtime) % 60;//秒
        long min = ((curtime) % 3600) / 60;//分
        return String.format("UTC : %02d:%02d:%02d", hour, min, sec);
    }

    /**
     * 以HHMMSS格式显示UTC时间
     *
     * @param time
     * @return
     */
    @SuppressLint("DefaultLocale")
    public static String getTimeHHMMSS(long time) {
        long curtime = time / 1000;
        long hour = ((curtime) / (60 * 60)) % 24;//小时
        long sec = (curtime) % 60;//秒
        long min = ((curtime) % 3600) / 60;//分
        return String.format("%02d%02d%02d", hour, min, sec);
    }

    public static String getYYYYMMDD(long time) {
        //@SuppressLint("SimpleDateFormat")
        //SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        //sdf_yyyyMMdd.setTimeZone(TimeZone.getTimeZone("GMT"));
        return sdf_yyyyMMdd.format(new Date(time));
    }

    public static String getDatetimeStr(long time) {
        //@SuppressLint("SimpleDateFormat")
        //SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //sdf_fullDatetime.setTimeZone(TimeZone.getTimeZone("GMT"));
        return sdf_fullDatetime.format(new Date(time));
    }

    public static String getDatetimeYYYYMMDD_HHMMSS(long time) {
        //@SuppressLint("SimpleDateFormat")
        //SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd-HHmmss");
        //sdf_yyyyMMdd_HHmmss.setTimeZone(TimeZone.getTimeZone("GMT"));
        return sdf_yyyyMMdd_HHmmss.format(new Date(time));
    }

    /**
     * 时钟触发器的构建方法。需要确定时钟的周期，周期一般是15秒或7.5秒，因为周期的参数是int，所以参数的单位是十分之一秒。
     * 由于心跳频率较快（暂时定为100毫秒），心跳的动作越简练越好，要在下一个心跳开始之前处理完，防止造成线程叠加，影响性能。
     * 心跳动作不会因周期动作不触发（running==false）而影响，只要UtcTimer的实例存在，心跳动作就运行（方便显示时钟数据）。
     * 该触发器需要调用delete函数彻底停止（心跳动作也停止了）。
     *
     * @param periodMs        時鐘的週期（毫秒為單位），periodMs 一秒=1000MS , 7.5秒=7500 15秒等於15000
     * @param doOnce     是否只触发一次。
     * @param onUtcTimer 回调函数，包括心跳回调，和周期起始触发动作的回调。
     */
    public UtcTimer(int periodMs, boolean doOnce, OnUtcTimer onUtcTimer) {
        this.periodMs = periodMs;
        this.doOnce = doOnce;
        this.onUtcTimer = onUtcTimer;

        //初始化Timer的任务。
        //TimerTask timerTask = initTask();
        //执行timer，延时0执行，周期100毫秒

        secTimer.schedule(secTask(), 0, 10);
        heartBeatTimer.schedule(heartBeatTask(), 0, 1000);
    }

    /**
     * 定义时钟触发的动作。
     * 时钟触发器的构建方法。需要确定时钟的周期，周期一般是15秒或7.5秒，因为周期的参数是int，所以参数的单位是十分之一秒。
     * 由于心跳频率较快（暂时定为100毫秒），心跳的动作越简练越好，要在下一个心跳开始之前处理完，防止造成线程叠加，影响性能。
     * 心跳动作不会因周期动作不触发（running==false）而影响，只要UtcTimer的实例存在，心跳动作就运行（方便显示时钟数据）。
     *
     * @return TimerTask 返回动作的实例。
     */


    private TimerTask heartBeatTask() {
        return new TimerTask() {
            @Override
            public void run() {
                //心跳动作
                doHeartBeatEvent(onUtcTimer);
            }
        };
    }

    private TimerTask secTask() {
        return new TimerTask() {
			private long lastTriggerSecond = -1;

			@Override
			public void run() {
				if (!running) return;
				if (UtcTimer.this.secTaskRunning.compareAndSet(false, true)) {
					try {
						utc = getSystemTime();
						long currentSecond = (utc - time_sec) / 500;

						if (currentSecond != lastTriggerSecond) {
							lastTriggerSecond = currentSecond;

							if ( (utc % periodMs) < 10) {
								UtcTimer.this.threadPool.execute(() -> {
									if(periodMs!=1000)
										LogExt.d(TAG , " Timer :" +instanceId+ " "+periodMs+" 觸發");
									
									onUtcTimer.doOnSecTimer(utc);
								});

								if (doOnce) {
									running = false;
								}
							}
						}
					} finally {
						UtcTimer.this.secTaskRunning.set(false);
					}
				}
			}
		};
    }

    /**
     * 触发心跳时的动作。由Timer调用，写此函数是方便阅读。动作是在新创建的线程中执行。
     *
     * @param onUtcTimer 触发时钟的回调函数。
     */
    private void doHeartBeatEvent(OnUtcTimer onUtcTimer) {
        //心跳动作
        heartBeatThreadPool.execute(doHeartBeat);
//        new Thread(new Runnable() {
//            @Override
//            public void run() {
//                //注意!!!! doHeartBeatTimer不要执行耗时的操作，一定要在心跳间隔内完成，否则可能会造成线程的积压，影响性能。
//                onUtcTimer.doHeartBeatTimer(utc);
//            }
//        }).start();
    }


    public void stop() {
        running = false;
		cancelAll();
    }

    public void start() {
        running = true;
    }

    public boolean isRunning() {
        return running;
    }

    public void delete() {
        secTimer.cancel();
        heartBeatTimer.cancel();
    }
	
	public void cancelAll() {
		// 1. 取消並清除 java.util.Timer
        secTimer.cancel();
        secTimer.purge();
        heartBeatTimer.cancel();
        heartBeatTimer.purge();

        // 2. 關閉所有 ExecutorService
        threadPool.shutdownNow();
        heartBeatThreadPool.shutdownNow();
        cachedThreadPool.shutdownNow();
        // 如果你要同步 NTP 的 pool 也一起關：
        // ntpThreadPool.shutdownNow();
     }

    /**
     * 设置时间偏移量，正值是向后偏移
     *
     * @param time_sec 向前的偏移量
     */
    public void setTime_sec(int time_sec) {
        this.time_sec = time_sec;
    }

    /**
     * 获取时间偏移
     *
     * @return 时间偏移值（毫秒）
     */
    public int getTime_sec() {
        return time_sec;
    }

    public long getUtc() {
        return utc;
    }

    /**
     * 根据UTC时间计算时序
     *
     * @param utc UTC时间
     * @return 时序:0,1
     */
    public static int sequential(long utc) {
        //return (int) ((((utc) / 1000) / 15) % 2);
		
		int slotDurationMs = GeneralVariables.isFT4 ? FT8Common.FT4_SLOT_TIME_MILLISECOND : FT8Common.FT8_SLOT_TIME_MILLISECOND; // FT4: 7.5s 可近似取整為 7
		long adjustedUtc = utc + 50;
		
		/*
		LogExt.d("UtcTimer", String.format(
			"Mode=%s slot=%d seq=%d offset=%d",
			GeneralVariables.isFT4 ? "FT4" : "FT8",
			slotDurationMs,
			(int)((utc / slotDurationMs) % 2),
			utc % slotDurationMs
		));*/
		
		
		
		//return (int) ((utc / slotDurationMs) % 2);
		return (int) ((adjustedUtc / slotDurationMs) % 2);

    }

    public static int getNowSequential() {
        return sequential(getSystemTime());
    }

    public static long getSystemTime() {
		
        return total_delay + System.currentTimeMillis();
    }

    /**
     * 使用微软的时间服务器同步时间
     */
   public static void syncTime(AfterSyncTime afterSyncTime) {
		ntpThreadPool.execute(new Runnable() {
			@Override
			public void run() {
				NTPUDPClient timeClient = new NTPUDPClient();
				timeClient.setDefaultTimeout(5000);  // 設定timeout 5秒，避免NTP卡住
				InetAddress inetAddress;
				TimeInfo timeInfo;
				try {
					inetAddress = InetAddress.getByName("time.windows.com");
					timeInfo = timeClient.getTime(inetAddress);
					long serverTime = timeInfo.getMessage().getTransmitTimeStamp().getTime();
					int trueDelay = (int) ((serverTime - System.currentTimeMillis()));

					UtcTimer.total_delay = trueDelay;
					
					int slotDurationMs = GeneralVariables.isFT4
					? FT8Common.FT4_SLOT_TIME_MILLISECOND
					: FT8Common.FT8_SLOT_TIME_MILLISECOND;
					
					UtcTimer.delay = trueDelay % slotDurationMs;

					long localTime = System.currentTimeMillis();
					String serverTimeStr = sdf_HH_mm_ss.format(new Date(serverTime));
					String localTimeStr = sdf_HH_mm_ss.format(new Date(localTime));

					android.util.Log.d(TAG, "NTP Server Time (UTC): " + serverTimeStr);
					android.util.Log.d(TAG, "Local Device Time (UTC): " + localTimeStr);
					android.util.Log.d(TAG, "Time Difference (ms): " + (serverTime - localTime));

					if (afterSyncTime != null) {
						afterSyncTime.doAfterSyncTimer(trueDelay);
					}
				} catch (IOException e) {
					if (afterSyncTime != null) {
						afterSyncTime.syncFailed(e);
					}
				}
			}
		});
	}



	public static void ChgsyncTime(int trueDelay)  // Modify BV6LC
		{
			UtcTimer.delay = trueDelay ;//延迟的周期
		}

    public interface AfterSyncTime {
        void doAfterSyncTimer(int secTime);

        void syncFailed(IOException e);
    }
	
	public static void setTotalDelay(int delay) {
			total_delay=delay;
	}	
	
	public static String getGPSTimeStr() {
        // 取得目前時間 + 延後秒數（單位為毫秒）
        long nowWithDelay = System.currentTimeMillis() + total_delay ; //本來乘1000L好像錯了 (由delay改成total_delay，避免分鐘差太多)
		// 轉成 Date
        Date delayedDate = new Date(nowWithDelay);
		
		// 格式化成 HHmmss
        //SimpleDateFormat formatter = new SimpleDateFormat("HHmmss");
		android.util.Log.d(TAG, "---------A:" + sdf_HHmmss_phone_timezone.format(delayedDate));
		
		
        return sdf_HHmmss_phone_timezone.format(delayedDate);
		
    }
	
}
