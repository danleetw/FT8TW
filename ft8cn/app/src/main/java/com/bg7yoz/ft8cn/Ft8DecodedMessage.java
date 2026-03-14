/**
 * FT8解碼相關核心
 *
 * @author BV6LC
 * @date 2025-09-01
 * 
 */

package com.bg7yoz.ft8cn;


import java.util.Arrays;
import java.util.Locale;

import com.bg7yoz.ft8cn.Ft8Message;
import com.bg7yoz.ft8cn.ft8signal.FT8Package;
import com.bg7yoz.ft8cn.ui.ToastMessage;


public class Ft8DecodedMessage {
	public int i3 = 0;
    public int n3 = 0;
	
	public float time_sec;
	
	public String callsignFrom="";
    public String callsignTo="";      // 👈 確保這行存在！
    public String maidenGrid="";
    public String report="";
    public float freq_hz=0;
    public int snr=-99;
	
	public static int sample_rate=12000;
	//GeneralVariables.audioSampleRate
    
    public boolean isMyCall;
	
	static {
        //System.loadLibrary("ft8cn");
		System.loadLibrary("ft8tw");
    }
	
	

    public  Ft8DecodedMessage(String callFrom,String callsignTo, String maidenGrid, String report, float freq_hz,int snr,float time_sec,boolean isMyCall) {
        this.callsignFrom = (callFrom == null) ? "" : callFrom;
		this.callsignTo = (callsignTo == null) ? "" : callsignTo;
        this.maidenGrid = (maidenGrid == null) ? "" : maidenGrid;
		
        this.report 	= (report == null) ? "" : report;
		this.freq_hz 	=	freq_hz;
		this.snr 		=	snr;
        this.time_sec 	=	time_sec;
        this.isMyCall 	=	isMyCall;
    }
	
	
	//新增 解碼FT8聲調 Native C
	//public static native Ft8DecodedMessage[]  decodeFromVoice(float[] voice, String[] output, int max);
	//public static native Ft8DecodedMessage[]  decodeFromVoice(java.nio.ByteBuffer voiceBuf, int max, int decode_mode ); //快速解碼（少量） 0 / 平衡模式（預設） 1 /深度解碼（最多） 2
	public static native Ft8DecodedMessage[]  decodeFromVoice(java.nio.ByteBuffer voiceBuf, int max, int decode_mode ,boolean is_ft4); //快速解碼（少量） 0 / 平衡模式（預設） 1 /深度解碼（最多） 2
	

	//新增 產生FT8聲調 Native C
	//public static native float[] generateFt8(Ft8Message msg, float frequency);
	
	// ✅ 兩個參數版本，內部自動取得 sample_rate 再呼叫 native 方法
    /*public static float[] generateFt8(Ft8Message msg, float frequency) {
        int sampleRate = sample_rate;  
        return generateFt8(msg, frequency, sampleRate);
    }*/
	
	
	private static final int FTX_LDPC_K = 91;
	public static final int FTX_LDPC_K_BYTES = (FTX_LDPC_K + 7) / 8;
	
	
	/**
     * 检查是不是标准呼号
     *
     * @param callsign 呼号
     * @return 是不是
     */
    public static boolean checkIsStandardCallsign(String callsign) {
        String temp;
        if (callsign.endsWith("/P") || callsign.endsWith("/R")){
            temp=callsign.substring(0,callsign.length()-2);
        }else {
            temp=callsign;
        }
        //FT8的认定：标准业余呼号由一个或两个字符的前缀组成，其中至少一个必须是字母，后跟一个十进制数字和最多三个字母的后缀。
        return temp.matches("[A-Z0-9]?[A-Z0-9][0-9][A-Z][A-Z0-9]?[A-Z]?");
    }
	
	/**
     * 检查是不是信号报告
     *
     * @param extraInfo 扩展消息
     * @return 是不是
     */
    private static boolean checkIsReport(String extraInfo) {
        if (extraInfo.equals("73") || extraInfo.equals("RRR")
                || extraInfo.equals("RR73")||extraInfo.equals("")) {
            return false;
        }
        return !extraInfo.trim().matches("[A-Z][A-Z][0-9][0-9]");
    }
	
	public static byte[] generateA91(Ft8Message msg,boolean hasModifier){
        if (msg.callsignFrom.length()<3){
            ToastMessage.show(GeneralVariables.getStringFromResource(R.string.callsign_error));
            return null;
        }
        // 首先，将文本数据打包为二进制消息,共12个字节
        byte[] packed = new byte[FTX_LDPC_K_BYTES];
        //把"<>"去掉
        msg.callsignTo = msg.callsignTo.replace("<", "").replace(">", "");
        msg.callsignFrom = msg.callsignFrom.replace("<", "").replace(">", "");
        if (hasModifier) {
            msg.modifier = GeneralVariables.toModifier;//修饰符
        }else {
            msg.modifier="";
        }


        //判定用非标准呼号i3=4的条件：
        //1.FROMCALL为非标准呼号 ，且 符合2或3
        //2.扩展消息时 网格、RR73,RRR,73
        //3.CQ,QRZ,DE



        if (msg.i3 != 0) {//目前只支持i3=1,i3=2,i3=4,i3=0 && n3=0
            if (!checkIsStandardCallsign(msg.callsignFrom)
                    && (!checkIsReport(msg.extraInfo) || msg.checkIsCQ())) {
                msg.i3 = 4;
            //} else if (msg.callsignFrom.endsWith("/P")||(msg.callsignTo.endsWith("/P"))) {
            } else if (msg.callsignFrom.endsWith("/P")//如果目标有/P后缀，则以目标呼号为准。如果目标没有/P后缀，则以发送方是否有/P后缀为准
                    ||(msg.callsignTo.endsWith("/P")&&(!msg.callsignFrom.endsWith("/P")))) {
                msg.i3 = 2;
            } else {
                msg.i3 = 1;
            }
        }

        if (msg.i3 == 1 || msg.i3 == 2) {
            packed = FT8Package.generatePack77_i1(msg);
        } else if (msg.i3 == 4) {//说明是非标准呼号
            packed = FT8Package.generatePack77_i4(msg);
        } else {
            packFreeTextTo77(msg.getMessageText(), packed);
        }

        return packed;
    }
	
	
	public static native float[] generateFt8(Ft8Message msg, float frequency, int sample_rate,boolean is_ft4);
	
	public static native int packFreeTextTo77(String text, byte[] out);	

	// native 方法宣告
    public static native int[] computeHashes(String callsign);	
	
	// 頻譜
	//public static native void getFFTDataInt(float[] data, int fftData[]);
	//public static native void getFFTDataIntDeNoise(float[] data, int fftData[]);
	public static native void getFFTDataInt(float[] data, int[] fftData, boolean denoise);
	
	//重新抽樣(TrUSDXRig.java使用)
	public static native float[] get32Resample16(short[] inputData, int inputRate, int outputRate, int channels);
	//TrUSDXRig.javajava使用)
	public static native byte[] get8Resample32(float[] inputData, int inputRate, int outputRate, int channels);

}



