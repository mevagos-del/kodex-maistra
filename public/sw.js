const CACHE_PREFIX = 'kodex-maistra';
const CACHE_VERSION = 'v2';
const SHELL_CACHE = `${CACHE_PREFIX}-shell-${CACHE_VERSION}`;
const ICON_CACHE = `${CACHE_PREFIX}-icons-${CACHE_VERSION}`;
const STATIC_CACHE = `${CACHE_PREFIX}-static-${CACHE_VERSION}`;
const ACTIVE_CACHES = new Set([SHELL_CACHE, ICON_CACHE, STATIC_CACHE]);
const APP_SHELL = ['/', '/offline.html', '/manifest.webmanifest', '/icons/icon.svg', '/icons/icon-maskable.svg'];
const CACHE_TIMESTAMP_HEADER = 'x-kodex-cache-time';
const CACHE_POLICIES = {
  [ICON_CACHE]: { maxEntries: 256, maxAgeMs: 30 * 24 * 60 * 60 * 1000 },
  [STATIC_CACHE]: { maxEntries: 160, maxAgeMs: 7 * 24 * 60 * 60 * 1000 },
};

function canCache(response) {
  return response.ok && (response.type === 'basic' || response.type === 'default');
}

async function trimCache(cacheName) {
  const policy = CACHE_POLICIES[cacheName];
  if (!policy) return;

  const cache = await caches.open(cacheName);
  const requests = await cache.keys();
  const now = Date.now();
  const entries = await Promise.all(requests.map(async (request) => {
    const response = await cache.match(request);
    return {
      request,
      timestamp: Number(response?.headers.get(CACHE_TIMESTAMP_HEADER)) || 0,
    };
  }));

  const expired = entries.filter(({ timestamp }) => timestamp > 0 && now - timestamp > policy.maxAgeMs);
  await Promise.all(expired.map(({ request }) => cache.delete(request)));

  const remaining = entries
    .filter(({ request }) => !expired.some((entry) => entry.request.url === request.url))
    .sort((a, b) => b.timestamp - a.timestamp);
  await Promise.all(remaining.slice(policy.maxEntries).map(({ request }) => cache.delete(request)));
}

async function cacheResponse(cacheName, request, response) {
  if (canCache(response)) {
    const cache = await caches.open(cacheName);
    const headers = new Headers(response.headers);
    headers.set(CACHE_TIMESTAMP_HEADER, String(Date.now()));
    const cachedResponse = new Response(response.clone().body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
    await cache.put(request, cachedResponse);
    await trimCache(cacheName);
  }

  return response;
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request, { cache: 'no-cache' });
    return await cacheResponse(cacheName, request, response);
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    throw error;
  }
}

async function staleWhileRevalidate(event, cacheName) {
  const request = event.request;
  const cached = await caches.match(request);
  const refresh = fetch(request, { cache: 'no-cache' })
    .then((response) => cacheResponse(cacheName, request, response));

  if (cached) {
    event.waitUntil(refresh.catch(() => undefined));
    return cached;
  }

  return refresh;
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(APP_SHELL.map((url) => new Request(url, { cache: 'reload' }))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith(`${CACHE_PREFIX}-`) && !ACTIVE_CACHES.has(key))
          .map((key) => caches.delete(key)),
      ))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .catch(() => caches.match('/offline.html')),
    );
    return;
  }

  if (url.pathname.startsWith('/icons/')) {
    event.respondWith(networkFirst(request, ICON_CACHE));
    return;
  }

  if (['style', 'script', 'image', 'font'].includes(request.destination)) {
    event.respondWith(staleWhileRevalidate(event, STATIC_CACHE));
  }
});
