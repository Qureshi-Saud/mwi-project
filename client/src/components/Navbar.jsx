import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { logo } from "../assets";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const location = useLocation();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Products", to: "/products" },
    { label: "Services", to: "/services" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="absolute top-0 left-0 right-0 bg-[#E6EBF1] shadow-md z-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="flex items-center">
          <img
            src={logo}
            alt="Microwell Industries Logo"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          { <Menu size={26} />}
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map(({ label, to }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
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

          <a
            href="https://api.whatsapp.com/send?phone=917715068534&text=Hello%2C%20I'm%20interested%20in%20Microwell%20Industries.%20Please%20share%20more%20info."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-green-600 hover:text-green-700 transition font-medium"
          >
            <FaWhatsapp size={20} />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Mobile Slide-In Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 left-0 w-[75%] max-w-xs h-full bg-grey text-white z-50 p-6 flex flex-col gap-6"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                onClick={closeMenu}
                className="self-end text-white"
                aria-label="Close Menu"
              >
                <X size={28} />
              </button>

              {/* Links */}
              {navLinks.map(({ label, to }) => {
                const isActive = location.pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={closeMenu}
                    className={`text-lg font-semibold transition-colors ${
                      isActive ? "text-blue-400" : "hover:text-white"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}

              {/* WhatsApp */}
              <a
                href="https://api.whatsapp.com/send?phone=917715068534&text=Hello%2C%20I'm%20interested%20in%20Microwell%20Industries.%20Please%20share%20more%20info."
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="mt-4 flex items-center gap-2 text-green-400 hover:text-green-300 transition font-medium"
              >
                <FaWhatsapp size={20} />
                WhatsApp
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
