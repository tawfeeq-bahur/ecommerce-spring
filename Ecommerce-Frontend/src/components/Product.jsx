import { useNavigate, useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  Heart,
  ShoppingCart,
  Share2,
  Star,
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
  Minus,
  Plus,
  Check,
  Edit,
  Trash2,
  Package,
} from "lucide-react";
import AppContext from "../Context/Context";
import axios from "../axios";
import Footer from "./Footer";

const Product = () => {
  const { id } = useParams();
  const { addToCart, removeFromCart, cart, refreshData } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const navigate = useNavigate();

  const features = [
    { icon: <Truck className="w-5 h-5" />, title: "Free Delivery", desc: "On orders above ₹999" },
    { icon: <RotateCcw className="w-5 h-5" />, title: "Easy Returns", desc: "15-day return policy" },
    { icon: <Shield className="w-5 h-5" />, title: "Secure Payment", desc: "100% secure checkout" },
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8081/api/product/${id}`);
        setProduct(response.data);
        if (response.data.imageName) {
          fetchImage();
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/product/${id}/image`, {
          responseType: "blob",
        });
        setImageUrl(URL.createObjectURL(response.data));
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const deleteProduct = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:8081/api/product/${id}`);
        removeFromCart(id);
        refreshData();
        navigate("/");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleEditClick = () => {
    navigate(`/product/update/${id}`);
  };

  const handleAddToCart = () => {
    if (product.productAvailable) {
      addToCart({ ...product, quantity });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const handleBuyNow = () => {
    if (product.productAvailable) {
      addToCart({ ...product, quantity });
      navigate("/cart");
    }
  };

  // Generate rating for demo
  const rating = 4.5;
  const reviewCount = 234;
  const originalPrice = product?.price ? Math.round(product.price * 1.3) : 0;
  const discountPercent = Math.round(((originalPrice - product?.price) / originalPrice) * 100);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Product Not Found
          </h2>
          <Link to="/" className="px-6 py-2 bg-emerald-600 text-white rounded-lg inline-block mt-4 no-underline hover:bg-emerald-700">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-emerald-600 no-underline">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-500">{product.category || "Products"}</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-800 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-24 h-24 text-gray-300" />
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {discountPercent > 0 && (
                    <span className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded">
                      -{discountPercent}%
                    </span>
                  )}
                  {!product.productAvailable && (
                    <span className="px-3 py-1 bg-gray-500 text-white text-sm font-medium rounded">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isWishlisted
                      ? "bg-red-500 text-white"
                      : "bg-white border border-gray-200 text-gray-500 hover:text-red-500"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              {/* Product Info */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    product.productAvailable 
                      ? "bg-green-100 text-green-700" 
                      : "bg-red-100 text-red-700"
                  }`}>
                    {product.productAvailable ? "In Stock" : "Out of Stock"}
                  </span>
                  {product.brand && (
                    <span className="text-gray-500 text-sm">by {product.brand}</span>
                  )}
                </div>
                
                <h1 className="text-2xl font-bold text-gray-800 mb-3">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(rating) ? "text-orange-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-orange-400 font-medium">{rating.toFixed(1)}</span>
                  <span className="text-gray-500 text-sm">({reviewCount} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                  {originalPrice > product.price && (
                    <span className="text-lg text-gray-400 line-through">₹{originalPrice}</span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6">{product.description || "No description available for this product."}</p>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="text-gray-600">Quantity:</span>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {product.stockQuantity && (
                  <span className="text-sm text-gray-500">
                    {product.stockQuantity} items available
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.productAvailable}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                    product.productAvailable
                      ? addedToCart
                        ? "bg-green-500 text-white"
                        : "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={!product.productAvailable}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                    product.productAvailable
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Buy Now
                </button>
              </div>

              {/* Admin Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={handleEditClick}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  <Edit className="w-4 h-4" />
                  Edit Product
                </button>
                <button
                  onClick={deleteProduct}
                  className="flex items-center gap-2 px-4 py-2 border border-red-200 rounded-lg text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 ml-auto">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                {features.map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-2 text-emerald-600">
                      {feature.icon}
                    </div>
                    <p className="text-sm font-medium text-gray-800">{feature.title}</p>
                    <p className="text-xs text-gray-500">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="flex gap-6 border-b border-gray-200 mb-6">
              {["description", "specifications", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? "text-emerald-600 border-b-2 border-emerald-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="min-h-32">
              {activeTab === "description" && (
                <div className="text-gray-600">
                  <p>{product.description || "No detailed description available for this product."}</p>
                  <p className="mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              )}
              {activeTab === "specifications" && (
                <div className="space-y-3">
                  <div className="flex border-b border-gray-100 pb-2">
                    <span className="w-40 text-gray-500">Category</span>
                    <span className="text-gray-800">{product.category || "N/A"}</span>
                  </div>
                  <div className="flex border-b border-gray-100 pb-2">
                    <span className="w-40 text-gray-500">Brand</span>
                    <span className="text-gray-800">{product.brand || "N/A"}</span>
                  </div>
                  <div className="flex border-b border-gray-100 pb-2">
                    <span className="w-40 text-gray-500">Stock</span>
                    <span className="text-gray-800">{product.stockQuantity || 0} units</span>
                  </div>
                  <div className="flex border-b border-gray-100 pb-2">
                    <span className="w-40 text-gray-500">Availability</span>
                    <span className={product.productAvailable ? "text-green-600" : "text-red-600"}>
                      {product.productAvailable ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="text-gray-500 text-center py-8">
                  <div className="text-4xl mb-2">💬</div>
                  <p>No reviews yet. Be the first to review this product!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Product;
