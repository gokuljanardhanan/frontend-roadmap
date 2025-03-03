export const serviceWorkers = `
# Service Workers in Web Development

## What are Service Workers?

Service Workers are scripts that run in the background, separate from a web page, and provide features like offline functionality, background syncs, and push notifications.

### Key Features
- **Offline First**: Cache resources for offline use
- **Push Notifications**: Enable web push notifications
- **Background Sync**: Queue actions when offline
- **Intercept Network Requests**: Control how network requests are handled

## Service Worker Lifecycle

1. **Registration**
\`\`\`javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => console.log('SW registered'))
    .catch(error => console.log('SW registration failed'));
}
\`\`\`

2. **Installation**
\`\`\`javascript
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('cache-v1').then(cache => {
      return cache.addAll([
        '/offline.html',
        '/styles/main.css',
        '/images/logo.png'
      ]);
    })
  );
});
\`\`\`

3. **Activation**
\`\`\`javascript
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== 'cache-v1') {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
\`\`\`

## Caching Strategies

1. **Cache First**
   - Check cache first
   - Fall back to network if not in cache
\`\`\`javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
\`\`\`

2. **Network First**
   - Try network first
   - Fall back to cache if offline
\`\`\`javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});
\`\`\`

3. **Stale While Revalidate**
   - Return cached version immediately
   - Update cache in background
\`\`\`javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        caches.open('cache-v1').then(cache => {
          cache.put(event.request, networkResponse.clone());
        });
        return networkResponse;
      });
      return cachedResponse || fetchPromise;
    })
  );
});
\`\`\`

## Best Practices

1. **Version Your Cache**
   - Use versioned cache names
   - Clean up old caches during activation

2. **Selective Caching**
   - Cache only necessary resources
   - Consider resource size and frequency of updates

3. **Handle Errors Gracefully**
   - Provide offline fallbacks
   - Log errors for debugging

4. **Update Strategy**
   - Plan how to handle service worker updates
   - Consider using skipWaiting for immediate updates

## Limitations

1. **HTTPS Required**
   - Service Workers only work over HTTPS (except localhost)

2. **No DOM Access**
   - Cannot directly access DOM
   - Must use postMessage for page communication

3. **No Local Storage**
   - Cannot access localStorage
   - Use IndexedDB for storage needs

## Testing Service Workers

1. **Chrome DevTools**
   - Application tab > Service Workers
   - Network tab > Offline mode

2. **Lighthouse**
   - Audit PWA capabilities
   - Check offline functionality

3. **Workbox**
   - Google's libraries for service worker
   - Provides testing utilities
`;
