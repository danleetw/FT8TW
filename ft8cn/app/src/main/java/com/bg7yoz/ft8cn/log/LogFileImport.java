package com.bg7yoz.ft8cn.log;

import com.bg7yoz.ft8cn.html.ImportTaskList;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;

/**
 * 日志文件导入（串流版）。
 * 使用 BufferedReader 逐區塊讀取，遇到 <eor> 就解析一筆記錄並透過 callback 回傳，
 * 記憶體使用量為 O(單筆記錄大小) 而非 O(整個檔案大小)，避免大檔案 OOM。
 *
 * @author BGY70Z
 * @date 2023-03-20
 * @author BV6LC
 * @date 2025-02 改為串流處理，解決大檔匯入 OOM
 */

public class LogFileImport {
    private static final String TAG = "LogFileImport";
    private final String logFileName;
    private final HashMap<Integer,String> errorLines = new HashMap<>();
    private ImportTaskList.ImportTask importTask;

    /** 每筆記錄的 callback */
    public interface RecordCallback {
        void onRecord(HashMap<String, String> record, int index);
    }

    public LogFileImport(ImportTaskList.ImportTask task, String logFileName) {
        importTask = task;
        this.logFileName = logFileName;
    }

    /**
     * 串流處理所有記錄。逐區塊讀取檔案，遇到 &lt;eor&gt; 就解析一筆並 callback，
     * 不會將整個檔案載入記憶體。
     *
     * @param callback 每筆記錄解析完成後的回呼
     * @return 總記錄數
     * @throws IOException 讀檔錯誤
     */
    public int processRecords(RecordCallback callback) throws IOException {
        int count = 0;

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(new FileInputStream(logFileName)), 8192)) {

            StringBuilder buf = new StringBuilder();
            boolean pastHeader = false;
            char[] readBuf = new char[4096];
            int charsRead;

            while ((charsRead = reader.read(readBuf)) != -1) {
                buf.append(readBuf, 0, charsRead);

                // 尚未跳過檔頭，尋找 <eoh>
                if (!pastHeader) {
                    int eohIdx = indexOfIgnoreCase(buf, "<eoh>");
                    if (eohIdx >= 0) {
                        pastHeader = true;
                        buf.delete(0, eohIdx + 5); // 移除檔頭
                    } else {
                        // 保留尾端 5 字元（防止 <eoh> 跨區塊切割）
                        if (buf.length() > 4096) {
                            buf.delete(0, buf.length() - 5);
                        }
                        continue;
                    }
                }

                // 逐筆處理 <eor> 標記的記錄
                count = processBuffer(buf, callback, count);
            }

            // 處理最後可能殘留的記錄（沒有 <eor> 結尾的情況）
            if (pastHeader && buf.length() > 0 && buf.toString().contains("<")) {
                count++;
                try {
                    HashMap<String, String> record = parseOneRecord(buf.toString());
                    if (!record.isEmpty()) {
                        callback.onRecord(record, count);
                    }
                } catch (Exception e) {
                    errorLines.put(count, buf.toString().replace("<", "&lt;"));
                    importTask.readErrorCount = errorLines.size();
                }
            }
        }

        return count;
    }

    /**
     * 從 buf 中取出所有完整記錄（以 &lt;eor&gt; 分隔），逐筆解析並 callback。
     * 處理完的資料從 buf 中移除，剩餘不完整的部分留在 buf 中等下一批資料。
     */
    private int processBuffer(StringBuilder buf, RecordCallback callback, int count) {
        while (true) {
            int eorIdx = indexOfIgnoreCase(buf, "<eor>");
            if (eorIdx < 0) break;

            String recordStr = buf.substring(0, eorIdx);
            buf.delete(0, eorIdx + 5);

            count++;
            if (!recordStr.contains("<")) continue;

            try {
                HashMap<String, String> record = parseOneRecord(recordStr);
                callback.onRecord(record, count);
            } catch (Exception e) {
                errorLines.put(count, recordStr.replace("<", "&lt;"));
                importTask.readErrorCount = errorLines.size();
            }
        }
        return count;
    }

    /**
     * 解析一筆 ADIF 記錄字串為 HashMap。
     * 與原本 getLogRecords() 中的解析邏輯完全相同。
     */
    private HashMap<String, String> parseOneRecord(String recordStr) {
        HashMap<String, String> record = new HashMap<>();
        String[] fields = recordStr.split("<");

        for (String field : fields) {
            if (field.length() <= 1) continue;

            String[] values = field.split(">");
            if (values.length <= 1) continue;

            if (values[0].contains(":")) {
                String[] ttt = values[0].split(":");
                if (ttt.length > 1) {
                    String name = ttt[0];
                    int valueLen = Integer.parseInt(ttt[1]);
                    if (valueLen > 0) {
                        if (values[1].length() < valueLen) {
                            valueLen = values[1].length() - 1;
                        }
                        String value = values[1].substring(0, valueLen);
                        record.put(name.toUpperCase(), value);
                    }
                }
            }
        }
        return record;
    }

    /**
     * 在 StringBuilder 中搜尋不分大小寫的子字串，回傳起始位置。
     * 不產生新的 String 物件，避免額外記憶體分配。
     */
    private static int indexOfIgnoreCase(StringBuilder sb, String target) {
        int targetLen = target.length();
        int limit = sb.length() - targetLen;
        for (int i = 0; i <= limit; i++) {
            boolean match = true;
            for (int j = 0; j < targetLen; j++) {
                if (Character.toLowerCase(sb.charAt(i + j))
                        != Character.toLowerCase(target.charAt(j))) {
                    match = false;
                    break;
                }
            }
            if (match) return i;
        }
        return -1;
    }

    /**
     * 快速預掃檔案，只數 &lt;eor&gt; 數量以取得總記錄數。
     * 不做任何解析，記憶體用量極低，速度快。
     * 用於在 processRecords() 之前設定進度條總數。
     */
    public int countRecords() throws IOException {
        int count = 0;
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(new FileInputStream(logFileName)), 8192)) {

            StringBuilder buf = new StringBuilder();
            boolean pastHeader = false;
            char[] readBuf = new char[8192];
            int charsRead;

            while ((charsRead = reader.read(readBuf)) != -1) {
                buf.append(readBuf, 0, charsRead);

                if (!pastHeader) {
                    int eohIdx = indexOfIgnoreCase(buf, "<eoh>");
                    if (eohIdx >= 0) {
                        pastHeader = true;
                        buf.delete(0, eohIdx + 5);
                    } else {
                        if (buf.length() > 8192) {
                            buf.delete(0, buf.length() - 5);
                        }
                        continue;
                    }
                }

                // 只數 <eor> 數量，不解析內容
                while (true) {
                    int eorIdx = indexOfIgnoreCase(buf, "<eor>");
                    if (eorIdx < 0) break;
                    count++;
                    buf.delete(0, eorIdx + 5);
                }

                // 保留尾端防止跨區塊切割
                if (buf.length() > 5) {
                    String tail = buf.substring(buf.length() - 5);
                    buf.setLength(0);
                    buf.append(tail);
                }
            }
        }
        return count;
    }

    public int getErrorCount() {
        return errorLines.size();
    }

    public HashMap<Integer, String> getErrorLines() {
        return errorLines;
    }
}
