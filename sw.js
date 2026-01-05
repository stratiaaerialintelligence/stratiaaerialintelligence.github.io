/* sw.js — cache SOLO immagini (safe) */
const CACHE_NAME = "stratia-img-v1";
const IMG_EXT = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".ico"];

self.addEventListener("install", (event) => {
  // attiva subito
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    // pulizia cache vecchie
    const keys = await caches.keys();
    await Promise.all(keys.map(k => (k !== CACHE_NAME ? caches.delete(k) : Promise.resolve())));
    await self.clients.claim();
  })());
});

function isImageRequest(req) {
  if (req.destination === "image") return true;
  try {
    const url = new URL(req.url);
    const p = url.pathname.toLowerCase();
    return IMG_EXT.some(ext => p.endsWith(ext));
  } catch {
    return false;
  }
}

// Stale-While-Revalidate: mostro cache subito, poi aggiorno in background
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // solo GET
  if (req.method !== "GET") return;

  // solo immagini
  if (!isImageRequest(req)) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req);

    const fetchPromise = fetch(req).then((res) => {
      // salva solo risposte OK e basic/cors
      if (res && (res.status === 200) && (res.type === "basic" || res.type === "cors")) {
        cache.put(req, res.clone());
      }
      return res;
    }).catch(() => cached); // se offline e c'è cache, usa cache

    return cached || fetchPromise;
  })());
});
