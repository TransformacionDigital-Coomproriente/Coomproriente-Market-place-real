const productoInfo = {
  'Aguacate Papelillo': { unit: 'kg', category: 'Frutas', imageUrl: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg' },
  'Ajo': { unit: 'kg', category: 'Hortalizas', imageUrl: 'https://images.pexels.com/photos/928251/pexels-photo-928251.jpeg' },
  'Arracacha Amarilla': { unit: 'kg', category: 'Tubérculos', imageUrl: 'https://la-canasta.org/wp-content/uploads/2019/02/Arracacha.jpg' },
  'Arveja Verde En Vaina': { unit: 'kg', category: 'Leguminosas', imageUrl: 'https://mercaldas.vtexassets.com/arquivos/ids/230396/arveja-verde-en-vaina_14762.jpg?v=637840692426900000' },
  'Banano Urabá': { unit: 'kg', category: 'Frutas', imageUrl: 'https://images.pexels.com/photos/2316466/pexels-photo-2316466.jpeg' },
  'Cebolla Cabezona Blanca': { unit: 'kg', category: 'Hortalizas', imageUrl: 'https://images.pexels.com/photos/533342/pexels-photo-533342.jpeg' },
  'Cebolla Cabezona Roja': { unit: 'kg', category: 'Hortalizas', imageUrl: 'https://sembrandoconfianza.com/wp-content/uploads/2022/04/Cebolla-Cabezona-Roja.jpg' },
  'Cilantro': { unit: 'kg', category: 'Hortalizas', imageUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSVjUyJJDXrchSMqeUiwbUWPwyAI9pCqMcRkyCT2BVc29UGbvhKERl4XuTTL_GxbHJ7azgQ8NGgS2bgAsLQ5Z38gg' },
  'Durazno Nacional': { unit: 'kg', category: 'Frutas', imageUrl: 'https://mrbatatacolombia.com/wp-content/uploads/2022/01/durazno-1.png' },
  'Espinaca': { unit: 'kg', category: 'Hortalizas', imageUrl: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg' },
  'Feijoba': { unit: 'kg', category: 'Leguminosas', imageUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSrn5kUdHq95ofpkpQEnqb3EOoOPMDE9gVziO5N5qqgT7RuCiL4uetYgisBNqE54je9PH_HvTq8V5BDgqhlVGJj-A' },
  'Fresa': { unit: 'kg', category: 'Frutas', imageUrl: 'https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg' },
  'Guanabana': { unit: 'kg', category: 'Frutas', imageUrl: 'https://5.imimg.com/data5/SG/ML/UF/SELLER-93281374/soursop-500x500.jpg' },
  'Habichuela': { unit: 'kg', category: 'Leguminosas', imageUrl: 'https://olimpica.vtexassets.com/arquivos/ids/865395-600-auto?v=637908071268630000&width=600&height=auto&aspect=true' },
  'Limon Tahití': { unit: 'kg', category: 'Frutas', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRJH0e9zWSuyjbroaowDyR7XgNPhbFpmxmPbvmyRdFSHk5PngZs2iQzXJUjjABpKsjah-qEX5AU1eT5ijHczzNopg' },
  'Lulo': { unit: 'kg', category: 'Frutas', imageUrl: 'https://imag.bonviveur.com/frutos-de-lulo-cortados-por-la-mitad.jpg' },
  'Mandarina': { unit: 'kg', category: 'Frutas', imageUrl: 'https://images.pexels.com/photos/327098/pexels-photo-327098.jpeg' },
  'Mango Azucar': { unit: 'kg', category: 'Frutas', imageUrl: 'https://mercadomadrid.com.co/11039-superlarge_default_2x/mango-azucar-kilo.jpg' },
  'Mango Común': { unit: 'kg', category: 'Frutas', imageUrl: 'https://solofruver.com/wp-content/uploads/2020/06/mango-comun.jpg' },
  'Mango Tommy': { unit: 'kg', category: 'Frutas', imageUrl: 'https://olimpica.vtexassets.com/arquivos/ids/1156411-600-auto?v=638312526798570000&width=600&height=auto&aspect=true' },
  'Manzana Nacional': { unit: 'kg', category: 'Frutas', imageUrl: 'https://nativoalimentos.co/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MTQ4NzgxNCwicHVyIjoiYmxvYl9pZCJ9fQ==--7c40875c7f82f5b21ff36bbdffd4d724c15b6252/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fZml0IjpbODAwLDgwMF19LCJwdXIiOiJ2YXJpYXRpb24ifX0=--cef66509c9cdc75663c0eefd9421db1d2ea4fead/manzana-criolla-domicilio-peque%C3%B1a-%20medellin.png?locale=es' },
  'Manzana Roja Importada': { unit: 'kg', category: 'Frutas', imageUrl: 'https://imarkt.co/wp-content/uploads/2024/08/Manzana-Roja-Importada-A-Domicilio.png.webp' },
  'Manzana Verde Importada': { unit: 'kg', category: 'Frutas', imageUrl: 'https://images.rappi.com/products/980554788565_hmfpuhcmbqhq_409641582404_jykaavknxcfr_2474910_1.png' },
  'Maracuyá': { unit: 'kg', category: 'Frutas', imageUrl: 'https://tienda.frutaseloy.com/wp-content/uploads/2024/07/maracuya-cortado-en-dos.png.webp' },
  'Melon': { unit: 'kg', category: 'Frutas', imageUrl: 'https://mercasur.com.co/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6NTQ2MDYwLCJwdXIiOiJibG9iX2lkIn19--515536a48ecab5273db62a4da37bdd35d0db1997/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJqcGciLCJyZXNpemVfdG9fZml0IjpbODAwLDgwMF19LCJwdXIiOiJ2YXJpYXRpb24ifX0=--1420d7fd3d20057726f0ef3c0043db24ca0403be/emlon.jpg?locale=es' },
  'Mora De Castilla': { unit: 'kg', category: 'Frutas', imageUrl: 'https://www.comervipc.com/wp-content/uploads/2020/04/Mora_de_castilla_comervipc.jpg' },
  'Naranja Comun': { unit: 'kg', category: 'Frutas', imageUrl: 'https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg' },
  'Naranja Valencia': { unit: 'kg', category: 'Frutas', imageUrl: 'https://s3.amazonaws.com/takami.co/thumbnails/productimage/90acfaf6b1f8498897c184547898db9a/8zru6rsctmekhba8c3rbkz_1280_800.jpg' },
  'Papa Criolla Limpia': { unit: 'kg', category: 'Tubérculos', imageUrl: 'https://olimpica.vtexassets.com/arquivos/ids/1156527-600-auto?v=638312532629400000&width=600&height=auto&aspect=true' },
  'Papaya Maradol': { unit: 'kg', category: 'Frutas', imageUrl: 'https://www.semillasdelcaribe.com.mx/wp-content/uploads/Maradol-Fruta.png' },
  'Pepino Cohombro': { unit: 'kg', category: 'Hortalizas', imageUrl: 'https://images.pexels.com/photos/37528/cucumber-salad-food-healthy-37528.jpeg' },
  'Perejil': { unit: 'kg', category: 'Hortalizas', imageUrl: 'https://www.onegirlonekitchen.com/wp-content/uploads/2022/09/leftover-parsley-ideas-3.jpg' },
  'Pimentón': { unit: 'kg', category: 'Hortalizas', imageUrl: 'https://images.pexels.com/photos/128536/pexels-photo-128536.jpeg' },
  'Piña Gold': { unit: 'kg', category: 'Frutas', imageUrl: 'https://images.pexels.com/photos/947879/pexels-photo-947879.jpeg' },
  'Remolacha': { unit: 'kg', category: 'Hortalizas', imageUrl: 'https://megaredil.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6NTIzOCwicHVyIjoiYmxvYl9pZCJ9fQ==--029b2107d8ea3c68271f627676f7ef644c0318d6/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJqcGciLCJyZXNpemVfdG9fZml0IjpbODAwLDgwMF19LCJwdXIiOiJ2YXJpYXRpb24ifX0=--1420d7fd3d20057726f0ef3c0043db24ca0403be/remolacha.jpg?locale=es' },
  'Repollo Verde': { unit: 'kg', category: 'Hortalizas', imageUrl: 'https://mercadoslpineda.co/2768-thickbox_default/repollo-verde.jpg' },
  'Tomate Chonto': { unit: 'kg', category: 'Hortalizas', imageUrl: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg' },
  'Uva Isabelita': { unit: 'kg', category: 'Frutas', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTIa-_ZcNvy_v1f6ka_QPbymXfgKrlUwsJZT2pdzLhtfRhKMwuw87RAO27p3ZphoxndWA8vO3fYY-4UNWV5bDHIQ' },
  'Yuca Llanera': { unit: 'kg', category: 'Tubérculos', imageUrl: 'https://marcallanera.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MjcyOTcsInB1ciI6ImJsb2JfaWQifX0=--581ad39c172b29254bfe0704b2cc643c8e025976/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fZml0IjpbNjAwLDYwMF19LCJwdXIiOiJ2YXJpYXRpb24ifX0=--db42ba722be1e76788976c3dae164d352f833ae3/Yuca%20LLanera.png?locale=es' },
  'Zanahoria': { unit: 'kg', category: 'Hortalizas', imageUrl: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg' }
};


function getProductoInfo(nombre) {
  return productoInfo[nombre] || {
    unit: 'kg',
    category: 'Otros',
    imageUrl: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg'
  };
}

module.exports = { getProductoInfo };
