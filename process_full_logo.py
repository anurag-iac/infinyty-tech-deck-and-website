from PIL import Image
import os

src = r'C:\Users\anura\Downloads\Infinyty\Logo\infinyty_logo_darktext_transparent_2x.png'
assets_dir = r'C:\Users\anura\.gemini\antigravity\scratch\infinyty-tech-deck-and-website\assets'

im = Image.open(src)

# 1. Full Light Mode Logo (tight bounding box)
bbox = im.getbbox()
im_full = im.crop(bbox)
im_full.save(os.path.join(assets_dir, 'infinyty-logo-full-light.png'), format='PNG')
im_full.save(os.path.join(assets_dir, 'infinyty-logo-full.png'), format='PNG')
print('Saved full light logo:', im_full.size)

# 2. Full Dark Mode Logo
# Keep the infinity sign as-is, make 'infinyty' wordmark white (preserving cyan dots and gold wing), and make 'DATA • AI • PRODUCT DEVELOPMENT' bright gold/white
def make_full_dark_logo(img):
    out = Image.new('RGBA', img.size)
    pixels = img.load()
    out_pixels = out.load()
    
    # We know the split line in cropped image
    # Let's inspect where the text starts
    for x in range(img.width):
        for y in range(img.height):
            pr, pg, pb, pa = pixels[x, y]
            if pa == 0:
                out_pixels[x, y] = (0, 0, 0, 0)
                continue
            
            # If in top half (infinity symbol) -> preserve colors
            # If in bottom half (text) -> transform dark navy to white
            is_blue_accent = (pb > 150 and pb > pr * 1.4 and pg > 40)
            is_gold_accent = (pr > 170 and pg > 110 and pb < 110)
            
            if is_blue_accent or is_gold_accent:
                # Keep bright accent colors
                out_pixels[x, y] = (pr, pg, pb, pa)
            elif pr < 60 and pg < 60 and pb < 100 and pa > 10:
                # Dark navy text -> convert to crisp white
                out_pixels[x, y] = (255, 255, 255, pa)
            else:
                out_pixels[x, y] = (pr, pg, pb, pa)
    return out

dark_full = make_full_dark_logo(im_full)
dark_full.save(os.path.join(assets_dir, 'infinyty-logo-full-dark.png'), format='PNG')
print('Saved full dark logo.')
