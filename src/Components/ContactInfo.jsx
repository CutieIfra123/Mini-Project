import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useOrder } from "../context/OrderContext";

const ContactInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ingredients = location.state?.ingredientsOrder || [];

  const { addOrder } = useOrder();

  const [formData, setFormData] = useState({
    name: "",
    street: "",
    zipCode: "",
    country: "",
    email: "",
    deliveryMethod: "fastest",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    const basePrice = 4;
    const prices = {
      lettuce: 0.5,
      bacon: 0.7,
      cheese: 0.4,
      meat: 1.3,
    };
    const total = ingredients.reduce(
      (sum, item) => sum + (prices[item] || 0),
      basePrice
    );
    return total.toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOrder = {
      customer: formData,
      ingredients,
      total: calculateTotal(),
    };

    addOrder(newOrder);
    alert("Order submitted successfully!");
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
        Enter your Contact Info
      </h2>

      {ingredients.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">Your Burger Includes:</h3>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {ingredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="Street"
          required
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          placeholder="Zip Code"
          required
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
          required
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="p-2 border border-gray-300 rounded"
        />

        <div className="flex justify-between items-center">
          <label className="font-medium">Delivery Method:</label>
          <select
            name="deliveryMethod"
            value={formData.deliveryMethod}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-[60%]"
          >
            <option value="fastest">Fastest</option>
            <option value="cheapest">Cheapest</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700"
        >
          Submit Order
        </button>
      </form>

      <div className="text-center mt-6">
        <button
          onClick={() =>
            navigate("/checkout", { state: { ingredientsOrder: ingredients } })
          }
          className="text-red-700 font-bold"
        >
          BACK TO CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default ContactInfo;
