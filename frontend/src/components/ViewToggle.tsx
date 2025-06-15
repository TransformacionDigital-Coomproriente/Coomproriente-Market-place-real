import React from 'react';
import { Grid, List } from 'lucide-react';

interface ViewToggleProps {
  view: 'grid' | 'table';
  setView: (view: 'grid' | 'table') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, setView }) => {
  return (
    <div className="flex bg-white rounded-md shadow-sm">
      <button
        onClick={() => setView('grid')}
        className={`flex items-center px-3 py-2 rounded-l-md transition-colors ${
          view === 'grid'
            ? 'bg-green-700 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
        aria-label="Ver en cuadrícula"
      >
        <Grid size={18} />
      </button>
      <button
        onClick={() => setView('table')}
        className={`flex items-center px-3 py-2 rounded-r-md transition-colors ${
          view === 'table'
            ? 'bg-green-700 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
        aria-label="Ver en tabla"
      >
        <List size={18} />
      </button>
    </div>
  );
};

export default ViewToggle;