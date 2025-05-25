// src/pages/products/ProductListPage.tsx
import { fakeProducts } from '../../data/fakeProducts';
import { Link } from 'react-router-dom';

const ProductListPage = () => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Product Catalog</h2>
      <div className="row">
        {fakeProducts.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.price} Rs</p>
                <Link to={`/products/${product.id}`} className="btn btn-primary btn-sm">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
