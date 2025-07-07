import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useOrder } from "../context/OrderContext";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
const ContactInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ingredients = location.state?.ingredientsOrder || [];
  const [dialogOpen, setDialogOpen] = useState(false);
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
    const basePrice = 3;
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
    setDialogOpen(true);
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <h2 className="text-2xl font-sans font-bold mb-6 text-center text-green-700">
        Enter your Contact Info
      </h2>

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
          <label className="font-medium font-sans">Delivery Method:</label>
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
          Order
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
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Order Done ✅</AlertDialogTitle>
            <AlertDialogDescription>
              Please wait while we prepare your order...
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <button
                onClick={() => {
                  setDialogOpen(false);
                  navigate("/");
                }}
                className="bg-yellow-700 hover:bg-yellow-800 text-white font-semibold px-4 py-2 rounded"
              >
                Go to Home
              </button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ContactInfo;
