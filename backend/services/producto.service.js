const xlsx = require('xlsx');
const path = require('path');
const { formatFecha } = require('../utils/date.util');
const { getProductoInfo } = require('../utils/productoInfo.util');
const { groupBy, mean, std } = require('../utils/math.util');

// Cargar datos desde Excel
function excelDateToISO(dateNumber) {
  const parsed = xlsx.SSF.parse_date_code(dateNumber);
  if (!parsed) return null;
  const { y, m, d } = parsed;
  return new Date(Date.UTC(y, m - 1, d)).toISOString().slice(0, 10);
}

const rutaExcel = path.join(__dirname, '../data/df_completo_con_cambios.xlsx');
let rawData = [];

try {
  const workbook_completo = xlsx.readFile(rutaExcel);
  const sheet = workbook_completo.Sheets[workbook_completo.SheetNames[0]];
  rawData = xlsx.utils.sheet_to_json(sheet).map(row => ({
    ...row,
    Fecha: excelDateToISO(row.Fecha),
    cambio: typeof row.cambio === 'string' ? parseFloat(row.cambio) : row.cambio
  }));
  console.log(`[INFO] Datos cargados correctamente desde ${rutaExcel}`);
} catch (error) {
  console.error(`[ERROR] No se pudo cargar el archivo Excel: ${rutaExcel}`);
  console.error(error);
}

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
const getTopCambios = (fecha) => {
  console.log(`[INFO] Cantidad de registros cargados: ${rawData.length}`);
  if (!rawData || rawData.length === 0) {
    throw new Error('No se han cargado los datos desde el archivo Excel');
  }
  if (!fecha) {
    throw new Error('Debe enviar el parámetro fecha (YYYY-MM-DD)');
  }
  console.log(`[INFO] Obteniendo top cambios para la fecha: ${fecha}`);
  const datosFiltrados = rawData
    .filter(row => row.Fecha === fecha && typeof row.cambio === 'number' && !isNaN(row.cambio));

  return datosFiltrados
    .sort((a, b) => Math.abs(b.cambio) - Math.abs(a.cambio))
    .slice(0, 10);
};

const getPromedioPorProducto = () => {
  const grouped = groupBy(rawData, 'Producto');
  return Object.entries(grouped).map(([producto, registros]) => ({
    producto,
    promedio: mean(registros.map(r => r.Promedio_Mercados))
  }));
};

const getProductosVolatiles = () => {
  const grouped = groupBy(rawData, 'Producto');
  return Object.entries(grouped)
    .map(([producto, registros]) => ({
      producto,
      volatilidad: std(registros.map(r => r.Promedio_Mercados))
    }))
    .sort((a, b) => b.volatilidad - a.volatilidad)
    .slice(0, 10);
};

const getPreciosEnTiempo = (fechaInicio, fechaFin, Producto) => {

  const data = rawData.filter(row => {
    const fecha = new Date(row.Fecha);
    return row.Producto === Producto &&
      fecha >= new Date(fechaInicio) &&
      fecha <= new Date(fechaFin);
  });

  if (data.length === 0) {
    throw new Error(`No se encontraron datos para el producto ${Producto} entre ${fechaInicio} y ${fechaFin}`);
  }
  console.log(`[INFO] Cantidad de registros encontrados: ${data.length}`);
  data.sort((a, b) => new Date(a.Fecha) - new Date(b.Fecha));
  console.log(`[INFO] Datos ordenados por fecha`);
  console.log(`[INFO] Cantidad de registros después de ordenar: ${JSON.stringify(data)}`);
  return data.map(row => ({
    Fecha: row.Fecha,
    Precio_Sogamoso: row.Precio_Sogamoso,
    Precio_Duitama: row.Precio_Duitama,
    Precio_Tunja: row.Precio_Tunja,
    Precio_Bogota: row.Precio_Bogotá,
  }));    
}
const getNombreProductosUnicos = () => {
  const productosUnicos = new Set();
  rawData.forEach(row => {
    if (row.Producto) {
      productosUnicos.add(row.Producto);
    }
  });
  return Array.from(productosUnicos);
}

const getPrediccionesEnTiempo = (fechaInicio, fechaFin, Producto) => {
  const workbook = xlsx.readFile(path.join(__dirname, '../data/df_Predicciones_completo_con_cambios.xlsx'));
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const dataExcel = xlsx.utils.sheet_to_json(sheet, { defval: null });

  // Normalizar datos con coma decimal
  const data = dataExcel.map(row => ({
    ...row,
    ds: typeof row.ds === 'number'
     ? new Date(Date.UTC(1900, 0, row.ds - 1))
     : new Date(row.ds),
    yhat: parseFloat((row.yhat || "").toString().replace(',', '.')),
    yhat_lower: parseFloat((row.yhat_lower || "").toString().replace(',', '.')),
    yhat_upper: parseFloat((row.yhat_upper || "").toString().replace(',', '.')),
    cambio: row.cambio !== null && row.cambio !== undefined
      ? parseFloat((row.cambio || "").toString().replace(',', '.'))
      : null,
    movimiento: row.movimiento
  }));


  const filtrados = data.filter(row => {
    const fecha = new Date(row.ds);
    return row.Producto === Producto &&
      fecha >= new Date(fechaInicio) &&
      fecha <= new Date(fechaFin);
  });

  if (filtrados.length === 0) {
    throw new Error(`No se encontraron predicciones para el producto ${Producto} entre ${fechaInicio} y ${fechaFin}`);
  }

  filtrados.sort((a, b) => new Date(a.ds) - new Date(b.ds));

  return filtrados.map(row => ({
    Fecha: formatFecha(row.ds),
    Producto: row.Producto,
    Prediccion: row.yhat,
    Minimo: row.yhat_lower,
    Maximo: row.yhat_upper,
    Cambio: row.cambio ?? null,
    Movimiento: row.movimiento ?? "sin datos"
  }));
};



module.exports = {
  obtenerProductosPorFecha,
  getTopCambios,
  getPromedioPorProducto,
  getProductosVolatiles,
  getPreciosEnTiempo,
  getNombreProductosUnicos,
  getPrediccionesEnTiempo
};
