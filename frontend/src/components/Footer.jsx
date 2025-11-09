import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">JobPorter</h2>
          <p className="text-sm">
            Your trusted platform to find the best jobs and connect with top companies.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/" className="hover:text-white">Browse Jobs</Link></li>
            <li><Link to="/" className="hover:text-white">Companies</Link></li>
            <li><Link to="/" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Resources</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white">About Us</Link></li>
            <li><Link to="/" className="hover:text-white">Blog</Link></li>
            <li><Link to="/" className="hover:text-white">FAQ</Link></li>
            <li><Link to="/" className="hover:text-white">Support</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="/" className="hover:text-white"><FaFacebook /></a>
            <a href="/" className="hover:text-white"><FaTwitter /></a>
            <a href="/" className="hover:text-white"><FaLinkedin /></a>
            <a href="/" className="hover:text-white"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} JobPorter. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

