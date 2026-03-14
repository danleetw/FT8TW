package com.bg7yoz.ft8cn.ui;
/**
 * 消息列表Adapter。使用此Adapter有解码界面、呼叫界面、网格追踪界面。
 * 不同周期背景不同。为了区分，共有4种背景颜色。
 * @author BGY70Z
 * @date 2023-03-20
 * @date 2025-11-11 BV6LC
 * 通訊紀錄清單顯示
 */

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Paint;
import android.view.ContextMenu;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.recyclerview.widget.RecyclerView;

import android.view.GestureDetector;
import android.view.MotionEvent;


import com.bg7yoz.ft8cn.Ft8Message;
import com.bg7yoz.ft8cn.GeneralVariables;
import com.bg7yoz.ft8cn.MainViewModel;
import com.bg7yoz.ft8cn.R;
import com.bg7yoz.ft8cn.maidenhead.MaidenheadGrid;
import com.bg7yoz.ft8cn.rigs.BaseRigOperation;
import com.bg7yoz.ft8cn.timer.UtcTimer;

import com.bg7yoz.ft8cn.callsign.OnAfterQueryCallsignLocation;
import com.bg7yoz.ft8cn.callsign.CallsignInfo;

import java.util.ArrayList;

//import android.util.Log; // BV6LC Test
import com.bg7yoz.ft8cn.LogExt;

import android.graphics.Color;


//import androidx.cardview.widget.CardView;
import com.google.android.material.card.MaterialCardView;

import android.widget.FrameLayout;
import android.view.Gravity;
import android.widget.LinearLayout;

import android.graphics.Typeface;


import androidx.fragment.app.FragmentActivity;
import androidx.fragment.app.Fragment;

import android.widget.PopupWindow;




import android.graphics.drawable.ColorDrawable;



import android.graphics.Shader;
import android.graphics.RenderEffect;
import android.app.Activity;

public class CallingListAdapter extends RecyclerView.Adapter<CallingListAdapter.CallingListItemHolder> {
    public enum ShowMode{CALLING_LIST,MY_CALLING,TRACKER}
    private static final String TAG = "CallingListAdapter";
    
    private  ArrayList<Ft8Message> ft8MessageArrayList;
	private MainViewModel mainViewModel;
    private Context context;

    private final ShowMode showMode;
    private View.OnClickListener onItemClickListener;


	@Override
	public void onViewRecycled(@NonNull CallingListItemHolder holder) {
		super.onViewRecycled(holder);
		//holder.callListCardView.setOnTouchListener(null);
		holder.callListCardView.setOnClickListener(null);
		//holder.callListCardView.setOnCreateContextMenuListener(null);
	}
	
	@Override
    public void onDetachedFromRecyclerView(@NonNull RecyclerView recyclerView) {
        super.onDetachedFromRecyclerView(recyclerView);
        onItemClickListener = null;
        // menuListener 是 final，无法置空；但在 onViewRecycled/Release 中已经解绑
    }





	private void buildPopupMenu(android.widget.PopupMenu popup, View view) {
		int position = (int) view.getTag();
		if (position == -1) return;
		if (position >= ft8MessageArrayList.size()) return;

		Ft8Message ft8Message = ft8MessageArrayList.get(position);

		// ==== 以下是你原來的按鈕邏輯 ====

		if (!ft8Message.getCallsignTo().contains("...")
				&& !GeneralVariables.checkIsMyCallsign(ft8Message.getCallsignTo())
				&& !(ft8Message.i3 == 0 && ft8Message.n3 == 0)) {

			if (!ft8Message.checkIsCQ()) {
				if (showMode == ShowMode.CALLING_LIST) {
					popup.getMenu().add(0, 0, 0,
						String.format(GeneralVariables.getStringFromResource(R.string.tracking_receiver),
							ft8Message.getCallsignTo(), ft8Message.toWhere)
					).setActionView(view);
				}

				if (!mainViewModel.ft8TransmitSignal.isSynFrequency()) { // 呼叫
					popup.getMenu().add(0, 1, 0,
						String.format(GeneralVariables.getStringFromResource(R.string.calling_receiver),
							ft8Message.getCallsignTo(), ft8Message.toWhere)
					).setActionView(view);
				}

				if (GeneralVariables.checkIsMyCallsign(ft8Message.getCallsignTo())) {
					popup.getMenu().add(0, 4, 0,
						String.format(GeneralVariables.getStringFromResource(R.string.reply_to),
							ft8Message.getCallsignFrom(), ft8Message.fromWhere)
					).setActionView(view);
				}

				if (showMode != ShowMode.TRACKER) {
					popup.getMenu().add(0, 5, 0,
						String.format(GeneralVariables.getStringFromResource(R.string.qsl_qrz_confirmation_s),
							ft8Message.getCallsignTo())
					).setActionView(view);
				}

				popup.getMenu().add(0, 7, 0,
					String.format(GeneralVariables.getStringFromResource(R.string.qsl_query_log_menu),
						ft8Message.getCallsignTo())
				).setActionView(view);
			}
		}

		if (!ft8Message.getCallsignFrom().contains("...")
				&& !GeneralVariables.checkIsMyCallsign(ft8Message.getCallsignFrom())
				&& !(ft8Message.i3 == 0 && ft8Message.n3 == 0)) {

			if (showMode == ShowMode.CALLING_LIST) {
				popup.getMenu().add(1, 2, 0,
					String.format(GeneralVariables.getStringFromResource(R.string.tracking),
						ft8Message.getCallsignFrom(), ft8Message.fromWhere)
				).setActionView(view);
			}

			popup.getMenu().add(1, 3, 0,
				String.format(GeneralVariables.getStringFromResource(R.string.calling),
					ft8Message.getCallsignFrom(), ft8Message.fromWhere)
			).setActionView(view);

			if (showMode != ShowMode.TRACKER) {
				popup.getMenu().add(1, 6, 0,
					String.format(GeneralVariables.getStringFromResource(R.string.qsl_qrz_confirmation_s),
						ft8Message.getCallsignFrom())
				).setActionView(view);
			}

			popup.getMenu().add(0, 8, 0,
				String.format(GeneralVariables.getStringFromResource(R.string.qsl_query_log_menu),
					ft8Message.getCallsignFrom())
			).setActionView(view);
		}
	}





	/*
    private final View.OnCreateContextMenuListener menuListener=new View.OnCreateContextMenuListener() {
        @Override
        public void onCreateContextMenu(ContextMenu contextMenu, View view, ContextMenu.ContextMenuInfo contextMenuInfo) {

            //view.setTag(ft8Message);//把消息对象传递给上一级界面
            int postion= (int) view.getTag();
            if (postion==-1) return;
            if (postion>ft8MessageArrayList.size()-1) return;
            Ft8Message ft8Message=ft8MessageArrayList.get(postion);

            //添加菜单的参数i1:组，i2:id值，i3:显示顺序
            if (!ft8Message.getCallsignTo().contains("...")//目标不能是自己
                    //&& !ft8Message.getCallsignTo().equals(GeneralVariables.myCallsign)
                    && !GeneralVariables.checkIsMyCallsign(ft8Message.getCallsignTo())
                    && !(ft8Message.i3==0&&ft8Message.n3==0)) {
                if (!ft8Message.checkIsCQ()) {
                    if (showMode==ShowMode.CALLING_LIST) {//在消息列表中就可以显示这个菜单了
                        contextMenu.add(0, 0, 0, String.format(
                                        GeneralVariables.getStringFromResource(R.string.tracking_receiver)
                                        , ft8Message.getCallsignTo(), ft8Message.toWhere))
                                .setActionView(view);
                    }
                    if (!mainViewModel.ft8TransmitSignal.isSynFrequency()) {//如果同频率的话，会与发送者同频，会影响发送者！！！
                        contextMenu.add(0, 1, 0, String.format(
                                        GeneralVariables.getStringFromResource(R.string.calling_receiver)
                                        , ft8Message.getCallsignTo(), ft8Message.toWhere))
                                .setActionView(view);
                    }
                    //说明是对我呼叫，加上回复菜单
                    //if (ft8Message.getCallsignTo().equals(GeneralVariables.myCallsign)) {
                    if (GeneralVariables.checkIsMyCallsign(ft8Message.getCallsignTo())) {
                        contextMenu.add(0, 4, 0, String.format(
                                        GeneralVariables.getStringFromResource(R.string.reply_to)
                                        , ft8Message.getCallsignFrom(), ft8Message.fromWhere))
                                .setActionView(view);

                    }
                    if (showMode!=ShowMode.TRACKER) {
                        contextMenu.add(0, 5, 0
                                , String.format(GeneralVariables.getStringFromResource(R.string.qsl_qrz_confirmation_s)
                                        , ft8Message.getCallsignTo())).setActionView(view);
                    }

                    //增加查询日志
                    contextMenu.add(0, 7, 0
                            , String.format(GeneralVariables.getStringFromResource(R.string.qsl_query_log_menu)
                                    , ft8Message.getCallsignTo())).setActionView(view);

                }
            }

            if (!ft8Message.getCallsignFrom().contains("...")
                    //&& !ft8Message.getCallsignFrom().equals(GeneralVariables.myCallsign)
                    && !GeneralVariables.checkIsMyCallsign(ft8Message.getCallsignFrom())
                    && !(ft8Message.i3==0&&ft8Message.n3==0)) {
                if (showMode==ShowMode.CALLING_LIST) {//在消息列表中就可以显示这个菜单了
                    contextMenu.add(1, 2, 0, String.format(
                                    GeneralVariables.getStringFromResource(R.string.tracking)
                                    , ft8Message.getCallsignFrom(), ft8Message.fromWhere))
                            .setActionView(view);
                }
                contextMenu.add(1, 3, 0, String.format(
                                GeneralVariables.getStringFromResource(R.string.calling)
                                , ft8Message.getCallsignFrom(), ft8Message.fromWhere))
                        .setActionView(view);
                if (showMode!=ShowMode.TRACKER) {
                    contextMenu.add(1, 6, 0
                            , String.format(GeneralVariables.getStringFromResource(R.string.qsl_qrz_confirmation_s)
                                    , ft8Message.getCallsignFrom())).setActionView(view);
                }

                //增加查询日志
                contextMenu.add(0, 8, 0
                        , String.format(GeneralVariables.getStringFromResource(R.string.qsl_query_log_menu)
                                , ft8Message.getCallsignFrom())).setActionView(view);
            }

        }
    };
	*/


    public CallingListAdapter(Context context, MainViewModel mainViewModel
            , ArrayList<Ft8Message> messages, ShowMode showMode) {
        this.mainViewModel = mainViewModel;
        //this.context = context;
		this.context = context.getApplicationContext(); 
        this.showMode=showMode;
        ft8MessageArrayList = messages;
    }

    @NonNull
    @Override
    public CallingListItemHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater = LayoutInflater.from(parent.getContext());
        View view ;
        if (GeneralVariables.simpleCallItemMode) {
            view = layoutInflater.inflate(R.layout.call_list_holder_simple_item, parent, false);
        }else {
            view = layoutInflater.inflate(R.layout.call_list_holder_item, parent, false);
        }
        //return new CallingListItemHolder(view,onItemClickListener,menuListener);
		return new CallingListItemHolder(view, onItemClickListener);
    }

    /**
     * 删除消息
     *
     * @param position 在列表中的位置
     */
    public void deleteMessage(int position) {
        if (position >= 0) {
            ft8MessageArrayList.remove(position);
        }
    }

    public Ft8Message getMessageByPosition(int position){
        if (ft8MessageArrayList==null) return null;
        if (position<0) return null;
        if (position>ft8MessageArrayList.size()-1) return null;
        return ft8MessageArrayList.get(position);
    }

    /**
     * 通过holder获取消息
     *
     * @param holder holder
     * @return ft8message
     */
    public Ft8Message getMessageByViewHolder(RecyclerView.ViewHolder holder) {
        if (holder.getAdapterPosition() == -1) {
            return null;
        }
        return ft8MessageArrayList.get(holder.getAdapterPosition());
    }

    @SuppressLint("ResourceAsColor")
    @Override
    public void onBindViewHolder(@NonNull CallingListItemHolder holder, int position) {
		
		//CardView cardView = holder.callListCardView;
		MaterialCardView cardView = holder.callListCardView;
		
		ViewGroup.MarginLayoutParams params =
			(ViewGroup.MarginLayoutParams) holder.callListCardView.getLayoutParams();
		
		
        //holder.callListHolderConstraintLayout.setTag(position);//设置layout的tag，为了识别消息的定位
		holder.callListCardView.setTag(position);
		holder.itemView.setTag(position);  // 🔴 新增
		
        holder.ft8Message = ft8MessageArrayList.get(position);
        holder.showMode = showMode;//确定是消息列表还是关注消息的列表
        holder.isSyncFreq = mainViewModel.ft8TransmitSignal.isSynFrequency();//如果同频发射，就不显示呼叫接收者


		String timeStr = UtcTimer.getTimeHHMMSS(holder.ft8Message.utcTime); // 回傳 003322
		if (timeStr.length() == 6) { // 改成00:33:22 BV6LC
			timeStr = timeStr.substring(0, 2) + ":" + timeStr.substring(2, 4) + ":" + timeStr.substring(4, 6);
		}
		holder.callingUtcTextView.setText(timeStr);
        //holder.callingUtcTextView.setText(UtcTimer.getTimeHHMMSS(holder.ft8Message.utcTime));
		
        //时序，包括颜色,
        holder.callingListSequenceTextView.setText(holder.ft8Message.getSequence() == 0 ? "0" : "1");
        holder.isWeakSignalImageView.setVisibility(holder.ft8Message.isWeakSignal ? View.VISIBLE:View.INVISIBLE);

        //if (showMode==ShowMode.MY_CALLING) {//在呼叫界面
        //    holder.callingListSequenceTextView.setTextColor(context.getColor(R.color.follow_call_text_color));
        //}


        //根据1分钟内的4个时序区分颜色
		if(GeneralVariables.darkModeSetting==1){ //淺色模式
			holder.callListDtTextView.setTextColor(Color.BLACK);
			
			switch (holder.ft8Message.getSequence4()) {
				case 0:
					holder.callListHolderConstraintLayout.setBackgroundResource(R.drawable.calling_list_cell_0_style);
					holder.callListCardView.setStrokeColor(Color.parseColor("#CCCCCC")); // 淺灰
					holder.callListCardView.setStrokeWidth(dpToPx(1)); // 預設 1dp，建議增加為 2 或 3
					break;
				case 1:
					holder.callListHolderConstraintLayout.setBackgroundResource(R.drawable.calling_list_cell_1_style);
					holder.callListCardView.setStrokeColor(Color.parseColor("#444444")); // 更深
					holder.callListCardView.setStrokeWidth(dpToPx(3)); // 預設 1dp，建議增加為 2 或 3
					break;
				case 2:
					holder.callListHolderConstraintLayout.setBackgroundResource(R.drawable.calling_list_cell_2_style);
					holder.callListCardView.setStrokeColor(Color.parseColor("#888888")); // 深灰
					holder.callListCardView.setStrokeWidth(dpToPx(1)); // 預設 1dp，建議增加為 2 或 3
					break;
				case 3:
					holder.callListHolderConstraintLayout.setBackgroundResource(R.drawable.calling_list_cell_3_style);
					holder.callListCardView.setStrokeColor(Color.parseColor("#444444")); // 中灰
					holder.callListCardView.setStrokeWidth(dpToPx(3)); // 預設 1dp，建議增加為 2 或 3
					break;
			}
		}
		else {
			holder.callListDtTextView.setTextColor(Color.WHITE);
			//holder.callListHolderConstraintLayout.setBackgroundColor(Color.BLACK); // 黑底
			//holder.callListHolderConstraintLayout.setBackgroundColor(Color.parseColor("#121212")); // 黑底
			//holder.callListHolderConstraintLayout.setBackgroundColor(Color.parseColor("#1E1E1E")); // 黑底
			//holder.callListHolderConstraintLayout.setBackgroundColor(Color.parseColor("#3A3A3A")); // 黑底
			//holder.callListCardView.setCardBackgroundColor(Color.parseColor("#3A3A3A")); // 深色背景
			
			switch (holder.ft8Message.getSequence4()) {
				case 0:
					holder.callListCardView.setCardBackgroundColor(Color.parseColor("#4A4A4A")); // 深色背景
					break;
				case 1:
					holder.callListCardView.setCardBackgroundColor(Color.parseColor("#3A3A3A")); // 深色背景
					
					break;
				case 2:
					holder.callListCardView.setCardBackgroundColor(Color.parseColor("#5A5A5A")); // 深色背景
					break;
				case 3:
					holder.callListCardView.setCardBackgroundColor(Color.parseColor("#2E2E2E")); // 深色背景
					break;
			}
			
			
			
			
		}

        holder.callingListIdBTextView.setText(holder.ft8Message.getdB());
		
		//if(GeneralVariables.darkModeSetting==1){ //淺色模式
			// 時間偏移 太大 粗體顯示
			holder.callListDtTextView.setText(holder.ft8Message.getDt());
			
			if (holder.ft8Message.time_sec > 1.0f || holder.ft8Message.time_sec < -0.05) {
				holder.callListDtTextView.setTypeface(null, Typeface.BOLD);
			}
			else
				holder.callListDtTextView.setTypeface(null, Typeface.NORMAL);
			
		/*}
		else{
			//时间偏移，如果超过1.0秒，-0.05秒，红色提示
			holder.callListDtTextView.setText(holder.ft8Message.getDt());
			if (holder.ft8Message.time_sec > 1.0f || holder.ft8Message.time_sec < -0.05) {
				holder.callListDtTextView.setTextColor(context.getResources().getColor(
						R.color.over_1_sec_color));
			} else {
				holder.callListDtTextView.setTextColor(context.getResources().getColor(
						R.color.text_view_color));
			}
		}
		*/

		// 呼叫頻率
        holder.callingListFreqTextView.setText(holder.ft8Message.getFreq_hz());

        //查是不是通联过的呼号，获取是否存在holder.otherBandIsQso中
		// 通聯過則畫刪除線
        setQueryHolderQSL_Callsign(holder);

		boolean isMine = GeneralVariables.checkIsMyCallsign(holder.ft8Message.getCallsignFrom());
		boolean fromIsMe = GeneralVariables.checkIsMyCallsign(holder.ft8Message.getCallsignFrom());
		boolean toIsMe   = GeneralVariables.checkIsMyCallsign(holder.ft8Message.getCallsignTo());
		boolean related  = fromIsMe || toIsMe; // 與我有關
		boolean isCQ     = holder.ft8Message.checkIsCQ();

		//靠左靠右
		if ( isMine) {
			params.setMargins(40, 2, 2, 2); // 左 上 右 下
			//params.endToEnd = ConstraintLayout.LayoutParams.PARENT_ID;
			//params.startToStart = ConstraintLayout.LayoutParams.UNSET;
		}
		else {
			//params.startToStart = ConstraintLayout.LayoutParams.PARENT_ID;
			//params.endToEnd = ConstraintLayout.LayoutParams.UNSET;
				
			params.setMargins(2, 2, 40, 2); // 左 上 右 下
		}
		cardView.setLayoutParams(params);



		if (holder.ft8Message.isFollow_Callsign || holder.ft8Message.isPotaSota) // 關注呼號(粗體)
				holder.callListMessageTextView.setTypeface(null, Typeface.BOLD);
		else
				holder.callListMessageTextView.setTypeface(null, Typeface.NORMAL);

		if(GeneralVariables.darkModeSetting==1){ //淺色模式
			if (holder.ft8Message.isFollow_Callsign || holder.ft8Message.isPotaSota) {// 關注呼號(黃色粗體)
				//holder.callListHolderConstraintLayout.setBackgroundColor(Color.parseColor("#FFC966")); // 淡橘黃
				//holder.callListHolderConstraintLayout.setBackgroundColor(Color.parseColor("#FFE08C")); // 奶油黃 / 米黃
				//holder.callListHolderConstraintLayout.setBackgroundColor(Color.parseColor("#FFCC66")); // 中度芥末黃
				//holder.callListHolderConstraintLayout.setBackgroundColor(Color.parseColor("#FFFF99")); // 中度黃
				//holder.callListHolderConstraintLayout.setBackgroundColor(Color.parseColor("#FFF799")); // 中度黃
				//holder.callListHolderConstraintLayout.setBackgroundColor(Color.parseColor("#FFFF33")); // 中度黃
				holder.callListHolderConstraintLayout.setBackgroundColor(context.getColor(R.color.follow_callsign)); // 中度黃
				
				
				
				
				holder.callListMessageTextView.setTextColor(Color.BLACK); // 黑字
			}	
			else if ( holder.ft8Message.checkIsCQ() ) { // CQ
				//holder.callListHolderConstraintLayout.setBackgroundColor(Color.parseColor("#00FF00")); // 綠底
				if(holder.ft8Message.isQSL_Callsign )
					{
					holder.callListHolderConstraintLayout.setBackgroundColor(context.getColor(R.color.qsl_callsign)); // 淺綠底
					}
				else{
					holder.callListHolderConstraintLayout.setBackgroundColor(context.getColor(R.color.cq_callsign)); // 綠底
					}
				
				holder.callListMessageTextView.setTextColor(Color.BLACK); // 黑字
			}
			else if (related) //與我相關
				{
				//holder.callListHolderConstraintLayout.setBackgroundColor(Color.parseColor("#FFA500")); // 菊底
				//holder.callListHolderConstraintLayout.setBackgroundColor(Color.parseColor("#FFCC66")); // 中度芥末黃
				holder.callListHolderConstraintLayout.setBackgroundColor(context.getColor(R.color.calling_callsign)); // 中度芥末黃
				
				holder.callListMessageTextView.setTextColor(Color.BLACK); // 黑字
			}	
			else	
			{
				holder.callListHolderConstraintLayout.setBackgroundColor(Color.parseColor("#FFFFFF")); // 白底
				holder.callListMessageTextView.setTextColor(Color.BLACK); // 黑字
			}	
			
			
		}
		else{
			
			if (holder.ft8Message.isFollow_Callsign || holder.ft8Message.isPotaSota) {// 關注呼號(黃色粗體)
				//holder.callListHolderConstraintLayout.setBackgroundColor(Color.parseColor("#FFC966")); // 淡橘黃
				//holder.callListHolderConstraintLayout.setBackgroundColor(Color.parseColor("#FFE08C")); // 奶油黃 / 米黃
				//holder.callListHolderConstraintLayout.setBackgroundColor(Color.parseColor("#FFCC66")); // 中度芥末黃
				//holder.callListHolderConstraintLayout.setBackgroundColor(Color.parseColor("#FFFF99")); // 中度黃
				//holder.callListHolderConstraintLayout.setBackgroundColor(Color.parseColor("#FFF799")); // 中度黃
				//holder.callListHolderConstraintLayout.setBackgroundColor(Color.parseColor("#FFFF33")); // 中度黃
				
				//holder.callListMessageTextView.setTextColor(Color.BLACK); // 黑字
				//holder.callListMessageTextView.setTextColor(Color.parseColor("#FFFF33")); // 中度黃
				holder.callListMessageTextView.setTextColor(context.getColor(R.color.follow_callsign)); // 中度黃
				
			}	
			else if ( holder.ft8Message.checkIsCQ() ) {
				//holder.callListHolderConstraintLayout.setBackgroundColor(Color.parseColor("#00FF00")); // 綠底
				//holder.callListMessageTextView.setTextColor(Color.BLACK); // 黑字
				//holder.callListMessageTextView.setTextColor(Color.parseColor("#00FF00")); // 綠底
				
				if(holder.ft8Message.isQSL_Callsign)
					{
					
						holder.callListMessageTextView.setTextColor(context.getColor(R.color.qsl_callsign)); // 淺綠底
					}
				else	
					{
						holder.callListMessageTextView.setTextColor(context.getColor(R.color.cq_callsign)); // 綠底
					}
				
			}
			else if (related)
				{
				//holder.callListHolderConstraintLayout.setBackgroundColor(Color.parseColor("#FFA500")); // 菊底
				//holder.callListHolderConstraintLayout.setBackgroundColor(Color.parseColor("#FFCC66")); // 中度芥末黃
				
				//holder.callListMessageTextView.setTextColor(Color.BLACK); // 黑字
				//holder.callListMessageTextView.setTextColor(Color.parseColor("#FFCC66")); // 中度芥末黃
				holder.callListMessageTextView.setTextColor(context.getColor(R.color.calling_callsign)); // 中度芥末黃
			}	
			else	
			{
				//holder.callListHolderConstraintLayout.setBackgroundColor(Color.parseColor("#FFFFFF")); // 白底
				//holder.callListMessageTextView.setTextColor(Color.BLACK); // 黑字
				holder.callListMessageTextView.setTextColor(Color.parseColor("#FFFFFF")); // 黑字
			}	

			
			
			
			/*
			//是否有与我呼号有关的消息
			if (holder.ft8Message.inMyCall()) {
				holder.callListMessageTextView.setTextColor(context.getResources().getColor(
						R.color.message_in_my_call_text_color));
			} else if (holder.otherBandIsQso) {
				//设置在别的波段通联过的消息颜色
				holder.callListMessageTextView.setTextColor(context.getResources().getColor(
						R.color.fromcall_is_qso_text_color));
			}  else if (holder.ft8Message.isFollow_Callsign || holder.ft8Message.isPotaSota) {
				// 關注呼號，黃色
				holder.callListMessageTextView.setTextColor(context.getResources().getColor(
						R.color.over_1_sec_color));
			}
			else {
				holder.callListMessageTextView.setTextColor(context.getResources().getColor(
						R.color.message_text_color));
			}
			*/
		}	
		
		


		//訊息內容
        holder.callListMessageTextView.setText(holder.ft8Message.getMessageText(true));

        //载波频率
        holder.bandItemTextView.setText(BaseRigOperation.getFrequencyStr(holder.ft8Message.band));
		
        //计算距离
        holder.callingListDistTextView.setText(MaidenheadGrid.getDistStr(
                GeneralVariables.getMyMaidenheadGrid()
                , holder.ft8Message.getMaidenheadGrid(mainViewModel.databaseOpr)));
				
        holder.callingListCallsignToTextView.setText("");//被呼叫者
        holder.callingListCallsignFromTextView.setText("");//呼叫者

        //消息类型
        holder.callingListCommandIInfoTextView.setText(holder.ft8Message.getCommandInfo());
		
		
		
		/* 2025/11/14 BV6LC Remove 統一
		if(GeneralVariables.darkModeSetting!=1){ // 深色模式
			if (holder.ft8Message.i3 == 1 || holder.ft8Message.i3 == 2) {
				holder.callingListCommandIInfoTextView.setTextColor(context.getResources().getColor(
						R.color.text_view_color));
			} else {
				holder.callingListCommandIInfoTextView.setTextColor(context.getResources().getColor(
						R.color.message_in_my_call_text_color));
			}
			//设置是否CQ的颜色
			if (holder.ft8Message.checkIsCQ()) {
				holder.callListMessageTextView.setBackgroundResource(R.color.textview_cq_color);
				holder.ft8Message.toWhere = "";
			} else {
				holder.callListMessageTextView.setBackgroundResource(R.color.textview_none_color);
			}
		}
		*/

		

        if (holder.ft8Message.fromWhere != null) {
            holder.callingListCallsignFromTextView.setText(holder.ft8Message.fromWhere);
        } else {
            holder.callingListCallsignFromTextView.setText("");
        }

        if (holder.ft8Message.toWhere != null) {
            holder.callingListCallsignToTextView.setText(holder.ft8Message.toWhere);
        } else {
            holder.callingListCallsignToTextView.setText("");
        }

        //给没有通联过的分区打标记
        setToDxcc(holder);
        setFromDxcc(holder);

		// ✅ 查詢呼號歸屬地並更新
		if (!holder.ft8Message.hasCheckedFromLocation && holder.ft8Message.fromWhere == null ) {
			setQueryHolderCallsign(holder); // 只有沒查過才查
		}


        //查询呼号归属地，为防止占用太多运算资源，当from为空是再做查询的工作
//        if (holder.ft8Message.fromWhere == null) {
//            setQueryHolderCallsign(holder);//查询呼号归属地
//        }

        if (holder.ft8Message.freq_hz <= 0.01f) {//这是发射界面
            holder.callingListIdBTextView.setVisibility(View.GONE);
            holder.callListDtTextView.setVisibility(View.GONE);
            holder.callingListFreqTextView.setText("TX");
            holder.bandItemTextView.setVisibility(View.GONE);
            holder.callingListDistTextView.setVisibility(View.GONE);
            holder.callingListCommandIInfoTextView.setVisibility(View.GONE);
            holder.callingUtcTextView.setVisibility(View.GONE);
            holder.callingListCallsignToTextView.setVisibility(View.GONE);
            holder.callingListCallsignFromTextView.setVisibility(View.GONE);
            holder.dxccToImageView.setVisibility(View.GONE);
            holder.ituToImageView.setVisibility(View.GONE);
            holder.cqToImageView.setVisibility(View.GONE);
            holder.dxccFromImageView.setVisibility(View.GONE);
            holder.ituFromImageView.setVisibility(View.GONE);
            holder.cqFromImageView.setVisibility(View.GONE);
        } else if (GeneralVariables.simpleCallItemMode){//简单列表模式
            holder.bandItemTextView.setVisibility(View.GONE);
            holder.callingListDistTextView.setVisibility(View.GONE);
            holder.callingListCommandIInfoTextView.setVisibility(View.GONE);
            holder.callingUtcTextView.setVisibility(View.GONE);
            holder.callingListCallsignToTextView.setVisibility(View.GONE);
            holder.dxccToImageView.setVisibility(View.GONE);
            holder.ituToImageView.setVisibility(View.GONE);
            holder.cqToImageView.setVisibility(View.GONE);
        }else {//标准列表模式
            holder.callingListIdBTextView.setVisibility(View.VISIBLE);
            holder.callListDtTextView.setVisibility(View.VISIBLE);
            holder.bandItemTextView.setVisibility(View.VISIBLE);
            holder.callingListDistTextView.setVisibility(View.VISIBLE);
            holder.callingListCommandIInfoTextView.setVisibility(View.VISIBLE);
            holder.callingUtcTextView.setVisibility(View.VISIBLE);
            holder.callingListCallsignToTextView.setVisibility(View.VISIBLE);
            holder.callingListCallsignFromTextView.setVisibility(View.VISIBLE);
        }
		
		//holder.callListCardView.setOnCreateContextMenuListener(menuListener); //嘗試解決長按問題View 被回收後 Listener 消失（）
    }
	
	
	
	

    private void setFromDxcc(@NonNull CallingListItemHolder holder) {

        if (holder.ft8Message.fromDxcc && holder.ft8Message.freq_hz > 0.01f) {
            holder.dxccFromImageView.setVisibility(View.VISIBLE);
        } else {
            holder.dxccFromImageView.setVisibility(View.GONE);
        }

        if (holder.ft8Message.fromCq && holder.ft8Message.freq_hz > 0.01f) {
            holder.cqFromImageView.setVisibility(View.VISIBLE);
        } else {
            holder.cqFromImageView.setVisibility(View.GONE);
        }

        if (holder.ft8Message.fromItu && holder.ft8Message.freq_hz > 0.01f) {
            holder.ituFromImageView.setVisibility(View.VISIBLE);
        } else {
            holder.ituFromImageView.setVisibility(View.GONE);
        }
    }

    private void setToDxcc(@NonNull CallingListItemHolder holder) {
        if (holder.ft8Message.toDxcc && holder.ft8Message.freq_hz > 0.01f) {
            holder.dxccToImageView.setVisibility(View.VISIBLE);
        } else {
            holder.dxccToImageView.setVisibility(View.GONE);
        }

        if (holder.ft8Message.toCq && holder.ft8Message.freq_hz > 0.01f) {
            holder.cqToImageView.setVisibility(View.VISIBLE);
        } else {
            holder.cqToImageView.setVisibility(View.GONE);
        }

        if (holder.ft8Message.toItu && holder.ft8Message.freq_hz > 0.01f) {
            holder.ituToImageView.setVisibility(View.VISIBLE);
        } else {
            holder.ituToImageView.setVisibility(View.GONE);
        }
    }

    //检查是不是通联过的呼号 畫刪除線
    private void setQueryHolderQSL_Callsign(@NonNull CallingListItemHolder holder) {
        //查是不是在本波段内通联成功过的呼号
		
		// BV6LC 因為如果通聯記錄出現過跟自己通聯成功後，只要雙方出現自己的呼號，都會被畫上底線
		String otherCallsign; // 只檢查被呼叫者
		
		
		
		if (GeneralVariables.checkIsMyCallsign(holder.ft8Message.getCallsignFrom())) {
			// 你是呼叫方，對方是被呼叫者
			otherCallsign = holder.ft8Message.getCallsignTo();
		} else if (GeneralVariables.checkIsMyCallsign(holder.ft8Message.getCallsignTo())) {
			// 你是被呼叫方，對方是呼叫者
			otherCallsign = holder.ft8Message.getCallsignFrom();
		} else {
			// 都不是你（第三方通訊），可以依照需求處理或忽略
			otherCallsign = holder.ft8Message.getCallsignFrom();
		}
		//--------------------
		
		//Log.d(TAG, "是不是在本波段内通联成功过的呼号" + otherCallsign);
        //if (GeneralVariables.checkQSLCallsign(holder.ft8Message.getCallsignFrom())) {//如果在数据库中，划线
		//LogExt.d(TAG , holder.ft8Message.getCallsignTo()+"Gen:"+GeneralVariables.band+" "+BaseRigOperation.getMeterFromFreq(GeneralVariables.band)+" holder:"+holder.ft8Message.band +" "+BaseRigOperation.getMeterFromFreq(holder.ft8Message.band));
		//if (GeneralVariables.checkQSLCallsign(otherCallsign) && (BaseRigOperation.getMeterFromFreq(GeneralVariables.band)==BaseRigOperation.getMeterFromFreq(holder.ft8Message.band)) ) {//如果在数据库中，划线
		if (GeneralVariables.checkQSLCallsign(otherCallsign)  ) {//如果在数据库中，划线 畫刪除線
			//Log.d(TAG, "如果在数据库中，划线" );
			//LogExt.d(TAG , "====DEL====");
            holder.callListMessageTextView.setPaintFlags(
                    holder.callListMessageTextView.getPaintFlags() | Paint.STRIKE_THRU_TEXT_FLAG);
			holder.ft8Message.isQSL_Callsign=true;
					
        } else {//如果不在数据库中，去掉划线
			//Log.d(TAG, "如果不在数据库中，去掉划线" );
            holder.callListMessageTextView.setPaintFlags(
                    holder.callListMessageTextView.getPaintFlags() & (~Paint.STRIKE_THRU_TEXT_FLAG));
        }
        holder.otherBandIsQso = GeneralVariables.checkQSLCallsign_OtherBand(holder.ft8Message.getCallsignFrom());
    }

    @Override
    public int getItemCount() {
        //return ft8MessageArrayList.size();
		return ft8MessageArrayList == null ? 0 : ft8MessageArrayList.size();
    }

    public void setOnItemClickListener(View.OnClickListener onItemClickListener) {
        this.onItemClickListener = onItemClickListener;
    }

    class CallingListItemHolder extends RecyclerView.ViewHolder {
        private static final String TAG = "CallingListItemHolder";
		//public CardView callListCardView;
		public MaterialCardView  callListCardView;
		
        ConstraintLayout callListHolderConstraintLayout;
        TextView callingListIdBTextView, callListDtTextView, callingListFreqTextView,
                callListMessageTextView, callingListDistTextView, callingListSequenceTextView,
                callingListCallsignFromTextView, callingListCallsignToTextView
                , callingListCommandIInfoTextView,
                bandItemTextView, callingUtcTextView;
        ImageView dxccToImageView, ituToImageView, cqToImageView, dxccFromImageView
                , ituFromImageView, cqFromImageView,isWeakSignalImageView;
        public Ft8Message ft8Message;
        //boolean showFollow;
        ShowMode showMode;
        boolean isSyncFreq;
        boolean otherBandIsQso = false;


        public CallingListItemHolder(@NonNull View itemView, View.OnClickListener listener
                    //,View.OnCreateContextMenuListener menuListener) {
					) {
            super(itemView);
			
			
			callListCardView = itemView.findViewById(R.id.callListCardView);
			callListCardView.setOnClickListener(listener);
			callListCardView.setTag(-1);  // 重要：用來傳 position

			// 🟡 關鍵：讓 itemView 本身回傳 context menu 給 Fragment 處理
			//itemView.setOnCreateContextMenuListener(menuListener);
			//itemView.setLongClickable(true);  // 讓長按有效
			
			
			
			callListCardView = itemView.findViewById(R.id.callListCardView);
			callListCardView.setLongClickable(true);  // ← 這是你要補上的
			
            callListHolderConstraintLayout = itemView.findViewById(R.id.callListHolderConstraintLayout);
            callingListIdBTextView = itemView.findViewById(R.id.callingListIdBTextView);
            callListDtTextView = itemView.findViewById(R.id.callListDtTextView);
            callingListFreqTextView = itemView.findViewById(R.id.callingListFreqTextView);
            callListMessageTextView = itemView.findViewById(R.id.callListMessageTextView);
            callingListDistTextView = itemView.findViewById(R.id.callingListDistTextView);
            callingListSequenceTextView = itemView.findViewById(R.id.callingListSequenceTextView);
            callingListCallsignFromTextView = itemView.findViewById(R.id.callingListCallsignFromTextView);
            callingListCallsignToTextView = itemView.findViewById(R.id.callToItemTextView);
            callingListCommandIInfoTextView = itemView.findViewById(R.id.callingListCommandIInfoTextView);
            bandItemTextView = itemView.findViewById(R.id.bandItemTextView);
            callingUtcTextView = itemView.findViewById(R.id.callingUtcTextView);

            dxccToImageView = itemView.findViewById(R.id.dxccToImageView);
            ituToImageView = itemView.findViewById(R.id.ituToImageView);
            cqToImageView = itemView.findViewById(R.id.cqToImageView);
            dxccFromImageView = itemView.findViewById(R.id.dxccFromImageView);
            ituFromImageView = itemView.findViewById(R.id.ituFromImageView);
            cqFromImageView = itemView.findViewById(R.id.cqFromImageView);
            isWeakSignalImageView=itemView.findViewById(R.id.isWeakSignalImageView);

            dxccToImageView.setVisibility(View.GONE);
            ituToImageView.setVisibility(View.GONE);
            cqToImageView.setVisibility(View.GONE);
            dxccFromImageView.setVisibility(View.GONE);
            ituFromImageView.setVisibility(View.GONE);
            cqFromImageView.setVisibility(View.GONE);
            callListCardView.setTag(-1);
            callListCardView.setOnClickListener(listener);
            //itemView.setOnCreateContextMenuListener(menuListener);
			// 使用GestureDetector來偵測長按事件
			
			/*
			GestureDetector gestureDetector = new GestureDetector(itemView.getContext(), 
			new GestureDetector.SimpleOnGestureListener() {
				@Override
				public void onLongPress(MotionEvent e) {
					// 計算顯示位置，偏移10像素
					
					callListCardView.performLongClick(); // 觸發系統預設長按機制（選單彈出）
					
					float x = e.getX() + 10;
					float y = e.getY() + 10;
					if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N) {
						callListCardView.showContextMenu(x, y); // API 24+ 方法
					} else {
						callListCardView.showContextMenu(); // 傳統方法
					}
				}


				@Override
				public boolean onSingleTapUp(MotionEvent e) {
					// 確保單擊也能正常響應
					callListCardView.performClick();
					return super.onSingleTapUp(e);
				}
			});
			
			// 設置OnCreateContextMenuListener，當showContextMenu被調用時彈出菜單
			callListCardView.setOnCreateContextMenuListener(menuListener);
			*/

			GestureDetector gestureDetector = new GestureDetector(itemView.getContext(),
				new GestureDetector.SimpleOnGestureListener() {
					
					@Override
					public void onLongPress(MotionEvent e) {
						
						
						int position = getAdapterPosition();
						if (position == RecyclerView.NO_POSITION) return;
						
						View targetView = callListCardView;

						Ft8Message ft8Message = ft8MessageArrayList.get(position);

						// ✅ 確保視覺焦點
						callListCardView.performHapticFeedback(android.view.HapticFeedbackConstants.LONG_PRESS);

						// 🔹 在螢幕上顯示 PopupMenu
						/*android.widget.PopupMenu popup = new android.widget.PopupMenu(
								itemView.getContext(),
								callListCardView,
								android.view.Gravity.END  // 讓選單靠右顯示
						);*/
						showRoundedPopup(callListCardView, position);
						
						targetView.setTag(position);
						//buildPopupMenu(popup, targetView);
						/*
						popup.getMenu().add(0, 1, 0, "呼叫對方");
						popup.getMenu().add(0, 3, 1, "呼叫發送者");
						popup.getMenu().add(0, 4, 2, "回覆訊息");
						popup.getMenu().add(0, 5, 3, "查詢 QRZ（To）");
						popup.getMenu().add(0, 6, 4, "查詢 QRZ（From）");
						popup.getMenu().add(0, 7, 5, "查詢日誌（To）");
						popup.getMenu().add(0, 8, 6, "查詢日誌（From）");

						popup.setOnMenuItemClickListener(item -> {
							if (itemView.getContext() instanceof androidx.fragment.app.FragmentActivity) {
								androidx.fragment.app.FragmentManager fm =
										((androidx.fragment.app.FragmentActivity) itemView.getContext()).getSupportFragmentManager();
								for (androidx.fragment.app.Fragment f : fm.getFragments()) {
									if (f instanceof MyCallingFragment && f.isVisible()) {
										callListCardView.setTag(position);
										f.onContextItemSelected(item);
										break;
									}
								}
							}
							return true;
						});*/




						// ✅ 強制顯示，即使 RecyclerView 攔截了觸控
						
					}
					
					

					@Override
					public boolean onSingleTapUp(MotionEvent e) {
						callListCardView.performClick();
						return super.onSingleTapUp(e);
					}
				});

			callListCardView.setOnTouchListener((v, event) -> gestureDetector.onTouchEvent(event));






        }


    }
	
	
	// BV6LC 更新畫面
	// ✅ 貼在這裡，成為 Adapter 的 private method
	private void setQueryHolderCallsign(@NonNull CallingListItemHolder holder) {
		// 查询“From”呼号归属地
		GeneralVariables.callsignDatabase.getCallsignInformation(
			holder.ft8Message.getCallsignFrom(),
			new OnAfterQueryCallsignLocation() {
				@Override
				public void doOnAfterQueryCallsignLocation(CallsignInfo callsignInfo) {
					int pos = holder.getAdapterPosition();
					if (pos == RecyclerView.NO_POSITION) return; // 已解绑，跳过
					
					if (pos == RecyclerView.NO_POSITION || pos < 0 || pos >= getItemCount()) {
                    return; // 已解绑或超出範圍，直接跳過
					}
					

					holder.callingListCallsignFromTextView.post(() -> {
						// 更新模型
						holder.ft8Message.fromWhere = GeneralVariables.isChina
							? callsignInfo.CountryNameCN
							: callsignInfo.CountryNameEn;
						holder.ft8Message.hasCheckedFromLocation = true;

						// 刷新该位置
						notifyItemChanged(pos);
					});
				}
			}
		);

		// 查询“To”呼号归属地
		GeneralVariables.callsignDatabase.getCallsignInformation(
			holder.ft8Message.getCallsignTo(),
			new OnAfterQueryCallsignLocation() {
				@Override
				public void doOnAfterQueryCallsignLocation(CallsignInfo callsignInfo) {
					int pos = holder.getAdapterPosition();
					if (pos == RecyclerView.NO_POSITION) return; // 已解绑，跳过

					holder.callingListCallsignToTextView.post(() -> {
						// 更新模型
						holder.ft8Message.toWhere = GeneralVariables.isChina
							? callsignInfo.CountryNameCN
							: callsignInfo.CountryNameEn;

						// 刷新该位置
						notifyItemChanged(pos);
					});
				}
			}
		);
	}
	
	
	// Release
	public void release() {
		this.onItemClickListener = null;
		this.mainViewModel = null;
		this.ft8MessageArrayList = null;
		this.context = null;
	}
	// Release
	
	public void setData(ArrayList<Ft8Message> newList) {
		this.ft8MessageArrayList = newList;
		notifyDataSetChanged();
	}
	
	
	private void showRoundedPopup(View anchor, int position) {
		Context ctx = anchor.getContext();

		// Inflate 自訂 layout
		View popupView = LayoutInflater.from(ctx)
				.inflate(R.layout.popup_menu_round, null);

		LinearLayout menuContainer = popupView.findViewById(R.id.menuContainer);

		// 建立 PopupWindow
		PopupWindow popupWindow = new PopupWindow(
				popupView,
				LinearLayout.LayoutParams.WRAP_CONTENT,
				LinearLayout.LayoutParams.WRAP_CONTENT,
				true
		);


		popupWindow.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
		popupWindow.setBackgroundDrawable(null);
		
		popupWindow.setOutsideTouchable(true);

		popupWindow.setElevation(24f); // 陰影
		popupWindow.setOutsideTouchable(true);
		
		
		// === ⭐ iOS 模糊背景效果（Android 12+）===
		/*
		if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.S) {
			try {
				Activity act = (Activity) anchor.getContext();
				View root = act.getWindow().getDecorView().findViewById(android.R.id.content);

				root.setRenderEffect(
					RenderEffect.createBlurEffect(20f, 20f, Shader.TileMode.CLAMP)
				);
			} catch (Exception e) {
				// ignore
			}
		}*/
		
		
		

		// === ⭐ 動態加入每個 menu item ===
		android.widget.PopupMenu dummy = new android.widget.PopupMenu(ctx, anchor);
		buildPopupMenu(dummy, anchor);   // ← 用你原本的 menu 生成邏輯

		for (int i = 0; i < dummy.getMenu().size(); i++) {
			android.view.MenuItem item = dummy.getMenu().getItem(i);

			TextView tv = new TextView(ctx);
			tv.setText(item.getTitle());
			tv.setTextSize(16);
			tv.setPadding(24, 20, 24, 20);
			tv.setTextColor(Color.BLACK);
			tv.setBackgroundResource(android.R.drawable.list_selector_background);

			int itemId = item.getItemId();

			tv.setOnClickListener(v -> {
				// ⭐ 呼叫 fragment 原本的 context menu 處理
				FragmentActivity act = (FragmentActivity) ctx;

				for (Fragment parent : act.getSupportFragmentManager().getFragments()) {
					for (Fragment child : parent.getChildFragmentManager().getFragments()) {
						if (child.isVisible()) {
							child.onContextItemSelected(item);
						}
					}
				}

				popupWindow.dismiss();
			});

			menuContainer.addView(tv);
		}
		
		
		
		
		
		

		// === 彈出位置：靠右 ===
		//popupWindow.showAsDropDown(anchor, -50, -anchor.getHeight());
		
		// === ⭐ 自動調整 PopupWindow 位置防止被螢幕遮住 ===

		// 取得螢幕尺寸
		android.graphics.Rect screenRect = new android.graphics.Rect();
		anchor.getWindowVisibleDisplayFrame(screenRect);

		int screenHeight = screenRect.height();

		// 取得 anchor 的位置
		int[] anchorLocation = new int[2];
		anchor.getLocationOnScreen(anchorLocation);

		int anchorY = anchorLocation[1];                 // anchor 的 Y 座標
		int anchorBottom = anchorY + anchor.getHeight(); // anchor 底部座標

		// 預先測量 Popup 高度
		popupView.measure(
				View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED),
				View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED)
		);
		int popupHeight = popupView.getMeasuredHeight();

		int spaceBelow = screenHeight - anchorBottom; // anchor 底下空間
		int spaceAbove = anchorY;                    // anchor 上方空間

		if (spaceBelow >= popupHeight) {
			// ⭐ 底部空間足夠 → 從 anchor 底部往下顯示
			//popupWindow.showAsDropDown(anchor, -40, 0);
			popupWindow.showAsDropDown(anchor, 20, 0);
		} else if (spaceAbove >= popupHeight) {
			// ⭐ 上方空間足夠 → 顯示在 anchor 上方
			//popupWindow.showAsDropDown(anchor, -40, -(anchor.getHeight() + popupHeight));
			popupWindow.showAsDropDown(anchor, 20, -(anchor.getHeight() + popupHeight));
		} else {
			// ⭐ 都不夠 → 顯示在畫面中央避免蓋住
			//popupWindow.showAtLocation(anchor, Gravity.CENTER, 0, 0);
			popupWindow.showAtLocation(anchor, Gravity.CENTER, 20, 0);
		}
		
		
		
	}


	private int dpToPx(int dp) {
		float density = this.context.getResources().getDisplayMetrics().density;
		return Math.round((float) dp * density);
	}

	
}