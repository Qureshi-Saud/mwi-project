import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { logo } from "../assets";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#E6EBF1] shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="flex items-center">
          <img
            src={logo}
            alt="Microwell Industries Logo"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Navigation Links + WhatsApp */}
        <div
          className={`${
            isOpen ? "flex bg-[#E6EBF1]" : "hidden"
          } flex-col md:flex md:flex-row md:items-center md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto md:bg-transparent px-6 md:px-0 py-4 md:py-0 shadow md:shadow-none space-y-4 md:space-y-0 transition-all duration-300`}
        >
          {[
            { label: "Home", to: "/" },
            { label: "About Us", to: "/about" },
            { label: "Products", to: "/products" },
            { label: "Services", to: "/services" },
            { label: "Contact", to: "/contact" },
          ].map(({ label, to }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={closeMenu}
                className={`relative text-gray-700 font-medium transition duration-200 hover:text-blue-600
                  before:content-[''] before:absolute before:-bottom-1 before:left-0 before:h-[2px]
                  before:w-0 before:bg-blue-600 hover:before:w-full before:transition-all before:duration-300 ${
                    isActive ? "text-blue-600 before:w-full before:bg-blue-600" : ""
                  }`}
              >
                {label}
              </Link>
            );
          })}

          {/* WhatsApp Link at End */}
          <a
            href="https://api.whatsapp.com/send?phone=917715068534&text=Hello%2C%20I'm%20interested%20in%20Microwell%20Industries.%20Please%20share%20more%20info."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-green-600 hover:text-green-700 transition font-medium"
            onClick={closeMenu}
          >
            <FaWhatsapp size={20} />
            WhatsApp
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
