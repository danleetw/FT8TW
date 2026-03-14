// SpectrumRenderOptions.java
package com.bg7yoz.ft8cn.ui;

public class SpectrumRenderOptions {
    public boolean simpleMode = false;
    public boolean showWaterfall = true;
    public boolean showGrid = true;
    public int fftSkip = 1; // 1=完整, 2=每2筆畫1次


	
	public static SpectrumRenderOptions simple() {
        SpectrumRenderOptions o = new SpectrumRenderOptions();
        o.simpleMode = true;
        return o;
    }

    public static SpectrumRenderOptions full() {
        SpectrumRenderOptions o = new SpectrumRenderOptions();
        o.simpleMode = false;
        return o;
    }
	
	
	
}