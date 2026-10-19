"""Run functional browser checks against an already running Holy Heaven studio.

Install the optional test dependency with ``python -m pip install playwright``.
The default browser is system Chromium at /usr/bin/chromium. Set
CHROMIUM_EXECUTABLE to another compatible Chromium executable if needed, or
install Playwright's browser with ``python -m playwright install chromium`` and
set CHROMIUM_EXECUTABLE=playwright to use it. Set STUDIO_URL to the running app's
URL (default http://127.0.0.1:5173). Each scenario has a fresh browser context.

Example: STUDIO_URL=http://127.0.0.1:4173 python tests/browser_smoke.py
"""

import os
import re
import sys
import traceback
from contextlib import contextmanager

from playwright.sync_api import expect, sync_playwright


BASE_URL = os.environ.get("STUDIO_URL", "http://127.0.0.1:5173").rstrip("/")
CHROMIUM = os.environ.get("CHROMIUM_EXECUTABLE", "/usr/bin/chromium")
STORAGE_KEY = "holy-heaven-studio-v1"
PAGES = [
    ("My studio", "Welcome to your studio.", "studio"),
    ("My training", "Find your kind of strong.", "training"),
    ("Knowledge hub", "Understand your fitness.", "learn"),
    ("My progress", "Small steps. Real progress.", "progress"),
    ("Fitness tools", "A little clarity. A better next step.", "tools"),
]


def navigate(page, label):
    page.get_by_role("navigation").get_by_role("button", name=label, exact=True).click()


def saved_state(page):
    return page.evaluate("key => JSON.parse(localStorage.getItem(key))", STORAGE_KEY)


def no_overflow(page):
    dimensions = page.evaluate(
        "({width: innerWidth, scroll: document.documentElement.scrollWidth})"
    )
    assert dimensions["scroll"] <= dimensions["width"] + 1, dimensions


def healthy_images(page):
    for image in page.locator("img").all():
        image.scroll_into_view_if_needed()
        expect(image).to_have_js_property("complete", True)
        assert image.evaluate("image => image.naturalWidth > 0"), image.get_attribute("src")


def saved_filter(page):
    return page.locator(".page-heading").get_by_role("button", name=re.compile("^Saved lessons"))


def desktop_navigation(page):
    for label, title, route in PAGES:
        navigate(page, label)
        expect(page.locator("h1")).to_have_text(title)
        expect(page).to_have_url(re.compile("#" + route + "$"))
        no_overflow(page)
        healthy_images(page)


def language_persistence(page):
    page.get_by_role("button", name="മലയാളം", exact=True).click()
    expect(page.locator("html")).to_have_attribute("lang", "ml")
    expect(page.locator("h1")).to_have_text("നിങ്ങളുടെ സ്റ്റുഡിയോയിലേക്ക് സ്വാഗതം.")
    page.reload()
    expect(page.locator("html")).to_have_attribute("lang", "ml")
    assert saved_state(page)["language"] == "ml"
    no_overflow(page)
    page.get_by_role("button", name="EN", exact=True).click()
    expect(page.locator("h1")).to_have_text("Welcome to your studio.")


def bookmarks_and_lesson_categories(page):
    navigate(page, "Knowledge hub")
    assert page.locator(".lesson-card").count() == 6
    saved_filter(page).click()
    expect(page.get_by_role("heading", name="Make space for a good idea.")).to_be_visible()
    page.get_by_role("button", name="Explore all lessons", exact=True).click()
    page.get_by_role("button", name="Save: Protein, without the confusion", exact=True).click()
    assert len(saved_state(page)["bookmarks"]) == 1
    saved_filter(page).click()
    assert page.locator(".lesson-card").count() == 1
    page.reload()
    saved_filter(page).click()
    assert page.locator(".lesson-card").count() == 1
    page.get_by_role("button", name="Unsave: Protein, without the confusion", exact=True).click()
    assert saved_state(page)["bookmarks"] == []
    expect(page.get_by_role("heading", name="Make space for a good idea.")).to_be_visible()
    page.get_by_role("button", name="Explore all lessons", exact=True).click()
    for category, count in [("Training", 2), ("Nutrition", 2), ("Recovery", 1), ("Mindset", 1), ("All", 6)]:
        page.locator(".filter-row").get_by_role("button", name=category, exact=True).click()
        assert page.locator(".lesson-card").count() == count, category


def search_flows(page):
    page.keyboard.press("/")
    search = page.get_by_role("searchbox")
    expect(search).to_be_focused()
    search.fill("protein")
    assert page.locator(".lesson-card").count() == 1
    search.fill("zzzxxyy")
    expect(page.get_by_role("heading", name="A fresh search, a fresh start.")).to_be_visible()
    page.get_by_role("button", name="Clear search", exact=True).click()
    expect(page.locator("h1")).to_have_text("Welcome to your studio.")
    search.fill("പ്രോട്ടീൻ")
    assert page.locator(".lesson-card").count() == 1
    page.get_by_role("button", name="Clear search", exact=True).click()


def article_dialog(page):
    navigate(page, "Knowledge hub")
    opener = page.get_by_role("button", name="Read: Protein, without the confusion", exact=True)
    for close_method in ["Escape", "button"]:
        opener.click()
        dialog = page.get_by_role("dialog")
        expect(dialog).to_be_visible()
        assert dialog.locator(".article-body section").count() >= 3
        source = dialog.locator(".article-source a")
        assert source.get_attribute("href").startswith("https://")
        assert source.get_attribute("rel") == "noopener noreferrer"
        page.keyboard.press("Tab")
        assert page.evaluate("!!document.activeElement.closest('dialog')")
        if close_method == "Escape":
            page.keyboard.press("Escape")
        else:
            page.get_by_role("button", name="Close dialog", exact=True).click()
        expect(page.get_by_role("dialog")).to_have_count(0)
        expect(opener).to_be_focused()


def profile_persistence(page):
    page.get_by_role("button", name="Personalize your studio", exact=True).click()
    page.locator("#profile-name").fill("  Asha  ")
    page.locator("#weekly-goal").select_option("5")
    page.get_by_role("button", name="Set my intention", exact=True).click()
    assert saved_state(page)["name"] == "Asha"
    assert saved_state(page)["weeklyGoal"] == 5
    page.reload()
    expect(page.locator("h1")).to_have_text("Welcome back, Asha.")
    assert saved_state(page)["weeklyGoal"] == 5


def accessibility_regressions(page):
    navigate(page, "My progress")
    page.get_by_role("link", name="Skip to content", exact=True).focus()
    page.keyboard.press("Enter")
    expect(page.get_by_role("main")).to_be_focused()
    expect(page).to_have_url(re.compile("#progress$"))
    expect(page.locator("h1")).to_have_text("Small steps. Real progress.")
    chart_label = page.locator(".activity-chart").get_attribute("aria-label")
    for weekday in ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]:
        assert weekday + " 0" in chart_label, chart_label
    page.get_by_role("button", name="Personalize your studio", exact=True).click()
    page.locator("#profile-name").fill("A" * 40)
    page.get_by_role("button", name="Set my intention", exact=True).click()
    navigate(page, "My studio")
    page.set_viewport_size({"width": 390, "height": 844})
    no_overflow(page)


def guided_workouts(page):
    navigate(page, "My training")
    for category in ["Strength", "Mobility", "Cardio"]:
        page.locator(".filter-row").get_by_role("button", name=category, exact=True).click()
        assert page.locator(".workout-card").count() == 1
    page.locator(".filter-row").get_by_role("button", name="All", exact=True).click()
    for name, minutes in [("Full-body foundation", 18), ("The mobility reset", 12), ("Feel-good, low-impact cardio", 15)]:
        page.get_by_role("button", name="View workout: " + name, exact=True).click()
        durations = page.locator("dialog .exercise-list small").all_inner_texts()
        seconds = sum(int(value.split(":")[0]) * 60 + int(value.split(":")[1]) for value in durations)
        assert seconds == minutes * 60, (name, seconds)
        page.get_by_role("button", name="Close dialog", exact=True).click()
    page.get_by_role("button", name="View workout: Full-body foundation", exact=True).click()
    page.get_by_role("button", name="Start guided session", exact=True).click()
    expect(page.get_by_role("timer")).to_have_text("3:00")
    for _ in range(4):
        page.clock.run_for(1000)
    expect(page.get_by_role("timer")).to_have_text("2:56")
    page.get_by_role("button", name="Pause", exact=True).click()
    page.clock.run_for(4000)
    expect(page.get_by_role("timer")).to_have_text("2:56")
    page.get_by_role("button", name="Resume", exact=True).click()
    for _ in range(3):
        page.clock.run_for(1000)
    expect(page.get_by_role("timer")).to_have_text("2:53")
    for _ in range(5):
        page.get_by_role("button", name="Next movement", exact=True).click()
    page.get_by_role("button", name="Finish session", exact=True).click()
    expect(page.get_by_role("heading", name="One step stronger.", exact=True)).to_be_visible()
    expect(page.locator(".session-summary strong").first).to_have_text("0:07")
    assert len(saved_state(page)["sessions"]) == 1
    assert saved_state(page)["sessions"][0]["minutes"] == 0.1
    page.get_by_role("button", name="Back to my studio", exact=True).click()
    page.reload()
    navigate(page, "My progress")
    assert len(saved_state(page)["sessions"]) == 1
    assert page.locator(".journal-row").count() == 1


def calculators(page):
    navigate(page, "Fitness tools")
    body_weight = page.get_by_label("Your body weight", exact=True)
    body_weight.fill("80")
    page.get_by_role("button", name="Calculate my range", exact=True).click()
    expect(page.locator(".tools-result strong").nth(0)).to_have_text("96–128")
    for invalid in ["", "29", "251"]:
        body_weight.fill(invalid)
        page.get_by_role("button", name="Calculate my range", exact=True).click()
        expect(page.locator("#tools-protein-error")).to_be_visible()
        expect(body_weight).to_have_attribute("aria-invalid", "true")
    load = page.get_by_label("Weight lifted", exact=True)
    reps = page.get_by_label("Repetitions", exact=True)
    load.fill("100")
    reps.fill("5")
    page.get_by_role("button", name="Estimate my 1RM", exact=True).click()
    expect(page.locator(".tools-result strong").nth(1)).to_have_text("116.7")
    for invalid_load, invalid_reps in [("0", "5"), ("501", "5"), ("60", "1"), ("60", "11"), ("60", "2.5"), ("", "5")]:
        load.fill(invalid_load)
        reps.fill(invalid_reps)
        page.get_by_role("button", name="Estimate my 1RM", exact=True).click()
        expect(page.locator("#tools-strength-error")).to_be_visible()


def breathing_timer(page):
    navigate(page, "Fitness tools")
    page.get_by_role("button", name="Begin breathing", exact=True).click()
    page.clock.run_for(5000)
    expect(page.locator(".tools-breath-center strong")).to_have_text("55s")
    page.get_by_role("button", name="Pause", exact=True).click()
    page.clock.run_for(4000)
    expect(page.locator(".tools-breath-center strong")).to_have_text("55s")
    page.get_by_role("button", name="Continue", exact=True).click()
    page.clock.fast_forward(55000)
    expect(page.locator(".tools-breath-center strong")).to_have_text("0s")
    expect(page.get_by_role("button", name="Breathe again", exact=True)).to_be_visible()
    page.get_by_role("button", name="Breathe again", exact=True).click()
    page.clock.run_for(2000)
    expect(page.locator(".tools-breath-center strong")).to_have_text("58s")
    page.get_by_role("button", name="Reset", exact=True).click()
    expect(page.locator(".tools-breath-center strong")).to_have_text("60s")
    expect(page.get_by_role("button", name="Reset", exact=True)).to_be_disabled()


def route_history(page):
    page.goto(BASE_URL + "/#training")
    expect(page.locator("h1")).to_have_text("Find your kind of strong.")
    navigate(page, "Knowledge hub")
    navigate(page, "Fitness tools")
    page.go_back()
    expect(page.locator("h1")).to_have_text("Understand your fitness.")
    page.go_forward()
    expect(page.locator("h1")).to_have_text("A little clarity. A better next step.")
    page.reload()
    expect(page.locator("h1")).to_have_text("A little clarity. A better next step.")


def mobile_navigation(page):
    for label, title, _ in PAGES:
        page.get_by_role("button", name="Open navigation", exact=True).click()
        navigate(page, label)
        expect(page.locator(".sidebar")).not_to_have_class(re.compile("is-open"))
        expect(page.locator("h1")).to_have_text(title)
        no_overflow(page)
        healthy_images(page)
    opener = page.get_by_role("button", name="Open navigation", exact=True)
    opener.click()
    assert page.locator(".main-shell").evaluate("element => element.inert")
    for _ in range(15):
        page.keyboard.press("Tab")
        assert page.evaluate("!!document.activeElement.closest('.sidebar')")
    page.keyboard.press("Escape")
    expect(opener).to_be_focused()
    assert not page.locator(".main-shell").evaluate("element => element.inert")
    opener.click()
    page.locator(".sidebar-close").click()
    expect(opener).to_be_focused()
    page.get_by_role("button", name="മലയാളം", exact=True).click()
    for label in ["എന്റെ സ്റ്റുഡിയോ", "എന്റെ പരിശീലനം", "അറിവിന്റെ ലോകം", "എന്റെ പുരോഗതി", "ഫിറ്റ്നസ് ടൂളുകൾ"]:
        page.get_by_role("button", name="മെനു തുറക്കുക", exact=True).click()
        navigate(page, label)
        no_overflow(page)
        healthy_images(page)
    page.reload()
    expect(page.locator("html")).to_have_attribute("lang", "ml")
    no_overflow(page)


def unavailable_storage(page):
    page.context.add_init_script("Storage.prototype.setItem = function() { throw new DOMException('Unavailable', 'QuotaExceededError'); }")
    page.reload()
    expect(page.get_by_role("status")).to_contain_text("Browser storage is unavailable")
    page.get_by_role("button", name="മലയാളം", exact=True).click()
    expect(page.locator("html")).to_have_attribute("lang", "ml")


@contextmanager
def scenario_page(browser, mobile=False, clock=False):
    context = browser.new_context(
        viewport={"width": 390 if mobile else 1440, "height": 844 if mobile else 1000},
        is_mobile=mobile,
        has_touch=mobile,
    )
    page = context.new_page()
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.on("console", lambda message: errors.append(message.text) if message.type == "error" else None)
    page.on("response", lambda response: errors.append(f"HTTP {response.status}: {response.url}") if response.status >= 400 else None)
    if clock:
        page.clock.install()
    try:
        page.goto(BASE_URL)
        expect(page.locator("h1")).to_be_visible()
        yield page
        assert not errors, errors
    finally:
        context.close()


def main():
    scenarios = [
        ("desktop pages, images and layout", desktop_navigation, {}),
        ("English/Malayalam language persistence", language_persistence, {}),
        ("bookmarks, saved filter and lesson categories", bookmarks_and_lesson_categories, {}),
        ("keyboard search, Malayalam search, empty and clear", search_flows, {}),
        ("article, source link, dialog close and focus restore", article_dialog, {}),
        ("profile and weekly goal persistence", profile_persistence, {}),
        ("skip link, chart values and long profile name layout", accessibility_regressions, {}),
        ("workout durations, timer, controls and recorded progress", guided_workouts, {"clock": True}),
        ("protein and Epley calculator results and validation", calculators, {}),
        ("breathing timer pause, resume, finish, restart and reset", breathing_timer, {"clock": True}),
        ("deep links, reload and browser back/forward", route_history, {}),
        ("390px bilingual pages and accessible mobile navigation", mobile_navigation, {"mobile": True}),
        ("unavailable browser storage remains usable", unavailable_storage, {}),
    ]
    failures = 0
    with sync_playwright() as playwright:
        launch_options = {"headless": True, "args": ["--no-sandbox"]}
        if CHROMIUM != "playwright":
            launch_options["executable_path"] = CHROMIUM
        browser = playwright.chromium.launch(**launch_options)
        try:
            for name, test, options in scenarios:
                try:
                    with scenario_page(browser, **options) as page:
                        test(page)
                    print(f"PASS {name}", flush=True)
                except Exception:
                    failures += 1
                    print(f"FAIL {name}", flush=True)
                    traceback.print_exc()
        finally:
            browser.close()
    print(f"{len(scenarios) - failures}/{len(scenarios)} browser scenarios passed", flush=True)
    return bool(failures)


if __name__ == "__main__":
    sys.exit(main())
