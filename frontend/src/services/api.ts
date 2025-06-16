import { TopPriceChange, PriceEvolution } from '../types';

const API_BASE_URL = 'http://localhost:3001';

export const apiService = {
  async getTopPriceChanges(fecha: string): Promise<TopPriceChange[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/productos/top-cambios?fecha=${fecha}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching top price changes:', error);
      // Return mock data for development/demo purposes
      
    }
  },

  async getPriceEvolution(producto: string, fechaInicio: string, fechaFin: string): Promise<PriceEvolution[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/productos/precios-tiempo?producto=${encodeURIComponent(producto)}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching price evolution:', error);
      // Return mock data for development/demo purposes
      return getMockPriceEvolution(producto);
    }
  }
};

// Mock data for development/demo purposes

const getMockPriceEvolution = (producto: string): PriceEvolution[] => {
  // Generate mock data based on the product
  const basePrice = producto === 'Ajo' ? 4500 : producto === 'Fresa' ? 8000 : 6000;
  const data: PriceEvolution[] = [];
  
  const startDate = new Date('2025-01-05');
  const endDate = new Date('2025-06-05');
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 7)) {
    const variation = (Math.random() - 0.5) * 1000;
    const bogotaVariation = Math.random() > 0.7 ? Math.random() * 15000 : 0; // Occasional high prices in Bogotá
    
    data.push({
      Fecha: d.toISOString().split('T')[0],
      Precio_Sogamoso: Math.round(basePrice + variation + (Math.random() - 0.5) * 200),
      Precio_Duitama: Math.round(basePrice + variation + (Math.random() - 0.5) * 300),
      Precio_Tunja: Math.round(basePrice + variation + (Math.random() - 0.5) * 250),
      Precio_Bogota: Math.round(basePrice + variation + bogotaVariation + (Math.random() - 0.5) * 200)
    });
  }
  
  return data;
};