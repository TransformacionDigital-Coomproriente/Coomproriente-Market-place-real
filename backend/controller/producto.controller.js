const productoService = require('../services/producto.service');

const obtenerProductos = (req, res) => {
  const fecha = req.query.fecha;
  if (!fecha) {
    return res.status(400).json({ error: 'Debe enviar el parámetro fecha (YYYY-MM-DD)' });
  }

  try {
    const productos = productoService.obtenerProductosPorFecha(fecha);
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: 'Error al procesar los productos' });
  }
};

module.exports = {
  obtenerProductos
};
