import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Package, ChevronLeft, X, ImageIcon, Check, Loader2 } from "lucide-react";
import axios from "axios";
import AppContext from "../Context/Context";
import Footer from "./Footer";

const AddProduct = () => {
  const navigate = useNavigate();
  const { refreshData } = useContext(AppContext);

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    productAvailable: true,
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    "Electronics",
    "Clothes and wear",
    "Home interiors",
    "Books & magazines",
    "Tools, equipments",
    "Sports and outdoor",
    "Animal and pets",
    "Toys for Kids",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!product.name.trim()) newErrors.name = "Product name is required";
    if (!product.price || Number(product.price) <= 0) newErrors.price = "Enter a valid price";
    if (!product.category) newErrors.category = "Please select a category";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const formData = new FormData();

    // Append image or empty placeholder (backend handles both)
    if (image) {
      formData.append("imageFile", image);
    } else {
      formData.append("imageFile", new Blob([], { type: "image/jpeg" }), "placeholder.jpg");
    }

    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    try {
      await axios.post("http://localhost:8081/api/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await refreshData(); // Refresh global product list immediately
      setSubmitSuccess(true);
      setTimeout(() => navigate("/"), 1800);
    } catch (error) {
      console.error("Add product error:", error);
      const msg = error.response?.data || error.message || "Unknown error";
      alert("Failed to add product: " + msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center max-w-sm w-full mx-4 shadow-sm">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Added!</h2>
          <p className="text-gray-500">Successfully saved to database.</p>
          <p className="text-sm text-gray-400 mt-1">Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-1 text-gray-500 hover:text-emerald-600 text-sm mb-3 no-underline">
            <ChevronLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
          <p className="text-sm text-gray-500 mt-1">Fill in the details below to add a product to your store.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Basic Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h2 className="font-semibold text-gray-800 border-b border-gray-100 pb-2">Basic Information</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="e.g. Cotton Salwar Kameez - Blue"
                className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${errors.name ? "border-red-400 bg-red-50" : "border-gray-300"}`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
              <input
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleChange}
                placeholder="e.g. Bashira Textiles"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your product..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white ${errors.category ? "border-red-400 bg-red-50" : "border-gray-300"}`}
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h2 className="font-semibold text-gray-800 border-b border-gray-100 pb-2">Pricing & Stock</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (₹) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">₹</span>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className={`w-full pl-8 pr-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${errors.price ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                />
              </div>
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
              <input
                type="number"
                name="stockQuantity"
                value={product.stockQuantity}
                onChange={handleChange}
                placeholder="Enter available stock"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Release Date</label>
              <input
                type="date"
                name="releaseDate"
                value={product.releaseDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-3 pt-1">
              <input
                type="checkbox"
                name="productAvailable"
                id="productAvailable"
                checked={product.productAvailable}
                onChange={handleChange}
                className="w-5 h-5 rounded accent-emerald-600 cursor-pointer"
              />
              <label htmlFor="productAvailable" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                Product Available for Purchase
              </label>
            </div>
          </div>

          {/* Image Upload */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-800 border-b border-gray-100 pb-2 mb-4">Product Image <span className="text-gray-400 font-normal text-sm">(optional)</span></h2>

            {imagePreview ? (
              <div className="relative">
                <img src={imagePreview} alt="Preview" className="w-full max-h-64 object-contain rounded-lg border border-gray-200 bg-gray-50" />
                <button
                  type="button"
                  onClick={() => { setImage(null); setImagePreview(null); }}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center cursor-pointer border-0"
                >
                  <X className="w-4 h-4" />
                </button>
                <p className="text-xs text-gray-400 mt-2 text-center">{image?.name}</p>
              </div>
            ) : (
              <label className="block cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:border-emerald-500 hover:bg-emerald-50 transition-colors">
                  <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium text-sm">Click to upload product image</p>
                  <p className="text-gray-400 text-xs mt-1">PNG, JPG, WEBP — up to 10MB</p>
                </div>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}
          </div>

          {/* Submit */}
          <div className="flex gap-3 pb-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer border-0"
            >
              {isSubmitting ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Adding Product...</>
              ) : (
                <><Package className="w-5 h-5" /> Add Product</>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-6 py-3.5 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600 rounded-xl font-semibold cursor-pointer bg-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddProduct;
