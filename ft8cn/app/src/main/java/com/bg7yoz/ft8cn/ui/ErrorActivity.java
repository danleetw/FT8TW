/**
 * ErrorActivity 類別，用來將讓使用者可以查看錯誤訊息
 * @author BV6LC
 * @date 2025/1/1
 * @date 2025/7/1 取消透過Email寄送，避免Google偵測到有Email字樣
 */


package com.bg7yoz.ft8cn.ui;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;

import android.content.Intent;
import android.content.Context;
import android.content.ClipData;
import android.content.ClipboardManager;

import android.widget.TextView;
import android.widget.Button;
import android.widget.Toast;
import android.view.View;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;


import com.bg7yoz.ft8cn.R;
import com.bg7yoz.ft8cn.MainActivity;

import com.bg7yoz.ft8cn.GeneralVariables;

public class ErrorActivity extends AppCompatActivity {
	
	private String errorMessage = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
		//Log.i("ErrorActivity", "收到的 error_message: " + getIntent().getStringExtra("error_message"));
		Log.i("ErrorActivity", "收到的錯誤檔案路徑: " + getIntent().getStringExtra("error_log_path"));
        setContentView(R.layout.activity_error);


		// 提示訊息
        TextView errorTitle = findViewById(R.id.errorTitle);
		
		//String errorMessage = getIntent().getStringExtra("error_title");
		
        //errorTitle.setText(getString(R.string.error_title)); // 從資源檔獲取多語言訊息
		errorTitle.setText(getIntent().getStringExtra("error_title")); // 從資源檔獲取多語言訊息
		
		// 獲取傳遞的錯誤訊息
		TextView errorTextView = findViewById(R.id.errorTextView);
		errorTextView.setMovementMethod(new android.text.method.ScrollingMovementMethod());

		
		String filePath = getIntent().getStringExtra("error_log_path"); // ← 從 Intent 取得檔案路徑
		if (filePath != null) {
			StringBuilder logBuilder = new StringBuilder();
			try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
				String line;
				while ((line = reader.readLine()) != null) {
					logBuilder.append(line).append("\n");
				}
				errorMessage = logBuilder.toString();
			} catch (IOException e) {
				errorMessage = "讀取錯誤訊息失敗：" + e.getMessage();
			}
		} else {
			errorMessage = "未收到錯誤日誌路徑。";
		}
		
		if (errorMessage == null || errorMessage.trim().isEmpty()) {
			errorMessage = "Great news!!\n\rNo crash records found.\n\r73 DE BV6LC";
		}

		errorTextView.setText(errorMessage);  // 顯示錯誤內容

        // 按鈕：複製錯誤訊息
        Button copyButton = findViewById(R.id.copyButton);
        copyButton.setOnClickListener(v -> {
            ClipboardManager clipboard = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
            ClipData clip = ClipData.newPlainText("Error Message", errorMessage);
            clipboard.setPrimaryClip(clip);
            Toast.makeText(this, R.string.copy_success, Toast.LENGTH_SHORT).show();
        });


		// 按鈕：重啟程式
		Button restartButton = findViewById(R.id.restartButton);
		restartButton.setOnClickListener(v -> {
			Intent intent = new Intent(this, MainActivity.class);
			//Intent intent = new Intent(this, com.bg7yoz.ft8cn.MainActivity.class);
			intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_NEW_TASK);
			startActivity(intent);
			finish();
		});

		// 按鈕：結束程式
		Button exitButton = findViewById(R.id.exitButton);
		exitButton.setOnClickListener(v -> {
			Toast.makeText(this, "Application is closing", Toast.LENGTH_SHORT).show();
			finishAffinity(); // 關閉所有活動
			System.exit(0);   // 終止應用程式
		});
		
		// 按鈕：Clear Log
		Button ClearButton = findViewById(R.id.ClearButton);
		ClearButton.setOnClickListener(v -> {
			Toast.makeText(this, "Clear error message", Toast.LENGTH_SHORT).show();
			GeneralVariables.clearLogFile();

			// 顯示錯誤訊息
			errorTextView.setText("");
			
			
			//finishAffinity(); // 關閉所有活動
			//System.exit(0);   // 終止應用程式
		});
		
		
		
		if( "1".equals(getIntent().getStringExtra("debug")) ) // 傳入0為當機畫面
		{
			restartButton.setVisibility(View.GONE); // 隱藏但保留位置
			exitButton.setVisibility(View.GONE);
		}

        //// 提供回報按鈕
        //Button reportButton = findViewById(R.id.reportButton);
        //reportButton.setOnClickListener(v -> {
        //    // 將錯誤訊息發送給開發者
        //    sendErrorReport(errorMessage);
        //});
    }

	/*
    private void sendErrorReport(String errorMessage) { //取消用Email寄送
        Intent emailIntent = new Intent(Intent.ACTION_SEND);
        emailIntent.setType("text/plain");
        emailIntent.putExtra(Intent.EXTRA_EMAIL, new String[]{"developer@example.com"});
        emailIntent.putExtra(Intent.EXTRA_SUBJECT, "App Crash Report");
        emailIntent.putExtra(Intent.EXTRA_TEXT, errorMessage);

        try {
            startActivity(Intent.createChooser(emailIntent, "Send email..."));
        } catch (android.content.ActivityNotFoundException ex) {
            Toast.makeText(this, "No email clients installed.", Toast.LENGTH_SHORT).show();
        }
    }
	*/
}