package com.bg7yoz.ft8cn.log;

public interface OnShareLogEvents {
    void onPreparing(String info);
    void onShareStart(int count, String info);

    boolean onShareProgress(int count, int position, String info);

    void afterGet(int count, String info);
    void onShareFailed(String info);
}
