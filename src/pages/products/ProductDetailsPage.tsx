// src/pages/products/ProductDetailPage.tsx
import { useParams } from 'react-router-dom';
import { fakeProducts } from '../../data/fakeProducts';
import { useCart } from '../../context/CartContect';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = fakeProducts.find((p) => p.id === Number(id));

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.name} className="img-fluid rounded shadow-sm" />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p className="text-muted">{product.description}</p>
          <h4 className="text-success">{product.price} Rs</h4>
          <p><strong>Stock:</strong> {product.quantity}</p>
          <button className="btn btn-success mt-2" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
