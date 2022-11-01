if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service.js").then(function() {
    console.log("ServiceWorker");
  }).catch(function(err) {
    console.error(err);
  });
}

var cacheName = "ServiceWorker";

var filesToCache = [
  "/"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("Install");
      return cache.addAll(filesToCache);
    })
  )
});

self.addEventListener("activate", function (event) {
  console.log("Activate", event);
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
        }).catch(function (err) {
      return caches.match("/");
    })
  )
});

navigator.serviceWorker.ready.then(function(registration) {
  registration.sync.register("sync").then(function() {
    }, function() {
  });
});

self.addEventListener("periodicSync", (event) => {
  if (event.tag === "sync") {
    event.waitUntil(syncContent());
  }
});

async function requestBackgroundSync() {
  await self.registration.sync.register("sync");}
    self.addEventListener("sync", event => {
      if (event.tag === "sync") {
    event.waitUntil(doTheWork());
  }
});
