import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1400, 'height': 900})
        page = await context.new_page()

        pages = [
            ("http://localhost:3000/", "page_index"),
            ("http://localhost:3000/about", "page_about"),
            ("http://localhost:3000/services", "page_services"),
            ("http://localhost:3000/contact", "page_contact"),
        ]

        for url, name in pages:
            # Light mode
            await page.goto(url, wait_until='networkidle')
            await page.evaluate("() => document.documentElement.classList.remove('dark-mode')")
            await page.wait_for_timeout(500)
            await page.screenshot(path=f"{name}_light.png", full_page=True)

            # Dark mode
            await page.evaluate("() => document.documentElement.classList.add('dark-mode')")
            await page.wait_for_timeout(500)
            await page.screenshot(path=f"{name}_dark.png", full_page=True)

        await browser.close()
        print("All screenshots generated successfully.")

asyncio.run(main())
