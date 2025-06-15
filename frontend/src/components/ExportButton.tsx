import React from 'react';
import { Download } from 'lucide-react';
import { Product } from '../types';
import { exportToCSV } from '../utils/helpers.ts';

interface ExportButtonProps {
  products: Product[];
}

const ExportButton: React.FC<ExportButtonProps> = ({ products }) => {
  const handleExport = () => {
    exportToCSV(products);
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-md transition-colors shadow-sm"
    >
      <Download size={18} />
      <span>Exportar CSV</span>
    </button>
  );
};

export default ExportButton;