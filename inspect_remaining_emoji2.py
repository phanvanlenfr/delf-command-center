from pathlib import Path
p=Path(r'C:\Users\ASUS\Documents\Codex\2026-06-22\ta\outputs-speaking-topic-bank\script.js')
text=p.read_text(encoding='utf-8')
idx=text.find('đŸ')
print('idx',idx)
for k in range(5):
 i=text.find('đŸ', idx if k==0 else i+1)
 if i<0: break
 s=text[i:i+6]
 print(i, s.encode('unicode_escape').decode(), [hex(ord(c)) for c in s])
 try:
  print('decode4', s[:4].encode('cp1258').decode('utf-8').encode('unicode_escape').decode())
 except Exception as e: print('err',e)
