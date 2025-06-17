import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, BarChart3, RefreshCw } from 'lucide-react';
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
import { apiUrl, apiUrl_prueba } from '../../utils/helpers.ts';

interface Prediccion {
  Fecha: string;
  Producto: string;
  Prediccion: number;
  Minimo: number;
  Maximo: number;
  Cambio: number | null;
  Movimiento: string;
}

const PredictionDashboard: React.FC = () => {
  const [productos, setProductos] = useState<string[]>([]);
  const [producto, setProducto] = useState<string>('');
  const [inicio, setInicio] = useState('2025-06-06');
  const [fin, setFin] = useState('2025-06-10');
  const [predicciones, setPredicciones] = useState<Prediccion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`${apiUrl}/productos/productos-unicos`)
      .then((res) => {
        setProductos(res.data);
        if (res.data.length > 0) setProducto(res.data[0]);
      })
      .catch(() => setProductos([]));
  }, []);

  const fetchPredicciones = async () => {
    if (!producto) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${apiUrl}/productos/predicciones-tiempo`, {
        params: { producto, inicio, fin },
      });
      setPredicciones(response.data);
    } catch (e) {
      setError('Error al cargar las predicciones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (producto) fetchPredicciones();
  }, [producto, inicio, fin]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <BarChart3 className="w-6 h-6 text-indigo-700 mr-3" />
        <h2 className="text-xl font-bold text-gray-900">Predicciones de Precios</h2>
      </div>

      {/* Controles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Producto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar Producto</label>
          <select
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          >
            {productos.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Fechas */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Fecha Inicio</label>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="date"
                value={inicio}
                onChange={(e) => setInicio(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Fecha Fin</label>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="date"
                value={fin}
                onChange={(e) => setFin(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Botón Actualizar */}
      <div className="flex justify-end mb-6">
        <button
          onClick={fetchPredicciones}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-md"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Actualizar Datos
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-600">{error}</p>}

      {/* Gráfico */}
      {predicciones.length > 0 && (
        <div className="border p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">{producto}</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={predicciones}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Fecha" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Prediccion" stroke="#6366f1" name="Predicción" />
              <Line type="monotone" dataKey="Minimo" stroke="#10b981" name="Mínimo" />
              <Line type="monotone" dataKey="Maximo" stroke="#ef4444" name="Máximo" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default PredictionDashboard;
