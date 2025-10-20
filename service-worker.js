const CACHE_NAME = "App_Lloret_Femení";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/mapa.html",
  "/ficha_vue.html",
  "/manifest.json",
  "/js/script.js",
  "js/app.js",
  "js/llocs_interes.json",
  "css/style.css",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/files/img/dona_marinera_tochange.jpg",
  "/files/img/mapa.png",
  "/files/img/dona_marinera.jpg",
  "/files/img/santa_clotilde_tochange.jpeg",
  "/files/img/st_pere_bosc_tochange.jpg",
  "/files/img/sta_cris_tochange.jpg",
  "/css/logos/logo_ajunt_lloret.png",
  "/css/logos/logos_other.png",
  "/css/logos/logo-hightlightgreen.png",
];

// Install SW and cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate SW and clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
  self.clients.claim();
});

// Fetch cached resources  Guardar las imágenes en el caché la primera vez que se carga la página con connexión para luego poderlas cargar offline

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
       // Si ya está en el caché usar des de ahí
      if (response) {
        return response;
      }

      // Si no está, pedir a la red
      return fetch(event.request).then(networkResponse => {
        // Si es una imagen, guardar automáticamente
        if (event.request.url.includes("/img/")) {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
          });
        }
        return networkResponse;
      }).catch(() => {
        // En modo offline o sin imagenes mostrar mensaje de error
        return caches.match("/index.html");
      });
    })
  );
});

