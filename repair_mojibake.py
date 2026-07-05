from pathlib import Path
root = Path(r'C:\Users\ASUS\Documents\Codex\2026-06-22\ta\outputs-speaking-topic-bank')
markers = ['Ã','Â','â€','â€“','â€”','â†','âœ','â','ðŸ','đŸ','Ä','Ă','áº','á»','Æ','ª','«','»']

def maybe_fix(s: str) -> str:
    # Sửa các đoạn UTF-8 bị đọc nhầm Windows-1252/Latin-1, giữ nguyên đoạn Unicode đúng.
    out = []
    i = 0
    n = len(s)
    while i < n:
        hit = any(s.startswith(m, i) for m in markers)
        if not hit:
            out.append(s[i])
            i += 1
            continue
        j = i
        while j < n and (ord(s[j]) >= 128 or s[j] in "'’\"`.,;:!?()[]{}<>/\\-–—+*=_%#@&| \t"):
            if s[j] == '\n':
                break
            j += 1
        chunk = s[i:j]
        fixed = None
        for enc in ('cp1252', 'latin1'):
            try:
                candidate = chunk.encode(enc).decode('utf-8')
                # Chỉ nhận nếu giảm rõ rệt dấu hiệu mojibake.
                bad_before = sum(chunk.count(m) for m in markers)
                bad_after = sum(candidate.count(m) for m in markers)
                if bad_after < bad_before:
                    fixed = candidate
                    break
            except Exception:
                pass
        out.append(fixed if fixed is not None else chunk)
        i = j
    return ''.join(out)

for name in ['index.html','script.js','style.css']:
    p = root / name
    text = p.read_text(encoding='utf-8', errors='replace')
    repaired = maybe_fix(text)
    p.write_text(repaired, encoding='utf-8', newline='')
    print(name, 'changed', text != repaired)
