import os
import shutil
import re

src_dir = r"C:\Users\anura\.gemini\antigravity\scratch\infinyty-tech-deck-and-website"
downloads_dir = r"C:\Users\anura\Downloads"

os.makedirs(downloads_dir, exist_ok=True)

# 1. Read deck.html
deck_path = os.path.join(src_dir, "deck.html")
with open(deck_path, "r", encoding="utf-8") as f:
    content = f.read()

# Make sure href="/demos/..." is relative "demos/..." so opening file directly works
adjusted_content = content.replace('href="/demos/', 'href="demos/')

# 2. Save HTML files to Downloads
dest_deck = os.path.join(downloads_dir, "deck.html")
dest_infinyty = os.path.join(downloads_dir, "Infinyty_Deck.html")
dest_full = os.path.join(downloads_dir, "Infinyty_Company_Deck.html")

with open(dest_deck, "w", encoding="utf-8") as f:
    f.write(adjusted_content)

with open(dest_infinyty, "w", encoding="utf-8") as f:
    f.write(adjusted_content)

with open(dest_full, "w", encoding="utf-8") as f:
    f.write(adjusted_content)

print(f"Saved HTML files to {downloads_dir}")

# 3. Copy assets directory so images, logos, videos load perfectly
src_assets = os.path.join(src_dir, "assets")
dest_assets = os.path.join(downloads_dir, "assets")
if os.path.exists(src_assets):
    shutil.copytree(src_assets, dest_assets, dirs_exist_ok=True)
    print(f"Copied assets to {dest_assets}")

# 4. Copy demos directory so interactive prototypes work offline
src_demos = os.path.join(src_dir, "demos")
dest_demos = os.path.join(downloads_dir, "demos")
if os.path.exists(src_demos):
    shutil.copytree(src_demos, dest_demos, dirs_exist_ok=True)
    print(f"Copied demos to {dest_demos}")

print("Export completed successfully.")
