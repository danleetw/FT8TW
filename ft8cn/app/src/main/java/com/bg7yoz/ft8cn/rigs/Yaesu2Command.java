package com.bg7yoz.ft8cn.rigs;

public class Yaesu2Command {
    private static final String TAG="Yaesu 2 Command";

    public static long getFrequency(byte[] rawData){
        if (rawData.length==5){
            return  ((int) (rawData[0] >> 4) & 0xf) * 100000000
                    +(int) (rawData[0] & 0x0f) * 10000000
                    +((int) (rawData[1] >> 4) & 0xf) * 1000000
                    +(int) (rawData[1] & 0x0f) * 100000
                    +((int) (rawData[2] >> 4) & 0xf) * 10000
                    +(int) (rawData[2] & 0x0f) * 1000
                    +((int) (rawData[3] >> 4) & 0xf) * 10000
                    +(int) (rawData[3] & 0x0f) * 1000;
		} else if (rawData.length == 3) {
			// 解析 BCD 為整數（例如 014074）
			int value = ((rawData[0] >> 4) & 0x0F) * 100_000
					  + (rawData[0] & 0x0F) * 10_000
					  + ((rawData[1] >> 4) & 0x0F) * 1_000
					  + (rawData[1] & 0x0F) * 100
					  + ((rawData[2] >> 4) & 0x0F) * 10
					  + (rawData[2] & 0x0F);  // value = 140740

			return value * 10_00;  // → 140740000 Hz
        }else {
            return -1;
        }
    }


}
