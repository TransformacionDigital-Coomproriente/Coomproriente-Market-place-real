import { Product, PriceHistory } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Papa Criolla',
    price: 2500,
    previousPrice: 2100,
    unit: 'kg',
    market: 'Duitama',
    category: 'Tubérculos',
    updatedAt: '2025-06-15',
    imageUrl: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg'
  },
  {
    id: '2',
    name: 'Cebolla Larga',
    price: 1800,
    previousPrice: 2200,
    unit: 'kg',
    market: 'Sogamoso',
    category: 'Hortalizas',
    updatedAt: '2025-06-14',
    imageUrl: 'https://images.pexels.com/photos/4197444/pexels-photo-4197444.jpeg'
  },
  {
    id: '3',
    name: 'Tomate Chonto',
    price: 3200,
    previousPrice: 2800,
    unit: 'kg',
    market: 'Tunja',
    category: 'Hortalizas',
    updatedAt: '2025-06-15',
    imageUrl: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg'
  },
  {
    id: '4',
    name: 'Plátano Hartón',
    price: 1500,
    previousPrice: 1500,
    unit: 'kg',
    market: 'Duitama',
    category: 'Frutas',
    updatedAt: '2025-06-13',
    imageUrl: 'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg'
  },
  {
    id: '5',
    name: 'Zanahoria',
    price: 1700,
    previousPrice: 1900,
    unit: 'kg',
    market: 'Sogamoso',
    category: 'Hortalizas',
    updatedAt: '2025-06-15',
    imageUrl: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg'
  },
  {
    id: '6',
    name: 'Yuca',
    price: 2100,
    previousPrice: 1800,
    unit: 'kg',
    market: 'Tunja',
    category: 'Tubérculos',
    updatedAt: '2025-06-14',
    imageUrl: 'https://images.pexels.com/photos/2363275/pexels-photo-2363275.jpeg'
  },
  {
    id: '7',
    name: 'Aguacate Hass',
    price: 5500,
    previousPrice: 4200,
    unit: 'kg',
    market: 'Duitama',
    category: 'Frutas',
    updatedAt: '2025-06-15',
    imageUrl: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg'
  },
  {
    id: '8',
    name: 'Frijol Bola Roja',
    price: 8200,
    previousPrice: 7800,
    unit: 'kg',
    market: 'Sogamoso',
    category: 'Leguminosas',
    updatedAt: '2025-06-13',
    imageUrl: 'https://images.pexels.com/photos/5945862/pexels-photo-5945862.jpeg'
  },
  {
    id: '9',
    name: 'Naranja Valencia',
    price: 2800,
    previousPrice: 3500,
    unit: 'kg',
    market: 'Tunja',
    category: 'Frutas',
    updatedAt: '2025-06-15',
    imageUrl: 'https://images.pexels.com/photos/42059/citrus-diet-food-fresh-42059.jpeg'
  },
  {
    id: '10',
    name: 'Arracacha',
    price: 3000,
    previousPrice: 2800,
    unit: 'kg',
    market: 'Duitama',
    category: 'Tubérculos',
    updatedAt: '2025-06-14',
    imageUrl: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg'
  },
  {
    id: '11',
    name: 'Arveja Verde',
    price: 4500,
    previousPrice: 4100,
    unit: 'kg',
    market: 'Sogamoso',
    category: 'Leguminosas',
    updatedAt: '2025-06-15',
    imageUrl: 'https://images.pexels.com/photos/209482/pexels-photo-209482.jpeg'
  },
  {
    id: '12',
    name: 'Maíz Amarillo',
    price: 1900,
    previousPrice: 2300,
    unit: 'kg',
    market: 'Tunja',
    category: 'Cereales',
    updatedAt: '2025-06-13',
    imageUrl: 'https://images.pexels.com/photos/1459331/pexels-photo-1459331.jpeg'
  }
];

export const priceHistory: PriceHistory[] = [
  { productId: '1', date: '2025-05-15', price: 1900 },
  { productId: '1', date: '2025-05-30', price: 2100 },
  { productId: '1', date: '2025-06-15', price: 2500 },
  
  { productId: '2', date: '2025-05-15', price: 2500 },
  { productId: '2', date: '2025-05-30', price: 2200 },
  { productId: '2', date: '2025-06-14', price: 1800 },
  
  { productId: '3', date: '2025-05-15', price: 2600 },
  { productId: '3', date: '2025-05-30', price: 2800 },
  { productId: '3', date: '2025-06-15', price: 3200 }
];

export const markets: string[] = ['Todos', 'Duitama', 'Sogamoso', 'Tunja'];
export const categories: string[] = ['Todos', 'Tubérculos', 'Hortalizas', 'Frutas', 'Leguminosas', 'Cereales'];