---
layout: compress
permalink: '/sw.js'
# PWA service worker
---

self.importScripts('{{ "/assets/js/data/swcache.js" | relative_url }}');

const cacheName = 'chirpy-{{ "now" | date: "%Y%m%d.%H%M" }}';

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(resource);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then(response => {
            const url = event.request.url;

            if (notAllowCache(url, event.request.method)) {
              return response;
            }

            /*
              see: <https://developers.google.com/web/fundamentals/primers/service-workers#cache_and_return_requests>
             */
            let responseToCache = response.clone();

            caches.open(cacheName)
              .then(cache => {
                /* console.log('[sw] Caching new resource: ' + event.request.url); */
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
    );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keyList => {
          return Promise.all(
            keyList.map(key => {
              if(key !== cacheName) {
                return caches.delete(key);
              }
            })
          );
    })
  );
});
