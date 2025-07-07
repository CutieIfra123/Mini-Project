import { useOrder } from "../context/OrderContext";

const Orders = () => {
  const { orders } = useOrder();

  if (orders.length === 0) {
    return (
      <div className="text-center mt-10 text-lg text-gray-600">
        No orders placed yet.
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
        Your Orders
      </h2>
      {orders.map((order, index) => (
        <div key={index} className="border border-gray-300 rounded p-4 mb-6">
          <h3 className="font-semibold text-lg mb-2">Order #{index + 1}</h3>

          <p className="mt-2">
            <strong>Ingredients:</strong> {order.ingredients.join(", ")}
          </p>
          <p>
            <strong>Total Price:</strong> ${order.total}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
