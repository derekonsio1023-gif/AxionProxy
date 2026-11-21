// ⚠️ REEMPLAZA con la URL de tu backend en Render
const BACKEND_URL = 'https://uv-backend-1aea.onrender.com';

self.__uv$config = {
  prefix: '/service/',
  bare: BACKEND_URL + '/bare/',
  encodeUrl: function(str) {
    if (!str) return str;
    return encodeURIComponent(
      str.toString().split('').map((char, i) => 
        String.fromCharCode(char.charCodeAt(0) ^ (i % 10))
      ).join('')
    );
  },
  decodeUrl: function(str) {
    if (!str) return str;
    str = decodeURIComponent(str);
    return str.split('').map((char, i) => 
      String.fromCharCode(char.charCodeAt(0) ^ (i % 10))
    ).join('');
  },
  handler: BACKEND_URL + '/uv/uv.handler.js',
  bundle: BACKEND_URL + '/uv/uv.bundle.js',
  config: BACKEND_URL + '/uv/uv.config.js',
  sw: BACKEND_URL + '/uv/uv.sw.js',
};
