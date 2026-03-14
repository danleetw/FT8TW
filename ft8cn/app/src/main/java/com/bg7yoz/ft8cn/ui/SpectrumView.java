package com.bg7yoz.ft8cn.ui;
/**
 * 包含瀑布图、频率柱状图、标尺的自定义控件。
 * @author BGY70Z
 * @date 2023-03-20
 */

import static android.view.MotionEvent.ACTION_UP;

import android.annotation.SuppressLint;
import android.content.Context;
import android.util.AttributeSet;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.widget.CompoundButton;
import android.widget.Switch;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;


import com.bg7yoz.ft8cn.GeneralVariables;
import com.bg7yoz.ft8cn.MainViewModel;
import com.bg7yoz.ft8cn.R;
import com.bg7yoz.ft8cn.timer.UtcTimer;

import com.bg7yoz.ft8cn.Ft8DecodedMessage;
import java.util.Arrays;
import androidx.lifecycle.LifecycleOwner;

import androidx.lifecycle.ViewTreeLifecycleOwner;

import android.content.res.TypedArray;

public class SpectrumView extends ConstraintLayout {
	private static final String TAG = "[SpectrumView]";
    private MainViewModel mainViewModel;
    private ColumnarView columnarView;
    private Switch controlDeNoiseSwitch;
    private Switch controlShowMessageSwitch;
    private WaterfallView waterfallView;
    private RulerFrequencyView rulerFrequencyView;
    private Fragment fragment;


    private int frequencyLineTimeOut = 0;//画频率线的时间量
	
	private SpectrumRenderOptions renderOptions =
            new SpectrumRenderOptions(); // 預設 FULL
	private MainViewModel viewModel;
    private LifecycleOwner owner;
	
	private boolean spectrumActive = false;   // 是否真的開始畫
	private boolean observerRegistered = false; // 避免重複 observe
    	
			
			

    //static {
    //    System.loadLibrary("ft8cn");
    //}



    public SpectrumView(@NonNull Context context) {
        super(context);
    }

    public SpectrumView(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        //View view = (View) View.inflate(context, R.layout.spectrum_layout,this);
		View.inflate(context, R.layout.spectrum_layout, this);
		
		TypedArray ta = context.obtainStyledAttributes(attrs, R.styleable.SpectrumView);
		int mode = ta.getInt(R.styleable.SpectrumView_spectrumMode, 0);
		ta.recycle();

		renderOptions = (mode == 0)
				? SpectrumRenderOptions.simple()
				: SpectrumRenderOptions.full();
		
		
    }
	
	
	
	
	public void run(MainViewModel mainViewModel, Fragment fragment) {
		// 預設用 FULL 或你想要的模式
		run(mainViewModel, fragment, new SpectrumRenderOptions());
	}

    @SuppressLint("ClickableViewAccessibility")
    public void run(MainViewModel mainViewModel , Fragment fragment,SpectrumRenderOptions options){
		Log.e("SPECTRUM_FLOW", "SpectrumView.run() CALLED"); // 
		this.viewModel = mainViewModel;
		
		LifecycleOwner owner = ViewTreeLifecycleOwner.get(this);
		if (owner == null) {
			Log.w(TAG, "SpectrumView.run(): ViewTreeLifecycleOwner is null, retry...");
			post(() -> run(mainViewModel, fragment, options));
			return;
		}
		this.owner = owner;
		
		
		
		
		if (options != null) {
			this.renderOptions = options;   // ✅ 外部指定才覆蓋
		}		
		
		
		
		
        //this.mainViewModel = MainViewModel.getInstance(null);
		//this.mainViewModel = MainViewModel.getInstance();
		
		Log.e(TAG, "run() 開始");
		
		// ===== 防止 MainViewModel / SpectrumListener 尚未初始化就 crash =====
		if (mainViewModel == null) {
			Log.e(TAG, "SpectrumView.run(): mainViewModel is null");
			return;
		}
		if (mainViewModel.spectrumListener == null) {
			//Log.e(TAG, "SpectrumView.run(): spectrumListener is null, skip SpectrumView init");
			Log.w(TAG, "SpectrumView.run(): spectrumListener not ready, retry...");
			postDelayed(() -> run(mainViewModel, fragment, renderOptions), 100);
			return;
		}
		if (mainViewModel.spectrumListener.mutableDataBuffer == null) {
			Log.w(TAG, "SpectrumView.run(): mutableDataBuffer not ready, retry...");
			postDelayed(() -> run(mainViewModel, fragment, renderOptions), 100);
			return;
		}
		
		
		
		this.mainViewModel = mainViewModel;
		
        this.fragment=fragment;
        columnarView=findViewById(R.id.controlColumnarView);
        controlDeNoiseSwitch=findViewById(R.id.controlDeNoiseSwitch);
        waterfallView=findViewById(R.id.controlWaterfallView);
        rulerFrequencyView=findViewById(R.id.controlRulerFrequencyView);
        controlShowMessageSwitch=findViewById(R.id.controlShowMessageSwitch);
		
		



		if (rulerFrequencyView != null) {
			rulerFrequencyView.setFreq(Math.round(GeneralVariables.getBaseFrequency()));
		}	
        mainViewModel.currentMessages=null;


        //原始频谱开关
        controlDeNoiseSwitch.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
                mainViewModel.deNoise = b;
                setDeNoiseSwitchState();
                mainViewModel.currentMessages=null;
            }
        });
        //标记消息开关
        controlShowMessageSwitch.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
                mainViewModel.markMessage = b;
                setMarkMessageSwitchState();
            }
        });

        //當聲音變化時，更新頻譜畫面
		if (fragment == null) {
			Log.e(TAG, "SpectrumView.run(): fragment is null");
			return;
		}
		
		
		if (fragment != null) {
			//mainViewModel.spectrumListener.mutableDataBuffer.removeObservers(fragment.getViewLifecycleOwner());
			
			if (!observerRegistered) {
				observerRegistered = true;
				mainViewModel.spectrumListener.mutableDataBuffer.observe(
						owner,
						ints -> drawSpectrum(ints)
				);
			}
			
			

			// ⭐ 第一次進入時，如果 buffer 已經有資料，強制畫一次	
			float[] last = mainViewModel.spectrumListener.mutableDataBuffer.getValue();
			if (last != null && last.length > 0) {
				Log.d(TAG, "run(): drawSpectrum immediately with existing buffer");
				//drawSpectrum(last);
				// 等 View layout 完成後再畫
				post(() -> {
					Log.d(TAG, "post(): drawSpectrum after layout");
					drawSpectrum(last);
				});
			}
			
			Log.e("SpectrumView", "-----------drawSpectrum--------------");
		} else {
			Log.e("SpectrumView", "Fragment is null!!!");
		}


        //观察解码的变化
        mainViewModel.mutableIsDecoding.observe(owner, aBoolean -> {
			if (waterfallView != null) {
				waterfallView.setDrawMessage(!Boolean.TRUE.equals(aBoolean));
			}
		});

        //触摸频谱时的动作
        View.OnTouchListener touchListener = new View.OnTouchListener() {
            @SuppressLint("DefaultLocale")
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {

                frequencyLineTimeOut = 60;//显示频率线的时长：60*0.16

                waterfallView.setTouch_x(Math.round(motionEvent.getX()));
                columnarView.setTouch_x(Math.round(motionEvent.getX()));


                if (//!mainViewModel.ft8TransmitSignal.isSynFrequency() 2026/1/17就算同頻發射也可以改變聲音頻率
                         (waterfallView.getFreq_hz() > 0)
                        && (motionEvent.getAction() == ACTION_UP)
                ) {//如果是異頻發射
                    mainViewModel.databaseOpr.writeConfig("freq",
                            String.valueOf(waterfallView.getFreq_hz()),
                            null);
                    mainViewModel.ft8TransmitSignal.setBaseFrequency(
                            (float) waterfallView.getFreq_hz());

					if (rulerFrequencyView != null) {
						rulerFrequencyView.setFreq(waterfallView.getFreq_hz());
					}	

                    fragment.requireActivity().runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            ToastMessage.show(String.format(
                                    GeneralVariables.getStringFromResource(R.string.sound_frequency_is_set_to)
                                    , waterfallView.getFreq_hz()),true);
                        }
                    });
                }
                return false;
            }
        };

        waterfallView.setOnTouchListener(touchListener);
        columnarView.setOnTouchListener(touchListener);
		// ⭐ 最後再套用 render options（確保狀態正確）
		applyRenderOptions();
		//if (!renderOptions.simpleMode) {
		//	setDeNoiseSwitchState();
		//	setMarkMessageSwitchState();
		//}

		// =========================
		// ⭐【加在這裡】強制拉一次目前 FFT
		// =========================
		post(() -> {
			if (this.mainViewModel == null
					|| this.mainViewModel.spectrumListener == null) {
				return;
			}

			float[] buf = this.mainViewModel.spectrumListener.getLastFFTBuffer();
			if (buf != null && buf.length > 0) {
				Log.d(TAG, "force drawSpectrum from cached FFT");
				drawSpectrum(buf);
			}
		});



    }
    private void setDeNoiseSwitchState() {
        if (mainViewModel==null) return;
        controlDeNoiseSwitch.setChecked(mainViewModel.deNoise);
        if (mainViewModel.deNoise) {
            controlDeNoiseSwitch.setText(GeneralVariables.getStringFromResource(R.string.de_noise));
        } else {
            controlDeNoiseSwitch.setText(GeneralVariables.getStringFromResource(R.string.raw_spectrum_data));
        }
    }
    private void setMarkMessageSwitchState(){
        if (mainViewModel.markMessage) {
            controlShowMessageSwitch.setText(GeneralVariables.getStringFromResource(R.string.markMessage));
        } else {
            controlShowMessageSwitch.setText(GeneralVariables.getStringFromResource(R.string.unMarkMessage));
        }
    }




    public void drawSpectrum(float[] buffer) {
		//Log.d(TAG, "drawSpectrum------------------------");
        //if (buffer.length <= 0 || getWidth() <= 0 || getHeight() <= 0) {
		if (waterfallView != null) {
			Log.d(TAG,
				"SpectrumView h=" + getHeight() +
				" waterfall h=" + waterfallView.getHeight()
			);	
		}	
			
			
		if (buffer == null || buffer.length <= 0 ) {	
            return;
        }
		
		// ⭐ View 還沒 layout 完 → 延後再畫一次（不能 return）
		if (getWidth() <= 0 || getHeight() <= 0) {
			Log.w(TAG, "drawSpectrum: view not ready, retry later");
			post(() -> drawSpectrum(buffer));
			return;
		}
		
		
		// ⭐ 第一次拿到有效資料 → 正式啟動
		if (!spectrumActive) {
			spectrumActive = true;
			Log.i(TAG, "SpectrumView activated on first FFT frame");
		}
		
		
        int[] fft = new int[buffer.length / 2];
		int[] newfft = new int[buffer.length / 2];
		
        if (mainViewModel.deNoise) {
			Ft8DecodedMessage.getFFTDataInt(buffer, fft,true);
        } else {
			Ft8DecodedMessage.getFFTDataInt(buffer, fft,false);
        }
		
		if (renderOptions.simpleMode) {
			columnarView.setWaveData(fft);
			
			if (mainViewModel.markMessage) {//是否标记消息
				waterfallView.setWaveData(fft, UtcTimer.getNowSequential(), mainViewModel.currentMessages);
			} else {
				waterfallView.setWaveData(fft, UtcTimer.getNowSequential(), null);
			}
			

		}
		else
		{

		
			frequencyLineTimeOut--;
			if (frequencyLineTimeOut < 0) {
				frequencyLineTimeOut = 0;
			}
			//达到显示的时长，就取取消掉频率线
			if (frequencyLineTimeOut == 0) {
				waterfallView.setTouch_x(-1);
				columnarView.setTouch_x(-1);
			}
			columnarView.setWaveData(fft);
			if (mainViewModel.markMessage) {//是否标记消息
				waterfallView.setWaveData(fft, UtcTimer.getNowSequential(), mainViewModel.currentMessages);
			} else {
				waterfallView.setWaveData(fft, UtcTimer.getNowSequential(), null);
			}
		}	
    }


    //public native void getFFTData(int[] data, int fftData[]);
    //public native void getFFTDataFloat(float[] data, int fftData[]);

    public native void getFFTDataRaw(int[] data, int fftData[]);
    public native void getFFTDataRawFloat(float[] data, int fftData[]);

	public void unregisterObservers() {
		if (mainViewModel != null && fragment != null) {
			try {
				//mainViewModel.spectrumListener.mutableDataBuffer.removeObservers(fragment.getViewLifecycleOwner());
				//mainViewModel.mutableIsDecoding.removeObservers(fragment.getViewLifecycleOwner());
				Log.d(TAG, "unregisterObservers(): Observers removed");
			} catch (Exception e) {
				Log.e(TAG, "unregisterObservers() failed: " + e.getMessage());
			}
		}
	}
	
	
	// Stop -------------
	public void stop() {
		// 停止任何定時刷新 / 動畫 / handler 執行緒（如有）
		frequencyLineTimeOut = 0;

		// 清空 UI 的暫存資料
		if (columnarView != null) {
			columnarView.setWaveData(null);
		}

		if (waterfallView != null) {
			waterfallView.setWaveData(null, 0, null);
		}

		// 清掉觸控狀態
		if (waterfallView != null) {
			waterfallView.setTouch_x(-1);
		}
		if (columnarView != null) {
			columnarView.setTouch_x(-1);
		}

		if (mainViewModel != null
            && mainViewModel.spectrumListener != null
            && owner != null) {
				mainViewModel.spectrumListener.mutableDataBuffer.removeObservers(owner);
		}

		observerRegistered = false;  
		Log.d(TAG, "SpectrumView stopped.");
	} //-----Stop
	
	// ---- Release
	public void release() {
		stop();  // 先確保停止

		// 移除 LiveData observers
		unregisterObservers();

		// 清空變數引用（加速 GC 回收）
		columnarView = null;
		waterfallView = null;
		rulerFrequencyView = null;
		controlDeNoiseSwitch = null;
		controlShowMessageSwitch = null;
		mainViewModel = null;
		fragment = null;

		Log.d(TAG, "SpectrumView released.");
	} // ---- Release
	
	
	private void applyRenderOptions() {
		Log.d(TAG, "applyRenderOptions simpleMode=" + renderOptions.simpleMode);
		if (renderOptions == null) return;

		if (renderOptions.simpleMode) {
			// simple mode：隱藏控制按鈕
			if (controlDeNoiseSwitch != null) {
				controlDeNoiseSwitch.setVisibility(View.GONE);
			}
			if (controlShowMessageSwitch != null) {
				controlShowMessageSwitch.setVisibility(View.GONE);
			}
		} else {
			// full mode：顯示控制按鈕
			if (controlDeNoiseSwitch != null) {
				controlDeNoiseSwitch.setVisibility(View.VISIBLE);
			}
			if (controlShowMessageSwitch != null) {
				controlShowMessageSwitch.setVisibility(View.VISIBLE);
			}
		}
	}
	
	public SpectrumRenderOptions getRenderOptions() {
		return renderOptions;
	}




}
