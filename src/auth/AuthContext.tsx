// src/auth/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  username: string;
  email: string;
  address?: string;
  role: 'admin' | 'customer';
}

interface AuthContextType {
  user: User | null;
  login: (username: string) => boolean;
  logout: () => void;
  register: (username: string, email: string, password: string) => boolean;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const FAKE_USERS: Record<string, User> = {
  admin: { username: 'admin', email: 'admin@example.com', role: 'admin' },
  customer: { username: 'customer', email: 'customer@example.com', role: 'customer' },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string) => {
    const loggedUser = FAKE_USERS[username];
    if (loggedUser) {
      setUser(loggedUser);
      return true;
    }
    return false;
  };

  const register = (username: string, email: string, password: string) => {
    const newUser: User = { username, email, role: 'customer' };
    setUser(newUser);
    return true;
  };

  const updateProfile = (data: Partial<User>) => {
    setUser((prev) => prev ? { ...prev, ...data } : null);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
