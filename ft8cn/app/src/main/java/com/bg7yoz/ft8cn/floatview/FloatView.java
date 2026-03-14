package com.bg7yoz.ft8cn.floatview;
/**
 * FloatButton的主界面
 * @author BGY70Z
 * @date 2023-03-20
 */
import android.util.Log;

import android.annotation.SuppressLint;
import android.content.Context;
import android.util.AttributeSet;
import android.util.TypedValue;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.ImageButton;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.constraintlayout.widget.ConstraintSet;
import androidx.constraintlayout.widget.Constraints;

import com.bg7yoz.ft8cn.ui.ToastMessage;

import java.util.ArrayList;


import android.view.ViewConfiguration;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.graphics.Insets;


import android.os.Build;


import android.content.res.Configuration;
public class FloatView extends ConstraintLayout {
    private static final String TAG = "FloatView";

    public enum FLOAT_BOARD {
        LEFT, RIGHT, TOP, BUTTON
    }


    private int parentViewHeight = 100;//上一级view的高度
    private int parentViewWidth = 100;//上一级view的宽度
    private float mDownX = 0;
    private float mDownY = 0;
    private int lastLeft = 0;
    private int lastTop = 0;
	private boolean isDragging;
	private final int touchSlop;
	



    //------------悬浮窗口的属性--------------------
    private int buttonSize = 96;//按钮的大小
    private final ArrayList<FloatViewButton> buttons = new ArrayList<>();
    private boolean originalFromTop = false;//是否上下靠边
    private boolean originalFromLeft = true;//是否左右靠边
    private int buttonBackgroundResourceId = -1;//按钮的背景
    private int backgroundResourceId = -1;//浮窗的背景
    private int buttonMargin = 0;//按钮在浮窗中的边界宽度
    private int floatMargin = 40;//浮窗距离边界的距离
    private FLOAT_BOARD floatBoard = FLOAT_BOARD.RIGHT;
	
	private boolean locationInitialized = false;
	private static final int EDGE_SNAP_DP = 4;


    /**
     * 构造函数，需要大小
     *
     * @param context    context
     * @param buttonSize 按钮大小，正方形
     */
    public FloatView(@NonNull Context context, int buttonSize) {
        this(context);
		// 触发拖拽的最小移动阈值
		
		
        this.buttonSize = buttonSize;
		Log.d(TAG,"--------FloatView 1");
		
    }

    public FloatView(@NonNull Context context) {
        this(context, null);
		Log.d(TAG,"--------FloatView 2");
    }

    public FloatView(@NonNull Context context, @Nullable AttributeSet attrs) {
        this(context, attrs, 0);
		Log.d(TAG,"--------FloatView 3");
    }


    public FloatView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
		touchSlop = ViewConfiguration.get(getContext()).getScaledTouchSlop();
        initView();
		Log.d(TAG,"--------FloatView 4");
    }

    public FloatViewButton addButton(String name, int imageResourceId, OnClickListener onClickListener) {
		Log.d(TAG,"--------addButton 1");
        FloatViewButton floatViewButton=getButtonByName(name);
        if (floatViewButton==null){
            floatViewButton =addButton(View.generateViewId(), imageResourceId, onClickListener);
        }
        floatViewButton.setName(name);
        return floatViewButton;
    }

    public FloatViewButton addButton(int id, String name, int imageResourceId, OnClickListener onClickListener) {
		Log.d(TAG,"--------addButton 2");
        FloatViewButton floatViewButton=getButtonByName(name);
        if (floatViewButton==null){
            floatViewButton = addButton(id, imageResourceId, onClickListener);
        }
        floatViewButton.setName(name);
        return floatViewButton;
    }

    public FloatViewButton addButton(int id, int imageResourceId, OnClickListener onClickListener) {
		Log.d(TAG,"--------addButton 3");
        FloatViewButton imageButton = new FloatViewButton(getContext());
        //imageButton.setScaleType(ImageView.ScaleType.FIT_CENTER);
        imageButton.setImageResource(imageResourceId);
        if (buttonBackgroundResourceId != -1) {
            imageButton.setBackgroundResource(buttonBackgroundResourceId);
        }
        //imageButton.setId(R.id.float_nav);
        imageButton.setId(id);
        imageButton.setOnClickListener(onClickListener);

        imageButton.setAlpha(0.5f);

        addView(imageButton);
        buttons.add(imageButton);
        resetView();

        return imageButton;
    }

    /**
     * 通过按钮的名称删除按钮
     *
     * @param name 按钮的名称
     */
    public void deleteButtonByName(String name) {
        for (int i = buttons.size() - 1; i >= 0; i--) {
            FloatViewButton floatViewButton = buttons.get(i);
            if (floatViewButton.getName().equals(name)) {
                buttons.remove(i);
                removeView(floatViewButton);
            }
            resetView();
        }
    }

    public void deleteButtonByIndex(int index) {
        if (buttons.size() > index && index > -1) {
            FloatViewButton floatViewButton = buttons.get(index);
            buttons.remove(index);
            removeView(floatViewButton);
            resetView();
        }
    }

    public FloatViewButton getButtonByName(String name) {
        for (FloatViewButton button : buttons) {
            if (button.getName().equals(name)) {
                return button;
            }
        }
        return null;
    }

    /**
     * 把dp值转换为像素点
     *
     * @param dp dp值
     * @return 像素点
     */
    private int dpToPixel(int dp) {
         return (int) TypedValue.applyDimension(
        TypedValue.COMPLEX_UNIT_DIP, dp, getResources().getDisplayMetrics());
//        return (int) (dp*getResources().getDisplayMetrics().density);
    }

    /**
     * 重新设置一下按钮
     */
    public void resetView() {
		//Log.d(TAG,"--------Resetview"); 
        for (int i = 0; i < buttons.size(); i++) {
            //LayoutParams buttonLp = new LayoutParams(buttonSize, buttonSize);
            LayoutParams buttonLp = new LayoutParams(dpToPixel(buttonSize), dpToPixel(buttonSize));
            buttonLp.startToStart = ConstraintSet.PARENT_ID;
            buttonLp.endToEnd = ConstraintSet.PARENT_ID;
            buttonLp.leftMargin = buttonMargin;
            buttonLp.rightMargin = buttonMargin;
            if (i == 0) {
                buttonLp.topToTop = ConstraintSet.PARENT_ID;
                buttonLp.topMargin = buttonMargin;
            } else {
                buttonLp.topToBottom = buttons.get(i - 1).getId();
                buttonLp.topMargin = buttonMargin+dpToPixel(4);//按钮之间留一点点空隙
            }
            if (i == buttons.size() - 1) {
                buttonLp.bottomToBottom = ConstraintSet.PARENT_ID;
                buttonLp.bottomMargin = buttonMargin;
            }
            buttons.get(i).setLayoutParams(buttonLp);
        }
		//adsorbLeftAndRight();	

    }

    @SuppressLint("ClickableViewAccessibility")
    private void initView() {
		Log.d(TAG,"--------initView ");
        LayoutParams lp = new LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);// LayoutParams.WRAP_CONTENT);
        lp.startToStart = ConstraintSet.PARENT_ID;//只连接窗口的左边和上边
        lp.topToTop = ConstraintSet.PARENT_ID;
        this.setLayoutParams(lp);
		
		
    }

    public void initLocation() {
		Log.d(TAG,"--------initLocation(nowpara)");
		
		Log.d(TAG,"--------initLocation"+this.floatBoard);
        initLocation(this.floatBoard);
		
		
		// 最后，延迟到下一次消息循环，再调用贴边
		//post(() -> {
		//	if (originalFromLeft)  adsorbLeftAndRight();
		//	//if (originalFromTop)   adsorbTopAdnBottomByCoordinate();
		//});
    }


    /**
     * 初始化浮窗的位置，默认在窗口的右侧，
     */
    public void initLocation(FLOAT_BOARD float_board) {
		Log.d(TAG,"--------initLocation FLOAT_BOARD");
        this.floatBoard = float_board;
        getParentViewHeightAndWidth();


		int width = parentViewWidth > 0 ? parentViewWidth
              : getResources().getDisplayMetrics().widthPixels;
		int height = parentViewHeight > 0 ? parentViewHeight
               : getResources().getDisplayMetrics().heightPixels;
		// 通过 ViewCompat 拿到 WindowInsetsCompat
		WindowInsetsCompat wi = ViewCompat.getRootWindowInsets(this);
		
		//? wi.getInsets(WindowInsetsCompat.Type.systemBars()
		//			 | WindowInsetsCompat.Type.displayCutout())
		// 拿到 navigationBars 的 inset
		//? wi.getInsets(WindowInsetsCompat.Type.navigationBars()) 
		Insets sys = wi != null 
			? wi.getInsets(WindowInsetsCompat.Type.navigationBars() | WindowInsetsCompat.Type.displayCutout() ) 
			: Insets.NONE;
		// sys.left/sys.right/sys.top/sys.bottom 就是状态栏、打孔、导航栏的大小（px）
		int insetLeft   = sys.left;
		int insetRight  = sys.right;
		int insetTop    = sys.top;
		int insetBottom = sys.bottom;	
	
		
		
		// 把 floatMargin 从 dp 转 px
		int marginPx = dpToPixel(floatMargin);
		// 计算 floatView 应该放在哪
		int centerY = (height - getMeasuredHeight()) / 2;
		
		
			   
			
				
		
		//ToastMessage.show("Width:" + width + " " + " Left:"+insetLeft +" Right:" + insetRight +" top:"+insetTop +" botoom:"+insetBottom);
		//Log.d(TAG,"--------Width:"+ width+" Left:"+insetLeft +" Right:" + insetRight +" top:"+insetTop +" botoom:"+insetBottom);
		
		
		
		
        switch (float_board) {
            case RIGHT:
				Log.d(TAG,"--------float_board RIGHT");
				/*int buttonpixel = (int) (dpToPixel(buttonMargin + buttonSize*buttons.size())/2f);
				
				int y = (int)((height/2f)
					  - buttonpixel);
				
				int xR = (int) width  - getMeasuredWidth() - marginPx ;
				if (Build.VERSION.SDK_INT >= 35) {  // 35 是 Android 15 的预览 API 级别
					xR -= (insetLeft+insetRight);
				}
				setLayoutLeftTop(xR, (int) (height / 2f - dpToPixel(buttonMargin + buttonSize * buttons.size() )/2f) );
				*/
				int buttonPixelHeight = dpToPixel(buttonMargin + buttonSize * buttons.size());
				centerY = (height - buttonPixelHeight) / 2;

				int safeRightInset = insetRight; // Android 15 下也可能有 cutout
				
				
				int isLandscape = getResources().getConfiguration().orientation == Configuration.ORIENTATION_LANDSCAPE ? 36 : 16;
				marginPx = dpToPixel(isLandscape);
				
				int xR = width - getMeasuredWidth() - safeRightInset - edgeSnapPx(); // ✅ 建議保守留 8dp

				setLayoutLeftTop(xR, centerY);
				
				
                break;
            case LEFT:
				Log.d(TAG,"--------float_board LEFT");
                setLayoutLeftTop(floatMargin + 10
                        , (int) (height / 2f - dpToPixel(buttonMargin + buttonSize * buttons.size() )/2f));
                //adsorbLeftAndRight();
				//ToastMessage.show("Float LEFT" );
				break;
            case TOP:
				Log.d(TAG,"--------float_board TOP");
                setLayoutLeftTop((int) (width / 2f - dpToPixel(buttonMargin - buttonSize) / 2f), floatMargin);
                //adsorbLeftAndRight();
				//ToastMessage.show("Float TOP" );
				break;
            case BUTTON:
				Log.d(TAG,"--------float_board BUTTON");
                setLayoutLeftTop((int) (width / 2f - dpToPixel(buttonMargin - buttonSize) / 2f)
                        , height - dpToPixel(floatMargin - buttonMargin * 2 - buttonSize * buttons.size()));
                //adsorbLeftAndRight();
				//ToastMessage.show("Float BUTTON" );
				break;
			default:
				//ToastMessage.show("default");
				break;
        }
		

    }

    /**
     * 获取父View的高度和宽度
     */
    private void getParentViewHeightAndWidth() {
        View view = (View) getParent();
        if (view != null) {
            parentViewHeight = view.getHeight();
            parentViewWidth = view.getWidth();
        }

    }

    public void setLayoutLeftTop(int left, int top) { // 設定浮動視窗左上角
        ConstraintLayout.LayoutParams layoutParams = new Constraints.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT
                , ViewGroup.LayoutParams.WRAP_CONTENT);
        layoutParams.topToTop = ConstraintSet.PARENT_ID;
        layoutParams.startToStart = ConstraintSet.PARENT_ID;
        layoutParams.leftMargin = left;
        layoutParams.topMargin = top;
        setLayoutParams(layoutParams);
		//setX(left);
    }

	/*
	@Override
	protected void onConfigurationChanged(Configuration newConfig) {
		super.onConfigurationChanged(newConfig);
		Log.d(TAG, "Configuration changed → re-init location");

		// 等待 layout 完成再設定位置，避免 getMeasuredWidth() 為 0
		postDelayed(() -> {
			initLocation(floatBoard);
		}, 300); // 延遲一點確保視圖已 layout 完成
	}*/

    @Override
    public boolean onInterceptTouchEvent(MotionEvent event) {
		Log.d(TAG,"--------onInterceptTouchEvent");
        //switch (event.getAction()) {
		switch (event.getActionMasked()) {
            case MotionEvent.ACTION_DOWN: //第一根手指」剛觸碰螢幕的那一刻
                mDownX = event.getRawX();;
                mDownY = event.getRawY();
				isDragging = false;
                return false;
            case MotionEvent.ACTION_MOVE: //使用者的手指（或觸控點）在螢幕上「移動」的那一刻
			    float dx = event.getRawX() - mDownX;
				float dy = event.getRawY() - mDownY;
				
				if (!isDragging) {
					// 只有移动超过阈值才认为是拖拽
					if (Math.hypot(dx, dy) > touchSlop) {
						isDragging = true;
						mDownX = event.getRawX();
						mDownY = event.getRawY();
						return true;   // 超过阈值，开始拦截
					} else {
						// 还没到拖拽阈值，别拦截，让子 view 继续拿到事件
						return false;
					}
				}
				
                //offsetTopAndBottom((int) (event.getY() - mDownY));
                //offsetLeftAndRight((int) (event.getX() - mDownX));

                //lastLeft = getLeft();
                //lastTop = getTop();
                //setLayoutLeftTop(getLeft(), getTop());
				return false;


            case MotionEvent.ACTION_UP: //第一根手指」放開螢幕的那一刻
                //setLayoutLeftTop(lastLeft, lastTop);

                //adsorbTopAdnBottom();//吸附上下
                //adsorbLeftAndRight();//吸附左右
                //break;
            case MotionEvent.ACTION_CANCEL: //事件被系統取消
				Log.d(TAG,"--------onInterceptTouchEvent ACTION_CANCEL");
				isDragging = false;
				 
				 
                 return false;

        }
        return super.onInterceptTouchEvent(event);
    }
	

	@Override
	public boolean onTouchEvent(MotionEvent event) {
		if (!isDragging) {
			// 如果还没进入拖拽状态，别耗事件
			return super.onTouchEvent(event);
		}
		
		switch (event.getActionMasked()) {

	
			case MotionEvent.ACTION_MOVE:
				// 计算偏移量
				float newRawX = event.getRawX();
				float newRawY = event.getRawY();
				float deltaX = newRawX - mDownX;
				float deltaY = newRawY - mDownY;
				// 更新位置（这里不用 LayoutParams 了，只用 setX/Y）
				float nextX = getX() + deltaX;
				float nextY = getY() + deltaY;
				// 钳制到父容器内
				View parent = (View) getParent();
				int pw = parent != null ? parent.getWidth() : getResources().getDisplayMetrics().widthPixels;
				int ph = parent != null ? parent.getHeight(): getResources().getDisplayMetrics().heightPixels;
				nextX = Math.max(0, Math.min(nextX, pw - getWidth()));
				nextY = Math.max(0, Math.min(nextY, ph - getHeight()));
				setX(nextX);
				setY(nextY);
				// 更新基准点
				mDownX = newRawX;
				mDownY = newRawY;
				return true;
			case MotionEvent.ACTION_UP:
			case MotionEvent.ACTION_CANCEL:
				// 拖拽结束，可做吸附动画、重置状态等
				isDragging = false;
				snapToEdge(); //吸邊
				return true;
		}
		return super.onTouchEvent(event);
	}


	
	@Override
	protected void onAttachedToWindow() {
		Log.d(TAG,"--------onAttachedToWindow");
		super.onAttachedToWindow();
		//adsorbLeftAndRight();
		//initLocation();
		//post(() -> initLocation(floatBoard)); // 等待 layout 完成後再對齊位置
		if (!locationInitialized) {
			locationInitialized = true;
			post(() -> initLocation(floatBoard));
			
		}
		
		
		
	}
	
	
	


    private void adsorbTopAdnBottom() {
		 if (!originalFromTop) return;

		// 1. 父容器高度（或备援屏幕高度）
		View parent = (View) getParent();
		int parentHeight = parent != null
			? parent.getHeight()
			: getResources().getDisplayMetrics().heightPixels;

		// 2a. 上方安全 inset：状态栏 + 摄像头缺口
		WindowInsetsCompat wi = ViewCompat.getRootWindowInsets(this);
		Insets statusBars = wi != null
			? wi.getInsets(WindowInsetsCompat.Type.statusBars() 
						 | WindowInsetsCompat.Type.displayCutout())
			: Insets.NONE;
		int insetTop = statusBars.top;

		// 2b. 下方安全 inset：导航栏
		Insets navBars = wi != null
			? wi.getInsets(WindowInsetsCompat.Type.navigationBars())
			: Insets.NONE;
		int insetBottom = navBars.bottom;

		// 3. dp → px（floatMargin 是以 dp 为单位）
		int marginPx = dpToPixel(floatMargin);

		// 4. 计算可用的上边缘 & 下边缘 Y
		int safeTop    = insetTop + marginPx;
		int safeBottom = parentHeight - insetBottom - getHeight() - marginPx;

		// 5. 决定贴上还是贴下：取中点
		int midY     = (safeTop + safeBottom) / 2;
		int currentY = getTop();
		int targetY  = currentY < midY ? safeTop : safeBottom;

		// 6. 仅在真正需要贴边（位置变化）时才调用
		if (Math.abs(currentY - targetY) > 0) {
			//setLayoutLeftTop(getLeft(), targetY);
		}
    }

    private void adsorbLeftAndRight() { //貼齊格線
		Log.d(TAG,"---------------------adsorbLeftAndRight");
		//if (!originalFromLeft) return;

			// 1. 取得 parent 真實寬度
			View parent = (View) getParent();
			int parentWidth = parent != null
				? parent.getWidth()
				: getResources().getDisplayMetrics().widthPixels;

			// 2. 拿到系統欄的左右 inset
			WindowInsetsCompat wi = ViewCompat.getRootWindowInsets(this);
			Insets sysBars = wi != null
				? wi.getInsets(WindowInsetsCompat.Type.systemBars())
				: Insets.NONE;
			int insetLeft  = sysBars.left;
			int insetRight = sysBars.right;

			// 3. 計算「安全貼邊」的兩個 X
			int xLeft  = insetLeft + floatMargin;
			int xRight = parentWidth - insetRight - getWidth() - floatMargin;

			// 4. 看哪邊近，就貼哪邊
			int currentX = getLeft();
			Log.d(TAG,"---------------------currentX"+currentX);
			Log.d(TAG,"---------------------xLeft"+xLeft);
			Log.d(TAG,"---------------------xRight"+xRight);
			int targetX = Math.abs(currentX - xLeft) < Math.abs(currentX - xRight)
						  ? xLeft
						  : xRight;

			// 5. 最後貼上去
			//Log.d("---------------------","getTop:"+getTop());
			//setLayoutLeftTop(targetX, getTop());
			Log.d(TAG,"---------------------setX(targetX)"+targetX);
			//setX(targetX);
    }


    public boolean isOriginalFromTop() {
        return originalFromTop;
    }

    public void setOriginalFromTop(boolean originalFromTop) {
        this.originalFromTop = originalFromTop;
    }

    public boolean isOriginalFromLeft() {
        return originalFromLeft;
    }

    public void setOriginalFromLeft(boolean originalFromLeft) {
        this.originalFromLeft = originalFromLeft;
    }

    public int getButtonBackgroundResourceId() {
        return buttonBackgroundResourceId;
    }

    public void setButtonBackgroundResourceId(int buttonBackgroundResourceId) {
        this.buttonBackgroundResourceId = buttonBackgroundResourceId;
        for (ImageButton button : this.buttons) {
            button.setBackgroundResource(buttonBackgroundResourceId);
        }
    }

    public int getBackgroundResourceId() {
        return backgroundResourceId;
    }

    public void setBackgroundResourceId(int backgroundResourceId) {
        this.setBackgroundResource(backgroundResourceId);
        this.backgroundResourceId = backgroundResourceId;
    }

    public int getButtonMargin() {
        return buttonMargin;
    }

    public void setButtonMargin(int buttonMargin) {
        this.buttonMargin = buttonMargin;
    }

    public int getFloatMargin() {
        return floatMargin;
    }

    public void setFloatMargin(int floatMargin) {
        this.floatMargin = floatMargin;
    }

    public FLOAT_BOARD getFloatBoard() {
        return floatBoard;
    }

    public void setFloatBoard(FLOAT_BOARD float_board) {
        this.floatBoard = float_board;
    }
	
	private void snapToEdge() {
		View parent = (View) getParent();
		if (parent == null) return;

		int parentWidth = parent.getWidth();
		int viewWidth = getWidth();

		float centerX = getX() + viewWidth / 2f;

		float targetX;
		if (centerX < parentWidth / 2f) {
			// 吸左
			targetX = dpToPixel(4);
			floatBoard = FLOAT_BOARD.LEFT;
		} else {
			// 吸右
			targetX = parentWidth - viewWidth - edgeSnapPx();
			floatBoard = FLOAT_BOARD.RIGHT;
		}

		// ⭐ 用動畫才有「黏住感」
		animate()
			.x(targetX)
			.setDuration(200)
			.start();
	}
	
	private int edgeSnapPx() {
		return dpToPixel(EDGE_SNAP_DP);
	}
	
	
	
}
