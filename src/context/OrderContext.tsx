// src/context/OrderContext.tsx
import { createContext, useContext, useState,type  ReactNode } from 'react';
import type { CartItem } from "./CartContect";

interface Order {
  id: number;
  items: CartItem[];
  total: number;
  status: 'Placed' | 'Cancelled';
  date: string;
}

interface OrderContextType {
  orders: Order[];
  placeOrder: (items: CartItem[]) => void;
  cancelOrder: (id: number) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const placeOrder = (items: CartItem[]) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantityInCart, 0);
    const newOrder: Order = {
      id: Date.now(),
      items,
      total,
      status: 'Placed',
      date: new Date().toLocaleString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const cancelOrder = (id: number) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: 'Cancelled' } : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used within OrderProvider');
  return context;
};
