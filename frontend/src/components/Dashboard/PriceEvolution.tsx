import React, { useState, useEffect } from 'react';
import { LineChart as LucideLineChart, Calendar, RefreshCw } from 'lucide-react';
import { PriceEvolution as PriceEvolutionType } from '../../types';
import { apiService } from '../../services/api.ts';
import { formatPrice, formatDate } from '../../utils/helpers.ts';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const MARKETS = [
  { key: 'Precio_Sogamoso', label: 'Sogamoso', color: '#10B981' },
  { key: 'Precio_Duitama', label: 'Duitama', color: '#3B82F6' },
  { key: 'Precio_Tunja', label: 'Tunja', color: '#F59E0B' },
  { key: 'Precio_Bogota', label: 'Bogotá', color: '#EF4444' },
];

const PriceEvolution: React.FC = () => {
  const [availableProducts, setAvailableProducts] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [startDate, setStartDate] = useState('2025-01-05');
  const [endDate, setEndDate] = useState('2025-06-05');
  const [priceData, setPriceData] = useState<{ [key: string]: PriceEvolutionType[] }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch available products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<string[]>('http://localhost:3001/productos/productos-unicos');
        setAvailableProducts(response.data);
        if (response.data.length > 0) setSelectedProduct(response.data[0]);
      } catch (err) {
        setAvailableProducts([]);
      }
    };
    fetchProducts();
  }, []);

  const fetchPriceEvolution = async () => {
    if (!selectedProduct) return;

    setLoading(true);
    setError(null);

    try {
      const data = await apiService.getPriceEvolution(selectedProduct, startDate, endDate);
      setPriceData({ [selectedProduct]: data });
    } catch (err) {
      setError('Error al cargar la evolución de precios');
      setPriceData({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      fetchPriceEvolution();
    }
    // eslint-disable-next-line
  }, [selectedProduct, startDate, endDate]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <LucideLineChart className="w-6 h-6 text-green-700 mr-3" />
        <h2 className="text-xl font-bold text-gray-900">Evolución de Precios por Producto</h2>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Product Combobox */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Seleccionar Producto
          </label>
          <select
            value={selectedProduct}
            onChange={e => setSelectedProduct(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-600 focus:border-transparent"
          >
            {availableProducts.map(product => (
              <option key={product} value={product}>{product}</option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Rango de Fechas
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Fecha Inicio</label>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Fecha Fin</label>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={fetchPriceEvolution}
          disabled={loading || !selectedProduct}
          className="flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-md transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Actualizar Datos
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin text-green-600" />
          <span className="ml-2 text-gray-600">Cargando evolución de precios...</span>
        </div>
      ) : (
        <div className="space-y-8">
          {selectedProduct && priceData[selectedProduct] && priceData[selectedProduct].length > 0 && (
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  {selectedProduct}
                </h3>
                <span className="text-sm text-gray-500">
                  {priceData[selectedProduct].length} registros de precio
                </span>
              </div>

              {/* Line Chart */}
              <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer>
                  <LineChart data={priceData[selectedProduct].map(entry => ({
                    Fecha: formatDate(entry.Fecha),
                    Sogamoso: entry.Precio_Sogamoso,
                    Duitama: entry.Precio_Duitama,
                    Tunja: entry.Precio_Tunja,
                    Bogotá: entry.Precio_Bogota,
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Fecha" tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={formatPrice} />
                    <Tooltip formatter={formatPrice} />
                    <Legend />
                    {MARKETS.map((market) => (
                      <Line
                        key={market.key}
                        type="monotone"
                        dataKey={market.label}
                        stroke={market.color}
                        strokeWidth={2}
                        dot={false}
                        name={market.label}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      )}

      {!loading && !selectedProduct && (
        <div className="text-center py-12">
          <LucideLineChart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Selecciona un producto para ver su evolución de precios.</p>
        </div>
      )}
    </div>
  );
};

export default PriceEvolution;