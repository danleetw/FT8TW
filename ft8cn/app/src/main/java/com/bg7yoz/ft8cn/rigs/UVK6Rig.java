package com.bg7yoz.ft8cn.rigs;

import android.util.Log;

import com.bg7yoz.ft8cn.Ft8Message;
import com.bg7yoz.ft8cn.GeneralVariables;

public class UVK6Rig extends BaseRig {
    private static final String TAG = "UVK6Rig";
    private static final int TX_COMMAND_GAP_MILLISECOND = 30;

    @Override
    public void setPTT(boolean on) {
        super.setPTT(on);
    }

    @Override
    public boolean isConnected() {
        return getConnector() != null && getConnector().isConnected();
    }

    @Override
    public void setUsbModeToRig() {
        // The transmit frame itself selects the FT8/FT4 digital mode.
    }

    @Override
    public void setFreqToRig() {
        if (getConnector() == null) {
            return;
        }
        getConnector().sendData(
                UVK6DigiProtocol.buildFrequencyCommand(getRadioFrequencyHz(), UVK6DigiProtocol.MODE_FREQ_ONLY));
    }

    @Override
    public void onReceiveData(byte[] data) {
        if (data == null || data.length == 0) {
            return;
        }
        Log.d(TAG, "receive: " + byteToStr(data));
    }

    @Override
    public void readFreqFromRig() {
        // The current uvk5cec DigiManager protocol is app->rig only.
    }

    @Override
    public String getName() {
        return "UV-K6 Digi";
    }

    @Override
    public boolean supportDirectMessageTransmit() {
        return true;
    }

    @Override
    public void sendWaveData(Ft8Message message) {
        if (getConnector() == null || message == null) {
            return;
        }

        byte[] digitalFrame = UVK6DigiProtocol.buildDigitalCommand(message);
        if (digitalFrame == null) {
            setPTT(false);
            return;
        }

        getConnector().sendData(
                UVK6DigiProtocol.buildFrequencyCommand(getRadioFrequencyHz(), UVK6DigiProtocol.MODE_FREQ_ONLY));
        try {
            Thread.sleep(TX_COMMAND_GAP_MILLISECOND);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        getConnector().sendData(digitalFrame);
    }

    private long getRadioFrequencyHz() {
        long radioFrequencyHz = getFreq();
        if (radioFrequencyHz <= 0) {
            radioFrequencyHz = GeneralVariables.band;
        }
        return radioFrequencyHz;
    }
}
