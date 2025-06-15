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

export type Market = string;
export type Category = string;