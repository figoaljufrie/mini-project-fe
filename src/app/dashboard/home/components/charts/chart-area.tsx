"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TransactionWithRelations } from "../tables/recent-transaction";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

interface ChartAreaAxesProps {
  transactions?: TransactionWithRelations[];
}

export function ChartAreaAxes({ transactions = [] }: ChartAreaAxesProps) {
  // Filter only DONE transactions
  const doneTransactions = transactions.filter((tx) => tx.status === "DONE");

  // Debug: log to make sure we have transactions
  console.log("DONE transactions for chart:", doneTransactions);

  // Group revenue by month
  const revenueByMonth: Record<string, number> = {};
  doneTransactions.forEach((tx) => {
    // Make sure createdAt is valid
    const date = tx.createdAt ? new Date(tx.createdAt) : new Date();
    const month = months[date.getMonth()];
    revenueByMonth[month] = (revenueByMonth[month] || 0) + (tx.totalIdr ?? 0);
  });

  // Prepare data for Recharts
  const data = months.map((month) => ({
    name: month,
    sales: revenueByMonth[month] || 0,
  }));

  // Debug: log chart data
  console.log("Chart data:", data);

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
          <Tooltip
            formatter={(value: number) =>
              value.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })
            }
          />
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