from pathlib import Path
root = Path(r'C:\Users\ASUS\Documents\Codex\2026-06-22\ta\outputs-speaking-topic-bank')
patterns = ['Ă','Ä','áº','á»','Â','â€','â†','đŸ','ðŸ','Tá»','NgĂ','Viá','cĂ¢u','ngĂ y','Ä‘']
for name in ['index.html','script.js','style.css']:
    text = (root/name).read_text(encoding='utf-8', errors='replace')
    print('\n', name)
    for p in patterns:
        c = text.count(p)
        if c:
            print(p, c)
