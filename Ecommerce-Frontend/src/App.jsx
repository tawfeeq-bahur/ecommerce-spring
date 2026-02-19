import "./App.css";
import React, { useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import Products from "./components/Products";
import Login from "./components/Login";
import Wishlist from "./components/Wishlist";
import Orders from "./components/Orders";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./Context/Context";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import UpdateProduct from "./components/UpdateProduct";

// Admin Components
import AdminLogin from "./components/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminProducts from "./components/admin/AdminProducts";
import AdminProductForm from "./components/admin/AdminProductForm";
import AdminCategories from "./components/admin/AdminCategories";
import AdminOrders from "./components/admin/AdminOrders";
import AdminUsers from "./components/admin/AdminUsers";
import AdminInvoices from "./components/admin/AdminInvoices";
import AdminFinance from "./components/admin/AdminFinance";
import AdminDiscounts from "./components/admin/AdminDiscounts";
import AdminReports from "./components/admin/AdminReports";
import AdminSettings from "./components/admin/AdminSettings";

// Protected Route Component for Admin
const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

// User Layout Component (with Navbar)
const UserLayout = ({ children, onSelectCategory }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar onSelectCategory={onSelectCategory} />
      {children}
    </div>
  );
};

function AppContent() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log("Selected category:", category);
  };

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <Routes>
      {/* User Routes */}
      <Route
        path="/"
        element={
          <UserLayout onSelectCategory={handleCategorySelect}>
            <Home 
              addToCart={addToCart} 
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
            />
          </UserLayout>
        }
      />
      <Route
        path="/add_product"
        element={
          <UserLayout onSelectCategory={handleCategorySelect}>
            <AddProduct />
          </UserLayout>
        }
      />
      <Route
        path="/add-product"
        element={
          <UserLayout onSelectCategory={handleCategorySelect}>
            <AddProduct />
          </UserLayout>
        }
      />
      <Route
        path="/products"
        element={
          <UserLayout onSelectCategory={handleCategorySelect}>
            <Products />
          </UserLayout>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/wishlist"
        element={
          <UserLayout onSelectCategory={handleCategorySelect}>
            <Wishlist />
          </UserLayout>
        }
      />
      <Route
        path="/orders"
        element={
          <UserLayout onSelectCategory={handleCategorySelect}>
            <Orders />
          </UserLayout>
        }
      />
      <Route
        path="/product"
        element={
          <UserLayout onSelectCategory={handleCategorySelect}>
            <Product />
          </UserLayout>
        }
      />
      <Route
        path="/product/:id"
        element={
          <UserLayout onSelectCategory={handleCategorySelect}>
            <Product />
          </UserLayout>
        }
      />
      <Route
        path="/cart"
        element={
          <UserLayout onSelectCategory={handleCategorySelect}>
            <Cart />
          </UserLayout>
        }
      />
      <Route
        path="/product/update/:id"
        element={
          <UserLayout onSelectCategory={handleCategorySelect}>
            <UpdateProduct />
          </UserLayout>
        }
      />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/new" element={<AdminProductForm />} />
        <Route path="products/add" element={<AdminProductForm />} />
        <Route path="products/edit/:id" element={<AdminProductForm />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="invoices" element={<AdminInvoices />} />
        <Route path="finance" element={<AdminFinance />} />
        <Route path="discounts" element={<AdminDiscounts />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
