// src/pages/admin/AdminDashboard.tsx
import { Link } from 'react-router-dom';
import { useProduct } from '../../context/ProductContext';

const AdminDashboard = () => {
  const { products, deleteProduct } = useProduct();

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <Link to="/admin/add" className="btn btn-primary mb-3">+ Add Product</Link>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td><img src={prod.image} width="60" alt={prod.name} /></td>
              <td>{prod.name}</td>
              <td>${prod.price}</td>
              <td>{prod.quantity}</td>
              <td>
                <Link to={`/admin/edit/${prod.id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
                <button onClick={() => deleteProduct(prod.id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
