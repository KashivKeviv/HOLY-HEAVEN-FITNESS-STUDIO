# HOLY HEAVEN FITNESS STUDIO

**Fitness in your pocket.** A responsive, bilingual virtual studio for understanding training, nutrition, recovery, and mindset. Built with React, TypeScript, and Vite, with a black-and-gold visual identity inspired by the founder’s brand.

## What works in this first edition

- English and Malayalam interfaces, workouts, articles, search, and tools; language choice persists.
- Three guided workouts: an 18-minute strength foundation, a 12-minute mobility reset, and 15 minutes of low-impact cardio. Each includes movement instructions, rest cues, a timer, pause/resume, and session logging.
- Six fitness education articles with links to official health guidance; category filters and saved lessons.
- Personal display name, an adjustable weekly goal, an activity chart, and a session journal. Only time spent with the workout timer running is recorded.
- Protein-range and estimated one-rep-maximum calculators with validation, plus a paced breathing timer.
- Keyboard navigation, native accessible dialogs, reduced-motion support, and responsive layouts.
- An installable web app with offline access to the app, articles, workouts, images, and fonts after a successful first online load. Installability depends on the browser and HTTPS (localhost also works).

The app currently stores preferences and progress **only in this browser’s local storage**. No account, analytics, studio API, or cloud synchronization is connected. Clearing site data removes saved progress; private browsing and storage restrictions may prevent persistence. The interface reports when local storage is unavailable. External article-source websites require an Internet connection.

## Develop

Node.js 24 and npm are verified in the cloud environment. Use the existing checkout; a cloud task is already isolated and does not need another Git worktree.

```sh
cd /workspace/HOLY-HEAVEN-FITNESS-STUDIO
npm ci --cache /tmp/holy-heaven-npm --no-audit --no-fund
npm run dev -- --port 5173
```

On your own computer, run the commands from the repository directory; the cache argument can be omitted. No environment variables, API keys, database, or paid services are required.

## Build and verify

```sh
npm run build
npm run preview -- --port 4173
```

`build` checks TypeScript before creating `dist/`. Verify the actual application, rather than just checking for an open port: open the studio, start and pause a workout, read/save a lesson, switch languages, and confirm saved preferences after reload. The production preview also enables the service worker; the development server intentionally does not.

The browser regression suite uses Python Playwright with Chromium:

```sh
# The cloud environment already has these tools.
# Elsewhere: python -m pip install playwright && python -m playwright install chromium
STUDIO_URL=http://127.0.0.1:5173 python3 tests/browser_smoke.py
```

Set `CHROMIUM_EXECUTABLE` if Chromium is installed somewhere other than `/usr/bin/chromium`. The test file documents the browser-launch setup. For a production check, use `STUDIO_URL=http://127.0.0.1:4173` after building and starting preview.

To verify offline behavior against the production preview, run:

```sh
STUDIO_URL=http://127.0.0.1:4173 python3 tests/offline_smoke.py
```

The offline check uses a fresh browser session and goes offline immediately after the first service-worker installation, then exercises reload, training, articles, images, and language persistence.

## A small codebase for a solo founder

| File | Purpose |
| --- | --- |
| `src/App.tsx` | Studio, training, learning, progress, dialogs, and hash navigation |
| `src/data.ts` | Bilingual workout and article content, durations, and references |
| `src/Tools.tsx` | Calculators and paced breathing |
| `src/storage.ts` | Versioned local preferences, session records, and validation |
| `src/styles.css` | Responsive brand design and accessibility styles |
| `public/manifest.webmanifest` | Home-screen installation identity |
| `public/sw.js` | Production offline caching |
| `tests/browser_smoke.py` | End-to-end regression checks |
| `tests/offline_smoke.py` | First-load offline production regression |

Update both `en` and `ml` content together in `src/data.ts`. Keep the sum of each workout’s step durations equal to its displayed duration. When changing offline asset names or cache behavior, update `PRECACHE_PATHS` and bump the cache version in `public/sw.js`; verify offline use on the rebuilt production app. The visual photographs are representative samples; provenance is documented in [public/images/ATTRIBUTION.md](public/images/ATTRIBUTION.md). The compact winged-barbell symbol is a simplified interface mark, not an exact reproduction of the uploaded logo.

## Publish the website

Deploy the generated `dist/` directory to a static host with HTTPS. This is a static client app; no Node server is needed in production. The current asset paths and service-worker scope target the domain root. Hash navigation supports direct links such as `/#training` without server rewrite rules.

Configure production hosting to revalidate `index.html`, `manifest.webmanifest`, and `sw.js`; hashed `/assets/` files can use immutable caching. Preview is a local validation server, not a production hosting service. The repository has not been deployed or published by this task.

## Next product stages

1. Review the English/Malayalam content with qualified fitness and nutrition professionals, replace sample imagery with owned or licensed brand assets, and expand the learning curriculum.
2. Add authenticated accounts, a database, backup/export/deletion controls, and cross-device sync before offering cloud-saved progress.
3. Add the founder’s publishing dashboard, video lessons/captions, and structured learning paths before expanding the content library substantially.
4. Connect scheduling, payments, and personal coaching when the business model and appropriate professional processes are defined. Any future AI coaching should clearly communicate its limits and use reviewed source material.

The material here provides general adult fitness education, not medical care, individualized rehabilitation, or a guarantee of results.
