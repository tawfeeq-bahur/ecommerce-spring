import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Users,
  Eye,
  ChevronDown,
  Download,
  Search,
} from "lucide-react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, ordersRes, productsRes] = await Promise.all([
        axios.get("http://localhost:8081/api/admin/dashboard"),
        axios.get("http://localhost:8081/api/admin/orders"),
        axios.get("http://localhost:8081/api/products"),
      ]);
      setStats(statsRes.data);
      setRecentOrders(ordersRes.data.slice(0, 8));
      setProducts(productsRes.data.slice(0, 5));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total orders",
      value: stats.totalOrders || 45,
      icon: ShoppingBag,
      change: "+9% from last period",
      positive: true,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Gross Sale",
      value: `$${(stats.totalRevenue || 31700).toLocaleString()}`,
      icon: DollarSign,
      change: "+3% from last period",
      positive: true,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Leads & visits",
      value: (stats.totalUsers * 1000 || 45901).toLocaleString(),
      icon: TrendingUp,
      change: "-3% from last period",
      positive: false,
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600",
    },
    {
      title: "Returning customers",
      value: stats.totalUsers || 45,
      icon: Users,
      change: "+9% from last period",
      positive: true,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  // Sample chart data (months)
  const chartData = [
    { month: "Yan", value: 12 },
    { month: "Fev", value: 18 },
    { month: "Mar", value: 17 },
    { month: "Apr", value: 14 },
    { month: "May", value: 10 },
    { month: "Iyun", value: 12 },
    { month: "Iyu", value: 12 },
    { month: "Avg", value: 2 },
    { month: "Sen", value: 3 },
    { month: "Okt", value: 8 },
    { month: "Nov", value: 8 },
    { month: "Dek", value: 16 },
  ];

  const maxValue = Math.max(...chartData.map((d) => d.value));

  const getStatusStyle = (status) => {
    const styles = {
      PENDING: "bg-orange-50 text-orange-600 border border-orange-200",
      CONFIRMED: "bg-blue-50 text-blue-600 border border-blue-200",
      PROCESSING: "bg-purple-50 text-purple-600 border border-purple-200",
      SHIPPED: "bg-cyan-50 text-cyan-600 border border-cyan-200",
      DELIVERED: "bg-green-50 text-green-600 border border-green-200",
      CANCELLED: "bg-red-50 text-red-600 border border-red-200",
      Completed: "bg-green-50 text-green-600 border border-green-200",
      Pending: "bg-orange-50 text-orange-600 border border-orange-200",
      Rejected: "bg-red-50 text-red-600 border border-red-200",
      Draft: "bg-gray-50 text-gray-600 border border-gray-200",
    };
    return styles[status] || styles.PENDING;
  };

  const getStatusIcon = (status) => {
    if (status === "DELIVERED" || status === "Completed") return "✓";
    if (status === "CANCELLED" || status === "Rejected") return "✕";
    if (status === "PENDING" || status === "Pending") return "◔";
    if (status === "Draft") return "◱";
    return "";
  };

  const filteredOrders = recentOrders.filter((order) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return order.status === "PENDING";
    if (activeTab === "confirmed") return order.status === "CONFIRMED" || order.status === "DELIVERED";
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-3 border-purple-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg">
          <span className="text-sm text-gray-700">This month</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
          <Download className="w-4 h-4" />
          Export data
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-5 border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className={`text-xs mt-2 ${stat.positive ? "text-green-600" : "text-red-500"}`}>
                  {stat.change}
                </p>
              </div>
              <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Sales Growth Chart */}
        <div className="lg:col-span-3 bg-white rounded-xl p-6 border border-gray-100">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Sales growth chart</h3>
            <p className="text-sm text-gray-500">Last 12 month</p>
          </div>
          
          {/* Simple Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-2">
            {chartData.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-blue-400 rounded-t-sm transition-all hover:bg-blue-500"
                  style={{ height: `${(item.value / maxValue) * 200}px` }}
                />
                <span className="text-xs text-gray-500 mt-2">{item.month}</span>
              </div>
            ))}
          </div>
          
          {/* Y-axis labels */}
          <div className="flex justify-between mt-4 text-xs text-gray-400">
            <span>0</span>
            <span>5</span>
            <span>10</span>
            <span>15</span>
            <span>20</span>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top selling products</h3>
            <p className="text-sm text-gray-500">From 2025 Jan - 2025 Dec</p>
          </div>
          
          <div className="space-y-4">
            {products.length > 0 ? (
              products.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 w-4">{index + 1}.</span>
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-sm">
                      🛍️
                    </div>
                    <span className="text-sm text-gray-700 truncate max-w-32">{product.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{product.stockQuantity || 100} pcs</span>
                    <span className="text-sm font-medium text-gray-900">₹{product.price?.toLocaleString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">1.</span>
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">🧴</div>
                    <span className="text-sm text-gray-700">Bonaqua water 2 litres</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">794 pcs</span>
                    <span className="text-sm font-medium">$28,967</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">2.</span>
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">🥤</div>
                    <span className="text-sm text-gray-700">Coca cola classic 0.5 litr</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">138 pcs</span>
                    <span className="text-sm font-medium">$8,710</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">3.</span>
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">📱</div>
                    <span className="text-sm text-gray-700">Samsung Galaxy S27 Black</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">124 pcs</span>
                    <span className="text-sm font-medium">$710</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <button className="mt-6 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
            View more
          </button>
        </div>
      </div>

      {/* Latest Orders */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Latest orders</h3>
        </div>
        
        {/* Tabs */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("all")}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "all"
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              All orders
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "pending"
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab("confirmed")}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "confirmed"
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Confirmed
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search item"
                className="w-40 pl-3 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              Search
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Order ID</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Date</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Order by</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Total sum</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-blue-600">#{order.orderNumber || order.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{order.customerName || "Guest"}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(order.status)}`}>
                        <span>{getStatusIcon(order.status)}</span>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm text-gray-500">INR </span>
                      <span className="text-sm font-medium text-gray-900">
                        {order.total?.toLocaleString() || "0.00"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/admin/orders/${order.id}`}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                      >
                        View detail
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <Link
            to="/admin/orders"
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
          >
            View all orders
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Pages</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
            <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800">
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
