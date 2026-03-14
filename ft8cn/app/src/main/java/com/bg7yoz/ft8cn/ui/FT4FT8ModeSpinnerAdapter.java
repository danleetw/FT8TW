package com.bg7yoz.ft8cn.ui;
/**
 * FT4/FT8 MODE選單 解碼模式界面
 * @author BV6LC
 * @date 2025-09-16
 */

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.bg7yoz.ft8cn.R;


public class FT4FT8ModeSpinnerAdapter extends BaseAdapter {
    private final Context mContext;
    private final int[] FT4FT8ModeOpt= {0,1};
    private final String[] FT4FT8ModeOptStr; // FT4/FT8
    public FT4FT8ModeSpinnerAdapter(Context context) {
        mContext=context;
		FT4FT8ModeOptStr = context.getResources().getStringArray(R.array.ft4ft8_mode_str_array);
    }

    @Override
    public int getCount() {
        return FT4FT8ModeOpt.length;
    }

    @Override
    public Object getItem(int i) {
        return FT4FT8ModeOpt[i];
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
            textView.setText(FT4FT8ModeOptStr[i]);
        }
        return view;
    }
    public int getPosition(int i){
        for (int j = 0; j < FT4FT8ModeOpt.length; j++) {
            if (FT4FT8ModeOpt[j]==i){
                return j;
            }
        }
        return 0;
    }
    public int getValue(int position){
        return FT4FT8ModeOpt[position];
    }
}
