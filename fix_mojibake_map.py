from pathlib import Path
root = Path(r'C:\Users\ASUS\Documents\Codex\2026-06-22\ta\outputs-speaking-topic-bank')
files = ['index.html','script.js','style.css']

# Tập ký tự cần khôi phục: tiếng Việt, tiếng Pháp, dấu câu, mũi tên, emoji thường dùng trong app.
target_chars = []
for start, end in [
    (0x00A0, 0x024F),   # Latin accents + extended
    (0x1E00, 0x1EFF),   # Vietnamese precomposed
    (0x2010, 0x2044),   # quotes, dash, bullets
    (0x2190, 0x21FF),   # arrows
    (0x25A0, 0x27BF),   # symbols
    (0x1F300, 0x1FAFF), # emoji
    (0xFE0F, 0xFE0F),   # variation selector
]:
    target_chars.extend(chr(i) for i in range(start, end + 1))
# Thêm vài ký tự an toàn hay gặp.
target_chars.extend(list('ĐđĂăÂâÊêÔôƠơƯưÀÁẢÃẠẦẤẨẪẬẰẮẲẴẶÈÉẺẼẸỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌỒỐỔỖỘỜỚỞỠỢÙÚỦŨỤỪỨỬỮỰỲÝỶỸỴÇçŒœÉéÈèÀàÙùÎîÏïÜüÛûÔô«»'))

mapping = {}
for ch in set(target_chars):
    for enc in ('cp1258','cp1252','latin1'):
        try:
            bad = ch.encode('utf-8').decode(enc)
        except Exception:
            continue
        if bad != ch and len(bad) >= 2:
            mapping[bad] = ch

# Một số chuỗi cp1252/cp1258 hay sinh ra với control char hoặc khoảng trắng lạ.
manual = {
    'Â ': ' ', 'Â·': '·', 'Â«': '«', 'Â»': '»', 'Â°': '°', 'Â–': '–', 'Â—': '—',
    'â€™': '’', 'â€œ': '“', 'â€': '”', 'â€˜': '‘', 'â€“': '–', 'â€”': '—', 'â€¦': '…', 'â†’': '→', 'â†': '←',
    'Ä': 'Đ', 'Ä‘': 'đ', 'Äƒ': 'ă', 'Ä‚': 'Ă', 'Æ°': 'ư', 'Æ¯': 'Ư', 'Æ¡': 'ơ', 'Æ ': 'Ơ',
    'Ă¡': 'á', 'Ă ': 'à', 'Ă ': 'à', 'Ă¢': 'â', 'Ă©': 'é', 'Ă¨': 'è', 'Ăª': 'ê', 'Ă­': 'í', 'Ă³': 'ó', 'Ă´': 'ô', 'Ăº': 'ú', 'Ă¹': 'ù', 'Ă§': 'ç',
    'á»«': 'ừ', 'á»±': 'ự', 'á»¯': 'ữ', 'á»©': 'ứ', 'á»­': 'ử', 'á»§': 'ủ', 'á»©': 'ứ', 'á»›': 'ớ', 'á»': 'ờ', 'á»Ÿ': 'ở', 'á»£': 'ợ',
    'á»‹': 'ị', 'á»‰': 'ỉ', 'á»‡': 'ệ', 'á»ƒ': 'ể', 'á»': 'ề', 'áº¿': 'ế', 'á»…': 'ễ',
    'á»': 'ọ', 'á»': 'ỏ', 'á»“': 'ồ', 'á»‘': 'ố', 'á»•': 'ổ', 'á»—': 'ỗ', 'á»™': 'ộ',
    'áº¡': 'ạ', 'áº£': 'ả', 'áº¥': 'ấ', 'áº§': 'ầ', 'áº©': 'ẩ', 'áº«': 'ẫ', 'áº­': 'ậ',
    'áº¯': 'ắ', 'áº±': 'ằ', 'áº³': 'ẳ', 'áºµ': 'ẵ', 'áº·': 'ặ', 'áº¹': 'ẹ', 'áº»': 'ẻ', 'áº½': 'ẽ',
    'á»³': 'ỳ', 'á»·': 'ỷ', 'á»¹': 'ỹ', 'á»µ': 'ỵ', 'Ã©': 'é', 'Ã¨': 'è', 'Ãª': 'ê', 'Ã ': 'à', 'Ã ': 'à', 'Ã´': 'ô', 'Ã§': 'ç', 'Ã®': 'î', 'Ã¯': 'ï', 'Ã¼': 'ü', 'Å“': 'œ',
}
mapping.update(manual)

# Replace chuỗi dài trước để tránh chồng chéo.
items = sorted(mapping.items(), key=lambda kv: len(kv[0]), reverse=True)
for name in files:
    p = root / name
    text = p.read_text(encoding='utf-8', errors='replace')
    old = None
    passes = 0
    while old != text and passes < 4:
        old = text
        for bad, good in items:
            text = text.replace(bad, good)
        passes += 1
    p.write_text(text, encoding='utf-8', newline='')
    print(name, 'passes', passes)
