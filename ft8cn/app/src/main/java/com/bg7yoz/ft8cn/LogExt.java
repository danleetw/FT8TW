package com.bg7yoz.ft8cn;

import android.util.Log;

public class LogExt {
	
	public static void d(String tag, String message) { //Debug
		Log.d(tag, message);
		GeneralVariables.sendToSSE(tag , "D", "🐛 " + message);
	}

	
    public static void e(String tag, String message) { // Error
        Log.e(tag, message);
        GeneralVariables.sendToSSE(tag , "E", "❌ " + message);
    }

    public static void e(String tag, String message, Throwable throwable) { // Error
        Log.e(tag, message, throwable);
        String fullMessage = message + "\n" + Log.getStackTraceString(throwable);
        GeneralVariables.sendToSSE(tag , "E", "❌ " + fullMessage);
    }
	
	public static void i(String tag, String message) { //Information
		Log.i(tag, message);
		GeneralVariables.sendToSSE(tag , "I", "ℹ️ " + message);
	}
	

    // 如果有需要也可以加 d(), i(), w(), v()
}