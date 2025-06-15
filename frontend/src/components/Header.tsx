import React from 'react';
import { Sprout } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-green-800 to-green-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <Sprout size={32} className="text-yellow-400 mr-3" />
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Coomproriente</h1>
            <p className="text-sm md:text-base text-green-100">Precios de Productos Agrícolas</p>
          </div>
        </div>
        <div className="text-sm md:text-base">
          <p className="text-green-100">Cooperativa Multiactiva del Oriente Colombiano</p>
          <p className="text-green-200 text-xs md:text-sm">Boyacá, Colombia</p>
        </div>
      </div>
    </header>
  );
};

export default Header;