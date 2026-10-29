# UTX — JS8 Unicode Text eXtension Specification v1

**Status**: Implemented (FT8TW)
**Author**: BV6LC
**Date**: 2026-07-17 (last revised 2026-10-29)
**License / Rationale**: This specification is published openly; any software may
implement it for interoperability. Amateur radio regulations require that
transmissions not use codes or ciphers intended to obscure their meaning. UTX is
an openly documented compression encoding (comparable to JS8Call's own JSC
dictionary compression) and is published here in the interest of full
transparency.

(繁體中文版本請見 [UTX_SPEC.zh-TW.md](UTX_SPEC.zh-TW.md) / A Traditional Chinese
version of this document is available at UTX_SPEC.zh-TW.md.)

## 1. Motivation

JS8Call's text channel only supports an uppercase-ASCII subset (a 45-symbol
huffman table plus the JSC English word dictionary). UTX allows a JS8 data
frame to carry full Unicode text (Chinese/Japanese/Korean, Cyrillic, Arabic,
Devanagari, emoji, and more), while optimizing the bit cost per character for
commonly used characters.

## 2. Transport Layer (modulation and FEC are unchanged)

UTX does not change JS8's modulation, LDPC(174,87) coding, or 72-bit frame
structure — it only redefines **the bit content carried inside the data
frame**. The UTX bit stream is sliced into chunks and placed into data frames:

| Mode | Frame shape | Payload per frame |
|---|---|---|
| Normal | `[1][0]` + payload + padding | ≤ 69 bits |
| Fast/Turbo/Slow | full 72-bit payload + padding (itype=TYPE_DATA) | ≤ 71 bits |

The padding convention matches legacy JS8: a single `0` bit is appended after
the payload, followed by all `1`s; the receiver recovers the exact bit length
via `lastIndexOf('0')`. **A token may straddle a frame boundary**: the receiver
must concatenate the data-frame bit streams of the same message in order
before decoding (decoding is incremental/streamable).

Normal mode reuses the `[1][0]` (uncompressed-huffman) header, so an
unmodified/legacy JS8Call client that receives a UTX message will decode it via
huffman into harmless garbage characters (it will not crash). FT8TW
distinguishes a UTX message by the magic bit pattern at the start of the
message.

## 3. Bit Stream Structure

```
[MAGIC 24 bits = 0xAB56A3 (101010110101011010100011)]
[Initial mode 2 bits: 00=A, 01=H, 10=W (followed by a window descriptor), 11=reserved]
[token stream ...]
```

The magic bit pattern was deliberately chosen so that a legacy huffman decoder
reads it as the literal characters `""X` (two double-quote characters followed
by `X`) — a sequence that real legacy traffic is essentially never going to
start with. (Design note: an earlier 16-bit candidate, `0xB61C`, was rejected
because it happened to collide bit-for-bit with the huffman encoding of the
common letter sequence "UEAE," which would have caused false positives; the
magic was lengthened to 24 bits and a rarer bit pattern was chosen instead.)

## 4. The Three Encoding Modes

The encoder greedily switches modes based on character content; a mode switch
is only "paid for" when ≥2 consecutive characters belong to the new mode — a
single off-mode character is instead emitted as a literal. Exception: a
character of the Mode A set always switches back to Mode A (the switch is
cheap, and uppercase letters, digits and callsigns usually come in runs).
Spaces neither break nor count toward a run; every mode has its own space
token. The initial mode is the mode of the first non-space character.

### Mode A — Uppercase ASCII (reuses the JS8Call huffman table)

- The 45 symbols reuse the exact huffman code words from JS8Call's
  `varicode.cpp` (space = 2 bits, E = 3 bits, etc.), so English text,
  callsigns, and Q-codes cost exactly the same as stock JS8Call.
- Exception: the code word for `"` (`1010101`, 7 bits) is repurposed as an
  **ESC** (escape):

| ESC + op (3 bits) | Meaning |
|---|---|
| `000` | switch to Mode H |
| `001` | switch to Mode W (followed by a window descriptor) |
| `010` | literal (followed by a 21-bit code point; mode unchanged) |
| `011` | the literal character `"` itself |
| other | reserved (decoder stops) |

### Mode H — Layered Character Table (CJK scripts)

Character table `assets/utx_rank_table.txt` (§6); a character's rank
determines its token length:

| Token | Rank range | Total length | Contents |
|---|---|---|---|
| `0` + 12 bits | 0–4095 | 13 bits | Common characters: CJK punctuation, kana, zhuyin/bopomofo, frequency-ranked Han characters (a traditional/simplified variant pair shares one rank) |
| `10` + 14 bits | 4096–20479 | 16 bits | KS X 1001 Hangul syllables, common emoji, less-common Han characters, JIS-only kanji |
| `110` + 16 bits | 20480–86015 | 19 bits | Rare characters: remaining CJK ideographs, CJK Extension-A, remaining Hangul syllables, halfwidth katakana |
| `111` + op (3 bits) | — | 6 bits | Control: `000`=switch to A, `001`=switch to W (+window), `010`=literal (+21 bits), `011`=space, other reserved |

### Mode W — Unicode Sliding Window (alphabetic scripts)

A 128-character-aligned sliding window (an SCSU-like concept), suited to
Cyrillic, Greek, Arabic, Thai, Devanagari, lowercase Latin, and other
alphabetic scripts:

| Token | Total length | Meaning |
|---|---|---|
| `0` + 7 bits | 8 bits | Character inside the current window (base + offset) |
| `11` | 2 bits | space |
| `10` + op (3 bits) | 5 bits | Control: `000`=switch to A, `001`=change window (+window descriptor), `010`=literal (+21 bits), `011`=switch to H, other reserved |

**Window descriptor**: `0`+5 bits = an index into 32 predefined windows (see
`Js8Utx.PREDEF_WINDOWS` in the source: ASCII; Latin-1/extended; Greek;
Cyrillic; Hebrew; Arabic; nine Indic scripts; Thai; Lao; Tibetan; Burmese;
Georgian; Armenian; Vietnamese Latin extensions; general punctuation; two kana
windows; emoji); `1`+14 bits = a custom base (`code point >> 7`), reaching all
17 Unicode planes. A custom base can point past U+10FFFF; a decoder that
computes a code point above U+10FFFF must output U+FFFD and stop (random bits,
e.g. a noise-decoded JTTY frame, do produce this).

### Literal (fallback)

The literal op in any mode is followed by a raw 21-bit code point (0 –
0x10FFFF) — any Unicode character can be sent this way, at a cost of 24–27
bits. A literal above 0x10FFFF or in the surrogate range (0xD800–0xDFFF) is
invalid: the decoder outputs U+FFFD and stops. The same applies to an empty
or out-of-range Mode H rank and to any reserved op.

## 5. Integration with the Existing Protocol

- **Opt-in**: UTX is sent only when the user has turned on the "enhanced
  encoding" setting (off by default). With it off, the free-text field always
  goes through the legacy path (uppercased), bit-for-bit compatible with
  JS8Call. Receiving UTX does not depend on the setting.
- **Trigger condition** (setting on): the free-text field is sent as UTX if
  any character, after uppercasing, lies outside Latin-1 (U+0000–U+00FF);
  or uppercasing a character other than ASCII `a`–`z` changes it (e.g. `é`,
  which legacy cannot restore); or the field mixes ASCII uppercase and
  lowercase letters (e.g. `Hello`). Everything else — including all-uppercase
  or all-lowercase text, and Latin-1 punctuation that legacy carries through
  the JSC dictionary — goes through the legacy path. The test is not "outside
  the huffman table": legacy also carries punctuation such as `,` via JSC.
- **Structured frames are unchanged**: heartbeat/CQ, compound, and directed
  frames are unaffected; a command such as "`CALLSIGN MSG 中文內容`" still
  uses a legacy directed-frame command prefix — only the free-text field
  itself is UTX.
- **Case sensitivity**: a UTX message preserves the original text's case
  (legacy is uppercase-only).
- **Checksum**: for buffered commands (`MSG`, `MSG TO:`, `>`, etc.), the
  `checksum16` (CRC-16/KERMIT + 3 base-41 characters) is computed over the
  message's **UTF-8 bytes** instead of ISO-8859-1 — this produces the same
  result as stock JS8Call for ASCII content, while giving Unicode content a
  real byte-level checksum instead of a degenerate one. The checksum is
  computed over exactly the text the receiver will decode (original case for
  UTX), and the trailing space + 3 checksum characters are appended to that
  text and encoded inside the same UTX bit stream.
- **Lost frames**: degrades the same way as legacy — losing a frame partway
  through a message makes the remaining content undecodable (UTX output stops
  at the point of loss; a message with a checksum will fail verification and
  is flagged with ✗).

## 6. Character Table (utx_rank_table.txt)

- Format: UTF-8 without BOM, one code point per line; the line number
  (0-indexed) is the rank; a blank line is an empty slot.
- Generation: `tools/gen_utx_table.py` (reproducible). Han character tiers are
  derived from Jun Da's Modern Chinese Character Frequency List, cross-mapped
  through OpenCC's simplified/traditional correspondence table (a
  traditional/simplified variant pair shares one rank, with the traditional
  form listed first); characters outside the frequency list fall back to
  membership in the Big5 common-use block / GB2312 level 1 / JIS X 0208 level
  1 / KS X 1001.
- **Version compatibility**: once published, the tier boundaries (4096/20480)
  and the ranks already assigned to characters are **frozen**. Future
  revisions may only append into empty slots or at the table's tail — existing
  entries must never be reordered, or old and new decoders will produce
  different (wrong) characters for the same bit stream.

## 7. Efficiency Reference (Normal mode, 15-second frame)

| Content | bits/char | chars/frame (steady state) |
|---|---|---|
| Common Chinese (tier 1) | 13 | ~5.3 |
| Hangul/emoji/less-common (tier 2) | 16 | ~4.3 |
| Cyrillic-class alphabetic scripts (window) | ~8 (space = 2) | ~8.5 |
| Uppercase English (Mode A) | ~4.7 | same as legacy |
| Reference: raw UTF-8 Chinese | 24 | ~2.9 |

Message header: 24-bit magic + 2-bit initial mode = 26 bits for Mode A/H;
Mode W adds a window descriptor, 32 bits with a predefined window or 41 bits
with a custom base. It is paid once per message, in the first frame.

## 8. Transmission Time Comparison Example

Sending a **20-character free-text message** in Normal mode (15-second frame,
69 bits per frame), including the UTX message header and excluding any
directed-frame prefix:

| Content | bits | frames needed | approx. time |
|---|---|---|---|
| English (legacy, Mode A cost) | ~94 | 2 | 30 s |
| Common Chinese (UTX tier 1) | 26 + 20×13 = 286 | 5 | 75 s |
| Hangul/less-common (UTX tier 2) | 26 + 20×16 = 346 | 6 | 90 s |
| Cyrillic-class scripts (UTX window) | 32 + 20×8 = 192 | 3 | 45 s |
| Reference: same Chinese text as raw UTF-8 (no UTX) | 20×24 = 480 | 7 | 105 s |

For the same 20 Chinese characters, UTX (tier 1) takes about 75 seconds —
roughly **1.4× faster** than the 105 seconds raw UTF-8 would need; the gap
widens for longer messages as the header is amortized. English content
transmits at exactly the same speed as legacy JS8, unaffected by UTX. The
Fast/Turbo/Slow submodes use different frame lengths (10/6/30 s) and carry 71
bits per frame, so they may need slightly fewer frames than shown.

## 9. JTTY Transport

A JTTY frame (the send-anytime text mode of WSJT-X 3.2) lasts 1.888 s and
carries a 34-bit payload = a 32-bit content word (MSB first) + a reserved bit
+ EOM. UTX is carried over JTTY as follows.

Implementation status (2026-10-29):

| Section | FT8TW web app | FT8TW Android app |
|---|---|---|
| §9.1–§9.8 (UTX, callsign words, sender frame, auto-split) | send + receive | send + receive |
| §9.9 check frames | send + receive/repair | not sent; received check frames are discarded (like WSJT-X) |

### 9.1 Marker: reserved bit = 1

Frames with the reserved bit set to 1 carry FT8TW extensions, and the whole
32-bit content word is available. WSJT-X 3.2 discards every frame whose
reserved bit is not 0, so WSJT-X users **never see garbage**. Bit 31 of the
content word is called `S`:

| Frame | S (bit 31) | bits 30–28 | bits 27–0 (or 30–0) |
|---|---|---|---|
| First UTX frame | `1` | `001` (UTX v1) | 28 bits of bit stream |
| Following UTX frame | `0` | — | 31 bits of bit stream (bits 30–0) |
| Sender frame (§9.7) | `1` | `010` | call28 |
| Check frame (§9.9) | `1` | `011` | column, index, n, symbol |
| Reserved | `1` | `000`, `100`–`111` | discarded by the receiver |

### 9.2 Bit stream

The bit stream is the UTX bit stream of §3 **without the 24-bit MAGIC**,
starting at the 2-bit initial mode (the reserved bit plus `S` and the type
already identify it, and MAGIC alone would cost a whole JTTY frame). The
receiver prepends MAGIC and decodes per §3 and §4. A first frame whose initial
mode is `11` (reserved) is discarded.

### 9.3 Padding

- Padding is added only at the end of the whole bit stream (in the last
  frame): one `0`, then `1`s up to the end of the frame. Frames in between
  carry data only. The last frame has EOM set.
- When the bit stream exactly fills n frames, there is no room for the `0`, so
  one more frame of `S=0` + `0` + thirty `1`s is sent (for example `你好` =
  2 + 13×2 = 28 bits exactly fills the first frame, giving 2 UTX frames).
- The receiver strips padding with `lastIndexOf('0')` only when the EOM frame
  arrives (stripping earlier would eat a trailing `0` of the data).

### 9.4 Leading callsign words

Consecutive tokens at the start of the message that can be packed as JTTY
callsign words (`<call>`, `CQ <call> CQ`, `TU <call> CQ`, `<call> TU`,
`<call> AGN?`, `TU NOW <call>`, standard callsigns) are sent as ordinary JTTY
frames (reserved bit 0, **EOM not set**); everything from the first token that
is not a callsign word is sent as UTX. A callsign word carries an implied
trailing space, so the UTX part has no leading space; callsigns are always sent
in uppercase.

- Example: `W9XYZ 你好` → callsign word `W9XYZ` + UTX `你好`; `HELLO 你好` →
  all UTX.
- WSJT-X decodes only the leading callsign word (no EOM; it ends as incomplete
  after 3 periods), so WSJT-X users can still see who is calling whom.
- **Trigger**: in the spirit of §5, UTX is opt-in (an "enhanced encoding"
  setting, off by default). With it on, UTX is used only when the part after
  the leading callsigns contains characters outside JTTY TEXT5 (64 characters)
  or mixes upper and lower case; otherwise the whole message is sent as plain
  JTTY, interoperable with WSJT-X. With it off, a message containing
  characters outside TEXT5 is refused (FT8TW suggests turning the setting on).
  Macros never use UTX.

### 9.5 Length

At most 16 data frames per transmission (including leading callsign frames and
the sender frame; check frames after EOM are extra, §9.9). With UTX only and no sender frame the bit-stream capacity is
28 + 15×31 − 1 = 492 bits, about 37 common Han characters or 60 Cyrillic
letters.

A longer message typed by the user is split automatically into several
messages of ≤ 16 frames each (preferably after a space or full-width
punctuation, else between two Han characters, else a hard cut). Each part is
planned on its own (sender frame, leading callsign words, UTX, check frames)
and has its own EOM, so on air it is simply an independent message; parts are
not numbered on air. Between parts the transmitter releases PTT for a
configurable rest of 1–16 frames (default 4). Macros are never split.

### 9.6 Reception and safeguards

- Only a frame with `S=1` and type `001` may start a UTX segment: a new
  message, or following the sender frame / callsign-word frames of the same
  message.
- A frame with `S=0` is accepted only by a message that matches in time and
  frequency (JTTY multi-frame rule: n = 1–3 periods after the previous frame
  ±100 ms, frequency within 10 + 3(n−1) Hz) and whose UTX segment is in
  progress; otherwise it is discarded (if the first frame is missed, nothing
  of that message is shown — no garbage).
- A missing frame in the middle (gap of more than one period) makes the bit
  stream impossible to align → stop and mark incomplete; decoding U+FFFD or a
  reserved control code → stop. On EOM the message is complete only if the
  UTX segment is complete.
- While a UTX segment is in progress, reserved-bit-0 frames on the same
  frequency are not appended to it.
- Measured: 0 false decodes in 60 minutes of white noise with the default
  gates (same as before the extension).

### 9.7 Sender frame

JTTY has no sender field. Between FT8TW stations, extension type `010`
announces the sender:

- Content word = `S=1` + `010` + call28 (28 bits, the pack28 value of a
  standard callsign), reserved bit 1, EOM 0 (a sender frame with EOM 1, or
  whose call28 is not a standard callsign, is discarded).
- It is the **first frame of every transmission**, followed by the callsign
  word / TEXT5 / UTX frames.
- It is not sent when the message already names the sender (`CQ <me> CQ`, or
  contains `DE <me>`), or when the sender's callsign is not a standard
  callsign; users may turn it off (on by default). It is omitted when an
  ordinary message already needs 16 frames.
- The receiver takes it as authoritative (over inference from the content); a
  sender frame with no content is not displayed.
- Costs 1.888 s per transmission; WSJT-X discards reserved-bit-1 frames and is
  not affected.

### 9.8 Efficiency reference (1.888 s per frame)

| Content | chars/frame (steady state) | chars/second |
|---|---|---|
| Common Chinese (13 bits) | ~2.4 | ~1.3 |
| Cyrillic-class (~8 bits) | ~3.9 | ~2.0 |
| Reference: JTTY TEXT5 (alphanumeric) | 5 | 2.6 |

### 9.9 Error-correction (check) frames

JTTY is one-way: there is no acknowledgement or retransmission, and one
missed frame breaks a message (`...`). Between FT8TW stations a message is
followed by a few **check frames** from which the receiver recomputes missed
frames, without any reply.

- **When**: on messages with **3 or more data frames, not counting the sender
  frame** (every part of an automatically split message is handled on its
  own). Setting: Off / **Standard (default)**: 2 check frames, recovers any 1
  missed frame / Strong: 4 check frames, recovers any 2.
- **Where**: right after the EOM frame of the same transmission (phase
  continuous, 1.888 s apart). Check frames do **not** count toward the
  16-frame limit, so a transmission is at most 16 + 4 = 20 frames (37.8 s).
- **Code**: GF(2^16) with primitive polynomial x^16 + x^12 + x^3 + x + 1
  (`0x1100B`), α = 2. Each data frame's 32-bit content word is split into a
  high and a low 16-bit symbol (two columns). For each column, with data
  symbols d_0 … d_{n−1}, check symbol j is

  p_j = Σ d_i · α^(j·i)  (j = 0, 1; p_0 is plain XOR)

  This parity-check (Vandermonde) form of Reed–Solomon makes p_j independent
  of the level: the 2 Standard check frames are exactly the first 2 of the 4
  Strong ones. For r ≤ 2 the code is MDS: a column can be recovered when the
  number of check symbols received for it is at least the number of missing
  data symbols, in any positions (erasure decoding by Gaussian elimination);
  spare check symbols are used to verify.
- **Content word**: `S=1` + type `011` + column (1 bit, 0 = high 16 bits) +
  check index j (3 bits) + number of data frames n (5 bits, **including the
  sender frame**, 3–17) + reserved (3 bits, 0) + the 16-bit symbol; reserved
  bit 1, EOM 0. Order: (j0, col 0), (j0, col 1), (j1, col 0), (j1, col 1).
  Receivers discard check frames with EOM 1, non-zero reserved bits, n outside
  3–17, or j ≥ 4.
- **Position**: data frames occupy slots 0 … n−1; a check frame is at slot
  n + 2j + column. Any one check frame therefore gives the start time of slot 0
  (±100 ms), even if the first data frame was missed.
- **Reserved bit and EOM are not transmitted** for recovered frames; they
  follow from the position: EOM only at slot n−1; the reserved-bit pattern is
  [sender frame (1)]? + reserved-0 frames (only leading callsign words if the
  message has UTX) + the UTX segment (reserved 1, `S=1`/`001` then `S=0`).
  When a missing frame sits at a boundary, the receiver tries every
  structurally possible reading, keeps those where every frame passes the
  content-word grammar, the UTX bit stream decodes completely and actually
  needs UTX, and the whole message reassembles completely — and **repairs
  only if exactly one reading remains**.
- **Safeguards**: check frames are grouped by n, frequency (±10 Hz) and slot-0
  time (±100 ms); a group is used only if at least one data frame matches, no
  frame other than slot n−1 has EOM, slot n holds no data frame, the message
  does not continue in the 3 slots before slot 0, and no slot holds two different words. An
  isolated check frame is discarded. Measured: 0 false decodes in 60 minutes
  of white noise with the default gates.
- **Display**: the repaired message replaces the incomplete one in place and is
  marked "repaired n". More missing frames than the check frames can recover
  are still shown as `...`.
- **WSJT-X**: check frames have reserved bit 1 and come after EOM, so WSJT-X
  discards them; data frames and EOM are unchanged and no `...` appears. Only
  the transmit time grows (Standard +3.8 s, Strong +7.6 s).
