import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Monitor,
  Shirt,
  Home as HomeIcon,
  BookOpen,
  Wrench,
  Dumbbell,
  PawPrint,
  Baby,
  Grid3X3,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import AppContext from "../Context/Context";
import Footer from "./Footer";
import axios from "axios";

const Home = ({ selectedCategory, onSelectCategory }) => {
  const { data, isError, refreshData } = useContext(AppContext);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [countdown, setCountdown] = useState({ days: 4, hours: 12, mins: 58, secs: 2 });

  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [refreshData, isDataFetched]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, mins, secs } = prev;
        if (secs > 0) {
          secs--;
        } else if (mins > 0) {
          mins--;
          secs = 59;
        } else if (hours > 0) {
          hours--;
          mins = 59;
          secs = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          mins = 59;
          secs = 59;
        }
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { name: "Electronics", icon: Monitor },
    { name: "Clothes and wear", icon: Shirt },
    { name: "Home interiors", icon: HomeIcon },
    { name: "Books & magazines", icon: BookOpen },
    { name: "Tools, equipments", icon: Wrench },
    { name: "Sports and outdoor", icon: Dumbbell },
    { name: "Animal and pets", icon: PawPrint },
    { name: "Toys for Kids", icon: Baby },
  ];

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? data.filter((product) =>
        product.category?.toLowerCase().includes(selectedCategory.toLowerCase())
      )
    : data;

  // Category groups for display
  const categoryGroups = [
    { title: "Home and outdoor items", color: "bg-teal-100", products: data.slice(0, 8) },
    { title: "Consumer electronics and gadgets", color: "bg-pink-100", products: data.slice(0, 8) },
  ];

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🔌</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Connection Error
          </h2>
          <p className="text-gray-500 mb-4">
            Unable to connect to the server. Please check if the backend is running.
          </p>
          <button
            onClick={() => refreshData()}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero Section with Sidebar */}
        <div className="grid grid-cols-12 gap-4 mb-6">
          {/* Categories Sidebar */}
          <div className="col-span-12 lg:col-span-3 bg-white rounded-lg border border-gray-200 p-4 h-fit">
            <nav className="space-y-1">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.name}
                    onClick={() => onSelectCategory(category.name)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                      selectedCategory === category.name
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <IconComponent className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">{category.name}</span>
                  </button>
                );
              })}
              <button
                onClick={() => onSelectCategory("")}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-emerald-600 hover:bg-emerald-50 text-left"
              >
                <Grid3X3 className="w-5 h-5" />
                <span className="text-sm">More category</span>
              </button>
            </nav>
          </div>

          {/* Main Banner */}
          <div className="col-span-12 lg:col-span-6">
            <div className="bg-gradient-to-r from-cyan-100 to-cyan-200 rounded-lg p-8 h-80 flex items-center relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-cyan-600 text-lg mb-1">New trending</p>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Electronic items</h2>
                <button className="px-6 py-2.5 bg-white text-gray-800 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Learn more
                </button>
              </div>
              <div className="absolute right-4 bottom-4 w-48 h-48 flex items-center justify-center">
                <div className="text-8xl">📱</div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Promo */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            <div className="bg-orange-100 rounded-lg p-6 h-36 relative overflow-hidden">
              <h3 className="text-gray-800 font-semibold mb-1">Get US $10 off</h3>
              <p className="text-gray-600 text-sm">for first order</p>
              <button className="mt-3 px-4 py-1.5 border border-gray-400 rounded-lg text-sm hover:bg-white transition-colors">
                Get offer
              </button>
            </div>
            <div className="bg-teal-100 rounded-lg p-6 h-36 relative overflow-hidden">
              <h3 className="text-gray-800 font-semibold mb-1">Special offers</h3>
              <p className="text-gray-600 text-sm">Up to 50% discount</p>
              <button className="mt-3 px-4 py-1.5 border border-gray-400 rounded-lg text-sm hover:bg-white transition-colors">
                Shop now
              </button>
            </div>
          </div>
        </div>

        {/* Deals and Offers Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-12 gap-4">
            {/* Timer Section */}
            <div className="col-span-12 lg:col-span-3">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Deals and offers</h3>
              <p className="text-gray-500 text-sm mb-4">Electronics & Gadgets</p>
              <div className="flex gap-2">
                <div className="w-12 h-12 bg-gray-800 rounded text-white flex flex-col items-center justify-center">
                  <span className="text-lg font-bold">{String(countdown.days).padStart(2, '0')}</span>
                  <span className="text-[10px] text-gray-300">Days</span>
                </div>
                <div className="w-12 h-12 bg-gray-800 rounded text-white flex flex-col items-center justify-center">
                  <span className="text-lg font-bold">{String(countdown.hours).padStart(2, '0')}</span>
                  <span className="text-[10px] text-gray-300">Hours</span>
                </div>
                <div className="w-12 h-12 bg-gray-800 rounded text-white flex flex-col items-center justify-center">
                  <span className="text-lg font-bold">{String(countdown.mins).padStart(2, '0')}</span>
                  <span className="text-[10px] text-gray-300">Min</span>
                </div>
                <div className="w-12 h-12 bg-gray-800 rounded text-white flex flex-col items-center justify-center">
                  <span className="text-lg font-bold">{String(countdown.secs).padStart(2, '0')}</span>
                  <span className="text-[10px] text-gray-300">Sec</span>
                </div>
              </div>
            </div>

            {/* Deal Products */}
            <div className="col-span-12 lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {filteredProducts.slice(0, 5).map((product) => (
                <ProductDealCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>

        {/* Selected Category Products */}
        {selectedCategory && (
          <div className="bg-white rounded-lg border border-gray-200 mb-6">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">{selectedCategory}</h3>
              <p className="text-gray-500 text-sm">{filteredProducts.length} products found</p>
            </div>
            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Category Sections */}
        {!selectedCategory && categoryGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="bg-white rounded-lg border border-gray-200 mb-6 overflow-hidden">
            <div className="grid grid-cols-12">
              {/* Category Image */}
              <div className={`col-span-12 lg:col-span-3 ${group.color} p-6 flex flex-col justify-between min-h-48`}>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{group.title}</h3>
                  <button className="inline-flex items-center gap-1 px-4 py-2 border border-gray-400 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                    Explore all
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Products Grid */}
              <div className="col-span-12 lg:col-span-9 p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {group.products.slice(0, 8).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Recommended Items Section */}
        {!selectedCategory && (
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recommended items</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {data.slice(0, 10).map((product) => (
                <ProductRecommendCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Supplier Request Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg p-6 mb-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-white">
          <div className="flex items-center gap-6">
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-5xl">📦</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">An easy way to send requests to all suppliers</h3>
              <p className="text-emerald-100">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
          </div>
          <button className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-blue-300 transition-colors whitespace-nowrap">
            Send inquiry
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Product Card for Deal Section
const ProductDealCard = ({ product }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const discountPercent = Math.floor(Math.random() * 30) + 10;

  useEffect(() => {
    const fetchImage = async () => {
      if (product?.id) {
        try {
          const response = await axios.get(
            `http://localhost:8081/api/product/${product.id}/image`,
            { responseType: "blob" }
          );
          setImageUrl(URL.createObjectURL(response.data));
        } catch (error) {
          // Use placeholder
        }
      }
    };
    fetchImage();
  }, [product?.id]);

  return (
    <Link
      to={`/product/${product.id}`}
      className="border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow no-underline group"
    >
      <div className="w-full h-32 bg-gray-50 rounded mb-3 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
        ) : (
          <div className="text-5xl">📦</div>
        )}
      </div>
      <p className="text-gray-800 text-sm mb-1 truncate">{product.name}</p>
      <span className="inline-block px-2 py-0.5 bg-red-100 text-red-500 rounded text-xs font-medium">
        -{discountPercent}%
      </span>
    </Link>
  );
};

// Standard Product Card
const ProductCard = ({ product }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (product?.id) {
        try {
          const response = await axios.get(
            `http://localhost:8081/api/product/${product.id}/image`,
            { responseType: "blob" }
          );
          setImageUrl(URL.createObjectURL(response.data));
        } catch (error) {
          // Use placeholder
        }
      }
    };
    fetchImage();
  }, [product?.id]);

  return (
    <Link
      to={`/product/${product.id}`}
      className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg no-underline group"
    >
      <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-2xl">📦</div>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-gray-800 text-sm font-medium truncate">{product.name}</p>
        <p className="text-gray-400 text-xs">From</p>
        <p className="text-gray-800 font-semibold">USD {product.price}</p>
      </div>
    </Link>
  );
};

// Recommended Product Card
const ProductRecommendCard = ({ product }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (product?.id) {
        try {
          const response = await axios.get(
            `http://localhost:8081/api/product/${product.id}/image`,
            { responseType: "blob" }
          );
          setImageUrl(URL.createObjectURL(response.data));
        } catch (error) {
          // Use placeholder
        }
      }
    };
    fetchImage();
  }, [product?.id]);

  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white border border-gray-200 rounded-lg p-3 no-underline hover:shadow-md transition-shadow group"
    >
      <div className="w-full h-40 bg-gray-50 rounded mb-3 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
        ) : (
          <div className="text-6xl">📦</div>
        )}
      </div>
      <p className="text-gray-800 text-sm mb-1 truncate font-medium">{product.name}</p>
      <p className="text-lg font-bold text-gray-900">₹{product.price}</p>
      <p className="text-xs text-gray-400">{product.brand || 'Brand'}</p>
    </Link>
  );
};

export default Home;
