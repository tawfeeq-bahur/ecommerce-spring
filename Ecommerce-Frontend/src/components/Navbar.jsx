import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Menu,
  ChevronDown,
  ShoppingCart,
  Heart,
  User,
  Package,
  X,
  Monitor,
  Shirt,
  Home,
  BookOpen,
  Wrench,
  Dumbbell,
  PawPrint,
  Baby,
  Grid3X3,
} from "lucide-react";
import axios from "axios";
import AppContext from "../Context/Context";

const Navbar = ({ onSelectCategory }) => {
  const { cart } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const categoryRef = useRef(null);
  const navigate = useNavigate();

  const categories = [
    { name: "Electronics", icon: Monitor },
    { name: "Clothes and wear", icon: Shirt },
    { name: "Home interiors", icon: Home },
    { name: "Books & magazines", icon: BookOpen },
    { name: "Tools, equipments", icon: Wrench },
    { name: "Sports and outdoor", icon: Dumbbell },
    { name: "Animal and pets", icon: PawPrint },
    { name: "Toys for Kids", icon: Baby },
  ];

  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (value) => {
    setSearchQuery(value);
    if (value.length >= 1) {
      setShowSearchResults(true);
      try {
        const response = await axios.get(
          `http://localhost:8081/api/products/search?keyword=${value}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching:", error);
      }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
    }
  };

  const handleCategorySelect = (category) => {
    onSelectCategory(category);
    setIsCategoryOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setShowSearchResults(false);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline shrink-0">
            <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-bold text-emerald-600 hidden sm:block">
              BASHIRA <span className="text-gray-800">TEXTILES</span>
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 border-r-0 rounded-l-lg focus:outline-none focus:border-emerald-600 text-gray-700"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 text-white rounded-r-lg hover:bg-emerald-700 transition-colors"
                >
                  Search
                </button>
              </div>

              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-80 overflow-y-auto z-50">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 no-underline"
                      onClick={() => setShowSearchResults(false)}
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                        <Package className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">₹{product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </form>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-1 sm:gap-4">
            <Link
              to="/orders"
              className="flex flex-col items-center text-gray-600 hover:text-emerald-600 no-underline px-2 py-1"
            >
              <Package className="w-5 h-5" />
              <span className="text-xs hidden sm:block">Orders</span>
            </Link>
            <Link
              to="/wishlist"
              className="flex flex-col items-center text-gray-600 hover:text-emerald-600 no-underline px-2 py-1"
            >
              <Heart className="w-5 h-5" />
              <span className="text-xs hidden sm:block">Saved</span>
            </Link>
            <Link
              to="/cart"
              className="flex flex-col items-center text-gray-600 hover:text-emerald-600 no-underline px-2 py-1 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="text-xs hidden sm:block">My cart</span>
            </Link>
            <Link
              to="/login"
              className="flex flex-col items-center text-gray-600 hover:text-emerald-600 no-underline px-2 py-1"
            >
              <User className="w-5 h-5" />
              <span className="text-xs hidden sm:block">Sign in</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-12 gap-6">
            {/* All Categories Dropdown */}
            <div className="relative" ref={categoryRef}>
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 font-medium"
              >
                <Menu className="w-5 h-5" />
                <span>All categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Categories Dropdown */}
              {isCategoryOpen && (
                <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 py-2 w-56 z-50">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.name}
                        onClick={() => handleCategorySelect(category.name)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 text-left"
                      >
                        <IconComponent className="w-5 h-5 text-gray-400" />
                        <span>{category.name}</span>
                      </button>
                    );
                  })}
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button
                      onClick={() => handleCategorySelect("")}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-emerald-600 hover:bg-emerald-50 text-left"
                    >
                      <Grid3X3 className="w-5 h-5" />
                      <span>All Products</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-gray-600 hover:text-emerald-600 no-underline">
                Recommends
              </Link>
              <Link to="/" className="text-gray-600 hover:text-emerald-600 no-underline">
                New arrivals
              </Link>
              <Link to="/" className="text-gray-600 hover:text-emerald-600 no-underline">
                Bestsellers
              </Link>
              <Link to="/products" className="text-gray-600 hover:text-emerald-600 no-underline">
                All Products
              </Link>
              <Link to="/add-product" className="text-gray-600 hover:text-emerald-600 no-underline">
                Add Product
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden ml-auto text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 space-y-2">
            <Link to="/" className="block py-2 text-gray-600 no-underline">Recommends</Link>
            <Link to="/" className="block py-2 text-gray-600 no-underline">New arrivals</Link>
            <Link to="/" className="block py-2 text-gray-600 no-underline">Bestsellers</Link>
            <Link to="/products" className="block py-2 text-gray-600 no-underline">All Products</Link>
            <Link to="/add-product" className="block py-2 text-gray-600 no-underline">Add Product</Link>
            <div className="border-t border-gray-100 pt-2 mt-2">
              <p className="text-sm font-medium text-gray-800 mb-2">Categories</p>
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleCategorySelect(category.name)}
                  className="block w-full text-left py-2 text-gray-600"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
