import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import Loader from "./Loader";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNavigation = (path) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 300);
  };

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setTimeout(() => {
      navigate("/auth");
      setLoading(false);
    }, 800);
  };

  if (loading) return <Loader />;

  return (
    <nav className="h-[60px] bg-amber-800 shadow-md">
      <div className="p-2 h-full flex justify-between items-center px-4">
        {/* Logo */}
        <div
          onClick={() => handleNavigation("/")}
          className="cursor-pointer bg-white h-[44px] w-[60px] rounded-sm p-1 flex items-center justify-center"
        >
          <img
            src="/burger-logo.png"
            alt="burger"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex items-center gap-6 text-white font-medium">
          {user && (
            <>
              <button
                onClick={() => handleNavigation("/")}
                className="hover:underline focus:outline-none"
              >
                Burger Builder
              </button>
              <button
                onClick={() => handleNavigation("/orders")}
                className="hover:underline focus:outline-none"
              >
                Orders
              </button>
              <button
                onClick={handleLogout}
                className="hover:underline focus:outline-none"
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <button
              onClick={() => handleNavigation("/auth")}
              className="hover:underline focus:outline-none"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
