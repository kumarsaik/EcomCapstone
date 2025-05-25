import { useOrder } from '../../context/OrderContext';

const OrderHistoryPage = () => {
  const { orders, cancelOrder } = useOrder();

  return (
    <div className="container mt-4">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="card mb-4 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5>
                  Order #{order.id}
                  <span
                    className={`badge ms-2 ${
                      order.status === 'Placed' ? 'bg-success' : 'bg-danger'
                    }`}
                  >
                    {order.status}
                  </span>
                </h5>
                <small className="text-muted">{order.date}</small>
              </div>

              <table className="table mt-3">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
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
                      <td>{item.quantityInCart}</td>
                      <td>{item.price} Rs</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="d-flex justify-content-between">
                <strong>Total: {order.total.toFixed(2)} Rs</strong>
                {order.status === 'Placed' && (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => cancelOrder(order.id)}
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistoryPage;
