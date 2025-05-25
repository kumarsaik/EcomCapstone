// src/pages/auth/LoginPage.tsx
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { useToast } from '../../context/ToastContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user, login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 🔐 Fake credential check
    const validAdmin = username === 'admin' && password === 'admin123';
    const validCustomer = username === 'customer' && password === 'cust123';

    if (validAdmin || validCustomer) {
      const success = login(username);
      if (success) {
        showToast('Login successful!');
        // 🔁 Redirect based on role
        setTimeout(() => {
          if (username === 'admin') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        }, 300);
      }
    } else {
      showToast('Invalid username or password', 'danger');
    }
  };

  if (user) return <Navigate to="/" />;

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin or customer"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="admin123 or cust123"
          />
        </div>
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
