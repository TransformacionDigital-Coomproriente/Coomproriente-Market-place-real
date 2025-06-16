import React from 'react';
import { BarChart3, Package } from 'lucide-react';

interface NavigationProps {
  activeView: 'products' | 'dashboard';
  setActiveView: (view: 'products' | 'dashboard') => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeView, setActiveView }) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveView('products')}
            className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeView === 'products'
                ? 'border-green-700 text-green-700'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Package className="w-4 h-4 mr-2" />
            Productos
          </button>
          <button
            onClick={() => setActiveView('dashboard')}
            className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeView === 'dashboard'
                ? 'border-green-700 text-green-700'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Dashboard
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;