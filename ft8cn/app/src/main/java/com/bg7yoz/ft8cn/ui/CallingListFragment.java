package com.bg7yoz.ft8cn.ui;
/**
 * 解码界面
 * @author BGY70Z
 * @date 2023-03-20
 */

import android.annotation.SuppressLint;

import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.AnimationUtils;

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
import com.bg7yoz.ft8cn.databinding.FragmentCallingListBinding;
import com.bg7yoz.ft8cn.timer.UtcTimer;

import com.bg7yoz.ft8cn.connector.ConnectMode;
import com.bg7yoz.ft8cn.database.ControlMode;

import java.util.ArrayList;

import androidx.constraintlayout.widget.ConstraintLayout;




public class CallingListFragment extends Fragment {
    private static final String TAG = "[CallingListFragment]";

    private FragmentCallingListBinding binding;
    private RecyclerView callListRecyclerView;
    private CallingListAdapter callingListAdapter;
    private MainViewModel mainViewModel;
	

	private ArrayList<Ft8Message> previousMessageList = new ArrayList<>();
	private ItemTouchHelper itemTouchHelper;
	
	
	
	private boolean spectrumStarted = false;
	
	
	
	
	

    @SuppressLint("NotifyDataSetChanged")
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
		Log.e(TAG, "進入 onCreateView");						 
        // Inflate the layout for this fragment
        //mainViewModel = MainViewModel.getInstance(this);
		//mainViewModel = MainViewModel.getInstance();
		mainViewModel = new ViewModelProvider(requireActivity()).get(MainViewModel.class);
		
        binding = FragmentCallingListBinding.inflate(inflater, container, false);
		

		
		
		
		// 測底關掉這個Fragment的自動狀態保存
		View root = binding.getRoot();
		root.setSaveEnabled(false);
		root.setSaveFromParentEnabled(false);
		disableSaveStateRecursive((ViewGroup) root);
			
		
        callListRecyclerView = binding.callingListRecyclerView;

        //callingListAdapter = new CallingListAdapter(this.getContext(), mainViewModel
        //        , mainViewModel.ft8Messages, CallingListAdapter.ShowMode.CALLING_LIST);
		//callingListAdapter = new CallingListAdapter(requireContext().getApplicationContext(), mainViewModel
        //        , mainViewModel.ft8Messages, CallingListAdapter.ShowMode.CALLING_LIST);
		callingListAdapter = new CallingListAdapter(requireContext(), mainViewModel
        , mainViewModel.ft8Messages, CallingListAdapter.ShowMode.CALLING_LIST);
				
				
				
        callListRecyclerView.setLayoutManager(new LinearLayoutManager(requireContext()));
        callListRecyclerView.setAdapter(callingListAdapter);
        callingListAdapter.notifyDataSetChanged();
        callListRecyclerView.scrollToPosition(callingListAdapter.getItemCount() - 1);
		
		callListRecyclerView.setSaveEnabled(false); // BV6LC 設定 RecyclerView 為非永久性保存：


        //requireActivity().registerForContextMenu(callListRecyclerView); //注册菜单
		if (callListRecyclerView != null) {
			requireActivity().registerForContextMenu(callListRecyclerView);
			                  
		}

        
		// ⭐ 在這裡先測試隱藏瀑布圖
		//hideSpectrum();
		//showSpectrum();
		
		/*
		if (binding.spectrumView != null) {
			binding.spectrumView.run(mainViewModel, this);
		}*/
		
		
        //设置呼号滑动，用于快速呼叫
        initRecyclerViewAction();

        //监听按钮
        binding.timerImageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (mainViewModel.hamRecorder.isRunning()) {
                    mainViewModel.hamRecorder.stopRecord();
                    mainViewModel.ft8TransmitSignal.setActivated(false);
                } else {
                    mainViewModel.hamRecorder.startRecord();
                }
            }
        });
        //清除按钮
        binding.clearCallingListImageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mainViewModel.clearFt8MessageList();
                callingListAdapter.notifyDataSetChanged();
                mainViewModel.mutable_Decoded_Counter.setValue(0);
            }
        });
        //观察解码数量
        mainViewModel.mutable_Decoded_Counter.observe(getViewLifecycleOwner(), new Observer<Integer>() {
            @SuppressLint("DefaultLocale")
            @Override
            public void onChanged(Integer integer) {
                binding.decoderCounterTextView.setText(
                        String.format(GeneralVariables.getStringFromResource(R.string.message_count_count)
                                , mainViewModel.currentDecodeCount, mainViewModel.ft8Messages.size()));


            }
        });

		// BV6LC 
		/*
        mainViewModel.mutableFt8MessageList.observe(getViewLifecycleOwner(), new Observer<ArrayList<Ft8Message>>() {
            @Override
            public void onChanged(ArrayList<Ft8Message> messages) {
                callingListAdapter.notifyDataSetChanged();
				if (!messages.equals(previousMessageList)) { // 檢查與前次數據是否相同
					previousMessageList.clear();
					previousMessageList.addAll(messages); // 更新快照
					callingListAdapter.notifyDataSetChanged(); // 只在數據變更時更新UI
				}
                //当列表下部稍微多出一些，自动上移
                if (callListRecyclerView.computeVerticalScrollRange()
                        - callListRecyclerView.computeVerticalScrollExtent()
                        - callListRecyclerView.computeVerticalScrollOffset() < 500) {
                    callListRecyclerView.scrollToPosition(callingListAdapter.getItemCount() - 1);
                }
				Log.d(TAG, "!!!!----!!!ft8Messages size: " + messages.size());
            }
        });
		*/
		mainViewModel.mutableFt8MessageList.observe(getViewLifecycleOwner(), new Observer<ArrayList<Ft8Message>>() {
			@Override
			public void onChanged(ArrayList<Ft8Message> messages) {
				// 建立 messages 的副本，避免原始 list 在背景被修改導致 crash
				ArrayList<Ft8Message> safeCopy = new ArrayList<>(messages);

				// 如果資料有變化才更新畫面
				if (!safeCopy.equals(previousMessageList)) {
					previousMessageList.clear();
					previousMessageList.addAll(safeCopy); // 用副本取代原本 list，避免異常
					callingListAdapter.notifyDataSetChanged();
				}

				// 自動捲動到底部
				if (callListRecyclerView.computeVerticalScrollRange()
						- callListRecyclerView.computeVerticalScrollExtent()
						- callListRecyclerView.computeVerticalScrollOffset() < 500) {
					callListRecyclerView.scrollToPosition(callingListAdapter.getItemCount() - 1);
				}

				Log.d(TAG, "!!!!----!!!ft8Messages size: " + safeCopy.size());
			}
		});
		
		
		
		
		
		
        //观察UTC时间
        mainViewModel.timerSec.observe(getViewLifecycleOwner(), new Observer<Long>() {
            @Override
            public void onChanged(Long aLong) {
                //binding.timerTextView.setText( (GeneralVariables.isFT4? "4️⃣" :"8️⃣" ) + UtcTimer.getTimeStr(aLong));
				binding.timerTextView.setText(  UtcTimer.getTimeStr(aLong));
            }
        });

        //观察时间偏移
        mainViewModel.mutableTimerOffset.observe(getViewLifecycleOwner(), new Observer<Float>() {
            @SuppressLint("DefaultLocale")
            @Override
            public void onChanged(Float aFloat) {
                binding.timeOffsetTextView.setText(String.format(
                        getString(R.string.average_offset_seconds), aFloat));
            }
        });

        //显示梅登海德网格
        GeneralVariables.mutableMyMaidenheadGrid.observe(getViewLifecycleOwner(), new Observer<String>() {
            @Override
            public void onChanged(String s) {
                binding.maidenheadTextView.setText(String.format(
                        getString(R.string.my_grid), s));
            }
        });

        //观察是否处于解码状态
        mainViewModel.mutableIsDecoding.observe(getViewLifecycleOwner(), new Observer<Boolean>() {
            @Override
            public void onChanged(Boolean aBoolean) {
                if (aBoolean) {
                    binding.isDecodingTextView.setText(getString(R.string.decoding));
                }
            }
        });
		
		mainViewModel.getDecodeDurationMs().observe(
				getViewLifecycleOwner(),
				new Observer<Long>() {
					@SuppressLint("DefaultLocale")
					@Override
					public void onChanged(Long timeMs) {
						if (timeMs == null) return;

						binding.isDecodingTextView.setText(
								String.format(
										(GeneralVariables.isFT4 ? "4️⃣ " : "8️⃣ ")
												+ getString(R.string.decoding_takes_milliseconds),
										timeMs
								)
						);
					}
				}
		);
		

        
		//观察解码的时长
		/*
        mainViewModel.ft8SignalListener.decodeTimeSec.observe(getViewLifecycleOwner(), new Observer<Long>() {
            @SuppressLint("DefaultLocale")
            @Override
            public void onChanged(Long aLong) {
                binding.isDecodingTextView.setText(String.format(
                        (GeneralVariables.isFT4? "4️⃣" :"8️⃣" ) + getString(R.string.decoding_takes_milliseconds), aLong));
            }
        });*/

        //以闪烁动画的方式显示录音状态
        mainViewModel.mutableIsRecording.observe(getViewLifecycleOwner(), new Observer<Boolean>() {
            @Override
            public void onChanged(Boolean aBoolean) {
				//Log.d(TAG, "controlMode:" + String.valueOf(GeneralVariables.controlMode)	);
				//Log.d(TAG, "connectMode:" + String.valueOf(GeneralVariables.connectMode)	);
				//Log.d(TAG, "BtListen:" + String.valueOf(GeneralVariables.btListen)	);
                if (aBoolean) {
					if ( (GeneralVariables.controlMode == ControlMode.CAT) &&  
					     (GeneralVariables.connectMode == ConnectMode.BLUE_TOOTH) ){
						if( (GeneralVariables.btListen) /*|| (mainViewModel.isBTConnected())*/ ){
							binding.timerImageButton.setImageResource(R.drawable.ic_baseline_mic_ble_48);
						}
						else
						{
							//mainViewModel.connectBluetoothRig(GeneralVariables.getMainContext(),GeneralVariables.btName);
							//mainViewModel.connectBluetoothRig(mainViewModel.getContext() , GeneralVariables.btName);
							//mainViewModel.connectBluetoothRig(requireContext(), GeneralVariables.btName);
							
							mainViewModel.connectBluetoothRig(requireContext().getApplicationContext(), GeneralVariables.btName);
							
							binding.timerImageButton.setImageResource(R.drawable.ic_baseline_mic_red_48);
						}
					}
					else
					{
						//if (GeneralVariables.btListen) BV6LC 在錄音時如果非藍芽
						//  mainViewModel.setBlueToothOff(); BV6LC
					  
						binding.timerImageButton.setImageResource(R.drawable.ic_baseline_mic_red_48);
					}
                    binding.timerImageButton.setAnimation(AnimationUtils.loadAnimation(getContext()
                            , R.anim.view_blink));
                } else {
                    if (mainViewModel.hamRecorder.isRunning()) {
                        binding.timerImageButton.setImageResource(R.drawable.ic_baseline_mic_48);
                    } else {
                        binding.timerImageButton.setImageResource(R.drawable.ic_baseline_mic_off_48);
                    }
                    binding.timerImageButton.setAnimation(null);
                }
            }
        });

        //切换精简模式和标准模式
        binding.callingListToolsBar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                GeneralVariables.simpleCallItemMode=!GeneralVariables.simpleCallItemMode;
                callListRecyclerView.setAdapter(callingListAdapter);
                callingListAdapter.notifyDataSetChanged();
                callListRecyclerView.scrollToPosition(callingListAdapter.getItemCount() - 1);
                if (GeneralVariables.simpleCallItemMode){
                    ToastMessage.show(GeneralVariables.getStringFromResource(R.string.message_list_simple_mode));
                }else {
                    ToastMessage.show(GeneralVariables.getStringFromResource(R.string.message_list_standard_mode));
                }
            }
        });
		
		// 更新畫面
		binding.isDecodingTextView.setText(
                        (GeneralVariables.isFT4? "4️⃣" :"8️⃣" ) );
		

        return binding.getRoot();
    }
	
	
	@Override
	public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
		super.onViewCreated(view, savedInstanceState);

		// ⭐ 保險 1：layout 完成後啟動 spectrum（只跑一次）
		if (binding != null && binding.spectrumView != null) {
			binding.spectrumView.addOnLayoutChangeListener(
				new View.OnLayoutChangeListener() {
					@Override
					public void onLayoutChange(
						View v, int l, int t, int r, int b,
						int oldL, int oldT, int oldR, int oldB
					) {
						if ( v.getWidth() > 0 && v.getHeight() > 0) {
							Log.d(TAG, "Spectrum layout ready, start from OnLayoutChange");
							startSpectrumIfReady();
							v.removeOnLayoutChangeListener(this); // ✅ 只執行一次
						}
					}
				}
			);
		}


		startSpectrumIfReady();
		
		
	}
	
	

	
	@Override
	public void onResume() {
		super.onResume();
		startSpectrumIfReady();

		
		
	}
	
	@Override
	public void onPause() {
		super.onPause();

		
	}
	
	
	

    /**
     * 设置列表滑动动作
     */
    private void initRecyclerViewAction() {
        itemTouchHelper = new ItemTouchHelper(new ItemTouchHelper.SimpleCallback(ItemTouchHelper.ANIMATION_TYPE_DRAG
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
                if (direction == ItemTouchHelper.START) {//呼叫
                    Ft8Message message = callingListAdapter.getMessageByViewHolder(viewHolder);
                    if (message != null) {
                        //呼叫的目标不能是自己
                        if (!message.getCallsignFrom().equals("<...>")
                                //&& !message.getCallsignFrom().equals(GeneralVariables.myCallsign)
                                && !GeneralVariables.checkIsMyCallsign(message.getCallsignFrom())
                                && !(message.i3 == 0 && (message.n3 == 0 || message.n3 == 5))) {//遥测和自由文本不能呼叫
                            //doCallNow(message);
							
							mainViewModel.ft8TransmitSignal.callToCallSign(message.getCallsignFrom(), message.getSequence(),true,message.snr,message.freq_hz);
							mainViewModel.ft8TransmitSignal.transmitNow();
							mainViewModel.ft8TransmitSignal.setActivated(true);
							navigateToMyCallFragment();//跳转到发射界面
							
							
                        } else {
                            callingListAdapter.notifyItemChanged(viewHolder.getAdapterPosition());
                        }
                    }
                }
                if (direction == ItemTouchHelper.END) {//删除
                    callingListAdapter.deleteMessage(viewHolder.getAdapterPosition());
                    callingListAdapter.notifyItemRemoved(viewHolder.getAdapterPosition());
                }


            }

            @Override
            public void onChildDraw(@NonNull Canvas c, @NonNull RecyclerView recyclerView
                    , @NonNull RecyclerView.ViewHolder viewHolder, float dX, float dY
                    , int actionState, boolean isCurrentlyActive) {
                super.onChildDraw(c, recyclerView, viewHolder, dX, dY, actionState, isCurrentlyActive);
                //制作呼叫背景的图标显示
                //final Drawable callIcon = ContextCompat.getDrawable(requireActivity()
                //        , R.drawable.ic_baseline_send_red_48);
                //final Drawable delIcon = ContextCompat.getDrawable(requireActivity()
                //        , R.drawable.log_item_delete_icon);
					
				final Drawable callIcon = ContextCompat.getDrawable(requireContext(), R.drawable.ic_baseline_send_red_48);
				final Drawable delIcon = ContextCompat.getDrawable(requireContext(), R.drawable.log_item_delete_icon);
						
						
                final Drawable background = new ColorDrawable(Color.LTGRAY);
                Ft8Message message = callingListAdapter.getMessageByViewHolder(viewHolder);
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
        });
		itemTouchHelper.attachToRecyclerView(binding.callingListRecyclerView);
    }

    /**
     * 马上对发起者呼叫
     *
     * @param message 消息
     */
    //@RequiresApi(api = Build.VERSION_CODES.N)
    private boolean doCallNow(Ft8Message message) {

        //mainViewModel.addFollowCallsign(message.getCallsignFrom());
        if (!mainViewModel.ft8TransmitSignal.isActivated()) {
            mainViewModel.ft8TransmitSignal.setActivated(true);
            GeneralVariables.transmitMessages.add(message);//把消息添加到关注列表中
        }
        //呼叫发启者
        mainViewModel.ft8TransmitSignal.setTransmit(message.getFromCallTransmitCallsign()
                , 1, message.extraInfo);
        mainViewModel.ft8TransmitSignal.transmitNow();
        GeneralVariables.resetLaunchSupervision();//复位自动监管
        navigateToMyCallFragment();//跳转到发射界面
        return true;
    }

    /**
     * 跳转到日志查询界面
     * @param callsign 呼号
     */
    private void navigateToLogFragment(String callsign){
        mainViewModel.queryKey=callsign;//把呼号作为关键字提交
        NavController navController = Navigation.findNavController(requireActivity()
                , R.id.fragmentContainerView);
        navController.navigate(R.id.action_menu_nav_calling_list_to_menu_nav_history);//跳转到日志
    }

    /**
     * 跳转到发射界面
     */
    private void navigateToMyCallFragment() {
        NavController navController = Navigation.findNavController(requireActivity()
                , R.id.fragmentContainerView);
        navController.navigate(R.id.action_menu_nav_calling_list_to_menu_nav_mycalling);//跳转到发射界面
    }

    /**
     * 菜单选项 
     *
     * @param item 菜单
     * @return 是否
     */
    //@RequiresApi(api = Build.VERSION_CODES.N)
    @Override
    public boolean onContextItemSelected(@NonNull MenuItem item) {
        //Ft8Message ft8Message = (Ft8Message) item.getActionView().getTag();
        int position = (int) item.getActionView().getTag();
        Ft8Message ft8Message = callingListAdapter.getMessageByPosition(position);
        if (ft8Message == null) return super.onContextItemSelected(item);
        
		int otherSeq;
		
        switch (item.getItemId()) {
            case 0: //关注
				//ToastMessage.show("Case 0");
                Log.d(TAG, "关注：" + ft8Message.getCallsignTo());
                mainViewModel.addFollowCallsign(ft8Message.getCallsignTo());
                GeneralVariables.transmitMessages.add(ft8Message);//把消息添加到关注列表中
                break;
            case 1://时序与发送者相反！！！
				//ToastMessage.show("Case 1");
                Log.d(TAG, "呼叫：" + ft8Message.getCallsignTo());
				//if(GeneralVariables.autoAddFollow){ //要求自動儲存
				//	mainViewModel.addFollowCallsign(ft8Message.getCallsignTo());
				//} BV6LC 調整作法	
                if (!mainViewModel.ft8TransmitSignal.isActivated()) {
                    mainViewModel.ft8TransmitSignal.setActivated(true);
                    GeneralVariables.transmitMessages.add(ft8Message);//把消息添加到关注列表中
                    GeneralVariables.resetLaunchSupervision();//复位自动监管
                }
				/*
                //呼叫被呼叫对象
                mainViewModel.ft8TransmitSignal.setTransmit(ft8Message.getToCallTransmitCallsign()
                        , 1, ft8Message.extraInfo);
                mainViewModel.ft8TransmitSignal.transmitNow();
				*/
				otherSeq = (ft8Message.getSequence()+1 ) % 2; // ✅ 對方的 slot
				
				mainViewModel.ft8TransmitSignal.callToCallSign(
					ft8Message.getCallsignTo(),
					otherSeq,
					true,  // 我方要用對側（= 對方的另一側）
					ft8Message.snr,
					ft8Message.freq_hz
				);		
				
				mainViewModel.ft8TransmitSignal.transmitNow();
				mainViewModel.ft8TransmitSignal.setActivated(true);

                navigateToMyCallFragment();//跳转到发射界面
                break;
            case 2:
                Log.d(TAG, "关注：" + ft8Message.getCallsignFrom());
                mainViewModel.addFollowCallsign(ft8Message.getCallsignFrom());
                GeneralVariables.transmitMessages.add(ft8Message);//把消息添加到关注列表中
                break;
            case 3:
				//ToastMessage.show("Case 3");
                Log.d(TAG, "呼叫：" + ft8Message.getCallsignFrom());
                //doCallNow(ft8Message);
				
				otherSeq = (ft8Message.getSequence() ) % 2; // ✅ 對方的 slot
				
				mainViewModel.ft8TransmitSignal.callToCallSign(
					ft8Message.getCallsignFrom(),
					otherSeq,
					true , // 我方要用對側（= 對方的另一側）
					ft8Message.snr,
					ft8Message.freq_hz
				);		
				
				mainViewModel.ft8TransmitSignal.transmitNow();
				mainViewModel.ft8TransmitSignal.setActivated(true);
				navigateToMyCallFragment();//跳转到发射界面
				
				
                break;

            case 4://回复
                Log.d(TAG, "回复：" + ft8Message.getCallsignFrom());
				//if(GeneralVariables.autoAddFollow){ //要求自動儲存
				//	mainViewModel.addFollowCallsign(ft8Message.getCallsignFrom());
				//} BV6LC調整作法
                if (!mainViewModel.ft8TransmitSignal.isActivated()) {
                    mainViewModel.ft8TransmitSignal.setActivated(true);
                    GeneralVariables.transmitMessages.add(ft8Message);//把消息添加到关注列表中
                }
                //呼叫发启者
                mainViewModel.ft8TransmitSignal.setTransmit(ft8Message.getFromCallTransmitCallsign()
                        , -1, ft8Message.extraInfo);
                mainViewModel.ft8TransmitSignal.transmitNow();
                GeneralVariables.resetLaunchSupervision();//复位自动监管
                navigateToMyCallFragment();//跳转到发射界面
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

        return super.onContextItemSelected(item);
    }

    /**
     * 显示QRZ查询界面
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

    @Override
    public void onCreateOptionsMenu(@NonNull Menu menu, @NonNull MenuInflater inflater) {
        super.onCreateOptionsMenu(menu, inflater);
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
		
		
		// 1. 解除 RecyclerView 的 Adapter 綁定，避免 Context 泄漏
		if (callListRecyclerView != null) {
			callListRecyclerView.setAdapter(null);
		}

		callListRecyclerView.setLayoutManager(null);
		
		if (itemTouchHelper != null) {
			itemTouchHelper.attachToRecyclerView(null);
			itemTouchHelper = null;
		}		
		
		// 清除 全部 LiveData Observer —— 
		mainViewModel.mutable_Decoded_Counter.removeObservers(getViewLifecycleOwner());
		mainViewModel.mutableFt8MessageList.removeObservers(getViewLifecycleOwner());
		mainViewModel.timerSec.removeObservers(getViewLifecycleOwner());
		mainViewModel.mutableTimerOffset.removeObservers(getViewLifecycleOwner());
		mainViewModel.mutableIsRecording.removeObservers(getViewLifecycleOwner());
		mainViewModel.mutableIsDecoding.removeObservers(getViewLifecycleOwner());
		
		
		if (mainViewModel.ft8SignalListener != null
			&& mainViewModel.getDecodeDurationMs() != null) {
				//mainViewModel.ft8SignalListener.decodeTimeSec.removeObservers(getViewLifecycleOwner());
				mainViewModel.getDecodeDurationMs().removeObservers(getViewLifecycleOwner());
				
				
			}
		
		GeneralVariables.mutableMyMaidenheadGrid.removeObservers(getViewLifecycleOwner());


		// 3. 其它：ContextMenu、listener、binding 置空  
		requireActivity().unregisterForContextMenu(callListRecyclerView);
		callListRecyclerView = null;
		previousMessageList.clear();
		binding.timerImageButton.clearAnimation();
		
		

		// 釋放 CallingListAdapter
		if (callingListAdapter != null) {
			callingListAdapter.release();
			callingListAdapter = null;
		}
		
		binding.timerImageButton.setOnClickListener(null);
		binding.clearCallingListImageButton.setOnClickListener(null);
		binding.callingListToolsBar.setOnClickListener(null);
				

		if (binding != null && binding.spectrumView != null) {
			binding.spectrumView.stop();
		}
		spectrumStarted = false;

		// 5. 最後釋放 binding
		
		
		binding = null;
    }
	
	//  迴圈走訪所有子 View，關閉單一 View 的 saveEnabled
	private void disableSaveStateRecursive(ViewGroup vg) {
		for (int i = 0; i < vg.getChildCount(); i++) {
			View v = vg.getChildAt(i);
			v.setSaveEnabled(false);
			if (v instanceof ViewGroup) {
				disableSaveStateRecursive((ViewGroup) v);
			}
		}
	}
	
	
	
	

	
	
	
	private void startSpectrumIfReady() {
		if (spectrumStarted) return;

		if (!isAdded() || binding == null || binding.spectrumView == null) return;

		// ② 等「Guideline 造成的 layout 完成」
		binding.spectrumView.post(() -> {

			if (binding == null || spectrumStarted) return;

			int w = binding.spectrumView.getWidth();
			int h = binding.spectrumView.getHeight();

			if (w <= 0 || h <= 0) {
				// ✅ layout 還沒好 → 延遲重試
				Log.w(TAG, "spectrum view size=0, retry in 100ms");
				binding.spectrumView.postDelayed(() -> startSpectrumIfReady(), 100);
				return;
			}

			Log.d(TAG, "start spectrum safely w=" + w + " h=" + h);
			spectrumStarted = true; // ✅ 關鍵
			binding.spectrumView.run(
				mainViewModel,
				this,
				binding.spectrumView.getRenderOptions()
			);
		});
	}	
	
	
	
	
}