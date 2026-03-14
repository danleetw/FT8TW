package com.bg7yoz.ft8cn.rigs;

import static com.bg7yoz.ft8cn.GeneralVariables.QUERY_FREQ_TIMEOUT;
import static com.bg7yoz.ft8cn.GeneralVariables.START_QUERY_FREQ_DELAY;

import android.util.Log;

import com.bg7yoz.ft8cn.GeneralVariables;
import com.bg7yoz.ft8cn.R;
import com.bg7yoz.ft8cn.database.ControlMode;
import com.bg7yoz.ft8cn.ui.ToastMessage;

import java.util.Timer;
import java.util.TimerTask;

import com.bg7yoz.ft8cn.rigs.common.SWRConverter;

/**
 * 3代的指令，不同电台还有不同，频率长度981，991是9位，其它的长度是8位
 */
public class Yaesu39Rig extends BaseRig {
    private static final String TAG = "Yaesu3Rig";
    private final StringBuilder buffer = new StringBuilder();
    private int swr=0;
    private int alc=0;
    private boolean alcMaxAlert = false;
    private boolean swrAlert = false;
	
	
	// 2025/11/23 新增讀取SWR
	private float swrFloat=0f;
	private static final SWRConverter.CalEntry[] ICOM_SWR_TABLE = {
		new SWRConverter.CalEntry(0,   1.0f),
		new SWRConverter.CalEntry(30,  1.3f),
		new SWRConverter.CalEntry(60,  1.5f),
		new SWRConverter.CalEntry(100, 2.0f),
		new SWRConverter.CalEntry(160, 2.5f),
		new SWRConverter.CalEntry(200, 3.0f),
		new SWRConverter.CalEntry(230, 4.0f),
		new SWRConverter.CalEntry(255, 5.0f) // 最高值
	};
	private final SWRConverter swrConv = new SWRConverter(ICOM_SWR_TABLE);
	

    private boolean isDataUsb=false;//是不是DATA-USB模式

    private Timer readFreqTimer = new Timer();

    private TimerTask readTask() {
        return new TimerTask() {
            @Override
            public void run() {
                try {
                    if (!isConnected()) {
                        readFreqTimer.cancel();
                        readFreqTimer.purge();
                        readFreqTimer = null;
                        return;
                    }
                    if (isPttOn()) {
                        readMeters();
                    } else {
                        readFreqFromRig();
                    }
                } catch (Exception e) {
                    Log.e(TAG, "readFreq error:" + e.getMessage());
                }
            }
        };
    }

    /**
     * 读取Meter RM;
     */
    private void readMeters() {
        if (getConnector() != null) {
            clearBufferData();//清空一下缓存
            getConnector().sendData(Yaesu3RigConstant.setRead39Meters_ALC());
            getConnector().sendData(Yaesu3RigConstant.setRead39Meters_SWR());
			//getConnector().sendData(Yaesu3RigConstant.setRead39Meters_POWER());
			
        }
    }
    private void showAlert() {
		
		
        if (GeneralVariables.enableswrAlcAlert && swr >= Yaesu3RigConstant.swr_39_alert_max) {
            if (!swrAlert) {
                swrAlert = true;
                ToastMessage.show(GeneralVariables.getStringFromResource(R.string.swr_high_alert));
            }
        } else {
            swrAlert = false;
        }
		
        if (GeneralVariables.enableswrAlcAlert && alc > Yaesu3RigConstant.alc_39_alert_max) {//网络模式下不警告ALC
            if (!alcMaxAlert) {
                alcMaxAlert = true;
                ToastMessage.show(GeneralVariables.getStringFromResource(R.string.alc_high_alert));
            }
        } else {
            alcMaxAlert = false;
        }

    }
    /**
     * 清空缓存数据
     */
    private void clearBufferData() {
        buffer.setLength(0);
    }

    @Override
    public void setPTT(boolean on) {
        super.setPTT(on);
        if (getConnector() != null) {
            switch (getControlMode()) {
                case ControlMode.CAT://以CIV指令
                    getConnector().setPttOn(Yaesu3RigConstant.setPTTState(on));
                    break;
                case ControlMode.RTS:
                case ControlMode.DTR:
                    getConnector().setPttOn(on);
                    break;
            }
        }
    }

    @Override
    public boolean isConnected() {
        if (getConnector() == null) {
            return false;
        }
        return getConnector().isConnected();
    }

    @Override
    public void setUsbModeToRig() {
        if (getConnector() != null) {
            if (isDataUsb) {//使用DATA-USB模式
                getConnector().sendData(Yaesu3RigConstant.setOperationUSB_Data_Mode());
            }else {
                getConnector().sendData(Yaesu3RigConstant.setOperationUSBMode());
            }
        }
    }

    @Override
    public void setFreqToRig() {
        if (getConnector() != null) {
            getConnector().sendData(Yaesu3RigConstant.setOperationFreq9Byte(getFreq()));
        }
    }

    @Override
    public void onReceiveData(byte[] data) {
		String s = new String(data);
		s = s.replace('\r', ';'); // 換行符號統一為 ';'

		buffer.append(s);
		GeneralVariables.sendToSSE(TAG, "D", "onReceiveData: " + s + " Buffer: " + buffer);

		boolean endsWithSemicolon = buffer.toString().endsWith(";");

		String[] commands = buffer.toString().split(";");
		int completeCount = endsWithSemicolon ? commands.length : commands.length - 1;

		// 處理 incomplete 最後一筆
		if (!endsWithSemicolon && commands.length > 0) {
			buffer.setLength(0);
			buffer.append(commands[commands.length - 1]); // 保留未完成的
		} else {
			buffer.setLength(0); // 完整清除
		}

		for (int i = 0; i < completeCount; i++) {
			String cmdStr = commands[i].trim();
			if (cmdStr.isEmpty()) continue;

			GeneralVariables.sendToSSE(TAG, "D", "🔍 Parse Yaesu3 Cmd: " + cmdStr);

			Yaesu3Command yaesu3Command = Yaesu3Command.getCommand(cmdStr);
			if (yaesu3Command == null) {
				GeneralVariables.sendToSSE(TAG, "D", "❌ Unrecognized: " + cmdStr);
				continue;
			}

			String id = yaesu3Command.getCommandID();
			if (id.equalsIgnoreCase("FA") || id.equalsIgnoreCase("FB")) {
				//ToastMessage.show("FA");
				long tempFreq = Yaesu3Command.getFrequency(yaesu3Command);
				if (tempFreq != 0) {
					SSE_onFreqChanged(TAG, tempFreq);
					setFreq(tempFreq);
				}
			} else if (id.equalsIgnoreCase("RM")) { // Meter
				//ToastMessage.show("RM");
				if (Yaesu3Command.isSWRMeter39(yaesu3Command)) {
					swr = Yaesu3Command.getSWROrALC39(yaesu3Command);
					swrFloat = swrConv.convert(swr);
					SSE_readSwr(TAG, swrFloat);
					GeneralVariables.setSwl(swrFloat);
				}
				if (Yaesu3Command.isALCMeter39(yaesu3Command)) {
					alc = Yaesu3Command.getSWROrALC39(yaesu3Command);
				}
				showAlert();
			} else if (id.equalsIgnoreCase("PC")) { // Power
				//ToastMessage.show("PC");
				if (Yaesu3Command.isPOWERMeter39(yaesu3Command)) {
					float power = (float) Yaesu3Command.getPower39(yaesu3Command);
					SSE_CurrntPower(TAG, String.valueOf(power));
					GeneralVariables.mutablePower.postValue(power);
				}
			}
		}
	}
	
	

    @Override
    public void readFreqFromRig() {
        if (getConnector() != null) {
            clearBufferData();//清空一下缓存
            getConnector().sendData(Yaesu3RigConstant.setReadOperationFreq());
        }
    }

    @Override
    public String getName() {
        return "YAESU FT-891";
    }

    public Yaesu39Rig(boolean isDataUsb) {
        this.isDataUsb=isDataUsb;
        readFreqTimer.schedule(readTask(), START_QUERY_FREQ_DELAY, QUERY_FREQ_TIMEOUT);
    }
}
