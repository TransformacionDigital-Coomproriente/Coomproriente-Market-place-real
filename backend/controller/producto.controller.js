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

const obtenerTopCambios = (req, res) => {
  const fecha = req.query.fecha;
  if (!fecha) {
    return res.status(400).json({ error: 'Debe enviar el parámetro fecha (YYYY-MM-DD)' });
  }
  const data = productoService.getTopCambios(fecha);
  res.json(data);
};

const obtenerPreciosTiempo = (req, res) => {
  const fechaInicio = req.query.fechaInicio;
  const fechaFin = req.query.fechaFin;
  if (!fechaInicio || !fechaFin) {
    return res.status(400).json({ error: 'Debe enviar los parámetros fechaInicio y fechaFin (YYYY-MM-DD)' });
  }
  const Producto = req.query.producto;
  if (!Producto) {
    return res.status(400).json({ error: 'Debe enviar el parámetro producto' });
  }
  console.log(`[INFO] Obteniendo precios para el producto ${Producto} entre ${fechaInicio} y ${fechaFin}`);
  const data = productoService.getPreciosEnTiempo(fechaInicio, fechaFin, Producto);
  res.json(data);
};
const obtenerPromedioProducto = (req, res) => {
  const data = productoService.getPromedioPorProducto();
  res.json(data);
};

const obtenerVolatilidad = (req, res) => {
  const data = productoService.getProductosVolatiles();
  res.json(data);
};
const productosUnicos = (req, res) => {

  try {
    const productos = productoService.getNombreProductosUnicos();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: 'Error al procesar los productos únicos' });
  }
};
module.exports = {
  obtenerProductos,
  obtenerTopCambios,
  obtenerPreciosTiempo,
  obtenerPromedioProducto,
  obtenerVolatilidad,
  productosUnicos
};
