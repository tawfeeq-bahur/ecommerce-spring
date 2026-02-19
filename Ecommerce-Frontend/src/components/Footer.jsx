import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Package } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    company: [
      { name: "About Us", href: "/" },
      { name: "Investors", href: "/" },
      { name: "Careers", href: "/" },
      { name: "Blogs and news", href: "/" },
      { name: "Example", href: "/" },
    ],
    buyers: [
      { name: "Find store", href: "/" },
      { name: "Registration", href: "/" },
      { name: "Partnerships", href: "/" },
      { name: "Gift vouchers", href: "/" },
      { name: "Example", href: "/" },
    ],
    help: [
      { name: "Contact us", href: "/" },
      { name: "Live chat", href: "/" },
      { name: "Documentation", href: "/" },
      { name: "Download", href: "/" },
      { name: "Versions", href: "/" },
    ],
    service: [
      { name: "Safe purchase", href: "/" },
      { name: "Logistics service", href: "/" },
      { name: "Refund", href: "/" },
      { name: "Example link", href: "/" },
      { name: "Something", href: "/" },
    ],
    language: [
      { name: "English", href: "/" },
      { name: "Español", href: "/" },
      { name: "Português", href: "/" },
      { name: "Deutsch", href: "/" },
      { name: "日本語", href: "/" },
    ],
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 no-underline">
              <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-lg font-bold text-emerald-600">
                BASHIRA <span className="text-gray-800">TEXTILES</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm mb-4">
              Best marketplace for buying and selling quality products.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-emerald-600 hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-emerald-500 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-pink-500 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-red-500 hover:text-white transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-500 hover:text-emerald-600 text-sm no-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Buyers</h4>
            <ul className="space-y-2">
              {footerLinks.buyers.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-500 hover:text-emerald-600 text-sm no-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Help</h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-500 hover:text-emerald-600 text-sm no-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Service</h4>
            <ul className="space-y-2">
              {footerLinks.service.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-500 hover:text-emerald-600 text-sm no-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Language</h4>
            <ul className="space-y-2">
              {footerLinks.language.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-500 hover:text-emerald-600 text-sm no-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              Copyright © 2020-2026 BASHIRA TEXTILES. All Rights Reserved
            </p>
            <div className="flex items-center gap-4">
              <Link to="/" className="text-gray-500 hover:text-emerald-600 text-sm no-underline">
                Privacy Policy
              </Link>
              <Link to="/" className="text-gray-500 hover:text-emerald-600 text-sm no-underline">
                Terms of Service
              </Link>
              <Link to="/" className="text-gray-500 hover:text-emerald-600 text-sm no-underline">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
