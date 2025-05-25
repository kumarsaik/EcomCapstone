// src/pages/admin/AddProductPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../../context/ProductContext';
import { useToast } from '../../context/ToastContext';

const AddProductPage = () => {
  const { addProduct } = useProduct();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', description: '', price: '', quantity: '', image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      name: form.name,
      description: form.description,
      price: Number(form.price),
      quantity: Number(form.quantity),
      image: form.image,
    };
    addProduct(newProduct);
    showToast('Product added successfully!');
    navigate('/admin');
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h2>Add Product</h2>
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
        <button className="btn btn-success">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;
