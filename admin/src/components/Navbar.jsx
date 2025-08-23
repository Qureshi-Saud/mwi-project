import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Menu,
  X,
  LayoutDashboard,
  Upload,
  Inbox,
  LogOut,
} from "lucide-react";

// Import logo from assets
import logo from "../assets/logo.png"; // make sure your file is logo.png (or update extension)

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-700";

  const getPageTitle = () => {
    if (location.pathname === "/dashboard") return "Dashboard";
    if (location.pathname === "/upload") return "Upload Product";
    if (location.pathname === "/admin/enquiries") return "Inbox";
    if (location.pathname.startsWith("/admin/enquiries/"))
      return "Enquiry Detail";
    return "";
  };

  return (
    <>
      {/* Sidebar */}
      <nav className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between px-4 py-4 border-b">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center space-x-2">
              <img
                src={logo}
                alt="Logo"
                className="h-10 w-auto object-contain"
              />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-gray-700"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Sidebar Links */}
          <div
            className={`flex-col md:flex md:flex-grow px-4 py-4 space-y-4 ${
              isOpen ? "flex" : "hidden md:flex"
            }`}
          >
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-2 hover:text-blue-600 ${isActive(
                "/dashboard"
              )}`}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/upload"
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-2 hover:text-blue-600 ${isActive(
                "/upload"
              )}`}
            >
              <Upload size={18} />
              <span>Upload Product</span>
            </Link>

            <Link
              to="/admin/enquiries"
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-2 hover:text-blue-600 ${isActive(
                "/admin/enquiries"
              )}`}
            >
              <Inbox size={18} />
              <span>Inbox</span>
            </Link>
          </div>
        </div>

        {/* Logout */}
        <div className="px-4 py-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-500 hover:text-red-600"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Conditionally Render Title Bar */}
      {getPageTitle() && (
        <div className="ml-64 px-6 py-4 bg-gray-100 border-b shadow-sm sticky top-0 z-40">
          <h1 className="text-2xl font-semibold text-gray-800">
            {getPageTitle()}
          </h1>
        </div>
      )}
    </>
  );
}

export default Navbar;
