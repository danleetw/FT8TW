package com.bg7yoz.ft8cn.rigs;

import com.bg7yoz.ft8cn.FT8Common;
import com.bg7yoz.ft8cn.Ft8DecodedMessage;
import com.bg7yoz.ft8cn.Ft8Message;
import com.bg7yoz.ft8cn.GeneralVariables;

final class UVK6DigiProtocol {
    private static final byte[] STX = new byte[]{
            0x59, 0x57, 0x58, 0x73
    };
    private static final byte[] ETX = new byte[]{
            (byte) 0x95, 0x75, (byte) 0x85, 0x37
    };

    static final int MODE_FT8 = 0;
    static final int MODE_FT4 = 1;
    static final int MODE_FREQ_ONLY = 10;

    private static final int COMMAND_FREQ_MODE = 0x32;
    private static final int COMMAND_DIGITAL_DATA = 0x35;

    private static final int FT8_SYMBOL_COUNT = 79;
    private static final int FT4_SYMBOL_COUNT = 105;
    private static final double FT8_SYMBOL_SECONDS = 0.160;
    private static final double FT4_SYMBOL_SECONDS = 0.048;
    private static final double FT8_TONE_SPACING_HZ = 6.25;
    private static final double FT4_TONE_SPACING_HZ = 20.833333333333332;

    private static final int SAMPLE_RATE = FT8Common.SAMPLE_RATE;
    private static final double WINDOW_OFFSET_RATIO = 0.25;
    private static final double WINDOW_LENGTH_RATIO = 0.50;

    private UVK6DigiProtocol() {
    }

    static int getDigitalMode(Ft8Message message) {
        if (message != null && message.signalFormat == FT8Common.FT4_MODE) {
            return MODE_FT4;
        }
        return GeneralVariables.isFT4 ? MODE_FT4 : MODE_FT8;
    }

    static byte[] buildFrequencyCommand(long radioFrequencyHz, int digitalMode) {
        byte[] header = new byte[5];
        int targetFrequency = (int) Math.max(0L, radioFrequencyHz / 10L);
        header[0] = (byte) (targetFrequency & 0xFF);
        header[1] = (byte) ((targetFrequency >> 8) & 0xFF);
        header[2] = (byte) ((targetFrequency >> 16) & 0xFF);
        header[3] = (byte) ((targetFrequency >> 24) & 0xFF);
        header[4] = (byte) digitalMode;
        return buildFrame(COMMAND_FREQ_MODE, header, null);
    }

    static byte[] buildDigitalCommand(Ft8Message message) {
        if (message == null) {
            return null;
        }

        int subFrequencyHz = Math.round(
                message.freq_hz > 0 ? message.freq_hz : GeneralVariables.getBaseFrequency());
        boolean isFt4 = getDigitalMode(message) == MODE_FT4;
        float[] signal = Ft8DecodedMessage.generateFt8(
                message, subFrequencyHz, SAMPLE_RATE, isFt4);
        if (signal == null) {
            return null;
        }

        byte[] tones = extractTones(signal, subFrequencyHz, isFt4);
        if (tones == null) {
            return null;
        }

        byte[] header = new byte[5];
        header[0] = (byte) ((subFrequencyHz >> 8) & 0xFF);
        header[1] = (byte) (subFrequencyHz & 0xFF);
        header[2] = 0;
        header[3] = 0;
        header[4] = (byte) getDigitalMode(message);
        return buildFrame(COMMAND_DIGITAL_DATA, header, tones);
    }

    private static byte[] buildFrame(int commandType, byte[] header, byte[] payload) {
        int payloadLength = payload == null ? 0 : payload.length;
        byte[] frame = new byte[16 + payloadLength];
        System.arraycopy(STX, 0, frame, 0, STX.length);
        frame[4] = (byte) commandType;
        frame[5] = (byte) (payloadLength & 0xFF);
        frame[6] = (byte) ((payloadLength >> 8) & 0xFF);
        System.arraycopy(header, 0, frame, 7, header.length);
        System.arraycopy(ETX, 0, frame, 12, ETX.length);
        if (payloadLength > 0) {
            System.arraycopy(payload, 0, frame, 16, payloadLength);
        }
        return frame;
    }

    private static byte[] extractTones(float[] audio, int baseFrequencyHz, boolean isFt4) {
        int symbolCount = isFt4 ? FT4_SYMBOL_COUNT : FT8_SYMBOL_COUNT;
        int samplesPerSymbol = (int) Math.round(
                SAMPLE_RATE * (isFt4 ? FT4_SYMBOL_SECONDS : FT8_SYMBOL_SECONDS));
        int windowOffset = Math.max(1, (int) Math.round(samplesPerSymbol * WINDOW_OFFSET_RATIO));
        int windowLength = Math.max(8, (int) Math.round(samplesPerSymbol * WINDOW_LENGTH_RATIO));
        int requiredSamples = (symbolCount - 1) * samplesPerSymbol + windowOffset + windowLength;
        if (audio.length < requiredSamples) {
            return null;
        }

        double toneSpacing = isFt4 ? FT4_TONE_SPACING_HZ : FT8_TONE_SPACING_HZ;
        byte[] tones = new byte[symbolCount];
        for (int symbol = 0; symbol < symbolCount; symbol++) {
            int start = symbol * samplesPerSymbol + windowOffset;
            tones[symbol] = (byte) detectTone(audio, start, windowLength, baseFrequencyHz, toneSpacing);
        }
        return tones;
    }

    private static int detectTone(
            float[] audio, int start, int windowLength, int baseFrequencyHz, double toneSpacingHz) {
        int bestTone = 0;
        double bestEnergy = Double.NEGATIVE_INFINITY;
        for (int tone = 0; tone < 8; tone++) {
            double frequencyHz = baseFrequencyHz + tone * toneSpacingHz;
            double angularStep = 2.0 * Math.PI * frequencyHz / SAMPLE_RATE;
            double iSum = 0.0;
            double qSum = 0.0;
            for (int index = 0; index < windowLength; index++) {
                double sample = audio[start + index];
                double phase = angularStep * index;
                iSum += sample * Math.cos(phase);
                qSum += sample * Math.sin(phase);
            }
            double energy = iSum * iSum + qSum * qSum;
            if (energy > bestEnergy) {
                bestEnergy = energy;
                bestTone = tone;
            }
        }
        return bestTone;
    }
}
