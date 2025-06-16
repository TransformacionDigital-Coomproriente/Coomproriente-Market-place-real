import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header.tsx';
import FilterBar from './components/FilterBar.tsx';
import ProductCard from './components/ProductCard.tsx';
import ProductTable from './components/ProductTable.tsx';
import ExportButton from './components/ExportButton.tsx';
import ViewToggle from './components/ViewToggle.tsx';
import Footer from './components/Footer.tsx';
import { markets, categories } from './data/products.ts';
import { getProducts } from './services/product.service.ts';
import { Product } from './types/Product.ts';
import Dashboard from './components/Dashboard/Dashboard.tsx';
import Navigation from './components/Navigation.tsx';

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  const [activeView, setActiveView] = useState<'products' | 'dashboard'>('products'); 

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedMarket, setSelectedMarket] = useState<string>('Todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [view, setView] = useState<'grid' | 'table'>('grid');

  useEffect(() => {
    const fetchProducts = async () => {
      const productos = await getProducts();
      console.log('Productos obtenidos:', productos);
      setProducts(productos);
    };

    fetchProducts();
  }, []);

  // Filter products based on search term and selected filters
const filteredProducts = useMemo(() => {
  return products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMarket = selectedMarket === 'Todos' || product.market === selectedMarket;
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;

    return matchesSearch && matchesMarket && matchesCategory;
  });
}, [products, searchTerm, selectedMarket, selectedCategory]);

  // Detect screen size and set view accordingly
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setView('grid');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
 <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <Navigation activeView={activeView} setActiveView={setActiveView} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {activeView === 'dashboard' ? (
          <Dashboard products={products} />
        ) : (
          <>
            <FilterBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedMarket={selectedMarket}
              setSelectedMarket={setSelectedMarket}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              markets={markets}
              categories={categories}
            />
            
            <div className="flex justify-between items-center mb-6">
              <div className="text-gray-700">
                <span className="font-medium">{filteredProducts.length}</span> productos encontrados
              </div>
              <div className="flex space-x-3">
                <ViewToggle view={view} setView={setView} />
                <ExportButton products={filteredProducts} />
              </div>
            </div>
            
            {view === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <ProductTable products={filteredProducts} />
            )}
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No se encontraron productos con los filtros seleccionados.</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedMarket('Todos');
                    setSelectedCategory('Todos');
                  }}
                  className="mt-4 px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;