// src/context/ProductContext.tsx
import { createContext, useContext, useState, type ReactNode } from 'react';
import { type Product } from '../types/Product';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Gaming Laptop',
      description: 'High-performance laptop',
      price: 1500,
      quantity: 5,
      image: 'https://images.unsplash.com/photo-1611186871348-b8e1ab9d0ee5?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 2,
      name: 'Wireless Headphones',
      description: 'Noise-canceling headphones',
      price: 200,
      quantity: 10,
      image: 'https://images.unsplash.com/photo-1585386959984-a41552262c74?auto=format&fit=crop&w=600&q=80',
    },
  ]);

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const updateProduct = (updated: Product) => {
    setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProduct must be used within a ProductProvider');
  return context;
};
