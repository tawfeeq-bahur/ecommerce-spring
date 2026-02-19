import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import AppContext from "../Context/Context";
import axios from "axios";
import Footer from "./Footer";

const WishlistItem = ({ product, onRemove, onAddToCart }) => {
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
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4 hover:shadow-sm transition-shadow">
      <Link to={`/product/${product.id}`} className="no-underline flex gap-4 flex-1">
        <div className="w-24 h-24 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
          {imageUrl ? (
            <img src={imageUrl} alt={product.name} className="w-full h-full object-contain" />
          ) : (
            <span className="text-4xl">📦</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400 mb-1">{product.brand || "Bashira Textiles"}</p>
          <h3 className="font-semibold text-gray-800 mb-1 truncate">{product.name}</h3>
          <p className="text-emerald-700 font-bold text-lg">₹{product.price}</p>
          <p className="text-xs text-gray-400 mt-1">{product.category}</p>
        </div>
      </Link>
      <div className="flex flex-col gap-2 justify-center">
        <button
          onClick={() => onAddToCart(product)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm cursor-pointer border-0 flex items-center gap-2 transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
        <button
          onClick={() => onRemove(product.id)}
          className="text-gray-400 hover:text-red-500 border border-gray-200 px-4 py-2 rounded-lg text-sm cursor-pointer flex items-center gap-2 transition-colors bg-white"
        >
          <Trash2 className="w-4 h-4" />
          Remove
        </button>
      </div>
    </div>
  );
};

const Wishlist = () => {
  const { addToCart } = useContext(AppContext);
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wishlist")) || [];
    } catch {
      return [];
    }
  });

  const handleRemove = (productId) => {
    const updated = wishlist.filter((p) => p.id !== productId);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    handleRemove(product.id);
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.setItem("wishlist", JSON.stringify([]));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Heart className="w-7 h-7 text-red-500 fill-red-500" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My Wishlist</h1>
              <p className="text-gray-500 text-sm">{wishlist.length} item{wishlist.length !== 1 ? "s" : ""} saved</p>
            </div>
          </div>
          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-sm text-gray-400 hover:text-red-500 flex items-center gap-1 bg-transparent border-0 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
            <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-6">Save items you love to your wishlist and shop them later.</p>
            <Link
              to="/products"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium no-underline inline-block transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {wishlist.map((product) => (
              <WishlistItem
                key={product.id}
                product={product}
                onRemove={handleRemove}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
