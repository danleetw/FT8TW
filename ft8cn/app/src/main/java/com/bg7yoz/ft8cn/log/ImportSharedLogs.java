package com.bg7yoz.ft8cn.log;

/**
 * 匯入QSO 紀錄
 * @author BGY70Z
 * @date 2023-03-20
 * @date 2025/7/2 BV6LC 修改記憶體滲漏
 */

import com.bg7yoz.ft8cn.GeneralVariables;
import com.bg7yoz.ft8cn.MainViewModel;
import com.bg7yoz.ft8cn.R;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;

import java.lang.ref.WeakReference;


public class ImportSharedLogs {
    private static final String TAG = "ImportSharedLogs";
    //private final Uri uri;
    private String fileContext;
    private final MainViewModel mainViewModel;
    private InputStream logFileStream = null;
    //private final HashMap<Integer,String> errorLines=new HashMap<>();

    public ImportSharedLogs(MainViewModel mainViewModel) throws IOException {
        this.mainViewModel = mainViewModel;
    }

    private boolean loadData(WeakReference<OnShareLogEvents> listenerRef){
        if (logFileStream != null) {
            byte[] bytes = new byte[0];
            try {
                bytes = new byte[logFileStream.available()];
                logFileStream.read(bytes);
                fileContext = new String(bytes);
            } catch (IOException e) {
				OnShareLogEvents listener = listenerRef.get();
                if (listener != null) {
                    listener.onShareFailed(String.format(
                            GeneralVariables.getStringFromResource(R.string.import_share_failed)
                            , e.getMessage()));
					
					
                }
                return false;
            }
            return true;

        } else {
            fileContext = "";
            return false;
        }
    }

    public String getLogBody() {
        String[] temp = fileContext.split("[<][Ee][Oo][Hh][>]");
        if (temp.length > 1) {
            return temp[temp.length - 1];
        } else {
            return "";
        }
    }

    /**
     * 获取日志文件中全部的记录，每条记录是以HashMap保存的。HashMap的Key是字段名（大写），Value是值。
     *
     * @return 记录列表。ArrayList
     */
    public ArrayList<HashMap<String, String>> getLogRecords() {
        String[] temp = getLogBody().split("[<][Ee][Oo][Rr][>]");//拆解出每个记录的原始内容
        ArrayList<HashMap<String, String>> records = new ArrayList<>();
        int count = 0;//解析计数器
        for (String s : temp) {//对每一个原始记录内容做拆解
            count++;
            if (!s.contains("<")) {
                continue;
            }//说明没有标签，不做拆解
            try {
                HashMap<String, String> record = new HashMap<>();//创建一个记录
                String[] fields = s.split("<");//拆解记录的每一个字段

                for (String field : fields) {//对每一个原始记录做拆解

                    if (field.length() > 1) {//如果是可拆解的
                        String[] values = field.split(">");//拆解记录的字段名和值

                        if (values.length > 1) {//如果是可拆解的
                            if (values[0].contains(":")) {//拆解字段名和字段的长度，冒号前的字段名，后面是长度
                                String[] ttt = values[0].split(":");
                                if (ttt.length > 1) {
                                    String name = ttt[0];//字段名
                                    int valueLen = Integer.parseInt(ttt[1]);//字段长度
                                    if (valueLen > 0) {
                                        if (values[1].length() < valueLen) {
                                            valueLen = values[1].length() - 1;
                                        }
                                        String value = values[1].substring(0, valueLen);//字段值
                                        record.put(name.toUpperCase(), value);//保存字段,key要大写
                                    }
                                }

                            }
                        }
                    }
                }
                records.add(record);//保存记录
            } catch (Exception e) {
                //errorLines.put(count,s);//把错误的内容保存下来。
                //importTask.readErrorCount=errorLines.size();
            }
        }
        return records;
    }

    public void doImport(InputStream logFileStream, OnShareLogEvents onShareLogEvents) {
        this.logFileStream = logFileStream;
		WeakReference<OnShareLogEvents> listenerRef = new WeakReference<>(onShareLogEvents);

        new Thread(() -> {
			OnShareLogEvents listener = listenerRef.get();

                //读入数据
                if (listener != null) {
                    listener.onPreparing(GeneralVariables.getStringFromResource(R.string.preparing_import_logs));
                }
                if (!loadData(listenerRef)) {
					listenerRef.clear();
                    return;
                }

                int position = 0;
                ArrayList<HashMap<String, String>> recordList = getLogRecords();//以正则表达式：[<][Ee][Oo][Rr][>]分行
                int count = recordList.size();

                if (listener  != null) {
                    listener.onShareStart(count, String.format(
                            GeneralVariables.getStringFromResource(R.string.total_logs)
                            , count));
                }


                for (HashMap<String, String> record : recordList) {
                    position++;
                    QSLRecord qslRecord = new QSLRecord(record);

                    mainViewModel.databaseOpr.doInsertQSLData(qslRecord, null);

                    if (listener  != null) {
                        if (!listener.onShareProgress(count, position
                                , String.format(GeneralVariables.getStringFromResource(R.string.share_logs_been_read)
                                        , position))) {
                            break;
                        }
                    }


                }

                if (listener  != null) {
                    listener.afterGet(count, String.format(
                            GeneralVariables.getStringFromResource(R.string.total_logs)
                            , position));
                }
				listenerRef.clear();

            
        }).start();
    }


    public String getFileContext() {
        return fileContext;
    }
}
