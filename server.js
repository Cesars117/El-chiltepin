const path = require('path');

// Establecer el entorno a producción
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || 3000;
process.env.HOSTNAME = '0.0.0.0';

// Importar el servidor generado por Next.js en modo standalone
// Nota: Este archivo se crea después de ejecutar 'npm run build'
require(path.join(__dirname, '.next/standalone/server.js'));
