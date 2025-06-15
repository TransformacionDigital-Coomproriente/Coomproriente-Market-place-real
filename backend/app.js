const express = require('express');
const app = express();

// Rutas
const productoRoutes = require('./routes/producto.routes');
app.use('/productos', productoRoutes);

module.exports = app;
