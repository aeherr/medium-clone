// See https://developers.google.com/web/tools/workbox/guides/configure-workbox
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

// We need this in Webpack plugin (refer to swSrc option): https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_injectmanifest_config
workbox.precaching.precacheAndRoute(self.__precacheManifest);

// const articleHandler = workbox.strategies.networkFirst({
//     cacheName: 'articles-cache',
//     plugins: [
//         new workbox.expiration.Plugin({
//             maxEntries: 50,
//         })
//     ]
// });

// workbox.routing.registerRoute(new RegExp('/articleview/.*'), args => {
//     return articleHandler.handle(args);
// });


//does not work with react for custom offline page
// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//       // Try the cache
//       caches.match(event.request).then(function(response) {
//         // Fall back to network
//         return response || fetch(event.request);
//       }).catch(function() {
//         // generic fail
//         return caches.match('offline.html');

//         //TODO: 404
//       })
//     );
//   });

// app-shell
workbox.routing.registerRoute("/", workbox.strategies.networkFirst());



