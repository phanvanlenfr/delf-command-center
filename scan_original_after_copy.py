from pathlib import Path
root=Path(r'C:\Users\ASUS\Documents\Codex\2026-06-21\h-y-t-o-cho-t-2\outputs')
patterns=['Ă','Ä','áº','á»','Â','â€','â†','đŸ','ðŸ','Tá»','NgĂ','Viá','cĂ¢u','ngĂ','Ä‘','Æ']
for name in ['index.html','script.js','style.css']:
    text=(root/name).read_text(encoding='utf-8',errors='replace')
    bad=[]
    for p in patterns:
        c=text.count(p)
        if c: bad.append((p,c))
    print(name, bad if bad else 'OK')
