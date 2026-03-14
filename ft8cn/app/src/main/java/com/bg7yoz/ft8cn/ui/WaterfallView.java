package com.bg7yoz.ft8cn.ui;
/**
 * 瀑布图自定义控件。
 *
 * @author BGY70Z
 * @date 2023-03-20
 */

import static android.graphics.Bitmap.Config.ARGB_8888;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.LinearGradient;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.Shader;
import android.util.AttributeSet;
import android.util.TypedValue;
import android.view.View;

import androidx.annotation.Nullable;

import com.bg7yoz.ft8cn.Ft8Message;
import com.bg7yoz.ft8cn.GeneralVariables;
import com.bg7yoz.ft8cn.timer.UtcTimer;

import com.bg7yoz.ft8cn.R;

import java.util.ArrayList;
import java.util.List;

import android.graphics.DashPathEffect;

public class WaterfallView extends View {
    private int blockHeight = 2;//色块高度
    private float freq_width = 1;//频率的宽度
    private final int cycle = 2;
    private int symbols = 93;
    private int lastSequential = 0;
    private Bitmap lastBitMap = null;
    private Canvas _canvas;
    private final Paint linePaint = new Paint();
    private Paint touchPaint = new Paint();
    private final Paint fontPaint = new Paint();
    private final Paint messagePaint = new Paint();
    private final Paint textLinePaint = new Paint();
	
    private final Paint messagePaintBack = new Paint();//消息背景
	private boolean showMessageBackground = true;
	
	private boolean slotInitialized = false;

    private final Paint utcPaint = new Paint();
    Paint linearPaint = new Paint();
    private final Paint utcPainBack = new Paint();
    private float pathStart = 0;
    private float pathEnd = 0;
	
	float pathLength;

    private int touch_x = -1;
    private int freq_hz = -1;
    private boolean drawMessage = false;//是否画消息内容

	// 是否使用遮罩
	public void setShowMessageBackground(boolean show) {
		showMessageBackground = show;
		invalidate();
	}


    public WaterfallView(Context context) {
        super(context);
    }

    public WaterfallView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
    }

    public WaterfallView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }
    ArrayList<Ft8Message> messages= new ArrayList<>();


    /**
     * 把dp值转换为像素点
     *
     * @param dp dp值
     * @return 像素点
     */
    private int dpToPixel(int dp) {
        return (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dp
                , getResources().getDisplayMetrics());
    }

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
		
		// ⭐ 防呆：View 高度=0 (隱藏) 時，不要建立 Bitmap
		if (w <= 0 || h <= 0) {
			lastBitMap = null;
			return;
		}
		
		
		
		symbols = GeneralVariables.isFT4 ? 45 : 93; // FT4 只有一半
		
        setClickable(true);
        blockHeight = getHeight() / (symbols * cycle);
		blockHeight = GeneralVariables.isFT4 ? blockHeight/2 : blockHeight; // FT4 只有一半
		
		
		
        freq_width = (float) getWidth() / 3000f;
        lastBitMap = Bitmap.createBitmap(w, h, ARGB_8888);
        _canvas = new Canvas(lastBitMap);
		
		
        Paint blackPaint = new Paint();
        blackPaint.setColor(0xFF000000);
        _canvas.drawRect(0, 0, w, h, blackPaint);//先把背景画黑，防止文字重叠

        //linePaint = new Paint();
        linePaint.setColor(0xff990000);
        touchPaint = new Paint();
        touchPaint.setColor(0xff00ffff);
        touchPaint.setStrokeWidth(getResources().getDisplayMetrics().density);


        //fontPaint = new Paint();
        fontPaint.setTextSize(dpToPixel(10+2));
		setShowMessageBackground(true);   // 開啟背景遮罩（可配合高亮）
		
        fontPaint.setColor(0xff00ffff);
        fontPaint.setAntiAlias(true);
        fontPaint.setDither(true);
        fontPaint.setTextAlign(Paint.Align.LEFT);


        textLinePaint.setColor(0xff00ffff);
        textLinePaint.setAntiAlias(true);
        textLinePaint.setDither(true);
        textLinePaint.setStrokeWidth(2);
        textLinePaint.setStyle(Paint.Style.FILL_AND_STROKE);


        // messagePaint = new Paint();
        messagePaint.setTextSize(dpToPixel(11));
        messagePaint.setColor(0xff00ffff);
        messagePaint.setAntiAlias(true);
        messagePaint.setDither(true);
        messagePaint.setStrokeWidth(0);
        messagePaint.setStyle(Paint.Style.FILL_AND_STROKE);
        messagePaint.setTextAlign(Paint.Align.CENTER);
        //messagePaint.setShadowLayer(10,5,5,Color.BLACK);
		messagePaint.setShadowLayer(4,1,1,Color.BLACK);
		

        //messagePaintBack = new Paint();
        messagePaintBack.setTextSize(dpToPixel(11));
        messagePaintBack.setColor(0xff000000);//背景不透明
        messagePaintBack.setAntiAlias(true);
        messagePaintBack.setDither(true);
        messagePaintBack.setStrokeWidth(dpToPixel(3));
        messagePaintBack.setFakeBoldText(true);
        messagePaintBack.setStyle(Paint.Style.FILL_AND_STROKE);
        messagePaintBack.setTextAlign(Paint.Align.CENTER);

        //utcPaint = new Paint();
        utcPaint.setTextSize(dpToPixel(10));
        utcPaint.setColor(0xff00ffff);//
        utcPaint.setAntiAlias(true);
        utcPaint.setDither(true);
        utcPaint.setStrokeWidth(0);
        utcPaint.setStyle(Paint.Style.FILL_AND_STROKE);
        utcPaint.setTextAlign(Paint.Align.LEFT);


        //utcPainBack = new Paint();
        utcPainBack.setTextSize(dpToPixel(10));
        utcPainBack.setColor(0xff000000);//背景不透明
        utcPainBack.setAntiAlias(true);
        utcPainBack.setDither(true);
        utcPainBack.setStrokeWidth(dpToPixel(4));
        utcPainBack.setStyle(Paint.Style.FILL_AND_STROKE);
        utcPainBack.setTextAlign(Paint.Align.LEFT);


        pathStart = blockHeight * 2;
        pathEnd = blockHeight * 90;
        if (pathEnd < 130 * getResources().getDisplayMetrics().density) {//为了保证能写的下
            pathEnd = 130 * getResources().getDisplayMetrics().density;
        }

        super.onSizeChanged(w, h, oldw, oldh);

    }

    @SuppressLint("DefaultLocale")
    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        canvas.drawBitmap(lastBitMap, 0, 0, null);

        //计算频率
        if (touch_x > 0) {//画触摸线
            freq_hz = Math.round(3000f * (float) touch_x / (float) getWidth());
            if (freq_hz > 2900) {
                freq_hz = 2900;
            }
            if (freq_hz < 100) {
                freq_hz = 100;
            }

            if (touch_x > getWidth() / 2) {
                fontPaint.setTextAlign(Paint.Align.RIGHT);
                canvas.drawText(String.format("%dHz", freq_hz)
                        , touch_x - 10, 250, fontPaint);
            } else {
                fontPaint.setTextAlign(Paint.Align.LEFT);
                canvas.drawText(String.format("%dHz", freq_hz)
                        , touch_x + 10, 250, fontPaint);
            }
            //canvas.drawLine(touch_x, 0, touch_x, getHeight(), touchPaint);
			
			// 計算左右 ±500Hz 的位置
			int leftX = (int) ((freq_hz - 45) * getWidth() / 3000f);
			int rightX = (int) ((freq_hz + 45) * getWidth() / 3000f);
			
			Paint paintMain = new Paint();
			paintMain.setColor(Color.RED);
			paintMain.setStrokeWidth(2);

			Paint paintAux = new Paint();
			paintAux.setColor(Color.GRAY);
			paintAux.setStrokeWidth(3);
			paintAux.setPathEffect(new DashPathEffect(new float[]{6,4}, 0)); // 虛線
			
			
            canvas.drawLine(touch_x, 0, touch_x, getHeight(), touchPaint);
			canvas.drawLine(leftX, 0, leftX, getHeight(), paintAux);
			canvas.drawLine(rightX, 0, rightX, getHeight(), paintAux);
			
			

        }
        invalidate();
    }

    public void setWaveData(int[] data, int sequential, List<Ft8Message> msgs) {
        if (drawMessage&& msgs!=null){//把需要画的消息复制出来防止多线程访问冲突
            messages=new ArrayList<>(msgs);
        }else {
            messages.clear();//当设定不标记消息时，要清空原来的消息
        }

        if (data == null) {
            return;
        }
        if (data.length <= 0) {
            return;
        }
        if (lastBitMap == null) {
            return;
        }
		

        int[] colors = new int[data.length];

		if (slotInitialized) {
			//画分割线
			if (sequential != lastSequential) {
				Bitmap bitmap = Bitmap.createBitmap(lastBitMap, 0, 0, getWidth(), getHeight() - blockHeight);
				_canvas.drawBitmap(bitmap, 0, blockHeight, linePaint);
				bitmap.recycle();
				_canvas.drawRect(0, 0, getWidth(), getResources().getDisplayMetrics().density
						, linePaint);
						
						
						
				_canvas.drawText(UtcTimer.getTimeStr(UtcTimer.getSystemTime())+" ↑ " + UtcTimer.sequential(UtcTimer.getSystemTime())+" ↑", 50 // BV6LC
						, 15 * getResources().getDisplayMetrics().density, utcPainBack);
						
				_canvas.drawText(UtcTimer.getTimeStr(UtcTimer.getSystemTime()) +" ↑ " + UtcTimer.sequential(UtcTimer.getSystemTime())+" ↑" , 50
						, 15 * getResources().getDisplayMetrics().density, utcPaint);
			}
		}
		else{
			slotInitialized = true;
		}
        lastSequential = sequential;

        //色块分布
        for (int i = 0; i < data.length; i++) {

            if (data[i] < 128) {//低于一半的音量，用蓝色0~256
                colors[i] = 0xff000000 | (data[i] << 1);
            } else if (data[i] < 192) {
                colors[i] = 0xff0000ff | (((data[i] - 127)) << 10);//放大4倍
//                colors[i] = 0xff000000 | (data[i] * 2 * 256 + 255);
            } else {
                colors[i] = 0xff00ffff | (((data[i] - 127)) << 18);//放大4倍
            }
        }
		
		
        LinearGradient linearGradient = new LinearGradient(0, 0, getWidth() * 2, 0, colors
                , null, Shader.TileMode.CLAMP);
        //Paint linearPaint = new Paint();
        linearPaint.setShader(linearGradient);
		
		
		// 🟦 正常畫一次（主要瀑布線）
        Bitmap bitmap = Bitmap.createBitmap(lastBitMap, 0, 0, getWidth(), getHeight() - blockHeight);
        _canvas.drawBitmap(bitmap, 0, blockHeight, linearPaint);
        bitmap.recycle();
        _canvas.drawRect(0, 0, getWidth(), blockHeight, linearPaint);
		
	    // 🟩 ✅【FT4 模式補畫一遍】—— 模擬時間軸密度一致
		if (GeneralVariables.isFT4) {
			Bitmap bitmap2 = Bitmap.createBitmap(lastBitMap, 0, 0, getWidth(), getHeight() - blockHeight);
			_canvas.drawBitmap(bitmap2, 0, blockHeight, linearPaint);
			bitmap2.recycle();
			_canvas.drawRect(0, 0, getWidth(), blockHeight, linearPaint);
		}
		



        //消息有3种：普通、CQ、有我
        if (drawMessage && messages != null) {
            drawMessage = false;//只画一遍
            //fontPaint.setTextAlign(Paint.Align.LEFT);
            //fontPaint.setStrikeThruText(true);
            for (Ft8Message msg : messages) {
				
				boolean isMine = GeneralVariables.checkIsMyCallsign(msg.getCallsignFrom());
				boolean fromIsMe = GeneralVariables.checkIsMyCallsign(msg.getCallsignFrom());
				boolean toIsMe   = GeneralVariables.checkIsMyCallsign(msg.getCallsignTo());
				boolean related  = fromIsMe || toIsMe; // 與我有關
				boolean isCQ     = msg.checkIsCQ();

                if (msg.isFollow_Callsign || msg.isPotaSota) {
					messagePaint.setColor(getContext().getColor(R.color.follow_callsign));  // 關注
					textLinePaint.setColor(getContext().getColor(R.color.follow_callsign));
				//}	
				//else if (msg.inMyCall()) { // 與我有關（呼叫我 or 我呼叫對方）
                //    messagePaint.setColor(0xffffb2b2);  // 淡紅色
				//	//messagePaint.setColor(0x00FF00);  // 非常亮的綠，容易辨識
                //    textLinePaint.setColor(0xffffb2b2);
                } else if (msg.checkIsCQ()) {//CQ
                    //messagePaint.setColor (0xffeeee00);
                    //textLinePaint.setColor(0xffeeee00);
					messagePaint.setColor (getContext().getColor(R.color.cq_callsign));
                    textLinePaint.setColor(getContext().getColor(R.color.cq_callsign));
				} else if (related) {//與我相關
					messagePaint.setColor(getContext().getColor(R.color.calling_callsign));
                    textLinePaint.setColor(getContext().getColor(R.color.calling_callsign));
				
                } else {
                    messagePaint.setColor(0xff00ffff);
                    textLinePaint.setColor(0xff00ffff);
                }

                Path path = new Path();

                path.moveTo(msg.freq_hz * freq_width, pathStart);
                path.lineTo(msg.freq_hz * freq_width, pathEnd);
				
				
				
				float vOffset=-20f;
				pathLength = pathEnd - pathStart;
				float textHeight = messagePaint.getFontSpacing();
				
				//vOffset = (pathLength - textHeight) / 2;
				vOffset = (pathLength - textHeight) / 2f - textHeight / 4f;  // 可微調 -¼ 避免偏上或偏下
				
				//int slotHeight = blockHeight * (symbols);
				//float vOffset = -slotHeight / 2f + dpToPixel(10);
				
				
				
				boolean isPortrait = getHeight() > getWidth();  // 判斷是否為豎屏
				if (isPortrait) {
					//ToastMessage.show("isPortrait");
					
					vOffset = GeneralVariables.isFT4 ? -180f : -60f;  // 豎屏：往上更多
				} else {
					//ToastMessage.show("not isPortrait");
					//vOffset = GeneralVariables.isFT4 ? -155f : -20f;   // 橫屏：原本設定 🔧 可調整，值越小越往上
					//vOffset = GeneralVariables.isFT4 ? -180f : -20f;   // 橫屏：原本設定 🔧 可調整，值越小越往上
					vOffset = GeneralVariables.isFT4 ? -20f : -20f;   // 橫屏：原本設定 🔧 可調整，值越小越往上
				}
				

				if (showMessageBackground) {
					_canvas.drawTextOnPath(msg.getMessageText(true), path, vOffset, 0, messagePaintBack);
				}

//                _canvas.drawTextOnPath(msg.getMessageText(true), path
//                        , 0, 0, messagePaintBack);//消息背景
                _canvas.drawTextOnPath(msg.getMessageText(true), path
                        , vOffset, 0, messagePaint);//消息
                if (GeneralVariables.checkQSLCallsign(msg.getCallsignFrom())) {//画删除线
                    float text_len = messagePaint.measureText(msg.getMessageText(true));
                    float text_start = ((pathEnd- pathStart)-text_len)/2;
                    float text_high =dpToPixel(4);//messagePaint.getFontSpacing()/2;
                    _canvas.drawLine(msg.freq_hz * freq_width + text_high , text_start+vOffset
                            , msg.freq_hz * freq_width + text_high, text_len + text_start+vOffset, textLinePaint);
                }
            }
        }


    }

    public void setTouch_x(int touch_x) {
        this.touch_x = touch_x;
    }

    public void setDrawMessage(boolean drawMessage) {
        this.drawMessage = drawMessage;
    }

    public int getFreq_hz() {
        return freq_hz;
    }
}
