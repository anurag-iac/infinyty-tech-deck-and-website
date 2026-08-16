import asyncio
import os
from playwright.async_api import async_playwright

async def run_audit():
    os.makedirs("mobile_audit_deck", exist_ok=True)
    os.makedirs("mobile_audit_web", exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(
            viewport={'width': 375, 'height': 812},
            is_mobile=True,
            has_touch=True,
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
        )
        page = await context.new_page()

        # 1. Audit Deck Slides (13 slides)
        print("Auditing deck slides on mobile...")
        await page.goto("http://localhost:3000/deck.html", wait_until='networkidle')
        await page.wait_for_timeout(600)

        # Get number of slides
        num_slides = await page.evaluate("() => document.querySelectorAll('.slide').length")
        print(f"Total slides found: {num_slides}")

        for i in range(num_slides):
            await page.evaluate(f"() => window.goTo({i})")
            await page.wait_for_timeout(400)
            await page.screenshot(path=f"mobile_audit_deck/slide_{i+1}_dark.png")
            
            # Also light mode
            await page.evaluate("() => { document.documentElement.classList.remove('dark-theme'); document.documentElement.classList.add('light-theme'); }")
            await page.wait_for_timeout(200)
            await page.screenshot(path=f"mobile_audit_deck/slide_{i+1}_light.png")
            
            # Revert to dark
            await page.evaluate("() => { document.documentElement.classList.remove('light-theme'); document.documentElement.classList.add('dark-theme'); }")

        # 2. Audit Website Pages
        web_pages = [
            ("http://localhost:3000/", "home"),
            ("http://localhost:3000/about", "about"),
            ("http://localhost:3000/services", "services"),
            ("http://localhost:3000/contact", "contact"),
            ("http://localhost:3000/success-stories", "success_stories"),
            ("http://localhost:3000/demos", "demos"),
            ("http://localhost:3000/careers", "careers"),
        ]

        print("Auditing website pages on mobile...")
        for url, name in web_pages:
            await page.goto(url, wait_until='networkidle')
            await page.wait_for_timeout(500)
            # Full page screenshot
            await page.screenshot(path=f"mobile_audit_web/{name}_dark.png", full_page=True)

            # Light mode
            await page.evaluate("() => document.documentElement.classList.remove('dark-mode')")
            await page.wait_for_timeout(300)
            await page.screenshot(path=f"mobile_audit_web/{name}_light.png", full_page=True)

        await browser.close()
        print("Mobile audit screenshots captured successfully.")

asyncio.run(run_audit())
