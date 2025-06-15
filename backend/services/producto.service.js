const xlsx = require('xlsx');
const path = require('path');
const { formatFecha } = require('../utils/date.util');
const { getProductoInfo } = require('../utils/productoInfo.util');

const obtenerProductosPorFecha = (fecha) => {
  const workbook = xlsx.readFile(path.join(__dirname, '../data/df_Predicciones_completo_con_cambios.xlsx'));
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);

  const productosHoy = data.filter(row => formatFecha(row.ds) === fecha);

  const fechaAnterior = new Date(fecha);
  fechaAnterior.setDate(fechaAnterior.getDate() - 1);
  const fechaAnteriorStr = fechaAnterior.toISOString().slice(0, 10);
  const productosAyer = data.filter(row => formatFecha(row.ds) === fechaAnteriorStr);

  const precioAyer = {};
  productosAyer.forEach(row => {
    precioAyer[row.Producto] = row.yhat;
  });

  return productosHoy.map((row, idx) => {
    const info = getProductoInfo(row.Producto);
    return {
      id: (idx + 1).toString(),
      name: row.Producto,
      price: Math.round(row.yhat),
      previousPrice: precioAyer[row.Producto] ? Math.round(precioAyer[row.Producto]) : null,
      unit: info.unit,
      market: 'Sogamoso',
      category: info.category,
      updatedAt: fecha,
      imageUrl: info.imageUrl
    };
  });
};

module.exports = {
  obtenerProductosPorFecha
};
