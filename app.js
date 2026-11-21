// Registrar el Service Worker de Ultraviolet
async function registerSW() {
  try {
    // Registrar el SW desde el backend
    await register(
      __uv$config.sw,
      __uv$config.prefix,
      __uv$config.encodeUrl,
      __uv$config.decodeUrl
    );
    console.log('✅ Service Worker registrado');
  } catch (err) {
    console.error('❌ Error registrando SW:', err);
    document.getElementById('status').innerHTML = 
      `<p style="color:red">Error: ${err.message}</p>`;
  }
}

// Función de registro del Service Worker (proporcionada por uv.handler.js)
async function register(swUrl, prefix, encodeUrl, decodeUrl) {
  const sw = navigator.serviceWorker;
  
  // Cargar el handler primero
  await fetch(__uv$config.handler).then(r => r.text()).then(code => {
    const script = document.createElement('script');
    script.textContent = code;
    document.head.appendChild(script);
  });

  if (sw.controller) {
    return;
  }

  await sw.register(swUrl, { scope: prefix });
  await sw.controller;
}

// Manejar el formulario
document.getElementById('search-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  let url = document.getElementById('url-input').value.trim();
  
  // Si no empieza con http, añadirlo
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    // Si parece una búsqueda, usar Google
    if (!url.includes('.') || url.includes(' ')) {
      url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
    } else {
      url = 'https://' + url;
    }
  }
  
  // Esperar a que el SW esté listo
  if (!navigator.serviceWorker.controller) {
    document.getElementById('status').innerHTML = '<p>⏳ Registrando Service Worker...</p>';
    await registerSW();
  }
  
  // Codificar la URL y navegar
  const encodedUrl = __uv$config.prefix + __uv$config.encodeUrl(url);
  document.getElementById('status').innerHTML = '<p>🚀 Cargando...</p>';
  
  window.location.href = encodedUrl;
});

// Registrar SW al cargar la página
registerSW();
