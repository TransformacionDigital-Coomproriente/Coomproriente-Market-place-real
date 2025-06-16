import React from 'react';
import { TrendingUp, TrendingDown, Package, Calendar } from 'lucide-react';
import { DashboardStats as StatsType } from '../../types';
import { formatPrice } from '../../utils/helpers.ts';

interface DashboardStatsProps {
  stats: StatsType;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Productos</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Precio Promedio</p>
            <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.averagePrice)}</p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Productos en Alza</p>
            <p className="text-2xl font-bold text-red-600">{stats.priceIncreases}</p>
          </div>
          <div className="p-3 bg-red-100 rounded-full">
            <TrendingUp className="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Productos en Baja</p>
            <p className="text-2xl font-bold text-green-600">{stats.priceDecreases}</p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <TrendingDown className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;