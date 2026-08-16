from PIL import Image, ImageEnhance
import os

src = r'C:\Users\anura\Downloads\Infinyty\Logo\infinyty_logo_darktext_transparent_2x.png'
assets_dir = r'C:\Users\anura\.gemini\antigravity\scratch\infinyty-tech-deck-and-website\assets'

im = Image.open(src)
width, height = im.size

# 1. Crop the 'infinyty' wordmark (y: 1060 to 1600)
wordmark_raw = im.crop((0, 1060, width, 1600))
wordmark_bbox = wordmark_raw.getbbox()
wordmark = wordmark_raw.crop(wordmark_bbox)
wordmark.save(os.path.join(assets_dir, 'infinyty-wordmark.png'), format='PNG')
print('Wordmark size:', wordmark.size)

# 2. Create white/light version for dark mode
# Convert dark text to white, but preserve blue squares and gold 'y' wing
def make_dark_mode_wordmark(img):
    r, g, b, a = img.split()
    pixels = img.load()
    out = Image.new('RGBA', img.size)
    out_pixels = out.load()
    for x in range(img.width):
        for y in range(img.height):
            pr, pg, pb, pa = pixels[x, y]
            if pa == 0:
                out_pixels[x, y] = (0, 0, 0, 0)
                continue
            # Check if this pixel is blue (dots) or yellow (wing on y)
            # Blue: high blue, lower red
            is_blue = (pb > 150 and pb > pr * 1.5 and pg > 50)
            # Gold/yellow: high red, high green, low blue
            is_gold = (pr > 180 and pg > 120 and pb < 100)
            
            if is_blue or is_gold:
                # Keep original color
                out_pixels[x, y] = (pr, pg, pb, pa)
            else:
                # Turn dark navy text into crisp white (#FFFFFF)
                # Alpha weighting
                out_pixels[x, y] = (255, 255, 255, pa)
    return out

wordmark_dark = make_dark_mode_wordmark(wordmark)
wordmark_dark.save(os.path.join(assets_dir, 'infinyty-wordmark-dark.png'), format='PNG')
print('Saved dark mode wordmark.')

# 3. Create Horizontal Lockup: [Infinity Icon] + [infinyty Wordmark]
# Crop infinity icon
infinity_raw = im.crop((0, 0, width, 1060))
infinity_bbox = infinity_raw.getbbox()
infinity_icon = infinity_raw.crop(infinity_bbox)

def make_horizontal_lockup(icon, wm, is_dark=False):
    # Scale icon so its height is 1.1x the height of wordmark
    target_h = int(wm.height * 1.05)
    scale = target_h / icon.height
    new_icon_w = int(icon.width * scale)
    new_icon_h = target_h
    icon_resized = icon.resize((new_icon_w, new_icon_h), Image.Resampling.LANCZOS)
    
    gap = int(wm.height * 0.38) # balanced gap
    total_w = new_icon_w + gap + wm.width
    total_h = max(new_icon_h, wm.height)
    
    lockup = Image.new('RGBA', (total_w, total_h), (0, 0, 0, 0))
    # Align icon vertically center
    icon_y = (total_h - new_icon_h) // 2
    # Align wordmark vertically center
    wm_y = (total_h - wm.height) // 2
    
    lockup.paste(icon_resized, (0, icon_y), icon_resized)
    lockup.paste(wm, (new_icon_w + gap, wm_y), wm)
    return lockup

lockup_light = make_horizontal_lockup(infinity_icon, wordmark, is_dark=False)
lockup_light.save(os.path.join(assets_dir, 'infinyty-lockup-light.png'), format='PNG')
lockup_light.save(os.path.join(assets_dir, 'infinyty-logo-horizontal.png'), format='PNG')

lockup_dark = make_horizontal_lockup(infinity_icon, wordmark_dark, is_dark=True)
lockup_dark.save(os.path.join(assets_dir, 'infinyty-lockup-dark.png'), format='PNG')
print('Saved horizontal lockups:', lockup_light.size)
