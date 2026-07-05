from pathlib import Path
p=Path(r'C:\Users\ASUS\Documents\Codex\2026-06-22\ta\outputs-speaking-topic-bank\script.js')
text=p.read_text(encoding='utf-8')
for needle in ['đŸ','Ă','Ä','á»','â€']:
    i=text.find(needle)
    print('needle',needle.encode('unicode_escape').decode(),'idx',i)
    if i>=0:
        s=text[max(0,i-35):i+90]
        print(s.encode('unicode_escape').decode())
