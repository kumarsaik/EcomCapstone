// src/pages/products/ProductListPage.tsx
import { useState } from 'react';
import { fakeProducts } from '../../data/fakeProducts';
import { Link } from 'react-router-dom';

const ProductListPage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const categories = Array.from(new Set(fakeProducts.map(p => p.category)));

  const filtered = fakeProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (category ? p.category === category : true)
  );

  return (
    <div className="container mt-4">
      <h2>Product Catalog</h2>

      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            placeholder="Search by name..."
            className="form-control"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        {filtered.map(product => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100 shadow-sm">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5>{product.name}</h5>
                <p>${product.price}</p>
                <Link to={`/products/${product.id}`} className="btn btn-primary btn-sm">View</Link>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p>No products found.</p>}
      </div>
    </div>
  );
};

export default ProductListPage;
