import re
from pathlib import Path
root=Path(r'C:\Users\ASUS\Documents\Codex\2026-06-22\ta\outputs-speaking-topic-bank')

def char_byte(ch):
    try:
        b=ch.encode('cp1258')
        if len(b)==1:
            return b[0]
    except Exception:
        pass
    o=ord(ch)
    if 0 <= o <= 255:
        return o
    # cp1258/cp1252 printable punctuation bytes commonly seen in mojibake
    punct={0x201A:0x82,0x0192:0x83,0x201E:0x84,0x2026:0x85,0x2020:0x86,0x2021:0x87,0x02C6:0x88,0x2030:0x89,0x0160:0x8A,0x2039:0x8B,0x0152:0x8C,0x017D:0x8E,0x2018:0x91,0x2019:0x92,0x201C:0x93,0x201D:0x94,0x2022:0x95,0x2013:0x96,0x2014:0x97,0x02DC:0x98,0x2122:0x99,0x0161:0x9A,0x203A:0x9B,0x0153:0x9C,0x017E:0x9E,0x0178:0x9F}
    if o in punct:
        return punct[o]
    raise ValueError(hex(o))

def decode_mojibake_seq(s):
    try:
        raw=bytes(char_byte(ch) for ch in s)
        return raw.decode('utf-8')
    except Exception:
        return s

for name in ['index.html','script.js','style.css']:
    p=root/name
    text=p.read_text(encoding='utf-8',errors='replace')
    # fix all emoji sequences: F0 9F xx xx decoded as đŸ + two chars
    text=re.sub('đŸ..', lambda m: decode_mojibake_seq(m.group(0)), text)
    # fix remaining THỨ NĂM placeholder in static HTML
    text=text.replace('THỨ NĂM','THỨ NĂM')
    p.write_text(text,encoding='utf-8',newline='')
    print(name)
