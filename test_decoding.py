examples=["đŸ“—", "ÄĂ£ hoĂ n thĂ nh", "Tá»«", "Ngữ phĂ¡p", "cĂ³ nghĩa lĂ  gĂ¬?", "PhĂ¡p → Việt", "đŸ‰"]
for e in examples:
    print('ex', e.encode('unicode_escape').decode())
    for enc in ['cp1258','cp1252','latin1']:
        try:
            f=e.encode(enc).decode('utf-8')
            print(enc, '->', f, f.encode('unicode_escape').decode())
        except Exception as err:
            print(enc, 'err', type(err).__name__, str(err)[:40])
