package com.bg7yoz.ft8cn.ui;
/**
 * 呼叫界面。
 * @author BGY70Z
 * @date 2023-03-20
 * @date 2025-09-02 Remove Native BV6LC
 */

import android.annotation.SuppressLint;
import android.content.res.Configuration;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.text.InputType;

import android.text.method.DigitsKeyListener;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.AnimationUtils;
import android.widget.AdapterView;
import android.widget.TextView;


import android.view.MotionEvent;

import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.fragment.NavHostFragment;
import androidx.recyclerview.widget.ItemTouchHelper;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.bg7yoz.ft8cn.Ft8Message;
import com.bg7yoz.ft8cn.GeneralVariables;
import com.bg7yoz.ft8cn.MainViewModel;
import com.bg7yoz.ft8cn.R;
import com.bg7yoz.ft8cn.databinding.FragmentMyCallingBinding;
import com.bg7yoz.ft8cn.ft8transmit.FunctionOfTransmit;
import com.bg7yoz.ft8cn.ft8transmit.TransmitCallsign;
import com.bg7yoz.ft8cn.timer.UtcTimer;

import com.bg7yoz.ft8cn.connector.ConnectMode;
import com.bg7yoz.ft8cn.database.ControlMode;




import java.util.ArrayList;



import android.widget.EditText;
import androidx.appcompat.app.AlertDialog;   // 建議用這個
//import android.text.InputType;  // 如果有用到 setInputType 記得加這個

import com.bg7yoz.ft8cn.LogExt;

public class MyCallingFragment extends Fragment {
    private static final String TAG = "MyCallingFragment";
    private FragmentMyCallingBinding binding;
    private MainViewModel mainViewModel;

    private RecyclerView transmitRecycleView;

    private CallingListAdapter transmitCallListAdapter;

    private FunctionOrderSpinnerAdapter functionOrderSpinnerAdapter;
	
	
	
	private boolean isSpinnerTouched = false; // 旗標：用於追蹤是否點擊了 Spinner
	private int lastSelectedPosition = -1;    // 記錄上次選中的選項
	//private boolean isSystemTriggered = false; // 用於標記是否為系統操作觸發
	private boolean isUserClick = false; // 標記是否為使用者操作
	private View customKeyboard;

    //static {
    //    System.loadLibrary("ft8cn");
    //}


    /**
     * 马上对发起者呼叫
     *
     * @param message 消息
     */
    //@RequiresApi(api = Build.VERSION_CODES.N)
    private void doCallNow(Ft8Message message) {
		
		/*
		if (GeneralVariables.autoAddFollow){ //要求自動儲存
			mainViewModel.addFollowCallsign(message.getCallsignFrom());
		}
		*/
		
        if (!mainViewModel.ft8TransmitSignal.isActivated()) {
            mainViewModel.ft8TransmitSignal.setActivated(true);
            GeneralVariables.transmitMessages.add(message);//把消息添加到关注列表中
        }
        //呼叫发启者
        mainViewModel.ft8TransmitSignal.setTransmit(message.getFromCallTransmitCallsign()
                , 1, message.extraInfo);
        mainViewModel.ft8TransmitSignal.transmitNow();

        GeneralVariables.resetLaunchSupervision();//复位自动监管
		GeneralVariables.noReplyCount=0;
    }



	@Override
	public void onCreateContextMenu(@NonNull android.view.ContextMenu menu,
									@NonNull View v,
									android.view.ContextMenu.ContextMenuInfo menuInfo) {
		super.onCreateContextMenu(menu, v, menuInfo);
		// 這裡不需要新增項目，因為 Adapter 已經透過 menuListener 建立好了
		Log.d(TAG, "📋 onCreateContextMenu 被呼叫"); 
	}


    /**
     * 菜单选项 (長按呼號下拉選單)
     *
     * @param item 菜单
     * @return 是否选择
     */
    //@RequiresApi(api = Build.VERSION_CODES.N)
    @Override
    public boolean onContextItemSelected(@NonNull MenuItem item) {
        //Ft8Message ft8Message = (Ft8Message) item.getActionView().getTag();

        int position = (int) item.getActionView().getTag();
        Ft8Message ft8Message = transmitCallListAdapter.getMessageByPosition(position);
        if (ft8Message == null) return super.onContextItemSelected(item);
        
		
        GeneralVariables.resetLaunchSupervision();//复位自动监管
		int otherSeq;
        switch (item.getItemId()) {
            case 1://时序与发送者相反！！！
                Log.d(TAG, "呼叫：" + ft8Message.getCallsignTo());
                if (!mainViewModel.ft8TransmitSignal.isActivated()) {
                    mainViewModel.ft8TransmitSignal.setActivated(true);
                }
				
                //mainViewModel.ft8TransmitSignal.setTransmit(ft8Message.getToCallTransmitCallsign()
                //        , 1, ft8Message.extraInfo);
				ToastMessage.show("Case 1");
						
				otherSeq = (ft8Message.getSequence() + 1) % 2; // ✅ 對方的 slot
				mainViewModel.ft8TransmitSignal.callToCallSign(
					ft8Message.getCallsignTo(),
					otherSeq,
					true,  // 我方要用對側（= 對方的另一側）,
					ft8Message.snr,
					ft8Message.freq_hz
				);		
						
						
                mainViewModel.ft8TransmitSignal.transmitNow();
                break;

            case 3:
				//ToastMessage.show("Case 3");
                Log.d(TAG, "呼叫：" + ft8Message.getCallsignFrom());
                //doCallNow(ft8Message);
				otherSeq = (ft8Message.getSequence() ) % 2; // ✅ 對方的 slot
				
				mainViewModel.ft8TransmitSignal.callToCallSign(
					ft8Message.getCallsignFrom(),
					otherSeq,
					true,  // 我方要用對側（= 對方的另一側）,
					ft8Message.snr,
					ft8Message.freq_hz
				);		
				
				mainViewModel.ft8TransmitSignal.transmitNow();
				mainViewModel.ft8TransmitSignal.setActivated(true);
				
				
                //if (!mainViewModel.ft8TransmitSignal.isActivated()) {
                //    mainViewModel.ft8TransmitSignal.setActivated(true);
                // }
                // mainViewModel.ft8TransmitSignal.setTransmit(ft8Message.getFromCallTransmitCallsign()
                //        , 1, ft8Message.extraInfo);
                //mainViewModel.ft8TransmitSignal.transmitNow();
                break;

            case 4://回复
				ToastMessage.show("Case 4");
                Log.d(TAG, "回复：" + ft8Message.getCallsignFrom());
				/*
				if(GeneralVariables.autoAddFollow){ //要求自動儲存
					mainViewModel.addFollowCallsign(ft8Message.getCallsignFrom());
				}*/
				
                if (!mainViewModel.ft8TransmitSignal.isActivated()) {
                    mainViewModel.ft8TransmitSignal.setActivated(true);
                    GeneralVariables.transmitMessages.add(ft8Message);//把消息添加到关注列表中
                }
                //呼叫发启者
                mainViewModel.ft8TransmitSignal.setTransmit(ft8Message.getFromCallTransmitCallsign()
                        , -1, ft8Message.extraInfo);
                mainViewModel.ft8TransmitSignal.transmitNow();
                break;

            case 5://to 的QRZ
                showQrzFragment(ft8Message.getCallsignTo());
                break;
            case 6://from 的QRZ
                showQrzFragment(ft8Message.getCallsignFrom());
                break;
            case 7://查to的日志
                navigateToLogFragment(ft8Message.getCallsignTo());
                break;
            case 8://查from的日志
                navigateToLogFragment(ft8Message.getCallsignFrom());
                break;


        }

        //return super.onContextItemSelected(item);
		return true;
		//return super.onContextItemSelected(item);
    }
    /**
     * 跳转到日志查询界面
     * @param callsign 呼号
     */
    private void navigateToLogFragment(String callsign){
        mainViewModel.queryKey=callsign;//把呼号作为关键字提交
        NavController navController = Navigation.findNavController(requireActivity()
                , R.id.fragmentContainerView);
        navController.navigate(R.id.action_menu_nav_mycalling_to_menu_nav_history);//跳转到日志
    }
    /**
     * 查询QRZ信息
     *
     * @param callsign 呼号
     */
    private void showQrzFragment(String callsign) {
        NavHostFragment navHostFragment = (NavHostFragment) requireActivity().getSupportFragmentManager().findFragmentById(R.id.fragmentContainerView);
        assert navHostFragment != null;//断言不为空
        Bundle bundle = new Bundle();
        bundle.putString(QRZ_Fragment.CALLSIGN_PARAM, callsign);
        navHostFragment.getNavController().navigate(R.id.QRZ_Fragment, bundle);
    }

    @SuppressLint("NotifyDataSetChanged")
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) 
	{
        //mainViewModel = MainViewModel.getInstance(this);
		//mainViewModel = MainViewModel.getInstance();
		Log.e(TAG, "進入 onCreateView");	
		
		
		
		mainViewModel = new ViewModelProvider(requireActivity()).get(MainViewModel.class);
		
		
        binding = FragmentMyCallingBinding.inflate(inflater, container, false);

		
        //当横屏时显示频谱图
        if (getResources().getConfiguration().orientation == Configuration.ORIENTATION_LANDSCAPE) {
            binding.messageSpectrumView.run(mainViewModel, this);
        }


        //发射消息的列表
        functionOrderSpinnerAdapter = new FunctionOrderSpinnerAdapter(requireContext(), mainViewModel);
        binding.functionOrderSpinner.setAdapter(functionOrderSpinnerAdapter);
        functionOrderSpinnerAdapter.notifyDataSetChanged();
		




        //关注的消息列表
        transmitRecycleView = binding.transmitRecycleView;
        transmitCallListAdapter = new CallingListAdapter(this.getContext(), mainViewModel
                , GeneralVariables.transmitMessages, CallingListAdapter.ShowMode.MY_CALLING);
        transmitRecycleView.setLayoutManager(new LinearLayoutManager(requireContext()));
        transmitRecycleView.setAdapter(transmitCallListAdapter);


        transmitCallListAdapter.notifyDataSetChanged();


        //设置消息列表滑动，用于快速呼叫
        initRecyclerViewAction();
        //菜单
        //requireActivity().registerForContextMenu(transmitRecycleView);
		registerForContextMenu(transmitRecycleView);

        //显示UTC时间
        mainViewModel.timerSec.observe(getViewLifecycleOwner(), new Observer<Long>() {
            @Override
            public void onChanged(Long aLong) {
                //binding.timerTextView.setText((GeneralVariables.isFT4? "4️⃣" :"8️⃣" ) + UtcTimer.getTimeStr(aLong) );
				binding.timerTextView.setText( UtcTimer.getTimeStr(aLong) );
            }
        });
        //显示发射频率
        GeneralVariables.mutableBaseFrequency.observe(getViewLifecycleOwner(), new Observer<Float>() {
            @SuppressLint("DefaultLocale")
            @Override
            public void onChanged(Float aFloat) {
                binding.baseFrequencyTextView.setText(String.format(
                        GeneralVariables.getStringFromResource(R.string.sound_frequency_is), aFloat));
            }
        });

	
        //观察发射状态按钮的变化
        Observer<Boolean> transmittingObserver = new Observer<Boolean>() {
            @Override
            public void onChanged(Boolean aBoolean) {
                if (mainViewModel.ft8TransmitSignal.isTransmitting()) {
					if( (!GeneralVariables.btListen)){ // 發射中紅色
						binding.setTransmitImageButton.setImageResource(R.drawable.ic_baseline_send_red_48);
					}
					else {                             // 發射中藍色
						binding.setTransmitImageButton.setImageResource(R.drawable.ic_baseline_sending_ble_48);
					}
                    binding.setTransmitImageButton.setAnimation(AnimationUtils.loadAnimation(getContext(), R.anim.view_blink));
                } else {
                    //录音对象也要处于启动状态才可以有发射的状态
                    if (mainViewModel.ft8TransmitSignal.isActivated() && mainViewModel.hamRecorder.isRunning()) {
						if( (!GeneralVariables.btListen)){ 
						                              // 可發射紅色
							binding.setTransmitImageButton.setImageResource(R.drawable.ic_baseline_send_red_48);
						}
						else{                         // 可發射藍色
							binding.setTransmitImageButton.setImageResource(R.drawable.ic_baseline_send_white_ble_48);
						}
                    } else { // 不可發射紅色
						if( (!GeneralVariables.btListen)){
							binding.setTransmitImageButton.setImageResource(R.drawable.ic_baseline_cancel_schedule_send_off_red);
						}
						else{ // 不可發射藍色
							binding.setTransmitImageButton.setImageResource(R.drawable.ic_baseline_cancel_schedule_send_off_ble);
						}
                    }
                    binding.setTransmitImageButton.setAnimation(null);
                }

                //暂停播放按键
                if (mainViewModel.ft8TransmitSignal.isTransmitting()) {
                    binding.pauseTransmittingImageButton.setImageResource(R.drawable.ic_baseline_pause_circle_outline_24);
                    binding.pauseTransmittingImageButton.setVisibility(View.VISIBLE);
                } else {
                    binding.pauseTransmittingImageButton.setVisibility(View.GONE);
                    binding.pauseTransmittingImageButton.setImageResource(R.drawable.ic_baseline_pause_disable_circle_outline_24);
                }
            }
        };
        //显示发射状态
        mainViewModel.ft8TransmitSignal.mutableIsTransmitting.observe(getViewLifecycleOwner(), transmittingObserver);
        mainViewModel.ft8TransmitSignal.mutableIsActivated.observe(getViewLifecycleOwner(), transmittingObserver);

        //暂停按钮
        binding.pauseTransmittingImageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mainViewModel.ft8TransmitSignal.setTransmitting(false);
                GeneralVariables.resetLaunchSupervision();//复位自动监管
            }
        });

        //监视命令程序
        mainViewModel.ft8TransmitSignal.mutableFunctions.observe(getViewLifecycleOwner()
                , new Observer<ArrayList<FunctionOfTransmit>>() {
                    @Override
                    public void onChanged(ArrayList<FunctionOfTransmit> functionOfTransmits) {
                        functionOrderSpinnerAdapter.notifyDataSetChanged();
                    }
                });

        //观察指令序号的变化
        mainViewModel.ft8TransmitSignal.mutableFunctionOrder.observe(getViewLifecycleOwner(), new Observer<Integer>() {
            @Override
            public void onChanged(Integer integer) {
				
				//isSystemTriggered = true; // 系統即將改變 Spinner 項目
                if (mainViewModel.ft8TransmitSignal == null
					|| mainViewModel.ft8TransmitSignal.functionList == null
					||mainViewModel.ft8TransmitSignal.functionList.size() < 6) {
                    binding.functionOrderSpinner.setSelection(0);
                } else {
                    binding.functionOrderSpinner.setSelection(integer - 1);
                }
				//isSystemTriggered = false; // 完成設置後，重置為 false

            }
        });

        //设置当指令序号被設定的事件
        binding.functionOrderSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int position, long l) {
				//Log.d(TAG, "================Command============ " + position );
				
				if (mainViewModel.ft8TransmitSignal == null
						|| mainViewModel.ft8TransmitSignal.functionList == null) {
					isUserClick = false;
					return;
				}
				
				
                if (mainViewModel.ft8TransmitSignal.functionList.size() > 1 && mainViewModel.ft8TransmitSignal.functionList.size()>=(position +1)) {
                    if (isUserClick ) { // 只有在使用者觸碰後才執行以下邏輯
						//isSpinnerTouched = false; // 重置觸碰狀態
						mainViewModel.ft8TransmitSignal.setCurrentFunctionOrder(position  +1);
						GeneralVariables.forceOnce = true; // 設定 forceOnce 為 true
						GeneralVariables.noReplyCount = 0; // 重設無回應計數
						//GeneralVariables.noReplyCount=0; // 重設無回應，避免選了新目標只發射一次
						//Log.d(TAG, "======= User selected item: " + position  + " =======");
					}
					else
					{
						//Log.d(TAG, "======= Background updated selection, ignored =======");
					}
					// 更新 lastSelectedPosition 並重置 isSpinnerTouched
					lastSelectedPosition = position;
					
					//if(i==1){
					//	GeneralVariables.forceOnce=true; // 因為設定了，所以不理會下一次收到的內容
					//	Log.d(TAG, "=== force onec!!!");
					//}
                }
				isUserClick = false; // 重置狀態
				//if(i==5){
				//	mainViewModel.ft8TransmitSignal.resetToCQ();
				//	GeneralVariables.resetLaunchSupervision();//复位自动监管
				//}
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });
		
		
		binding.functionOrderSpinner.setOnTouchListener(new View.OnTouchListener() {
		@Override
		public boolean onTouch(View v, MotionEvent event) {
				if (event.getAction() == MotionEvent.ACTION_DOWN) { // 確保是點擊事件
					//Log.d("Spinner", "Spinner 被點擊了！");
					//isSpinnerTouched = true; // 標記使用者已觸碰 Spinner
					isUserClick = true;
					//GeneralVariables.forceOnce=true; // 因為設定了，所以不理會下一次收到的內容
					//GeneralVariables.noReplyCount=0; // 重設無回應，避免選了新目標只發射一次
					//Log.d(TAG, "======= force once!!!=======");
				}
			return false; // 返回 false 以繼續處理預設行為（例如顯示選單）
			}
		});


        //显示当前目标呼号
        mainViewModel.ft8TransmitSignal.mutableToCallsign.observe(getViewLifecycleOwner(), new Observer<TransmitCallsign>() {
            @Override
            public void onChanged(TransmitCallsign transmitCallsign) {
				String toModifier=""; //修飾符(SOTA)
				
			// 先檢查 GeneralVariables.toModifier 是否為 null
			if (GeneralVariables.toModifier != null) {
				// 再檢查 transmitCallsign 是否為 null
				if (transmitCallsign != null) {
					// 最後檢查 callsign 是否等於 "CQ"
					if ("CQ".equals(transmitCallsign.callsign)) {
						toModifier = GeneralVariables.toModifier;
					}
				}
			}

			// 確保 transmitCallsign 和 callsign 不為 null
			String callsign = (transmitCallsign != null && transmitCallsign.callsign != null) 
					? transmitCallsign.callsign 
					: "";

			// 設定文字
			String callsignText = toModifier.isEmpty() 
					? String.format(
						GeneralVariables.getStringFromResource(R.string.target_callsign), 
						callsign)
					: String.format(
						GeneralVariables.getStringFromResource(R.string.target_callsign), 
						callsign + " " + toModifier);

			// 更新到 UI
			binding.toCallsignTextView.setText(callsignText);

			GeneralVariables.targetCallsign=callsign;
            }
        });

        //显示当前发射的时序
        mainViewModel.ft8TransmitSignal.mutableSequential.observe(getViewLifecycleOwner(), new Observer<Integer>() {
            @SuppressLint("DefaultLocale")
            @Override
            public void onChanged(Integer sequential) {
                binding.transmittingSequentialTextView.setText(
                        String.format((GeneralVariables.isFT4? "4️⃣" :"8️⃣" ) + GeneralVariables.getStringFromResource(R.string.transmission_sequence)
                                , sequential ,UtcTimer.getNowSequential()  ));
								
								
            }
        });

        //显示当前发射的SWR
        GeneralVariables.mutableSwr.observe(getViewLifecycleOwner(), new Observer<Float>() {
            @Override
            public void onChanged(Float Swr) {
				if(binding.transmittingSwrTextView!=null)
					if(Swr>=0.2f){
						binding.transmittingSwrTextView.setText(
						String.format("SWR:%.1f"
									, Swr) ) ;
					}
						
            }
        });
		
		binding.transmittingSwrTextView.setText("<SWR>");


        //開始發射按鈕
        binding.setTransmitImageButton.setOnClickListener(new View.OnClickListener() {
            //@RequiresApi(api = Build.VERSION_CODES.N)
            @Override
            public void onClick(View view) {
                //如果
				
				
                if (!mainViewModel.ft8TransmitSignal.isActivated()) {
					LogExt.d(TAG, "Click and isActivated");
					// 如果選擇藍芽裝置，先嘗試連線
					if( (GeneralVariables.controlMode == ControlMode.CAT) &&
					    (GeneralVariables.connectMode == ConnectMode.BLUE_TOOTH) &&
						(!GeneralVariables.btListen) ){
							mainViewModel.connectBluetoothRig(GeneralVariables.getMainContext(),GeneralVariables.btName);
						}
					//(UtcTimer.getNowSequential()  )%2, -33)
					//GeneralVariables.forceOnce=true;	
					if( mainViewModel.ft8TransmitSignal.isCallingCQ() )
					{
						LogExt.d(TAG, "Click and isCallingCQ");
						//mainViewModel.ft8TransmitSignal.restTransmitting(); //繼續呼叫CQ
						mainViewModel.ft8TransmitSignal.restTransmittingAndChangeSeq(); //繼續呼叫CQ 
					}
					else
					{
						LogExt.d(TAG, "Click and callToCallSign");
						mainViewModel.ft8TransmitSignal.callToCallSign( GeneralVariables.targetCallsign ,0,false,GeneralVariables.targetCallsignsnr,GeneralVariables.getBaseFrequency() ); //繼續呼叫剛剛對象
					}
					GeneralVariables.setSwl(0.0f);
                }
                mainViewModel.ft8TransmitSignal.setActivated(!mainViewModel.ft8TransmitSignal.isActivated());
                GeneralVariables.resetLaunchSupervision();//复位自动监管
				GeneralVariables.noReplyCount=0; 
				mainViewModel.ft8TransmitSignal.mutableSequential.postValue(mainViewModel.ft8TransmitSignal.sequential);//通知发射时序改变
            }
        });

        //观察传输消息列表的变化
        //mainViewModel.mutableTransmitMessages.observe(getViewLifecycleOwner(), new Observer<ArrayList<Ft8Message>>() {
        mainViewModel.mutableTransmitMessagesCount.observe(getViewLifecycleOwner(), new Observer<Integer>() {
            @SuppressLint("DefaultLocale")
            @Override
            public void onChanged(Integer count) {
                binding.decoderCounterTextView.setText(String.format(
                        GeneralVariables.getStringFromResource(R.string.message_count)
						, GeneralVariables.qsoCnt // 增加QSO計次
                        , GeneralVariables.transmitMessages.size()));
                //if (count == 0) {
                transmitCallListAdapter.notifyDataSetChanged();
                //} else {
                //    transmitCallListAdapter.notifyItemInserted(
                //            GeneralVariables.transmitMessages.size() - count);
                //}

                //当列表下部稍微多出一些，自动上移
                if (transmitRecycleView.computeVerticalScrollRange()
                        - transmitRecycleView.computeVerticalScrollExtent()
                        - transmitRecycleView.computeVerticalScrollOffset() < 300) {
                    transmitRecycleView.scrollToPosition(transmitCallListAdapter.getItemCount() - 1);
                }
            }
        });

        //清除传输消息列表
        binding.clearMycallListImageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mainViewModel.clearTransmittingMessage();
				//transmitCallListAdapter.setData(new ArrayList<>());  // 2025/8/3 BV6LC
				transmitCallListAdapter.setData(GeneralVariables.transmitMessages); // ⬅️ 同步給 adapter
            }
        });
		
		
		// 編輯呼叫對手
        binding.editToCallsignButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                
			// 建立一個 EditText
			final EditText input = new EditText(getContext());
			input.setInputType(InputType.TYPE_CLASS_TEXT);
			//input.setText(GeneralVariables.targetCallsign); // 預設顯示目前的呼號
			input.setText(""); // 預設顯示目前的呼號
			
			
			// 彈出輸入框
			new AlertDialog.Builder(getContext())
            .setTitle(R.string.html_target_callsign) ///"輸入呼號" //html_target_callsign  ok_confirmed 
            .setView(input)
            .setPositiveButton(R.string.ok_confirmed, (dialog, which) -> {
                String newCallsign = input.getText().toString().trim();
                if (!newCallsign.isEmpty()) {
					
					// 關閉發射
					mainViewModel.ft8TransmitSignal.setActivated(false);
					
                    binding.toCallsignTextView.setText(newCallsign.toUpperCase() );
					mainViewModel.ft8TransmitSignal.callToCallSign(newCallsign.toUpperCase(),0,false,-31,GeneralVariables.getBaseFrequency() ); // Next Seq
					GeneralVariables.forceOnce=true;
					mainViewModel.ft8TransmitSignal.transmitNow();
                    // TODO: 這裡也可以更新到 ViewModel 或傳給後端
					// ✅ 若目前還未啟動發射，就主動觸發發射按鈕
					if (!mainViewModel.ft8TransmitSignal.isActivated()) {
						binding.setTransmitImageButton.performClick();  // 模擬按下「發射」按鈕
					}
					
					
                }
            })
            .setNegativeButton("取消", (dialog, which) -> dialog.dismiss())
            .show();
				
                
            }
        });
		

        //复位到CQ按键
        binding.resetToCQImageView.setOnClickListener(new View.OnClickListener() {
            //@RequiresApi(api = Build.VERSION_CODES.N)
            @Override
            public void onClick(View view) {
                mainViewModel.ft8TransmitSignal.resetToCQ();
                GeneralVariables.resetLaunchSupervision();//复位自动监管
				GeneralVariables.forceOnce=true; // 按了CQ，暫不理會回應
            }
        });
        //自由文本输入框的限定操作
        binding.transFreeTextEdit.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void afterTextChanged(Editable editable) {
                //mainViewModel.ft8TransmitSignal.setFreeText(editable.toString().toUpperCase());
				String allowedChars = " 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+-./?";
				StringBuilder filtered = new StringBuilder();
				
				for (int i = 0; i < editable.length(); i++) {
					char c = editable.charAt(i);
					
					// 將小寫字母轉換為大寫
					if (Character.isLowerCase(c)) {
						c = Character.toUpperCase(c);
					}
					
					if (allowedChars.indexOf(c) >= 0) {
						filtered.append(c);
					}
				}
				
				
				binding.transFreeTextEdit.removeTextChangedListener(this);
				// 如果輸入內容與過濾後的內容不一致，更新文字
				if (!editable.toString().equals(filtered.toString())) {
					// 停止 TextWatcher，避免重複觸發
					//binding.transFreeTextEdit.removeTextChangedListener(this);
					
					// 更新文字，保持光標位置
					binding.transFreeTextEdit.setText(filtered.toString());
					binding.transFreeTextEdit.setSelection(filtered.length()); // 光標移動到最後

					// 恢復 TextWatcher
					//binding.transFreeTextEdit.addTextChangedListener(this);
					mainViewModel.ft8TransmitSignal.setFreeText(binding.transFreeTextEdit.getText().toString());
				}
				binding.transFreeTextEdit.addTextChangedListener(this);
				mainViewModel.ft8TransmitSignal.setFreeText(binding.transFreeTextEdit.getText().toString());
				
				
				
				
				
            }
        });
		
		//binding.transFreeTextEdit.setInputType(android.text.InputType.TYPE_CLASS_TEXT); // 設置為文本輸入
		//binding.transFreeTextEdit.setInputType(InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD);
		binding.transFreeTextEdit.setInputType(InputType.TYPE_CLASS_TEXT);
														
		//binding.transFreeTextEdit.setKeyListener(DigitsKeyListener.getInstance("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-./? "));
														 
		//binding.transFreeTextEdit.setKeyListener(
        //DigitsKeyListener.getInstance(" 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+-./?")
		//);
		
		
        binding.resetToCQImageView.setLongClickable(true);
        binding.resetToCQImageView.setOnLongClickListener(new View.OnLongClickListener() {
            @Override
            public boolean onLongClick(View view) {
                mainViewModel.setTransmitIsFreeText(!mainViewModel.getTransitIsFreeText());
                showFreeTextEdit();
                return true;
            }
        });

        binding.mycallToolsBar.setOnClickListener(new View.OnClickListener() { //上方工具列
            @Override
            public void onClick(View view) {
                GeneralVariables.simpleCallItemMode=!GeneralVariables.simpleCallItemMode;
                transmitRecycleView.setAdapter(transmitCallListAdapter);
                transmitCallListAdapter.notifyDataSetChanged();
                transmitRecycleView.scrollToPosition(transmitCallListAdapter.getItemCount() - 1);
                if (GeneralVariables.simpleCallItemMode){
                    ToastMessage.show(GeneralVariables.getStringFromResource(R.string.message_list_simple_mode));
                }else {
                    ToastMessage.show(GeneralVariables.getStringFromResource(R.string.message_list_standard_mode));
                }
            }
        });


        showFreeTextEdit();
		
		// ✅ 加在這裡觸發一次（即使數值沒變）顯示次數
		mainViewModel.mutableTransmitMessagesCount.setValue(0);
		// 畫一下畫面
		binding.transmittingSequentialTextView.setText(
                        (GeneralVariables.isFT4? "4️⃣" :"8️⃣" ) ) ;
		
		
		
		
        return binding.getRoot();
    }
	
	@Override
	public void onConfigurationChanged(@NonNull Configuration newConfig) {
		super.onConfigurationChanged(newConfig);

		// 確保 binding 和 transFreeTextEdit 正確初始化後，重新設置輸入限制
		
		if (binding != null && binding.transFreeTextEdit != null) {
			binding.transFreeTextEdit.setKeyListener(
				DigitsKeyListener.getInstance(" 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+-./?")
			);
		}
	}
	



    private void showFreeTextEdit() {
        if (mainViewModel.getTransitIsFreeText()) {
			binding.transFreeTextEdit.setText(GeneralVariables.sotamat);
            binding.transFreeTextEdit.setVisibility(View.VISIBLE);
            binding.functionOrderSpinner.setVisibility(View.GONE);
        } else {
            binding.transFreeTextEdit.setVisibility(View.GONE);
            binding.functionOrderSpinner.setVisibility(View.VISIBLE);
        }
    }

    /**
     * 设置列表滑动动 向左滑動
     */
    private void initRecyclerViewAction() {
        new ItemTouchHelper(new ItemTouchHelper.SimpleCallback(ItemTouchHelper.ANIMATION_TYPE_DRAG
                , ItemTouchHelper.START | ItemTouchHelper.END) {
            @Override
            public boolean onMove(@NonNull RecyclerView recyclerView, @NonNull RecyclerView.ViewHolder viewHolder
                    , @NonNull RecyclerView.ViewHolder target) {
                return false;
            }

            //@RequiresApi(api = Build.VERSION_CODES.N)
            @SuppressLint("NotifyDataSetChanged")
            @Override
            public void onSwiped(@NonNull RecyclerView.ViewHolder viewHolder, int direction) {
                if (direction == ItemTouchHelper.START) { //向左滑呼叫 Slide Left to Call
                    Ft8Message message = transmitCallListAdapter.getMessageByViewHolder(viewHolder);
                    if (message != null) {
                        //呼叫的目标不能是自己
                        if (!message.getCallsignFrom().equals("<...>")
                                //&& !message.getCallsignFrom().equals(GeneralVariables.myCallsign)
                                && !GeneralVariables.checkIsMyCallsign(message.getCallsignFrom())
                                && !(message.i3 == 0 && message.n3 == 0)) 
						{
							GeneralVariables.noReplyCount=0;  // BV6LC
                            //doCallNow(message);
							mainViewModel.ft8TransmitSignal.callToCallSign(message.getCallsignFrom(), message.getSequence(),true,message.snr,message.freq_hz  );
							mainViewModel.ft8TransmitSignal.transmitNow();
							mainViewModel.ft8TransmitSignal.setActivated(true);
                        }
                    }
                    transmitCallListAdapter.notifyItemChanged(viewHolder.getAdapterPosition());
                }
                if (direction == ItemTouchHelper.END) {//向右滑删除 Slide Right to delete
                    transmitCallListAdapter.deleteMessage(viewHolder.getAdapterPosition());
                    transmitCallListAdapter.notifyItemRemoved(viewHolder.getAdapterPosition());
                }
            }


            @Override
            public void onChildDraw(@NonNull Canvas c, @NonNull RecyclerView recyclerView, @NonNull RecyclerView.ViewHolder viewHolder, float dX, float dY, int actionState, boolean isCurrentlyActive) {
                super.onChildDraw(c, recyclerView, viewHolder, dX, dY, actionState, isCurrentlyActive);
                //制作呼叫背景的图标显示
                Drawable callIcon = ContextCompat.getDrawable(requireActivity(), R.drawable.ic_baseline_send_red_48);
                Drawable delIcon = ContextCompat.getDrawable(requireActivity(), R.drawable.log_item_delete_icon);
                Drawable background = new ColorDrawable(Color.LTGRAY);
                Ft8Message message = transmitCallListAdapter.getMessageByViewHolder(viewHolder);
                if (message == null) {
                    return;
                }
                if (message.getCallsignFrom().equals("<...>")) {//如果属于不能呼叫的消息，就不显示图标
                    return;
                }
                Drawable icon;
                if (dX > 0) {
                    icon = delIcon;
                } else {
                    icon = callIcon;
                }
                View itemView = viewHolder.itemView;
                int iconMargin = (itemView.getHeight() - icon.getIntrinsicHeight()) / 2;
                int iconLeft, iconRight, iconTop, iconBottom;
                int backTop, backBottom, backLeft, backRight;
                backTop = itemView.getTop();
                backBottom = itemView.getBottom();
                iconTop = itemView.getTop() + (itemView.getHeight() - icon.getIntrinsicHeight()) / 2;
                iconBottom = iconTop + icon.getIntrinsicHeight();
                if (dX > 0) {
                    backLeft = itemView.getLeft();
                    backRight = itemView.getLeft() + (int) dX;
                    background.setBounds(backLeft, backTop, backRight, backBottom);
                    iconLeft = itemView.getLeft() + iconMargin;
                    iconRight = iconLeft + icon.getIntrinsicWidth();
                    icon.setBounds(iconLeft, iconTop, iconRight, iconBottom);
                } else if (dX < 0) {
                    backRight = itemView.getRight();
                    backLeft = itemView.getRight() + (int) dX;
                    background.setBounds(backLeft, backTop, backRight, backBottom);
                    iconRight = itemView.getRight() - iconMargin;
                    iconLeft = iconRight - icon.getIntrinsicWidth();
                    icon.setBounds(iconLeft, iconTop, iconRight, iconBottom);
                } else {
                    background.setBounds(0, 0, 0, 0);
                    icon.setBounds(0, 0, 0, 0);
                }
                background.draw(c);
                icon.draw(c);

            }
        }).attachToRecyclerView(binding.transmitRecycleView);
    }
	
	@Override
	public void onDestroyView() {
		super.onDestroyView();

		// 停止 Recorder 與 Timer
		//if (mainViewModel.ft8SignalListener != null) {
		//	mainViewModel.ft8SignalListener.stopListen();
		//}
		//if (mainViewModel.hamRecorder != null) {
		//	mainViewModel.hamRecorder.stopRecord();
		//}

		// 解除 Adapter 與 RecyclerView 綁定
		if (transmitRecycleView != null) {
			transmitRecycleView.setAdapter(null);
		}

		transmitCallListAdapter = null;
		functionOrderSpinnerAdapter = null;
		transmitRecycleView = null;

		binding = null; // 已經有做，這個是對的
	}
		
	
}