import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import { LanguageProvider, useLanguage } from './LanguageContext';
import ProductCard from './ProductCard';
import ProductDetail from './ProductDetail';
import './App.css';

const AppContent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [visibleProducts, setVisibleProducts] = useState(8);

  // Generate 40 products with random data
  const allProducts = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    name: language === 'tr' ? `Ürün ${i + 1}` : `Product ${i + 1}`,
    price: `₺${(Math.floor(Math.random() * 500) + 50) * 10}`,
    image: `https://picsum.photos/300/200?random=${i + 1}`,
    description: language === 'tr' 
      ? `Bu ${i + 1}. ürünün açıklaması. Yüksek kaliteli ve dayanıklı.`
      : `Description for product ${i + 1}. High quality and durable.`,
    features: language === 'tr'
      ? [`Özellik ${i + 1}-1`, `Özellik ${i + 1}-2`, `Özellik ${i + 1}-3`]
      : [`Feature ${i + 1}-1`, `Feature ${i + 1}-2`, `Feature ${i + 1}-3`]
  }));

  const products = allProducts.slice(0, visibleProducts);

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleLoadMore = () => {
    setVisibleProducts(prev => Math.min(prev + 8, 40));
  };

  return (
    <div className={`app ${theme}`}>
      <header>
        <h2>{t('products')}</h2>
        <div className="header-buttons">
          <button onClick={toggleLanguage} className="language-toggle">
            {language === 'tr' ? 'EN' : 'TR'}
          </button>
          <button onClick={toggleTheme} className={`theme-toggle ${theme === 'light' ? 'light-mode-button' : 'dark-mode-button'}`}>
            {theme === 'light' ? t('darkMode') : t('lightMode')}
          </button>
        </div>
      </header>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product)} />
        ))}
      </div>
      {visibleProducts < 40 && (
        <div className="load-more-container">
          <button onClick={handleLoadMore} className="load-more-button">
            {language === 'tr' ? 'Daha Fazla Yükle' : 'Load More'}
          </button>
        </div>
      )}
      <ProductDetail product={selectedProduct} onClose={handleCloseModal} />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
