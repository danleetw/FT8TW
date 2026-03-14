package com.bg7yoz.ft8cn.ui;
/**
 * 频谱图的主界面。
 * @author BGY70Z
 * @date 2023-03-20
 * @date 2025/7/2 BV6LC 增加onDestroyView
 */

import static android.view.MotionEvent.ACTION_UP;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CompoundButton;

import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import com.bg7yoz.ft8cn.GeneralVariables;
import com.bg7yoz.ft8cn.MainViewModel;
import com.bg7yoz.ft8cn.R;
import com.bg7yoz.ft8cn.databinding.FragmentSpectrumBinding;
import com.bg7yoz.ft8cn.timer.UtcTimer;

import com.bg7yoz.ft8cn.Ft8DecodedMessage;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.bg7yoz.ft8cn.spectrum.SpectrumListener;
import android.util.Log;

/**
 * A simple {@link Fragment} subclass.
 * create an instance of this fragment.
 */
public class SpectrumFragment extends Fragment {
    private static final String TAG = "SpectrumFragment";
    private FragmentSpectrumBinding binding;
    private MainViewModel mainViewModel;


    private int frequencyLineTimeOut = 0;//画频率线的时间量
	
	private boolean spectrumInited = false;


    //static {
    //    System.loadLibrary("ft8cn");
    //}


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }
	
	@Override
	public void onDestroyView() {
		super.onDestroyView();
		binding = null; 
	}


	private void initSpectrum() {
		Log.e("SpectrumFragment", "🔥 initSpectrum()");
		
		if (binding == null || mainViewModel == null) return;
		
		SpectrumListener listener = mainViewModel.spectrumListener;
		Log.e("SpectrumFragment",
			"listener=" + listener +
			", buffer=" + (listener != null ? listener.mutableDataBuffer : null));
		
		
		if (listener == null || listener.mutableDataBuffer == null) return;
		
		
		binding.columnarView.setShowBlock(true);
        binding.deNoiseSwitch.setChecked(mainViewModel.deNoise);//噪声抑制
        binding.waterfallView.setDrawMessage(false);
        setDeNoiseSwitchState();
        setMarkMessageSwitchState();

        binding.rulerFrequencyView.setFreq(Math.round(GeneralVariables.getBaseFrequency()));
        mainViewModel.currentMessages=null;


        //原始频谱开关
        binding.deNoiseSwitch.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
                mainViewModel.deNoise = b;
                setDeNoiseSwitchState();
                mainViewModel.currentMessages=null;
            }
        });
        //标记消息开关
        binding.showMessageSwitch.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
                mainViewModel.markMessage = b;
                setMarkMessageSwitchState();
            }
        });

		

        //当声音变化，画频谱
        mainViewModel.spectrumListener.mutableDataBuffer.observe(getViewLifecycleOwner(), new Observer<float[]>() {
            @Override
            public void onChanged(float[] floats) {
                drawSpectrum(floats);
            }
        });



        //观察解码的时长
        mainViewModel.getDecodeDurationMs().observe(getViewLifecycleOwner(), new Observer<Long>() {
            @SuppressLint("DefaultLocale")
            @Override
            public void onChanged(Long aLong) {
                binding.decodeDurationTextView.setText(String.format(
                        //GeneralVariables.getStringFromResource(R.string.decoding_takes_milliseconds), aLong));
						 GeneralVariables.getStringFromResource(R.string.decoding_takes_milliseconds), aLong) + (aLong > (GeneralVariables.transmitDelay+GeneralVariables.pttDelay) ? "⚠️" :"")  );
            }
        });
        //观察解码的变化
        mainViewModel.mutableIsDecoding.observe(getViewLifecycleOwner(), new Observer<Boolean>() {
            @Override
            public void onChanged(Boolean aBoolean) {
                binding.waterfallView.setDrawMessage(!aBoolean);//false说明解码完毕
            }
        });


        //显示UTC时间
        mainViewModel.timerSec.observe(getViewLifecycleOwner(), new Observer<Long>() {
            @Override
            public void onChanged(Long aLong) {
                binding.timersTextView.setText((GeneralVariables.isFT4? "4️⃣" :"8️⃣" ) + UtcTimer.getTimeStr(aLong));
                binding.freqBandTextView.setText(GeneralVariables.getBandString());
            }
        });


        //触摸频谱时的动作
        View.OnTouchListener touchListener = new View.OnTouchListener() {
            @SuppressLint("DefaultLocale")
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {

                frequencyLineTimeOut = 60;//显示频率线的时长：60*0.16

                binding.waterfallView.setTouch_x(Math.round(motionEvent.getX()));
                binding.columnarView.setTouch_x(Math.round(motionEvent.getX()));



                if (/*!mainViewModel.ft8TransmitSignal.isSynFrequency() // 即使是同頻發射，還是可以指定CQ時的頻率
                        &&*/ (binding.waterfallView.getFreq_hz() > 0)
                        && (motionEvent.getAction() == ACTION_UP)
                ) {//如果时异频发射
                    mainViewModel.databaseOpr.writeConfig("freq",
                            String.valueOf(binding.waterfallView.getFreq_hz()),
                            null);
                    mainViewModel.ft8TransmitSignal.setBaseFrequency(
                            (float) binding.waterfallView.getFreq_hz());

                    binding.rulerFrequencyView.setFreq(binding.waterfallView.getFreq_hz());

                    requireActivity().runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            ToastMessage.show(String.format(
                                    GeneralVariables.getStringFromResource(R.string.sound_frequency_is_set_to)
                                    , binding.waterfallView.getFreq_hz()),true);
                        }
                    });
                }
                return false;
            }
        };

        binding.waterfallView.setOnTouchListener(touchListener);
        binding.columnarView.setOnTouchListener(touchListener);

        return ;
	}


    @SuppressLint("ClickableViewAccessibility")
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
								 
        binding = FragmentSpectrumBinding.inflate(inflater, container, false);
		return binding.getRoot();
        
    }
	
	
	@Override
	public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
		super.onViewCreated(view, savedInstanceState);
		
		mainViewModel = new ViewModelProvider(requireActivity())
            .get(MainViewModel.class);

		mainViewModel.isReady.observe(getViewLifecycleOwner(), ready -> {
			if (Boolean.TRUE.equals(ready) && !spectrumInited) {
				spectrumInited = true;
				initSpectrum(); // 👈 真正初始化
			}
		});
	}



    public void drawSpectrum(float[] buffer) {
        if (buffer.length <= 0) {
            return;
        }
        int[] fft = new int[buffer.length / 2];
        if (mainViewModel.deNoise) {
            //getFFTDataFloat(buffer, fft);
			//Ft8DecodedMessage.getFFTDataIntDeNoise(buffer, fft,true);
			Ft8DecodedMessage.getFFTDataInt(buffer, fft,true);
			
        } else {
            //getFFTDataRawFloat(buffer, fft);
			
			Ft8DecodedMessage.getFFTDataInt(buffer, fft,false);
        }
        frequencyLineTimeOut--;
        if (frequencyLineTimeOut < 0) {
            frequencyLineTimeOut = 0;
        }
        //达到显示的时长，就取取消掉频率线
        if (frequencyLineTimeOut == 0) {
            binding.waterfallView.setTouch_x(-1);
            binding.columnarView.setTouch_x(-1);
        }
		
        binding.columnarView.setWaveData(fft); // 畫聲音強度柱狀圖
		
        if (mainViewModel.markMessage) {//是否标记消息
            binding.waterfallView.setWaveData(fft, UtcTimer.getNowSequential(), mainViewModel.currentMessages);
        } else {
            binding.waterfallView.setWaveData(fft, UtcTimer.getNowSequential(), null);
        }
    }

    private void setDeNoiseSwitchState() {
        if (mainViewModel.deNoise) {
            binding.deNoiseSwitch.setText(getString(R.string.de_noise));
        } else {
            binding.deNoiseSwitch.setText(getString(R.string.raw_spectrum_data));
        }
    }
    private void setMarkMessageSwitchState(){
        if (mainViewModel.markMessage) {
            binding.showMessageSwitch.setText(getString(R.string.markMessage));
        } else {
            binding.showMessageSwitch.setText(getString(R.string.unMarkMessage));
        }
    }

    //public native void getFFTData(int[] data, int fftData[]);

    //public native void getFFTDataFloat(float[] data ,int fftData[]);



    //public native void getFFTDataRaw(int[] data, int fftData[]);
    //public native void getFFTDataRawFloat(float[] data,int fftData[]);

}