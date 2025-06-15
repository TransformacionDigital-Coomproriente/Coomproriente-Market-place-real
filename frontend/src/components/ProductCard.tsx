import React from 'react';
import { Product } from '../types';
import { formatPrice, formatDate, calculatePriceChange, isPriceAlert } from '../utils/helpers.ts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const priceChange = calculatePriceChange(product.price, product.previousPrice);
  const isAlert = isPriceAlert(priceChange);
  
  let PriceIcon = Minus;
  let priceColorClass = 'text-gray-500';
  
  if (priceChange > 0) {
    PriceIcon = TrendingUp;
    priceColorClass = isAlert ? 'text-red-600' : 'text-red-500';
  } else if (priceChange < 0) {
    PriceIcon = TrendingDown;
    priceColorClass = isAlert ? 'text-green-600' : 'text-green-500';
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      {product.imageUrl && (
        <div className="h-36 overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
            {product.category}
          </span>
        </div>
        
        <div className="flex items-center mb-2">
          <span className="text-2xl font-bold text-gray-900 mr-2">
            {formatPrice(product.price)}
          </span>
          <span className="text-sm text-gray-500">/ {product.unit}</span>
          
          <div className={`ml-auto flex items-center ${priceColorClass}`}>
            <PriceIcon size={16} className="mr-1" />
            <span className="text-sm font-medium">
              {Math.abs(priceChange).toFixed(1)}%
            </span>
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600 mt-3">
          <div>
            <span className="block text-gray-500">Mercado</span>
            <span className="font-medium">{product.market}</span>
          </div>
          <div className="text-right">
            <span className="block text-gray-500">Actualizado</span>
            <span className="font-medium">{formatDate(product.updatedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;