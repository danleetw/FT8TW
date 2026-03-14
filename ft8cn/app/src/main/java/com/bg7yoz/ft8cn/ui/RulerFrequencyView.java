package com.bg7yoz.ft8cn.ui;
/**
 * 频率标尺，自定义控件。
 * @author BGY70Z
 * @date 2023-03-20
 */

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.Color; // ✅ 新增


import android.util.AttributeSet;
import android.util.TypedValue;
import android.view.View;

import androidx.annotation.Nullable;

import com.bg7yoz.ft8cn.GeneralVariables;

public class RulerFrequencyView extends View {
    private static final String TAG = "RulerFrequencyView";
    private int rulerWidth = getWidth();
    private int freq = 1000;

    public RulerFrequencyView(Context context) {
        super(context);
    }

    public RulerFrequencyView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
    }

    public RulerFrequencyView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        //Log.d(TAG, String.format("onDraw: rulerWidth:%d,getWidth:%d", rulerWidth, getWidth()));
        drawRuler(canvas);
        super.onDraw(canvas);
    }

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
        //Log.d(TAG, String.format("onSizeChanged: rulerWidth:%d,getWidth:%d", w, getWidth()));
        rulerWidth = w;
        super.onSizeChanged(w, h, oldw, oldh);
    }

    @SuppressLint({"DefaultLocale", "ResourceAsColor"})
    public void drawRuler(Canvas canvas) {
        int top = 1;
        //rulerWidth=getRight();
        int width_rate = Math.round((float) rulerWidth / 30f);
        int lineWidth = (int) (getResources().getDisplayMetrics().density);
        int lineHeight = (int) (2 * getResources().getDisplayMetrics().density);
        Rect rect = new Rect();
        Paint paint = new Paint();
        paint.setColor(0xff00ffff);
        for (int i = 0; i <= 300; i++) {
            if (i % 1 == 0) {
                rect.top = top;
                rect.left = Math.round((float) i * width_rate);
                rect.right = rect.left + lineWidth;
                if (i % 5 == 0) {
                    rect.bottom = top + lineHeight * 3;
                    Paint fontPaint = new Paint();
                    fontPaint.setTextSize(dpToPixel(8));
                    fontPaint.setColor(0xff00ffff);
                    fontPaint.setAntiAlias(true);
                    fontPaint.setDither(true);
                    if (i == 0) {
                        fontPaint.setTextAlign(Paint.Align.LEFT);
                    } else if (i == 300) {
                        fontPaint.setTextAlign(Paint.Align.RIGHT);
                    } else {
                        fontPaint.setTextAlign(Paint.Align.CENTER);
                    }
                    canvas.drawText(String.format("%dHz", i * 100), rect.left
                            , rect.bottom + 8 * getResources().getDisplayMetrics().density
                            , fontPaint);

                } else {
                    rect.bottom = top + lineHeight;
                }
                canvas.drawRect(rect, paint);

            }
        }
        //主线
        rect.top = 1;
        rect.left = 0;
        rect.right = rulerWidth;
        rect.bottom = (int) (rect.top + 2*getResources().getDisplayMetrics().density);
        canvas.drawRect(rect, paint);

        //当前频率范围标记。红色块
        Rect mark = new Rect();
        paint.setColor(0xffff0000);
        mark.top = 1;
        mark.left = width_rate * (freq - 50) / 100;
        mark.right = width_rate * (freq + 50) / 100;
        mark.bottom = (int) (mark.top + 3*getResources().getDisplayMetrics().density);
        canvas.drawRect(mark, paint);
		
		
		
		
		// === 安全範圍半透明綠區 ===
        Paint zonePaint = new Paint();
        zonePaint.setColor(Color.GREEN);
        zonePaint.setAlpha(60);  // 半透明 (0~255)
        zonePaint.setStyle(Paint.Style.FILL);

        boolean isFT4 = GeneralVariables.isFT4; // 判斷目前模式

        //int safeStartHz   = isFT4 ? 1200 : 1000;
        //int safeEndHz   = isFT4 ? 1800 : 2000;
		
		//int safeEndHz = isFT4 ? 400 : 200;
        //int safeEndHz   = isFT4 ? 2200 : 2500;
		
		int safeStartHz = isFT4 ? 1200 : 1000;
        int safeEndHz   = isFT4 ? 1800 : 2000;

        int cautionStartHz = isFT4 ? 400 : 400;
        int cautionEndHz   = isFT4 ? 2600 : 2600;
		
		
		
		
		
        // === Hz → 畫面座標 ===
        int safeStartX = width_rate * (safeStartHz / 100);
        int safeEndX   = width_rate * (safeEndHz / 100);
        int cautionStartX = width_rate * (cautionStartHz / 100);
        int cautionEndX   = width_rate * (cautionEndHz / 100);
		
		// === 畫黃色外側半透明警示區 ===
        Paint cautionPaint = new Paint();
        cautionPaint.setColor(Color.YELLOW);
        cautionPaint.setAlpha(45);
        cautionPaint.setStyle(Paint.Style.FILL);

        // 左側區
        Rect leftCaution = new Rect(cautionStartX, 0, safeStartX, getHeight());
        canvas.drawRect(leftCaution, cautionPaint);
        // 右側區
        Rect rightCaution = new Rect(safeEndX, 0, cautionEndX, getHeight());
        canvas.drawRect(rightCaution, cautionPaint);

        // === 畫中間綠色安全區 ===
        Paint safePaint = new Paint();
        safePaint.setColor(Color.GREEN);
        safePaint.setAlpha(70);
        safePaint.setStyle(Paint.Style.FILL);
        Rect safeZone = new Rect(safeStartX, 0, safeEndX, getHeight());
        canvas.drawRect(safeZone, safePaint);
		
		
		

    }

    public void setFreq(int freq) {
        this.freq = freq;
        this.postInvalidate();
    }
}
