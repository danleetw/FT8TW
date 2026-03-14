package com.bg7yoz.ft8cn.util;


import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.List;


public class MemoryWatch {
    private static final String TAG = "MemoryWatch";
    private static final double THRESHOLD = 0.80;
	
	private static final List<TrackedItem> trackedItems = new ArrayList<>();
    private static final Handler handler = new Handler(Looper.getMainLooper());
	private static double minUse=100.0;
	private static double maxUse=0.01;
	
	

    public static void check() {
        Runtime rt = Runtime.getRuntime();
        long used = rt.totalMemory() - rt.freeMemory();
        long max = rt.maxMemory();
        double ratio = (double) used / max;

        // ✅ 把這兩個變數移到 if 外層，讓下面也能用
        long usedMB = used / (1024 * 1024);
        long maxMB = max / (1024 * 1024);
		if (ratio>maxUse)
			maxUse=ratio;
		if (ratio<minUse)
			minUse=ratio;
		

        if (ratio > THRESHOLD) {
            Log.w(TAG, String.format("--------------------記憶體警戒：%.1f%% 已用，使用 %dMB / 總共 %dMB，觸發 GC", ratio * 100, usedMB, maxMB));
            System.gc(); // 嘗試回收記憶體
        } else {
            //Log.i(TAG, String.format("記憶體狀況：%.1f%% 已用，使用 %dMB / 總共 %dMB (min %.1f%%/ max %.1f%%)", ratio * 100, usedMB, maxMB,minUse*100,maxUse*100));
        }
    }
	
	
	private static class TrackedItem {
        final String name;
        final WeakReference<Object> ref;

        TrackedItem(String name, Object obj) {
            this.name = name;
            this.ref = new WeakReference<>(obj);
        }
    }
	
	/**
     * 註冊要追蹤的物件
     */
    public static void track(String name, Object obj) {
        trackedItems.add(new TrackedItem(name, obj));
        Log.d(TAG, "Tracking: " + name);
        checkLeaksDelayed();
    }
	
	    /**
     * 延遲檢查記憶體釋放狀況（例如 fragment 銷毀後 5 秒）
     */
    private static void checkLeaksDelayed() {
        handler.postDelayed(() -> {
            for (TrackedItem item : trackedItems) {
                if (item.ref.get() != null) {
                    Log.w(TAG, "Memory Leak Detected: " + item.name + " still alive.");
                } else {
                    Log.d(TAG, "Released: " + item.name);
                }
            }
        }, 5000);
    }
	
	
}