package com.bg7yoz.ft8cn.ui;

import android.app.Dialog;
import android.content.Context;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.lifecycle.Observer;

import com.bg7yoz.ft8cn.MainViewModel;
import com.bg7yoz.ft8cn.R;

import androidx.lifecycle.LifecycleOwner;
import androidx.lifecycle.Observer;
import androidx.activity.ComponentActivity;

public class ShareLogsProgressDialog extends Dialog {
    private static final String TAG = "ShareLogsProgressDialog";

    private final MainViewModel mainViewModel;
    private TextView shareDataInfoTextView,shareProgressTextView;
    private ProgressBar shareFileDataProgressBar;
    private final boolean isImportMode;
	
	private final LifecycleOwner owner; //增加 LifecycleOwner BV6LC
    //private final int progressMax;


    public ShareLogsProgressDialog(@NonNull ComponentActivity activity
            , MainViewModel projectsViewModel, boolean isImportMode) {
        super(activity , R.style.ShareProgressDialog);
		this.owner = activity;
		
        this.mainViewModel = projectsViewModel;
        this.isImportMode = isImportMode;
        //this.progressMax =progressMax;
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
		
        setContentView(R.layout.share_file_progress_dialog);
        setCancelable(false);//禁止点击旁边退出
		
        shareDataInfoTextView = findViewById(R.id.shareDataInfoTextView);
        shareProgressTextView = findViewById(R.id.shareProgressTextView);
        if (isImportMode){ //  依據模式設定標題
            shareProgressTextView.setText(R.string.share_import_log_data);
        }else {
            shareProgressTextView.setText(R.string.preparing_log_data);
        }

        shareFileDataProgressBar = findViewById(R.id.shareFileDataProgressBar);
        Button cancelShareButton = findViewById(R.id.cancelShareButton);

		/*
        mainViewModel.mutableShareInfo.observe(owner, s -> shareDataInfoTextView.setText(s));
            @Override
            public void onChanged(String s) {
                shareDataInfoTextView.setText(s);
            }
        });*/
		
		mainViewModel.mutableShareInfo
            .observe(owner, s -> shareDataInfoTextView.setText(s));
		
		
        /*mainViewModel.mutableSharePosition.observeForever(new Observer<Integer>() {
            @Override
            public void onChanged(Integer integer) {
                shareFileDataProgressBar.setProgress(integer);
            }
        });*/
		mainViewModel.mutableSharePosition
            .observe(owner, pos -> shareFileDataProgressBar.setProgress(pos));
			
			

        mainViewModel.mutableImportShareRunning.observeForever(new Observer<Boolean>() {
            @Override
            public void onChanged(Boolean aBoolean) {
                if (!aBoolean) {
                    dismiss();
                }
            }
        });

		/*
        mainViewModel.mutableShareRunning.observeForever(new Observer<Boolean>() {
            @Override
            public void onChanged(Boolean aBoolean) {
                if (!aBoolean) {
                    dismiss();
                }
            }
        });
		*/
		mainViewModel.mutableShareRunning
            .observe(owner, running -> { if (!running) dismiss(); });


		/*
        mainViewModel.mutableShareCount.observeForever(new Observer<Integer>() {
            @Override
            public void onChanged(Integer integer) {
                shareFileDataProgressBar.setMax(integer);
            }
        });*/
		
		mainViewModel.mutableShareCount
			.observe(owner, count -> shareFileDataProgressBar.setMax(count));
		
		mainViewModel.mutableImportShareRunning
            .observe(owner, running -> { if (!running) dismiss(); });
		



        cancelShareButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (isImportMode) {
                    mainViewModel.mutableImportShareRunning.postValue(false);
                } else {
                    mainViewModel.mutableShareRunning.postValue(false);
                }
            }
        });

    }
}
