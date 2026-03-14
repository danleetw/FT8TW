package com.bg7yoz.ft8cn.ui;
/**
 * FT8通联的6步列表。
 * @author BGY70Z
 * @date 2023-03-20
 */

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.bg7yoz.ft8cn.MainViewModel;
import com.bg7yoz.ft8cn.R;
import com.bg7yoz.ft8cn.ft8transmit.FunctionOfTransmit;

public class FunctionOrderSpinnerAdapter extends BaseAdapter {
    private Context mContext;
    private MainViewModel mainViewModel;

    public FunctionOrderSpinnerAdapter(Context context, MainViewModel mainViewModel) {
        this.mainViewModel = mainViewModel;
        mContext = context;
    }

    @Override
    public int getCount() {
		if (mainViewModel == null) return 0;
		if (mainViewModel.ft8TransmitSignal == null) return 0;
		if (mainViewModel.ft8TransmitSignal.functionList == null) return 0;
		
		
        return mainViewModel.ft8TransmitSignal.functionList.size();
    }

    @Override
    public Object getItem(int i) {
		if (mainViewModel == null
				|| mainViewModel.ft8TransmitSignal == null
				|| mainViewModel.ft8TransmitSignal.functionList == null) {
			return null;
		}
		if (i < 0 || i >= mainViewModel.ft8TransmitSignal.functionList.size()) {
			return null;
		}
		
		
		
        return mainViewModel.ft8TransmitSignal.functionList.get(i);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @SuppressLint({"ViewHolder", "InflateParams"})
    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
		
		if (mainViewModel == null
            || mainViewModel.ft8TransmitSignal == null
            || mainViewModel.ft8TransmitSignal.functionList == null
            || mainViewModel.ft8TransmitSignal.functionList.isEmpty()) 
			{
				TextView tv = new TextView(mContext);
				tv.setText("");
				return tv; // 保命用
				
				//return new View(mContext); // 保命用
			}
		int size = mainViewModel.ft8TransmitSignal.functionList.size();
		// ⭐⭐ 關鍵：防止 Spinner 傳進來舊 index
		if (i < 0 || i >= size) {
			i = 0;
		}
		
		
		
        LayoutInflater _LayoutInflater = LayoutInflater.from(mContext);
        FunctionOfTransmit function;
        function = mainViewModel.ft8TransmitSignal.functionList.get(i);
		
		
		

        //view = _LayoutInflater.inflate(R.layout.function_order_spinner_item, null);
		view = _LayoutInflater.inflate(
			R.layout.function_order_spinner_item,
			viewGroup,
			false
		);
		
		
		
		
        if (view != null) {
            TextView messageTextView = (TextView) view.findViewById(R.id.functionOrderItemTextView);
            messageTextView.setText(function.getFunctionMessage());
            TextView numTextView = (TextView) view.findViewById(R.id.functionNumItemTextView);
            numTextView.setText(String.valueOf(function.getFunctionOrder()));

//            ImageView completedImageView = (ImageView) view.findViewById(R.id.functionCompletedImageView);

            ImageView currentImageView=(ImageView) view.findViewById(R.id.currentOrderImageView);
            if (function.isCurrentOrder()){
                currentImageView.setVisibility(View.VISIBLE);
            }else {
                currentImageView.setVisibility(View.INVISIBLE);
            }

//            if (function.isCompleted()) {
//                completedImageView.setVisibility(View.VISIBLE);
//            } else {
//                completedImageView.setVisibility(View.GONE);
//            }

        }
        return view;
    }

}
