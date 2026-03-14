package com.bg7yoz.ft8cn;

import android.Manifest;
import android.app.Activity;
import android.content.DialogInterface;
import android.content.pm.PackageManager;
import android.os.Build;

import androidx.appcompat.app.AlertDialog;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.util.Log;

import java.util.ArrayList;
import java.util.List;



public class PermissionManager {
	private static final String TAG = "[PermissionManager]";
	
    private static final int PERMISSION_REQUEST_CODE = 1001;

    private Activity activity;
    private PermissionCallback callback;

    public PermissionManager(Activity activity) {
        this.activity = activity;
    }

    // 定義你的所有權限
    public String[] getRequiredPermissions() {
        List<String> permissionList = new ArrayList<>();

        permissionList.add(Manifest.permission.RECORD_AUDIO);
        permissionList.add(Manifest.permission.ACCESS_FINE_LOCATION);
        permissionList.add(Manifest.permission.ACCESS_COARSE_LOCATION);
        // 以下兩個不需要動態授權，但仍需在 Manifest 宣告
        permissionList.add(Manifest.permission.MODIFY_AUDIO_SETTINGS);
        permissionList.add(Manifest.permission.WAKE_LOCK);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            permissionList.add(Manifest.permission.BLUETOOTH_CONNECT);
            permissionList.add(Manifest.permission.BLUETOOTH_SCAN);
        }
		
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            permissionList.add(Manifest.permission.NEARBY_WIFI_DEVICES);
        }

        return permissionList.toArray(new String[0]);
    }

    // 檢查目前還缺哪些權限
    private String[] getDeniedPermissions() {
        List<String> deniedList = new ArrayList<>();

        for (String permission : getRequiredPermissions()) {
			Log.d(TAG, "需要的權限: " + permission);
            if (!isRuntimePermission(permission)) {
                continue;
            }
            if (ContextCompat.checkSelfPermission(activity, permission) != PackageManager.PERMISSION_GRANTED) {
				Log.d(TAG, "需要申請的權限: " + permission);
                deniedList.add(permission);
            }
        }
        return deniedList.toArray(new String[0]);
    }

    // 判斷是否為需要動態授權的權限
    private boolean isRuntimePermission(String permission) {
        return !(permission.equals(Manifest.permission.MODIFY_AUDIO_SETTINGS)
                || permission.equals(Manifest.permission.WAKE_LOCK));
    }

    // 外部呼叫：開始檢查並申請權限
    public void checkAndRequestPermissions(PermissionCallback callback) {
        this.callback = callback;

        String[] deniedPermissions = getDeniedPermissions();

        if (deniedPermissions.length == 0) {
            callback.onPermissionGranted();
        } else {
            ActivityCompat.requestPermissions(activity, deniedPermissions, PERMISSION_REQUEST_CODE);
        }
    }

    // Activity 的 onRequestPermissionsResult 直接呼叫這個
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        if (requestCode == PERMISSION_REQUEST_CODE) {
            String[] deniedPermissions = getDeniedPermissions();
            if (deniedPermissions.length == 0) {
                callback.onPermissionGranted();
            } else {
                showPermissionDeniedDialog();
            }
        }
    }

    private void showPermissionDeniedDialog() {
        new AlertDialog.Builder(activity)
                .setTitle("Permission is required")
                .setMessage("Please grant all required permissions to use this application properly.")
                .setCancelable(false)
                .setPositiveButton("Close", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        activity.finish();
                    }
                })
                .show();
    }

    // 定義 callback 介面
    public interface PermissionCallback {
        void onPermissionGranted();
    }
}
