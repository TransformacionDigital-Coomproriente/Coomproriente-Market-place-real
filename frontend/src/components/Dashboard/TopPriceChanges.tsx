import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Calendar, RefreshCw } from 'lucide-react';
import { TopPriceChange } from '../../types';
import { apiService } from '../../services/api.ts';
import { formatPrice, formatDate } from '../../utils/helpers.ts';

const TopPriceChanges: React.FC = () => {
  const [priceChanges, setPriceChanges] = useState<TopPriceChange[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('2025-06-05');
  const [error, setError] = useState<string | null>(null);

  const fetchPriceChanges = async (fecha: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getTopPriceChanges(fecha);
      setPriceChanges(data);
    } catch (err) {
      setError('Error al cargar los cambios de precios');
      console.error('Error fetching price changes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPriceChanges(selectedDate);
  }, [selectedDate]);

  const handleRefresh = () => {
    fetchPriceChanges(selectedDate);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 sm:mb-0">
          Productos con Mayor Cambio de Precio
        </h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 bg-green-700 hover:bg-green-800 text-white rounded-md transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Actualizar</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <RefreshCw className="w-8 h-8 animate-spin text-green-600" />
          <span className="ml-2 text-gray-600">Cargando datos...</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Producto</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Precio Promedio</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Cambio</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Movimiento</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Mercados</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {priceChanges.map((item, index) => {
                const isPositive = item.movimiento === 'subió';
                const changePercentage = Math.abs((item.cambio / (item.Promedio_Mercados - item.cambio)) * 100);
                
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{item.Producto}</div>
                      <div className="text-sm text-gray-500">{formatDate(item.Fecha)}</div>
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      {formatPrice(item.Promedio_Mercados)}
                    </td>
                    <td className="py-3 px-4">
                      <div className={`flex items-center ${isPositive ? 'text-red-600' : 'text-green-600'}`}>
                        {isPositive ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        <span className="font-medium">
                          {formatPrice(Math.abs(item.cambio))} ({changePercentage.toFixed(1)}%)
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        isPositive 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {item.movimiento}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        <div>Sogamoso: {formatPrice(item.Precio_Sogamoso)}</div>
                        <div>Tunja: {formatPrice(item.Precio_Tunja)}</div>
                        <div>Duitama: {formatPrice(item.Precio_Duitama)}</div>
                        <div>Bogotá: {formatPrice(item.Precio_Bogotá)}</div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {!loading && priceChanges.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No se encontraron cambios de precios para la fecha seleccionada.</p>
        </div>
      )}
    </div>
  );
};

export default TopPriceChanges;