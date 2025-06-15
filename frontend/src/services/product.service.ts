import axios from 'axios';
import { Product } from '../types/Product.ts';
import { apiUrl } from '../utils/helpers.ts';

export async function getProducts(): Promise<Product[]> {
  // Obtener la fecha local de Bogotá (UTC-5)
  const now = new Date();
  const bogotaOffset = -5 * 60; // minutos
  const local = new Date(now.getTime() + (now.getTimezoneOffset() + bogotaOffset) * 60000);
  const today = local.toISOString().slice(0, 10);

  try {
    const response = await axios.get(`${apiUrl}/productos?fecha=${today}`);
    if (!response.data || !Array.isArray(response.data)) {
      console.error('Datos de productos no válidos:', response.data);
      return [];
    }
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
}