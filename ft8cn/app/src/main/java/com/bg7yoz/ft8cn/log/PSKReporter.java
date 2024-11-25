package com.bg7yoz.ft8cn.log;

import android.util.Log;

import java.io.*;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.Properties;
import java.util.Random;
import java.net.UnknownHostException;

import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ThreadLocalRandom;

import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.Random;

import java.util.ArrayDeque;
import java.util.Queue;

//熱門FREQ
//https://pskreporter.info/cgi-bin/psk-freq.pl

// Spec 
// https://pskreporter.info/pskdev.html

//Any
// https://pskreporter.info/cgi-bin/psk-analysis.pl

// static
// https://pskreporter.info/cgi-bin/pskstats.pl

/*
For senderCallsign, frequency, sNR (1 byte), iMD (1 byte), mode, informationSource (1 byte), senderLocator, flowStartSeconds use:

00 02 00 44 99 93 00 08 
80 01 FF FF 00 00 76 8F  
80 05 00 04 00 00 76 8F 
80 06 00 01 00 00 76 8F 
80 07 00 01 00 00 76 8F 
80 0A FF FF 00 00 76 8F 
80 0B 00 01 00 00 76 8F 
80 03 FF FF 00 00 76 8F  
00 96 00 04 

*/

public class PSKReporter {
	public static String TAG = "PSKReporterService";
	
	private static final String PSK_SERVER_HOSTNAME = "report.pskreporter.info"; // 設置主機名
	private static final int PSK_SERVER_PORT = 4739; // 設置Port
	private static final String CONFIG_FILE = "config.ini"; // 序號記錄檔
	private static final int PSK_TIMER = 5; // Timer 5分鐘

	
	// 定義成員變數來存放初始化值
    private String receiverCallsign; // 接收者呼號
	private String receiverLocator;  // 接收者網格
	private String receiverAntenna;  // 接收者天線
	private String softWareName;  	 // 接收者軟體
	
	
	
	private int    senderMode;
	private static boolean first_time=true; // 為了避免等候太久，第一次會主動pack並發送。
		
	private Timer timer; // 定時器
	private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private boolean isTaskScheduled = false;
	
	private volatile boolean isSending = false; // 是否傳送中
	private volatile boolean isRetrying = false; // 是否重傳中
	
	// 定義Record Format資訊成員變數來存放封包內容(IPFIX格式)
	byte [] psk_header; // 版本表頭
	byte [] psk_recordFormatReceiver; // 接收者格式
	byte [] psk_recordFormatSender;   // 發送者格式
	byte [] psk_recordtReceiver;      // 接收者資料
	
	//public  ByteBuffer packet_header = ByteBuffer.allocate(512);
	public  ByteBuffer packet_collect = ByteBuffer.allocate(512); // 用來收集準備發送的發送者紀錄
	private final Object packet_lock = new Object();
	public int header_length=0; // 紀錄表頭長度(不用每次計算)
	public int pack_max_length=0; // 估算每一筆封包最大長度(計算是否會超過總封包長度)
	
	int sequenceNumber; // 本IP累計序號
	
	Queue<byte[]> byteQueue = new ArrayDeque<>();
	
	// 測試用主程式
    public static void main(String[] args) throws Exception {
		String receiverCallsign = "BU2GF";
		String senderCallsign = "BU2GF";
		int snr = 10;
		double frequency = 14.074; // in MHz
		long epochTime = System.currentTimeMillis() / 1000;
		String mode = "PSK";
		PSKReporter pskReport = new PSKReporter(receiverCallsign,"PL05ra",3,"EFHW","FT8TW v0.925");
		
		
		// 添加报告
		new Thread(() -> {
			try {
				//pskReport.addReport("BU2GF", (int) (14.074 * 1000000.0), System.currentTimeMillis() / 1000, "CW");
				pskReport.addReport("BV6LC", (byte)-17, (byte) 5,(int) (14.072 * 1000000.0), System.currentTimeMillis() / 1000, "CW","PL03hw");
				//String senderCallsign, int snr,int indb, int frequency, long epochTime, String mode,String senderLocator) throws Exception {
		
				pskReport.packReport();
				pskReport.sendReportAsync();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}).start();
		
		
		//pskReport.addReport("BU2BB",5,(int)(21.074*1000000.0),System.currentTimeMillis() / 1000,"CW");
		//pskReport.addReport("BV6LC",5,(int)(7.074*1000000.0),System.currentTimeMillis() / 1000,"CW");
		
		// 非阻塞地發送報告
		//pskReport.packReport();
		//pskReport.sendReportAsync();

		double freq1;
		Random random = new Random();
	boolean run_loop=true;
	while (run_loop) {
			try {
					// 暫停 3 秒 (5000 毫秒)
					Thread.sleep(1000);
					
					System.out.println("Loop");
					for(int i=1;i<=3;i++){
						// 產生一組亂數進行判斷
						//System.out.println("Rnd " + (random.nextInt(100) + 1) );
						if (  random.nextInt(100) + 1 > 60){
							freq1 = 0.01 + (0.20 - 0.01) * random.nextDouble();
							//this.addReport("BU2BB",5,(int)((14.074+freq1) *1000000.0),System.currentTimeMillis() / 1000,"FT8");
							// PL04SX
							
							try {
								//pskReport.addReport("BU2BB", 5, (int)( (7.074+freq1) * 1000000.0), System.currentTimeMillis() / 1000, "CW");
								new Thread(() -> {
									try {
										int randomValue= random.nextInt(100) + 1;
										if (randomValue > 60) {
											//System.out.println("Pack A");
											// PL05RA - 第一組發送
											//pskReport.addReport("BU2BB",  (int) (7.026 * 1000000.0), System.currentTimeMillis() / 1000, "CW");
										} else if (randomValue > 30) {
											// 第二組發送
											//System.out.println("Pack B");
											//pskReport.addReport("BU2GF",  (int) (21.026 * 1000000.0), System.currentTimeMillis() / 1000, "CW");
										} else {
											// 第三組發送 PL05RA
											//System.out.println("Pack C");
											//pskReport.addReport("BV5PF",  (int) (14.026 * 1000000.0), System.currentTimeMillis() / 1000, "CW");
										}
									} catch (Exception e) {
										e.printStackTrace();
									}
								}).start();
								
							} catch (Exception e) {
								e.printStackTrace();  // 或者適當處理異常
							}
						}
					}				

					
					
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
		}	
	}

	//	senderCallsign, receiverCallsign, snr, frequency, epochTime, mode);
	
	// 建構函數1 如果漏給SoftWare Name
	public PSKReporter(String receiverCallsign, String receiverLocator,int senderMode,String antenna)  {
			this(receiverCallsign, receiverLocator, senderMode, "", "BV6LC Library");
	}	
	//建構函數2  初始化 receiverCallsign 、 receiverLocator、antenna、softWareName
	// Sender Mode 0:senderCallsign, frequency, mode, informationSource (1 byte), flowStartSeconds use
	// Sender Mode 3:senderCallsign, frequency, sNR (1 byte), iMD (1 byte), mode, informationSource (1 byte), senderLocator, flowStartSeconds use:
    public PSKReporter(String receiverCallsign, String receiverLocator,int senderMode,String antenna,String softWareName)  {
		
		
		
		this.receiverCallsign = receiverCallsign; 
        this.receiverLocator = receiverLocator;
		this.receiverAntenna=antenna;
		this.senderMode=senderMode;
		this.softWareName=softWareName;
		
		ByteBuffer packet = ByteBuffer.allocate(512);
		byte[] recordFormat;
		int packetLength;
		
		//this.sequenceNumber = loadAndIncrementSequenceNumber();
		this.sequenceNumber = 1;
		
		System.out.println("    #PSKReporter Start ");
		System.out.println("    Receiver:"+receiverCallsign+" LOC:"+receiverLocator);
		
		// 準備 Header ----------------------
		packet.clear();
		packet.put((byte) 0x00); // version
		packet.put((byte) 0x0A); // default version
		packet.putShort((short) 0); // length placeholder (updated later)
		packet.putInt((int) (System.currentTimeMillis() / 1000)); // current timestamp
		packet.putInt(this.sequenceNumber); // sequence number from config
		packet.putInt(new Random().nextInt(Integer.MAX_VALUE)); // random identifier
		
		this.psk_header = new byte[packet.position()];
		packet.flip(); // into Read Mode
		packet.get(this.psk_header);	// 存入Class變數中
		//printHex(this.psk_header);
	
		// 準備 接收者格式描述符 ---------------
		packet.clear();
		
		byte paras;
		if( this.receiverAntenna==""){
			paras=0x03;
		}
		else
		{
			paras=0x04;
		}
		
		packet.put(new byte[] {
			(byte) 0x00, (byte) 0x03,
			(byte) 0x00, (byte) 0xFF,  // 36 字節(00 24)。
			(byte) 0x99, (byte) 0x92,  // 資料為接收者資訊。
			(byte) 0x00, (byte) paras, (byte) 0x00, (byte) 0x01,
			(byte) 0x80, (byte) 0x02, (byte) 0xFF, (byte) 0xFF, (byte) 0x00, (byte) 0x00, (byte) 0x76, (byte) 0x8F,  //接收者呼號。
			(byte) 0x80, (byte) 0x04, (byte) 0xFF, (byte) 0xFF, (byte) 0x00, (byte) 0x00, (byte) 0x76, (byte) 0x8F,  //接收者位置（Locator）
			(byte) 0x80, (byte) 0x08, (byte) 0xFF, (byte) 0xFF, (byte) 0x00, (byte) 0x00, (byte) 0x76, (byte) 0x8F  //解碼軟體。
		});
		
		if( this.receiverAntenna!=""){
			System.out.println("Add Antenna!!!!!!"+this.receiverAntenna);
			packet.put(new byte[] {
			(byte) 0x80, (byte) 0x09, (byte) 0xFF, (byte) 0xFF, (byte) 0x00, (byte) 0x00, (byte) 0x76, (byte) 0x8F  //解碼軟體。
			});
			
		}
		
		packet = paddingFor4(packet); // 補到4位
		
        packetLength = packet.position(); // Update packet length
        packet.putShort(2, (short) packetLength); // 補上接收者格式 Length
		
		
		this.psk_recordFormatReceiver = new byte[packet.position()];
		packet.flip(); // into Read Mode
		packet.get(this.psk_recordFormatReceiver); // 存入Class變數中
		//printHex(this.psk_recordFormatReceiver);
		
		
		// 準備 發送者格式描述符 ---------------
		packet.clear();
		if( this.senderMode==0){
			// CallSign 'BX2AKO/QRP BX2AKP/SOTA' MAX 11
			// Mode CONTESTI MAX 8
			this.pack_max_length= 1+11 +4 +1+8 +1 +4 +4 ; //Padding=4

			packet.put(new byte[] {
				(byte) 0x00, (byte) 0x02,
				(byte) 0x00, (byte) 0xFF,  //0x2C
				(byte) 0x99, (byte) 0x93, 
				(byte) 0x00, (byte) 0x05,
				(byte) 0x80, (byte) 0x01, (byte) 0xFF, (byte) 0xFF, (byte) 0x00, (byte) 0x00, (byte) 0x76, (byte) 0x8F, //發送者呼號
				(byte) 0x80, (byte) 0x05, (byte) 0x00, (byte) 0x04, (byte) 0x00, (byte) 0x00, (byte) 0x76, (byte) 0x8F, //發送頻率（單位：赫茲）。
				(byte) 0x80, (byte) 0x0A, (byte) 0xFF, (byte) 0xFF, (byte) 0x00, (byte) 0x00, (byte) 0x76, (byte) 0x8F, //通訊模式。
				(byte) 0x80, (byte) 0x0B, (byte) 0x00, (byte) 0x01, (byte) 0x00, (byte) 0x00, (byte) 0x76, (byte) 0x8F, //資料來源識別碼。
				(byte) 0x00, (byte) 0x96, (byte) 0x00, (byte) 0x04 // flowStartSeconds
			});
		} else if ( this.senderMode==3){
			// Mode CONTESTI MAX 8   senderCallsign=1+11  frequency=4 sNR =1 iMD =1  mode=1+8 informationSource =1 senderLocator=1+6 flowStartSeconds=4
			this.pack_max_length= 1+11 +4 +1 +1 +1+8 +1 +1+6 +4 ; //Padding=4
			packet.put(new byte[] {
				(byte) 0x00, (byte) 0x02,
				(byte) 0x00, (byte) 0xFF,  //0x2C
				(byte) 0x99, (byte) 0x93, 
				(byte) 0x00, (byte) 0x08, // 8 Items
				(byte) 0x80, (byte) 0x01, (byte) 0xFF, (byte) 0xFF, (byte) 0x00, (byte) 0x00, (byte) 0x76, (byte) 0x8F, //發送者呼號
				(byte) 0x80, (byte) 0x05, (byte) 0x00, (byte) 0x04, (byte) 0x00, (byte) 0x00, (byte) 0x76, (byte) 0x8F, //發送頻率（單位：赫茲）。
				(byte) 0x80, (byte) 0x06, (byte) 0x00, (byte) 0x01, (byte) 0x00, (byte) 0x00, (byte) 0x76, (byte) 0x8F, //sNR (1 byte)
				(byte) 0x80, (byte) 0x07, (byte) 0x00, (byte) 0x01, (byte) 0x00, (byte) 0x00, (byte) 0x76, (byte) 0x8F, //iMD (1 byte)
				(byte) 0x80, (byte) 0x0A, (byte) 0xFF, (byte) 0xFF, (byte) 0x00, (byte) 0x00, (byte) 0x76, (byte) 0x8F, //通訊模式。
				(byte) 0x80, (byte) 0x0B, (byte) 0x00, (byte) 0x01, (byte) 0x00, (byte) 0x00, (byte) 0x76, (byte) 0x8F, //資料來源識別碼。
				(byte) 0x80, (byte) 0x03, (byte) 0xFF, (byte) 0xFF, (byte) 0x00, (byte) 0x00, (byte) 0x76, (byte) 0x8F, //發送者位置
				(byte) 0x00, (byte) 0x96, (byte) 0x00, (byte) 0x04
			});
		} else {
			System.out.println("Unknow Sender Mode!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");	
			
		}
		packet = paddingFor4(packet); // 補到4位
        packetLength = packet.position(); // Update packet length
        packet.putShort(2, (short) packetLength); // 補上接收者格式 Length
		
		this.psk_recordFormatSender = new byte[packet.position()];
		packet.flip(); // into Read Mode
		packet.get(this.psk_recordFormatSender); // 存入Class變數中
		//printHex(this.psk_recordFormatSender);
		
		// 準備 接收者資料 ---------------
		this.setReceiverData(receiverCallsign,receiverLocator,receiverAntenna);
		/*
		packet.clear();
		packet.put((byte) 0x99);
        packet.put((byte) 0x92);
        packet.putShort((short) 0xFF); //長度 32 字節。(00 20)
		byte[] receiverCallsignBytes = receiverCallsign.getBytes(StandardCharsets.UTF_8);
			
        packet.put((byte) receiverCallsignBytes.length); // 變動長度
        packet.put(receiverCallsignBytes);  // 字串

        byte[] locatorBytes = receiverLocator.getBytes(StandardCharsets.UTF_8);
        packet.put((byte) locatorBytes.length); // 變動長度
        packet.put(locatorBytes); // 字串


		byte[] softwareBytes = this.softWareName.getBytes(StandardCharsets.UTF_8);
        //byte[] softwareBytes = "FT8TW v0.925".getBytes(StandardCharsets.UTF_8);
        packet.put((byte) softwareBytes.length); // 變動長度
        packet.put(softwareBytes); // 字串
		
		if( this.receiverAntenna!=""){ // 放入天線資訊
			byte[] AntennaBytes = this.receiverAntenna.getBytes(StandardCharsets.UTF_8);
			packet.put((byte) AntennaBytes.length); // 變動長度
			packet.put(AntennaBytes); // 字串
		}
		
		
		packet = paddingFor4(packet); // 補到4位
        packetLength = packet.position(); // Update packet length
        packet.putShort(2, (short) packetLength);
		
		this.psk_recordtReceiver = new byte[packet.position()];
		packet.flip(); // into Read Mode
		packet.get(this.psk_recordtReceiver); // 存入Class變數中
		System.out.println("    Receiver ---Start-----");
		printHex(this.psk_recordtReceiver);
		System.out.println("    Receiver ---End-----");
		*/
    }
	
	public void setReceiverData(String receiverCallsign, String receiverLocator,String receiverAntenna){
		ByteBuffer packet = ByteBuffer.allocate(512);
		int packetLength;
		
		// 準備 接收者資料 ---------------
		packet.clear();
		packet.put((byte) 0x99);
		packet.put((byte) 0x92);
		packet.putShort((short) 0xFF); //長度 32 字節。(00 20)
		byte[] receiverCallsignBytes = receiverCallsign.getBytes(StandardCharsets.UTF_8);
			
		packet.put((byte) receiverCallsignBytes.length); // 變動長度
		packet.put(receiverCallsignBytes);  // 字串

		byte[] locatorBytes = receiverLocator.getBytes(StandardCharsets.UTF_8);
		packet.put((byte) locatorBytes.length); // 變動長度
		packet.put(locatorBytes); // 字串


		byte[] softwareBytes = this.softWareName.getBytes(StandardCharsets.UTF_8);
		//byte[] softwareBytes = "FT8TW v0.925".getBytes(StandardCharsets.UTF_8);
		packet.put((byte) softwareBytes.length); // 變動長度
		packet.put(softwareBytes); // 字串
		
		if( receiverAntenna!=""){ // 放入天線資訊
			byte[] AntennaBytes = receiverAntenna.getBytes(StandardCharsets.UTF_8);
			packet.put((byte) AntennaBytes.length); // 變動長度
			packet.put(AntennaBytes); // 字串
		}
		
		
		packet = paddingFor4(packet); // 補到4位
		packetLength = packet.position(); // Update packet length
		packet.putShort(2, (short) packetLength);
		
		this.psk_recordtReceiver = new byte[packet.position()];
		packet.flip(); // into Read Mode
		packet.get(this.psk_recordtReceiver); // 存入Class變數中
		System.out.println("    Receiver ---Start-----");
		printHex(this.psk_recordtReceiver);
		System.out.println("    Receiver ---End-----");
	
		
		
		// 計算到現在為止的固定長度	
		this.header_length=this.psk_header.length +
		this.psk_recordFormatReceiver.length +
		this.psk_recordFormatSender.length+
		this.psk_recordtReceiver.length;
	}
	
	
	public void updateReceiverData(String receiverCallsign, String receiverLocator,String receiverAntenna){
		if( !(this.receiverCallsign.equalsIgnoreCase(receiverCallsign) && this.receiverLocator.equalsIgnoreCase(receiverLocator)
			&& this.receiverAntenna.equalsIgnoreCase(receiverAntenna)) ) {
			System.out.println("    !!!!!!!!!!!!!!!!!!!!!!! Data Change !!!!!!!!!!!");
			System.out.println( this.receiverCallsign + "->" + receiverCallsign);
			System.out.println( this.receiverLocator + "->" + receiverLocator);
			System.out.println( this.receiverAntenna + "->" + receiverAntenna);
				
			this.receiverCallsign = receiverCallsign;
			this.receiverLocator = receiverLocator;
			this.receiverAntenna = receiverAntenna;
			this.setReceiverData(this.receiverCallsign,this.receiverLocator ,this.receiverAntenna);
			}
				
		
	}
	
	
	
	public void sendReportAsync() {
		new Thread(() -> {
			try {
				sendReport(); // 在新線程中執行 sendReport
			} catch (Exception e) {
				System.err.println("Error during sendReport A: " + e.getMessage());	
				 e.printStackTrace(); // 打印完整堆疊追蹤
				//synchronized (this) { // 確保線程安全
				//	isSending = false; // 標誌正在發送完成
				//}
				
			}
		}).start();
	}
	
	public void sendReport() throws Exception { 
		byte [] collect_data;
		byte [] send_data;
		int data_length=0;
		ByteBuffer send_packet = ByteBuffer.allocate(512);
		byte [] test_data;
		boolean send_error=false;
		
		//Log.d(TAG,packetToHex(udpPacket));
		Log.d(TAG,"#sendReport ---Start-----");
		System.out.println("#sendReport ---Start-----");
		System.out.println("   Sending Start -- Queue size: " + this.byteQueue.size() );
		if(isSending){
			System.out.println("   Sedning in progress, exit!!");
			System.out.println("#sendReport ---End-----");
			return;
		}
		isSending=true; // 標記為正在發送
		
		// 模擬延遲
		boolean sim_delay=false;
		if (sim_delay){
			System.out.println("      Simulating delay start ...DDDDDDD((((((");
			Thread.sleep(1000*60*1); // 暫停 2 Min	
			System.out.println("      Simulating delay end ...DDDDD)))))");
			//System.out.println("   #######################################" + this.byteQueue.size() );
		}
		while ( (!this.byteQueue.isEmpty() )  ) {
			send_error=false;
            //byte[] data = byteQueue.poll();
			byte[] data = byteQueue.peek();
			
            System.out.println("    Send to PSK ---Start---");
			printHex(data);
			System.out.println("    Send to PSK ---Start--- ");
			System.out.println("#######################" + this.byteQueue.size());
			
			// Send packet
			try (DatagramSocket socket = new DatagramSocket()) {
				InetAddress address = InetAddress.getByName(PSK_SERVER_HOSTNAME);

				DatagramPacket udpPacket = new DatagramPacket(data, data.length, address, this.PSK_SERVER_PORT);
				socket.send(udpPacket);
				
				// 模擬網路中斷
				boolean sim_timeout=false;
				if ((new Random().nextInt(10) < 5) && sim_timeout) { // 30% 比率模擬傳送失败
					System.out.println("Simulated network errorAAAA.!!!!!!!!!!!!!");
					
					
					//synchronized (this) { // 確保線程安全
					//	//isSending = false; // 標誌正在發送
					//	send_error=true;//
					throw new Exception("   Simulated network error BBBBB.!!!!!!!!!");
				}
				
				
			}catch (Exception e) {
				//System.err.println("ERRERRERR");
				
				System.err.println("   Error during report sending: " + e.getMessage());
				

				//synchronized (this) { // 確保線程安全
				send_error=true;
				//isSending = false; // 標誌正在發送
				//isRetrying = true;
				//break;
				//}
				//notifyAll(); // 通知所有等待的線程
				//System.out.println("Skipping this send and will retry in the next scheduled task.");
			}
		
			if (!send_error){
				isRetrying=false;
				byteQueue.poll(); // 發送完成才清除
				System.err.println("   Send Success!!-------------------------------------");
			}
			//else{
			else{
				break;
			}
			//	isRetrying=false;
				
				//synchronized (this) {
			//	byteQueue.poll(); // 發送完成才清除
				//}
				//System.out.println("Sending DONE OOOOO--------------");
			//}
			//System.out.println("   ######---------->>>>");
			//System.out.println("   Que Size:" + this.byteQueue.size() + " Quy St:" + this.byteQueue.isEmpty() + " Retry:"+isRetrying);
			//System.out.println( "   While=" + ((!this.byteQueue.isEmpty()) && (isRetrying==false)) );

			
        }
		
		if(send_error){
			//如果我需要一個依照數字指數上升的公式，隨著傳送失敗的次數，增加重試等待的秒數，秒數從2秒開始，最大不要超過600秒。
			int dealy=Math.min(600, (int) (2 * Math.pow(2, this.byteQueue.size() - 1)));
			System.out.println("   Delay Time="+dealy +" Sec");
			this.resetAndStartTimer(dealy); // 修改：重置啟動定時器5秒後
		}
		else{	
			this.resetAndStartTimer(0); // 修改：重置並啟動定時器
		}
		
		isSending=false;
		
		//System.out.println("Send Report" + this.packet_collect.position() );
		//System.out.println("   Send Finished -- Queue - " + this.byteQueue.size() );
		System.out.println("   Sending End -- Queue size: " + this.byteQueue.size() );
		System.out.println("#sendReport ---End-----");
	
    }
	
	public void startTimer() {
		timer = new Timer();
		scheduleNextTask(0); // 啟動首次的計時器任務
	}
	public void resetAndStartTimer(int delay) {
		if (timer != null) {
			timer.cancel(); // 取消當前計時器
			timer = new Timer(); // 創建新的計時器
		}
		timer = new Timer(); // 確保 timer 被重新初始化

		isTaskScheduled = false; // 重置計時狀態
		scheduleNextTask(delay); // 排定下一個任務
	}

	public void scheduleNextTask(int delay) {
		int baseDelay;
		int randomDelay;
		long nextExecutionTime;
		
		// 設定為固定的延遲 2 分鐘加隨機值
		if(delay!=0){
			baseDelay=delay*1000;
			randomDelay=0;
		}
		else{
			baseDelay = this.PSK_TIMER * 60 * 1000; // 5 分鐘
			randomDelay = ThreadLocalRandom.current().nextInt(0, 10000); // 隨機最多10秒
		}
		nextExecutionTime = System.currentTimeMillis() + baseDelay + randomDelay;
		
		
		if (isTaskScheduled) {
			return; // 已有計時器排定，避免重複排程
		}
		isTaskScheduled = true;

		// 取得並列印當前時間
		String currentTime = dateFormat.format(new Date());
		System.out.println("              Current time: " + currentTime);

		// 預計的下次啟動時間
		String nextRunTime = dateFormat.format(new Date(nextExecutionTime));
		System.out.println("   Next scheduled run time: " + nextRunTime);

		timer.schedule(new TimerTask() {
			@Override
			public void run() {
				try {
					System.out.println("5 Min!!" );
					//PSKReporter.this.sendReport();
					PSKReporter.this.sendReportAsync();
					
					isTaskScheduled = false; // 執行完成後重置標誌
					// 計算距離下次執行的固定間隔
					scheduleNextTask(0);
				} catch (Exception e) {
					System.err.println("Error during scheduled send: " + e.getMessage());
				}
			}
		}, nextExecutionTime - System.currentTimeMillis());
	}
	
	// Mode 0 , senderCallsign ,frequency ,epochTime,mode
	public void addReport(String senderCallsign,  int frequency, long epochTime, String mode) throws Exception {
		addReport(senderCallsign,0,0,frequency,epochTime,mode,"");
	}
	
	public void addReport(String senderCallsign, int snr,int indb, int frequency, long epochTime, String mode,String senderLocator) throws Exception {
		synchronized (packet_lock) {
		//if( (this.header_length + this.packet_collect.position() + this.pack_max_length) >=511 ){
		//	System.out.println("Drop!!!");
		//	return;
		//}
		System.out.println("#addReport ---Start");
		System.out.println("Attempting to add report: "+senderCallsign +" SNR:"+snr +" DB:"+indb+" "+ mode+" "+frequency+" "+epochTime + " "+senderLocator+"+++++++++(((((");
		//System.out.println("Packet_Coll size:" + this.packet_collect.position() +" /"+ this.packet_collect.capacity());
		
		// 如果是第一個封包，補上封包頭
		if ( (this.packet_collect.position())==0) {
			this.packet_collect.put((byte) 0x99);
			this.packet_collect.put((byte) 0x93);
			this.packet_collect.putShort((short) 0x2C);
		}
        
		if(this.senderMode==0){
			System.out.println("   Sender mode=0");
			byte[] senderCallsignBytes = senderCallsign.getBytes(StandardCharsets.UTF_8);
				
			this.packet_collect.put((byte) senderCallsignBytes.length);
			this.packet_collect.put(senderCallsignBytes);
				
			this.packet_collect.putInt( frequency); // frequency in Hz
				
			byte[] modeBytes = mode.getBytes(StandardCharsets.UTF_8);
			this.packet_collect.put((byte) modeBytes.length);
			this.packet_collect.put(modeBytes);
					
			this.packet_collect.put((byte) 0x01); // Information source
				
			this.packet_collect.putInt((int) epochTime); // UNIX time
		}
		else if(this.senderMode==3){
			System.out.println("   Sender mode=3");
			byte[] senderCallsignBytes = senderCallsign.getBytes(StandardCharsets.UTF_8);
				
			this.packet_collect.put((byte) senderCallsignBytes.length);
			this.packet_collect.put(senderCallsignBytes);
			
			this.packet_collect.putInt( frequency); // frequency in Hz
			
			//----SNR
			if(snr >= -128 && snr <= 127) {
				this.packet_collect.put((byte) snr); // sNR
			}
			else{
				this.packet_collect.put((byte) 0); // sNR
			}
			//----SNDB
			if(indb >= -128 && indb <= 127) {
				this.packet_collect.put((byte) indb); // sNR
			}
			else{
				this.packet_collect.put((byte) 0); // sNR
			}
			//this.packet_collect.put((byte) indb); // iMD 
			
			byte[] modeBytes = mode.getBytes(StandardCharsets.UTF_8);
			this.packet_collect.put((byte) modeBytes.length);
			this.packet_collect.put(modeBytes);
			
			this.packet_collect.put((byte) 0x01); // Information source
			
			byte[] senderLocatorBytes = senderLocator.getBytes(StandardCharsets.UTF_8);
			this.packet_collect.put((byte) senderLocatorBytes.length);
			this.packet_collect.put(senderLocatorBytes);
			
			this.packet_collect.putInt((int) epochTime); // UNIX time
		}
		else {
			System.out.println("  UnKnow Send Mode!!!!!");
			throw new Exception("   UnKnow Send Mode!!!!!");
		}
		System.out.println("  Packet_Coll size:" + this.packet_collect.position() +" /"+ this.packet_collect.capacity() + " Remain:" + this.packet_collect.remaining());
		
        

		
		if( (this.header_length + this.packet_collect.position() + this.pack_max_length) >=511){
			System.out.println("Package Full!! Hader L "+ this.header_length + " collect L "+ this.packet_collect.position() + " "+ (this.header_length + this.packet_collect.position()) + " "+ (this.header_length + this.packet_collect.position()+ this.pack_max_length) );
			
			packReport();
		
			// 同步僅鎖住操作 Queue 的部分
			//synchronized (this.byteQueue) {
			//sendReportAsync();
			//}
		}
		System.out.println("  Packet  Len:" + this.packet_collect.position() + " Que Size:"+ this.byteQueue.size());
		System.out.println("#addReport ---End");
		}
	}
	public boolean firstTime(){
		if(first_time){
			System.out.println("  !!! First Time !!!! packReport!!!!" );
			first_time=false;
			packReport();
			return true;
		}
		else{
			return false;
		}
		
	}
	
	public void setFirstTime(){

		first_time=true;
	}
	
	public void packReport(){
		synchronized (packet_lock) {
			
		ByteBuffer byteBuffer512 = ByteBuffer.allocate(512); // 組裝用
		byte [] byteData512;
		
		byte [] byteDataCollect;
		 
		
		 
		int data_length=0;
		
		System.out.println("#packReport---Start----");
		
		// 放入表頭資料
		byteBuffer512.put(this.psk_header);
		byteBuffer512.put(this.psk_recordFormatReceiver);
		byteBuffer512.put(this.psk_recordFormatSender);
		// 補入接收站台資訊
		byteBuffer512.put(this.psk_recordtReceiver);
			

			
			
		// 放入內容資料(接收到的發送資訊pack_collect)
		this.packet_collect = paddingFor4(this.packet_collect); // 補到4位
		data_length =this.packet_collect.position();
		this.packet_collect.putShort(2, (short) data_length);
		byteDataCollect = new byte[data_length];
		
		this.packet_collect.flip();
		this.packet_collect.get(byteDataCollect);
		
		System.out.println("   ---Collect----");
		printHex(byteDataCollect);
		System.out.println("   ---Collect----");
		
		byteBuffer512.put(byteDataCollect);
		this.packet_collect.clear();
		
		//System.out.println("-Data Length--- "+this.packet_data.position() );
		data_length =byteBuffer512.position();
		byteBuffer512.putShort(2, (short) data_length); // 更新總資料長度
		byteBuffer512.putInt(4,(int) (System.currentTimeMillis() / 1000)); // 更新總資料封包時間
		byteBuffer512.putInt(8,(int) (this.sequenceNumber) ); // 更新總資料封包序號
		byteBuffer512.flip();
		
		byteData512 = new byte[data_length];
		//byteCollect512= new byte[data_length];
		
		//this.packet_collect.mark(); // 標記當前狀態
		byteBuffer512.get(byteData512);
		System.out.println("   = Pack============");
		printHex(byteData512);
		System.out.println("   == Pack===========");
		
		this.byteQueue.offer(byteData512);
		this.sequenceNumber++;
		
		System.out.println("   Queue:" + this.byteQueue.size() );
		byteBuffer512.clear();
		
		System.out.println("#packReport---End----");
		}
		
		sendReportAsync();
	}
	

    
    // Load sequence number from ini file, increment it, and save it back
    private static int loadAndIncrementSequenceNumber() {
        Properties config = new Properties();
        File configFile = new File(CONFIG_FILE);
        int sequenceNumber = 7; // Default start value

        // Load the current sequence number from file
        try (FileInputStream input = new FileInputStream(configFile)) {
            config.load(input);
            sequenceNumber = Integer.parseInt(config.getProperty("sequenceNumber", "7"));
        } catch (IOException e) {
            System.out.println("Config file not found, starting sequence number at 7.");
        }

        // Increment the sequence number
        sequenceNumber++;

        // Save the incremented sequence number back to the config file
        config.setProperty("sequenceNumber", Integer.toString(sequenceNumber));
        try (FileOutputStream output = new FileOutputStream(configFile)) {
            config.store(output, "PSK Reporter Configuration");
        } catch (IOException e) {
            System.out.println("Failed to save sequence number to config file.");
            e.printStackTrace();
        }

        return sequenceNumber;
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
	
	public static void printHex(byte[] data) {
		StringBuilder hexString = new StringBuilder();
		StringBuilder asciiString = new StringBuilder();
		
		int cnt;
		cnt=0;

		for (byte b : data) {
			cnt++;

			// 將每個字節轉換成兩位十六進制，並以空格分隔
			hexString.append(String.format("%02X ", b));

			// 構造 ASCII 字符串，非可顯示字符以 '.' 表示
			char asciiChar = (b >= 32 && b <= 126) ? (char) b : '.';
			asciiString.append(asciiChar);

			// 每 10 個 Byte 加換行，並附上 ASCII 字符
			if (cnt % 10 == 0) {
				hexString.append(" ").append(asciiString).append("\n");
				asciiString.setLength(0); // 清空 ASCII 緩衝區
			}
		}
		// 處理最後不滿 10 個字節的情況
		if (asciiString.length() > 0) {
			// 填充不足 10 個字節的空白
			int padding = 10 - asciiString.length();
			for (int i = 0; i < padding; i++) {
				hexString.append("   "); // 每個 Byte 3 個空格
			}
			hexString.append(" ").append(asciiString).append("\n");
		}
		
    System.out.println(hexString.toString().trim());
	}
	

	private ByteBuffer paddingFor4(ByteBuffer buffer) {
		// 計算當前 position()
        int currentPos = buffer.position();
		// 計算需要填充的字節數
        int paddingBytes = (4 - (currentPos % 4)) % 4;
		// 將 0x00 填充到 ByteBuffer 中，直到 position() 為 4 的倍數
        for (int i = 0; i < paddingBytes; i++) {
            buffer.put((byte) 0x00);
        }
        return buffer;
    }		
			
	
}