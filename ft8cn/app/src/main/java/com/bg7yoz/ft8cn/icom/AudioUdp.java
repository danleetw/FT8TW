package com.bg7yoz.ft8cn.icom;
/**
 * 处理音频流的基本类。
 * @author BGY70Z
 * @date 2023-08-26
 */

public class AudioUdp extends IcomUdpBase {
    private static final String TAG = "AudioUdp";

    public AudioUdp() {
        udpStyle = IcomUdpStyle.AudioUdp;
    }



    public void sendTxAudioData(float[] audioData){}
    public void startTxAudio(){}
    public void stopTXAudio(){}
}
