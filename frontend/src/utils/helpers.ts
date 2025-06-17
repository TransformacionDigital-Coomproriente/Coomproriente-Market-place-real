import { Product } from '../types';

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

export const formatDate = (dateString: string): string => {

  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day); // Mes base 0
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export const calculatePriceChange = (current: number, previous?: number): number => {
  if (!previous) return 0;
  return ((current - previous) / previous) * 100;
};

export const isPriceAlert = (priceChange: number): boolean => {
  return Math.abs(priceChange) >= 20;
};

export const exportToCSV = (products: Product[]): void => {
  const header = ['Nombre', 'Precio', 'Unidad', 'Mercado', 'Categoría', 'Fecha de Actualización'];
  
  const rows = products.map(product => [
    product.name,
    product.price.toString(),
    product.unit,
    product.market,
    product.category,
    product.updatedAt
  ]);
  
  const csvContent = [
    header.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.setAttribute('href', url);
  link.setAttribute('download', `precios-coomproriente-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const apiUrl = process.env.REACT_APP_API_URL;

export const apiUrl_prueba = 'http://localhost:3001';