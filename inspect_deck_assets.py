import re
import os
import shutil

with open('deck.html', 'r', encoding='utf-8') as f:
    content = f.read()

srcs = re.findall(r'(?:src|href)=["\']([^"\']+)["\']', content)
print('Total referenced paths in deck.html:', len(srcs))
local_assets = [s for s in set(srcs) if not s.startswith(('http', '#', 'mailto:', 'tel:'))]
for a in sorted(local_assets):
    exists = os.path.exists(a)
    print(f'Local asset: {a} (exists: {exists})')
