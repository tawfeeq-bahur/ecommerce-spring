import React from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown, CreditCard } from "lucide-react";

const AdminFinance = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "₹45,231",
      change: "+12.5%",
      positive: true,
      icon: DollarSign,
    },
    {
      title: "Total Expenses",
      value: "₹12,450",
      change: "+3.2%",
      positive: false,
      icon: CreditCard,
    },
    {
      title: "Net Profit",
      value: "₹32,781",
      change: "+15.3%",
      positive: true,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
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
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-2 rounded-lg ${stat.positive ? "bg-green-100" : "bg-red-100"}`}>
                <stat.icon className={`w-5 h-5 ${stat.positive ? "text-green-600" : "text-red-600"}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Coming Soon */}
      <div className="bg-white rounded-xl border border-gray-100 py-24">
        <div className="flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <DollarSign className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Finance Dashboard</h3>
          <p className="text-gray-500">Detailed financial reports coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default AdminFinance;
