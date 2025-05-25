// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './auth/AuthContext';
import { CartProvider } from './context/CartContect';
import { OrderProvider } from './context/OrderContext';
import { ProductProvider } from './context/ProductContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastProvider } from './context/ToastContext';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <ProductProvider>
          <ToastProvider>
            <App />
            </ToastProvider>
          </ProductProvider>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
