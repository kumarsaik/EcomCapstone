// src/pages/customer/ProfilePage.tsx
import { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState(user?.address || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ username: name, email, address });
    alert('Profile updated!');
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Address</label>
          <textarea className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} rows={2} />
        </div>
        <button className="btn btn-success w-100">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
