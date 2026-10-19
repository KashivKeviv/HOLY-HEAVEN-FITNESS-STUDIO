const CACHE_PREFIX = 'hh-fitness-';
const CACHE_NAME = `${CACHE_PREFIX}v2`;
const SHELL_PATH = '/';
const PRECACHE_PATHS = [
  SHELL_PATH,
  '/manifest.webmanifest',
  '/favicon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/images/hero.png',
  '/images/workout-strength.jpg',
  '/images/workout-mobility.jpg',
  '/images/workout-cardio.jpg',
  '/images/workout-functional.jpg',
  '/images/lesson-nutrition.jpg',
  '/images/lesson-strength.jpg',
  '/images/lesson-recovery.jpg',
];

async function precacheResource(cache, path) {
  const response = await fetch(path, { cache: 'reload', credentials: 'same-origin' });
  if (!response.ok) throw new Error(`Could not cache ${path}`);
  await cache.put(path, response.clone());
  return response;
}

function localBuiltAsset(path, baseUrl) {
  const url = new URL(path, baseUrl);
  return url.origin === self.location.origin && url.pathname.startsWith('/assets/')
    ? url.href
    : null;
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const responses = await Promise.all(PRECACHE_PATHS.map(path => precacheResource(cache, path)));
    const html = await responses[0].text();

    // Vite gives each production bundle a content hash. Discover the current
    // bundle names from the built page instead of hard-coding them here.
    const bundles = [...new Set(
      [...html.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/g)]
        .map(match => localBuiltAsset(match[1], self.location.origin))
        .filter(url => url && /\.(?:js|css)(?:\?|$)/i.test(url)),
    )];
    const bundleResponses = await Promise.all(bundles.map(url => precacheResource(cache, url)));
    const fonts = new Set();
    for (let index = 0; index < bundles.length; index += 1) {
      if (!/\.css(?:\?|$)/i.test(bundles[index])) continue;
      const css = await bundleResponses[index].text();
      for (const match of css.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g)) {
        const url = localBuiltAsset(match[1], bundles[index]);
        if (url && /\.(?:woff2?|ttf|otf)(?:\?|$)/i.test(url)) fonts.add(url);
      }
    }
    await Promise.all([...fonts].map(url => precacheResource(cache, url)));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names
      .filter(name => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

async function navigate(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    if (response.ok && response.headers.get('content-type')?.includes('text/html')) {
      await cache.put(request, response.clone());
    }
    return response;
  } catch {
    return await cache.match(request, { ignoreSearch: true })
      || await cache.match(SHELL_PATH)
      || Response.error();
  }
}

async function staticAsset(request) {
  const cache = await caches.open(CACHE_NAME);
  // These are public, same-origin static files. Vite can mark them Vary: Origin,
  // while its module/font requests include Origin and install-time fetches do
  // not. The bytes are identical, so those request-header differences must not
  // prevent an offline cache hit. API and cross-origin requests never get here.
  const cached = await cache.match(request, { ignoreVary: true });
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) await cache.put(request, response.clone());
  return response;
}

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (/^\/(?:api|auth|graphql)(?:\/|$)/.test(url.pathname)) return;

  if (request.mode === 'navigate') {
    event.respondWith(navigate(request));
  } else if (
    /^\/(?:assets|images|icons)\//.test(url.pathname)
    || url.pathname === '/favicon.svg'
    || url.pathname === '/manifest.webmanifest'
  ) {
    event.respondWith(staticAsset(request));
  }
});
