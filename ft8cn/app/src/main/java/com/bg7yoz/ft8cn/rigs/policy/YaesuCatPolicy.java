package com.bg7yoz.ft8cn.rigs.policy;

/**
 * 定義 Yaesu CAT 在 TX / RX 時的行為策略
 */
public interface YaesuCatPolicy {

    /** TX 期間是否允許任何 CAT 指令 */
    boolean allowCatWhileTx();

    /** TX 期間是否允許讀 Meter */
    boolean allowReadMeterWhileTx();
}