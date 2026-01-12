import React from 'react';
import { useTheme } from './ThemeContext';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  features: string[];
}

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose }) => {
  const { theme } = useTheme();

  if (!product) return null;

  return (
    <div className={`modal-overlay ${theme}`} onClick={onClose}>
      <div className={`modal-content ${theme}`} onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <img src={product.image} alt={product.name} className="modal-image" />
        <h2>{product.name}</h2>
        <p className="modal-price">{product.price}</p>
        <p className="modal-description">{product.description}</p>
        <h3>Özellikler:</h3>
        <ul className="modal-features">
          {product.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetail;