/* Copyright 2011-2013 Google Inc.
 * Copyright 2013 mike wakerly <opensource@hoho.com>
 *
 * Project home page: https://github.com/mik3y/usb-serial-for-android
 */

package com.bg7yoz.ft8cn.serialport;

import android.util.Pair;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Maps (vendor id, product id) pairs to the corresponding serial driver.
 *
 * @author mike wakerly (opensource@hoho.com)
 */
public class ProbeTable {

    private final Map<Pair<Integer, Integer>, Class<? extends UsbSerialDriver>> mProbeTable =
            new LinkedHashMap<>();

    /**
     * Adds or updates a (vendor, product) pair in the table.
     *
     * @param vendorId the USB vendor id
     * @param productId the USB product id
     * @param driverClass the driver class responsible for this pair
     * @return {@code this}, for chaining
     */
    public ProbeTable addProduct(int vendorId, int productId,
            Class<? extends UsbSerialDriver> driverClass) {
        mProbeTable.put(Pair.create(vendorId, productId), driverClass);
        return this;
    }

    /**
     * Registers all (vendorId, productId) pairs in {@code devices} for {@code driverClass}.
     *
     * <p>The device map is passed directly rather than obtained via reflection, so R8/ProGuard
     * does not strip {@code getSupportedDevices()} from release builds — which previously caused
     * a {@code NoSuchMethodException} crash on startup.
     *
     * @param driverClass the driver class
     * @param devices map from vendor ID to array of product IDs, as returned by
     *                {@code getSupportedDevices()} on each driver
     * @return {@code this}, for chaining
     */
    ProbeTable addDriver(Class<? extends UsbSerialDriver> driverClass, Map<Integer, int[]> devices) {
        for (Map.Entry<Integer, int[]> entry : devices.entrySet()) {
            final int vendorId = entry.getKey();
            for (int productId : entry.getValue()) {
                addProduct(vendorId, productId, driverClass);
            }
        }
        return this;
    }

    /**
     * Returns the driver for the given (vendor, product) pair, or {@code null}
     * if no match.
     *
     * @param vendorId the USB vendor id
     * @param productId the USB product id
     * @return the driver class matching this pair, or {@code null}
     */
    public Class<? extends UsbSerialDriver> findDriver(int vendorId, int productId) {
        final Pair<Integer, Integer> pair = Pair.create(vendorId, productId);
        return mProbeTable.get(pair);
    }

}
