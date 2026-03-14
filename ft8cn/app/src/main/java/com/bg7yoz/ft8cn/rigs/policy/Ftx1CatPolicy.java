package com.bg7yoz.ft8cn.rigs.policy;

public class Ftx1CatPolicy implements YaesuCatPolicy {

    @Override
    public boolean allowCatWhileTx() {
        return false;   // ⛔ 關鍵：TX 期間完全禁止 CAT
    }

    @Override
    public boolean allowReadMeterWhileTx() {
        return false;
    }
}