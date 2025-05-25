// src/auth/AuthContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

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

const STORAGE_KEY = 'ecom_user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // ✅ Load user from localStorage on startup
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = (username: string) => {
    const loggedUser = FAKE_USERS[username];
    if (loggedUser) {
      setUser(loggedUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser)); // ✅ persist
      return true;
    }
    return false;
  };

  const register = (username: string, email: string, password: string) => {
    const newUser: User = { username, email, role: 'customer' };
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    return true;
  };

  const updateProfile = (data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); // ✅ persist update
      return updated;
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY); // ✅ remove from storage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
