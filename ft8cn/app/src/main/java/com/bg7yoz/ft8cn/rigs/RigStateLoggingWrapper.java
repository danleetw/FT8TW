package com.bg7yoz.ft8cn.rigs;

import android.util.Log;
import com.bg7yoz.ft8cn.LogExt;
import com.bg7yoz.ft8cn.GeneralVariables;

public class RigStateLoggingWrapper implements OnRigStateChanged {
    private final OnRigStateChanged delegate;
    private static final String TAG = "RigStateLog";
    
    public RigStateLoggingWrapper(OnRigStateChanged delegate) {
        this.delegate = delegate;
    }
    
    @Override
    public void onFreqChanged(long freq) {
        // 統一的日志記錄 - 這是你想要的功能
        LogExt.d(TAG, "Frequency changed to: " + freq + " Hz");
        //GeneralVariables.sendToSSE("Freq: " + freq + " Hz");
        
        // 調用原始實現
        if (delegate != null) {
            delegate.onFreqChanged(freq);
        }
    }
    
    @Override
    public void onConnected() {
        LogExt.i(TAG, "Rig connected");
        //GeneralVariables.sendToSSE("Rig connected");
        if (delegate != null) {
            delegate.onConnected();
        }
    }
    
    @Override
    public void onDisconnected() {
        LogExt.i(TAG, "Rig disconnected");
        //GeneralVariables.sendToSSE("Rig disconnected");
        if (delegate != null) {
            delegate.onDisconnected();
        }
    }
    
    @Override
    public void onPttChanged(boolean isOn) {
        String status = isOn ? "ON" : "OFF";
        LogExt.d(TAG, "PTT changed to: " + status);
        //GeneralVariables.sendToSSE("PTT: " + status);
        if (delegate != null) {
            delegate.onPttChanged(isOn);
        }
    }
    
    @Override
    public void onRunError(String message) {
        LogExt.e(TAG, "Rig error: " + message);
        //GeneralVariables.sendToSSE("Error: " + message);
        if (delegate != null) {
            delegate.onRunError(message);
        }
    }
}