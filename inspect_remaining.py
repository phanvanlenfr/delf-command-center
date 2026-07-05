from pathlib import Path
for name in ['index.html','script.js']:
    p=Path(r'C:\Users\ASUS\Documents\Codex\2026-06-22\ta\outputs-speaking-topic-bank')/name
    text=p.read_text(encoding='utf-8')
    print('\n',name)
    for needle in ['Ă','đŸ']:
        start=0
        for k in range(10):
            i=text.find(needle,start)
            if i<0: break
            s=text[max(0,i-45):i+80]
            print(needle.encode('unicode_escape').decode(), i, s.encode('unicode_escape').decode())
            start=i+1
