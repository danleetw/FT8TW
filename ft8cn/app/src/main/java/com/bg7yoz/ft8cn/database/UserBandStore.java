package com.bg7yoz.ft8cn.database;

import android.content.Context;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.List;

public class UserBandStore {

    private static final String TAG = "UserBandStore";

    private static String getFileName(boolean isFT4) {
        return isFT4 ? "user_bands_ft4.json" : "user_bands_ft8.json";
    }

    private static File getFile(Context context, boolean isFT4) {
        return new File(context.getFilesDir(), getFileName(isFT4));
    }

    /** 讀取使用者自訂頻率 */
    public static List<OperationBand.Band> load(Context context, boolean isFT4) {
        List<OperationBand.Band> result = new ArrayList<>();
        File file = getFile(context, isFT4);

        if (!file.exists()) {
            return result;
        }

        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line);
            }

            JSONArray arr = new JSONArray(sb.toString());
            for (int i = 0; i < arr.length(); i++) {
                JSONObject o = arr.getJSONObject(i);
                long band = o.getLong("band");
                String wave = o.getString("waveLength");

                OperationBand.Band b = new OperationBand.Band(band, wave);
                b.marked = true; // ⭐ 使用者頻率標記
                result.add(b);
            }
        } catch (Exception e) {
            Log.e(TAG, "load failed", e);
        }

        return result;
    }

    /** 儲存單一使用者頻率（append，不重寫 assets） */
    public static void save(Context context, OperationBand.Band band, boolean isFT4) {
        try {
            List<OperationBand.Band> existing = load(context, isFT4);

            // 防止重複
            for (OperationBand.Band b : existing) {
                if (b.band == band.band) {
                    return;
                }
            }

            existing.add(band);
            writeAll(context, existing, isFT4);

        } catch (Exception e) {
            Log.e(TAG, "save failed", e);
        }
    }

    private static void writeAll(Context context,
                                 List<OperationBand.Band> list,
                                 boolean isFT4) throws Exception {

        JSONArray arr = new JSONArray();
        for (OperationBand.Band b : list) {
            JSONObject o = new JSONObject();
            o.put("band", b.band);
            o.put("waveLength", b.waveLength);
            arr.put(o);
        }

        File file = getFile(context, isFT4);
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(file))) {
            bw.write(arr.toString(2));
        }
    }
}
