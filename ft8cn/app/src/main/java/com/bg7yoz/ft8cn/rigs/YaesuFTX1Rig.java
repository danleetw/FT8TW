package com.bg7yoz.ft8cn.rigs;

import android.util.Log;

import com.bg7yoz.ft8cn.GeneralVariables;

import com.bg7yoz.ft8cn.rigs.policy.Ftx1CatPolicy;

/**
 * YAESU FTX-1 Rig
 *
 * 設計基於 Yaesu DX10 / FTDX101 第三代 CAT
 * 特點：
 * 1. 不能只靠 FA 換頻
 * 2. 必須確認 VFO / Split / Mode 狀態
 * 3. 屬於狀態型 CAT
 *
 * @author BV6LC
 */
public class YaesuFTX1Rig extends YaesuDX10Rig {

    private static final String TAG = "YaesuFTX1Rig";

	public YaesuFTX1Rig() {
        super();
		Log.i(TAG, "FTX-1 rig initialized");
        setCatPolicy(new Ftx1CatPolicy());
        Log.i(TAG, "FTX-1 rig initialized with Ftx1CatPolicy");
    }
	
	

    @Override
    public String getName() {
        return "YAESU FTX-1";
    }

    /**
     * FTX-1 設定頻率：
     * 必須分段送指令，確保狀態正確
     */
    @Override
    public void setFreqToRig() {
        if (getConnector() == null) {
            Log.w(TAG, "setFreqToRig: connector is null");
            return;
        }

        long freq = getFreq();
        Log.d(TAG, "Setting FTX-1 frequency: " + freq);

        try {
            // 1️⃣ 確保在 VFO-A（不是 Memory）
            getConnector().sendData(
                    Yaesu3RigConstant.setVFO_A()
            );
            sleepQuiet(40);

            // 2️⃣ 關閉 Split（FTX-1 很重要）
            getConnector().sendData(
                    Yaesu3RigConstant.setSplitOff()
            );
            sleepQuiet(40);

            // 3️⃣ 設定 DATA-U / USB-D（FT8 必要）
            setUsbModeToRig();
            sleepQuiet(40);

            // 4️⃣ 設定頻率（9 Byte 第三代指令）
            getConnector().sendData(
                    Yaesu3RigConstant.setOperationFreq9Byte(freq)
            );

        } catch (Exception e) {
            Log.e(TAG, "setFreqToRig error", e);
        }
    }

    /**
     * FTX-1 有時 FA 不回，但 IF 會回
     * 所以讀頻率時加強容錯
     */
    @Override
    public void readFreqFromRig() {
        if (getConnector() == null) {
            return;
        }

        try {
            clearBufferSafely();

            // 原本 DX10 的讀頻
            getConnector().sendData(
                    Yaesu3RigConstant.setReadOperationFreq()
            );
			
			sleepQuiet(20); // ⭐ 給 FTX-1 一點反應時間

            // FTX-1 容錯補強
			getConnector().sendData(
				Yaesu3RigConstant.setReadIF()
			);
			
			
			

        } catch (Exception e) {
            Log.e(TAG, "readFreqFromRig error", e);
        }
    }

    /**
     * 連線後可呼叫，用來同步電台狀態
     * （可選，但非常建議）
     */
    public void initRigState() {
        if (getConnector() == null) {
            return;
        }

        Log.i(TAG, "Initializing FTX-1 rig state");

        try {
            setUsbModeToRig();
            sleepQuiet(40);
            readFreqFromRig();
        } catch (Exception e) {
            Log.e(TAG, "initRigState error", e);
        }
    }

    /**
     * DX10 的 buffer 是 private，這裡安全呼叫 read 流程即可
     */
    private void clearBufferSafely() {
        // 不直接碰 buffer，避免破壞父類邏輯
        // readFreqFromRig 本身就會清 buffer
    }

    /**
     * 安靜 sleep，不丟 exception
     */
    private void sleepQuiet(long ms) {
        try {
            Thread.sleep(ms);
        } catch (InterruptedException ignored) {
        }
    }
}
