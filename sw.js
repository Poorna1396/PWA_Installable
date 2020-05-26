const cacheContents = 'cachedPages'
const asset = [
    '/',
    '/welcome.html',
    '/manifest.json',
    '/sw.js',
]

self.addEventListener('install', event=>{
    console.log("worker installed");
    event.waitUntil(
        caches.open(cacheContents).then(cache =>{
            console.log("caching assets");
            cache.addAll(asset);
        })
    );

});

self.addEventListener('activate', event=>{
    console.log("worker activated");
});

self.addEventListener('fetch', event=>{
    console.log("fetch fired ",event);
    event.respondWith(
        caches.match(event.request).then(res =>{
            return res || fetch(event.request);
        })
    );
});
