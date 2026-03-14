package com.bg7yoz.ft8cn;

import android.app.Activity;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.hardware.usb.UsbDevice;
import android.hardware.usb.UsbManager;
import android.util.Log;

public class UsbPermissionManager {
    private static final String TAG = "UsbPermissionManager";
    private static final String ACTION_USB_PERMISSION = "com.bg7yoz.ft8cn.USB_PERMISSION";

    private final Activity activity;
    private final UsbPermissionCallback callback;
    private final UsbManager usbManager;

    public UsbPermissionManager(Activity activity, UsbPermissionCallback callback) {
        this.activity = activity;
        this.callback = callback;
        this.usbManager = (UsbManager) activity.getSystemService(Context.USB_SERVICE);
        registerReceiver();
    }

    public void requestUsbPermission(UsbDevice device) {
        if (usbManager.hasPermission(device)) {
            callback.onUsbPermissionGranted(device);
        } else {
            PendingIntent permissionIntent = PendingIntent.getBroadcast(activity, 0,
                    new Intent(ACTION_USB_PERMISSION), PendingIntent.FLAG_IMMUTABLE);
            usbManager.requestPermission(device, permissionIntent);
        }
    }

    private void registerReceiver() {
        IntentFilter filter = new IntentFilter(ACTION_USB_PERMISSION);
        activity.registerReceiver(usbReceiver, filter);
    }

    public void unregisterReceiver() {
        activity.unregisterReceiver(usbReceiver);
    }

    private final BroadcastReceiver usbReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            if (ACTION_USB_PERMISSION.equals(intent.getAction())) {
                synchronized (this) {
                    UsbDevice device = intent.getParcelableExtra(UsbManager.EXTRA_DEVICE);
                    if (intent.getBooleanExtra(UsbManager.EXTRA_PERMISSION_GRANTED, false)) {
                        Log.d(TAG, "USB權限已授予: " + device);
                        callback.onUsbPermissionGranted(device);
                    } else {
                        Log.d(TAG, "USB權限被拒絕: " + device);
                        callback.onUsbPermissionDenied(device);
                    }
                }
            }
        }
    };

    public interface UsbPermissionCallback {
        void onUsbPermissionGranted(UsbDevice device);
        void onUsbPermissionDenied(UsbDevice device);
    }
}
