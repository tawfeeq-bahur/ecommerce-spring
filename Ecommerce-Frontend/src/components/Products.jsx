import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Grid, List, ShoppingCart } from "lucide-react";
import AppContext from "../Context/Context";
import axios from "axios";
import Footer from "./Footer";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(AppContext);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (product?.id) {
      axios
        .get(`http://localhost:8081/api/product/${product.id}/image`, { responseType: "blob" })
        .then((res) => setImageUrl(URL.createObjectURL(res.data)))
        .catch(() => {});
    }
  }, [product?.id]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group">
      <Link to={`/product/${product.id}`} className="block no-underline">
        <div className="w-full h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="text-6xl">📦</div>
          )}
        </div>
        <div className="p-4">
          <p className="text-xs text-gray-400 mb-1">{product.brand || "Bashira Textiles"}</p>
          <h3 className="text-gray-800 font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-emerald-700 font-bold text-lg">₹{product.price}</p>
          <p className="text-xs text-gray-400 mt-1">{product.category}</p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer border-0"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const Products = () => {
  const { data, isError, refreshData } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    refreshData();
  }, []);

  const categories = [
    "All",
    "Electronics",
    "Clothes and wear",
    "Home interiors",
    "Books & magazines",
    "Tools, equipments",
    "Sports and outdoor",
    "Animal and pets",
    "Toys for Kids",
  ];

  const filtered = data
    .filter((p) => {
      const matchSearch =
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name") return a.name?.localeCompare(b.name);
      return 0;
    });

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Connection Error</h2>
          <p className="text-gray-500">Unable to load products. Please check if the backend is running.</p>
          <button onClick={refreshData} className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-lg cursor-pointer border-0">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">All Products</h1>

          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-emerald-500 bg-white"
            >
              <option value="default">Sort by: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
            </select>
            <div className="flex gap-1 border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 cursor-pointer border-0 ${viewMode === "grid" ? "bg-emerald-600 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 cursor-pointer border-0 ${viewMode === "list" ? "bg-emerald-600 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Category Sidebar */}
        <aside className="w-56 shrink-0 hidden md:block">
          <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Categories
            </h3>
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm cursor-pointer border-0 transition-colors ${
                      selectedCategory === cat
                        ? "bg-emerald-50 text-emerald-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          <div className="mb-4 text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-800">{filtered.length}</span> products
            {selectedCategory !== "All" && (
              <span> in <span className="font-semibold text-emerald-600">{selectedCategory}</span></span>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-500">Try a different search or category filter.</p>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" : "space-y-3"}>
              {filtered.map((product) =>
                viewMode === "grid" ? (
                  <ProductCard key={product.id} product={product} />
                ) : (
                  <div key={product.id} className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4 hover:shadow-md transition-shadow">
                    <Link to={`/product/${product.id}`} className="no-underline flex gap-4 flex-1">
                      <div className="w-24 h-24 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                        <span className="text-4xl">📦</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-400">{product.brand}</p>
                        <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                        <p className="text-emerald-700 font-bold mt-2">₹{product.price}</p>
                      </div>
                    </Link>
                    <button
                      onClick={() => {}}
                      className="self-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm cursor-pointer border-0 shrink-0"
                    >
                      Add to Cart
                    </button>
                  </div>
                )
              )}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
