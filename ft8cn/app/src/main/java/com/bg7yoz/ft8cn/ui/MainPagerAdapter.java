package com.bg7yoz.ft8cn.ui;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.viewpager2.adapter.FragmentStateAdapter;

public class MainPagerAdapter extends FragmentStateAdapter {

    public MainPagerAdapter(@NonNull FragmentActivity fragmentActivity) {
        super(fragmentActivity);
    }

    @NonNull
    @Override
    public Fragment createFragment(int position) {
        switch (position) {
            case 0:
                return new CallingListFragment();
            case 1:
                return new MyCallingFragment();
            case 2:
                return new SpectrumFragment();
            case 3:
                return new LogFragment();
            case 4:
                return new ConfigFragment();
            default:
                return new CallingListFragment(); // 預設頁面
        }
    }

    @Override
    public int getItemCount() {
        return 5; // 總共五頁
    }
}
