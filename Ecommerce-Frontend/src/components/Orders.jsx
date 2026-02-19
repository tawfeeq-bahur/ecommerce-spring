import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Package, ChevronRight, ShoppingBag, Clock } from "lucide-react";
import Footer from "./Footer";

const ORDER_STATUSES = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700" },
  confirmed: { label: "Confirmed", color: "bg-blue-100 text-blue-700" },
  shipped: { label: "Shipped", color: "bg-purple-100 text-purple-700" },
  delivered: { label: "Delivered", color: "bg-emerald-100 text-emerald-700" },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-700" },
};

const OrderCard = ({ order }) => {
  const status = ORDER_STATUSES[order.status] || ORDER_STATUSES.pending;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-sm transition-shadow">
      {/* Order Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-xs text-gray-400">ORDER ID</p>
            <p className="text-sm font-semibold text-gray-800">#{order.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">DATE</p>
            <p className="text-sm text-gray-700">{order.date}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">TOTAL</p>
            <p className="text-sm font-bold text-emerald-700">₹{order.total}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
          {status.label}
        </span>
      </div>

      {/* Order Items */}
      <div className="px-5 py-3 space-y-3">
        {order.items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-2xl">📦</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
              <p className="text-xs text-gray-400">Qty: {item.quantity} × ₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Order Footer */}
      <div className="px-5 py-3 border-t border-gray-100 flex justify-end">
        <button className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1 bg-transparent border-0 cursor-pointer font-medium">
          View Details <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const Orders = () => {
  const [orders, setOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("orders")) || [];
    } catch {
      return [];
    }
  });
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { key: "all", label: "All Orders" },
    { key: "pending", label: "Active" },
    { key: "delivered", label: "Delivered" },
    { key: "cancelled", label: "Cancelled" },
  ];

  const filtered = activeTab === "all" ? orders : orders.filter((o) => o.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Package className="w-7 h-7 text-emerald-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
            <p className="text-gray-500 text-sm">{orders.length} order{orders.length !== 1 ? "s" : ""} placed</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 rounded-lg text-sm font-medium cursor-pointer border-0 transition-colors ${
                activeTab === tab.key
                  ? "bg-white text-emerald-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700 bg-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-6">
              {activeTab === "all"
                ? "You haven't placed any orders. Start shopping now!"
                : `No ${activeTab} orders found.`}
            </p>
            <Link
              to="/products"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium no-underline inline-block transition-colors"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
