package com.bg7yoz.ft8cn.rigs;

public class TX500MPRig extends KenwoodTS2000Rig {
	
	
	@Override
    public void setUsbModeToRig() {
        if (getConnector() != null) {
            getConnector().sendData(KenwoodTK90RigConstant.setDmxOperationUSBMode());
        }
    }
	

    
    @Override
    public String getName() {
        return "TX-500MP";
    }
}