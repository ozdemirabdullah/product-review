import React from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import ProductCard from './ProductCard';
import './App.css';

const products = [
  {
    id: 1,
    name: 'Ürün 1',
    price: '₺100',
    image: 'https://picsum.photos/300/200?random=1'
  },
  {
    id: 2,
    name: 'Ürün 2',
    price: '₺200',
    image: 'https://picsum.photos/300/200?random=2'
  },
  {
    id: 3,
    name: 'Ürün 3',
    price: '₺300',
    image: 'https://picsum.photos/300/200?random=3'
  },
  {
    id: 4,
    name: 'Ürün 4',
    price: '₺400',
    image: 'https://picsum.photos/300/200?random=4'
  }
];

const AppContent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <header>
        <h2>Ürünler</h2>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? 'Karanlık Mod' : 'Aydınlık Mod'}
        </button>
      </header>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
