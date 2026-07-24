# UTX — JS8 Unicode Text eXtension 規格 v1

**狀態**：已實作（FT8TW）
**作者**：BV6LC
**日期**：2026-07-17
**授權**：本規格公開，任何軟體皆可實作互通。業餘無線電規範要求傳輸不得使用
隱匿內容的密碼；UTX 是公開文件化的壓縮編碼（如同 JS8Call 的 JSC 字典壓縮），
符合公開透明原則。

(English version available at [UTX_SPEC.md](UTX_SPEC.md) / 英文版本請見 UTX_SPEC.md。)

## 1. 動機

JS8Call 的文字通道僅支援大寫 ASCII 子集（huffman 表 45 字元 + JSC 英文詞典）。
UTX 讓 JS8 data frame 承載全 Unicode 文字（中日韓、西里爾、阿拉伯、天城文、
emoji……），並針對常用字元最佳化每字位元成本。

## 2. 承載層（不變動調變與 FEC）

UTX 不改變 JS8 的調變、LDPC(174,87) 與 72-bit frame 結構，只重新定義
**資料 frame 的位元內容**。UTX 位元流切塊放入資料 frame：

| 模式 | frame 形式 | 每 frame 承載 |
|---|---|---|
| Normal | `[1][0]` + payload + padding | ≤ 69 bits |
| Fast/Turbo/Slow | 全 72 bits payload + padding（itype=TYPE_DATA） | ≤ 71 bits |

padding 慣例與 legacy 相同：payload 後補一個 `0`，其餘補 `1`；
接收端以 `lastIndexOf('0')` 還原精確位元。**token 可跨 frame 邊界**：
接收端須把同一則訊息的資料 frame 位元流依序串接後解碼（可增量）。

Normal 模式沿用 `[1][0]`（huffman 未壓縮）標頭，原版 JS8Call 收到 UTX 訊息
會以 huffman 解出無害的亂碼字元（不會當機）；FT8TW 以訊息開頭的魔術碼區分。

## 3. 位元流結構

```
[MAGIC 24 bits = 0xAB56A3 (101010110101011010100011)]
[初始模式 2 bits：00=A、01=H、10=W（後接視窗描述）、11=保留]
[token 串 ...]
```

魔術碼位元刻意選成 legacy huffman 解讀為「""X」（兩個引號接 X）——真實
legacy 訊息幾乎不可能以此開頭。（設計註記：早期 16-bit 方案 0xB61C 與常見
字序「UEAE」的 huffman 位元完全相同，會誤判，故加長並改選罕見樣式。）

## 4. 三種編碼模式

編碼器依字元內容貪婪切換模式；連續 ≥2 個同類字元才付模式切換成本，
單一異類字元用 literal。

### Mode A — 大寫 ASCII（沿用 JS8Call huffman 表）

- 45 個字元沿用 JS8Call `varicode.cpp` 的 huffman 碼字（空白 2 bits、E 3 bits …），
  英文、呼號、Q 簡語與 legacy 成本完全相同。
- 例外：`"`（碼字 `1010101`，7 bits）挪作 **ESC**：

| ESC + op (3 bits) | 意義 |
|---|---|
| `000` | 切到 Mode H |
| `001` | 切到 Mode W（後接視窗描述） |
| `010` | literal（後接 21-bit code point，模式不變） |
| `011` | 字元 `"` 本身 |
| 其他 | 保留（解碼端停止） |

### Mode H — 分層字表（東亞文字）

字表 `assets/utx_rank_table.txt`（§6），rank 決定 token 長度：

| token | rank 範圍 | 總長 | 內容 |
|---|---|---|---|
| `0` + 12 bits | 0–4095 | 13 bits | 常用字：CJK 標點、假名、注音、字頻表高頻漢字（繁簡變體同名次） |
| `10` + 14 bits | 4096–20479 | 16 bits | KS X 1001 諺文、常見 emoji、次常用漢字、JIS 專用字 |
| `110` + 16 bits | 20480–86015 | 19 bits | 罕字（其餘 CJK、Ext-A、其餘諺文、半形片假名） |
| `111` + op (3 bits) | — | 6 bits | 控制：`000`=切A、`001`=切W(+視窗)、`010`=literal(+21)、`011`=空白、其他保留 |

### Mode W — Unicode 視窗（拼音文字）

128 字元對齊的視窗（SCSU 概念），適用西里爾、希臘、阿拉伯、泰文、
天城文、小寫拉丁等：

| token | 總長 | 意義 |
|---|---|---|
| `0` + 7 bits | 8 bits | 視窗內字元（base + offset） |
| `11` | 2 bits | 空白 |
| `10` + op (3 bits) | 5 bits | 控制：`000`=切A、`001`=換視窗(+視窗描述)、`010`=literal(+21)、`011`=切H、其他保留 |

**視窗描述**：`0`+5 bits = 預定義視窗索引（32 個，見原始碼
`Js8Utx.PREDEF_WINDOWS`：ASCII、Latin-1/擴充、希臘、西里爾、希伯來、阿拉伯、
印度系九種、泰、寮、藏、緬、喬治亞、亞美尼亞、越南文擴充、一般標點、
假名兩窗、emoji 表情）；`1`+14 bits = 自訂 base（code point >> 7），
涵蓋全部 17 個平面。

### Literal（兜底）

各模式的 literal op 後接 21-bit 裸 code point（0–0x10FFFF），
任何 Unicode 字元皆可傳，成本 24–27 bits。

## 5. 與既有協定的整合

- **觸發條件**：訊息的自由文字段含 legacy 字元集（huffman 表）外的字元才用
  UTX；純 ASCII 訊息完全走 legacy 路徑，與 JS8Call 位元級相容。
- **結構 frame 不變**：heartbeat/CQ、compound、directed frame 照舊；
  「`呼號 MSG 中文內容`」的指令前綴仍是 legacy directed frame，
  只有自由文字段是 UTX。
- **大小寫**：UTX 訊息保留原文大小寫（legacy 只有大寫）。
- **checksum**：緩衝指令（MSG、MSG TO:、> 等）的資料段 checksum16
  （CRC-16/KERMIT + base-41 三碼）改以 **UTF-8 位元組**計算——ASCII 內容
  結果與 JS8Call（ISO-8859-1）相同，Unicode 內容才有真實的位元組級校驗。
- **遺失 frame**：與 legacy 相同的劣化行為——遺失中段 frame 會使其後內容
  無法解碼（UTX 從遺失點起輸出中斷；有 checksum 的訊息會驗證失敗加註 ✗）。

## 6. 字表（utx_rank_table.txt）

- 格式：UTF-8 無 BOM，一行一個 code point，行號（0 起算）= rank，
  空行 = 空槽。
- 產製：`tools/gen_utx_table.py`（可重現）。漢字分層依 Jun Da《現代漢語
  字頻表》＋ OpenCC 簡繁對照（繁簡變體共享名次，繁體在前）；
  字頻表外退回 Big5 常用區 / GB2312 一級 / JIS X 0208 第一水準 /
  KS X 1001 的成員資格。
- **版本相容**：tier 邊界（4096/20480）與既收錄字元的 rank 一經發布即凍結；
  未來只能在空槽與表尾追加，不得移動既有字元，否則新舊版本互解會錯字。

## 7. 效率參考（Normal 模式，每 frame 15 秒）

| 內容 | bits/字 | 字/frame（穩態） |
|---|---|---|
| 常用中文（tier1） | 13 | ~5.3 |
| 諺文/emoji/次常用（tier2） | 16 | ~4.3 |
| 西里爾等拼音文字（視窗） | ~8（空白 2） | ~8.5 |
| 大寫英文（Mode A） | ~4.7 | 同 legacy |
| 對照：裸 UTF-8 中文 | 24 | ~2.9 |

訊息頭（magic+模式）18–33 bits，攤在第一個 frame。
