const CACHE_VERSION = "1.0.13";
const STATIC_CACHE = `static-${CACHE_VERSION}`;
// const DYNAMIC_CACHE = `dynamic-${CACHE_VERSION}`;

// Add debug logging
const debug = (...args) => {
  console.log(`[Service Worker ${CACHE_VERSION}]`, ...args);
};

const STATIC_ASSETS = [
  // Core static assets
  "/_next/static/css/**/*",
  "/_next/static/media/**/*",
  "/images/*",
  "/icons/*",
];

// Installation - Cache critical assets
self.addEventListener("install", (event) => {
  debug("Installing new version");
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        console.log("Pre-caching static assets");
        return cache.addAll(STATIC_ASSETS);
      }),
      self.skipWaiting(), // Activate immediately
    ])
  );
});

// Activation - Clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating new version", CACHE_VERSION);
  event.waitUntil(
    Promise.all([
      // Remove old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // Delete if it's our cache but different version
              return (
                cacheName.startsWith("app-cache-") && cacheName !== STATIC_CACHE
              );
            })
            .map((cacheName) => {
              console.log("Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      self.clients.claim(), // Take control of all pages
    ])
  );
});

// Fetch - Cache all files
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Different strategies for different types of requests
  if (request.mode === "navigate") {
    // Navigation requests - Network first, fallback to cache
    event.respondWith(
      fetch(request).catch(
        () => caches.match(request) || caches.match("/offline.html")
      )
    );
  } else if (
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "image"
  ) {
    // Static assets - Cache first, network fallback
    event.respondWith(
      caches.match(request).then((response) => response || fetch(request))
    );
  } else if (request.url.includes("/api/")) {
    // API requests - Network only for dynamic data
    if (request.url.includes("/api/static/")) {
      // Static API data can be cached
      event.respondWith(
        caches.match(request).then((response) => response || fetch(request))
      );
    }
    // Other API requests - no caching
  }
});
