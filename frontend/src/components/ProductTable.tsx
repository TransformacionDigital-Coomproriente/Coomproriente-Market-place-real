import React from 'react';
import { Product } from '../types';
import { formatPrice, formatDate, calculatePriceChange, isPriceAlert } from '../utils/helpers.ts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ProductTableProps {
  products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-green-700 text-white text-left">
            <th className="py-3 px-4 font-semibold">Producto</th>
            <th className="py-3 px-4 font-semibold">Categoría</th>
            <th className="py-3 px-4 font-semibold">Precio</th>
            <th className="py-3 px-4 font-semibold">Variación</th>
            <th className="py-3 px-4 font-semibold">Mercado</th>
            <th className="py-3 px-4 font-semibold">Actualizado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => {
            const priceChange = calculatePriceChange(product.price, product.previousPrice);
            const isAlert = isPriceAlert(priceChange);
            
            let PriceIcon = Minus;
            let priceColorClass = 'text-gray-500';
            
            if (priceChange > 0) {
              PriceIcon = TrendingUp;
              priceColorClass = isAlert ? 'text-red-600 font-semibold' : 'text-red-500';
            } else if (priceChange < 0) {
              PriceIcon = TrendingDown;
              priceColorClass = isAlert ? 'text-green-600 font-semibold' : 'text-green-500';
            }

            return (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    {product.imageUrl && (
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-8 h-8 rounded-full object-cover mr-3"
                      />
                    )}
                    <span className="font-medium text-gray-800">{product.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">{product.category}</td>
                <td className="py-3 px-4 font-semibold">{formatPrice(product.price)} / {product.unit}</td>
                <td className="py-3 px-4">
                  <div className={`flex items-center ${priceColorClass}`}>
                    <PriceIcon size={16} className="mr-1" />
                    <span>{Math.abs(priceChange).toFixed(1)}%</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">{product.market}</td>
                <td className="py-3 px-4 text-gray-600">{formatDate(product.updatedAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;