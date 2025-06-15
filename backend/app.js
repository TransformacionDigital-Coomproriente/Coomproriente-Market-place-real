const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
// Rutas
const productoRoutes = require('./routes/producto.routes');
app.use('/productos', productoRoutes);

module.exports = app;
