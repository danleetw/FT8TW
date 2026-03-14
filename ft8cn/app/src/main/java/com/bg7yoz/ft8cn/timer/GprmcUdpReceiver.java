package com.bg7yoz.ft8cn.timer;

import android.util.Log;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.SocketException;
import java.util.Calendar;
import java.util.TimeZone;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * 監聽 UDP 廣播的 GPRMC/GNRMC NMEA 句子，解析 GPS 時間與經緯度。
 * 採用「單次短暫監聽」模式：開 socket → 收到第一個有效句子 → 關閉 socket。
 *
 * 使用方式：
 *   GprmcUdpReceiver.receiveOnce(10100, 3000, new GprmcUdpReceiver.Callback() { ... });
 *
 * @author BV6LC
 */
public class GprmcUdpReceiver {
    private static final String TAG = "GprmcUdpReceiver";

    public interface Callback {
        /** 成功解析，gpsTimeMs 為 GPS UTC 時間（毫秒），lat/lng 為十進位經緯度 */
        void onSuccess(long gpsTimeMs, double lat, double lng);
        /** 逾時或解析失敗 */
        void onFailed(String reason);
    }

    private static final ExecutorService pool = Executors.newCachedThreadPool();

    /**
     * 在背景執行緒監聽指定 UDP port，收到第一個有效 GPRMC/GNRMC 後回呼 callback。
     * 若在 timeoutMs 內未收到有效句子，呼叫 onFailed。
     *
     * @param port      UDP port（通常 10100）
     * @param timeoutMs 等待逾時（毫秒），建議 3000
     * @param callback  結果回呼（在背景執行緒呼叫，呼叫端自行切換至 UI thread）
     * @return 已開啟的 DatagramSocket，呼叫端可呼叫 close() 提前取消
     */
    public static DatagramSocket receiveOnce(int port, int timeoutMs, Callback callback) {
        DatagramSocket socket;
        try {
            socket = new DatagramSocket(port);
        } catch (SocketException e) {
            callback.onFailed("無法開啟 UDP port " + port + ": " + e.getMessage());
            return null;
        }

        final DatagramSocket finalSocket = socket;
        pool.execute(() -> {
            try {
                finalSocket.setBroadcast(true);  // 接收 UDP broadcast 封包必要
                finalSocket.setSoTimeout(timeoutMs);
                Log.d(TAG, "開始監聽 UDP port " + port + "，timeout=" + timeoutMs + "ms");
                byte[] buf = new byte[512];
                DatagramPacket packet = new DatagramPacket(buf, buf.length);

                long deadline = System.currentTimeMillis() + timeoutMs;
                while (System.currentTimeMillis() < deadline) {
                    finalSocket.receive(packet);
                    String data = new String(packet.getData(), 0, packet.getLength());
                    Log.d(TAG, "收到封包 from " + packet.getAddress() + ":" + packet.getPort()
                            + "  內容: " + data.replace("\r", "\\r").replace("\n", "\\n"));

                    // 一個封包可能含多行
                    for (String line : data.split("[\\r\\n]+")) {
                        ParsedGprmc result = parse(line.trim());
                        if (result != null) {
                            Log.d(TAG, "成功解析 GPRMC，timeMs=" + result.timeMs
                                    + " lat=" + result.lat + " lng=" + result.lng);
                            callback.onSuccess(result.timeMs, result.lat, result.lng);
                            return;
                        }
                    }
                }
                Log.d(TAG, "Timeout: 未收到有效 GPRMC/GNRMC");
                callback.onFailed("Timeout: 未收到有效 GPRMC/GNRMC");

            } catch (SocketException e) {
                // socket 被外部 close() 中斷（正常取消，不視為錯誤）
                Log.d(TAG, "Socket 關閉（正常取消）: " + e.getMessage());
                callback.onFailed("Cancelled");
            } catch (Exception e) {
                Log.e(TAG, "接收錯誤: " + e.getMessage());
                callback.onFailed(e.getMessage());
            } finally {
                if (!finalSocket.isClosed()) finalSocket.close();
            }
        });

        return socket;
    }

    // ──────────────────────────────────────────────
    // 解析邏輯
    // ──────────────────────────────────────────────

    private static class ParsedGprmc {
        long timeMs;
        double lat, lng;
    }

    /**
     * 解析單行 GPRMC 或 GNRMC
     * 格式: $GPRMC,HHMMSS.ss,A,DDMM.mmmm,N,DDDMM.mmmm,E,...,DDMMYY,...*XX
     *
     * @return 解析結果，若句子無效或狀態非 Active 則回傳 null
     */
    static ParsedGprmc parse(String nmea) {
        if (nmea == null || nmea.isEmpty()) return null;
        if (!nmea.startsWith("$GPRMC") && !nmea.startsWith("$GNRMC")) return null;

        // 去掉 checksum（*XX）
        int star = nmea.indexOf('*');
        if (star > 0) nmea = nmea.substring(0, star);

        String[] f = nmea.split(",", -1);
        if (f.length < 10) return null;
        if (!"A".equals(f[2])) return null; // 非 Active（無有效定位）

        try {
            // 時間欄位 HHMMSS.ss
            String t = f[1];
            // 日期欄位 DDMMYY
            String d = f[9];
            if (t.length() < 6 || d.length() < 6) return null;

            int hh = Integer.parseInt(t.substring(0, 2));
            int mm = Integer.parseInt(t.substring(2, 4));
            int ss = Integer.parseInt(t.substring(4, 6));
            int DD = Integer.parseInt(d.substring(0, 2));
            int MM = Integer.parseInt(d.substring(2, 4));
            int YY = Integer.parseInt(d.substring(4, 6)) + 2000;

            Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
            cal.set(YY, MM - 1, DD, hh, mm, ss);
            cal.set(Calendar.MILLISECOND, 0);

            // 經緯度（DDMM.mmmm 格式 → 十進位）
            double lat = nmeaToDecimal(f[3], f[4]);
            double lng = nmeaToDecimal(f[5], f[6]);

            ParsedGprmc r = new ParsedGprmc();
            r.timeMs = cal.getTimeInMillis();
            r.lat    = lat;
            r.lng    = lng;
            return r;

        } catch (NumberFormatException e) {
            return null;
        }
    }

    /**
     * 將 NMEA 的 DDDMM.mmmm 格式轉成十進位度數
     *
     * @param value "2503.1234" 或 "12130.4567"
     * @param hemi  "N"/"S"/"E"/"W"
     */
    private static double nmeaToDecimal(String value, String hemi) {
        if (value == null || value.isEmpty()) return 0.0;
        double raw = Double.parseDouble(value);
        int degrees = (int) (raw / 100);
        double minutes = raw - degrees * 100.0;
        double decimal = degrees + minutes / 60.0;
        if ("S".equals(hemi) || "W".equals(hemi)) decimal = -decimal;
        return decimal;
    }
}
