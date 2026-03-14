package com.bg7yoz.ft8cn.ft8listener;
/**
 * 用于监听音频的类。监听通过时钟UtcTimer来控制周期，通过OnWaveDataListener接口来读取音频数据。
 *
 * @author BGY70Z
 * @date 2023-03-20
 * @date 2025-09-02 Remove Native BV6LC
 * 監聽聲音
 */

import android.util.Log;
import com.bg7yoz.ft8cn.LogExt;

import androidx.lifecycle.MutableLiveData;

import com.bg7yoz.ft8cn.FT8Common;
import com.bg7yoz.ft8cn.Ft8Message;
import com.bg7yoz.ft8cn.Js8Message;

import com.bg7yoz.ft8cn.GeneralVariables;
import com.bg7yoz.ft8cn.database.DatabaseOpr;
import com.bg7yoz.ft8cn.timer.OnUtcTimer;
import com.bg7yoz.ft8cn.timer.UtcTimer;
import com.bg7yoz.ft8cn.wave.OnGetVoiceDataDone;

import com.bg7yoz.ft8cn.Ft8DecodedMessage;
import com.bg7yoz.ft8cn.Js8DecodedMessage;


import java.util.ArrayList;


import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer; 

import com.bg7yoz.ft8cn.ft8signal.FT8Package;


import android.os.Handler;
import android.os.Looper;

import java.util.UUID;

// Test
import android.media.AudioTrack;
import android.media.AudioManager;
import android.media.AudioFormat;
// Test

public class FT8SignalListener {
    private static final String TAG = "FT8SignalListener";
	private final String instanceId = UUID.randomUUID().toString().substring(0, 6);
	
    private UtcTimer decodeSlotTimer;
    //private HamRecorder hamRecorder;
    private final OnFt8Listen onFt8Listen;//当开始监听，解码结束后触发的事件
    //private long band;
    
	//public MutableLiveData<Long> decodeTimeSec = new MutableLiveData<>();//解码的时长
    //public long timeSec=0;//解码的时长
	private OnDecodeTimingListener timingListener; //解碼用

    private OnWaveDataListener onWaveDataListener;


    private DatabaseOpr db;

    private final A91List a91List = new A91List();//a91列表

	
	// JS8CALL
	private final Handler js8Handler = new Handler(Looper.getMainLooper());
	private boolean js8DecodeRunning = false;
	private Runnable js8DecodeTask;
	// JS8CALL
	


    //static {
        //System.loadLibrary("ft8cn");
    //}

    public interface OnWaveDataListener {
        void getVoiceData(int duration, boolean afterDoneRemove, OnGetVoiceDataDone getVoiceDataDone);
    }

    public FT8SignalListener(DatabaseOpr db, OnFt8Listen onFt8Listen) {
        //this.hamRecorder = hamRecorder;
        this.onFt8Listen = onFt8Listen;
        this.db = db;

		/*

		int intervalTenths = GeneralVariables.isFT4
							   ? FT8Common.FT4_SLOT_TIME_M     // 75 = 7.5 秒
							   : FT8Common.FT8_SLOT_TIME_M;    // 150 = 15 秒

        //创建动作触发器，与UTC时间同步，以15秒一个周期，DoOnSecTimer是在周期起始时触发的事件。150是15秒
        utcTimer = new UtcTimer(GeneralVariables.isFT4 ? FT8Common.FT4_SLOT_TIME_M : FT8Common.FT8_SLOT_TIME_M, false, new OnUtcTimer() {
            @Override
            public void doHeartBeatTimer(long utc) {//不触发时的时钟信息
            }

            @Override
            public void doOnSecTimer(long utc) {//当指定间隔时触发时
                LogExt.d(TAG, String.format("觸發錄音,%d", utc));
				//GeneralVariables.sendToSSE(TAG +  String.format(":觸發錄音,%d", utc));
				
                runRecorde(utc);
            }
        });
		*/
		
		restartTimer(); // ✅ 建構子統一使用 restartTimer()
		
    }

    public void startListen() {
		Log.d(TAG, "startListen(): 啟動 UTC Timer-----------------------------");
        decodeSlotTimer.start();
		
		
		if(GeneralVariables.js8call){
			startJs8SlidingDecode(); // ✅ 啟動 JS8 解碼任務
		}
		
    }

    public void stopListen() {
        decodeSlotTimer.stop();
		
		if(GeneralVariables.js8call){
			stopJs8SlidingDecode(); // ✅ 停止 JS8 解碼任務
		}
    }

    public boolean isListening() {
        return decodeSlotTimer.isRunning();
    }

    /**
     * 获取当前时间的偏移量，这里包括总的时钟偏移，也包括本实例的偏移
     *
     * @return int
     */
    public int time_Offset() {
        return decodeSlotTimer.getTime_sec() + UtcTimer.delay;
    }

    /**
     * 录音。在后台以多线程的方式录音，录音自动生成一个临时的Wav格式文件。
     * 有两个回调函数，用于开始录音时和结束录音时。当结束录音时，激活解码程序。
     *
     * @param utc 当前解码的UTC时间
     */
    private void runRecorde(long utc) {
        LogExt.d(TAG, "開始錄音..."+UtcTimer.getTimeStr(UtcTimer.getSystemTime()) );
		
		// 顯示目前呼叫時序
		/*
		if (GeneralVariables.ft8TransmitSignal != null &&
			GeneralVariables.ft8TransmitSignal.mutableSequential != null 
			) 
		{
			GeneralVariables.ft8TransmitSignal.mutableSequential.postValue(
				GeneralVariables.ft8TransmitSignal.sequential );
		}*/
		
		
		//GeneralVariables.sendToSSE(TAG + "開始錄音!!!");

		/*
        if (onWaveDataListener != null) {
			Log.d(TAG, "-----------------------runRecorde() 呼叫 getVoiceData");
            onWaveDataListener.getVoiceData(GeneralVariables.isFT4 ? FT8Common.FT4_SLOT_TIME_MILLISECOND : FT8Common.FT8_SLOT_TIME_MILLISECOND, true
                    , new OnGetVoiceDataDone() {
                        @Override
                        public void onGetDone(float[] data) {
                            LogExt.d(TAG, "開始解碼...###");
							//GeneralVariables.sendToSSE(TAG + "開始錄音!!!");
                            decodeFt8(utc, data);
                        }
                    });
        }*/
		
		long slotLen = GeneralVariables.isFT4 
					? FT8Common.FT4_SLOT_TIME_MILLISECOND   // 7500ms
					: FT8Common.FT8_SLOT_TIME_MILLISECOND;  // 15000ms

		//long now = System.currentTimeMillis();
		long now = UtcTimer.getSystemTime();
		
		final int safetyAdvance = GeneralVariables.isFT4 ? 500 : 300;
		
		now=now-safetyAdvance;
		
		long offset = now % slotLen;         // 現在已經過了 slot 的多少毫秒
		long delayToNext = (slotLen - offset + 200) % slotLen; // 等到下一個 slot 開頭 +200ms
		//long delayToNext = (slotLen - offset + GeneralVariables.transmitDelay) % slotLen; // 等到下一個 slot 開頭 +200ms
		//long delayToNext = (slotLen - offset -  safetyAdvance +slotLen) % slotLen; // 等到下一個 slot 開頭 +200ms
		
		
		

		LogExt.d(TAG, String.format(
				"####### slot對齊: slotLen=%d, offset=%d, delay=%d", 
				slotLen, offset, delayToNext));

		int decodeReserve = GeneralVariables.isFT4 ? 800 : 1200;
		int duration = (int) (slotLen - decodeReserve);
		

		
		new Handler(Looper.getMainLooper()).postDelayed(() -> {
			GeneralVariables.ft8TransmitSignal.mutableSequential.postValue(
			GeneralVariables.ft8TransmitSignal.sequential );
			
			
			
			if (onWaveDataListener != null) {
				onWaveDataListener.getVoiceData(duration, true, new OnGetVoiceDataDone() {
					@Override
					public void onGetDone(float[] data) {
						decodeFt8(utc, data);
					}
				});
			}
		}, delayToNext);
		
		/*
		// 直接開始錄音，不要再 postDelayed
		if (onWaveDataListener != null) {
			onWaveDataListener.getVoiceData(duration, true, new OnGetVoiceDataDone() {
				@Override
				public void onGetDone(float[] data) {
					LogExt.d(TAG , "收集完整:" + UtcTimer.getTimeStr(utcTimer.getSystemTime()) );
					decodeFt8(utc, data);
				}
			});
		}
		*/
		
		
    }

    public void decodeFt8(long utc, float[] voiceData) {

        //此处是测试用代码-------------------------
//        String fileName = getCacheFileName("test_01.wav");
//        Log.e(TAG, "onClick: fileName:" + fileName);
//        WaveFileReader reader = new WaveFileReader(fileName);
//        int data[][] = reader.getData();
        //----------------------------------------------------------
		
	    
		
		LogExt.d(TAG , instanceId+" decodeFt8" + UtcTimer.getTimeStr(UtcTimer.getSystemTime()) );
        new Thread(new Runnable() {
            @Override
            public void run() {
                long time = System.currentTimeMillis();
                if (onFt8Listen != null) {
                    onFt8Listen.beforeListen(utc);
                }

//                float[] tempData = ints2floats(data);


                ///读入音频数据，并做预处理
                //其实这种方式要注意一个问题，在一个周期之内，必须解码完毕，否则新的解码又要开始了
				/*
                long ft8Decoder = InitDecoder(utc, FT8Common.SAMPLE_RATE
                        , voiceData.length, true);
//                        , tempData.length, true);
                DecoderMonitorPressFloat(voiceData, ft8Decoder);//读入音频数据
//                DecoderMonitorPressFloat(tempData, ft8Decoder);//读入音频数据

				
                ArrayList<Ft8Message> allMsg = new ArrayList<>();
//                ArrayList<Ft8Message> msgs = runDecode(utc, voiceData,false);
                ArrayList<Ft8Message> msgs = runDecode(ft8Decoder, utc, false);
				*/
				
				
				//playVoiceData(voiceData);  // 非同步播放可放到 thread 裡
				
				ArrayList<Ft8Message> allMsg = new ArrayList<>();
				ArrayList<Ft8Message> msgs = runDecode(voiceData, utc, false);
				//runDecode(voiceData, utc, false);
				
				
                addMsgToList(allMsg, msgs);
                long timeSec = System.currentTimeMillis() - time;
                //decodeTimeSec.postValue(timeSec);//解碼耗時
				//decodeDurationMs.postValue(timeSec);
				if (timingListener != null) {
					timingListener.onDecodeFinished(timeSec);
				}
				
                if (onFt8Listen != null) {
                    onFt8Listen.afterDecode(utc, averageOffset(allMsg), UtcTimer.sequential(utc), msgs, false);
                }


				//不需要深度解碼了
				/*
                if (GeneralVariables.deepDecodeMode && false) {//进入深度解码模式
                    //float[] newSignal=tempData;
                    msgs = runDecode(voiceData, utc, true);
                    addMsgToList(allMsg, msgs);
                    timeSec = System.currentTimeMillis() - time;
                    decodeTimeSec.postValue(timeSec);//解码耗时
                    if (onFt8Listen != null) {
                        onFt8Listen.afterDecode(utc, averageOffset(allMsg), UtcTimer.sequential(utc), msgs, true);
                    }

                    do {
                        if (timeSec > FT8Common.DEEP_DECODE_TIMEOUT) break;//此处做超时检测，超过一定时间(7秒)，就不做减码操作了
                        //减去解码的信号
                        // Remark by bv6lcReBuildSignal.subtractSignal(ft8Decoder, a91List);

                        //再做一次解码
                        msgs = runDecode(voiceData, utc, true);
                        addMsgToList(allMsg, msgs);
                        timeSec = System.currentTimeMillis() - time;
                        decodeTimeSec.postValue(timeSec);//解码耗时
                        if (onFt8Listen != null) {
                            onFt8Listen.afterDecode(utc, averageOffset(allMsg), UtcTimer.sequential(utc), msgs, true);
                        }

                    } while (msgs.size() > 0 );

                }
				*/
                //移到finalize() 方法中调用了
                // remark by bv6lc DeleteDecoder(ft8Decoder);

                Log.d(TAG, String.format("解码耗时:%d毫秒", System.currentTimeMillis() - time));

            }
        }).start();
    }


	// 原來的解碼程式
	/*
    private ArrayList<Ft8Message> runDecode_OLD(long ft8Decoder, long utc, boolean isDeep) {
        ArrayList<Ft8Message> ft8Messages = new ArrayList<>();
        Ft8Message ft8Message = new Ft8Message(FT8Common.FT8_MODE);

		LogExt.d(TAG , "runDecode");
		
        ft8Message.utcTime = utc;
        ft8Message.band = GeneralVariables.band;
        a91List.clear();
        setDecodeMode(ft8Decoder, isDeep);//设置迭代次数,isDeep==true，迭代次数增加

        int num_candidates = DecoderFt8FindSync(ft8Decoder);//最多120个
        //long startTime = System.currentTimeMillis();
        for (int idx = 0; idx < num_candidates; ++idx) {
			
            //todo 应当做一下超时计算
            try {//做一下解码失败保护
                if (DecoderFt8Analysis(idx, ft8Decoder, ft8Message)) {
					LogExt.d(TAG , "idx="+idx+"/"+num_candidates);
                    if (ft8Message.isValid) {
						
                        Ft8Message msg = new Ft8Message(ft8Message);//此处使用msg，是因为有的哈希呼号会把<...>替换掉
                        byte[] a91 = DecoderGetA91(ft8Decoder);
                        a91List.add(a91, ft8Message.freq_hz, ft8Message.time_sec);

                        if (checkMessageSame(ft8Messages, msg)) {
                            continue;
                        }

                        msg.isWeakSignal = isDeep;//是不是弱信号
						
						msg.printAllFields();
						
                        ft8Messages.add(msg);

                    }
					else
					{
						LogExt.d(TAG , "Not Valid!!");
					}
                }
            } catch (Exception e) {
                Log.e(TAG, "run: " + e.getMessage());
            }

        }


        return ft8Messages;
    }
	*/
	
	// 新的解碼程式
    //private ArrayList<Ft8Message> runDecode(long ft8Decoder, long utc, boolean isDeep) {
	private ArrayList<Ft8Message> runDecode(float[] voiceData, long utc, boolean isDeep) {	
        ArrayList<Ft8Message> ft8Messages = new ArrayList<>();
        Ft8Message ft8Message = new Ft8Message(FT8Common.FT8_MODE);

		LogExt.d(TAG , "runDecode New---------------------");
		
		
		//long time = System.currentTimeMillis();
		
		String[] output = new String[50]; // 假設最多解出 50 筆
		
		//LogExt.d(TAG , "decodeFromVoice="+decodeFromVoice(voiceData,output,50));
		//Ft8DecodedMessage[] messages = decodeFromVoice(voiceData,output,50);// 104
		//Ft8DecodedMessage[] messages = decodeFromVoice(voiceData,output,150);// 113
		
		int bufBytes = voiceData.length * 4;
		ByteBuffer buf = ByteBuffer.allocateDirect(bufBytes).order(ByteOrder.nativeOrder());
		buf.asFloatBuffer().put(voiceData);
		
		
		//Ft8DecodedMessage[] messages = Ft8DecodedMessage.decodeFromVoice(voiceData,output,150);// 113
		//Ft8DecodedMessage[] messages = Ft8DecodedMessage.decodeFromVoice(buf,256,GeneralVariables.deepDecodeMode);// 113->150, decodeFromVoice
		
		
		LogExt.i(TAG, "Ft8DecodedMessage[] messages = decodeFromVoice(voiceData,output,50);"+GeneralVariables.deepDecodeMode);
		
		Ft8DecodedMessage[] messages = Ft8DecodedMessage.decodeFromVoice(buf,256,GeneralVariables.deepDecodeMode,GeneralVariables.isFT4);// 113->150, decodeFromVoice
		
		
		
		/*
		LogExt.d(TAG, String.format("AAAAA Hash 10 ,%d %d", FT8Package.getHash10("AAAAA"),Ft8DecodedMessage.computeHashes("AAAAA")[2]  ));
		LogExt.d(TAG, String.format("AAAAA Hash 12 ,%d %d", FT8Package.getHash12("AAAAA"),Ft8DecodedMessage.computeHashes("AAAAA")[1]  ));
		LogExt.d(TAG, String.format("AAAAA Hash 22 ,%d %d", FT8Package.getHash22("AAAAA"),Ft8DecodedMessage.computeHashes("AAAAA")[0]  ));
		LogExt.d(TAG, String.format("BBBBB Hash 10 ,%d %d", FT8Package.getHash10("BBBBB"),Ft8DecodedMessage.computeHashes("BBBBB")[2]  ));
		LogExt.d(TAG, String.format("BBBBB Hash 12 ,%d %d", FT8Package.getHash12("BBBBB"),Ft8DecodedMessage.computeHashes("BBBBB")[1]  ));
		LogExt.d(TAG, String.format("BBBBB Hash 22 ,%d %d", FT8Package.getHash22("BBBBB"),Ft8DecodedMessage.computeHashes("BBBBB")[0]  ));
		LogExt.d(TAG, String.format("CCCCC Hash 10 ,%d %d", FT8Package.getHash10("CCCCC"),Ft8DecodedMessage.computeHashes("CCCCC")[2]  ));
		LogExt.d(TAG, String.format("CCCCC Hash 12 ,%d %d", FT8Package.getHash12("CCCCC"),Ft8DecodedMessage.computeHashes("CCCCC")[1]  ));
		LogExt.d(TAG, String.format("CCCCC Hash 22 ,%d %d", FT8Package.getHash22("CCCCC"),Ft8DecodedMessage.computeHashes("CCCCC")[0]  ));
		LogExt.d(TAG, String.format("ABCDE Hash 10 ,%d %d", FT8Package.getHash10("ABCDE"),Ft8DecodedMessage.computeHashes("ABCDE")[2]  ));
		LogExt.d(TAG, String.format("ABCDE Hash 12 ,%d %d", FT8Package.getHash12("ABCDE"),Ft8DecodedMessage.computeHashes("ABCDE")[1]  ));
		LogExt.d(TAG, String.format("ABCDE Hash 22 ,%d %d", FT8Package.getHash22("ABCDE") ,Ft8DecodedMessage.computeHashes("ABCDE")[0] ));
		*/

		

        ft8Message.utcTime = utc;
        ft8Message.band = GeneralVariables.band;
		ft8Message.isValid=true;
		ft8Message.callsignFrom="";
		ft8Message.callsignTo="";
		
		
		
        a91List.clear();
		
		
		for (Ft8DecodedMessage msg : messages) {
			
			Ft8Message newmsg = new Ft8Message(ft8Message);//此处使用msg，是因为有的哈希呼号会把<...>替换掉
			LogExt.i(TAG,  " ➡️ " +msg.callsignTo + " "+ msg.callsignFrom + " "+msg.maidenGrid+" SNR:" + msg.snr + " I3:"+ msg.i3 + " N3:"+msg.n3 +" Time:"+msg.time_sec+ " "+GeneralVariables.myCallsign);
			//Ft8Message newmsg = new Ft8Message(2,0,msg.callTo,msg.callFrom,msg.grid);
			
			newmsg.callsignFrom=msg.callsignFrom;
			
			if( msg.callsignFrom != null && msg.callsignFrom.equalsIgnoreCase(GeneralVariables.myCallsign) ) // 我自己的呼叫不列入
				continue;
			
			newmsg.callsignTo=msg.callsignTo;
			newmsg.maidenGrid=msg.maidenGrid;
			newmsg.extraInfo=msg.maidenGrid;
			newmsg.signalFormat=GeneralVariables.isFT4 ? FT8Common.FT4_MODE : FT8Common.FT8_MODE ;
			
			
			newmsg.snr=msg.snr;
			newmsg.i3=msg.i3;
			newmsg.n3=msg.n3;
			//newmsg.utcTime=utc;
			//newmsg.isValid=true;
			
			newmsg.time_sec=msg.time_sec;
			newmsg.freq_hz=msg.freq_hz;
			
			newmsg.isValid=true;
			
			//newmsg.printAllFields();
			
			ft8Messages.add(newmsg);
		}
		
		
		//Ft8Message msg = new Ft8Message(2,0,"CQ","BV6LC","PL05");
		//public Ft8Message(String callTo, String callFrom, String extraInfo) {
		
		//ft8Messages.add(msg);
		if(1+1==2)
			return ft8Messages;
		
		
        
		// 先暫時不設定 setDecodeMode(ft8Decoder, isDeep);//设置迭代次数,isDeep==true，迭代次数增加

		/*
        int num_candidates = DecoderFt8FindSync(voiceData);//最多120个
        long startTime = System.currentTimeMillis();
        for (int idx = 0; idx < num_candidates; ++idx) {
			
            //todo 应当做一下超时计算
            try {//做一下解码失败保护
				
                if (DecoderFt8Analysis(idx, voiceData, ft8Message)) {
					LogExt.d(TAG , "idx="+idx+"/"+num_candidates);
                    if (ft8Message.isValid) {
						
                        //Ft8Message msg = new Ft8Message(ft8Message);//此处使用msg，是因为有的哈希呼号会把<...>替换掉
                        //byte[] a91 = DecoderGetA91(ft8Decoder);
                        a91List.add(a91, ft8Message.freq_hz, ft8Message.time_sec);

                        if (checkMessageSame(ft8Messages, msg)) {
                            continue;
                        }

                        msg.isWeakSignal = isDeep;//是不是弱信号
						
						msg.printAllFields();
						
                        ft8Messages.add(msg);

                    }
					else
					{
						LogExt.d(TAG , "Not Valid!!");
					}
                }
            } catch (Exception e) {
                Log.e(TAG, "run: " + e.getMessage());
            }

        }
		

        return ft8Messages;
		*/
		return ft8Messages;
    }
	
	
	//private ArrayList<Ft8Message> runDecodejs8(float[] voiceData, long utc, boolean isDeep) {	
	private Js8DecodedMessage runDecodejs8(float[] voiceData, long utc, boolean isDeep) {	
        

		
		LogExt.d(TAG+"_JS8" , "runDecode JS8---------------------");
		
		
		String[] output = new String[50]; // 假設最多解出 50 筆
		
		int bufBytes = voiceData.length * 4;
		ByteBuffer buf = ByteBuffer.allocateDirect(bufBytes).order(ByteOrder.nativeOrder());
		buf.asFloatBuffer().put(voiceData);

		LogExt.i(TAG+"_JS8" , "JS8 DecodedMessage[] messages = decodeFromVoice(voiceData,output,50);"+GeneralVariables.deepDecodeMode);
		
		
		//Ft8DecodedMessage[] messages=null;
		//Ft8DecodedMessage[] messages = Js8DecodedMessage.decodeFromVoice(buf,256,GeneralVariables.deepDecodeMode,GeneralVariables.isFT4);// 113->150, decodeFromVoice
		Js8DecodedMessage  messages = Js8DecodedMessage.decodeFromVoice(buf);// 113->150, decodeFromVoice
		LogExt.d(TAG+"_JS8" , "runDecode JS8----------------- ok----");
		
		if (messages != null) {
			LogExt.d("JS8", "JS8 decoded: "
					+ messages.callsignFrom + " "
					+ messages.callsignTo + " "
					+ messages.report);
		}
		
		
		return messages;
		

        
    }
	
	
	

    /**
     * 计算平均时间偏移值
     *
     * @param messages 消息列表
     * @return 偏移值
     */
    private float averageOffset(ArrayList<Ft8Message> messages) {
        if (messages.size() == 0) return 0f;
        float dt = 0;
        //int dtAverage = 0;
        for (Ft8Message msg : messages) {
            dt += msg.time_sec;
        }
        return dt / messages.size();
    }

    /**
     * 把消息添加到列表中
     *
     * @param allMsg 消息列表
     * @param newMsg 新的消息
     */
    private void addMsgToList(ArrayList<Ft8Message> allMsg, ArrayList<Ft8Message> newMsg) {
		LogExt.d(TAG  , "addMsgToList");
        for (int i = newMsg.size() - 1; i >= 0; i--) {
			
			Ft8Message msg=newMsg.get(i);
			//LogExt.d(TAG , "To:String:"+msg.toString() );
			//LogExt.d(TAG , "getMessageText():"+msg.getMessageText() );
			//LogExt.d(TAG , "Modi:"+msg.getModifier() );
			
			
			
			
            if (checkMessageSame(allMsg, newMsg.get(i))) {
                newMsg.remove(i);
            } else {
				
				
				
				
                allMsg.add(newMsg.get(i));
            }
        }
    }

    /**
     * 检查消息列表里同样的内容是否存在
     *
     * @param ft8Messages 消息列表
     * @param ft8Message  消息
     * @return boolean
     */
    private boolean checkMessageSame(ArrayList<Ft8Message> ft8Messages, Ft8Message ft8Message) {
        for (Ft8Message msg : ft8Messages) {
            if (msg.getMessageText().equals(ft8Message.getMessageText())) {
                if (msg.snr < ft8Message.snr) {
                    msg.snr = ft8Message.snr;
                }
                return true;
            }
        }
        return false;
    }

    @Override
    protected void finalize() throws Throwable {
        //DeleteDecoder(ft8Decoder);
        super.finalize();
    }

    public OnWaveDataListener getOnWaveDataListener() {
        return onWaveDataListener;
    }

    public void setOnWaveDataListener(OnWaveDataListener onWaveDataListener) {
        this.onWaveDataListener = onWaveDataListener;
    }


    public String getCacheFileName(String fileName) {
        return GeneralVariables.getMainContext().getCacheDir() + "/" + fileName;
    }

    public float[] ints2floats(int data[][]) {
        float temp[] = new float[data[0].length];
        for (int i = 0; i < data[0].length; i++) {
            temp[i] = data[0][i] / 32768.0f;
        }
        return temp;
    }

    public int[] floats2ints(float data[]) {
        int temp[] = new int[data.length];
        for (int i = 0; i < data.length; i++) {
            temp[i] = (int) (data[i] * 32767.0f);
        }
        return temp;
    }






    /**
     * 解码的第一步，初始化解码器，获取解码器的地址。
     *
     * @param utcTime     UTC时间
     * @param sampleRat   采样率，12000
     * @param num_samples 缓冲区数据的长度
     * @param isFt8       是否是FT8信号
     * @return 返回解码器的地址
     */
    //public native long InitDecoder(long utcTime, int sampleRat, int num_samples, boolean isFt8);
	
	
	
	

    /**
     * 解码的第二步，读取Wav数据。
     *
     * @param buffer  Wav数据缓冲区
     * @param decoder 解码器数据的地址
     */
    //public native void DecoderMonitorPress(int[] buffer, long decoder);
    //public native void DecoderMonitorPressFloat(float[] buffer, long decoder);


    /**
     * 解码的第三步，同步数据。
     *
     * @param decoder 解码器地址
     * @return 中标信号的数量
     */
    //public native int DecoderFt8FindSync(long decoder);

    /**
     * 解码的第四步，分析出消息。（需要在一个循环里）
     *
     * @param idx        中标信号的序号
     * @param decoder    解码器的地址
     * @param ft8Message 解出来的消息
     * @return boolean
     */
    //public native boolean DecoderFt8Analysis(int idx, long decoder, Ft8Message ft8Message);

    /**
     * 解码的最后一步，删除解码器数据
     *
     * @param decoder 解码器数据的地址
     */
    //public native void DeleteDecoder(long decoder);

    //public native void DecoderFt8Reset(long decoder, long utcTime, int num_samples);

    //public native byte[] DecoderGetA91(long decoder);//获取当前message的a91数据

    //public native void setDecodeMode(long decoder, boolean isDeep);//设置解码的模式，isDeep=true是多次迭代，=false是快速迭代
	
	
	public void restartTimer() {
		
		if (decodeSlotTimer != null) {
            LogExt.d(TAG, "⏹ 停止舊的 UTC Timer");
            decodeSlotTimer.stop();
			decodeSlotTimer.delete(); 
        }
		
		

		int intervalTenths = GeneralVariables.isFT4
				? FT8Common.FT4_SLOT_TIME_MILLISECOND
				: FT8Common.FT8_SLOT_TIME_MILLISECOND;

		LogExt.d(TAG, String.format("🔁 %s 建立新的 Timer：FT%s 模式 (間隔=%d0ms)", instanceId,
                GeneralVariables.isFT4 ? "4" : "8", intervalTenths));


		decodeSlotTimer = new UtcTimer(intervalTenths, false, new OnUtcTimer() {
			@Override
			public void doHeartBeatTimer(long utc) { }

			@Override
			public void doOnSecTimer(long utc) {
				LogExt.d(TAG, String.format("%s Timer 觸發錄音 (FT%s): %d %s", instanceId , GeneralVariables.isFT4 ? "4" : "8", utc , UtcTimer.getTimeStr(UtcTimer.getSystemTime())) );
				runRecorde(utc);
			}
		});

		//utcTimer.start();
		
		// ⭐ 對齊 slot 起始時間（+200ms buffer）
		long slotLen = (GeneralVariables.isFT4
				? FT8Common.FT4_SLOT_TIME_MILLISECOND   // 7500ms
				: FT8Common.FT8_SLOT_TIME_MILLISECOND);  // 15000ms

		long now = UtcTimer.getSystemTime();  // 目前時間（毫秒）
		long offset = now % slotLen;          // 已經過了這個 slot 的幾毫秒
		//long delayToNext = (slotLen - offset + 200) % slotLen; // 要延遲的時間（+200ms 保險）
		//long delayToNext = (slotLen - offset +500 ) % slotLen; // 要延遲的時間（+200ms 保險）
		//long delayToNext = (slotLen - offset +GeneralVariables.transmitDelay ) % slotLen; // 要延遲的時間（+200ms 保險）
		long delayToNext = (slotLen - offset  ) % slotLen; // 要延遲的時間（+200ms 保險）
		

		LogExt.d(TAG, String.format("slotlen= %d 已經經過%d 需要等待%d", slotLen, offset,  delayToNext));

		new Handler(Looper.getMainLooper()).postDelayed(() -> {
			decodeSlotTimer.start();
			LogExt.d(TAG, "✅ UTC Timer 已對齊 slot 啟動");
			runRecorde(UtcTimer.getSystemTime()); // ✅ 首次立即執行一次錄音與解碼
		}, delayToNext);
		
		
		
		
		
	}
	
	// 解碼JS8
	public void startJs8SlidingDecode() {
		if (js8DecodeRunning) return;
		js8DecodeRunning = true;


		LogExt.d(TAG+"_JS8", "startJs8SlidingDecode");
		
		js8DecodeTask = new Runnable() {
			@Override
			public void run() {
				LogExt.d(TAG+"_JS8", "startJs8SlidingDecode-Run");
				if (!js8DecodeRunning) return;

				LogExt.d(TAG+"_JS8", "onWaveDataListener=" + onWaveDataListener==null ? "NULL" : "Not Null");
				if (onWaveDataListener != null) {
					float[] latest13s = GeneralVariables.hamRecorder.getLatestAudioSegment(13);  // ⚠️ 確保你有 setInstance
					//ArrayList<Ft8Message> msgs = runDecodejs8(latest13s, System.currentTimeMillis(), false);
					Js8DecodedMessage  msgs = runDecodejs8(latest13s, System.currentTimeMillis(), false);
					String text1 = msgs.getMessageText(); 
					
					
					LogExt.d(TAG+"JS8",text1);
					
					
					//if(1+2==3) return;
					/*
					if (msgs.size() > 0) {
						GeneralVariables.sendToSSE("JS8", "M", "JS8解碼 " + msgs.size() + " 筆");
						for (Ft8Message msg : msgs) {
							String text = msg.getMessageText(); 
							 LogExt.d("JS8",text);
						}
					}
					else{
						GeneralVariables.sendToSSE("JS8", "M", "JS8解碼 0 筆");
					}*/
				}

				js8Handler.postDelayed(this, 1000); // 每秒解一次
			}
		};

		js8Handler.post(js8DecodeTask);
	}

	public void stopJs8SlidingDecode() {
		js8DecodeRunning = false;
		js8Handler.removeCallbacks(js8DecodeTask);
	}
	
	
	
	// Test
	private void playVoiceData(float[] data) {
		int sampleRate = 12000;
		int bufferSize = data.length * 2; // 16-bit PCM → 2 bytes/sample

		AudioTrack audioTrack = new AudioTrack(
			AudioManager.STREAM_MUSIC,
			sampleRate,
			AudioFormat.CHANNEL_OUT_MONO,
			AudioFormat.ENCODING_PCM_16BIT,
			bufferSize,
			AudioTrack.MODE_STREAM
		);

		short[] pcmData = new short[data.length];
		for (int i = 0; i < data.length; i++) {
			// 將 float -1.0 ~ 1.0 轉為 short
			pcmData[i] = (short) (Math.max(-1f, Math.min(1f, data[i])) * Short.MAX_VALUE);
		}

		audioTrack.play();
		audioTrack.write(pcmData, 0, pcmData.length);
	}
	// Test
	
	
	public interface OnDecodeTimingListener {
		void onDecodeFinished(long costMs);
	}
	public void setOnDecodeTimingListener(OnDecodeTimingListener l) {
		this.timingListener = l;
	}

	
}
