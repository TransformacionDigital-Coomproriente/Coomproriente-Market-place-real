function formatFecha(fecha) {
  if (!fecha) return '';
  if (typeof fecha === 'string') {
    return fecha.slice(0, 10);
  }
  if (fecha instanceof Date) {
    return fecha.toISOString().slice(0, 10);
  }
  if (typeof fecha === 'number') {
    const jsDate = new Date(Math.round((fecha - 25569) * 86400 * 1000));
    return jsDate.toISOString().slice(0, 10);
  }
  return '';
}

module.exports = { formatFecha };
