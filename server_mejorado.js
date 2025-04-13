
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const Joi = require('joi'); // Para validación
const app = express();

// Seguridad con Helmet
app.use(helmet());

// CORS seguro: solo se permite el dominio configurado
const corsOptions = {
  origin: process.env.DOMAIN || 'http://localhost:3000',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

// Servir archivos estáticos de la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Validación de pedidos con Joi
const pedidoSchema = Joi.object({
  nombre: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  producto: Joi.string().required(),
  cantidad: Joi.number().integer().min(1).required()
});

// Endpoint para pedidos
app.post('/api/pedido', (req, res, next) => {
  const { error, value } = pedidoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: 'Datos inválidos', detalles: error.details });
  }

  console.log('Pedido recibido y validado:', value);
  res.json({ mensaje: '¡Pedido recibido correctamente!' });
});

// Cualquier otra ruta sirve el index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error interno:', err);
  res.status(500).json({ error: 'Error del servidor' });
});

// Puerto configurado en .env o 3000 por defecto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
