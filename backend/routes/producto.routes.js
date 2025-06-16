const express = require('express');
const router = express.Router();
const productoController = require('../controller/producto.controller');

router.get('/', productoController.obtenerProductos);
router.get('/top-cambios', productoController.obtenerTopCambios);
router.get('/precios-tiempo', productoController.obtenerPreciosTiempo);
router.get('/promedio-producto', productoController.obtenerPromedioProducto);
router.get('/volatilidad', productoController.obtenerVolatilidad);
router.get('/productos-unicos', productoController.productosUnicos);
module.exports = router;
