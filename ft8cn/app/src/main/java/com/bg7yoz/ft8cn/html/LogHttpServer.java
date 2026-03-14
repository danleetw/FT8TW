package com.bg7yoz.ft8cn.html;
/**
 * Http服务的具体内容。数据库访问不需要异步方式。
 *
 * @author BGY70Z
 * @date 2023-03-20
 */

import static com.bg7yoz.ft8cn.html.HtmlContext.HTML_STRING;

import android.annotation.SuppressLint;
import android.database.Cursor;
import android.util.Log;

import com.bg7yoz.ft8cn.Ft8Message;
import com.bg7yoz.ft8cn.GeneralVariables;
import com.bg7yoz.ft8cn.MainViewModel;
import com.bg7yoz.ft8cn.R;
import com.bg7yoz.ft8cn.connector.CableSerialPort;
import com.bg7yoz.ft8cn.connector.ConnectMode;
import com.bg7yoz.ft8cn.database.AfterInsertQSLData;
import com.bg7yoz.ft8cn.database.ControlMode;
import com.bg7yoz.ft8cn.database.RigNameList;
import com.bg7yoz.ft8cn.log.LogFileImport;
import com.bg7yoz.ft8cn.log.QSLRecord;
import com.bg7yoz.ft8cn.maidenhead.MaidenheadGrid;
import com.bg7yoz.ft8cn.rigs.BaseRigOperation;
import com.bg7yoz.ft8cn.timer.UtcTimer;


import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import java.util.Locale;

import com.bg7yoz.ft8cn.LogExt;
//import fi.iki.elonen.NanoHTTPD;
import org.nanohttpd.protocols.http.IHTTPSession;
import org.nanohttpd.protocols.http.NanoHTTPD;
import org.nanohttpd.protocols.http.request.Method;
import org.nanohttpd.protocols.http.response.Response;
import org.nanohttpd.protocols.http.response.Status;
import org.nanohttpd.protocols.http.HTTPSession;



import java.io.PipedInputStream;
import java.io.PipedOutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;

import java.util.List;

import java.util.Arrays;
import java.io.BufferedWriter;

@SuppressWarnings("ConstantConditions")
public class LogHttpServer extends NanoHTTPD {
    private final MainViewModel mainViewModel;
    public static int DEFAULT_PORT = 7050;
    private static final String TAG = "LOG HTTP";

    private ImportTaskList importTaskList = new ImportTaskList();//导如日志的任务列表
	
	



    public LogHttpServer(MainViewModel viewModel, int port) {
        super(port);
        this.mainViewModel = viewModel;

    }

    @Override
    public Response serve(IHTTPSession session) {
		
		// 先處理 CORS pre-flight
		if (session.getMethod() == Method.OPTIONS) {
			Response preflight = Response.newFixedLengthResponse(Status.OK, NanoHTTPD.MIME_PLAINTEXT, "");
			preflight.addHeader("Access-Control-Allow-Origin",  "*");
			preflight.addHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
			preflight.addHeader("Access-Control-Allow-Headers", "Content-Type");
			return preflight;
		}
			
		
		
		
        String[] uriList = session.getUri().split("/");
        String uri = "";
        String msg;
        Log.i(TAG, "serve uri: " + session.getUri());

        if (uriList.length >= 2) {
            uri = uriList[1];
        }
		
		
		
		// SSE 推播路由
       //if ("events".equalsIgnoreCase(uri)) {
       //    return serveSSE();
       //}
	   
		

        if (uri.equalsIgnoreCase("CONFIG")) {//查配置信息
            msg = HTML_STRING(getConfig());
        } else if (uri.equalsIgnoreCase("showQSLCallsigns")) {//显示通联过的呼号，包括最后的时间
            msg = HTML_STRING(showQslCallsigns(session));
        } else if (uri.equalsIgnoreCase("DEBUG")) {//查通联过的呼号
            msg = HTML_STRING(showDebug());
        } else if (uri.equalsIgnoreCase("DEBUG_MONITOR")) {//查通联过的呼号
            msg = HTML_STRING(monitor(session));
        } else if (uri.equalsIgnoreCase("SHOWHASH")) {//查通呼号的哈希表
            msg = HTML_STRING(showCallsignHash());
        } else if (uri.equalsIgnoreCase("NEWMESSAGE")) {//查本周期通联消息表
            msg = HTML_STRING(getNewMessages());
        } else if (uri.equalsIgnoreCase("MESSAGE")) {//查保存的SWL通联消息表
            return getMessages(session);
        } else if (uri.equalsIgnoreCase("QSOSWLMSG")) {//查SWL QSO通联消息表
            return getSWLQsoMessages(session);
        } else if (uri.equalsIgnoreCase("QSOLogs")) {//查QSO日志
            return getQsoLogs(session);
        } else if (uri.equalsIgnoreCase("CALLSIGNGRID")) {//查呼号与网格的对应关系
            msg = HTML_STRING(showCallGridList());
        } else if (uri.equalsIgnoreCase("GETCALLSIGNQTH")) {
            msg = HTML_STRING(getCallsignQTH(session));
        } else if (uri.equalsIgnoreCase("ALLTABLE")) {//查所有的表
            msg = HTML_STRING(getAllTableName());
        } else if (uri.equalsIgnoreCase("FOLLOWCALLSIGNS")) {//查关注的呼号
            msg = HTML_STRING(getFollowCallsigns());
		} else if (uri.equalsIgnoreCase("ADDFOLLOW")) {// 手動新增關注的呼号 // [MODIFIED] BV6LC
            addFollowCallSign(session);	      // [MODIFIED] BV6LC
			msg = HTML_STRING(getFollowCallsigns());
        } else if (uri.equalsIgnoreCase("DELFOLLOW")) {//删除关注的呼号
            if (uriList.length >= 3) {
                deleteFollowCallSign(uriList[2].replace("_", "/"));
            }
            msg = HTML_STRING(getFollowCallsigns());
        } else if (uri.equalsIgnoreCase("DELQSL")) {
            if (uriList.length >= 3) {
                deleteQSLByMonth(uriList[2].replace("_", "/"));
            }
            msg = HTML_STRING(showQSLTable());
        } else if (uri.equalsIgnoreCase("QSLCALLSIGNS")) {//查通联过的呼号
            msg = HTML_STRING(getQSLCallsigns());
        } else if (uri.equalsIgnoreCase("QSLTABLE")) {
            msg = HTML_STRING(showQSLTable());
        } else if (uri.equalsIgnoreCase("IMPORTLOG")) {
            msg = HTML_STRING(showImportLog());
        } else if (uri.equalsIgnoreCase("GETIMPORTTASK")) {//这个是用户实时获取导入状态的URI
            msg = HTML_STRING(makeGetImportTaskHTML(session));
        } else if (uri.equalsIgnoreCase("CANCELTASK")) {//这个是用户取消导入的URI
            msg = HTML_STRING(doCancelImport(session));
        } else if (uri.equalsIgnoreCase("IMPORTLOGDATA")) {
            msg = HTML_STRING(doImportLogFile(session));
        } else if (uri.equalsIgnoreCase("SHOWALLQSL")) {
            msg = HTML_STRING(showAllQSL());
        } else if (uri.equalsIgnoreCase("SHOWQSL")) {
            msg = HTML_STRING(showQSLByMonth(uriList[2]));
        } else if (uri.equalsIgnoreCase("DELQSLCALLSIGN")) {//删除通联过的呼号
            if (uriList.length >= 3) {
                deleteQSLCallSign(uriList[2].replace("_", "/"));
            }
            msg = HTML_STRING(getQSLCallsigns());
        } else {
            msg = HtmlContext.DEFAULT_HTML();
        }
        //return newFixedLengthResponse(msg);
		
        try {
            Response response;
            if (uri.equalsIgnoreCase("DOWNALLQSL")) {//下载日志
                msg = downAllQSl();
                //response = newFixedLengthResponse(NanoHTTPD.Response.Status.OK, "text/plain", msg);
				response = Response.newFixedLengthResponse(Status.OK, "text/plain", msg);
				
				
                response.addHeader("Content-Disposition", "attachment;filename=All_log.adi");
            } else if (uri.equalsIgnoreCase("DOWNQSL")) {
                if (uriList.length >= 3) {
                    msg = downQSLByMonth(uriList[2], true);
                } else {
                    msg = HtmlContext.DEFAULT_HTML();
                }
                //response = newFixedLengthResponse(NanoHTTPD.Response.Status.OK, "text/plain", msg);
				response = Response.newFixedLengthResponse(Status.OK, "text/plain", msg);
				
                response.addHeader("Content-Disposition", String.format("attachment;filename=log%s.adi", uriList[2]));

            } else if (uri.equalsIgnoreCase("DOWNQSLNOQSL")) {
                if (uriList.length >= 3) {
                    msg = downQSLByMonth(uriList[2], false);
                } else {
                    msg = HtmlContext.DEFAULT_HTML();
                }
                //response = newFixedLengthResponse(NanoHTTPD.Response.Status.OK, "text/plain", msg);
				response = Response.newFixedLengthResponse(Status.OK, "text/plain", msg);

                response.addHeader("Content-Disposition", String.format("attachment;filename=log%s.adi", uriList[2]));

            } else if (uri.equalsIgnoreCase("DOWNSOTACSV")) {
                String summit = "";
                Map<String, String> sotaPars = session.getParms();
                if (sotaPars.get("summit") != null) {
                    summit = Objects.requireNonNull(sotaPars.get("summit"));
                }
                String period = (uriList.length >= 3) ? uriList[2] : "ALL";
                response = exportSotaCsvByMonth(summit, period.equalsIgnoreCase("ALL") ? null : period);

            } else {
                response = Response.newFixedLengthResponse(msg);
            }
			

			
			
            return response;//
        } catch (Exception exception) {
            return Response.newFixedLengthResponse(Status.INTERNAL_ERROR, MIME_PLAINTEXT, exception.getMessage());
        }
    }


    @SuppressLint("DefaultLocale")
    private String doImportLogFile(IHTTPSession session) {
        //判断是不是POST日志文件
        if (session.getMethod().equals(Method.POST)
                || session.getMethod().equals(Method.PUT)) {
            Map<String, String> files = new HashMap<>();
            try {
                session.parseBody(files);

                Log.e(TAG, "doImportLogFile: information:" + files.toString());
                String param = files.get("file1");//这个是post或put文件的key
                int sessionId = param.hashCode();

                // 將 NanoHTTPD 暫存檔 rename 到穩定位置，防止 HTTP 回應後被刪除導致 ENOENT
                File tempFile = new File(param);
                File stableFile = new File(tempFile.getParent(),
                        "import_" + sessionId + "_" + System.currentTimeMillis() + ".adi");
                String importPath;
                if (tempFile.renameTo(stableFile)) {
                    importPath = stableFile.getAbsolutePath();
                } else {
                    importPath = param; // rename 失敗時使用原路徑
                }

                ImportTaskList.ImportTask task = importTaskList.addTask(sessionId);
                LogFileImport logFileImport = new LogFileImport(task, importPath);

                //把提交的数据放到一个独立的线程运行，防止WEB页面停留太久
                String finalImportPath = importPath;
                new Thread(() -> {
                    doImportADI(task, logFileImport);
                    // 匯入完成後刪除暫存檔
                    new File(finalImportPath).delete();
                }).start();

                //重定向,跳转到实时导入信息界面
                return String.format("<head>\n<meta http-equiv=\"Refresh\" content=\"0; URL=getImportTask?session=%d\" /></head><body></body>"
                        , sessionId);

            } catch (IOException | ResponseException e) {
                e.printStackTrace();
                return String.format(GeneralVariables.getStringFromResource(R.string.html_import_failed)
                        , e.getMessage());
            }
        }
        return GeneralVariables.getStringFromResource(R.string.html_illegal_command);
    }


    private String makeGetImportTaskHTML(IHTTPSession session) {
        Map<String, String> pars = session.getParms();
        if (pars.get("session") != null) {
            String s = Objects.requireNonNull(pars.get("session"));
            int id = Integer.parseInt(s);
            boolean isRunning = importTaskList.checkTaskIsRunning(id);

            String taskHtml = "<div id=\"progressDiv\">" + importTaskList.getTaskHTML(id) + "</div>";

            if (!isRunning) {
                return taskHtml;
            }

            // 用 fetch() 輪詢取代 window.location.reload()：
            // - 只替換 #progressDiv 內容，不整頁 reload
            // - visibilitychange：使用者切回分頁時立即刷新，不等 timer
            // - 回應中有 <script id="autoRefresh"> 代表仍在執行，否則停止輪詢
            String pollScript =
                "<script id=\"autoRefresh\">\n" +
                "(function(){\n" +
                "  function poll(){\n" +
                "    fetch(location.href)\n" +
                "      .then(function(r){return r.text();})\n" +
                "      .then(function(h){\n" +
                "        var tmp=document.createElement('div');\n" +
                "        tmp.innerHTML=h;\n" +
                "        var p=tmp.querySelector('#progressDiv');\n" +
                "        if(p) document.getElementById('progressDiv').innerHTML=p.innerHTML;\n" +
                "        if(tmp.querySelector('#autoRefresh')) setTimeout(poll,1500);\n" +
                "      })\n" +
                "      .catch(function(){setTimeout(poll,3000);});\n" +
                "  }\n" +
                "  document.addEventListener('visibilitychange',function(){\n" +
                "    if(!document.hidden) poll();\n" +
                "  });\n" +
                "  setTimeout(poll,1500);\n" +
                "})();\n" +
                "</script>\n";

            return taskHtml + pollScript;
        }
        return "";
    }

    @SuppressLint("DefaultLocale")
    private String doCancelImport(IHTTPSession session) {
        Map<String, String> pars = session.getParms();
        Log.e(TAG, "doCancelImport: " + pars.toString());
        if (pars.get("session") != null) {
            String s = Objects.requireNonNull(pars.get("session"));
            int id = Integer.parseInt(s);
            importTaskList.cancelTask(id);
            return String.format("<head>\n<meta http-equiv=\"Refresh\" content=\"0; URL=getImportTask?session=%d\" /></head><body></body>"
                    , id);
        }
        return "";
    }

    @SuppressLint("DefaultLocale")
    private void doImportADI(ImportTaskList.ImportTask task, LogFileImport logFileImport) {
        task.setStatus(ImportTaskList.ImportState.IMPORTING);
        task.importedCount = 0;

        try {
            // 快速預掃取得總記錄數，讓進度百分比正確顯示
            task.count = logFileImport.countRecords();

            logFileImport.processRecords((record, index) -> {
                if (task.status == ImportTaskList.ImportState.CANCELED) return; // 取消匯入時跳過

                QSLRecord qslRecord = new QSLRecord(record);
                task.processCount++;
                if (mainViewModel.databaseOpr.doInsertQSLData(qslRecord, new AfterInsertQSLData() {
                    @Override
                    public void doAfterInsert(boolean isInvalid, boolean isNewQSL) {
                        if (isInvalid) {
                            task.invalidCount++;
                            return;
                        }
                        if (isNewQSL) {
                            task.newCount++;
                        } else {
                            task.updateCount++;
                        }
                    }
                })) {
                    task.importedCount++;
                }
            });
        } catch (IOException e) {
            Log.e(TAG, "doImportADI: 讀取檔案錯誤: " + e.getMessage());
            task.errorMsg = "讀取檔案錯誤: " + e.getMessage();
            task.setStatus(ImportTaskList.ImportState.FINISHED);
            return;
        }

        // 此處是顯示錯誤的資料
        StringBuilder temp = new StringBuilder();
        if (logFileImport.getErrorCount() > 0) {
            temp.append("<table>");
            temp.append(String.format("<tr><th></th><th>%d malformed logs</th></tr>\n", logFileImport.getErrorCount()));
            for (int key : logFileImport.getErrorLines().keySet()) {
                temp.append(String.format("<tr><td><pre>%d</pre></td><td><pre >%s</pre></td></tr>\n"
                        , key, logFileImport.getErrorLines().get(key)));
            }

            temp.append("</table>");
        }

        task.errorMsg = temp.toString();
        if (task.status != ImportTaskList.ImportState.CANCELED) {
            task.setStatus(ImportTaskList.ImportState.FINISHED);
        }
        mainViewModel.databaseOpr.getQslDxccToMap(); // 更新已通聯的分區
    }


    /**
     * 获取配置信息
     *
     * @return config表内容
     */
    private String getConfig() {
        Cursor cursor = mainViewModel.databaseOpr.getDb()
                .rawQuery("select KeyName,Value from config order by KeyName", null);
        return HtmlContext.ListTableContext(cursor, true, 4, false);
    }

    /**
     * 获取通联过的呼号，包括：呼号、最后时间、频段，波长、网格
     *
     * @return config表内容
     */
    private String showQslCallsigns(IHTTPSession session) {
        String callsign = "";
        //读取查询的参数
        Map<String, String> pars = session.getParms();
        if (pars.get("callsign") != null) {
            callsign = Objects.requireNonNull(pars.get("callsign"));
        }
        String where = String.format("%%%s%%", callsign);

        String html = String.format("<form >%s<input type=text name=callsign value=\"%s\">" +
                        "<input type=submit value=\"%s\"></form><br>\n"
                , GeneralVariables.getStringFromResource(R.string.html_callsign)
                , callsign
                , GeneralVariables.getStringFromResource(R.string.html_message_query));

		LogExt.d(TAG, "select q.[call] as callsign ,q.gridsquare,q.band||\"(\"||q.freq||\")\" as band \n" +
                        ",q.qso_date||\"-\"||q.time_on as last_time from QSLTable q \n" +
						" LEFT JOIN cqzoneList cl ON cl.grid =UPPER(SUBSTR(q.gridsquare,1,4)) \n"+
						//" LEFT JOIN countries ON callsigns.countryId = countries.id \n"+
                        "inner join QSLTable q2 ON q.id =q2.id \n" +
                        "where q.[call] like ?\n" +
                        "group by q.[call] ,q.gridsquare,q.freq ,q.qso_date,q.time_on,q.band\n" +
                        "HAVING q.qso_date||q.time_on =MAX(q2.qso_date||q2.time_on) \n" );
		try {
			Cursor cursor = mainViewModel.databaseOpr.getDb()
					.rawQuery("select q.[call] as callsign ,q.gridsquare,q.band||\"(\"||q.freq||\")\" as band \n" +
							",q.qso_date||\"-\"||q.time_on as last_time \n"+
							",cl.cqzone as cqzone \n"+
							" from QSLTable q \n" +
							" LEFT JOIN cqzoneList cl ON cl.grid =UPPER(SUBSTR(q.gridsquare,1,4)) \n"+
							//" LEFT JOIN countries ON callsigns.countryId = countries.id \n"+
							"inner join QSLTable q2 ON q.id =q2.id \n" +
							"where q.[call] like ?\n" +
							"group by q.[call] ,q.gridsquare,q.freq ,q.qso_date,q.time_on,q.band\n" +
							"HAVING q.qso_date||q.time_on =MAX(q2.qso_date||q2.time_on) \n", new String[]{where});
			return html + HtmlContext.ListTableContext(cursor, true, 3, false);
		} catch (Exception e) {
			Log.e("SQL_ERROR", "查詢 CQZone 發生錯誤: " + e.getMessage(), e);
		return html + "<br><b>⚠ 查詢錯誤：</b><br>" + e.getMessage();
}	
		
		//return html;

    }

    /**
     * 获取全部的表名
     *
     * @return html
     */
    private String getAllTableName() {
        Cursor cursor = mainViewModel.databaseOpr.getDb()
                .rawQuery("select * from sqlite_master where type='table' ORDER BY name", null); // [MODIFIED] BV6LC
        return HtmlContext.ListTableContext(cursor, true, 4, true);
    }

    @SuppressLint({"Range", "DefaultLocale"})
    private String getCallsignQTH(IHTTPSession session) {
        String callsign = "";
        String grid = "";
        //读取查询的参数
        Map<String, String> pars = session.getParms();

        if (pars.get("callsign") != null) {
            callsign = Objects.requireNonNull(pars.get("callsign"));
        }
        if (pars.get("grid") != null) {
            grid = Objects.requireNonNull(pars.get("grid"));
        }
        String whereCallsign = String.format("%%%s%%", callsign.toUpperCase());
        String whereGrid = String.format("%%%s%%", grid.toUpperCase());
        Cursor cursor = mainViewModel.databaseOpr.getDb()
                .rawQuery("select callsign ,grid,updateTime from CallsignQTH where (callsign like ?) and (grid like ?)"
                        , new String[]{whereCallsign, whereGrid});
        StringBuilder result = new StringBuilder();
        HtmlContext.tableBegin(result, true, 2, false).append("\n");

        result.append(String.format("<form >%s<input type=text name=callsign value=\"%s\"><br>\n" +
                        "%s<input type=text name=grid value=\"%s\">\n" +
                        "<input type=submit value=\"%s\"></form><br><br>\n"
                , GeneralVariables.getStringFromResource(R.string.html_callsign)
                , callsign
                , GeneralVariables.getStringFromResource(R.string.html_qsl_grid)
                , grid
                , GeneralVariables.getStringFromResource(R.string.html_message_query)));
        //写字段名
        HtmlContext.tableRowBegin(result).append("\n");
        HtmlContext.tableCellHeader(result
                , GeneralVariables.getStringFromResource(R.string.html_callsign)
                , GeneralVariables.getStringFromResource(R.string.html_qsl_grid)
                , GeneralVariables.getStringFromResource(R.string.html_distance)
                , GeneralVariables.getStringFromResource(R.string.html_update_time)
        ).append("\n");

        HtmlContext.tableRowEnd(result).append("\n");

        @SuppressLint("SimpleDateFormat") SimpleDateFormat formatTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        int order = 0;
        while (cursor.moveToNext()) {
            HtmlContext.tableRowBegin(result, true, order % 2 != 0);
            Date date = new Date(cursor.getLong(cursor.getColumnIndex("updateTime")));

            HtmlContext.tableCell(result
                    , cursor.getString(cursor.getColumnIndex("callsign"))
                    , cursor.getString(cursor.getColumnIndex("grid"))
                    , MaidenheadGrid.getDistStr(GeneralVariables.getMyMaidenhead4Grid()
                            , cursor.getString(cursor.getColumnIndex("grid")))
                    , formatTime.format(date)
            ).append("\n");
            HtmlContext.tableRowEnd(result).append("\n");
            order++;
        }
        HtmlContext.tableEnd(result).append("<br>\n");
        result.append(String.format("%d", order));
        cursor.close();
        return result.toString();
    }


    /**
     * 获取关注的呼号 及手動輸入關注呼號 (// [MODIFIED]) BVy6LC
     *
     * @return HTML
     */
    private String getFollowCallsigns() {
        Cursor cursor = mainViewModel.databaseOpr.getDb().rawQuery("select * from followCallsigns order by callsign", null); // BV6LC 依照呼號排序
		cursor.moveToFirst();
		StringBuilder result = new StringBuilder(); // 新增一個段落，包含文字方塊和按鈕，按鈕會呼叫 /addfollow /BV6LC

		result.append("<p>\n<form action=/addfollow/");
		result.append(String.format("  <label for=\"callsign\">%s:</label>\n",
									GeneralVariables.getStringFromResource(R.string.html_callsign)
									)
					 );
		result.append(String.format("  <input type=\"text\" id=\"callsign\" name=\"callsign\" placeholder=\"%s\">\n",
									 GeneralVariables.getStringFromResource(R.string.follow_callsign_data)
									)
					);
		result.append(String.format("  <input type=\"submit\" value=\"%s\">\n",
									  GeneralVariables.getStringFromResource(R.string.add_followcallsign)
									)
					);
		result.append("</p></form>\n");
        HtmlContext.tableBegin(result, true, 4, false).append("\n"); //BV6LC

        //写字段名
        HtmlContext.tableRowBegin(result).append("\n");
        for (int i = 0; i < cursor.getColumnCount(); i++) {
            HtmlContext.tableCellHeader(result
                    , GeneralVariables.getStringFromResource(R.string.html_callsign)
                    , GeneralVariables.getStringFromResource(R.string.html_country)               //BV6LC 
					, GeneralVariables.getStringFromResource(R.string.html_operation)).append("\n"); //BV6LC
        }
        HtmlContext.tableRowEnd(result).append("\n");
        int order = 0;
        while (cursor.moveToNext()) {
            HtmlContext.tableRowBegin(result, true, order % 2 != 0).append("\n");
            for (int i = 0; i < cursor.getColumnCount(); i++) {
				HtmlContext.tableCell(result
                        , String.format("<div style='text-align:left;'>%s</div>",cursor.getString(i)) //[MODIFIED] BV6LC
						, String.format("%s",GeneralVariables.getCountryByCallsign(cursor.getString(i),mainViewModel.databaseOpr))
                        , String.format("<a href=/delfollow/%s>%s</a>"
                                , cursor.getString(i).replace("/", "_")
                                , GeneralVariables.getStringFromResource(R.string.html_delete))
                ).append("\n");
            }
            HtmlContext.tableRowEnd(result).append("\n");
            order++;
        }
        HtmlContext.tableEnd(result).append("\n");
        cursor.close();
        return result.toString();
    }

    /**
     * 删除关注的呼号
     *
     * @param callsign 关注的呼号
     */
    private void deleteFollowCallSign(String callsign) {
        mainViewModel.databaseOpr.getDb().execSQL("delete from followCallsigns where callsign=?", new String[]{callsign});
    }
	/* BV6LC
     * 手動新增關注的呼号
     *
     * @param callsign 关注的呼号
    */
    private String addFollowCallSign(IHTTPSession session) 
	{
		try {
			String callsign = "";
			Map<String, String> queryParams = session.getParms();  // 定義 queryParams
			//檢查表單中是否包含 "callsign" 的欄位
            if (queryParams.containsKey("callsign"))
				{
					callsign = queryParams.get("callsign").toUpperCase(); ;// 取得input中name="callsign"的值
					if (!callsign.isEmpty()) 
						{
						 Log.i(TAG, "收到呼號: " + callsign);
						 mainViewModel.databaseOpr.getDb().execSQL("insert into followCallsigns (callsign) values (?)", new String[]{callsign});
						}
				}
			mainViewModel.getFollowCallsignsFromDataBase();
			return "插入成功";
			}
			catch (Exception e)
			{
			return "Insert fail，錯誤訊息：" + e.getMessage();
			}
    }

    private void deleteQSLByMonth(String month) {
        mainViewModel.databaseOpr.getDb().execSQL("delete from QSLTable where SUBSTR(qso_date,1,6)=? \n"
                , new String[]{month});
    }


    /**
     * 查询通联过的呼号
     *
     * @return HTML
     */
    @SuppressLint("Range")
    private String getQSLCallsigns() {
        Cursor cursor = mainViewModel.databaseOpr.getDb().rawQuery(
                "select * from QslCallsigns order by ID desc", null);
		cursor.moveToFirst();		
				
        StringBuilder result = new StringBuilder();
        HtmlContext.tableBegin(result, false, 0, true).append("\n");

        //写字段名
        HtmlContext.tableRowBegin(result).append("\n");
        HtmlContext.tableCellHeader(result
                , GeneralVariables.getStringFromResource(R.string.html_qsl_start_time)
                , GeneralVariables.getStringFromResource(R.string.html_qsl_end_time)
                , GeneralVariables.getStringFromResource(R.string.html_callsign)
                , GeneralVariables.getStringFromResource(R.string.html_qsl_mode)
                , GeneralVariables.getStringFromResource(R.string.html_qsl_grid)
                , GeneralVariables.getStringFromResource(R.string.html_qsl_band)
                , GeneralVariables.getStringFromResource(R.string.html_qsl_freq)
                , GeneralVariables.getStringFromResource(R.string.html_qsl_manual_confirmation)
                , GeneralVariables.getStringFromResource(R.string.html_qsl_lotw_confirmation)
                , GeneralVariables.getStringFromResource(R.string.html_qsl_data_source)
                , GeneralVariables.getStringFromResource(R.string.html_operation)).append("\n");
        HtmlContext.tableRowEnd(result).append("\n");
        int order = 0;
        while (cursor.moveToNext()) {
            HtmlContext.tableRowBegin(result, true, order % 2 != 0);
            HtmlContext.tableCell(result
                    , cursor.getString(cursor.getColumnIndex("startTime"))
                    , cursor.getString(cursor.getColumnIndex("finishTime"))
                    , cursor.getString(cursor.getColumnIndex("callsign"))
                    , cursor.getString(cursor.getColumnIndex("mode"))
                    , cursor.getString(cursor.getColumnIndex("grid"))
                    , cursor.getString(cursor.getColumnIndex("band"))
                    , cursor.getString(cursor.getColumnIndex("band_i")) + "Hz"
                    , (cursor.getInt(cursor.getColumnIndex("isQSL")) == 1)
                            ? "<font color=green>√</font>" : "<font color=red>×</font>"
                    , (cursor.getInt(cursor.getColumnIndex("isLotW_QSL")) == 1)
                            ? "<font color=green>√</font>" : "<font color=red>×</font>"
                    , (cursor.getInt(cursor.getColumnIndex("isLotW_import")) == 1)
                            ? GeneralVariables.getStringFromResource(R.string.html_qsl_import_data_from_external)
                            : GeneralVariables.getStringFromResource(R.string.html_qsl_native_data)
                    , String.format("<a href=/delQslCallsign/%s>%s</a>"
                            , cursor.getString(cursor.getColumnIndex("ID"))
                            , GeneralVariables.getStringFromResource(R.string.html_delete))).append("\n");
            HtmlContext.tableRowEnd(result).append("\n");
            order++;
        }
        HtmlContext.tableEnd(result).append("\n");
        cursor.close();
        return result.toString();
    }

    private void deleteQSLCallSign(String callsign) {
        mainViewModel.databaseOpr.getDb().execSQL("delete from QslCallsigns where id=?", new String[]{callsign});
    }

    /**
     * 显示呼号与网格的对应关系
     *
     * @return html
     */
    @SuppressLint("DefaultLocale")
    private String showCallGridList() {
        StringBuilder result = new StringBuilder();
        result.append("<script language=\"JavaScript\">\n" +
                "function myrefresh(){\n" +
                "window.location.reload();\n" +
                "}\n" +
                "setTimeout('myrefresh()',5000); //指定5秒刷新一次，5000处可自定义设置，1000为1秒\n" +
                "</script>");
        result.append(String.format(GeneralVariables.getStringFromResource(R.string.html_callsign_grid_total)
                , GeneralVariables.callsignAndGrids.size()));
        HtmlContext.tableBegin(result, true, 1, false);
        HtmlContext.tableRowBegin(result);
        result.append(String.format("<th>%s</th>", GeneralVariables.getStringFromResource(R.string.html_callsign)));
        result.append(String.format("<th>%s</th>", GeneralVariables.getStringFromResource(R.string.html_qsl_grid)));
        HtmlContext.tableRowEnd(result).append("\n");

        result.append(GeneralVariables.getCallsignAndGridToHTML());
        HtmlContext.tableEnd(result).append("<br>\n");

        return result.toString();
    }

    /**
     * 显示调试信息
     *
     * @return html
     */
    @SuppressLint("DefaultLocale")
    private String showDebug() {
        StringBuilder result = new StringBuilder();
        result.append("<script language=\"JavaScript\">\n" +
                "function myrefresh(){\n" +
                "window.location.reload();\n" +
                "}\n" +
                "setTimeout('myrefresh()',5000);\n " +////指定5秒刷新一次，5000处可自定义设置，1000为1秒\n" +
                "</script>");

        HtmlContext.tableBegin(result, true, 5, false).append("\n");

        HtmlContext.tableRowBegin(result);
        HtmlContext.tableCellHeader(result
                , GeneralVariables.getStringFromResource(R.string.html_variable)
                , GeneralVariables.getStringFromResource(R.string.html_value)).append("\n");

        HtmlContext.tableKeyRow(result, false, "UTC"
                , UtcTimer.getTimeStr(mainViewModel.timerSec.getValue()));

        HtmlContext.tableKeyRow(result, true
                , GeneralVariables.getStringFromResource(R.string.html_my_callsign)
                , GeneralVariables.myCallsign);

        HtmlContext.tableKeyRow(result, false
                , GeneralVariables.getStringFromResource(R.string.html_my_grid)
                , GeneralVariables.getMyMaidenheadGrid());

        HtmlContext.tableKeyRow(result, true//消息最大缓存条数
                , GeneralVariables.getStringFromResource(R.string.html_max_message_cache)
                , String.format("%d", GeneralVariables.MESSAGE_COUNT));

        HtmlContext.tableKeyRow(result, false//音量大小
                , GeneralVariables.getStringFromResource(R.string.signal_strength)
                , String.format("%.0f%%\n", GeneralVariables.volumePercent * 100f));


        HtmlContext.tableKeyRow(result, true
                , GeneralVariables.getStringFromResource(R.string.html_audio_bits)
                , GeneralVariables.audioOutput32Bit ?
                        GeneralVariables.getStringFromResource(R.string.audio32_bit)
                        : GeneralVariables.getStringFromResource(R.string.audio16_bit));

        HtmlContext.tableKeyRow(result, false
                , GeneralVariables.getStringFromResource(R.string.html_audio_rate)
                , String.format("%dHz", GeneralVariables.audioSampleRate));

        HtmlContext.tableKeyRow(result, true
                , GeneralVariables.getStringFromResource(R.string.html_decodes_in_this_cycle)
                , String.format("%d", mainViewModel.currentDecodeCount));

        //HtmlContext.tableKeyRow(result, false
        //        , GeneralVariables.getStringFromResource(R.string.decode_mode_text)
        //        , GeneralVariables.deepDecodeMode
        //                ? GeneralVariables.getStringFromResource(R.string.deep_mode)
        //                : GeneralVariables.getStringFromResource(R.string.fast_mode));
						
		HtmlContext.tableKeyRow(result, false
                , GeneralVariables.getStringFromResource(R.string.decode_mode_text)
                , String.format("%d", GeneralVariables.deepDecodeMode)
                        );				


        HtmlContext.tableKeyRow(result, true
                , GeneralVariables.getStringFromResource(R.string.html_total_number_of_decodes)
                , String.format("%d", mainViewModel.ft8Messages.size()));

        HtmlContext.tableKeyRow(result, false
                , GeneralVariables.getStringFromResource(R.string.html_in_recording_state)
                , Boolean.TRUE.equals(mainViewModel.mutableIsRecording.getValue())
                        ? GeneralVariables.getStringFromResource(R.string.html_recording)
                        : GeneralVariables.getStringFromResource(R.string.html_no_recording));

        HtmlContext.tableKeyRow(result, true
                , GeneralVariables.getStringFromResource(R.string.html_time_consuming_for_this_decoding)
                , String.format(GeneralVariables.getStringFromResource(R.string.html_milliseconds)
                        , mainViewModel.getDecodeDurationMs().getValue() ));

        HtmlContext.tableKeyRow(result, false
                , GeneralVariables.getStringFromResource(R.string.html_average_delay_time_of_this_cycle)
                , String.format(GeneralVariables.getStringFromResource(R.string.html_seconds)
                        , mainViewModel.mutableTimerOffset.getValue()));

        HtmlContext.tableKeyRow(result, true
                , GeneralVariables.getStringFromResource(R.string.html_sound_frequency)
                , String.format("%.0fHz", GeneralVariables.getBaseFrequency()));

        HtmlContext.tableKeyRow(result, false
                , GeneralVariables.getStringFromResource(R.string.html_transmission_delay_time)
                , String.format(GeneralVariables.getStringFromResource(R.string.html_milliseconds)
                        , GeneralVariables.transmitDelay));

        HtmlContext.tableKeyRow(result, true
                , GeneralVariables.getStringFromResource(R.string.html_launch_supervision)
                , String.format(GeneralVariables.getStringFromResource(R.string.html_milliseconds)
                        , GeneralVariables.launchSupervision));

		long ms = GeneralVariables.launchSupervisionCount();
		// 先转成秒
		long totalSeconds = ms / 1000;
		// 天
		long days = totalSeconds / (24 * 3600);	
		// 小时
		long hours = (totalSeconds % (24 * 3600)) / 3600;
		// 分钟
		long minutes = (totalSeconds % 3600) / 60;
		// 秒
		long seconds = totalSeconds % 60;
		// 格式化成 “X天HH時MM分SS秒”
		String formattedRunTime = String.format(
				Locale.getDefault(),
				"%d天%02d时%02d分%02d秒",
				days, hours, minutes, seconds
		);

        HtmlContext.tableKeyRow(result, false
                , GeneralVariables.getStringFromResource(R.string.html_automatic_program_run_time)
                , String.format(GeneralVariables.getStringFromResource(R.string.html_dHHMMSS)
                        , days,hours,minutes, seconds));
		
		/*
		HtmlContext.tableKeyRow(result, false
                , GeneralVariables.getStringFromResource(R.string.html_automatic_program_run_time)
                , String.format("%s"
                        , formattedRunTime));*/
		

        HtmlContext.tableKeyRow(result, true
                , GeneralVariables.getStringFromResource(R.string.html_no_reply_limit)
                , GeneralVariables.noReplyLimit);

        HtmlContext.tableKeyRow(result, false
                , GeneralVariables.getStringFromResource(R.string.html_no_reply_count)
                , GeneralVariables.noReplyCount);

        HtmlContext.tableKeyRow(result, true
                , GeneralVariables.getStringFromResource(R.string.follow_cq)
                , String.valueOf(GeneralVariables.autoFollowCQ));

		/* BV6LC
        HtmlContext.tableKeyRow(result, false
                , GeneralVariables.getStringFromResource(R.string.auto_call_follow)
                , String.valueOf(GeneralVariables.autoAddFollow));
		*/

        HtmlContext.tableKeyRow(result, true
                , GeneralVariables.getStringFromResource(R.string.html_target_callsign)
                , (mainViewModel.ft8TransmitSignal.mutableToCallsign.getValue() != null)
                        ? mainViewModel.ft8TransmitSignal.mutableToCallsign.getValue().callsign : "");

        HtmlContext.tableKeyRow(result, false
                , GeneralVariables.getStringFromResource(R.string.html_sequential)
                , mainViewModel.ft8TransmitSignal.sequential);

        HtmlContext.tableKeyRow(result, true
                , GeneralVariables.getStringFromResource(R.string.synFrequency)
                , String.valueOf(GeneralVariables.synFrequency));

        HtmlContext.tableKeyRow(result, false
                , GeneralVariables.getStringFromResource(R.string.tran_delay)
                , GeneralVariables.transmitDelay);

        HtmlContext.tableKeyRow(result, true
                , GeneralVariables.getStringFromResource(R.string.ptt_delay)
                , GeneralVariables.pttDelay);

        HtmlContext.tableKeyRow(result, false
                , GeneralVariables.getStringFromResource(R.string.rig_name)
                , RigNameList.getInstance(
                        GeneralVariables.getMainContext()).getRigNameByIndex(GeneralVariables.modelNo).modelName);

        HtmlContext.tableKeyRow(result, true
                , GeneralVariables.getStringFromResource(R.string.html_mark_message)
                , String.format("%s", mainViewModel.markMessage
                        ? GeneralVariables.getStringFromResource(R.string.html_marking_message)
                        : GeneralVariables.getStringFromResource(R.string.html_do_not_mark_message)));

        HtmlContext.tableKeyRow(result, false
                , GeneralVariables.getStringFromResource(R.string.html_operation_mode)
                , ControlMode.getControlModeStr(GeneralVariables.controlMode));

        HtmlContext.tableKeyRow(result, true
                , GeneralVariables.getStringFromResource(R.string.html_civ_address)
                , String.format("0x%2X", GeneralVariables.civAddress));

        HtmlContext.tableKeyRow(result, false
                , GeneralVariables.getStringFromResource(R.string.html_baud_rate)
                , GeneralVariables.baudRate);

        result.append("<tr>");
        result.append("<td class=\"default\" >");
        result.append(GeneralVariables.getStringFromResource(R.string.html_available_serial_ports));
        result.append("</td>\n");
        result.append("<td class=\"default\" >");
        if (mainViewModel.mutableSerialPorts != null) {
            if (mainViewModel.mutableSerialPorts.getValue().size() == 0) {
                result.append("-");
            }
        }
        for (CableSerialPort.SerialPort serialPort : Objects.requireNonNull(mainViewModel.mutableSerialPorts.getValue())) {
            result.append(serialPort.information()).append("<br>\n");
        }
        result.append("</td>");
        result.append("</tr>\n");


        HtmlContext.tableKeyRow(result, true
                , GeneralVariables.getStringFromResource(R.string.html_instruction_set)
                , (mainViewModel.baseRig != null) ? mainViewModel.baseRig.getName() : "-");

        HtmlContext.tableKeyRow(result, false
                , GeneralVariables.getStringFromResource(R.string.html_connect_mode)
                , (GeneralVariables.controlMode == ControlMode.VOX) ? "-"
                        : ConnectMode.getModeStr(GeneralVariables.connectMode));

        HtmlContext.tableKeyRow(result, true
                , GeneralVariables.getStringFromResource(R.string.html_baud_rate)
                , GeneralVariables.baudRate);

        HtmlContext.tableKeyRow(result, false
                , GeneralVariables.getStringFromResource(R.string.html_carrier_frequency_band)
                , GeneralVariables.getBandString());

        HtmlContext.tableKeyRow(result, true
                , GeneralVariables.getStringFromResource(R.string.html_radio_frequency)
                , (mainViewModel.baseRig != null)
                        ? BaseRigOperation.getFrequencyStr(mainViewModel.baseRig.getFreq()) : "-");

        HtmlContext.tableKeyRow(result, false
                , GeneralVariables.getStringFromResource(R.string.html_flex_max_rf_power)
                , String.format("%d W", GeneralVariables.flexMaxRfPower));

        HtmlContext.tableKeyRow(result, true
                , GeneralVariables.getStringFromResource(R.string.html_atu_tune_power)
                , String.format("%d W", GeneralVariables.flexMaxTunePower));

        HtmlContext.tableKeyRow(result, false
                , GeneralVariables.getStringFromResource(R.string.be_excluded_callsigns)
                , GeneralVariables.getExcludeCallsigns());

        HtmlContext.tableKeyRow(result, true
                , GeneralVariables.getStringFromResource(R.string.config_save_swl)
                , String.valueOf(GeneralVariables.saveSWLMessage));

        HtmlContext.tableKeyRow(result, false
                , GeneralVariables.getStringFromResource(R.string.config_save_swl_qso)
                , String.valueOf(GeneralVariables.saveSWL_QSO));

        HtmlContext.tableEnd(result).append("<br>\n");

        HtmlContext.tableBegin(result, false, 0, true).append("\n");
        result.append(String.format("<tr><th>%s</th></tr>\n"
                , String.format(GeneralVariables.getStringFromResource(R.string.html_successful_callsign)
                        , GeneralVariables.getBandString())));

        result.append("<tr><td class=\"default\" >");
        for (int i = 0; i < GeneralVariables.QSL_Callsign_list.size(); i++) {
            result.append(GeneralVariables.QSL_Callsign_list.get(i));
            result.append(",&nbsp;");
            if (((i + 1) % 10) == 0) {
                result.append("</td></tr><tr><td class=\"default\" >\n");
            }
        }
        result.append("</td></tr>\n");
        HtmlContext.tableEnd(result).append("<br>\n");

        HtmlContext.tableBegin(result, false, 0, true).append("\n");
        result.append(String.format("<tr><th>%s</th></tr>\n"
                , GeneralVariables.getStringFromResource(R.string.html_tracking_callsign)));

        result.append("<tr><td class=\"default\" >");
        for (int i = 0; i < GeneralVariables.followCallsign.size(); i++) {
            result.append(GeneralVariables.followCallsign.get(i));
            result.append(",&nbsp;");
            if (((i + 1) % 10) == 0) {
                result.append("</td></tr><tr><td class=\"default\" >\n");
            }
        }
        result.append("</td></tr>\n");
        HtmlContext.tableEnd(result).append("\n");

        HtmlContext.tableBegin(result, false, 0, true).append("\n");
        result.append(String.format("<tr><th>%s</th></tr>\n"
                , GeneralVariables.getStringFromResource(R.string.html_tracking_qso_information)));

        result.append("<tr><td class=\"default\" >");
        result.append(GeneralVariables.qslRecordList.toHTML());
        result.append("</td></tr>\n");
        HtmlContext.tableEnd(result).append("\n");

        return result.toString();
    }




/**
     * 顯示即時訊系
     *
     * @return html
     */
    @SuppressLint("DefaultLocale")
    private String monitor(IHTTPSession session) {
		
		//String remoteIp = session.getRemoteIpAddress();
		String SSEIp=GeneralVariables.getLocalIpAddress();
		
        StringBuilder result = new StringBuilder();
        result.append( GeneralVariables.sseServer.SSEClient() );
		
		/*
        HtmlContext.tableBegin(result, true, 5, false).append("\n");

        HtmlContext.tableRowBegin(result);
        HtmlContext.tableCellHeader(result
                , GeneralVariables.getStringFromResource(R.string.html_variable)
                , GeneralVariables.getStringFromResource(R.string.html_value)).append("\n");
		*/
        //HtmlContext.tableKeyRow(result, false, "UTC"
        //        , UtcTimer.getTimeStr(mainViewModel.timerSec.getValue()));

 
 
        return result.toString();
    }



    /**
     * 显示呼号的HASH
     *
     * @return html
     */
    private String showCallsignHash() {
        StringBuilder result = new StringBuilder();
        result.append("<script language=\"JavaScript\">\n" +
                "function myrefresh(){\n" +
                "window.location.reload();\n" +
                "}\n" +
                "setTimeout('myrefresh()',5000); //指定5秒刷新一次，5000处可自定义设置，1000为1秒\n" +
                "</script>");
        HtmlContext.tableBegin(result, true, 3, false).append("\n");
        HtmlContext.tableRowBegin(result);
        //表头
        HtmlContext.tableCellHeader(result, GeneralVariables.getStringFromResource(R.string.html_callsign)
                , GeneralVariables.getStringFromResource(R.string.html_hash_value));

        HtmlContext.tableRowEnd(result).append("\n");


        int order = 0;
        for (Map.Entry<Long, String> entry : Ft8Message.hashList.entrySet()) {
            HtmlContext.tableRowBegin(result, false, (order / 3) % 2 != 0);

            HtmlContext.tableCell(result, entry.getValue());
            HtmlContext.tableCell(result, String.format(" 0x%x ", entry.getKey()));
            HtmlContext.tableRowEnd(result).append("\n");

            order++;
        }
        HtmlContext.tableEnd(result).append("\n");

        return result.toString();
    }

    @SuppressLint("Range")
    private Response exportSWLMessage(String exportFile, String callsign, String start_date, String end_date) {
        Response response;
        StringBuilder fileName = new StringBuilder();
        fileName.append("message");
        if (callsign.length() > 0) {
            fileName.append("_");
            fileName.append(callsign.replace("/", "_")
                    .replace("\\", "_")
                    .replace(":", "_")
                    .replace("?", "_")
                    .replace("*", "_")
                    .replace("|", "_")
                    .replace("\"", "_")
                    .replace("'", "_")
                    .replace("<", "_")
                    .replace(".", "_")
                    .replace(">", "_"));
        }
        if (start_date.length() > 0) {
            fileName.append(String.format("_%s", start_date));
        }
        if (end_date.length() > 0) {
            fileName.append(String.format("_%s", end_date));
        }
        fileName.append(".").append(exportFile);


        Cursor cursor;
        StringBuilder dateSql = new StringBuilder();
        if (!start_date.equals("")) {
            dateSql.append(String.format(" AND (SUBSTR(UTC,1,8)>=\"%s\") "
                    , start_date.replace("-", "")));
        }
        if (!end_date.equals("")) {
            dateSql.append(String.format(" AND (SUBSTR(UTC,1,8)<=\"%s\") "
                    , end_date.replace("-", "")));
        }
        String whereStr = String.format("%%%s%%", callsign);
        cursor = mainViewModel.databaseOpr.getDb().rawQuery(
                "select * from SWLMessages where ((CALL_TO LIKE ?)OR(CALL_FROM LIKE ?)) " +
                        dateSql +
                        " order by ID "
                , new String[]{whereStr, whereStr});
		
		cursor.moveToFirst();
		
        StringBuilder result = new StringBuilder();

        String formatStr;
        if (exportFile.equalsIgnoreCase("CSV")) {
            formatStr = "%s,%.3f,Rx,%s,%d,%.1f,%d,%s\n";
        } else {
            formatStr = "%s %12.3f Rx %s %6d %4.1f %4d %s\n";
        }

        while (cursor.moveToNext()) {
            String utcTime = cursor.getString(cursor.getColumnIndex("UTC"));
            int dB = cursor.getInt(cursor.getColumnIndex("SNR"));
            float dt = cursor.getFloat(cursor.getColumnIndex("TIME_SEC"));
            int freq = cursor.getInt(cursor.getColumnIndex("FREQ"));
            String callTo = cursor.getString(cursor.getColumnIndex("CALL_TO"));
            String protocol = cursor.getString(cursor.getColumnIndex("Protocol"));
            String callFrom = cursor.getString(cursor.getColumnIndex("CALL_FROM"));
            String extra = cursor.getString(cursor.getColumnIndex("EXTRAL"));
            long band = cursor.getLong(cursor.getColumnIndex("BAND"));

            result.append(String.format(formatStr
                    , utcTime, (band / 1000f / 1000f), protocol, dB, dt, freq, String.format("%s %s %s", callTo, callFrom, extra)));
        }
        cursor.close();


        response = Response.newFixedLengthResponse(Status.OK, "text/plain", result.toString());
        response.addHeader("Content-Disposition"
                , String.format("attachment;filename=%s", fileName));

        return response;
    }

    /**
     * 查SWL消息表
     *
     * @return html
     */
    @SuppressLint({"DefaultLocale", "Range"})
    private Response getMessages(IHTTPSession session) {
        int pageSize = 100;
        String callsign = "";


        StringBuilder result = new StringBuilder();
        String startDate = "";
        String endDate = "";
        String exportFile = "";

        //读取查询的参数
        Map<String, String> pars = session.getParms();
        int pageIndex = 1;
        if (pars.get("page") != null) {
            pageIndex = Integer.parseInt(Objects.requireNonNull(pars.get("page")));
        }
        if (pars.get("pageSize") != null) {
            pageSize = Integer.parseInt(Objects.requireNonNull(pars.get("pageSize")));
        }
        if (pars.get("callsign") != null) {
            callsign = Objects.requireNonNull(pars.get("callsign"));
        }
        if (pars.get("start_date") != null) {
            startDate = Objects.requireNonNull(pars.get("start_date"));
        }
        if (pars.get("end_date") != null) {
            endDate = Objects.requireNonNull(pars.get("end_date"));
        }
        String whereStr = String.format("%%%s%%", callsign);

        if (pars.get("exportFile") != null) {
            exportFile = Objects.requireNonNull(pars.get("exportFile"));
        }

        //导出到文件中
        if (exportFile.equalsIgnoreCase("CSV")
                || exportFile.equalsIgnoreCase("TXT")) {
            return exportSWLMessage(exportFile, callsign, startDate, endDate);
        }

        HtmlContext.tableBegin(result, false, 0, true).append("\n");
        HtmlContext.tableRowBegin(result).append("<td>");


        result.append(String.format("<a href=\"message?callsign=%s&start_date=%s&end_date=%s&exportFile=csv\">%s</a>" +
                        " , <a href=\"message?callsign=%s&start_date=%s&end_date=%s&exportFile=txt\">%s</a><br>"
                , callsign, startDate, endDate, GeneralVariables.getStringFromResource(R.string.html_export_csv)
                , callsign, startDate, endDate, GeneralVariables.getStringFromResource(R.string.html_export_text)));

        Cursor cursor;
        StringBuilder dateSql = new StringBuilder();
        if (!startDate.equals("")) {
            dateSql.append(String.format(" AND (SUBSTR(UTC,1,8)>=\"%s\") "
                    , startDate.replace("-", "")));
        }
        if (!endDate.equals("")) {
            dateSql.append(String.format(" AND (SUBSTR(UTC,1,8)<=\"%s\") "
                    , endDate.replace("-", "")));
        }
        //计算总的记录数
        cursor = mainViewModel.databaseOpr.getDb().rawQuery(
                "select count(*) as rc from SWLMessages " +
                        "where ((CALL_TO LIKE ?)OR(CALL_FROM LIKE ?))" + dateSql
                , new String[]{whereStr, whereStr});
        cursor.moveToFirst();
        int pageCount = Math.round(((float) cursor.getInt(cursor.getColumnIndex("rc")) / pageSize) + 0.5f);
        if (pageIndex > pageCount) pageIndex = pageCount;
        cursor.close();

        //查询、每页消息数设定
        result.append(String.format("<form >%s , %s" +
                        "<input type=number name=pageSize style=\"width:80px\" value=%d>" +//页码及页大小
                        "<br>\n%s&nbsp;<input type=text name=callsign value=\"%s\">" +//呼号
                        "&nbsp;&nbsp;<input type=submit value=\"%s\"><br>\n" +
                        "<br>\n%s&nbsp;<input type=date name=\"start_date\" value=\"%s\" onchange=\"javascript:form.submit();\">" +//起始时间
                        "&nbsp;\n%s&nbsp;<input type=date name=end_date value=\"%s\" onchange=\"javascript:form.submit();\"><br>" //结束时间

                , String.format(GeneralVariables.getStringFromResource(R.string.html_message_page_count), pageCount)
                , GeneralVariables.getStringFromResource(R.string.html_message_page_size)
                , pageSize
                , GeneralVariables.getStringFromResource(R.string.html_callsign)
                , callsign
                , GeneralVariables.getStringFromResource(R.string.html_message_query)
                , GeneralVariables.getStringFromResource(R.string.html_start_date_swl_message)
                , startDate
                , GeneralVariables.getStringFromResource(R.string.html_end_date_swl_message)
                , endDate));


        //定位页，第一页、上一页、下一页，最后一页
        result.append(String.format("<a href=\"message?page=%d&pageSize=%d&callsign=%s&start_date=%s&end_date=%s\">|&lt;</a>" +
                        "&nbsp;&nbsp;<a href=\"message?page=%d&pageSize=%d&callsign=%s&start_date=%s&end_date=%s\">&lt;&lt;</a>" +
                        "<input type=\"number\" name=\"page\" value=%d style=\"width:50px\">" +
                        "<a href=\"message?page=%d&pageSize=%d&callsign=%s&start_date=%s&end_date=%s\">&gt;&gt;</a>" +
                        "&nbsp;&nbsp;<a href=\"message?page=%d&pageSize=%d&callsign=%s&start_date=%s&end_date=%s\">&gt;|</a></form>\n"
                , 1, pageSize, callsign, startDate, endDate
                , pageIndex - 1 == 0 ? 1 : pageIndex - 1, pageSize, callsign, startDate, endDate
                , pageIndex
                , pageIndex == pageCount ? pageCount : pageIndex + 1, pageSize, callsign, startDate, endDate
                , pageCount, pageSize, callsign, startDate, endDate));
        result.append("</td>");
        HtmlContext.tableRowEnd(result);
        HtmlContext.tableEnd(result).append("\n");


        cursor = mainViewModel.databaseOpr.getDb().rawQuery(
                String.format(
                        "select * from SWLMessages where ((CALL_TO LIKE ?)OR(CALL_FROM LIKE ?)) " +
                                dateSql +
                                " order by ID LIMIT(%d),%d "
                        , (pageIndex - 1) * pageSize, pageSize), new String[]{whereStr, whereStr});

        //result.append("<table bgcolor=#a1a1a1 border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n");
        HtmlContext.tableBegin(result, false, true).append("\n");
        HtmlContext.tableRowBegin(result).append("\n");
        HtmlContext.tableCellHeader(result, "No.");
        HtmlContext.tableCellHeader(result, GeneralVariables.getStringFromResource(R.string.html_protocol));
        HtmlContext.tableCellHeader(result, "i3.n3", "UTC", "dB", "Δt");
        HtmlContext.tableCellHeader(result, GeneralVariables.getStringFromResource(R.string.html_qsl_freq));
        HtmlContext.tableCellHeader(result, GeneralVariables.getStringFromResource(R.string.message));
        HtmlContext.tableCellHeader(result, GeneralVariables.getStringFromResource(R.string.html_carrier_frequency_band)).append("\n");
        HtmlContext.tableRowEnd(result).append("\n");


        int order = 0;
        while (cursor.moveToNext()) {
            HtmlContext.tableRowBegin(result, true, order % 2 != 0);

            int i3 = cursor.getInt(cursor.getColumnIndex("I3"));
            int n3 = cursor.getInt(cursor.getColumnIndex("N3"));
            String utcTime = cursor.getString(cursor.getColumnIndex("UTC"));
            int dB = cursor.getInt(cursor.getColumnIndex("SNR"));
            float dt = cursor.getFloat(cursor.getColumnIndex("TIME_SEC"));
            int freq = cursor.getInt(cursor.getColumnIndex("FREQ"));
            String protocol = cursor.getString(cursor.getColumnIndex("Protocol"));
            String callTo = cursor.getString(cursor.getColumnIndex("CALL_TO"));
            String callFrom = cursor.getString(cursor.getColumnIndex("CALL_FROM"));
            String extra = cursor.getString(cursor.getColumnIndex("EXTRAL"));
            long band = cursor.getLong(cursor.getColumnIndex("BAND"));

            HtmlContext.tableCell(result, String.format("%d", order + 1 + pageSize * (pageIndex - 1)));
            HtmlContext.tableCell(result, protocol, Ft8Message.getCommandInfoByI3N3(i3, n3));
            HtmlContext.tableCell(result, utcTime);
            HtmlContext.tableCell(result, String.format("%d", dB));
            HtmlContext.tableCell(result, String.format("%.1f", dt));
            HtmlContext.tableCell(result, String.format("%dHz", freq));
            HtmlContext.tableCell(result, String.format("<b><a href=\"message?&pageSize=%d&callsign=%s\">" +
                            "%s</a>&nbsp;&nbsp;" +
                            "<a href=\"message?&pageSize=%d&callsign=%s\">%s</a>&nbsp;&nbsp;%s</b>", pageSize, callTo.replace("<", "")
                            .replace(">", "")
                    , callTo.replace("<", "&lt;")
                            .replace(">", "&gt;")
                    , pageSize, callFrom.replace("<", "")
                            .replace(">", "")
                    , callFrom.replace("<", "&lt;")
                            .replace(">", "&gt;"), extra));
            HtmlContext.tableCell(result, BaseRigOperation.getFrequencyStr(band)).append("\n");
            HtmlContext.tableRowEnd(result).append("\n");

            order++;
        }
        cursor.close();
        HtmlContext.tableEnd(result).append("<br>\n");
        //result.append("</table><br>");


        return Response.newFixedLengthResponse(HtmlContext.HTML_STRING(result.toString()));
        //return result.toString();

    }


    /**
     * 把swo的QSO日志导出到文件
     *
     * @param exportFile 文件名
     * @param callsign   呼号
     * @param start_date 起始日期
     * @param end_date   结束日期
     * @return 数据
     */
    @SuppressLint("Range")
    private Response exportSWLQSOMessage(String exportFile, String callsign, String start_date, String end_date) {
        Response response;
        StringBuilder fileName = new StringBuilder();
        fileName.append("swl_qso");
        if (callsign.length() > 0) {
            fileName.append("_");
            fileName.append(callsign.replace("/", "_")
                    .replace("\\", "_")
                    .replace(":", "_")
                    .replace("?", "_")
                    .replace("*", "_")
                    .replace("|", "_")
                    .replace("\"", "_")
                    .replace("'", "_")
                    .replace("<", "_")
                    .replace(".", "_")
                    .replace(">", "_"));
        }
        if (start_date.length() > 0) {
            fileName.append(String.format("_%s", start_date));
        }
        if (end_date.length() > 0) {
            fileName.append(String.format("_%s", end_date));
        }
        fileName.append(".").append(exportFile);


        Cursor cursor;
        StringBuilder dateSql = new StringBuilder();
        if (!start_date.equals("")) {
            dateSql.append(String.format(" AND (SUBSTR(qso_date_off,1,8)>=\"%s\") "
                    , start_date.replace("-", "")));
        }
        if (!end_date.equals("")) {
            dateSql.append(String.format(" AND (SUBSTR(qso_date_off,1,8)<=\"%s\") "
                    , end_date.replace("-", "")));
        }
        String whereStr = String.format("%%%s%%", callsign);

        cursor = mainViewModel.databaseOpr.getDb().rawQuery(
                String.format(
                        "select * from SWLQSOTable where (([call] LIKE ?)OR(station_callsign LIKE ?)) " +
                                dateSql +
                                " order by qso_date desc,time_on desc "), new String[]{whereStr, whereStr});
		cursor.moveToFirst();

        //response = newFixedLengthResponse(NanoHTTPD.Response.Status.OK, "text/plain"
		response = Response.newFixedLengthResponse(Status.OK, "text/plain"
                //, downQSLTable(cursor, true));
				, mainViewModel.databaseOpr.downQSLTable(cursor, true));
        response.addHeader("Content-Disposition"
                , String.format("attachment;filename=%s", fileName));

        return response;
    }


    /**
     * 查询SWL日志
     *
     * @param session 会话
     * @return html
     */
    @SuppressLint({"DefaultLocale", "Range"})
    private Response getSWLQsoMessages(IHTTPSession session) {
        int pageSize = 100;
        String callsign = "";


        StringBuilder result = new StringBuilder();
        String startDate = "";
        String endDate = "";
        String exportFile = "";

        //读取查询的参数
        Map<String, String> pars = session.getParms();
        int pageIndex = 1;
        if (pars.get("page") != null) {
            pageIndex = Integer.parseInt(Objects.requireNonNull(pars.get("page")));
        }
        if (pars.get("pageSize") != null) {
            pageSize = Integer.parseInt(Objects.requireNonNull(pars.get("pageSize")));
        }
        if (pars.get("callsign") != null) {
            callsign = Objects.requireNonNull(pars.get("callsign"));
        }
        if (pars.get("start_date") != null) {
            startDate = Objects.requireNonNull(pars.get("start_date"));
        }
        if (pars.get("end_date") != null) {
            endDate = Objects.requireNonNull(pars.get("end_date"));
        }
        String whereStr = String.format("%%%s%%", callsign);

        if (pars.get("exportFile") != null) {
            exportFile = Objects.requireNonNull(pars.get("exportFile"));
        }

        //导出到文件中
        if (exportFile.equalsIgnoreCase("ADI")) {
            return exportSWLQSOMessage(exportFile, callsign, startDate, endDate);
        }

        HtmlContext.tableBegin(result, false, 0, true).append("\n");
        HtmlContext.tableRowBegin(result).append("\n");
        result.append("<td>");

        result.append(String.format("<a href=\"QSOSWLMSG?callsign=%s&start_date=%s&end_date=%s&exportFile=adi\">%s</a>"
                , callsign, startDate, endDate, GeneralVariables.getStringFromResource(R.string.html_export_adi)));

        Cursor cursor;
        StringBuilder dateSql = new StringBuilder();
        if (!startDate.equals("")) {
            dateSql.append(String.format(" AND (SUBSTR(qso_date_off,1,8)>=\"%s\") "
                    , startDate.replace("-", "")));
        }
        if (!endDate.equals("")) {
            dateSql.append(String.format(" AND (SUBSTR(qso_date_off,1,8)<=\"%s\") "
                    , endDate.replace("-", "")));
        }
        //计算总的记录数
        cursor = mainViewModel.databaseOpr.getDb().rawQuery(
                "select count(*) as rc from SWLQSOTable " +
                        "where (([call] LIKE ?)OR(station_callsign LIKE ?))" + dateSql
                , new String[]{whereStr, whereStr});
        cursor.moveToFirst();
        int pageCount = Math.round(((float) cursor.getInt(cursor.getColumnIndex("rc")) / pageSize) + 0.5f);
        if (pageIndex > pageCount) pageIndex = pageCount;
        cursor.close();

        //查询、每页消息数设定
        result.append(String.format("<form >%s , %s" +
                        "<input type=number name=pageSize style=\"width:80px\" value=%d>" +//页码及页大小
                        "<br>\n%s&nbsp;<input type=text name=callsign value=\"%s\">" +//呼号
                        "&nbsp;&nbsp;<input type=submit value=\"%s\"><br>\n" +
                        "<br>\n%s&nbsp;<input type=date name=\"start_date\" value=\"%s\" onchange=\"javascript:form.submit();\">" +//起始时间
                        "&nbsp;\n%s&nbsp;<input type=date name=end_date value=\"%s\" onchange=\"javascript:form.submit();\"><br>" //结束时间

                , String.format(GeneralVariables.getStringFromResource(R.string.html_message_page_count), pageCount)
                , GeneralVariables.getStringFromResource(R.string.html_message_page_size)
                , pageSize
                , GeneralVariables.getStringFromResource(R.string.html_callsign)
                , callsign
                , GeneralVariables.getStringFromResource(R.string.html_message_query)
                , GeneralVariables.getStringFromResource(R.string.html_start_date_swl_message)
                , startDate
                , GeneralVariables.getStringFromResource(R.string.html_end_date_swl_message)
                , endDate));


        //定位页，第一页、上一页、下一页，最后一页
        result.append(String.format("<a href=\"QSOSWLMSG?page=%d&pageSize=%d&callsign=%s&start_date=%s&end_date=%s\">|&lt;</a>" +
                        "&nbsp;&nbsp;<a href=\"QSOSWLMSG?page=%d&pageSize=%d&callsign=%s&start_date=%s&end_date=%s\">&lt;&lt;</a>" +
                        "<input type=\"number\" name=\"page\" value=%d style=\"width:50px\">" +
                        "<a href=\"QSOSWLMSG?page=%d&pageSize=%d&callsign=%s&start_date=%s&end_date=%s\">&gt;&gt;</a>" +
                        "&nbsp;&nbsp;<a href=\"QSOSWLMSG?page=%d&pageSize=%d&callsign=%s&start_date=%s&end_date=%s\">&gt;|</a></form>\n"

                , 1, pageSize, callsign, startDate, endDate
                , pageIndex - 1 == 0 ? 1 : pageIndex - 1, pageSize, callsign, startDate, endDate
                , pageIndex
                , pageIndex == pageCount ? pageCount : pageIndex + 1, pageSize, callsign, startDate, endDate
                , pageCount, pageSize, callsign, startDate, endDate));

        result.append("</td>");
        HtmlContext.tableRowEnd(result);
        HtmlContext.tableEnd(result).append("\n");

        cursor = mainViewModel.databaseOpr.getDb().rawQuery(
                String.format(
                        "select * from SWLQSOTable where (([call] LIKE ?)OR(station_callsign LIKE ?)) " +
                                dateSql +
                                " order by qso_date desc,time_on desc LIMIT(%d),%d "
                        , (pageIndex - 1) * pageSize, pageSize), new String[]{whereStr, whereStr});

        HtmlContext.tableBegin(result, false, true).append("\n");

        HtmlContext.tableRowBegin(result);
        HtmlContext.tableCellHeader(result, "No."
                        , GeneralVariables.getStringFromResource(R.string.html_callsign)//"call"
                        , GeneralVariables.getStringFromResource(R.string.html_qsl_grid)//"gridsquare"
                        , GeneralVariables.getStringFromResource(R.string.html_qsl_mode)//"mode"
                        , GeneralVariables.getStringFromResource(R.string.html_rst_sent)//"rst_sent"
                        , GeneralVariables.getStringFromResource(R.string.html_rst_rcvd)//"rst_rcvd"
                        , GeneralVariables.getStringFromResource(R.string.html_qsl_start_day)//"qso date"
                        , GeneralVariables.getStringFromResource(R.string.html_qsl_start_time)//"time_on"
                        , GeneralVariables.getStringFromResource(R.string.html_qsl_end_date)//qso date off
                        , GeneralVariables.getStringFromResource(R.string.html_qsl_end_time)//"time_off"
                        , GeneralVariables.getStringFromResource(R.string.html_qsl_band)//"band"
                        , GeneralVariables.getStringFromResource(R.string.html_qsl_freq)//"freq"
                        , GeneralVariables.getStringFromResource(R.string.html_callsign)//"station_callsign"
                        , GeneralVariables.getStringFromResource(R.string.html_qsl_grid)//"my_gridsquare"
                        , "Operator"//"my_gridsquare"
                        , GeneralVariables.getStringFromResource(R.string.html_comment))//"comment")
                .append("\n");
        HtmlContext.tableRowEnd(result).append("\n");
        int order = 0;
        while (cursor.moveToNext()) {
            HtmlContext.tableRowBegin(result, true, order % 2 != 0).append("\n");

            String call = cursor.getString(cursor.getColumnIndex("call"));
            String gridsquare = cursor.getString(cursor.getColumnIndex("gridsquare"));
            String mode = cursor.getString(cursor.getColumnIndex("mode"));
            String rst_sent = cursor.getString(cursor.getColumnIndex("rst_sent"));
            String rst_rcvd = cursor.getString(cursor.getColumnIndex("rst_rcvd"));
            String qso_date = cursor.getString(cursor.getColumnIndex("qso_date"));
            String time_on = cursor.getString(cursor.getColumnIndex("time_on"));
            String qso_date_off = cursor.getString(cursor.getColumnIndex("qso_date_off"));
            String time_off = cursor.getString(cursor.getColumnIndex("time_off"));
            String band = cursor.getString(cursor.getColumnIndex("band"));
            String freq = cursor.getString(cursor.getColumnIndex("freq"));
            String station_callsign = cursor.getString(cursor.getColumnIndex("station_callsign"));
            String my_gridsquare = cursor.getString(cursor.getColumnIndex("my_gridsquare"));
            String operator = cursor.getString(cursor.getColumnIndex("operator"));
            String comment = cursor.getString(cursor.getColumnIndex("comment"));


            //生成数据表的一行
            HtmlContext.tableCell(result, String.format("%d", order + 1 + pageSize * (pageIndex - 1)));
            HtmlContext.tableCell(result, String.format("<a href=\"QSOSWLMSG?&pageSize=%d&callsign=%s\">%s</a>"
                    , pageSize, call.replace("<", "")
                            .replace(">", "")
                    , call.replace("<", "&lt;")
                            .replace(">", "&gt;")));
            HtmlContext.tableCell(result, gridsquare == null ? "" : gridsquare);
            HtmlContext.tableCell(result, mode, rst_sent, rst_rcvd, qso_date, time_on, qso_date_off, time_off);
            HtmlContext.tableCell(result, band, freq);
            HtmlContext.tableCell(result, String.format("<a href=\"QSOSWLMSG?&pageSize=%d&callsign=%s\">%s</a>"
                    , pageSize
                    , station_callsign.replace("<", "")
                            .replace(">", "")
                    , station_callsign.replace("<", "&lt;")
                            .replace(">", "&gt;")));

            HtmlContext.tableCell(result, my_gridsquare == null ? "" : my_gridsquare);
            HtmlContext.tableCell(result, operator == null ? "" : operator, comment).append("\n");
            HtmlContext.tableRowEnd(result).append("\n");
            order++;
        }
        cursor.close();
        HtmlContext.tableEnd(result).append("<br>\n");

        return Response.newFixedLengthResponse(HtmlContext.HTML_STRING(result.toString()));
    }


    /**
     * 把QSO日志导出到文件
     *
     * @param exportFile 文件名
     * @param callsign   呼号
     * @param start_date 起始日期
     * @param end_date   结束日期
     * @return 数据
     */
    @SuppressLint("Range")
    private Response exportQSOLogs(String exportFile, String callsign, String start_date, String end_date, String extWhere) {
        Response response;
        StringBuilder fileName = new StringBuilder();
        fileName.append("qso_log");
        if (callsign.length() > 0) {
            fileName.append("_");
            fileName.append(callsign.replace("/", "_")
                    .replace("\\", "_")
                    .replace(":", "_")
                    .replace("?", "_")
                    .replace("*", "_")
                    .replace("|", "_")
                    .replace("\"", "_")
                    .replace("'", "_")
                    .replace("<", "_")
                    .replace(".", "_")
                    .replace(">", "_"));
        }
        if (start_date.length() > 0) {
            fileName.append(String.format("_%s", start_date));
        }
        if (end_date.length() > 0) {
            fileName.append(String.format("_%s", end_date));
        }
        fileName.append(".").append(exportFile);


        Cursor cursor;
        String whereStr = String.format("%%%s%%", callsign);

        cursor = mainViewModel.databaseOpr.getDb().rawQuery(
                String.format(
                        "select * from QSLTable where (([call] LIKE ?)OR(station_callsign LIKE ?)) " +
                                extWhere +
                                " order by qso_date desc,time_on desc "), new String[]{whereStr, whereStr});

		cursor.moveToFirst();
		
        //response = newFixedLengthResponse(NanoHTTPD.Response.Status.OK, "text/plain"
		response = Response.newFixedLengthResponse(Status.OK, "text/plain"
                //, downQSLTable(cursor, false));
				, mainViewModel.databaseOpr.downQSLTable(cursor, true));
        response.addHeader("Content-Disposition"
                , String.format("attachment;filename=%s", fileName));

        return response;
    }

    /**
     * 查询QSO日志
     *
     * @param session 会话
     * @return html
     */
    @SuppressLint({"DefaultLocale", "Range"})
    private Response getQsoLogs(IHTTPSession session) {
        int pageSize = 100;
        String callsign = "";


        StringBuilder result = new StringBuilder();
        String startDate = "";
        String endDate = "";
        String exportFile = "";
        String qIsQSL = "";
        String qIsImported = "";

        //读取查询的参数
        Map<String, String> pars = session.getParms();
        int pageIndex = 1;
        if (pars.get("page") != null) {
            pageIndex = Integer.parseInt(Objects.requireNonNull(pars.get("page")));
        }
        if (pars.get("pageSize") != null) {
            pageSize = Integer.parseInt(Objects.requireNonNull(pars.get("pageSize")));
        }
        if (pars.get("callsign") != null) {
            callsign = Objects.requireNonNull(pars.get("callsign"));
        }
        if (pars.get("start_date") != null) {
            startDate = Objects.requireNonNull(pars.get("start_date"));
        }
        if (pars.get("end_date") != null) {
            endDate = Objects.requireNonNull(pars.get("end_date"));
        }
        String whereStr = String.format("%%%s%%", callsign);

        if (pars.get("exportFile") != null) {
            exportFile = Objects.requireNonNull(pars.get("exportFile"));
        }
        if (pars.get("QSL") != null) {
            qIsQSL = Objects.requireNonNull(pars.get("QSL"));
        }
        if (pars.get("Imported") != null) {
            qIsImported = Objects.requireNonNull(pars.get("Imported"));
        }
        String sotaSummit = "";
        if (pars.get("sotaSummit") != null) {
            sotaSummit = Objects.requireNonNull(pars.get("sotaSummit")).toUpperCase();
        }

        // JS 函式: 彈出山峰編號輸入框，讀取目前查詢條件，組成匯出 URL
        // 使用 button type=button，不受 onchange=form.submit() 影響
        result.append("<script>\n" +
                "function _qsoLogsBase() {\n" +
                "  var f = document.querySelector('form');\n" +
                "  var c = f.elements['callsign'] ? f.elements['callsign'].value : '';\n" +
                "  var sd = f.elements['start_date'] ? f.elements['start_date'].value : '';\n" +
                "  var ed = f.elements['end_date'] ? f.elements['end_date'].value : '';\n" +
                "  var qsl = '', imp = '';\n" +
                "  f.querySelectorAll('input[name=\"QSL\"]').forEach(function(e){ if(e.checked) qsl=e.value; });\n" +
                "  f.querySelectorAll('input[name=\"Imported\"]').forEach(function(e){ if(e.checked) imp=e.value; });\n" +
                "  return 'QSOLogs?callsign='+encodeURIComponent(c)+'&start_date='+encodeURIComponent(sd)+'&end_date='+encodeURIComponent(ed)+'&QSL='+encodeURIComponent(qsl)+'&Imported='+encodeURIComponent(imp);\n" +
                "}\n" +
                "function exportAdifFromLogs() {\n" +
                "  window.location.href = _qsoLogsBase() + '&exportFile=ADI';\n" +
                "}\n" +
                "function exportSotaFromLogs() {\n" +
                "  var s = prompt('SOTA Summit (e.g. BV/NT-032):', '');\n" +
                "  if (s === null || s.trim() === '') return;\n" +
                "  window.location.href = _qsoLogsBase() + '&sotaSummit=' + encodeURIComponent(s.trim()) + '&exportFile=SOTA';\n" +
                "}\n" +
                "</script>\n");
        result.append("<form >\n");
        HtmlContext.tableBegin(result, false, 0, true).append("\n");
        HtmlContext.tableRowBegin(result).append("<td>");
        Cursor cursor;
        StringBuilder dateSql = new StringBuilder();
        if (!startDate.equals("")) {
            dateSql.append(String.format(" AND (SUBSTR(qso_date_off,1,8)>=\"%s\") "
                    , startDate.replace("-", "")));
        }
        if (!endDate.equals("")) {
            dateSql.append(String.format(" AND (SUBSTR(qso_date_off,1,8)<=\"%s\") "
                    , endDate.replace("-", "")));
        }
        if (!qIsQSL.equals("")) {
            dateSql.append(String.format(" AND ((isQSl = %s) %s (isLotW_QSL = %s))"
                    , qIsQSL, qIsQSL.equals("1") ? "OR" : "AND", qIsQSL));
        }
        if (!qIsImported.equals("")) {
            dateSql.append(String.format(" AND (isLotW_import = %s)", qIsImported));
        }


        //导出到文件中
        if (exportFile.equalsIgnoreCase("ADI")) {
            return exportQSOLogs(exportFile, callsign, startDate, endDate, dateSql.toString());
        }
        if (exportFile.equalsIgnoreCase("SOTA")) {
            return exportSotaCsv(sotaSummit, callsign, startDate, endDate, dateSql.toString());
        }

        //计算总的记录数
        cursor = mainViewModel.databaseOpr.getDb().rawQuery(
                "select count(*) as rc from QSLTable " +
                        "where (([call] LIKE ?)OR(station_callsign LIKE ?))" + dateSql
                , new String[]{whereStr, whereStr});
        cursor.moveToFirst();
        int pageCount = Math.round(((float) cursor.getInt(cursor.getColumnIndex("rc")) / pageSize) + 0.5f);
        if (pageIndex > pageCount) pageIndex = pageCount;
        cursor.close();

        //查询、每页消息数设定
        result.append("</td>");
        HtmlContext.tableRowEnd(result);
        HtmlContext.tableRowBegin(result).append("<td>\n");

        result.append(String.format("%s , %s" +
                        "<input type=number name=pageSize style=\"width:80px\" value=%d>" +//页码及页大小
                        "&nbsp;&nbsp;<input type=submit value=\"%s\"><br>\n" +
                        "<br>\n%s&nbsp;<input type=text name=callsign value=\"%s\">" +//呼号
                        "\n%s&nbsp;<input type=date name=\"start_date\" value=\"%s\" onchange=\"javascript:form.submit();\">" +//起始时间
                        "\n%s&nbsp;<input type=date name=end_date value=\"%s\" onchange=\"javascript:form.submit();\">\n" +//结束时间
                        " </td></tr></table>\n" +
                        " <table bgcolor=#a1a1a1 border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
                        "<tr><td class=\"default\">\n" +

                        "<fieldset onclick=\"javascript:form.submit();\"> \n" +
                        "    <legend>QSL</legend>" +
                        "<div>\n" +
                        "<input type=\"radio\" name=\"QSL\" value=\"\" %s/>\n" +
                        "<label >" + GeneralVariables.getStringFromResource(R.string.html_qso_all) + "</label>\n" +
                        "<input type=\"radio\" name=\"QSL\" value=\"0\" %s />\n" +
                        "<label >" + GeneralVariables.getStringFromResource(R.string.html_qso_unconfirmed) + "</label>\n" +
                        "<input type=\"radio\" name=\"QSL\" value=\"1\" %s />\n" +
                        "<label >" + GeneralVariables.getStringFromResource(R.string.html_qso_confirmed) + "</label>\n" +
                        "</div>" +
                        "</fieldset>\n" +
                        "</td> <td class=\"default\">\n" +
                        "<fieldset onclick=\"javascript:form.submit();\"> \n" +
                        "    <legend>" + GeneralVariables.getStringFromResource(R.string.html_qso_source) + "</legend>" +
                        "<div>\n" +
                        "      <input type=\"radio\" name=\"Imported\" value=\"\" %s />\n" +
                        "      <label >" + GeneralVariables.getStringFromResource(R.string.html_qso_all) + "</label>\n" +
                        "      <input type=\"radio\" name=\"Imported\" value=\"0\" %s />\n" +
                        "      <label >" + GeneralVariables.getStringFromResource(R.string.html_qso_raw_log) + "</label>\n" +
                        "      <input type=\"radio\" name=\"Imported\" value=\"1\" %s />\n" +
                        "      <label >" + GeneralVariables.getStringFromResource(R.string.html_qso_external_logs) + "</label>\n" +
                        "    </div>" +
                        "</fieldset>" +
                        "</td>" +
                        "<td class=\"default\">" +
                        "<fieldset>\n" +
                        "<legend>Export</legend>" +
                        "<div>\n" +
                        "<button type=\"button\" onclick=\"exportAdifFromLogs()\">" +
                        GeneralVariables.getStringFromResource(R.string.html_export_adi) +
                        "</button>\n" +
                        "&nbsp;" +
                        "<button type=\"button\" onclick=\"exportSotaFromLogs()\">" +
                        GeneralVariables.getStringFromResource(R.string.html_export_sota) +
                        "</button>\n" +
                        "</div>" +
                        "</fieldset>" +
                        "</td></tr>  </table>" +
                        "<table bgcolor=#a1a1a1 border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%%\">\n" +
                        "        <tr><td class=\"default\">"


                , String.format(GeneralVariables.getStringFromResource(R.string.html_message_page_count), pageCount)
                , GeneralVariables.getStringFromResource(R.string.html_message_page_size)
                , pageSize
                , GeneralVariables.getStringFromResource(R.string.html_message_query)

                , GeneralVariables.getStringFromResource(R.string.html_callsign)
                , callsign
                , GeneralVariables.getStringFromResource(R.string.html_start_date_swl_message)
                , startDate
                , GeneralVariables.getStringFromResource(R.string.html_end_date_swl_message)
                , endDate

                , qIsQSL.equals("") ? "checked=\"true\"" : ""
                , qIsQSL.equals("0") ? "checked=\"true\"" : ""
                , qIsQSL.equals("1") ? "checked=\"true\"" : ""


                , qIsImported.equals("") ? "checked=\"true\"" : ""
                , qIsImported.equals("0") ? "checked=\"true\"" : ""
                , qIsImported.equals("1") ? "checked=\"true\"" : ""
        ));


        //定位页，第一页、上一页、下一页，最后一页
        result.append(String.format("<a href=\"QSOLogs?page=%d&pageSize=%d&callsign=%s&start_date=%s&end_date=%s&QSL=%s&Imported=%s\">|&lt;</a>" +
                        "&nbsp;&nbsp;<a href=\"QSOLogs?page=%d&pageSize=%d&callsign=%s&start_date=%s&end_date=%s&QSL=%s&Imported=%s\">&lt;&lt;</a>" +
                        "<input type=\"number\" name=\"page\" value=%d style=\"width:50px\">" +
                        "<a href=\"QSOLogs?page=%d&pageSize=%d&callsign=%s&start_date=%s&end_date=%s&QSL=%s&Imported=%s\">&gt;&gt;</a>\n" +
                        "&nbsp;&nbsp;<a href=\"QSOLogs?page=%d&pageSize=%d&callsign=%s&start_date=%s&end_date=%s&QSL=%s&Imported=%s\">&gt;|</a>\n"

                , 1, pageSize, callsign, startDate, endDate, qIsQSL, qIsImported
                , pageIndex - 1 == 0 ? 1 : pageIndex - 1, pageSize, callsign, startDate, endDate, qIsQSL, qIsImported
                , pageIndex
                , pageIndex == pageCount ? pageCount : pageIndex + 1, pageSize, callsign, startDate, endDate, qIsQSL, qIsImported
                , pageCount, pageSize, callsign, startDate, endDate, qIsQSL, qIsImported));
        result.append("</td>");
        HtmlContext.tableRowEnd(result);
        HtmlContext.tableEnd(result);
        result.append("</form>");
        //" </td></tr> </table></form>\n"


        cursor = mainViewModel.databaseOpr.getDb().rawQuery(
                String.format(
                        "select * from QSLTable where (([call] LIKE ?)OR(station_callsign LIKE ?)) " +
                                dateSql +
                                " order by qso_date desc,time_on desc LIMIT(%d),%d "
                        , (pageIndex - 1) * pageSize, pageSize), new String[]{whereStr, whereStr});

        HtmlContext.tableBegin(result, false, true).append("\n");

        //表头
        HtmlContext.tableRowBegin(result).append("\n");
        HtmlContext.tableCellHeader(result, "No.", "QSL"
                        , GeneralVariables.getStringFromResource(R.string.html_qso_source)
                        , GeneralVariables.getStringFromResource(R.string.html_callsign)
                        , GeneralVariables.getStringFromResource(R.string.html_qsl_grid)
                        , GeneralVariables.getStringFromResource(R.string.html_qsl_mode)
                        , GeneralVariables.getStringFromResource(R.string.html_rst_sent)
                        , GeneralVariables.getStringFromResource(R.string.html_rst_rcvd)
                        , GeneralVariables.getStringFromResource(R.string.html_qsl_start_day)//"qso date"
                        , GeneralVariables.getStringFromResource(R.string.html_qsl_start_time)//"time_on"
                        , GeneralVariables.getStringFromResource(R.string.html_qsl_end_date)//qso date off
                        , GeneralVariables.getStringFromResource(R.string.html_qsl_end_time)//"time_off"
                        , GeneralVariables.getStringFromResource(R.string.html_qsl_band)
                        , GeneralVariables.getStringFromResource(R.string.html_qsl_freq)
                        , GeneralVariables.getStringFromResource(R.string.html_callsign)//"station_callsign"
                        , GeneralVariables.getStringFromResource(R.string.html_qsl_grid)//"my_gridsquare"
                        , GeneralVariables.getStringFromResource(R.string.html_comment))//"comment")
                .append("\n");
        HtmlContext.tableRowEnd(result).append("\n");

        //表内容
        int order = 0;
        while (cursor.moveToNext()) {
            HtmlContext.tableRowBegin(result, true, order % 2 != 0).append("\n");

            String call = cursor.getString(cursor.getColumnIndex("call"));
            boolean isQSL = cursor.getInt(cursor.getColumnIndex("isQSL")) == 1;
            boolean isLotW_Import = cursor.getInt(cursor.getColumnIndex("isLotW_import")) == 1;
            boolean isLotW_QSL = cursor.getInt(cursor.getColumnIndex("isLotW_QSL")) == 1;
            String gridsquare = cursor.getString(cursor.getColumnIndex("gridsquare"));
            String mode = cursor.getString(cursor.getColumnIndex("mode"));
            String rst_sent = cursor.getString(cursor.getColumnIndex("rst_sent"));
            String rst_rcvd = cursor.getString(cursor.getColumnIndex("rst_rcvd"));
            String qso_date = cursor.getString(cursor.getColumnIndex("qso_date"));
            String time_on = cursor.getString(cursor.getColumnIndex("time_on"));
            String qso_date_off = cursor.getString(cursor.getColumnIndex("qso_date_off"));
            String time_off = cursor.getString(cursor.getColumnIndex("time_off"));
            String band = cursor.getString(cursor.getColumnIndex("band"));
            String freq = cursor.getString(cursor.getColumnIndex("freq"));
            String station_callsign = cursor.getString(cursor.getColumnIndex("station_callsign"));
            String my_gridsquare = cursor.getString(cursor.getColumnIndex("my_gridsquare"));
            String comment = cursor.getString(cursor.getColumnIndex("comment"));


            HtmlContext.tableCell(result, String.format("%d", order + 1 + pageSize * (pageIndex - 1)));
            HtmlContext.tableCell(result, (isQSL || isLotW_QSL) ? "<font color=green>√</font>" : "<font color=red>✗</font>");
            HtmlContext.tableCell(result, isLotW_Import ?
                    String.format("<font color=red>%s</font>"
                            , GeneralVariables.getStringFromResource(R.string.html_qso_external))
                    : String.format("<font color=green>%s</font>"
                    , GeneralVariables.getStringFromResource(R.string.html_qso_raw)));//是否是导入的
            HtmlContext.tableCell(result, String.format("<a href=\"QSOLogs?&pageSize=%d&callsign=%s\">%s</a>"
                    , pageSize
                    , call.replace("<", "")
                            .replace(">", "")
                    , call.replace("<", "&lt;")
                            .replace(">", "&gt;")));
            HtmlContext.tableCell(result, gridsquare == null ? "" : gridsquare, mode, rst_sent, rst_rcvd
                    , qso_date, time_on, qso_date_off, time_off, band, freq);
            HtmlContext.tableCell(result, String.format("<a href=\"QSOLogs?&pageSize=%d&callsign=%s\">%s</a>"
                    , pageSize
                    , station_callsign.replace("<", "")
                            .replace(">", "")
                    , station_callsign.replace("<", "&lt;")
                            .replace(">", "&gt;")));
            HtmlContext.tableCell(result, my_gridsquare == null ? "" : my_gridsquare
                    , comment).append("\n");

            HtmlContext.tableRowEnd(result).append("\n");

            order++;
        }
        cursor.close();
        HtmlContext.tableEnd(result).append("<br>\n");

        return Response.newFixedLengthResponse(HtmlContext.HTML_STRING(result.toString()));
    }

    /**
     * 获取全部通联日志
     *
     * @return HTML
     */
    private String showAllQSL() {
        Cursor cursor = mainViewModel.databaseOpr.getDb().rawQuery(
                "select * from QSLTable order by ID DESC ", null);
        return HtmlContext.ListTableContext(cursor, true);
    }

    /**
     * 按月获取日志
     *
     * @param month 月份yyyymm
     * @return HTML
     */
    private String showQSLByMonth(String month) {
        Cursor cursor = mainViewModel.databaseOpr.getDb().rawQuery(
                "select * from QSLTable  WHERE SUBSTR(qso_date,1,?)=? \n" +
                        "order by ID DESC ", new String[]{String.valueOf(month.length()), month});
        return HtmlContext.ListTableContext(cursor, true);
    }

    /**
     * 查最新解码的消息
     *
     * @return html
     */
    private String getNewMessages() {
        StringBuilder result = new StringBuilder();
        result.append("<script language=\"JavaScript\">\n" +
                "function myrefresh(){\n" +
                "window.location.reload();\n" +
                "}\n" +
                "setTimeout('myrefresh()',5000); //指定5秒刷新一次，5000处可自定义设置，1000为1秒\n" +
                "</script>");
        HtmlContext.tableBegin(result, false, true).append("\n");

        HtmlContext.tableRowBegin(result);
        HtmlContext.tableCellHeader(result, "UTC", "dB", "Δt"
                , GeneralVariables.getStringFromResource(R.string.html_qsl_freq)
                , GeneralVariables.getStringFromResource(R.string.message)
                , GeneralVariables.getStringFromResource(R.string.html_carrier_frequency_band));
        HtmlContext.tableRowEnd(result).append("\n");

        int order = 0;
        if (mainViewModel.currentMessages != null) {
            for (Ft8Message message : mainViewModel.currentMessages) {
                HtmlContext.tableRowBegin(result, true, order % 2 != 0)
                        .append("\n").append(message.toHtml());
                HtmlContext.tableRowEnd(result).append("\n");
                order++;
            }
        }
        HtmlContext.tableEnd(result).append("<br>\n");
        return result.toString();
    }

    /**
     * 显示导入FT8CN日志文件的HTML
     *
     * @return HTML
     */
    private String showImportLog() {
        StringBuilder result = new StringBuilder();
        HtmlContext.tableBegin(result, false, 0, true).append("\n");
        HtmlContext.tableRowBegin(result, false, true);
        HtmlContext.tableCell(result, String.format("%s<font size=5 color=red>%s</font>%s"
                , GeneralVariables.getStringFromResource(R.string.html_please_select)
                , GeneralVariables.getStringFromResource(R.string.html_adi_format)
                , GeneralVariables.getStringFromResource(R.string.html_file_in_other_format)));

        HtmlContext.tableRowEnd(result).append("\n");
        HtmlContext.tableRowBegin(result).append("\n");

        result.append("<td class=\"default\"><br><form action=\"importLogData\" method=\"post\"\n" +
                "            enctype=\"multipart/form-data\"\n" +
                "            onsubmit=\"var b=this.querySelector('input[type=submit]');" +
                "b.disabled=true;var d=0;setInterval(function(){d=(d%3)+1;" +
                "b.value='Uploading'+'...'.substring(0,d)},500)\">\n" +
                "            <input type=\"file\" name=\"file1\" id=\"file1\" title=\"select ADI file\" accept=\".adi,.txt\" />\n" +
                "            <input type=\"submit\" value=\"" + GeneralVariables.getStringFromResource(R.string.html_file_upload) + "\" />\n" +
                "        </form></td>");
        HtmlContext.tableRowEnd(result).append("\n");
        HtmlContext.tableEnd(result).append("\n");
        return result.toString();
    }

    @SuppressLint("Range")
    private String showQSLTable() {

        StringBuilder result = new StringBuilder();
        // SOTA 匯出: 彈出輸入框後導向下載 URL
        result.append("<script>\n" +
                "function exportSota(period) {\n" +
                "  var s = prompt('SOTA Summit (e.g. BV/NT-032):', '');\n" +
                "  if (s !== null && s.trim() !== '') {\n" +
                "    window.location.href = '/downSotaCsv/' + period + '?summit=' + encodeURIComponent(s.trim());\n" +
                "  }\n" +
                "}\n" +
                "</script>\n");
        HtmlContext.tableBegin(result, false, 1, true).append("\n");
        HtmlContext.tableRowBegin(result).append("\n");

        HtmlContext.tableCellHeader(result
                , GeneralVariables.getStringFromResource(R.string.html_time)
                , GeneralVariables.getStringFromResource(R.string.html_total)
                , GeneralVariables.getStringFromResource(R.string.html_operation)
                , GeneralVariables.getStringFromResource(R.string.html_operation)
                , GeneralVariables.getStringFromResource(R.string.html_operation)
                , GeneralVariables.getStringFromResource(R.string.html_operation)
        ).append("\n");

        HtmlContext.tableRowEnd(result).append("\n");

        Cursor cursor = mainViewModel.databaseOpr.getDb().rawQuery("select count(*) as b from QSLTable"
                , null);
        cursor.moveToFirst();

        result.append(String.format("<tr><td align=center class=\"default\"><a href=\"/showAllQsl\">%s</a></td>"
                , GeneralVariables.getStringFromResource(R.string.html_all_logs)));
        result.append(String.format("<td align=center class=\"default\">%s</td>", cursor.getString(cursor.getColumnIndex("b"))));
        result.append(String.format("<td align=center class=\"default\"><a href=\"/downAllQsl\">%s</a></td>"
                , GeneralVariables.getStringFromResource(R.string.html_download)));
        result.append(String.format("<td align=center class=\"default\"><a href=\"#\" onclick=\"exportSota('ALL');return false;\">%s</a></td>"
                , GeneralVariables.getStringFromResource(R.string.html_export_sota)));
        result.append("<td align=center class=\"default\"></td><td></td></tr>");
        cursor.close();

        cursor = mainViewModel.databaseOpr.getDb().rawQuery("select count(*) as b from QSLTable\n" +
                "WHERE SUBSTR(qso_date,1,8)=?", new String[]{UtcTimer.getYYYYMMDD(UtcTimer.getSystemTime())});
        cursor.moveToFirst();

        HtmlContext.tableRowBegin(result, true, true).append("\n");
        HtmlContext.tableCell(result, String.format("<a href=\"/showQsl/%s\">%s</a>"
                , UtcTimer.getYYYYMMDD(UtcTimer.getSystemTime())
                , GeneralVariables.getStringFromResource(R.string.html_today_log)));
        HtmlContext.tableCell(result, cursor.getString(cursor.getColumnIndex("b")));
        HtmlContext.tableCell(result, String.format("<a href=\"/downQsl/%s\">%s</a>"
                , UtcTimer.getYYYYMMDD(UtcTimer.getSystemTime())
                , GeneralVariables.getStringFromResource(R.string.html_download_all)));
        HtmlContext.tableCell(result, String.format("<a href=\"#\" onclick=\"exportSota('%s');return false;\">%s</a>"
                , UtcTimer.getYYYYMMDD(UtcTimer.getSystemTime())
                , GeneralVariables.getStringFromResource(R.string.html_export_sota)));
        HtmlContext.tableCell(result, String.format("<a href=\"/downQslNoQSL/%s\">%s</a>"
                , UtcTimer.getYYYYMMDD(UtcTimer.getSystemTime())
                , GeneralVariables.getStringFromResource(R.string.html_download_unconfirmed)));
        HtmlContext.tableCell(result, String.format("<a href=\"/delQsl/%s\">%s</a>"
                , UtcTimer.getYYYYMMDD(UtcTimer.getSystemTime())
                , GeneralVariables.getStringFromResource(R.string.html_delete))).append("\n");

        HtmlContext.tableRowEnd(result).append("\n");

        cursor.close();

        int order = 1;
        cursor = mainViewModel.databaseOpr.getDb()
                .rawQuery("select SUBSTR(qso_date,1,6) as a,count(*) as b from QSLTable\n" +
                        "group by SUBSTR(qso_date,1,6)", null);
        while (cursor.moveToNext()) {
            HtmlContext.tableRowBegin(result, true, order % 2 == 0);

            HtmlContext.tableCell(result, String.format("<a href=\"/showQsl/%s\">%s</a>"
                    , cursor.getString(cursor.getColumnIndex("a"))
                    , cursor.getString(cursor.getColumnIndex("a"))));

            HtmlContext.tableCell(result, cursor.getString(cursor.getColumnIndex("b")));
            HtmlContext.tableCell(result, String.format("<a href=\"/downQsl/%s\">%s</a>"
                    , cursor.getString(cursor.getColumnIndex("a"))
                    , GeneralVariables.getStringFromResource(R.string.html_download_all)));
            HtmlContext.tableCell(result, String.format("<a href=\"#\" onclick=\"exportSota('%s');return false;\">%s</a>"
                    , cursor.getString(cursor.getColumnIndex("a"))
                    , GeneralVariables.getStringFromResource(R.string.html_export_sota)));
            HtmlContext.tableCell(result, String.format("<a href=\"/downQslNoQSL/%s\">%s</a>"
                    , cursor.getString(cursor.getColumnIndex("a"))
                    , GeneralVariables.getStringFromResource(R.string.html_download_unconfirmed)));
            HtmlContext.tableCell(result, String.format("<a href=\"/delQsl/%s\">%s</a>"
                    , cursor.getString(cursor.getColumnIndex("a"))
                    , GeneralVariables.getStringFromResource(R.string.html_delete))).append("\n");

            HtmlContext.tableRowEnd(result).append("\n");
            order++;
        }
        HtmlContext.tableEnd(result).append("\n");
        cursor.close();
        return result.toString();
    }

    private String downQSLByMonth(String month, boolean downall) {
        Cursor cursor;
        if (downall) {
            cursor = mainViewModel.databaseOpr.getDb().rawQuery("select * from QSLTable \n" +
                            "WHERE (SUBSTR(qso_date,1,?)=?)"
                    , new String[]{String.valueOf(month.length()), month});
        } else {
            cursor = mainViewModel.databaseOpr.getDb().rawQuery("select * from QSLTable \n" +
                            "WHERE (SUBSTR(qso_date,1,?)=?)and(isLotW_QSL=0 and isQSL=0)"
                    , new String[]{String.valueOf(month.length()), month});

        }
        //return downQSLTable(cursor, false);
		return mainViewModel.databaseOpr.downQSLTable(cursor, false);
    }

    /**
     * 下载全部日志
     *
     * @return String
     */
    private String downAllQSl() {
        Cursor cursor = mainViewModel.databaseOpr.getDb().rawQuery("select * from QSLTable", null);
        //return downQSLTable(cursor, false);
		return mainViewModel.databaseOpr.downQSLTable(cursor, false);
    }

    /**
     * 將頻段名稱轉換為 SOTA CSV 所需的頻率字串
     * 例如 "20m" -> "14MHz"
     */
    private String bandToSotaFreq(String band) {
        if (band == null) return "";
        switch (band.toLowerCase(Locale.ROOT)) {
            case "160m": return "1.8MHz";
            case "80m":  return "3.5MHz";
            case "60m":  return "5MHz";
            case "40m":  return "7MHz";
            case "30m":  return "10MHz";
            case "20m":  return "14MHz";
            case "17m":  return "18MHz";
            case "15m":  return "21MHz";
            case "12m":  return "24MHz";
            case "10m":  return "28MHz";
            case "6m":   return "50MHz";
            case "4m":   return "70MHz";
            case "2m":   return "144MHz";
            case "70cm": return "432MHz";
            case "23cm": return "1240MHz";
            default:     return band;
        }
    }

    /**
     * 從匯出日誌清單頁按月/全部匯出 SOTA V2 CSV
     * month 為 null 時匯出全部，否則依 YYYYMM 或 YYYYMMDD 過濾
     */
    @SuppressLint("Range")
    private Response exportSotaCsvByMonth(String summit, String month) {
        String safeSummit = summit.replace("/", "-")
                .replace("\\", "-")
                .replace(":", "-")
                .replace("?", "-")
                .replace("*", "-");
        String fileName = String.format("sota_%s%s.csv",
                safeSummit.isEmpty() ? "log" : safeSummit,
                month != null ? "_" + month : "");

        Cursor cursor;
        if (month == null) {
            cursor = mainViewModel.databaseOpr.getDb().rawQuery(
                    "select * from QSLTable order by qso_date asc, time_on asc", null);
        } else {
            cursor = mainViewModel.databaseOpr.getDb().rawQuery(
                    "select * from QSLTable WHERE SUBSTR(qso_date,1,?)=? order by qso_date asc, time_on asc",
                    new String[]{String.valueOf(month.length()), month});
        }
        cursor.moveToFirst();

        StringBuilder sb = new StringBuilder();
        while (cursor.moveToNext()) {
            String call            = cursor.getString(cursor.getColumnIndex("call"));
            String stationCallsign = cursor.getString(cursor.getColumnIndex("station_callsign"));
            String qsoDate         = cursor.getString(cursor.getColumnIndex("qso_date"));
            String timeOn          = cursor.getString(cursor.getColumnIndex("time_on"));
            String band            = cursor.getString(cursor.getColumnIndex("band"));
            String mode            = cursor.getString(cursor.getColumnIndex("mode"));

            String sotaDate = "";
            if (qsoDate != null && qsoDate.length() >= 8) {
                sotaDate = qsoDate.substring(6, 8) + "/" + qsoDate.substring(4, 6) + "/" + qsoDate.substring(0, 4);
            }
            String sotaTime = "";
            if (timeOn != null && timeOn.length() >= 4) {
                sotaTime = timeOn.substring(0, 2) + ":" + timeOn.substring(2, 4);
            }
            String myCall = (stationCallsign != null && !stationCallsign.isEmpty())
                    ? stationCallsign : GeneralVariables.myCallsign;

            sb.append(String.format("V2,%s,%s,%s,%s,%s,DATA,%s,,%s\n",
                    myCall, summit, sotaDate, sotaTime, bandToSotaFreq(band), call, mode));
        }
        cursor.close();

        Response response = Response.newFixedLengthResponse(Status.OK, "text/plain", sb.toString());
        response.addHeader("Content-Disposition", String.format("attachment;filename=%s", fileName));
        return response;
    }

    /**
     * 匯出 SOTA V2 CSV 格式
     * 格式: V2,MyCall,Summit,DD/MM/YYYY,HH:MM,Freq,ModeCat,TheirCall,TheirSummit,Mode
     */
    @SuppressLint("Range")
    private Response exportSotaCsv(String summit, String callsign, String start_date, String end_date, String extWhere) {
        String safeSummit = summit.replace("/", "-")
                .replace("\\", "-")
                .replace(":", "-")
                .replace("?", "-")
                .replace("*", "-");
        String fileName = String.format("sota_%s.csv", safeSummit.isEmpty() ? "log" : safeSummit);

        String whereStr = String.format("%%%s%%", callsign);
        Cursor cursor = mainViewModel.databaseOpr.getDb().rawQuery(
                "select * from QSLTable where (([call] LIKE ?)OR(station_callsign LIKE ?)) "
                        + extWhere
                        + " order by qso_date asc, time_on asc",
                new String[]{whereStr, whereStr});
        cursor.moveToFirst();

        StringBuilder result = new StringBuilder();
        while (cursor.moveToNext()) {
            String call             = cursor.getString(cursor.getColumnIndex("call"));
            String stationCallsign  = cursor.getString(cursor.getColumnIndex("station_callsign"));
            String qsoDate          = cursor.getString(cursor.getColumnIndex("qso_date"));  // YYYYMMDD
            String timeOn           = cursor.getString(cursor.getColumnIndex("time_on"));   // HHMMSS
            String band             = cursor.getString(cursor.getColumnIndex("band"));
            String mode             = cursor.getString(cursor.getColumnIndex("mode"));

            // 日期格式轉換: YYYYMMDD -> DD/MM/YYYY
            String sotaDate = "";
            if (qsoDate != null && qsoDate.length() >= 8) {
                sotaDate = qsoDate.substring(6, 8) + "/" + qsoDate.substring(4, 6) + "/" + qsoDate.substring(0, 4);
            }
            // 時間格式轉換: HHMMSS -> HH:MM
            String sotaTime = "";
            if (timeOn != null && timeOn.length() >= 4) {
                sotaTime = timeOn.substring(0, 2) + ":" + timeOn.substring(2, 4);
            }

            String sotaFreq = bandToSotaFreq(band);
            String myCall = (stationCallsign != null && !stationCallsign.isEmpty())
                    ? stationCallsign : GeneralVariables.myCallsign;

            // V2,MyCall,Summit,Date,Time,Freq,ModeCat,TheirCall,TheirSummit(S2S空白),Mode
            result.append(String.format("V2,%s,%s,%s,%s,%s,DATA,%s,,%s\n",
                    myCall, summit, sotaDate, sotaTime, sotaFreq, call, mode));
        }
        cursor.close();

        Response response = Response.newFixedLengthResponse(Status.OK, "text/plain", result.toString());
        response.addHeader("Content-Disposition", String.format("attachment;filename=%s", fileName));
        return response;
    }


}
