const SW_EVENT = "Service worker event: "

const log_sw_event = (event) => {
    console.log(SW_EVENT + event.type)
}

self.addEventListener("install", event => log_sw_event(event));
self.addEventListener("activate", event => log_sw_event(event));
self.addEventListener("statechange", event => log_sw_event(event));

self.addEventListener("fetch", event => log_sw_event(event));
self.addEventListener("message", event => log_sw_event(event));
self.addEventListener("messageerror", event => log_sw_event(event));

self.addEventListener("sync", event => log_sw_event(event));
self.addEventListener("canmakepayment", event => log_sw_event(event));

self.addEventListener("push", event => log_sw_event(event));
self.addEventListener("notificationclick", event => log_sw_event(event));
self.addEventListener("notificationclose", event => log_sw_event(event));

const CACHE_NAME = 'v1';

const assets = [
    './manifest.json',
    './logo.png',
    './logo.svg',
];

self.addEventListener('install', (evt) => {
    evt.waitUntil(
        self.skipWaiting().then(() => {
            return caches.open(CACHE_NAME)
                .then((cache) => {
                    return cache.addAll(assets)
                        .catch(err => {
                            console.log('Failed to cache assets:', err)
                        })
                })
        })
    );
});