import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import Loader from "./Loader";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNavigation = (path) => {
    setLoading(true);
    setDrawerOpen(false);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 300);
  };

  const handleLogout = async () => {
    setLoading(true);
    setDrawerOpen(false);
    await logout();
    setTimeout(() => {
      navigate("/auth");
      setLoading(false);
    }, 800);
  };

  if (loading) return <Loader />;

  return (
    <>
      <nav className="h-[60px] bg-amber-800 shadow-md px-4 flex justify-between items-center">
        <div className="md:hidden">
          <Menu
            size={28}
            className="text-white cursor-pointer"
            onClick={() => setDrawerOpen(true)}
          />
        </div>

        <div
          onClick={() => handleNavigation("/")}
          className="hidden md:flex cursor-pointer bg-white h-[44px] w-[60px] rounded-sm p-1 items-center justify-center"
        >
          <img
            src="/burger-logo.png"
            alt="burger"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="hidden md:flex items-center gap-6 text-white font-medium">
          {user ? (
            <>
              <button
                onClick={() => handleNavigation("/")}
                className="hover:underline"
              >
                Burger Builder
              </button>
              <button
                onClick={() => handleNavigation("/orders")}
                className="hover:underline"
              >
                Orders
              </button>
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => handleNavigation("/auth")}
              className="hover:underline"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 h-full w-[230px] bg-white z-50 shadow-md transform transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="p-4 border-b border-gray-300 flex items-center justify-between">
          <img
            src="/burger-logo.png"
            alt="burger"
            className="h-[44px] object-contain"
          />
          <X
            size={24}
            className="cursor-pointer text-gray-700"
            onClick={() => setDrawerOpen(false)}
          />
        </div>

        <div className="flex flex-col gap-4 p-4 font-semibold text-amber-800">
          {user ? (
            <>
              <button
                onClick={() => handleNavigation("/")}
                className="text-left"
              >
                Burger Builder
              </button>
              <button
                onClick={() => handleNavigation("/orders")}
                className="text-left"
              >
                Orders
              </button>
              <button onClick={handleLogout} className="text-left">
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => handleNavigation("/auth")}
              className="text-left"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}
    </>
  );
};

export default NavBar;
