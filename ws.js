// ⚠️ REEMPLAZA con tu URL real de Render
const BACKEND = 'https://TU-BACKEND.onrender.com';

// 1. Cargamos el bundle primero (define el objeto 'Ultraviolet')
importScripts(BACKEND + '/uv/uv.bundle.js');

// 2. Cargamos NUESTRA configuración personalizada (con rutas absolutas)
importScripts('/uv.config.js');

// 3. Cargamos el script del Service Worker de Ultraviolet
importScripts(BACKEND + '/uv/uv.sw.js');

// 4. Iniciamos el worker
const sw = new UVServiceWorker();

// 5. Interceptamos TODAS las peticiones que empiecen con el prefijo
self.addEventListener('fetch', (event) => {
    event.respondWith(sw.fetch(event));
});
