import React, { useMemo } from 'react';
import { BarChart3 } from 'lucide-react';
import DashboardStats from './DashboardStats.tsx';
import TopPriceChanges from './TopPriceChanges.tsx';
import PriceEvolution from './PriceEvolution.tsx';
import { Product, DashboardStats as StatsType } from '../../types';
import PredictionDashboard from './PredictionDashboard.tsx';

interface DashboardProps {
  products: Product[];
}

const Dashboard: React.FC<DashboardProps> = ({ products }) => {
  const stats: StatsType = useMemo(() => {
    const totalProducts = products.length;
    const averagePrice = products.reduce((sum, product) => sum + product.price, 0) / totalProducts || 0;
    
    const priceIncreases = products.filter(product => {
      if (!product.previousPrice) return false;
      return product.price > product.previousPrice;
    }).length;
    
    const priceDecreases = products.filter(product => {
      if (!product.previousPrice) return false;
      return product.price < product.previousPrice;
    }).length;
    
    const lastUpdate = products.reduce((latest, product) => {
      return new Date(product.updatedAt) > new Date(latest) ? product.updatedAt : latest;
    }, products[0]?.updatedAt || new Date().toISOString().split('T')[0]);

    return {
      totalProducts,
      averagePrice,
      priceIncreases,
      priceDecreases,
      lastUpdate
    };
  }, [products]);

  return (
    <div className="space-y-8">
      <div className="flex items-center mb-6">
        <BarChart3 className="w-8 h-8 text-green-700 mr-3" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard de Análisis</h1>
          <p className="text-gray-600">Información clave sobre precios y tendencias del mercado</p>
        </div>
      </div>

      <DashboardStats stats={stats} />
      <TopPriceChanges />
      <PriceEvolution />
      <PredictionDashboard />
    </div>
  );
};

export default Dashboard;