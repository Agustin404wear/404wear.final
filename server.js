require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const app = express();

// Seguridad con Helmet
app.use(helmet());

// CORS con dominio desde .env o permitir todo si no está definido
app.use(cors({
  origin: process.env.DOMAIN || '*'
}));

app.use(express.json());

// Servir archivos estáticos de la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para pedidos
app.post('/api/pedido', (req, res) => {
  console.log('Pedido recibido:', req.body);
  // Aquí puedes validar los datos de req.body para más seguridad
  res.json({ mensaje: '¡Pedido recibido correctamente!' });
});

// Cualquier otra ruta sirve el index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Puerto configurado en .env o 3000 por defecto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});