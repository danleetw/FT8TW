package com.bg7yoz.ft8cn;
/**
 * FT8CN程序的主Activity。本APP采用Fragment框架实现，每个Fragment实现不同的功能。
 * ----2022.5.6-----
 * 主要完成以下功能：
 * 1.生成MainViewModel实例。MainViewModel是用于整个生存周期，用于录音、解析等功能。
 * 2.录音、存储的权限申请。
 * 3.实现Fragment的导航管理。
 * 4.USB串口连接后的提示
 * @author BG7YOZ
 * @date 2022.5.6
 * -----2025.6.2
 * 1.增加USB裝置插入後更新清單
 */


import android.animation.Animator;
import android.animation.AnimatorSet;
import android.animation.ObjectAnimator;
import android.app.AlertDialog;


import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.media.AudioManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.WindowManager;
import android.view.animation.AnimationUtils;
import android.widget.TextView;
import android.widget.Toast;

import android.content.Context;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;

import androidx.lifecycle.Observer;
import androidx.navigation.NavController;
import androidx.navigation.fragment.NavHostFragment;
import androidx.navigation.ui.NavigationUI;




import android.util.Log;

import com.bg7yoz.ft8cn.bluetooth.BluetoothStateBroadcastReceive;
import com.bg7yoz.ft8cn.callsign.CallsignDatabase;
import com.bg7yoz.ft8cn.connector.CableSerialPort;
import com.bg7yoz.ft8cn.connector.ConnectMode;
import com.bg7yoz.ft8cn.database.ControlMode;

import com.bg7yoz.ft8cn.database.DatabaseOpr;
import com.bg7yoz.ft8cn.database.OnAfterQueryConfig;
import com.bg7yoz.ft8cn.database.OperationBand;
import com.bg7yoz.ft8cn.databinding.MainActivityBinding;
import com.bg7yoz.ft8cn.floatview.FloatView;
import com.bg7yoz.ft8cn.floatview.FloatViewButton;
import com.bg7yoz.ft8cn.grid_tracker.GridTrackerMainActivity;
import com.bg7yoz.ft8cn.log.ImportSharedLogs;
import com.bg7yoz.ft8cn.log.OnShareLogEvents;
import com.bg7yoz.ft8cn.maidenhead.MaidenheadGrid;
import com.bg7yoz.ft8cn.timer.UtcTimer;
import com.bg7yoz.ft8cn.ui.FreqDialog;
import com.bg7yoz.ft8cn.ui.SetVolumeDialog;
import com.bg7yoz.ft8cn.ui.ShareLogsProgressDialog;

import com.bg7yoz.ft8cn.ui.ToastMessage;
import com.bg7yoz.ft8cn.ui.ErrorActivity;

import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.io.IOException;
import java.io.File;
import java.io.FileOutputStream;
import java.io.BufferedReader;
import java.io.FileReader;


import java.util.ArrayList;


import androidx.lifecycle.ViewModelProvider;

import java.io.StringWriter;
import java.io.PrintWriter;


import android.hardware.usb.UsbDevice;
import android.hardware.usb.UsbManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.app.AlarmManager;



import androidx.core.view.WindowCompat;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.graphics.Insets;

import android.view.Window;

import android.util.TypedValue;       // 新增：dp->px 轉換
import android.view.ViewGroup;        // 新增：MarginLayoutParams

import android.widget.FrameLayout;
import android.view.Gravity;

import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.constraintlayout.widget.ConstraintLayout.LayoutParams;

import android.content.res.ColorStateList;

import android.content.res.Configuration;

import androidx.core.view.WindowInsetsControllerCompat;


import java.lang.reflect.Field;

import android.os.Looper;
import android.os.Handler;

import android.view.ViewTreeObserver;

import android.content.pm.ActivityInfo;


import android.content.SharedPreferences;
import androidx.fragment.app.Fragment;

import com.bg7yoz.ft8cn.ui.ConfigFragment;



public class MainActivity extends AppCompatActivity {
	private Thread.UncaughtExceptionHandler defaultHandler;
	
	
    private BluetoothStateBroadcastReceive mReceive;
	private static final String ACTION_USB_PERMISSION = "com.bg7yoz.ft8cn.USB_PERMISSION";
	private UsbManager usbManager;
	
	
    private static final String TAG = "MainActivity";
    private MainViewModel mainViewModel;
    private NavController navController;
    private static boolean animatorRunned = false;
    //private boolean animationEnd = false;

    private MainActivityBinding binding;
    private FloatView floatView;
	
	private ShareLogsProgressDialog dialog = null;//生成共享log的对话框
	private static Uri lastUri=null;
	
	
	private boolean isExitDialogShown = false; //防重入
	private boolean shouldHideFloatView = false; // 是否需要隱藏浮動視窗
	
	//private SseServer sseServer = new SseServer();
	//private SseServer sseServer;

	/*
	// 定義需要的授權
	private String[] permissions;
    List<String> mPermissionList = new ArrayList<>();
	*/
	
	
	// 取得授權
	private PermissionManager permissionManager;
	
	//private boolean firstInitFloat = true;
	
	
	private boolean audioPermissionGranted = false;
	private boolean mainProgramStarted = false;
	private boolean ft8ObserversBound = false;
	
	
	// 忽略第一次回呼
	private boolean debugObserverInitialized = false;
	
	// 2026/1/5 BV6LC
	/*
	@Override
	protected void onSaveInstanceState(@NonNull Bundle outState) {
		// ❌ 刻意不呼叫 super
		// 避免 Fragment / Navigation state 存進 Binder 造成 TransactionTooLargeException
	}*/



	// 使用者點選FT8TW的開始點
    @Override
    protected void onCreate(Bundle savedInstanceState) {
		LogExt.i(TAG, "onCreate 開始");
		
		
		 // ✅ 只有「不碰 View、不碰 Fragment」的東西可以放 super 之前
		initThemeAndAppearance();
		
		//initUiBootPhase();     // ⭐ 新的「第一區塊」 ，這裡之前絕對不能碰 ViewModel / Recorder / Timer ，到這裡為止，App 只是長得好看
		
		// ✅ 先保存系統原本的 handler
        defaultHandler = Thread.getDefaultUncaughtExceptionHandler();
		
		
		
		
		super.onCreate(savedInstanceState);
		
		   // ✅ 下面開始才可以碰 View / Fragment / NavController
		initViewBinding();
		initWindowInsets();
		initNavigation();
		initNavigationObservers();
		
		
		
		
		
		
		/* 恢復前一次的旋轉角度 */
		/*
		SharedPreferences prefs = getSharedPreferences("app_prefs", MODE_PRIVATE);
		int lastOrientation = prefs.getInt("last_orientation", Configuration.ORIENTATION_UNDEFINED);
		int currentOrientation = getResources().getConfiguration().orientation;

		// 僅第一次啟動時依照上次紀錄設定方向
		if (savedInstanceState == null && lastOrientation != Configuration.ORIENTATION_UNDEFINED) {
			if (lastOrientation == Configuration.ORIENTATION_LANDSCAPE &&
				currentOrientation != Configuration.ORIENTATION_LANDSCAPE) {
				setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
			} else if (lastOrientation == Configuration.ORIENTATION_PORTRAIT &&
					   currentOrientation != Configuration.ORIENTATION_PORTRAIT) {
				setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
			}
		}

		// 開放之後可依照感應器自動旋轉
		new Handler(Looper.getMainLooper()).postDelayed(() -> {
			setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_USER);
		}, 1500);
		*/
		// 強制切換成橫式
		//setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
		
		
		
		
		
		
		
		
		
		
		// 動態決定需要哪些權限
        //checkPermission();
		permissionManager = new PermissionManager(this);
		
		

        permissionManager.checkAndRequestPermissions(new PermissionManager.PermissionCallback() {
            @Override
				public void onPermissionGranted() {
					LogExt.e("BOOT", "onPermissionGranted()");
					audioPermissionGranted = true;
					
					
					if (mainProgramStarted) {
						LogExt.e("BOOT", "startMainProgram already started, skip");
						return;
					}
					mainProgramStarted = true;
					LogExt.e("BOOT", "onPermissionGranted()");
					
					// ⭐ 通知 ViewModel「錄音權限已就緒」
					//if (mainViewModel != null) {
					//	mainViewModel.onAudioPermissionGranted();
					//}
					
					
					
					audioPermissionGranted = true;
					
					
					startMainProgram();   // ⭐ 直接進
				}
			}
		);
		
		
		
	}
	

	
	
	/**
	 
		Phase 1.1 – Theme & Appearance Setup
		決定 App 外觀（深色 / 淺色 / 跟隨系統）
		必須在 setContentView() 之前
	 *
	 * ⚠️ 此方法只負責「外觀決策」
	 * ⚠️ 必須在 setContentView() 之前呼叫
	 * ⚠️ 不可觸碰 View / ViewModel / Recorder / Timer
	 */
	private void initThemeAndAppearance() {
		// ✅ 載入 darkMode 設定（例如從 SharedPreferences 或 SQLite）
		SharedPreferences prefs = getSharedPreferences("ft8tw_config", MODE_PRIVATE);
		// 0 = 跟隨系統, 1 = 強制淺色, 2 = 強制深色
		
		int darkMode = prefs.getInt("darkMode", 0);
		// 同步到全域狀態（僅限外觀）
		GeneralVariables.darkModeSetting = darkMode;
		
		// ⚠️ 這個 LiveData 只代表「外觀狀態」，此時還沒有 UI observer
		//GeneralVariables.mutableDarkModeSetting.postValue(darkMode);
		
		// 
		//GeneralVariables.darkModeSetting=1;
		switch (GeneralVariables.darkModeSetting) {
			case 1: // 強制淺色
				AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
				break;
			case 2: // 強制深色
				AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES);
				break;
			default: // 跟隨系統
				AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM);
				break;
		}
	}
	
	// ─────────────────────────────────────
	// Phase 1.2 – View Inflation & Binding 畫面載入與 View 綁定（Layout / ViewBinding）
	// 載入 layout、建立 ViewBinding
	// 設定 saveEnabled，避免 Fragment state 膨脹
	// ─────────────────────────────────────
	private void initViewBinding() {
		binding = MainActivityBinding.inflate(getLayoutInflater());
		setContentView(binding.getRoot());
		
		//2026/1/5 關閉系統自動儲存 Fragment / Nav 狀態 避免記憶體超用
		binding.fragmentContainerView.setSaveEnabled(false);
		binding.navView.setSaveEnabled(false);
		binding.getRoot().setSaveEnabled(false);
		//------------------------------------------
		
		// ✅ 保險：一進來先把 debug 畫面關掉
		binding.debugLayout.setVisibility(View.GONE);
		binding.debugMessageTextView.setText("");
		
	}
	
	// ─────────────────────────────────────
	// Phase 1.3 – Window Insets & Safe Area 系統視窗安全區處理（Insets / Cutout / Edge-to-Edge）
	// 處理 status bar / navigation bar / cutout
	// 建立 edge-to-edge UI 基礎
	// ─────────────────────────────────────
	private void initWindowInsets() {
		Window window = getWindow();
		WindowCompat.setDecorFitsSystemWindows(window, false);
		
		// 2. 設定 layoutInDisplayCutoutMode = ALWAYS，確保內容可延伸到缺口（notch）
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
			WindowManager.LayoutParams lp = window.getAttributes();
			lp.layoutInDisplayCutoutMode =
				//WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
				WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_NEVER;
			window.setAttributes(lp);
		}
		
		
		// 1. container 只留顶部 inset
		ViewCompat.setOnApplyWindowInsetsListener(binding.container, (v, insets) -> {
			// SDK35+ 要把 displayCutout 也算进来，否则顶 inset 少了刘海高度
			int mask = WindowInsetsCompat.Type.statusBars();
			if (Build.VERSION.SDK_INT >= 35) {
				mask |= WindowInsetsCompat.Type.displayCutout();
			}
			Insets topInset = insets.getInsets(mask);
			v.setPadding(topInset.left, topInset.top, topInset.right, 0);
			return insets;
		});	
		
		
		// 确保状态栏可见
		WindowInsetsControllerCompat ic = WindowCompat.getInsetsController(window, binding.getRoot());
		ic.show(WindowInsetsCompat.Type.statusBars());
		ic.setSystemBarsBehavior(
			WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
		);
		
		
		//禁止休眠/保持螢幕常亮
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON
                , WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        //super.onCreate(savedInstanceState);
		
		
	}
	
	/**
	 * Phase 1.4 – Navigation Skeleton Setup
	 *
	 * 只負責建立 NavController 與 BottomNavigationView 的關聯
	 * 不包含任何畫面行為邏輯
	 */
	
	private void initNavigation() {
		//用于Fragment的导航。
        NavHostFragment navHostFragment = (NavHostFragment) getSupportFragmentManager().findFragmentById(R.id.fragmentContainerView);
        
		
		//assert navHostFragment != null;//断言不为空
		if (navHostFragment == null) {
			throw new IllegalStateException(
				"NavHostFragment not found. " +
				"Did you forget to set fragmentContainerView in activity_main?"
			);
		}
		
		
		
		
        navController = navHostFragment.getNavController();

        NavigationUI.setupWithNavController(binding.navView, navController);
		
		
		//此处增加回调是因为当APP主动navigation后，无法回到解码的界面
        binding.navView.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                //Log.e(TAG, "onNavigationItemSelected: "+item.toString() );
                navController.navigate(item.getItemId());
                //binding.navView.setLabelFor(item.getItemId());
                return true;
            }
        });
		
		
	}
	
	private boolean isFloatViewReady() {
		return floatView != null;
	}
	
	private void initNavigationObservers() {
		if (navController == null) return;
		
		// 添加導航目的地變化監聽
		navController.addOnDestinationChangedListener((controller, destination, arguments) -> {
			
			if (floatView == null) return; // 更直接
			
			int destinationId = destination.getId();
			
			boolean isConfigPage =
            (destinationId == R.id.menu_nav_config || destinationId == R.id.menu_nav_history);
			
			
			shouldHideFloatView = isConfigPage;
			
			floatView.setVisibility(shouldHideFloatView  ? View.GONE : View.VISIBLE);
			
			// ⭐ 第一次啟動時不要隱藏 FloatView（讓動畫之後的顯示生效）
			//if (!firstInitFloat) {
			//if (!firstInitFloat && isFloatViewReady()) {	
			//	if (isConfigPage) {
			//		floatView.setVisibility(View.GONE);
			//	} else {
			//		floatView.setVisibility(View.VISIBLE);
			//	}
			//}

			// ⭐ 動畫結束後下一個 page 才開始正常 hide/show
			//firstInitFloat = false;
			
		});		
		
		
	}
	
	
	
		
	private void startMainProgram() {
		
		LogExt.e("BOOT", ">>> startMainProgram() ENTER <<<");
		
		 // ✅ 先清空，避免前一次殘留訊息或早期 init 時打的 debug 直接跳出來
		LogExt.e("BOOT", "1) clear debug");
		GeneralVariables.mutableDebugMessage.postValue("");
		
		LogExt.e("BOOT", "2) initRuntimeEnvironment");
		initRuntimeEnvironment(); 	// 初始化 App 作為「一個 Process」的執行環境
		
		LogExt.e("BOOT", "3) initSystemServices");
		initSystemServices(); 		// 初始化與 Android System Service 相關的元件。
		
		LogExt.e("BOOT", "4) initViewModelAndCore");
		initViewModelAndCore();   	// 建立並初始化 App 的核心邏輯層 ← mainViewModel 在這裡建立
		
		LogExt.e("BOOT", "5) initUiObservers");
		initUiObservers(); //將「資料狀態」繫結到「畫面反應」
		
		LogExt.e("BOOT", "6) initDataLoading");
		initDataLoading();     // 原 InitData()
		
		LogExt.e("BOOT", "7) initUiBehaviors");
		initUiBehaviors();     // FloatView / Animation / Insets (殘留)
		
		LogExt.e("BOOT", "8) initTimeSync");
		initTimeSync();        // GPS / NTP


		LogExt.e("BOOT", "9) initUiInsetsForContent");
		initUiInsetsForContent();
		
		
		LogExt.e("BOOT", ">>> startMainProgram() DONE <<<");
					
		// 3. BottomNavigationView 单独再监听一次，把底部 inset 应用到它身上
		ViewCompat.setOnApplyWindowInsetsListener(binding.navView, (v, insets) -> {
			Insets nav = insets.getInsets(WindowInsetsCompat.Type.navigationBars());
			v.setPadding(0, 0, 0, nav.bottom);
			return insets;
		});
															

		
		
        if (mainViewModel.isBTConnected()) {
            //mainViewModel.setBlueToothOn(); // BV6LC 這邊會造成翻轉螢幕時重新藍牙連線造成錯誤
        }
        
		initDebugUiBehavior();
        

		initWelcomeUi();
        
		initFloatingUi();
		
		
        

        //观察是不是flex radio
        mainViewModel.mutableIsFlexRadio.observe(this, new Observer<Boolean>() {
            @Override
            public void onChanged(Boolean aBoolean) {
                if (aBoolean) {
                    //添加flex配置按钮
                    floatView.addButton(R.id.flex_radio, "flex_radio", R.drawable.flex_icon
                            , new View.OnClickListener() {
                                @Override
                                public void onClick(View view) {
                                    navController.navigate(R.id.flexRadioInfoFragment);
                                }
                            });
                } else {//删除flex配置按钮
                    floatView.deleteButtonByName("flex_radio");
                }
            }
        });

        //观察是不是xiegu radio
        mainViewModel.mutableIsXieguRadio.observe(this, new Observer<Boolean>() {
            @Override
            public void onChanged(Boolean aBoolean) {
                if (aBoolean) {
                    //添加xiegu配置按钮
                    floatView.addButton(R.id.xiegu_radio, "xiegu_radio", R.drawable.xiegulogo32
                            , new View.OnClickListener() {
                                @Override
                                public void onClick(View view) {
                                    navController.navigate(R.id.xieguInfoFragment);
                                }
                            });
                } else {//删除xiegu配置按钮
                    floatView.deleteButtonByName("xiegu_radio");
                }
            }
        });

        //关闭串口设备列表按钮
        binding.closeSelectSerialPortImageView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                binding.selectSerialPortLayout.setVisibility(View.GONE);
            }
        });

        //观察串口设备列表的变化
        mainViewModel.mutableSerialPorts.observe(this, new Observer<ArrayList<CableSerialPort.SerialPort>>() {
            @Override
            public void onChanged(ArrayList<CableSerialPort.SerialPort> serialPorts) {
				// 只有CAT &USB_CABLE時才讓使用者選擇
				if ( GeneralVariables.controlMode == ControlMode.CAT && 
						GeneralVariables.connectMode == ConnectMode.USB_CABLE) {
					Log.d(TAG, "setSelectUsbDevice------A !!!! "+GeneralVariables.btListen);	
					// 當 USB 裝置清單變更時重設 Dialog flag
					if(!GeneralVariables.btListen)
						{
						//GeneralVariables.hasShownUsbSelectDialog = false;	
						setSelectUsbDevice();						
						}
					
						
				} else {
					Log.d(TAG, "ConnectMode != USB_CABLE，忽略更新設備清單");
				}
            }
        });
		
		mainViewModel.getUsbDeviceRefreshEvent().observe(this, event -> {
			if (event) {
				ToastMessage.show("Event");
				setSelectUsbDevice();
				Log.d(TAG, "setSelectUsbDevice------B");	
			}
		});
				
        //列USB设备列表
        mainViewModel.getUsbDevice();

        //设置发射消息框的动画
        binding.transmittingMessageTextView.setAnimation(AnimationUtils.loadAnimation(this
                , R.anim.view_blink));
        

        
				
		
		//判断导入共享log文件的工作线程还在，如果在，就显示对话框
        if (Boolean.TRUE.equals(mainViewModel.mutableImportShareRunning.getValue())) {
            showShareDialog();
        }else {
            //读取共享的文件
			//Intent intent = getIntent();
			//if (intent != null && Intent.ACTION_VIEW.equals(intent.getAction())) {
			//	LogExt.d("FT8TW", "MIME=" + intent.getType() + " URI=" + intent.getData());
			//}
            doReceiveShareFile(getIntent());
        }

		

		
		if(!GeneralVariables.timeSynced){ // 避免螢幕翻轉時一直同步
			new Handler(Looper.getMainLooper()).postDelayed(() -> {
				mainViewModel.syncTimeWithGpsOrNetwork(
					this,      // context
					this,      // activity
					() -> LogExt.i("MainActivity", "✅ 時間同步完成"),
					err -> LogExt.e("MainActivity", "❌ 時間同步失敗: " + err)
				);
			}, 3000); // 延遲 2 秒執行
			GeneralVariables.timeSynced=true;
		}
		
		

		
		
		GeneralVariables.mutableDarkModeSetting.observe(this, new Observer<Integer>() {
			@Override
			public void onChanged(Integer mode) {
				Log.d(TAG, "🌗 DarkMode 改變為: " + mode);
				
				
				//Fragment currentFragment = getSupportFragmentManager().findFragmentById(R.id.fragmentContainerView);
				//boolean isInConfigFragment = currentFragment instanceof ConfigFragment;
				Fragment navHost =
					getSupportFragmentManager().findFragmentById(R.id.fragmentContainerView);

				Fragment current = null;
				if (navHost instanceof NavHostFragment) {
					current = ((NavHostFragment) navHost)
						.getChildFragmentManager()
						.getPrimaryNavigationFragment();
				}

				boolean isInConfigFragment = current instanceof ConfigFragment;
				
				
				
				
				
				
				

				// 等待畫面重新 layout 後重新定位浮窗
				if (floatView != null) {
					floatView.postDelayed(() -> {
						floatView.initLocation(floatView.getFloatBoard());
						// ✅ 如果不是在 ConfigFragment，才顯示浮窗  !floatView.isShown()
						/*
						if (!isInConfigFragment ) {
							//floatView.show();
							floatView.setVisibility(View.VISIBLE);
						}	
						else{
							floatView.setVisibility(View.GONE);
						}*/
						
						
					}, 300); // 延遲一點，確保畫面重建完畢
					
					
					
				}
			}
		});
		
		
		
		
		
    }
	
	
	//// initRuntimeEnvironment Remark:
	// 初始化 App 作為「一個 Process」的執行環境。
	// 僅處理全域、一次性、與 UI / ViewModel 無關的設定，
	// 包含：Log / Crash Handler / SSE Server / 系統旗標（KEEP_SCREEN_ON）。
	// ✔ 可以 Log / Crash handler SSE server 系統 flag（KEEP_SCREEN_ON） 全域 Context / Locale / Region
	// ❌ 不操作 View、不建立 ViewModel、不註冊 Observer。
	//// 只要碰 Window / Insets / DecorView，一律不屬於 RuntimeEnvironment
	
	private void initRuntimeEnvironment(){
		
		// 初始化 Log
		GeneralVariables.initLogFile(getApplicationContext()); //開啟記錄檔
		
		
		// 啟動 SSE
		//sseServer = new SseServer(7051); 
		if (GeneralVariables.sseServer == null) {
			GeneralVariables.sseServer = new SseServer(7051);
		}
		
		
		// 設置全局Debug處理器 / 設定全域 Crash Handler
        Thread.setDefaultUncaughtExceptionHandler((thread, throwable) -> {
			// 嘗試找問題

			try {
				// 最小成本組字串
				StringWriter sw = new StringWriter();
				throwable.printStackTrace(new PrintWriter(sw));
				String stack = sw.toString();

				// 只做 append（不要 read）
				GeneralVariables.writeErrorLog(
					AppContext.getContext(),
					"\n" + System.currentTimeMillis() + "\n" + stack
				);

				// 只啟動一次 ErrorActivity
				Intent intent = new Intent(
					AppContext.getContext(),
					ErrorActivity.class
				);
				intent.putExtra(
					"error_log_path",
					new File(
						AppContext.getContext().getFilesDir(),
						"ft8tw_log.txt"
					).getAbsolutePath()
				);
				intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
				AppContext.getContext().startActivity(intent);

			} catch (Throwable ignored) {
				// 絕對不要再丟例外
			}

			// 4️⃣ 立刻結束（不要 postDelayed）
			android.os.Process.killProcess(android.os.Process.myPid());
			System.exit(10);
			
			// 準備關閉無線電
			//if (mainViewModel != null && mainViewModel.ft8TransmitSignal != null) {
			//	// 關閉 PTT 發射
			//	//mainViewModel.ft8TransmitSignal.setActivated(false);
			//}
			//GeneralVariables.sendToSSE("Close PTT!!!");
			
			
			

			try {
				// 讀取完整 log file（包含歷史紀錄）
				String fullLog = GeneralVariables.readErrorLog(AppContext.getContext());
				
				//String filePath = AppContext.getContext().getFilesDir() + "ft8tw_log.txt";
				File f = new File(AppContext.getContext().getFilesDir(), "ft8tw_log.txt");
				String filePath = f.getAbsolutePath();

				// 寫入 log 到檔案
				FileOutputStream fos = null;
				try {
					fos = new FileOutputStream(filePath);
					fos.write(fullLog.getBytes());
				} catch (IOException e) {
					Log.e(TAG, "寫入錯誤日誌失敗：" + e.getMessage());
				} finally {
					if (fos != null) {
						try {
							fos.close();
						} catch (IOException e) {
							// 忽略關閉失敗
						}
					}
				}

				// 傳檔案路徑給 ErrorActivity
				Intent intent = new Intent(AppContext.getContext(), ErrorActivity.class);
				intent.putExtra("error_log_path", filePath);  // ✅ 只傳路徑
				intent.putExtra("error_title", AppContext.getContext().getString(R.string.error_title));
				//intent.putExtra("error_message", fullLog /* 或者 throwable.toString() */);
				intent.putExtra("debug", "0");
				intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
				AppContext.getContext().startActivity(intent);
			} catch (Throwable t) {
				// 如果啟動 ErrorActivity 又失敗，則直接結束程式
			}
			
			




            // 結束當前應用以避免卡死
            //System.exit(1);
			
			// 啟動 ErrorActivity 之後，不要立刻殺 process
			Handler handler = new Handler(Looper.getMainLooper());
			handler.postDelayed(() -> {
				// 確保 ErrorActivity 已顯示完成
				android.os.Process.killProcess(android.os.Process.myPid());
				System.exit(1);
			}, 300); // ⭐ 300ms 是實務上很安全的值
			
			
			
			
			
			//finishAffinity();   // 結束所有 Activity
			//android.os.Process.killProcess(android.os.Process.myPid());
			
        });
		
		
		
		
		//全屏
        //getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN
        //        , WindowManager.LayoutParams.FLAG_FULLSCREEN);

        
		
        
		
		/*
		// 模擬異常(當機) // 暫停 12秒
	   new Handler(Looper.getMainLooper()).postDelayed(() -> {
			   throw new RuntimeException("Test crash");
	   }, 12 * 1000);
		*/
		
		
		
		// 模擬異常(當機)
		/*if(Build.VERSION.SDK_INT>0){
			try {
					Thread.sleep(72 * 1000); // 暫停 1分12秒
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
						
			throw new RuntimeException("Test crash");
		}*/
		
		
		//全域 Context / 地區設定
		GeneralVariables.getInstance().setMainContext(getApplicationContext());
        //判断是不是简体中文
        GeneralVariables.isTraditionalChinese =
                getResources().getConfiguration().locale.getDisplayCountry().equals("中國");
        //确定是不是中国、香港、澳门、台湾
        GeneralVariables.isChina = (getResources().getConfiguration().locale
                .getLanguage().toUpperCase().startsWith("ZH"));
		
		

		
		
	}
	
	    
	// initSystemServices() Remark: 初始化與 Android System Service 相關的元件。
	// 初始化與 Android System Service 相關的元件。
	// 包含：USB / Bluetooth / BroadcastReceiver / Permission 後資源。
	// 僅負責「取得與註冊」，不啟動業務流程、不更新 UI。
	// ❌ 不 observe LiveData、不操作 Fragment。
	private void initSystemServices(){
		
		
		usbManager = (UsbManager) getApplicationContext().getSystemService(Context.USB_SERVICE);

		IntentFilter filter = new IntentFilter(ACTION_USB_PERMISSION);
		
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
			registerReceiver(usbReceiver, filter, Context.RECEIVER_NOT_EXPORTED);
		} else {
			registerReceiver(usbReceiver, filter);
		}
		
		
		
		GeneralVariables.setConnetMode(GeneralVariables.connectMode);
		if( GeneralVariables.controlMode == ControlMode.CAT && 
			GeneralVariables.connectMode == ConnectMode.BLUE_TOOTH) {
			registerBluetoothReceiver();//注册蓝牙动作改变的广播 (BV6LC 2025/1/5 修改
		}
		
		
		//观察Connect Mode改變
        GeneralVariables.mutableconnectMode.observe(this, new Observer<Integer>() {
            @Override
            public void onChanged(Integer s) {
				
                if (GeneralVariables.controlMode == ControlMode.CAT && s==ConnectMode.BLUE_TOOTH) { // 如果設定為藍芽模式才監控
                    registerBluetoothReceiver();
                } else {
                    unregisterBluetoothReceiver();
                }
				
				// 動態偵測 USB 裝置邏輯 BV6LC
				//if (GeneralVariables.controlMode == ControlMode.CAT && s == ConnectMode.USB_CABLE) {
				//	GeneralVariables.hasShownUsbSelectDialog = false;
				//	Log.d(TAG, "切換為 CAT+USB_CABLE，重置USB選擇對話框狀態");
				//}
				
				
				//if (s == ConnectMode.USB_CABLE) {
				//	mainViewModel.getUsbDevice();
				//}
				
				
            }
        });
		
		
		
		
	}
	
	
	// initViewModelAndCore Remark:建立並初始化 App 的核心邏輯層 ← mainViewModel 在這裡建立
	// 建立並初始化 App 的核心邏輯層。
	// 包含：MainViewModel、Timer、Recorder、FT8/FT4 核心物件。
	// 此階段後，App 的「資料與狀態」才正式開始存在。
	// ❌ 不直接操作 View、不設定 UI 行為。
	
	private void initViewModelAndCore(){
		
		mainViewModel = new ViewModelProvider(this).get(MainViewModel.class);
		MainViewModel.setMainInstance(mainViewModel); // 供 GridTrackerMainActivity 跨 Activity 共用
		
		
		observeCoreInitialized();   // ✅ 正確位置（ViewModel 已存在）
		
		
		if (audioPermissionGranted) {
			LogExt.e("BOOT", "deliver audioPermissionGranted to ViewModel");
			mainViewModel.onAudioPermissionGranted();
		}
		
	}
	
	
	// initUiObservers(); Remark:
	// 將「資料狀態」繫結到「畫面反應」。
	// 僅註冊 LiveData / Observable → UI 的 observer 與 click listener。
	// 負責畫面顯示、文字、顏色、可見性等同步。
	// ❌ 不初始化核心物件、不做系統資源存取。
	private void initUiObservers(){
		
		//观察DEBUG信息
        GeneralVariables.mutableDebugMessage.observe(this, new Observer<String>() {
			
			@Override
            public void onChanged(String s) {
				
				// ⭐ 忽略第一次（attach 時的舊值）
				if (!debugObserverInitialized) {
					debugObserverInitialized = true;
					return;
				}	
					
			
				
				
                if (s.length() > 1) {
                    binding.debugLayout.setVisibility(View.VISIBLE);
                } else {
                    binding.debugLayout.setVisibility(View.GONE);
                }
                binding.debugMessageTextView.setText(s);
            }
        });
		
		
		mainViewModel.mutableIsRecording.observe(this, new Observer<Boolean>() {
            @Override
            public void onChanged(Boolean aBoolean) {
                if (aBoolean) {
                    binding.utcProgressBar.setVisibility(View.VISIBLE);
                } else {
                    binding.utcProgressBar.setVisibility(View.GONE);
                }
            }
        });
		
		
		// 觀察FT4參數變化
		GeneralVariables.mutableIsFT4.observe(this, isFT4 -> {
		   int max = isFT4 ? 7500 : 15000;  // FT4 = 7.5s, FT8 = 15s
		   binding.utcProgressBar.setMax(max);
		   LogExt.d(TAG, "🚀🚀🚀🚀🚀---------------設定binding.utcProgressBar.setMax(max)-------------"+max +" "+isFT4);
		   
		   
			/*
		    // ✅ 防護：核心物件還沒準備好就不要動 timer
			if (mainViewModel == null) return;
			if (mainViewModel.ft8SignalListener == null) {
				LogExt.e("BOOT", "ft8SignalListener is null, skip restartTimer");
				return;
			}
			if (mainViewModel.ft8TransmitSignal == null) {
				LogExt.e("BOOT", "ft8TransmitSignal is null, skip restartTimer");
				return;
			}
		   
		   
		   
		   //OperationBand.getInstance(getApplicationContext(),isFT4);
		   mainViewModel.ft8SignalListener.restartTimer(); // 會自動重建 Timer 並依模式設定週期
		   mainViewModel.ft8TransmitSignal.restartTimer();
		   */
        });
		
		
		//观察时钟的变化，显示进度条
        mainViewModel.timerSec.observe(this, new Observer<Long>() {
            @Override
            public void onChanged(Long aLong) {
                if (mainViewModel.ft8TransmitSignal != null &&
						mainViewModel.ft8TransmitSignal.sequential == UtcTimer.getNowSequential()
                        && mainViewModel.ft8TransmitSignal.isActivated()) {
                    binding.utcProgressBar.setBackgroundColor(getColor(R.color.calling_list_isMyCall_color));
                } else {
                    binding.utcProgressBar.setBackgroundColor(getColor(R.color.progresss_bar_back_color));
					binding.utcProgressBar.setProgressTintList( ColorStateList.valueOf(0xFFFFFF00) ); // BV6LC 
                }
				
				int slotTimeMs = GeneralVariables.isFT4 ? 7500 : 15000;
				int progressMs = (int)(UtcTimer.getSystemTime() % slotTimeMs);
				binding.utcProgressBar.setProgress(progressMs);
				
                //binding.utcProgressBar.setProgress((int) ((aLong / 1000) % 15));
            }
        });
		
		
		
        //添加点击发射消息提示窗口点击关闭动作
        binding.transmittingLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                binding.transmittingLayout.setVisibility(View.GONE);
            }
        });
		
		/*
		//观察发射内容的变化
		if (mainViewModel.ft8TransmitSignal == null) {
			LogExt.e("BOOT", "ft8TransmitSignal is null in initUiObservers(), skip transmit observers");
		} else {
			mainViewModel.ft8TransmitSignal.mutableTransmittingMessage.observe(this,
					new Observer<String>() {
						@Override
						public void onChanged(String s) {
							binding.transmittingMessageTextView.setText(s);
						}
					});
					
					
			//观察发射的状态
			mainViewModel.ft8TransmitSignal.mutableIsTransmitting.observe(this,
                new Observer<Boolean>() {
                    @Override
                    public void onChanged(Boolean aBoolean) {
                        if (aBoolean) {
                            binding.transmittingLayout.setVisibility(View.VISIBLE);
                        } else {
                            binding.transmittingLayout.setVisibility(View.GONE);
                        }
                    }
                });				
					
		}			*/
					
				
		
		
		
	}
	
	
	
	private void initUiInsetsForContent(){
		// 2. fragmentContainerView 只留导航栏 inset（左右＋底部）
	    ViewCompat.setOnApplyWindowInsetsListener(binding.fragmentContainerView, (v, insets) -> {
		   Insets nav = insets.getInsets(WindowInsetsCompat.Type.navigationBars());
		   // nav.left/nav.right – 横屏时右侧（或部分机型左侧）的导航栏
		   // nav.bottom – 竖屏底部导航栏
		   //v.setPadding(nav.left, 0, nav.right, nav.bottom);
		   v.setPadding(nav.left, 0, nav.right, 0);
		   return insets;
	    });
	}
	
	
	private void initDebugUiBehavior(){
		binding.debugLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                binding.debugLayout.setVisibility(View.GONE);
            }
        });
	}	
	
	
	private void initWelcomeUi(){
		//FT8CN Ver %s\nBG7YOZ\n%s
			binding.welcomTextView.setText(String.format(getString(R.string.version_info)
					, GeneralVariables.VERSION, GeneralVariables.BUILD_DATE));
	}
	
	private void initFloatingUi(){
		
		if (floatView != null) return; // ⭐ 防止重建
		
		floatView = new FloatView(this, 32);
		floatView.setVisibility(View.GONE);
		
		// 2. 新增到 container（ConstraintLayout）
		binding.container.addView(floatView);
		
		//floatView.initLocation();
		floatView.setFloatBoard(FloatView.FLOAT_BOARD.RIGHT);
		
		
		// 等畫面 layout 完成後再初始化位置
		ViewTreeObserver.OnGlobalLayoutListener layoutListener = new ViewTreeObserver.OnGlobalLayoutListener() {
			@Override
			public void onGlobalLayout() {
				floatView.getViewTreeObserver().removeOnGlobalLayoutListener(this); // ✅ this 正確指向 listener 自己
				floatView.initLocation();
				//floatView.setVisibility(View.VISIBLE);
			}
		};
		
		//动态添加按钮，建议使用静态的ID，静态ID在VALUES/FLOAT_BUTTON_IDS.XML中设置
        floatView.addButton(R.id.float_nav, "float_nav", R.drawable.ic_baseline_fullscreen_24
                , new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        FloatViewButton button = floatView.getButtonByName("float_nav");
                        if (binding.navView.getVisibility() == View.VISIBLE) {
                            binding.navView.setVisibility(View.GONE);
                            if (button != null) {
                                button.setImageResource(R.drawable.ic_baseline_fullscreen_exit_24);
                            }
                        } else {
                            binding.navView.setVisibility(View.VISIBLE);
                            if (button != null) {
                                button.setImageResource(R.drawable.ic_baseline_fullscreen_24);
                            }
                        }
                    }
                });
				
				
        floatView.addButton(R.id.float_freq, "float_freq", R.drawable.ic_baseline_freq_24 // 調整頻率
                , new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        new FreqDialog(binding.container.getContext(), mainViewModel).show();
                    }
                });

        floatView.addButton(R.id.set_volume, "set_volume", R.drawable.ic_baseline_volume_up_24
                , new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        new SetVolumeDialog(binding.container.getContext(), mainViewModel).show();
                    }
                });
        //打开网格追踪
        floatView.addButton(R.id.grid_tracker, "grid_tracker", R.drawable.ic_baseline_grid_tracker_24
                , new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        Intent intent = new Intent(getApplicationContext(), GridTrackerMainActivity.class);
                        startActivity(intent);
                    }
                });

		floatView.getViewTreeObserver().addOnGlobalLayoutListener(layoutListener);
		// 初始化按鈕（只一次）
		floatView.setButtonBackgroundResourceId(R.drawable.float_button_style);
		//InitFloatView();
        
		floatView.setVisibility(shouldHideFloatView ? View.GONE : View.VISIBLE);
		
		
		
	}
	
	
	

	/**
     * 接收共享文件
     * @param intent intent
     */
    private void doReceiveShareFile(Intent intent) {
        Uri uri = (Uri) intent.getData();

        if (uri != null ) { 
			if (uri ==lastUri){
				Log.e(TAG,"!!!! 已導入。。。");
				return;
			} 
			lastUri=uri; // 紀錄為已經導入過 
            ImportSharedLogs importSharedLogs = null;
            //先显示导入log的对话框
            showShareDialog();
            try {

                importSharedLogs = new ImportSharedLogs(mainViewModel);
                Log.e(TAG,"开始导入。。。");
                mainViewModel.mutableImportShareRunning.setValue(true);
                importSharedLogs.doImport(getBaseContext().getContentResolver().openInputStream(uri)
                        ,new OnShareLogEvents() {
                    @Override
                    public void onPreparing(String info) {
                        mainViewModel.mutableShareInfo.postValue(info);
                    }

                    @Override
                    public void onShareStart(int count, String info) {
                        mainViewModel.mutableSharePosition.postValue(0);
                        mainViewModel.mutableShareInfo.postValue(info);
                        mainViewModel.mutableImportShareRunning.postValue(true);
                        mainViewModel.mutableShareCount.postValue(count);
                    }

                    @Override
                    public boolean onShareProgress(int count, int position, String info) {
                        mainViewModel.mutableSharePosition.postValue(position);
                        mainViewModel.mutableShareInfo.postValue(info);
                        mainViewModel.mutableShareCount.postValue(count);
                        return Boolean.TRUE.equals(mainViewModel.mutableImportShareRunning.getValue());
                    }

                    @Override
                    public void afterGet(int count, String info) {
                        mainViewModel.mutableShareInfo.postValue(info);
                        mainViewModel.mutableImportShareRunning.postValue(false);
                    }

                    @Override
                    public void onShareFailed(String info) {
                        mainViewModel.mutableShareInfo.postValue(info);
                    }
                });
            } catch (IOException e) {
                mainViewModel.mutableImportShareRunning.postValue(false);
                Log.e(TAG,String.format("错误：%s",e.getMessage()));
                ToastMessage.show(e.getMessage());
            }
        } else {
            Log.e(TAG, "读文件类型时，文件没有找到。");
        }
    }
	
	private void initUiBehaviors(){  // FloatView / Animation / Insets (殘留)
		binding.initDataLayout.setVisibility(View.VISIBLE);//显示LOG页面
		
		if (!animatorRunned) {
            animationImage();
            animatorRunned = true;
        } else {
            binding.initDataLayout.setVisibility(View.GONE);

            //InitFloatView();
        }
		
	}
	
	private void initDataLoading(){  // 原 InitData()
	
	    if (mainViewModel.configIsLoaded) return;//如果数据已经读取一遍了，就不用再读取了。

        //读取波段数据
        if (mainViewModel.operationBand == null) {
            mainViewModel.operationBand = OperationBand.getInstance(getBaseContext(),GeneralVariables.isFT4);
        }

        mainViewModel.databaseOpr.getQslDxccToMap();

		// 測試設定為ft4
		//mainViewModel.databaseOpr.writeConfig("ft4ft8Mode", "0", null);
		

        //获取所有的配置参数
        mainViewModel.databaseOpr.getAllConfigParameter(new OnAfterQueryConfig() {
            @Override
            public void doOnBeforeQueryConfig(String KeyName) {

            }

            @Override
            public void doOnAfterQueryConfig(String KeyName, String Value) {
                
				// 
				mainViewModel.notifyConfigLoaded();
				
				
                //此处梅登海德已经通过数据库得到了，但是如果GPS能获取到，还是用GPS的
                String grid = MaidenheadGrid.getMyMaidenheadGrid(getApplicationContext());
				// 依照設定精準度
				grid=grid.substring(0, Math.min( (GeneralVariables.gpsPrecision*2+4),
																				grid.length() )
														);
				
                if (!grid.equals("")) {//说明获取到了GPS数据
                    GeneralVariables.setMyMaidenheadGrid(grid);
                    //写到数据库中
                    mainViewModel.databaseOpr.writeConfig("grid", grid, null);
                }


				if (mainViewModel.ft8TransmitSignal == null) {
					LogExt.e("BOOT", "ft8TransmitSignal is null, skip setTimer_sec");
					return;
				}
                mainViewModel.ft8TransmitSignal.setTimer_sec(GeneralVariables.transmitDelay);
				
				
                //如果呼号、网格为空，就进入设置界面
                if (GeneralVariables.getMyMaidenheadGrid().equals("")
                        || GeneralVariables.myCallsign.equals("")) {
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {//导航到设置页面
                            navController.navigate(R.id.menu_nav_config);
                        }
                    });
                }
				
				// 依照最新的 GeneralVariables.isFT4 重新載入頻道清單
				OperationBand.clearInstance();  // 清掉舊單例
				mainViewModel.operationBand = OperationBand.getInstance(getBaseContext(), GeneralVariables.isFT4);
				
				
				
            }
        });

        //把历史中通联成功的呼号与网格的对应关系
        new DatabaseOpr.GetCallsignMapGrid(mainViewModel.databaseOpr.getDb()).execute();

        mainViewModel.getFollowCallsignsFromDataBase();
        //打开呼号位置信息的数据库，目前是以内存数据库方式。
        if (GeneralVariables.callsignDatabase == null) {
            GeneralVariables.callsignDatabase = CallsignDatabase.getInstance(getBaseContext(), null, 1);
        }
		
		//if (floatView != null)
		//	floatView.post(() -> floatView.setVisibility(View.VISIBLE));
	
	
	}
	
	private void initTimeSync(){	// GPS / NTP
	}
	
	
    /**
     * 显示生成log的对话框
     */
    private void showShareDialog() {
        dialog = new ShareLogsProgressDialog(
                //binding.getRoot().getContext()
				this
                , mainViewModel,true);

        dialog.show();
        mainViewModel.mutableSharePosition.postValue(0);
        mainViewModel.mutableShareInfo.postValue("");
        mainViewModel.mutableShareCount.postValue(0);
    }
	
	
	
	/*
	// 動態定義權限清單
	private void definePermissions() {
			List<String> permissionList = new ArrayList<>();

			permissionList.add(Manifest.permission.RECORD_AUDIO);			 // 錄音權限
			permissionList.add(Manifest.permission.ACCESS_FINE_LOCATION);	// GPS精確定位
			permissionList.add(Manifest.permission.ACCESS_COARSE_LOCATION);	// 粗略定位
			permissionList.add(Manifest.permission.MODIFY_AUDIO_SETTINGS); 	// 修改音訊設定 // 這些不需要 runtime grant
			permissionList.add(Manifest.permission.WAKE_LOCK); 				// 防止休眠 // 這些不需要 runtime grant

			if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {  			// Android 12+
				permissionList.add(Manifest.permission.BLUETOOTH_CONNECT);	// 藍牙連線權限
				permissionList.add(Manifest.permission.BLUETOOTH_SCAN);		// 藍牙掃描權限
			}

			if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) { 	// Android 13+
				permissionList.add(Manifest.permission.NEARBY_WIFI_DEVICES);// Wifi附近裝置權限
			}

			permissions = permissionList.toArray(new String[0]);
		}
	*/
    /**
     * 检查权限
     */
	/*
    private void checkPermission() {
        mPermissionList.clear();

		for (String permission : permissions) {
			Log.d(TAG, "需要的權限: " + permission);
			if (ContextCompat.checkSelfPermission(this, permission) != PackageManager.PERMISSION_GRANTED) {
				Log.d(TAG, "需要申請的權限: " + permission);
				mPermissionList.add(permission);
			}
		}

		if (mPermissionList.isEmpty()) {
			// 所有權限都已經給了，直接啟動主程式
			startMainProgram();
		} else {
			// 有需要申請的權限，統一申請一次
			ActivityCompat.requestPermissions(this, mPermissionList.toArray(new String[0]), PERMISSION_REQUEST);
		}
		
    }
	*/
	



    /**
     * 响应授权
     * 这里不管用户是否拒绝，都进入首页，不再重复申请权限
     */
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
		super.onRequestPermissionsResult(requestCode, permissions, grantResults);
		
		Log.e(TAG, "---------onRequestPermissionsResult ");
		permissionManager.onRequestPermissionsResult(requestCode, permissions, grantResults);

    }


    /**
     * 显示串口设备列表
     */
    public void setSelectUsbDevice() {
		Log.d(TAG, "######################  setSelectUsbDevice() 被呼叫");
		
		if(GeneralVariables.btListen){
			Log.d(TAG, "#####################已經連線，不再顯示選項");
			return;
		}
		else
			Log.d(TAG, "#####################顯示選項");
		// 如果已經顯示過，就直接跳出，不再顯示選擇視窗
        //if (GeneralVariables.hasShownUsbSelectDialog) {
        //    Log.d("FT8TW", "已經顯示過USB選擇畫面，這次不再顯示");
        //    return;
        //}
		
		
		
		
		
        ArrayList<CableSerialPort.SerialPort> ports = mainViewModel.mutableSerialPorts.getValue();
		if (ports == null || ports.isEmpty()) {
			binding.selectSerialPortLayout.setVisibility(View.GONE);
			return;
		}
		
		
		
		
        binding.selectSerialPortLinearLayout.removeAllViews();
        for (int i = 0; i < ports.size(); i++) {//动态添加串口设备列表
            View layout = LayoutInflater.from(getApplicationContext())
                    .inflate(R.layout.select_serial_port_list_view_item, null);
            layout.setId(i);
            TextView textView = layout.findViewById(R.id.selectSerialPortListViewItemTextView);
            textView.setText(ports.get(i).information());
            binding.selectSerialPortLinearLayout.addView(layout);
            layout.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
					CableSerialPort.SerialPort selectedPort = ports.get(view.getId());
					UsbDevice device = selectedPort.usbDevice;
					UsbManager usbManager = (UsbManager) getSystemService(Context.USB_SERVICE);
					
					if (usbManager == null) {
						Log.e("USB", "UsbManager is null!");
						Toast.makeText(MainActivity.this, "USB服務初始化失敗", Toast.LENGTH_SHORT).show();
						return;
					}
					
					
					
					
					Log.d("DEBUG", "Context is " + getApplicationContext());
                    //连接电台并做电台的频率设置等操作
                    //mainViewModel.connectCableRig( mainViewModel.getContext()  , ports.get(view.getId()));
                    //binding.selectSerialPortLayout.setVisibility(View.GONE);
					//try{
						if (usbManager.hasPermission(device)) {
							mainViewModel.connectCableRig(mainViewModel.getContext(), selectedPort);
							binding.selectSerialPortLayout.setVisibility(View.GONE);
						} 
					//} catch (Throwable t) {
					// 如果啟動 ErrorActivity 又失敗，則直接結束程式
					//}
					
					
					else {
						PendingIntent permissionIntent = PendingIntent.getBroadcast(
								MainActivity.this, 0, new Intent(ACTION_USB_PERMISSION), PendingIntent.FLAG_IMMUTABLE);
						usbManager.requestPermission(device, permissionIntent);
					}
					
					
                }
            });
        }

        //选择串口设备弹框
        //if ((ports.size() >= 1) && (!mainViewModel.isRigConnected())) {
		if (ports.size() >= 1 && GeneralVariables.connectMode == ConnectMode.USB_CABLE) {	
            binding.selectSerialPortLayout.setVisibility(View.VISIBLE);
			//GeneralVariables.hasShownUsbSelectDialog = true;  // 顯示過之後設為true
        } else {//说明没有可以识别的驱动，不显示设备弹框
            binding.selectSerialPortLayout.setVisibility(View.GONE);
        }
    }

    /**
     * 删除指定文件夹中的所有文件
     *
     * @param filePath 指定的文件夹
     */
    public static void deleteFolderFile(String filePath) {
        try {
            File file = new File(filePath);//获取SD卡指定路径
            File[] files = file.listFiles();//获取SD卡指定路径下的文件或者文件夹
            for (int i = 0; i < files.length; i++) {
                if (files[i].isFile()) {//如果是文件直接删除
                    File tempFile = new File(files[i].getPath());
                    tempFile.delete();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void animationImage() {

        ObjectAnimator navigationAnimator = ObjectAnimator.ofFloat(binding.navView, "translationY", 200);
        navigationAnimator.setDuration(3000);
        navigationAnimator.setFloatValues(200, 200, 200, 0);


        ObjectAnimator hideLogoAnimator = ObjectAnimator.ofFloat(binding.initDataLayout, "alpha", 1f, 1f, 1f, 0);
        hideLogoAnimator.setDuration(3000);

        AnimatorSet animatorSet = new AnimatorSet();
        animatorSet.playTogether(navigationAnimator, hideLogoAnimator);
        //animatorSet.playTogether(initPositionStrAnimator, logoAnimator, navigationAnimator, hideLogoAnimator);
        animatorSet.addListener(new Animator.AnimatorListener() {
            @Override
            public void onAnimationStart(Animator animator) {

            }

            @Override
            public void onAnimationEnd(Animator animator) {
                //animationEnd = true;
                binding.initDataLayout.setVisibility(View.GONE);
                binding.utcProgressBar.setVisibility(View.VISIBLE);
                //InitFloatView();//显示浮窗
                //floatView.setVisibility(View.VISIBLE);
            }

            @Override
            public void onAnimationCancel(Animator animator) {

            }

            @Override
            public void onAnimationRepeat(Animator animator) {

            }
        });

        animatorSet.start();
    }


    //此方法只有在android:launchMode="singleTask"模式下起作用
    @Override
    protected void onNewIntent(Intent intent) {
        if ("android.hardware.usb.action.USB_DEVICE_ATTACHED".equals(intent.getAction())) {
            mainViewModel.getUsbDevice();
        }else {
            setIntent(intent);//因为处于单例模式，所以要更新一下intent
            doReceiveShareFile(getIntent());
        }
        super.onNewIntent(intent);
    }


    @Override
    public void onBackPressed() {
		
		if (isExitDialogShown) {
			// 已經顯示過對話框，就忽略多餘的觸發
			return;
		}
		
		
		// ⭐ 只要在主畫面層級，一律詢問是否離開
		if (isAtRootDestination()) {
			isExitDialogShown = true;
			
			new AlertDialog.Builder(this)
				.setMessage(getString(R.string.exit_confirmation))
				.setPositiveButton(getString(R.string.exit), (d, w) -> {

					// ✅ 全部加防護
					if (mainViewModel != null
							&& mainViewModel.ft8TransmitSignal != null
							&& mainViewModel.ft8TransmitSignal.isActivated()) {
						mainViewModel.ft8TransmitSignal.setActivated(false);
					}

					isExitDialogShown = false;
					closeThisApp();
				})
				.setNegativeButton(getString(R.string.cancel), (d, w) -> {
					isExitDialogShown = false;
					d.dismiss();
				})
				.setOnDismissListener(d -> isExitDialogShown = false)
				.show();

			return;
		}
		
		//回到第一個頁籤
		int startId = navController.getGraph().getStartDestinationId();
        navController.popBackStack(startId, false);
        return;
		
		//if (!navController.popBackStack()) {
		//	super.onBackPressed();
		//}
		
		
		
		/*
        if (navController.getGraph().getStartDestination() == navController.getCurrentDestination().getId()) {//说明是到最后一个页面了
			isExitDialogShown = true;
            AlertDialog.Builder builder = new AlertDialog.Builder(this)
                    .setMessage(getString(R.string.exit_confirmation))
                    .setPositiveButton(getString(R.string.exit)
                            , new DialogInterface.OnClickListener() {
                                @Override
                                public void onClick(DialogInterface dialogInterface, int i) {
                                    if (mainViewModel.ft8TransmitSignal.isActivated()) {
                                        mainViewModel.ft8TransmitSignal.setActivated(false);
                                    }
									isExitDialogShown = false;
                                    closeThisApp();//退出APP
                                }
                            }).setNegativeButton(getString(R.string.cancel)
                            , new DialogInterface.OnClickListener() {
                                @Override
                                public void onClick(DialogInterface dialogInterface, int i) {
									isExitDialogShown = false;
                                    dialogInterface.dismiss();
                                }
                            });
            builder.create().show();

        } else {//退出activity堆栈
            navController.navigateUp();
            //setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_FULL_SENSOR);
        }
		*/
    }

    private void closeThisApp() {
        // ✅ 防止 mainViewModel 或其子物件尚未初始化
        if (mainViewModel != null) {
            if (mainViewModel.ft8TransmitSignal != null) {
                mainViewModel.ft8TransmitSignal.setActivated(false);
            }
            if (mainViewModel.baseRig != null) {
                if (mainViewModel.baseRig.getConnector() != null) {
                    mainViewModel.baseRig.getConnector().disconnect();
                }
            }
            if (mainViewModel.ft8SignalListener != null) {
                mainViewModel.ft8SignalListener.stopListen();
            }
            mainViewModel = null;
        }
        System.exit(0);
    }


    /**
     * 註冊藍芽動作廣播
     */
    private void registerBluetoothReceiver() {
        if (mReceive == null) {
            mReceive = new BluetoothStateBroadcastReceive(getApplicationContext(), mainViewModel);
        }
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(BluetoothAdapter.ACTION_STATE_CHANGED);
        intentFilter.addAction(BluetoothDevice.ACTION_ACL_CONNECTED);
        intentFilter.addAction(BluetoothDevice.ACTION_ACL_DISCONNECTED);
        intentFilter.addAction(AudioManager.ACTION_SCO_AUDIO_STATE_UPDATED);
        intentFilter.addAction(AudioManager.EXTRA_SCO_AUDIO_PREVIOUS_STATE);
        intentFilter.addAction(AudioManager.ACTION_AUDIO_BECOMING_NOISY);
        intentFilter.addAction(AudioManager.EXTRA_SCO_AUDIO_STATE);
        intentFilter.addAction(BluetoothAdapter.ACTION_CONNECTION_STATE_CHANGED);
        //intentFilter.addAction(BluetoothAdapter.EXTRA_CONNECTION_STATE); BV6LC
        //intentFilter.addAction(BluetoothAdapter.EXTRA_STATE); BV6LC
		
        intentFilter.addAction("android.bluetooth.BluetoothAdapter.STATE_OFF");
        intentFilter.addAction("android.bluetooth.BluetoothAdapter.STATE_ON");
		
		
        //registerReceiver(mReceive, intentFilter);
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
			registerReceiver(mReceive, intentFilter, Context.RECEIVER_NOT_EXPORTED); //Context.RECEIVER_NOT_EXPORTED
		} else {
			registerReceiver(mReceive, intentFilter);
		}
		
		
		
    }

    /**
     * 注销蓝牙动作广播
     */
    private void unregisterBluetoothReceiver() {
        if (mReceive != null) {
			
			 try {
				unregisterReceiver(mReceive);
			} catch (IllegalArgumentException ignored) {}
			
			
            mReceive = null;
        }
    }


	@Override
	protected void onPause() {
		super.onPause();
		// 取得目前方向並儲存
		int orientation = getResources().getConfiguration().orientation;
		getSharedPreferences("app_prefs", MODE_PRIVATE)
				.edit()
				.putInt("last_orientation", orientation)
				.apply();
	}

	@Override
	protected void onResume() {
		super.onResume();
		
		if (audioPermissionGranted && !mainProgramStarted) {
			LogExt.e("BOOT", "onResume() → startMainProgram()");
			mainProgramStarted = true;
			startMainProgram();
		}
		
		
		// 讀取上次儲存的方向
		/*
		SharedPreferences prefs = getSharedPreferences("app_prefs", MODE_PRIVATE);
		int lastOrientation = prefs.getInt("last_orientation", Configuration.ORIENTATION_UNDEFINED);

		if (lastOrientation == Configuration.ORIENTATION_LANDSCAPE) {
			setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
		} else if (lastOrientation == Configuration.ORIENTATION_PORTRAIT) {
			setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
		}
		*/
	}




    @Override
    protected void onDestroy() {
        unregisterBluetoothReceiver();
		
		try {
			unregisterReceiver(usbReceiver);
		} catch (IllegalArgumentException e) {
		}
		
		if (mainViewModel != null) {

			
			//保证屏幕方向切换后，不会因为对话框导致闪退
			if (Boolean.TRUE.equals(mainViewModel.mutableImportShareRunning.getValue())) {
				if (dialog != null) {
					dialog.dismiss();
					dialog = null;
				}
			}
			
			// BV6LC
			//if (mainViewModel != null && mainViewModel.isRigConnected()) {
			//	mainViewModel.baseRig.getConnector().disconnect();
			//	mainViewModel.disconnectRig();
			//}
		}
		
        super.onDestroy();
		
		OperationBand.clearInstance();  // 清掉 OperationBand static reference
		
		
		// 清除反射 (Samsung Multi-Window knows issue)
		
		try {
		View decor = getWindow().getDecorView();
		// 拿到 DecorView 裡的 MultiSplitHandler
		Field handlerField = Class.forName("com.android.internal.policy.DecorView")
								  .getDeclaredField("mMultiSplitHandler");
		handlerField.setAccessible(true);
		Object handler = handlerField.get(decor);
		if (handler != null) {
		  Field windowField = handler.getClass()
									 .getDeclaredField("mWindow");
		  windowField.setAccessible(true);
		  windowField.set(handler, null);
		}
	  } catch (Exception ignored) { }
		
		
    }


	private void showErrorScreen(Throwable e) {
        // 創建顯示錯誤的意圖
        Intent intent = new Intent(this, ErrorActivity.class);
        intent.putExtra("error_message", Log.getStackTraceString(e));
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);

        // 結束當前應用程式
        android.os.Process.killProcess(android.os.Process.myPid());
        System.exit(1);
    }
	
	private void logError(Throwable e) {
        // 寫入到本地檔案或發送到伺服器
        Log.e("GlobalException", "Uncaught exception", e);
    }

	
	private final BroadcastReceiver usbReceiver = new BroadcastReceiver() {
		@Override
		public void onReceive(Context context, Intent intent) {
			String action = intent.getAction();
			if (ACTION_USB_PERMISSION.equals(action)) {
				synchronized (this) {
					UsbDevice device = intent.getParcelableExtra(UsbManager.EXTRA_DEVICE);
					if (device == null) {
						Log.e(TAG, "收到 USB 權限事件但沒有取得 device");
						return;
					}
					
					
					
					if (intent.getBooleanExtra(UsbManager.EXTRA_PERMISSION_GRANTED, false)) {
						Toast.makeText(MainActivity.this, "USB 權限已授權", Toast.LENGTH_SHORT).show();
						mainViewModel.getUsbDevice();
					} else {
						Toast.makeText(MainActivity.this, "USB 權限被拒絕", Toast.LENGTH_SHORT).show();
					}
				}
			}
		}
	};
	


	private void restartApp() {
		Intent intent = getPackageManager().getLaunchIntentForPackage(getPackageName());
		if (intent == null) return;

		intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_NEW_TASK);

		PendingIntent pendingIntent = PendingIntent.getActivity(
				this,
				0,
				intent,
				PendingIntent.FLAG_CANCEL_CURRENT | PendingIntent.FLAG_IMMUTABLE
		);

		AlarmManager mgr = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
		mgr.set(
				AlarmManager.RTC,
				System.currentTimeMillis() + 200,   // 200ms 排程容錯更高
				pendingIntent
		);

		// ⭐ 正確的結束方式（不會阻止 AlarmManager 排程）
		finishAffinity();
		android.os.Process.killProcess(android.os.Process.myPid());
	}
	
	


	private void bindFt8SignalObservers() {
		if (ft8ObserversBound) return;
		ft8ObserversBound = true;

		// FT8 解碼訊息列表
		mainViewModel.mutableFt8MessageList.observe(this, messages -> {
			// TODO: 更新 RecyclerView / ListView
			// 例如：
			// ft8Adapter.submitList(new ArrayList<>(messages));
		});

		// 是否正在解碼
		mainViewModel.mutableIsDecoding.observe(this, isDecoding -> {
			// TODO: 更新 UI 解碼狀態
			// ex: 顯示 / 隱藏 decoding icon
		});

		// UTC 秒數（跑馬燈 / 時鐘）
		mainViewModel.timerSec.observe(this, utc -> {
			// TODO: 更新 UTC 時間顯示
		});
	}
	
	
	private void bindTransmitUiObservers() {
		if (mainViewModel == null) return;
		if (mainViewModel.ft8TransmitSignal == null) {
			LogExt.e("UI", "bindTransmitUiObservers(): ft8TransmitSignal still null");
			return;
		}

		// 發射內容（顯示呼叫對象）
		mainViewModel.ft8TransmitSignal.mutableTransmittingMessage.observe(this, msg -> {
			binding.transmittingMessageTextView.setText(msg);
		});

		// 發射狀態（紅喇叭顯示/隱藏）
		mainViewModel.ft8TransmitSignal.mutableIsTransmitting.observe(this, isTx -> {
			if (Boolean.TRUE.equals(isTx)) {
				binding.transmittingLayout.setVisibility(View.VISIBLE);
			} else {
				binding.transmittingLayout.setVisibility(View.GONE);
			}
		});

		LogExt.e("UI", "✅ Transmit UI observers bound");
	}
	
	
	private void observeCoreInitialized() {
		mainViewModel.coreInitialized.observe(this, ready -> {
			if (Boolean.TRUE.equals(ready)) {
				Log.e("BOOT", "coreInitialized observed → bind FT8 observers again");
				bindFt8SignalObservers(); // ⭐補綁一次
				bindTransmitUiObservers();
				
			 // ⭐ 在這裡才可以安全動 timer
				mainViewModel.ft8SignalListener.restartTimer();
				mainViewModel.ft8TransmitSignal.restartTimer();
				
			}
		});
	}

	
	private boolean isAtRootDestination() {
		if (navController == null) return true;

		int currentId = navController.getCurrentDestination().getId();
		int startId = navController.getGraph().getStartDestinationId();

		return currentId == startId;
	}



}