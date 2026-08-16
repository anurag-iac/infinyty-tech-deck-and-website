import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1400, 'height': 900})
        await page.goto("file:///C:/Users/anura/Downloads/Infinyty_Deck.html", wait_until='networkidle')
        await page.wait_for_timeout(500)
        await page.screenshot(path="downloads_deck_slide1.png")
        
        # Next slide
        await page.keyboard.press("ArrowRight")
        await page.wait_for_timeout(500)
        await page.screenshot(path="downloads_deck_slide2.png")
        
        # Next slide
        await page.keyboard.press("ArrowRight")
        await page.wait_for_timeout(500)
        await page.screenshot(path="downloads_deck_slide3.png")

        await browser.close()
        print("Verified Downloads deck successfully.")

asyncio.run(main())
