package com.bg7yoz.ft8cn.rigs;
/**
 * 由DS1UFX 于2023-08-16提交修改（基于0.9版），增加(tr)uSDX audio over cat的支持。
 */

import android.annotation.SuppressLint;

public class KenwoodTK90RigConstant {
    private static final String TAG = "KenwoodTK90RigConstant";
    //LSB:0,USB:1,AM:2,CW:3,RTTY:4,FM:5,WFM:6,CW_R:7,RTTY_R:8,DV:17
    public static final int LSB = 0x01;
    public static final int USB = 0x02;
    public static final int CW = 0x03;
    public static final int FSK = 0x04;
    public static final int AM = 0x05;
    public static final int DATA = 0x06;

    public static final int ts_590_swr_alert_max = 15;//相当于3.0
    public static final int ts_590_alc_alert_max = 15;//超过，在表上显示红色

    //PTT状态

    //指令集
    private static final String PTT_ON = "TX\r";
    private static final String PTT_OFF = "RX\r";
    private static final String USB_MODE = "MD2\r";
    private static final String READ_FREQ = "FA\r";
    private static final String READ_METERS = "RM\r";
    private static final String SET_VFO = "FR0\r";


    private static final String TS590_VFO_A = "FR0;";//KENWOOD TS590,设置VFO -A
    private static final String TS2000_PTT_ON = "TX0;";//KENWOOD TS2000,PTT
    private static final String TS590_PTT_ON = "TX1;";//KENWOOD TS590,PTT
    private static final String FLEX_6000_PTT_ON = "TX01;";//FLEX_6000,PTT
    private static final String TS590_PTT_OFF = "RX;";//KENWOOD TS590,PTT
    private static final String FLEX_SET_USB_DATA = "MD9;";//FLEX6000 DIGU
    private static final String TS590_SET_USB = "MD2;";//KENWOOD USB MODE
    private static final String TS590_READ_FREQ = "FA;";//KENWOOD 读频率
    private static final String TS590_READ_METERS = "RM;";//KENWOOD 读METER

    private static final String TS570_PTT_OFF = "RX;";//KENWOOD TS570,PTT
    private static final String TS570_PTT_ON = "TX;";//KENWOOD TS570,PTT


    // (tr)uSDX extensions
    private static final String TRUSDX_STREAMING_OFF = "UA0;";
    private static final String TRUSDX_STREAMING_ON_SPEAKER_ON = "UA1;";
    private static final String TRUSDX_STREAMING_ON_SPEAKER_OFF = "UA2;";
    private static final String TRUSDX_STREAMING_AUDIO = "US";


    public static String getModeStr(int mode) {
        switch (mode) {
            case LSB:
                return "LSB";
            case USB:
                return "USB";
            case CW:
                return "CW";
            case FSK:
                return "FSK";
            case AM:
                return "AM";
            case DATA:
                return "DATA";
            default:
                return "UNKNOWN";
        }
    }


    public static byte[] setPTTState(boolean on) {
        if (on) {
            return PTT_ON.getBytes();
        } else {
            return PTT_OFF.getBytes();
        }

    }

    public static byte[] setTS590PTTState(boolean on) {
        if (on) {
            return TS590_PTT_ON.getBytes();
        } else {
            return TS590_PTT_OFF.getBytes();
        }

    }
    public static byte[] setTS570PTTState(boolean on) {
        if (on) {
            return TS570_PTT_ON.getBytes();
        } else {
            return TS570_PTT_OFF.getBytes();
        }

    }
    public static byte[] setTS2000PTTState(boolean on) {
        if (on) {
            return TS2000_PTT_ON.getBytes();
        } else {
            return TS590_PTT_OFF.getBytes();
        }

    }

    public static byte[] setFLEX6000PTTState(boolean on) {
        if (on) {
            return FLEX_6000_PTT_ON.getBytes();
        } else {
            return TS590_PTT_OFF.getBytes();
        }

    }


    //设置成VFO模式
    public static byte[] setVFOMode() {
        return SET_VFO.getBytes();
    }

    public static byte[] setTS590VFOMode() {
        return TS590_VFO_A.getBytes();
    }

    public static byte[] setOperationUSBMode() {
        return USB_MODE.getBytes();
    }

    public static byte[] setTS590OperationUSBMode() {
        return TS590_SET_USB.getBytes();
    }

    public static byte[] setFLEX6000OperationUSBMode() {
        return FLEX_SET_USB_DATA.getBytes();
    }

    @SuppressLint("DefaultLocale")
    public static byte[] setOperationFreq(long freq) {
        return String.format("FA%011d\r", freq).getBytes();
    }

    @SuppressLint("DefaultLocale")
    public static byte[] setTS590OperationFreq(long freq) {
        return String.format("FA%011d;", freq).getBytes();
    }

    public static byte[] setReadOperationFreq() {
        return READ_FREQ.getBytes();
    }

    public static byte[] setRead590Meters() {
        return TS590_READ_METERS.getBytes();
    }

    public static byte[] setTS590ReadOperationFreq() {
        return TS590_READ_FREQ.getBytes();
    }


    //2023-08-16 由DS1UFX提交修改（基于0.9版），增加(tr)uSDX audio over cat的支持。
    public static byte[] setTrUSDXStreaming(boolean on) {
        if (on) {
            return TRUSDX_STREAMING_ON_SPEAKER_OFF.getBytes();
        } else {
            return TRUSDX_STREAMING_OFF.getBytes();
        }
    }

    public static byte[] setTrUSDXPTTState(boolean on) {
        if (on) {
            return ";TX0;".getBytes();
        } else {
            return ";RX;".getBytes();
        }
    }

}
