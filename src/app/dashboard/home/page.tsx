"use client";

import { useDashboardStats, useTransactions } from "@/app/dashboard/hooks/useDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "./components/tables/recent-transaction";
import { ChartAreaAxes } from "./components/charts/chart-area";
import { ColumnDef } from "@tanstack/react-table";

// Read-only columns for Dashboard
const transactionColumnsReadOnly: ColumnDef<any>[] = [
  { accessorKey: "customer", header: "Customer" },
  { accessorKey: "event", header: "Event" },
  { accessorKey: "amount", header: "Amount Paid", cell: ({ row }) => (
      <span className="font-medium">
        {typeof row.original.amount === "number"
          ? row.original.amount.toLocaleString("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 })
          : "-"}
      </span>
  ) },
  { accessorKey: "status", header: "Status", cell: ({ row }) => {
      const status = row.original.status;
      const statusMap: Record<string, string> = {
        DONE: "text-green-500",
        WAITING_FOR_PAYMENT: "text-yellow-500",
        WAITING_FOR_ADMIN_CONFIRMATION: "text-yellow-500",
        REJECTED: "text-red-500",
        EXPIRED: "text-gray-500",
        CANCELED: "text-gray-500",
        UNKNOWN: "text-gray-400",
      };
      const color = statusMap[status] || "text-gray-400";
      return <span className={`${color} font-medium`}>{status.replace(/_/g, " ")}</span>;
  } },
];

export default function DashboardHomePage() {
  const { revenue, attendees, coupons, events } = useDashboardStats();
  const transactions = useTransactions();

  // Loading
  if (
    revenue.isLoading ||
    attendees.isLoading ||
    coupons.isLoading ||
    events.isLoading ||
    transactions.isLoading
  ) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  // Error handling
  if (
    revenue.isError ||
    attendees.isError ||
    coupons.isError ||
    events.isError ||
    transactions.isError
  ) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold text-red-600 mb-4">
          Error loading dashboard
        </h2>
        <pre className="bg-gray-100 p-4 rounded-md text-sm text-red-700 overflow-auto">
          {JSON.stringify(
            {
              revenue: revenue.error?.message,
              attendees: attendees.error?.message,
              coupons: coupons.error?.message,
              events: events.error?.message,
              transactions: transactions.error?.message,
            },
            null,
            2
          )}
        </pre>
      </div>
    );
  }

  // Totals
  const totalRevenue = revenue.data ?? 0;
  const totalAttendees = attendees.data ?? 0;
  const totalEvents = events.data ?? 0;

  // Coupons
  const couponsData = Array.isArray(coupons.data) ? coupons.data : [];
  const totalCoupons = couponsData.length;
  const totalCouponsUsed = couponsData.reduce(
    (acc, c) => acc + (c.used ?? 0),
    0
  );

  // Transactions for table
  const transactionsData = Array.isArray(transactions.data) ? transactions.data : [];
  const transactionsForTable = transactionsData.map((t: any) => ({
    id: t.id.toString() ?? "-",
    customer: t.user?.name ?? "Unknown",
    event: t.event?.title ?? "Unknown",
    amount: t.totalIdr ?? 0,
    status: t.status ?? "UNKNOWN",
  }));

  return (
    <div className="max-w-7xl mx-auto space-y-10 p-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Total Attendees", value: totalAttendees },
          { title: "Total Coupons", value: totalCoupons },
          { title: "Total Coupons Used", value: totalCouponsUsed },
          { title: "Total Events", value: totalEvents },
        ].map((item) => (
          <Card
            key={item.title}
            className="backdrop-blur-xl bg-gradient-to-br from-teal-400/30 via-teal-500/30 to-teal-600/30 
            border border-teal-700/40 transform transition-transform hover:-translate-y-1 
            hover:shadow-[0_6px_15px_rgba(0,128,128,0.6)]"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-black">
                {item.title}
              </CardTitle>
              <div className="h-px bg-black/20 mt-2" />
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-bold text-black">
                {typeof item.value === "number"
                  ? item.value.toLocaleString()
                  : item.value}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue + Transactions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card
          className="md:col-span-2 backdrop-blur-xl bg-gradient-to-br from-teal-400/30 via-teal-500/30 to-teal-600/30 
          border border-teal-700/40 transform transition-transform hover:-translate-y-1 
          hover:shadow-[0_6px_15px_rgba(0,128,128,0.6)]"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-black">
              Revenue Overview
            </CardTitle>
            <div className="h-px bg-black/20 mt-2" />
          </CardHeader>
          <CardContent>
            <ChartAreaAxes />
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card
          className="backdrop-blur-xl bg-gradient-to-br from-teal-400/30 via-teal-500/30 to-teal-600/30 
          border border-teal-700/40 transform transition-transform hover:-translate-y-1 
          hover:shadow-[0_6px_15px_rgba(0,128,128,0.6)]"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-black">
              Recent Transactions
            </CardTitle>
            <div className="h-px bg-black/20 mt-2" />
          </CardHeader>
          <CardContent>
            <DataTable
              columns={transactionColumnsReadOnly}
              data={transactionsForTable}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}