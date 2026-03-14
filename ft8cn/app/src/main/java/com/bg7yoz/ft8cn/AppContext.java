package com.bg7yoz.ft8cn;

import android.app.Application;
import android.content.Context;
import com.bg7yoz.ft8cn.utils.CrashHandler;

public class AppContext extends Application {
    private static Context context;

    public void onCreate() {
        super.onCreate();
        AppContext.context = getApplicationContext();
		CrashHandler.init(this);
    }

    public static Context getContext() {
        return AppContext.context;
    }
	

	
}