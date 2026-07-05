from pathlib import Path
root=Path(r'C:\Users\ASUS\Documents\Codex\2026-06-22\ta\outputs-speaking-topic-bank')
patterns=['Ă','Ä','áº','á»','Â','â€','â†','đŸ','ðŸ','Tá»','NgĂ','Viá','cĂ¢u','ngĂ','Ä‘','Æ']
for name in ['index.html','script.js','style.css']:
    text=(root/name).read_text(encoding='utf-8',errors='replace')
    print('\n'+name)
    anyc=False
    for p in patterns:
        c=text.count(p)
        if c:
            print(p.encode('unicode_escape').decode(), c)
            anyc=True
    if not anyc: print('OK no common mojibake markers')
