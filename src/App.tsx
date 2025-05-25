// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { ProtectedRoute } from './auth/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import ProductListPage from './pages/products/ProductListPage';
import ProductDetailPage from './pages/products/ProductDetailsPage';
import CartPage from './pages/customer/CartPage';
import OrderHistoryPage from './pages/customer/OrderHistoryPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProfilePage from './pages/customer/ProfilePage';
import AddProductPage from './pages/admin/AddProductPage';
import EditProductPage from './pages/admin/EditProductPage';


const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4">
      <Link className="navbar-brand fw-bold" to="/">🛒 MiniEcom</Link>

      <div className="collapse navbar-collapse">
        <div className="ms-auto d-flex align-items-center gap-4">
          {!user && (
            <Link to="/register" className="btn btn-outline-secondary btn-sm">Register</Link>
          )}

          {user && (
            <Link to="/profile" className="nav-link">Profile</Link>
          )}

          {user && user.role === 'customer' && (
            <>
              <Link to="/cart" className="nav-link">Cart</Link>
              <Link to="/orders" className="nav-link">Orders</Link>
            </>
          )}
          {user && user.role === 'admin' && (
            <Link to="/admin" className="nav-link">Admin Dashboard</Link>
          )}
          {user ? (
            <>
              <span className="text-muted small">Logged in as <strong>{user.username}</strong></span>
              <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-outline-primary btn-sm">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};



function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <ProductListPage />
            </ProtectedRoute>
          } />
          <Route path="/products/:id" element={
            <ProtectedRoute>
              <ProductDetailPage />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/customer" element={
            <ProtectedRoute allowedRoles={['customer']}>
              <CustomerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={
            <ProtectedRoute allowedRoles={['customer']}>
              <CartPage />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute allowedRoles={['customer']}>
              <OrderHistoryPage />
            </ProtectedRoute>
          } />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
  <ProtectedRoute allowedRoles={['admin']}>
    <AdminDashboard />
  </ProtectedRoute>
} />
<Route path="/admin/add" element={
  <ProtectedRoute allowedRoles={['admin']}>
    <AddProductPage />
  </ProtectedRoute>
} />
<Route path="/admin/edit/:id" element={
  <ProtectedRoute allowedRoles={['admin']}>
    <EditProductPage />
  </ProtectedRoute>
} />
        </Routes>

      </Router>
    </AuthProvider>
  );
}

export default App;
