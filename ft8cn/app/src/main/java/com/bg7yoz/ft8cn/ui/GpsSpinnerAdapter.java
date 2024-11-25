package com.bg7yoz.ft8cn.ui;
/**
 * GPS精確度界面
 * @author BV6LC
 * @date 2024-11-25
 */

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.bg7yoz.ft8cn.R;


public class GpsSpinnerAdapter extends BaseAdapter {
    private final Context mContext;
    private final int[] gpsLeves= {0,1,2,3};
    private final String[] gpsLevesStr= {"Low","Medium","High","Ultra High"};
    public GpsSpinnerAdapter(Context context) {
        mContext=context;
    }

    @Override
    public int getCount() {
        return gpsLeves.length;
    }

    @Override
    public Object getItem(int i) {
        return gpsLeves[i];
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
            textView.setText(gpsLevesStr[i]);
        }
        return view;
    }
    public int getPosition(int i){
        for (int j = 0; j < gpsLeves.length; j++) {
            if (gpsLeves[j]==i){
                return j;
            }
        }
        return 0;
    }
    public int getValue(int position){
        return gpsLeves[position];
    }
}
