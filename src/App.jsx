import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./Components/NavBar";
import Login from "./Components/Login";
import Body from "./Components/Body";
import Checkout from "./Components/Checkout";
import ContactInfo from "./Components/ContactInfo";
import Orders from "./Components/Orders"; // New Orders Page
import { useAuth } from "./context/useAuth";
import { OrderProvider } from "./context/OrderContext";

function App() {
  const { user } = useAuth();

  return (
    <OrderProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={user ? <Body Price={3} /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/contactinfo" element={<ContactInfo />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Router>
    </OrderProvider>
  );
}

export default App;
