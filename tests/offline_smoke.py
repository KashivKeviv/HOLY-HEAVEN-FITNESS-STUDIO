"""Check a production preview's first offline reload in fresh browser contexts.

Build and run `npm run preview -- --port 4173` before this check. Requires
Python Playwright and system Chromium; STUDIO_URL and CHROMIUM_EXECUTABLE
can select a different preview URL or browser executable.
"""

import os
import shutil
from urllib.parse import urlparse

from playwright.sync_api import expect, sync_playwright


STUDIO_URL = os.environ.get("STUDIO_URL", "http://127.0.0.1:4173").rstrip("/") + "/"
CHROMIUM = os.environ.get("CHROMIUM_EXECUTABLE") or shutil.which("chromium") or shutil.which("chromium-browser")


def check_images(page):
    for image in page.locator("img").all():
        image.scroll_into_view_if_needed()
        expect(image).to_have_js_property("complete", True)
        assert image.evaluate("image => image.naturalWidth > 0"), image.get_attribute("src")


def navigate(page, label, mobile):
    if mobile:
        page.get_by_role("button", name="Open navigation", exact=True).click()
    page.get_by_role("navigation").get_by_role("button", name=label, exact=True).click()


def check_offline(browser, mobile=False):
    context = browser.new_context(
        viewport={"width": 390 if mobile else 1440, "height": 900},
        is_mobile=mobile,
        has_touch=mobile,
    )
    page = context.new_page()
    page.set_default_timeout(10000)
    errors, console_errors, failed_requests, offline_responses = [], [], [], []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.on("console", lambda message: console_errors.append({"text": message.text, "url": message.location.get("url", "")}) if message.type == "error" else None)
    page.on("requestfailed", lambda request: failed_requests.append({"url": request.url, "type": request.resource_type}))

    # Do not warm the service worker with an online controlled reload. That
    # concealed an Origin/Vary mismatch in install-time cached module requests.
    page.goto(STUDIO_URL)
    expect(page.get_by_role("heading", name="Welcome to your studio.", exact=True)).to_be_visible()
    page.evaluate("navigator.serviceWorker.ready")
    page.wait_for_function("navigator.serviceWorker.controller !== null")
    cached = page.evaluate("""async () => {
      const names = await caches.keys();
      const cache = await caches.open(names.find(name => name.startsWith('hh-fitness-')));
      return (await cache.keys()).map(request => request.url);
    }""")
    assert any(url.endswith(".js") for url in cached), "Production JS was not precached"
    assert any(url.endswith(".css") for url in cached), "Production CSS was not precached"
    assert any("malayalam-malayalam" in url and url.endswith(".woff2") for url in cached), "Malayalam font was not precached"

    # Force the result to come from service-worker CacheStorage rather than the
    # browser's HTTP cache, and take every subsequent operation fully offline.
    session = context.new_cdp_session(page)
    session.send("Network.enable")
    session.send("Network.setCacheDisabled", {"cacheDisabled": True})
    page.on("response", lambda response: offline_responses.append({"url": response.url, "status": response.status, "sw": response.from_service_worker}))
    context.set_offline(True)
    response = page.reload(wait_until="networkidle")
    assert response and response.status == 200 and response.from_service_worker, "Offline shell did not come from the service worker"
    expect(page.get_by_role("heading", name="Welcome to your studio.", exact=True)).to_be_visible()
    page.evaluate("document.fonts.ready")
    assert page.evaluate("document.fonts.check('400 16px \"DM Sans Variable\"', 'Holy Heaven')"), "English font did not load offline"
    check_images(page)

    navigate(page, "Knowledge hub", mobile)
    check_images(page)
    page.get_by_role("button", name="Read: Protein, without the confusion", exact=True).click()
    expect(page.get_by_role("dialog")).to_be_visible()
    assert page.get_by_role("dialog").locator(".article-body section").count() >= 3
    check_images(page)
    page.get_by_role("button", name="Close dialog", exact=True).click()

    navigate(page, "My training", mobile)
    check_images(page)
    page.get_by_role("button", name="View workout: Full-body foundation", exact=True).click()
    expect(page.get_by_role("dialog")).to_be_visible()
    check_images(page)
    page.get_by_role("button", name="Start guided session", exact=True).click()
    expect(page.get_by_role("timer")).to_have_text("3:00")
    page.get_by_role("button", name="Pause", exact=True).click()
    expect(page.get_by_role("button", name="Resume", exact=True)).to_be_visible()
    page.get_by_role("button", name="Close dialog", exact=True).click()

    page.get_by_role("button", name="മലയാളം", exact=True).click()
    expect(page.locator("html")).to_have_attribute("lang", "ml")
    page.reload(wait_until="networkidle")
    expect(page.locator("html")).to_have_attribute("lang", "ml")
    assert "നിങ്ങളുടെ" in page.locator("h1").inner_text()
    page.evaluate("document.fonts.ready")
    assert page.evaluate("document.fonts.check('400 16px \"Noto Sans Malayalam Variable\"', 'നിങ്ങളുടെ')"), "Malayalam font did not load offline"
    check_images(page)

    for extension in (".js", ".css", ".woff2"):
        resources = [item for item in offline_responses if urlparse(item["url"]).path.endswith(extension)]
        assert resources and all(item["status"] == 200 and item["sw"] for item in resources), (extension, resources)
    assert not errors, errors
    assert not failed_requests, failed_requests
    # Some Chromium versions log the worker's attempted network-first document
    # fetch. Only that failed navigation is expected; assets must have no errors.
    unexpected_console = [item for item in console_errors if not (
        item["url"].rstrip("/") == STUDIO_URL.rstrip("/")
        and "net::ERR_INTERNET_DISCONNECTED" in item["text"]
    )]
    assert not unexpected_console, unexpected_console
    context.close()
    print(f"PASS {'mobile' if mobile else 'desktop'}: fresh-install offline reload, images, article, workout, persisted Malayalam and both fonts", flush=True)


with sync_playwright() as playwright:
    options = {"headless": True, "args": ["--no-sandbox"]}
    if CHROMIUM:
        options["executable_path"] = CHROMIUM
    browser = playwright.chromium.launch(**options)
    try:
        check_offline(browser)
        check_offline(browser, mobile=True)
    finally:
        browser.close()
