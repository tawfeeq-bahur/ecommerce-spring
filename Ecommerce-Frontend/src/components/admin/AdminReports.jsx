import React from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Download, ChevronDown } from "lucide-react";

const AdminReports = () => {
  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select className="appearance-none pl-4 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>This year</option>
              <option>All time</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
          <Download className="w-4 h-4" />
          Export report
        </button>
      </div>

      {/* Coming Soon */}
      <div className="bg-white rounded-xl border border-gray-100 py-24">
        <div className="flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <BarChart3 className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Reports Dashboard</h3>
          <p className="text-gray-500 mb-6">Detailed analytics and reports coming soon</p>
          <div className="flex gap-4">
            <div className="text-center px-6 py-4 bg-gray-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Sales Analytics</p>
            </div>
            <div className="text-center px-6 py-4 bg-gray-50 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Traffic Reports</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
