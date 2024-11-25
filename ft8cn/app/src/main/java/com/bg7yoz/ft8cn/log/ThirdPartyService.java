package com.bg7yoz.ft8cn.log;
import android.util.Log;

import com.bg7yoz.ft8cn.GeneralVariables;
import com.bg7yoz.ft8cn.ui.ToastMessage;
import com.bg7yoz.ft8cn.MainViewModel;
import com.bg7yoz.ft8cn.log.QSLRecord;

import org.json.JSONObject;
import org.json.JSONStringer;
import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserFactory;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.Random;

import android.database.Cursor;

import com.bg7yoz.ft8cn.log.PSKReporter; // PSKReporter

enum ServiceType{
    Cloudlog,
    QRZ
}

public class ThirdPartyService {
    public static String TAG = "ThirdPartyService";
	private MainViewModel mainViewModel;
	
	//private static final String PSK_SERVER_HOSTNAME = "report.pskreporter.info";
    //private static final int PSK_SERVER_PORT = 4739;
	//private static final int TEST_PSK_SERVER_PORT = 14739;
	//private static final String TEST_PSK_SERVER_HOSTNAME = "pskreporter.info";

    public ThirdPartyService(MainViewModel mainViewModel) {
        this.mainViewModel = mainViewModel;
    }

    private static String QSLRecordToADIF(QSLRecord qslRecord, ServiceType serv){
        StringBuilder logStr = new StringBuilder();
        logStr.append(String.format("<call:%d>%s "
                , qslRecord.getToCallsign().length()
                , qslRecord.getToCallsign()));

        if (qslRecord.getToMaidenGrid() != null) {
            logStr.append(String.format("<gridsquare:%d>%s "
                    , qslRecord.getToMaidenGrid().length()
                    , qslRecord.getToMaidenGrid()));
		 }
		 
        if (qslRecord.getMode() != null) {
            logStr.append(String.format("<mode:%d>%s "
                    , qslRecord.getMode().length()
                    , qslRecord.getMode()));
        }

        if (String.valueOf(qslRecord.getSendReport()) != null) {
            logStr.append(String.format("<rst_sent:%d>%s "
                    , String.valueOf(qslRecord.getSendReport()).length()
                    , String.valueOf(qslRecord.getSendReport())));
        }

        if (String.valueOf(qslRecord.getReceivedReport()) != null) {
            logStr.append(String.format("<rst_rcvd:%d>%s "
                    , String.valueOf(qslRecord.getReceivedReport()).length()
                    , String.valueOf(qslRecord.getReceivedReport())));
        }		 
        if (qslRecord.getQso_date() != null) {
            logStr.append(String.format("<qso_date:%d>%s "
                    , qslRecord.getQso_date().length()
                    , qslRecord.getQso_date()));
        }

        if (qslRecord.getTime_on() != null) {
            logStr.append(String.format("<time_on:%d>%s "
                    , qslRecord.getTime_on().length()
                    , qslRecord.getTime_on()));
        }
        if (qslRecord.getBandLength() != null) {
            logStr.append(String.format("<band:%d>%s "
                    , qslRecord.getBandLength().length()
                    , qslRecord.getBandLength()));
        }
        if (qslRecord.getQso_date_off() != null) {
            logStr.append(String.format("<qso_date_off:%d>%s "
                    , qslRecord.getQso_date_off().length()
                    , qslRecord.getQso_date_off()));
        }

        if (qslRecord.getTime_off() != null) {
            logStr.append(String.format("<time_off:%d>%s "
                    , qslRecord.getTime_off().length()
                    , qslRecord.getTime_off()));
        }
        if (String.valueOf(qslRecord.getBandFreq()) != null) {
            String freq = "";
            Log.d(TAG,String.valueOf(qslRecord.getBandFreq()));
            if (serv == ServiceType.Cloudlog || serv == ServiceType.QRZ){
                double i = (double)qslRecord.getBandFreq() / 1000000.0;
                //freq = String.valueOf(i);
				freq = String.format("%.6f", i); // 格式化為小數點後6位
            }
            logStr.append(String.format("<freq:%d>%s "
                    , freq.length()
                    , freq));
        }
        if (qslRecord.getMyCallsign() != null) {
            logStr.append(String.format("<station_callsign:%d>%s "
                    , qslRecord.getMyCallsign().length()
                    , qslRecord.getMyCallsign()));
        }

        if (qslRecord.getMyMaidenGrid() != null) {
            logStr.append(String.format("<my_gridsquare:%d>%s "
                    , qslRecord.getMyMaidenGrid().length()
                    , qslRecord.getMyMaidenGrid()));
        }

        String comment = qslRecord.getComment();

        //<comment:15>Distance: 99 km <eor>
        //在写库的时候，一定要加" km"
        logStr.append(String.format("<comment:%d>%s <eor>\n"
                , comment.length()
                , comment));
        return logStr.toString();
	}
 public static void UploadToCloudLog(QSLRecord qslRecord){
        // 转换为adif格式
        String logStr = QSLRecordToADIF(qslRecord,ServiceType.Cloudlog);
        Log.d(TAG,logStr);
        String address = GeneralVariables.getCloudlogServerAddress();
        if (!address.endsWith("/")){
            address+="/";
        }
        HashMap<String,String> json = new HashMap<>();
        json.put("key", GeneralVariables.getCloudlogServerApiKey());
        json.put("station_profile_id", GeneralVariables.getCloudlogStationID());
        json.put("type","adif");
        json.put("string", logStr);
        JSONStringer js = new JSONStringer();
        try {
            String result = js.object().key("key").value(GeneralVariables.getCloudlogServerApiKey()).key("station_profile_id").value(GeneralVariables.getCloudlogStationID())
                    .key("type").value("adif").key("string").value(logStr).endObject().toString();
            String clRes = sendPostRequest(address+"api/qso/",result);
            Log.d(TAG,"Updated to Cloudlog successfully. result:"+clRes);
        }catch (Exception k){
            Log.d(TAG, k.toString());
        }
    }
    public static boolean CheckCloudlogConnection(){
        String address = GeneralVariables.getCloudlogServerAddress();
        String apiKey = GeneralVariables.getCloudlogServerApiKey();
        // 检查地址末尾是否含有 /
        if (!address.endsWith("/")){
            address+="/";
        }
        try{
            String url = address + "api/auth/"+ apiKey;
            Log.d(TAG, "URL: "+url);
            String result = sendGetRequest(url);
            Log.d(TAG, result);
            if (!result.equals("<auth><status>Valid</status><rights>rw</rights></auth>")){
                return false;
            }
            return true;
        }catch (Exception e){
            Log.d(TAG, e.toString());
            return false;
        }
    }

    public static boolean CheckQRZConnection(){
        String apiKey = GeneralVariables.getQrzApiKey();
		
        try{
            String url = "https://logbook.qrz.com/api?KEY="+apiKey+"&ACTION=STATUS";
            String result = sendGetRequest(url);
            HashMap<String,String> status = new HashMap<>();
            for (String s : result.split("&")) {
                String[] split = s.split("=");
                if (split.length>1){
                    status.put(split[0],split[1]);
                }
            }
            Log.d(TAG, status.toString());
			ToastMessage.show( status.toString() );
            if (!status.get("RESULT").equals("OK")){
                return false;
            }
            return true;
        }catch (Exception e){
            Log.d(TAG, e.toString());
            return false;
        }
		

		
		
    }




  public static void UploadToQRZ(QSLRecord qslRecord){
        // 转换为adif格式
        String logStr = QSLRecordToADIF(qslRecord, ServiceType.QRZ);
        Log.d(TAG,logStr);
        String apikey = GeneralVariables.getQrzApiKey();
        HashMap<String,String> json = new HashMap<>();

        String url = String.format("https://logbook.qrz.com/api/KEY=%s&ACTION=INSERT&ADIF=%s",apikey,logStr);
		String result_desc="";
		
        try {
            String result = sendGetRequest(url);
			HashMap<String,String> status = new HashMap<>();
            for (String s : result.split("&")) {
                String[] split = s.split("=");
                if (split.length>1){
                    status.put(split[0],split[1]);
                }
            }
			
			
			
			if (status.get("RESULT").equals("OK")){
				result_desc=String.format("Updated to QRZ successfully. result: %s",result);
			}
			else{
				result_desc=String.format("Updated to QRZ fail!!. result: %s",result);
			}

			
            Log.d(TAG,"Updated to QRZ successfully. result:" + result);

        }catch (Exception k){
            Log.d(TAG, k.toString());
			result_desc=String.format("Updated to QRZ fail!!. result: %s",k.toString());
        }
		
		ToastMessage.show(result_desc);
    }

	public boolean UploadToQRZToday(){	
	
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
		String todayDate = format.format(new Date());
		
		Cursor cursor = mainViewModel.databaseOpr.getDb().rawQuery("select * from QSLTable \n" +
                            "WHERE (SUBSTR(qso_date,1,8)=?)"
                    , new String[]{todayDate});
		ToastMessage.show("Select "+todayDate);
	
	    if (cursor != null && cursor.moveToFirst()) {
			do {
				// 組裝QSL Log資訊
				String myCallsign = cursor.getString(cursor.getColumnIndexOrThrow("station_callsign")); //自己的呼號
				
				
				String qso_date=cursor.getString(cursor.getColumnIndexOrThrow("qso_date"));
				String time_on=cursor.getString(cursor.getColumnIndexOrThrow("time_on"));
				
				String dateTime_time_on = qso_date + time_on; // "20241110153000"
				long startTime=1;
				
				
				try {
					// 將合併的日期時間字符串轉換為 Date，再轉換為 long
					Date dateTime = format.parse(dateTime_time_on);
					startTime=dateTime.getTime();
				} catch (ParseException e) {
					e.printStackTrace();
					startTime=Long.parseLong(time_on);
				}
				
				String time_off=cursor.getString(cursor.getColumnIndexOrThrow("time_off"));
				String dateTime_time_off = qso_date + time_off ;// "20241110153000"
				long endTime=1;
				try {
					// 將合併的日期時間字符串轉換為 Date，再轉換為 long
					Date dateTime = format.parse(dateTime_time_off);
					endTime=dateTime.getTime();
				} catch (ParseException e) {
					e.printStackTrace();
					endTime=Long.parseLong(time_on);
				}
				
				String toCallsign=cursor.getString(cursor.getColumnIndexOrThrow("call")); //對方呼號
				String myMaidenGrid=cursor.getString(cursor.getColumnIndexOrThrow("my_gridsquare"));
				String toMaidenGrid=cursor.getString(cursor.getColumnIndexOrThrow("gridsquare"));
				String rst_sent=cursor.getString(cursor.getColumnIndexOrThrow("rst_sent"));
				int sendReport=Integer.parseInt(rst_sent);

				String rst_rcvd=cursor.getString(cursor.getColumnIndexOrThrow("rst_rcvd"));
				int receivedReport=Integer.parseInt(rst_rcvd);
				
				String mode=cursor.getString(cursor.getColumnIndexOrThrow("mode"));
				long band=cursor.getLong(cursor.getColumnIndexOrThrow("band"));

				String FrequencyStr =cursor.getString(cursor.getColumnIndexOrThrow("freq"));
				Double Frequency =cursor.getDouble(cursor.getColumnIndexOrThrow("freq"));
				QSLRecord qslRecord = new QSLRecord(startTime,endTime,myCallsign,myMaidenGrid,
													toCallsign,toMaidenGrid,sendReport,receivedReport,
													mode,(long) (Frequency * 1000000),1972 // 資料庫好像沒有儲存聲音頻率
				);
				ToastMessage.show("Upload "+myCallsign+" "+toCallsign+" "+FrequencyStr);
				
				// 上傳
				ThirdPartyService.UploadToQRZ(qslRecord);

				
			} while (cursor.moveToNext());
		}
		
		
		if (cursor != null) {
			cursor.close();
		}
		
		
		
	
		return true;
		
	}

    public static String sendPostRequest(String url, String json) throws IOException {
        HttpURLConnection conn = null;
        BufferedReader reader = null;

        try {
            URL urlObj = new URL(url);
            conn = (HttpURLConnection) urlObj.openConnection();

            // 设置请求方法为POST
            conn.setRequestMethod("POST");
            // 设置请求的头部信息
            conn.setRequestProperty("Content-Type", "application/json");

            // 获取OutputStream，将请求的数据写入流中
            OutputStream os = conn.getOutputStream();
            os.write(json.getBytes());
            os.flush();

            // 获取服务器的响应结果
            int responseCode = conn.getResponseCode();
            // cloudlog使用HTTP_CREATED作为创建记录成功的响应
            if (responseCode == HttpURLConnection.HTTP_OK || responseCode==HttpURLConnection.HTTP_CREATED) {
                reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                StringBuilder response = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }
                return response.toString();
            }
        } finally {
            if (conn != null) {
                conn.disconnect();
            }
            if (reader != null) {
                reader.close();
            }
        }

        return null;
    }
    public static String sendGetRequest(String url) throws IOException {
        HttpURLConnection conn = null;
        BufferedReader reader = null;

        try {
            URL urlObj = new URL(url);
            conn = (HttpURLConnection) urlObj.openConnection();

            // 设置请求方法为POST
            conn.setRequestMethod("GET");
            // 设置请求的头部信息
            conn.setRequestProperty("Content-Type", "application/json");

            // 获取服务器的响应结果
            int responseCode = conn.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                StringBuilder response = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }
                return response.toString();
            }
        } finally {
            if (conn != null) {
                conn.disconnect();
            }
            if (reader != null) {
                reader.close();
            }
        }
        return null;
    }
	
	public static String packetToHex(DatagramPacket packet) {
        byte[] data = packet.getData();
        int length = packet.getLength();
        StringBuilder hexString = new StringBuilder(length * 2);

        for (int i = 0; i < length; i++) {
            String hex = Integer.toHexString(data[i] & 0xFF);
            if (hex.length() == 1) {
                hexString.append('0'); // 加上前置 0 以確保每個 byte 都是兩位
            }
            hexString.append(hex);
            hexString.append(" ");
        }

        return hexString.toString().toUpperCase().trim(); // 輸出大寫字母並去掉最後的空格
    }
	
    
	/*
	public static void pskReport(String senderCallsign, String receiverCallsign, int snr, double frequency, long epochTime, String mode) throws Exception {
        try (DatagramSocket socket = new DatagramSocket()) {
            InetAddress address = InetAddress.getByName(TEST_PSK_SERVER_HOSTNAME);

            ByteBuffer packet = ByteBuffer.allocate(512);
            
            // Header
            packet.put((byte) 0x00); // version 
            packet.put((byte) 0x0A); // default version
			// 開始位置為2(0~2) 00 AC
            packet.putShort((short) 0); // length placeholder (updated later)
			
			// 傳輸時間戳：47 95 32 72
            packet.putInt((int) (System.currentTimeMillis() / 1000)); // current timestamp
			// 序列號：00 00 00 01 追蹤封包順序
            packet.putInt(8); // random sequence number
			
			//隨機識別碼 00 00 00 00
            packet.putInt(new Random().nextInt(Integer.MAX_VALUE)); // random identifier


            // 接收者資訊描述符
            packet.put(new byte[] {
                (byte) 0x00, (byte) 0x03, 
				(byte) 0x00, (byte) 0x24,  // 36 字節(00 24)。
				(byte) 0x99, (byte) 0x92,  // 資料為接收者資訊。
                (byte) 0x00, (byte) 0x03, (byte) 0x00, (byte) 0x01,
                (byte) 0x80, (byte) 0x02, (byte) 0xFF, (byte) 0xFF, (byte) 0x00, (byte) 0x00, (byte) 0x76, (byte) 0x8F,  //接收者呼號。
                (byte) 0x80, (byte) 0x04, (byte) 0xFF, (byte) 0xFF, (byte) 0x00, (byte) 0x00, (byte) 0x76, (byte) 0x8F,  //接收者位置（Locator）
                (byte) 0x80, (byte) 0x08, (byte) 0xFF, (byte) 0xFF, (byte) 0x00, (byte) 0x00, (byte) 0x76, (byte) 0x8F,  //解碼軟體。
                (byte) 0x00, (byte) 0x00
            });

            // 發送者資訊描述符
            packet.put(new byte[] {
                (byte) 0x00, (byte) 0x02,
				(byte) 0x00, (byte) 0x2C, 
				(byte) 0x99, (byte) 0x93, 
                (byte) 0x00, (byte) 0x05,
                (byte) 0x80, (byte) 0x01, (byte) 0xFF, (byte) 0xFF, (byte) 0x00, (byte) 0x00, (byte) 0x76, (byte) 0x8F, //發送者呼號
                (byte) 0x80, (byte) 0x05, (byte) 0x00, (byte) 0x04, (byte) 0x00, (byte) 0x00, (byte) 0x76, (byte) 0x8F, //發送頻率（單位：赫茲）。
                (byte) 0x80, (byte) 0x0A, (byte) 0xFF, (byte) 0xFF, (byte) 0x00, (byte) 0x00, (byte) 0x76, (byte) 0x8F, //通訊模式。
                (byte) 0x80, (byte) 0x0B, (byte) 0x00, (byte) 0x01, (byte) 0x00, (byte) 0x00, (byte) 0x76, (byte) 0x8F,  //料來源識別碼。
                (byte) 0x00, (byte) 0x96, (byte) 0x00, (byte) 0x04
            });

            // 接收者資訊記錄
            packet.put((byte) 0x99);
            packet.put((byte) 0x92);
            packet.putShort((short) 0x21); //長度 32 字節。(00 20)
            //byte[] receiverCallsignBytes = receiverCallsign.getBytes(StandardCharsets.UTF_8);
			byte[] receiverCallsignBytes = "BV6LC".getBytes(StandardCharsets.UTF_8);
            packet.put((byte) receiverCallsignBytes.length);
            packet.put(receiverCallsignBytes);

            byte[] locatorBytes = "FN42hn".getBytes(StandardCharsets.UTF_8);
            packet.put((byte) locatorBytes.length);
            packet.put(locatorBytes);

            byte[] softwareBytes = "Homebrew v5.6".getBytes(StandardCharsets.UTF_8);
            packet.put((byte) softwareBytes.length);
            packet.put(softwareBytes);
            packet.put((byte) 0x00); // Padding for 4-byte alignment
			packet.put((byte) 0x00); // Padding for 4-byte alignment

			
            // 發送者資訊記錄 1
			// For senderCallsign, frequency, mode, informationSource (1 byte), flowStartSeconds use:
			packet.put((byte) 0x99);
            packet.put((byte) 0x93);
            packet.putShort((short) 0x2D);
            //byte[] senderCallsignBytes = senderCallsign.getBytes(StandardCharsets.UTF_8);
			byte[] senderCallsignBytes = "BV6LC".getBytes(StandardCharsets.UTF_8);
            packet.put((byte) senderCallsignBytes.length);
            packet.put(senderCallsignBytes);
            packet.putInt((int) frequency*1000000); // frequency in Hz
            //packet.put((byte) snr); // SNR
            //byte[] modeBytes = mode.getBytes(StandardCharsets.UTF_8);
			byte[] modeBytes = "PSL".getBytes(StandardCharsets.UTF_8);
            packet.put((byte) modeBytes.length);
            packet.put(modeBytes);
            packet.put((byte) 0x01); // Information source
            packet.putInt((int) epochTime); // UNIX time
            

			
			// 發送者資訊記錄 2
            //byte[] senderCallsignBytes = senderCallsign.getBytes(StandardCharsets.UTF_8);
			senderCallsignBytes = "BU2GF".getBytes(StandardCharsets.UTF_8);
            packet.put((byte) senderCallsignBytes.length);
            packet.put(senderCallsignBytes);
            packet.putInt((int) frequency*1000000); // frequency in Hz
            //packet.put((byte) snr); // SNR
            //byte[] modeBytes = mode.getBytes(StandardCharsets.UTF_8);
			modeBytes = "PSL".getBytes(StandardCharsets.UTF_8);
            packet.put((byte) modeBytes.length);
            packet.put(modeBytes);
            packet.put((byte) 0x01); // Information source
            packet.putInt((int) epochTime); // UNIX time
			packet.put((byte) 0x00); // Padding for 4-byte alignment
			packet.put((byte) 0x00); // Padding for 4-byte alignment
            
            // Update packet length
			int packetLength = packet.position();
            packet.putShort(2, (short) packetLength);

			

            byte[] data = new byte[packet.position()];
            packet.flip();
            packet.get(data);

            // Send packet
            //DatagramPacket udpPacket = new DatagramPacket(data, data.length, address, TEST_PSK_SERVER_PORT);
			DatagramPacket udpPacket = new DatagramPacket(data, data.length, address, 4739);
            socket.send(udpPacket);
            System.out.println("Spot data sent to PSK Reporter test server.");
			
			// 發送數據包
			ToastMessage.show("Spot data sent to PSK Reporter test server.");
			ToastMessage.show(packetToHex(udpPacket));
			Log.d(TAG,packetToHex(udpPacket));
			
        }
    }
	*/
	
	


	
	
}