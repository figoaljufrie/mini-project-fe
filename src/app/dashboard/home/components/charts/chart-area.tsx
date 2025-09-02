"use client";

import { useDashboardStats } from "@/app/dashboard/hooks/useDashboard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Generate a full year of months
const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function ChartAreaAxes() {
  const { revenue } = useDashboardStats();

  if (revenue.isLoading) {
    return <div className="p-4">Loading revenue chart...</div>;
  }

  if (revenue.isError) {
    return (
      <div className="p-4 text-red-600">
        Error loading revenue chart: {revenue.error?.message}
      </div>
    );
  }

  // Assume API returns an object like { Jan: 1000, Feb: 2000, ... }
  const revenueData = revenue.data || {};

  // Map into recharts format with all 12 months
  const data = months.map((month) => ({
    name: month,
    sales: revenueData[month] ?? 0,
  }));

  return (
    <div className="p-4 rounded-2xl shadow-md bg-white/20">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300/40" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#16a34a"
            fillOpacity={1}
            fill="url(#colorSales)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}