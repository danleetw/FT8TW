package com.bg7yoz.ft8cn.ui;
/**
 * DeCodeMode 解碼模式界面
 * @author BV6LC
 * @date 2025-09-12
 */

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.bg7yoz.ft8cn.R;


public class DecodeModeSpinnerAdapter extends BaseAdapter {
    private final Context mContext;
    private final int[] deCodeModeOpt= {0,1,2};
    private final String[] deCodeModeOptStr; // 快速解碼（少量）", "平衡模式（預設）", "深度解碼（最多）
    public DecodeModeSpinnerAdapter(Context context) {
        mContext=context;
		deCodeModeOptStr = context.getResources().getStringArray(R.array.decode_mode_str_array);
    }

    @Override
    public int getCount() {
        return deCodeModeOpt.length;
    }

    @Override
    public Object getItem(int i) {
        return deCodeModeOpt[i];
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @SuppressLint({"ViewHolder", "InflateParams"})
    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        LayoutInflater _LayoutInflater=LayoutInflater.from(mContext);
        view=_LayoutInflater.inflate(R.layout.gps_spinner_item, null);
        if (view!=null){
            TextView textView=(TextView)view.findViewById(R.id.gpsItemTextView);
            textView.setText(deCodeModeOptStr[i]);
        }
        return view;
    }
    public int getPosition(int i){
        for (int j = 0; j < deCodeModeOpt.length; j++) {
            if (deCodeModeOpt[j]==i){
                return j;
            }
        }
        return 0;
    }
    public int getValue(int position){
        return deCodeModeOpt[position];
    }
}
