import asyncio
from playwright.async_api import async_playwright

async def verify_home():
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe', headless=True)
        page = await browser.new_page(viewport={'width': 1920, 'height': 1080})
        
        # 1. Light Mode Full Page
        await page.goto('http://localhost:3000/index.html', wait_until='networkidle')
        await asyncio.sleep(1.5)
        await page.screenshot(path='home_light_full.png', full_page=True)
        
        # Scroll to Why Infinyty specifically
        why_section = await page.query_selector('.why-infinyty-section')
        if why_section:
            await why_section.scroll_into_view_if_needed()
            await asyncio.sleep(0.5)
            await page.screenshot(path='home_why_light.png')

        # 2. Dark Mode
        await page.click('#theme-toggle')
        await asyncio.sleep(0.8)
        await page.screenshot(path='home_why_dark.png')
        await page.screenshot(path='home_dark_full.png', full_page=True)
        
        await browser.close()

asyncio.run(verify_home())
