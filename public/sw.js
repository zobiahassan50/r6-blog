/* R6 Siege Cheats service worker — cache static assets; network-first for HTML. */
const CACHE_VERSION = 'r6-cheats-v2'
const STATIC_CACHE = `${CACHE_VERSION}-static`
const PAGE_CACHE = `${CACHE_VERSION}-pages`
const OFFLINE_URL = '/offline.html'

const PRECACHE = [
  OFFLINE_URL,
  '/manifest.webmanifest',
  '/favicon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith('r6-cheats-') && key !== STATIC_CACHE && key !== PAGE_CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  )
})

function isCheckoutOrExternal(url) {
  return url.hostname.includes('zadeyo.com') || url.origin !== self.location.origin
}

function isVersionedAsset(url) {
  return (
    url.pathname.startsWith('/_astro/') ||
    url.pathname.startsWith('/og/') ||
    url.pathname.startsWith('/media/') ||
    url.pathname.startsWith('/videos/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.endsWith('.woff2')
  )
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (isCheckoutOrExternal(url)) return

  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone()
          caches.open(PAGE_CACHE).then((cache) => cache.put(request, copy))
          return response
        })
        .catch(async () => {
          const cached = await caches.match(request)
          return cached || caches.match(OFFLINE_URL)
        }),
    )
    return
  }

  if (isVersionedAsset(url)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok) {
              const copy = response.clone()
              caches.open(STATIC_CACHE).then((cache) => cache.put(request, copy))
            }
            return response
          }),
      ),
    )
  }
})
