# FT8TW

Thanks to BG7YOZ and N0BOY for creating such an interesting and convenient program. It has significantly reduced the amount of equipment and cables I need for SOTA operations on the mountains. Now, aside from the essential radio, battery, and antenna, I no longer need to bring a computer and a tangle of cables. This reduction in weight makes hiking easier, and when setting up a SOTA station, it saves many steps.

In adverse weather conditions like rain and wind, this setup allows me to quickly pack everything and stow it in my backpack, minimizing body heat loss and the risk of equipment getting damp. I’m truly grateful to both of you.

My intention is to use the original FT8CN version as much as possible. This FT8TW version is mainly my personal proof-of-concept space. If any ideas prove successful, I will share them with BG7YOZ. After all, I have no intention of overshadowing the original creators. For the official, full FT8CN version, please refer to https://github.com/N0BOY/FT8CN.

You can download the FT8TW version here: https://github.com/danleetw/FT8TW/releases/tag

The related video is as follows.
https://youtube.com/playlist?list=PLrXZ1U6SCKfWUOqkH-DzE-QTa2SLTmeJF&si=BzadtC9ZSHVXszhy

感謝BG7YOZ跟N0BOY
寫出了一個如此有趣又方便的程式，大幅減少了我在山上做SOTA的設備數量，以及纜線的數量，
因為除了不可少的無線電機、電池、天線以外，可以少帶電腦以及一堆雜亂的線材，在爬山的過程減少了許多重量，在開始架設SOTA電台時，也節省了很多步驟，
反之，在遇到下雨刮風等天候不佳的情況時，能盡可能地用最快速度把裝備整理好，丟回登山背包中，也可以避免體溫流失太多以及裝備受潮的風險，
讓我再次感謝二位。

我的立場是儘可能使用原來的FT8CN版本，這個地方的FT8TW版本，則是一些我的概念驗證區域，如果驗證可行，我還是會提交我的資訊給BG7YOZ。
畢竟我沒有想要喧賓奪主喔，如果需要正式的、完整的FT8CN版本，可以參考 https://github.com/N0BOY/FT8CN 。

FT8TW版本則由下方下載
https://github.com/danleetw/FT8TW/releases/tag 

De BV6LC
感謝以下OM協助參



2025/5/11 FT8TW 0.93
2025/5/11 修正如果通聯記錄有自己的呼號，會造成每次呼叫時因為呼號中有自己的呼號，都會畫上底號的困擾。
Fixed underline issue where calls containing the user's own callsign were always underlined due to its presence in the QSO log.

2025/5/11 因為QMX 1.02版本新增讀取SWR命令，增加SWR顯示。
Fixed an issue where if the QSO log contained the user's own callsign, any subsequent decoded calls containing the user's callsign would always be underlined.
Added SWR display support due to the addition of the SWR read command in QMX firmware version 1.02.

2025/5/24 FT8TW 0.93
1.新增發送到PskReporter時，也會發送無線電設備資訊。同時，因為配合PskReport設備資訊排序，把電台清單重新排序，並加上廠牌資訊
(When sending to PskReporter, radio equipment information is now also included. Additionally, to align with PskReport's equipment sorting, the station list has been reordered and brand information has been added.)
https://pskreporter.info/cgi-bin/pskstats.pl
2.修正開啟apk套件檔案時，會詢問是否用FT8TW開啟問題。
2. Fixed the issue where opening an APK package would prompt to use FT8TW to open it.
3.設定PskReport回報為預設值。
3. Set PskReport reporting to its default value.
4.如果有興趣查看程式執行問題的，可以先開啟手機除錯模式，用adb logcat --pid=$(adb shell pidof com.bg7yoz.ft8tw) 
4. If you're interested in checking runtime issues, you can enable USB debugging on your phone and use:adb logcat --pid=$(adb shell pidof com.bg7yoz.ft8tw)
5.新增可以透過FT8TW幫QMX校正時間，可以不用再多買GPS模組，也不用辛苦的手動校正時間了。
5.Added the ability to calibrate the QMX time through FT8TW, so there's no need to buy an extra GPS module or go through the hassle of manually setting the time anymore

2025/6/2 FT8TW 0.93d(32) version 32
1.修改記憶體洩漏問題
2.修改無法發設問題(記憶體洩漏問題修復造成)
3.列出USB裝置時，由代號改成有意義的資訊)
4.點選Cable時，可以選取電台(如果存在)
5.修正退出藍芽模式的奇怪訊息(如果目前不是藍芽模式，則不顯示)
6.修正錯誤紀錄不完整
7.把設定畫面比較少用到的SWR/ALC警告選項移到最下面，這樣頻率選項可以排在前面(沒辦法，我有學工作研究)
8.修正同步時間算錯
9.嘗試修改Timer問題造成OOM
10.修補記憶體洩露第一步

1.Fixed memory leak issue.
2.Fixed transmission failure caused by memory leak fix.
3.USB device list now shows meaningful information instead of device codes.
4.When selecting Cable, allows selecting available radio devices.
5.Fixed incorrect message when exiting Bluetooth mode (message is hidden if not in Bluetooth mode).
6.Fixed incomplete error log records.
7.Moved rarely used SWR/ALC alert option to the bottom of settings, allowing frequency options to appear earlier (just a bit of work-study logic here).
8.Fixed time synchronization calculation error.
9.Attempted to fix OOM issue caused by Timer problem.
10.Fix OOM Step-1



1.Fixed cable disconnection issue caused by screen rotation.
2.Modified QMX time synchronization to use the phone's timezone.

0.93d35

<zh-TW>
2025/6/7 FT8TW 0.93d(42) 
1.修改選轉螢幕造成Cable斷線問題
2.修改QMX時間同步為手機時區時間
3.修改MinSdk從23降為21，增加可以支援的手機。
4.移除執行緒重複，造成QSL跟很多畫面重複的問題。
5.調整設定畫面
</zh-TW>
<en-US> 
2025/6/7 FT8TW 0.93d(42) 
1.Fixed cable disconnection issue caused by screen rotation.
2.Modified QMX time synchronization to use the phone's timezone.
3.Lowered minSdk from 23 to 21 to support more devices.
4.Removed duplicated threads that were causing duplicate QSL entries and repeated screen displays.
5.Config GUI Adj
</en-US>