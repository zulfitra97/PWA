//WORKBOX
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
if (workbox) {
    console.log(`Workbox berhasil dimuat`);
    workbox.precaching.precacheAndRoute([
    { url: "/", revision: '1'},
    { url: "/manifest.json", revision: '1'},
    { url: "/index.html", revision: '2'},
    { url: "/src/components/nav.html", revision: '1'},
    { url: "/src/pages/home.html", revision: '1'},
    { url: "/src/pages/teams.html", revision: '1'},
    { url: "/src/pages/favorite.html", revision: '1'},
    { url: "/assets/js/idb.js", revision: '1'},
    { url: "/assets/css/main.css", revision: '1'},
    { url: "/assets/css/materialize.min.css", revision: '1'},
    { url: "/assets/js/main.js", revision: '1'},
    { url: "/assets/js/materialize.min.js", revision: '1'},
    { url: "/assets/js/modules/api.js", revision: '1'},
    { url: "/assets/js/modules/nav.js", revision: '1'},
    { url: "/assets/js/modules/page.js", revision: '1'},
    { url: "/assets/js/modules/database.js", revision: '1'},
    { url: "/assets/js/modules/listener.js", revision: '6'},
    { url: "/assets/js/modules/pwa.js", revision: '1'},
    { url: "/bola192.jpg", revision: '1'},
    { url: "/epl.png", revision: '1'},
    { url: "/bola512.jpg", revision: '1'},
  ]);
workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'images-cache',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 30 * 24* 60 * 60,

            }),
        ]
    })
);
workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
)
//Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);
//Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);
} else{
    console.log(`Workbox gagal dimuat`);
}
    
self.addEventListener('push', event => {
    let body

    event.data ? body = event.data.text() : body = 'No Payload'
    const options = {
        body : body,
        icon : '/epl.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    }
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    )
})

