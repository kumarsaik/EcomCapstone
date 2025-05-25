// src/pages/auth/LoginPage.tsx
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username)) {
      navigate('/');
    } else {
      alert('Invalid user. Try "admin" or "customer".');
    }
  };

  if (user) return <Navigate to="/" />;

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-control mb-3"
          placeholder='Try "admin" or "customer"'
          required
        />
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
