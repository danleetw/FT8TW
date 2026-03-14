package com.bg7yoz.ft8cn.utils;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.bg7yoz.ft8cn.GeneralVariables;
import com.bg7yoz.ft8cn.ui.ErrorActivity;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

public class CrashHandler implements Thread.UncaughtExceptionHandler {

    private static final String TAG = "CrashHandler";
    private static CrashHandler instance = null;
    private Context context;
    private Thread.UncaughtExceptionHandler defaultHandler;

    private CrashHandler(Context context) {
        this.context = context.getApplicationContext();
    }

    public static void init(Context context) {
        if (instance == null) {
            instance = new CrashHandler(context);
            instance.defaultHandler = Thread.getDefaultUncaughtExceptionHandler();
            Thread.setDefaultUncaughtExceptionHandler(instance);
        }
    }

    @Override
    public void uncaughtException(Thread thread, Throwable ex) {
        try {
            String logContent = collectExceptionInfo(ex);
            GeneralVariables.writeErrorLog(context, logContent);
        } catch (Throwable t) {
            Log.e(TAG, "寫入Log時失敗", t);
        }

        try {
            String fullLog = GeneralVariables.readErrorLog(context);
            Intent intent = new Intent(context, ErrorActivity.class);
            intent.putExtra("error_message", fullLog);
            intent.putExtra("error_title", context.getString(com.bg7yoz.ft8cn.R.string.error_title));
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(intent);
        } catch (Throwable t) {
            Log.e(TAG, "跳轉ErrorActivity失敗", t);
        }

        // 關閉App，避免死循環
        android.os.Process.killProcess(android.os.Process.myPid());
        System.exit(1);
    }

    private String collectExceptionInfo(Throwable ex) {
        StringWriter sw = new StringWriter();
        ex.printStackTrace(new PrintWriter(sw));
        String stackTrace = sw.toString();

        // 只取前1000字，避免太長
		int maxLength = 10000;
        if (stackTrace.length() > maxLength) {
            stackTrace = stackTrace.substring(0, 1000) + "\n...(略)...";
        }

        String time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
        return "\n" + time + "\n" +
                "--------------------\n" +
                stackTrace +
                "\n--------------------\n";
    }
}