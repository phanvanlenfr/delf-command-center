import re
from pathlib import Path
root=Path(r'C:\Users\ASUS\Documents\Codex\2026-06-22\ta\outputs-speaking-topic-bank')
for name in ['index.html','script.js','style.css']:
    p=root/name
    text=p.read_text(encoding='utf-8', errors='replace')
    text=text.replace('THỨ NĂM','THỨ NĂM')
    # fix cp1258-decoded emoji sequences: đŸ + two following codepoints
    def repl(m):
        s=m.group(0)
        try:
            return s.encode('cp1258').decode('utf-8')
        except Exception:
            return s
    text=re.sub('đŸ..', repl, text)
    p.write_text(text, encoding='utf-8', newline='')
    print(name, 'done')
