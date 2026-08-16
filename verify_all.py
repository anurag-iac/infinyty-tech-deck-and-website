import asyncio
from playwright.async_api import async_playwright

async def screenshot_all():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={'width': 1440, 'height': 900})
        page = await context.new_page()
        
        await page.goto("http://localhost:3000/deck#1", wait_until="networkidle")
        await page.evaluate("localStorage.setItem('deck-theme', 'light')")
        await page.reload(wait_until="networkidle")
        await page.wait_for_timeout(500)
        
        for i in range(1, 14):
            await page.goto(f"http://localhost:3000/deck#{i}", wait_until="networkidle")
            await page.wait_for_timeout(400)
            await page.screenshot(path=f"C:/Users/anura/.gemini/antigravity/scratch/infinyty-tech-deck-and-website/verify_slide_{i:02d}.png")
            print(f"Captured slide {i}")
            
        await browser.close()
        print("All captured!")

asyncio.run(screenshot_all())
