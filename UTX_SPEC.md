# UTX — JS8 Unicode Text eXtension Specification v1

**Status**: Implemented (FT8TW)
**Author**: BV6LC
**Date**: 2026-07-17
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
single off-mode character is instead emitted as a literal.

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
17 Unicode planes.

### Literal (fallback)

The literal op in any mode is followed by a raw 21-bit code point (0 –
0x10FFFF) — any Unicode character can be sent this way, at a cost of 24–27
bits.

## 5. Integration with the Existing Protocol

- **Trigger condition**: UTX is used only when a message's free-text field
  contains a character outside the legacy huffman character set; a pure-ASCII
  message goes entirely through the legacy path and is bit-for-bit compatible
  with JS8Call.
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
  real byte-level checksum instead of a degenerate one.
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

Message header (magic + mode) costs 18–33 bits, amortized over the first frame
of the message.
