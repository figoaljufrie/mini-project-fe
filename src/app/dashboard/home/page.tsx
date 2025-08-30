"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ChartAreaAxes } from "@/components/dashboard/charts/chart-area";
import { DataTable, transactionColumns } from "@/components/dashboard/tables/recent-transaction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Transaction = {
  id: string;
  customer: string;
  event: string;
  amount: number;
  status: "ACCEPTED" | "WAITING_FOR_CONFIRMATION" | "REJECTED" | "CANCELLED";
};

const transactions: Transaction[] = [
  { id: "1", customer: "Alice Johnson", event: "Music Festival", amount: 120, status: "ACCEPTED" },
  { id: "2", customer: "Bob Smith", event: "Tech Conference", amount: 80, status: "WAITING_FOR_CONFIRMATION" },
  { id: "3", customer: "Charlie Brown", event: "Startup Pitch", amount: 200, status: "REJECTED" },
];

const totalAttendees = transactions.reduce((sum, t) => sum + t.amount, 0);
const totalCoupons = 52;
const totalEvents = 34;

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Total Attendees", value: totalAttendees },
          { title: "Total Coupon Used", value: totalCoupons },
          { title: "Total Events", value: totalEvents },
        ].map((item) => (
          <Card
            key={item.title}
            className="backdrop-blur-xl bg-gradient-to-br from-teal-400/30 via-teal-500/30 to-teal-600/30 border border-teal-700/40 transform transition-transform hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,128,128,0.7)]"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-black">{item.title}</CardTitle>
              <div className="h-px bg-black/20 mt-2" />
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-bold text-black">{item.value}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sales Chart + Transactions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 backdrop-blur-xl bg-gradient-to-br from-teal-400/30 via-teal-500/30 to-teal-600/30 border border-teal-700/40 transform transition-transform hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,128,128,0.7)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-black">Sales Over Time</CardTitle>
            <div className="h-px bg-black/20 mt-2" />
          </CardHeader>
          <CardContent>
            <ChartAreaAxes />
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-gradient-to-br from-teal-400/30 via-teal-500/30 to-teal-600/30 border border-teal-700/40 transform transition-transform hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,128,128,0.7)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-black">Recent Transactions</CardTitle>
            <div className="h-px bg-black/20 mt-2" />
          </CardHeader>
          <CardContent>
            <DataTable columns={transactionColumns} data={transactions} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}