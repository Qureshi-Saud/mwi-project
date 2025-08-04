import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="font-bold text-xl">Admin Panel</h1>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={toggleMenu} aria-label="Toggle Menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <div className={`${ isOpen ? "block" : "hidden" } absolute md:static top-full left-0 w-full md:w-auto bg-white md:flex md:items-center space-y-4 md:space-y-0 md:space-x-4 px-4 md:px-0 py-4 md:py-0 shadow md:shadow-none`}>
          <Link to="/dashboard" onClick={closeMenu} className="block hover:text-blue-600">Dashboard</Link>
          <Link to="/upload" onClick={closeMenu} className="block hover:text-blue-600">Upload Product</Link>
          <Link to="/admin/enquiries" onClick={closeMenu} className="block hover:text-blue-600">Inbox</Link>
          <button onClick={handleLogout} className="block hover:text-red-500">Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
