import { useCart } from '../../context/CartContect';
import { useOrder } from '../../context/OrderContext';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { placeOrder } = useOrder();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantityInCart, 0);

  const handlePlaceOrder = () => {
    if (cart.length === 0) return alert('Cart is empty');
    placeOrder(cart);
    clearCart();
    alert('Order placed successfully!');
  };

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table table-hover table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      width="50"
                      className="me-2 rounded"
                    />
                    {item.name}
                  </td>
                  <td style={{ maxWidth: '100px' }}>
                    <input
                      type="number"
                      min={1}
                      value={item.quantityInCart}
                      onChange={(e) =>
                        updateQuantity(item.id, Number(e.target.value))
                      }
                      className="form-control"
                    />
                  </td>
                  <td>{item.price} Rs</td>
                  <td>{(item.price * item.quantityInCart).toFixed(2)} Rs</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4 className="text-end me-3">Total: {total.toFixed(2)} Rs</h4>
          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-warning" onClick={clearCart}>
              Clear Cart
            </button>
            <button className="btn btn-success" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
