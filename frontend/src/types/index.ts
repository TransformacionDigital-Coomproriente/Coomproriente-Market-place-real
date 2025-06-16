export interface Product {
  id: string;
  name: string;
  price: number;
  previousPrice?: number;
  unit: string;
  market: string;
  category: string;
  updatedAt: string;
  imageUrl?: string;
}

export interface PriceHistory {
  productId: string;
  date: string;
  price: number;
}

export interface TopPriceChange {
  Fecha: string;
  Producto: string;
  Precio_Sogamoso: number;
  Precio_Tunja: number;
  Precio_Duitama: number;
  Precio_Bogotá: number;
  Promedio_Mercados: number;
  cambio: number;
  movimiento: 'subió' | 'bajó';
}

export interface PriceEvolution {
  Fecha: string;
  Precio_Sogamoso: number;
  Precio_Duitama: number;
  Precio_Tunja: number;
  Precio_Bogota: number;
}

export interface DashboardStats {
  totalProducts: number;
  averagePrice: number;
  priceIncreases: number;
  priceDecreases: number;
  lastUpdate: string;
}

export type Market = string;
export type Category = string;