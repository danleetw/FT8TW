package com.bg7yoz.ft8cn.ui;
/**
 * CQ 優先順序界面
 * @author BV6LC
 * @date 2024-12-14
 */

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.bg7yoz.ft8cn.R;


public class CqFilterSpinnerAdapter extends BaseAdapter {
    private final Context mContext;
    private final int[] cqFilterOpt= {0,1,2,3,4,5,6};
    //private final String[] cqFilterOptStr= {"0:ASAP","1:Grid(Far)","2:Grid(Near)","3:More(ITU/CQ/DX)Zone","4:ITU Zone","5:CQ Zone","6:Dx Zone"};
	private final String[] cqFilterOptStr;
	
    public CqFilterSpinnerAdapter(Context context) {
        mContext=context;
		cqFilterOptStr = context.getResources().getStringArray(R.array.cq_filter_opt_str_array);
    }

    @Override
    public int getCount() {
        return cqFilterOpt.length;
    }

    @Override
    public Object getItem(int i) {
        return cqFilterOpt[i];
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
            textView.setText(cqFilterOptStr[i]);
        }
        return view;
    }
    public int getPosition(int i){
        for (int j = 0; j < cqFilterOpt.length; j++) {
            if (cqFilterOpt[j]==i){
                return j;
            }
        }
        return 0;
    }
    public int getValue(int position){
        return cqFilterOpt[position];
    }
}
