const cacheName = "tembelRun-v2.4";
const contentToCache = [
    "code.js",
    "index.html",
    "style.css",
    "assets/fonts/Heebo-VariableFont_wght.ttf",
    "assets/icons/icon.svg",
    "assets/media/background.svg",
    "assets/media/blackX.svg",
    "assets/media/compress.svg",
    "assets/media/goldenStar.svg",
    "assets/media/expand.svg",
    "assets/media/pause.svg",
    "assets/media/road.svg",
    "assets/media/sadTembel.jpg",
    "assets/media/tembel.png",
    "assets/media/trophy.svg",
    "assets/media/X.svg"
]

self.addEventListener('install', (e) => {
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        await cache.addAll(contentToCache);
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                    if (key === cacheName) { return; }
                    return caches.delete(key);
            }))
    })
      })());
  });

self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    if (r) { return r; }
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    cache.put(e.request, response.clone());
    return response;
  })());
});

// delete all the caches that are not updated (do not match the current version)
self.addEventListener('activate', (e) => {
    console.log("Delete old cache");
    e.waitUntil(caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                    if (key === cacheName) { return; }
                    return caches.delete(key);
            }))
    }));
});
