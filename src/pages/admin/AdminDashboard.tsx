import { Link } from 'react-router-dom';
import { useProduct } from '../../context/ProductContext';
import { useState } from 'react';

const AdminDashboard = () => {
  const { products, deleteProduct } = useProduct();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (category ? p.category === category : true)
  );

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      {/* 🔍 Filters */}
      <div className="row mb-4">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            placeholder="Search by name..."
            className="form-control"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-2">
          <select
            className="form-select"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <Link to="/admin/add" className="btn btn-primary mb-3">+ Add Product</Link>

      {/* Product Table */}
      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th style={{ width: '80px' }}>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price ($)</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((prod) => (
            <tr key={prod.id}>
              <td>
                <img src={prod.image} alt={prod.name} className="img-thumbnail" width="60" />
              </td>
              <td>{prod.name}</td>
              <td>{prod.category}</td>
              <td>{prod.price}</td>
              <td>{prod.quantity}</td>
              <td>
                <Link to={`/admin/edit/${prod.id}`} className="btn btn-warning btn-sm me-2">
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteProduct(prod.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center text-muted">No products found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
