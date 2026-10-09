#!/usr/bin/env python3
"""Neue Version setzen – überall gleichzeitig (App, index.html, Service Worker).
Aufruf: python3 tools/bump.py            → nächste Nummer für heute
        python3 tools/bump.py 2026.10.07.05"""
import re, sys, datetime, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
app, idx, sw = root / 'app.js', root / 'index.html', root / 'sw.js'
cur = re.search(r"const VERSION = '([^']+)'", app.read_text()).group(1)
if len(sys.argv) > 1: new = sys.argv[1]
else:
    today = datetime.date.today().strftime('%Y.%m.%d')
    n = int(cur.rsplit('.', 1)[1]) + 1 if cur.startswith(today) else 1
    new = f'{today}.{n:02d}'
a = app.read_text().replace(f"const VERSION = '{cur}'", f"const VERSION = '{new}'"); app.write_text(a)
i = re.sub(r'(app\.(?:js|css)\?v=)[0-9.]+', r'\g<1>' + new, idx.read_text()); idx.write_text(i)
s = sw.read_text()
s = re.sub(r"const AV = '[^']+'", f"const AV = '{new}'", s)
s = re.sub(r"const V = 'v(\d+)'", lambda m: f"const V = 'v{int(m.group(1)) + 1}'", s)
sw.write_text(s)
print(cur, '→', new)
