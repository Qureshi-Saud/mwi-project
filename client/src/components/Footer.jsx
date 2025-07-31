import React from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLinkedinIn } from "react-icons/fa";
import { logo } from "../assets";

const Footer = () => {
  return (
    <footer className="bg-[#E6EBF1] text-black pt-10 pb-6">

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Address, Mobile, Email */}
        <div>
          <h3 className="text-lg font-bold text-blue-500 mb-3">Contact Info</h3>
          <p className="flex items-start gap-2 text-sm mb-2 text-gray-1000">
            <FaMapMarkerAlt className="mt-1 text-blue-300" />
            B-3, Pandit Jawaharlal Nehru Rd, Patel Park, Vakola,<br />
            Santacruz East, Mumbai, Maharashtra 400055
          </p>
          <p className="flex items-center gap-2 text-sm mb-2 text-gray-1000">
            <FaPhoneAlt className="text-blue-300" />
            +91 77150 68534 / +91 77150 68533
          </p>
          <p className="flex items-center gap-2 text-sm text-gray-1000">
            <FaEnvelope className="text-blue-300" />
            only4rizvi@gmail.com
          </p>
        </div>

        {/* Column 2: Embedded Map */}
        <div>
          <h3 className="text-lg font-bold text-blue-500 mb-3">Location</h3>
          <div className="rounded-md overflow-hidden shadow-lg">
            <iframe
              className="w-full h-40"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.349664441672!2d72.85094157451716!3d19.135756850667105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8c0cd54bc6b%3A0xf53b8cf1ce6115b!2sVakola%2C%20Santacruz%20East%2C%20Mumbai%2C%20Maharashtra%20400055!5e0!3m2!1sen!2sin!4v1722154282223!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Microwell Location"
            ></iframe>
          </div>
        </div>

        {/* Column 3: Logo & Social */}
        <div>
          <img src={logo} alt="Microwell Logo" className="w-52 mb-4 mt-4" />
          <h3 className="text-lg font-bold text-blue-500 mb-2">Contact Us</h3>
          <div className="flex space-x-4 text-xl text-gray-800">
            <a
              href="https://www.linkedin.com/company/microwell-industries"
              className="hover:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
            <a href="mailto:only4rizvi@gmail.com" className="hover:text-blue-400">
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Column 4: Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-blue-500 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-1000">
            <li><Link to="/" className="hover:text-blue-300">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-300">About</Link></li>
            <li><Link to="/products" className="hover:text-blue-300">Products</Link></li>
            <li><Link to="/services" className="hover:text-blue-300">Services</Link></li>
            <li><Link to="/contact" className="hover:text-blue-300">Contact</Link></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm text-gray-900 mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Microwell Industries. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
