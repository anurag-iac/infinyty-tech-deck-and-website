from PIL import Image
import os

src = r'C:\Users\anura\Downloads\Infinyty\Logo\infinyty_logo_darktext_transparent_2x.png'
assets_dir = r'C:\Users\anura\.gemini\antigravity\scratch\infinyty-tech-deck-and-website\assets'

im = Image.open(src)
width, height = im.size

# 1. Full logo cropped to tight bounding box
full_bbox = im.getbbox()
im_full_cropped = im.crop(full_bbox)
im_full_cropped.save(os.path.join(assets_dir, 'infinyty-logo.png'), format='PNG')
im_full_cropped.save(os.path.join(assets_dir, 'logo.png'), format='PNG')
print('Saved full logo:', im_full_cropped.size)

# 2. Infinity symbol crop (y: 0 to 1060)
im_infinity_raw = im.crop((0, 0, width, 1060))
infinity_bbox = im_infinity_raw.getbbox()
im_infinity = im_infinity_raw.crop(infinity_bbox)
im_infinity.save(os.path.join(assets_dir, 'infinyty-icon.png'), format='PNG')
print('Saved infinity icon:', im_infinity.size)

# 3. Square Favicon 512x512, 192x192, 180x180, 64x64, 32x32, 16x16
# Calculate aspect ratio to fit inside square with 10% padding
def create_square_icon(image, size, padding_ratio=0.1):
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    target_w = int(size * (1 - 2 * padding_ratio))
    target_h = int(size * (1 - 2 * padding_ratio))
    
    img_ratio = image.width / image.height
    target_ratio = target_w / target_h
    
    if img_ratio > target_ratio:
        new_w = target_w
        new_h = int(new_w / img_ratio)
    else:
        new_h = target_h
        new_w = int(new_h * img_ratio)
        
    resized = image.resize((new_w, new_h), Image.Resampling.LANCZOS)
    offset_x = (size - new_w) // 2
    offset_y = (size - new_h) // 2
    canvas.paste(resized, (offset_x, offset_y), resized)
    return canvas

fav512 = create_square_icon(im_infinity, 512, 0.08)
fav512.save(os.path.join(assets_dir, 'favicon.png'), format='PNG')
fav512.save(os.path.join(assets_dir, 'favicon-512.png'), format='PNG')

fav192 = create_square_icon(im_infinity, 192, 0.08)
fav192.save(os.path.join(assets_dir, 'favicon-192.png'), format='PNG')

fav180 = create_square_icon(im_infinity, 180, 0.08)
fav180.save(os.path.join(assets_dir, 'apple-touch-icon.png'), format='PNG')

fav32 = create_square_icon(im_infinity, 32, 0.08)
fav32.save(os.path.join(assets_dir, 'favicon-32.png'), format='PNG')

# Favicon .ico
fav512.save(os.path.join(assets_dir, 'favicon.ico'), format='ICO', sizes=[(16,16), (32,32), (48,48), (64,64), (128,128), (256,256)])
print('Saved all favicon formats.')
