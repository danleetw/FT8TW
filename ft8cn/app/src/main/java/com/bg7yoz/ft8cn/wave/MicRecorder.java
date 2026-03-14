package com.bg7yoz.ft8cn.wave;
/**
 * 使用Mic录音的操作。
 * @author BGY70Z
 * @date 2023-03-20
 */

import android.annotation.SuppressLint;
import android.content.Context;
import android.media.AudioDeviceInfo;
import android.media.AudioFormat;
import android.media.AudioManager;
import android.media.AudioRecord;
import android.media.MediaRecorder;
import android.os.Build;

import android.util.Log;
import com.bg7yoz.ft8cn.LogExt;

import com.bg7yoz.ft8cn.GeneralVariables;
import com.bg7yoz.ft8cn.R;
import com.bg7yoz.ft8cn.ui.ToastMessage;

public class MicRecorder {
    private static final String TAG = "MicRecorder";
    private int bufferSize = 0;//最小缓冲区大小
    //private static final int sampleRateInHz = 12000;//采样率
	private static int sampleRateInHz = 12000;//采样率
	
	
    private static final int channelConfig = AudioFormat.CHANNEL_IN_MONO; //单声道
    //private static final int audioFormat = AudioFormat.ENCODING_PCM_16BIT; //量化位数
    //private static final int audioFormat = AudioFormat.ENCODING_PCM_FLOAT; //量化位数
	private static int audioFormat = AudioFormat.ENCODING_PCM_FLOAT; //量化位数
	
	
	//private static final int audioFormat = AudioFormat.ENCODING_PCM_16BIT; //量化位数

    private AudioRecord audioRecord = null;//AudioRecord对象
    private boolean isRunning = false;//是否处于录音的状态。
    private OnDataListener onDataListener;
	
	
    public interface OnDataListener{
        void onDataReceived(float[] data,int len);
    }

    @SuppressLint("MissingPermission")
    public MicRecorder(){
		
		//Nokia rate=48000, source=1, channel=16, format=2, bufferSize=3840
		//sampleRateInHz=48000;
		//audioFormat=AudioFormat.ENCODING_PCM_16BIT;
		//sampleRateInHz=48000;
		//audioFormat=AudioFormat.ENCODING_PCM_FLOAT;
		
		
        //计算最小缓冲区
        bufferSize = AudioRecord.getMinBufferSize(sampleRateInHz, channelConfig, audioFormat);
		
		//audioRecord = new AudioRecord(MediaRecorder.AudioSource.MIC, sampleRateInHz
		//, channelConfig, audioFormat, bufferSize);//创建AudioRecorder对象
		
		
        //audioRecord = new AudioRecord(MediaRecorder.AudioSource.DEFAULT, sampleRateInHz
        //        , AudioFormat.CHANNEL_IN_MONO, AudioFormat.ENCODING_PCM_16BIT, bufferSize);//创建AudioRecorder对象
		
		
			
		// Nokia T20 48000, SRC=0 MediaRecorder.AudioSource.DEFAULT ,Ch=16 AudioFormat.CHANNEL_IN_MONO,fmt=2 AudioFormat.ENCODING_PCM_16BIT		
		// 除錯用
		/*
		GeneralVariables.sendToSSE("Test MicRecorder");
		BestAudioConfig config = BestAudioConfig.autoDetectBestConfig();
		if (config != null) {
			Log.d("AudioTest", "🎯 找到可用錄音組合：" + config.toString());
			GeneralVariables.sendToSSE("AudioTest"+ "🎯 找到可用錄音組合：" + config.toString());
		} else {
			Log.e("AudioTest", "❌ 沒有找到可用的錄音組合！");
			GeneralVariables.sendToSSE("AudioTest ❌ 沒有找到可用的錄音組合！");
		}*/
		
		
		
		
		// 正常版錄音
		audioRecord = new AudioRecord(MediaRecorder.AudioSource.MIC, sampleRateInHz
		, channelConfig, audioFormat, bufferSize);//创建AudioRecorder对象

		// 嘗試將音訊輸入路由到 USB 設備（如果連接的話）
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
			try {
				AudioManager audioManager =
					(AudioManager) GeneralVariables.getMainContext()
						.getSystemService(Context.AUDIO_SERVICE);
				if (audioManager != null) {
					AudioDeviceInfo[] devices =
						audioManager.getDevices(AudioManager.GET_DEVICES_INPUTS);
					for (AudioDeviceInfo device : devices) {
						Log.d(TAG, "Audio input device: type=" + device.getType()
								+ " name=" + device.getProductName());
						if (device.getType() == AudioDeviceInfo.TYPE_USB_DEVICE
								|| device.getType() == AudioDeviceInfo.TYPE_USB_HEADSET
								|| device.getType() == AudioDeviceInfo.TYPE_USB_ACCESSORY) {
							boolean ok = audioRecord.setPreferredDevice(device);
							Log.d(TAG, "✅ USB 輸入路由結果 = " + ok);
							break;
						}
					}
				}
			} catch (Exception e) {
				Log.e(TAG, "⚠️ 設置 USB 音訊輸入設備失敗: " + e.getMessage());
			}
		}
    }

    public void start(){
        if (isRunning) return;

        float[] buffer = new float[bufferSize];
        try {
            audioRecord.startRecording();//开始录音
        }catch (Exception e){
            ToastMessage.show(String.format(GeneralVariables.getStringFromResource(
                    R.string.recorder_cannot_record),e.getMessage()));
            Log.d(TAG, "startRecord: "+e.getMessage() );
        }

        isRunning = true;

        new Thread(new Runnable() {
            @Override
            public void run() {
                while (isRunning) {
                    //判断是否处于录音状态，state!=3，说明没有处于录音的状态
                    if (audioRecord.getRecordingState() != AudioRecord.RECORDSTATE_RECORDING) {
                        isRunning = false;
                        Log.d(TAG, String.format("录音失败，状态码：%d", audioRecord.getRecordingState()));
                        break;
                    }

                    //读录音的数据
                    int bufferReadResult = audioRecord.read(buffer, 0, bufferSize,AudioRecord.READ_BLOCKING);

                    if (onDataListener!=null){
                        onDataListener.onDataReceived(buffer,bufferReadResult);
                    }
                }
                try {
                    if (audioRecord.getRecordingState() == AudioRecord.RECORDSTATE_RECORDING) {
                        audioRecord.stop();//停止录音
                    }
                }catch (Exception e){
                    ToastMessage.show(String.format(GeneralVariables.getStringFromResource(
                            R.string.recorder_stop_record_error),e.getMessage()));
                    Log.d(TAG, "startRecord: "+e.getMessage() );
                }
            }
        }).start();
    }

    /**
     * 停止录音。当录音停止后，监听列表中的监听器全部删除。
     */
    public void stopRecord() {
        isRunning = false;
    }

    public OnDataListener getOnDataListener() {
        return onDataListener;
    }

    public void setOnDataListener(OnDataListener onDataListener) {
        this.onDataListener = onDataListener;
    }
	
	
	public static class BestAudioConfig {
        public int sampleRate;
        public int source;
        public int channelConfig;
        public int audioFormat;
        public int bufferSize;

        public BestAudioConfig(int sampleRate, int source, int channelConfig, int audioFormat, int bufferSize) {
            this.sampleRate = sampleRate;
            this.source = source;
            this.channelConfig = channelConfig;
            this.audioFormat = audioFormat;
            this.bufferSize = bufferSize;
        }

        @Override
        public String toString() {
            return "✅ 成功組合: rate=" + sampleRate + ", source=" + source +
                    ", channel=" + channelConfig + ", format=" + audioFormat +
                    ", bufferSize=" + bufferSize;
        }
    
	
		// 測試參數用
		// Nokia T20 SRC=0 MediaRecorder.AudioSource.DEFAULT ,Ch=16 AudioFormat.CHANNEL_IN_MONO,fmt=2 AudioFormat.ENCODING_PCM_16BIT
		public static BestAudioConfig autoDetectBestConfig() {
			int[] sampleRates = {48000, 24000, 12000,44100, 32000, 16000,  8000};
			int[] sources = {
					//MediaRecorder.AudioSource.DEFAULT, // 0
					//MediaRecorder.AudioSource.CAMCORDER, // 5
					//MediaRecorder.AudioSource.VOICE_RECOGNITION, // 6
					MediaRecorder.AudioSource.MIC // 1
					
			};
			int[] channelConfigs = {
					AudioFormat.CHANNEL_IN_MONO, // 16
					AudioFormat.CHANNEL_IN_STEREO // 12
					
			};
			int[] audioFormats = {
					//AudioFormat.ENCODING_PCM_16BIT, //2
					//AudioFormat.ENCODING_PCM_8BIT, //3 
					AudioFormat.ENCODING_PCM_FLOAT //4
			};

			for (int rate : sampleRates) {
				for (int source : sources) {
					for (int channelConfig : channelConfigs) {
						for (int audioFormat : audioFormats) {
							int minBufferSize = AudioRecord.getMinBufferSize(rate, channelConfig, audioFormat);
							if (minBufferSize <= 0) continue;

							try {
								AudioRecord recorder = new AudioRecord(source, rate, channelConfig, audioFormat, minBufferSize * 2);
								if (recorder.getState() != AudioRecord.STATE_INITIALIZED) {
									recorder.release();
									continue;
								}

								recorder.startRecording();
								long start = System.currentTimeMillis();
								int totalRead = 0;

								if (audioFormat == AudioFormat.ENCODING_PCM_FLOAT) {
									float[] buffer = new float[minBufferSize];
									while (System.currentTimeMillis() - start < 500) {
										totalRead += recorder.read(buffer, 0, buffer.length, AudioRecord.READ_BLOCKING);
									}
								} else {
									byte[] buffer = new byte[minBufferSize];
									while (System.currentTimeMillis() - start < 500) {
										totalRead += recorder.read(buffer, 0, buffer.length, AudioRecord.READ_BLOCKING);
									}
								}

								recorder.stop();
								recorder.release();

								LogExt.i("AudioTest", "📦 測試成功(Test successful) - rate=" + rate + " src=" + source +
										" ch=" + channelConfig + " fmt=" + audioFormat + " readBytes=" + totalRead);
								//GeneralVariables.sendToSSE("📦 測試成功(Test successful) - rate=" + rate + " src=" + source +
								//		" ch=" + channelConfig + " fmt=" + audioFormat + " readBytes=" + totalRead);

								return new BestAudioConfig(rate, source, channelConfig, audioFormat, minBufferSize);

							} catch (Exception e) {
								LogExt.e("AudioTest", "💥 例外(Fail) - rate=" + rate + " src=" + source +
										" ch=" + channelConfig + " fmt=" + audioFormat + " msg=" + e.getMessage());
								//GeneralVariables.sendToSSE("💥 例外(Fail) - rate=" + rate + " src=" + source +
								//		" ch=" + channelConfig + " fmt=" + audioFormat + " msg=" + e.getMessage());		
							}
						}
					}
				}
			}

			return null; // 沒有成功的組合
		}

	}
	
	
	
	
}
