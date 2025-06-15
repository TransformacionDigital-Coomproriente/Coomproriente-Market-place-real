const express = require('express');
const router = express.Router();
const productoController = require('../controller/producto.controller');

router.get('/', productoController.obtenerProductos);

module.exports = router;
