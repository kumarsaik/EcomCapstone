// src/pages/admin/EditProductPage.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../../context/ProductContext';
import { useState, useEffect } from 'react';
import { useToast } from '../../context/ToastContext';

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useProduct();
  const { showToast } = useToast();

  const product = products.find((p) => p.id === Number(id));
  const [form, setForm] = useState(product);

  useEffect(() => {
    if (!product) navigate('/admin');
  }, [product, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProduct({ ...form, price: Number(form?.price), quantity: Number(form?.quantity) });
    showToast('Product updated!');
    navigate('/admin');
  };

  if (!form) return null;

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {['name', 'description', 'price', 'quantity', 'image'].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              name={field}
              value={(form as any)[field]}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        ))}
        <button className="btn btn-primary">Update Product</button>
      </form>
    </div>
  );
};

export default EditProductPage;
