import asyncio
from playwright.async_api import async_playwright
import os

async def take_screenshots():
    pages_to_test = ['index.html', 'about.html', 'services.html', 'contact.html']
    cwd = os.getcwd()
    
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for page_name in pages_to_test:
            page = await browser.new_page()
            url = f"file://{cwd}/{page_name}"
            
            # Dark mode (default)
            await page.goto(url)
            await page.evaluate("localStorage.setItem('theme', 'dark'); document.documentElement.classList.add('dark-mode');")
            await page.wait_for_timeout(1000) # wait for render
            await page.screenshot(path=f"{page_name.split('.')[0]}_dark.png", full_page=True)
            
            # Light mode
            await page.evaluate("localStorage.setItem('theme', 'light'); document.documentElement.classList.remove('dark-mode');")
            await page.wait_for_timeout(1000) # wait for render
            await page.screenshot(path=f"{page_name.split('.')[0]}_light.png", full_page=True)
            
            await page.close()
            print(f"Screenshots captured for {page_name}")
            
        await browser.close()

if __name__ == "__main__":
    asyncio.run(take_screenshots())
