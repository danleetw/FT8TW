package com.bg7yoz.ft8cn.x6100;

import android.annotation.SuppressLint;

import androidx.annotation.NonNull;

import com.bg7yoz.ft8cn.GeneralVariables;
import com.bg7yoz.ft8cn.R;
import com.bg7yoz.ft8cn.flex.VITA;

public class X6100Meters {
    private final String TAG = "X6100Meters";
    public float sMeter;
    public float power;
    public float swr;
    public float alc;
    public float volt;
    public float max_power;
    public short tx_volume;
    public short af_level;//电台的音量

    /*
    新版6100的计数方式
    S-Meter:
    0000=S0,0120=S9,0242=S9+60dB
    SWR-Meter:
    0000=1.0,0048=1.5,0080=2.0,0120=3.0
    Volt-Meter:
    0000=0V,0075=5V,0241=16V
     */

    public X6100Meters() {

    }

    public synchronized void update(byte[] meterData) {
        for (int i = 0; i < meterData.length / 4; i++) {
            short index = VITA.readShortDataBigEnd(meterData, i * 4);
            short value = VITA.readShortDataBigEnd(meterData, i * 4 + 2);
            setValues(index, value);
        }
    }

    /**
     * 把x6100传递过来的S.Meter值转换为dBm值
     *
     * @param value 值
     * @return dBm值
     */
    public static float getMeter_dBm(float value) {
        if (value <= 0) {
            return -150f;
        } else if (value <= 120f) {
            return (value * 54f / 120f - 129f);
        } else if (value < 242) {
            return (value * 60f) / (242f - 120f) - 120f * 60f / (242f - 120f);

        } else {
            return 0;
        }
    }

    /**
     * 计算电源的电压,0~16V
     *
     * @param value 值
     * @return 电压
     */
    public static float getMeter_volt(float value) {
        if (value <= 75) {
            return value / 25f;
        } else {
            return (value - 75f) * 11 / 166f + 5;
        }
    }

    /**
     * 把信号强度dBm值转换为仪表S.Meter值
     *
     * @param fval dBm
     * @return 仪表值
     */
    private static float getMeters(float fval) {
        float val;
        if (fval < -123.0) {
            val = 0;
        } else if (fval <= -75.0f) { // S1~S9
            val = (129.0f + fval) * 120.0f / 54.0f;
        } else if (fval <= -15.0f) { // S9+10~60
            val = 120.0f + (75.0f + fval) * (242.0f - 120.0f) / 60.0f;
        } else {
            val = 242f;// max
        }
        return val;
    }

    /**
     * X6100按照1～∞（25.5）对应计算出0～255值的算法
     *
     * @param fval 原始swr
     * @return 转换后的值
     */
    private static float get6100SWR(float fval) {
        int val;
        if (fval <= 1.5f) {//swr小于1.5的情况（转换后0～48）
            val = Math.round((fval - 1.0f) * (48.0f / 0.5f));
        } else if (fval <= 2.0f) {//swr在1.5～2.0之间（转换后49～80）
            val = Math.round((fval - 1.5f) * (80.0f - 48.0f) / 0.5f + 48.0f);
        } else if (fval <= 3.0) {//swr在2.0～3.0之间（转换后81～120）
            val = Math.round((fval - 2.0f) * (120.0f - 80.0f) + 80.0f);
        } else {//swr大于3.0～∞（转换后121～255）
            val = Math.round((fval - 3.0f) * (255.0f - 120.0f) / (25.5f - 3.0f) + 120.0f);
        }
        //限定数值范围
        if (val > 255) {
            val = 255;
        } else if (val < 0) {
            val = 0;
        }
        return val;
    }

    /**
     * 把6100的swr（0～255）转换成真正的swr值
     * 6100的值为0～255，分为4段，对应的范围是：1～1.5，1.5～2.0，2.0～3.0，3.0～无穷大（实际值是25.5）
     * 1～1.5（0～48），1.5～2.0（48～80），2.0～3.0（80～120），3.0～无穷大(实际是25.5)（120~255）
     * @param fval 转换值
     * @return 真正的swr值
     */
    private static float getSWR(float fval) {
        float val;
        if (fval <= 48.0f) {//1~1.5
            val = fval / 96.0f + 1;
        } else if (fval <= 80.0f) {//1.5~2.0
            val = (fval - 48.0f) / 64.0f + 1.5f;
        } else if (fval < 120.0f) {//2.0~3.0
            val = (fval - 80.0f) / 40.0f + 2.0f;
        } else {//3.0～∞(25.5)
            val = (fval - 120.0f) / 125.0f * (25.5f - 3.0f) + 3.0f;
        }
        return val;
    }


    private void setValues(short index, short value) {
        switch (index) {
            case 0://sMeter
                sMeter = value;
                break;
            case 1://power
                power = (25 / 255f) * value * 10;
                break;
            case 2://swr
                //6100的值为0～255，分为4段，对应的范围是：1～1.5，1.5～2.0，2.0～3.0，3.0～无穷大（实际值是25.5）
                //1～1.5（0～48），1.5～2.0（48～80），2.0～3.0（80～120），3.0～无穷大（120~255）
                swr = getSWR(value * 1.0f);
                break;
            case 3://alc原始值是0～255，发送过来的是转换后的值0～120
                alc = 120-value * 1.0f;
                //Log.e(TAG,String.format("alc:%d",value));
                break;
            case 4:
                volt = getMeter_volt(value);
                break;
            case 5:
                max_power = value / 25.5f;
                //Log.e(TAG,String.format("max power:%d",value));
                break;
            case 6:
                tx_volume = value;
                break;
            case 7:
                af_level = value;
                break;
            default:
        }
    }

    @SuppressLint("DefaultLocale")
    @NonNull
    @Override
    public String toString() {
        //return String.format("S.Meter: %.1f dBm\nSWR: %s\nALC: %.1f\nVolt: %.1fV\nTX power: %.1f W\nMax tx power: %.1f\nTX volume:%d%%"
        return String.format(GeneralVariables.getStringFromResource(R.string.xiegu_meter_info)
                , getMeter_dBm(sMeter)
                , swr > 8 ? "∞" : String.format("%.1f", swr)
                , alc
                , volt
                , power
                , max_power
                , tx_volume
        );
        //"信号强度: %.1f dBm\n驻波: %s\nALC: %.1f\n电压: %.1fV\n发射功率: %.1f W\n最大发射功率: %.1f\n发射音量:%d%%"
    }
}
