const productoInfo = {
  'Aguacate Papelillo': {
    unit: 'kg',
    category: 'Frutas',
    imageUrl: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg'
  },
  // TODO: Agrega aquí los demás productos con su info
};

function getProductoInfo(nombre) {
  return productoInfo[nombre] || {
    unit: 'kg',
    category: 'Otros',
    imageUrl: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg'
  };
}

module.exports = { getProductoInfo };
