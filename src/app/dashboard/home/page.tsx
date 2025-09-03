"use client";

import { useDashboardStats } from "@/app/dashboard/hooks/useDashboard";
import { useTransactions } from "@/app/dashboard/hooks/useTransaction"; // correct hook
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "./components/tables/recent-transaction";
import { ChartAreaAxes } from "./components/charts/chart-area";
import { ColumnDef } from "@tanstack/react-table";
import { TransactionWithRelations } from "./components/tables/recent-transaction";

// Read-only columns for Dashboard
const transactionColumnsReadOnly: ColumnDef<TransactionWithRelations>[] = [
  {
    accessorKey: "user",
    header: "Customer",
    cell: ({ row }) => row.original.user?.name ?? "Unknown",
  },
  {
    accessorKey: "event",
    header: "Event",
    cell: ({ row }) => row.original.event?.title ?? "Unknown",
  },
  {
    accessorKey: "totalIdr",
    header: "Amount Paid",
    cell: ({ row }) => (
      <span className="font-medium">
        {typeof row.original.totalIdr === "number"
          ? row.original.totalIdr.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            })
          : "0"}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status ?? "UNKNOWN";
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
      return (
        <span className={`${color} font-medium`}>
          {status.replace(/_/g, " ")}
        </span>
      );
    },
  },
];

export default function DashboardHomePage() {
  const { revenue, attendees, coupons, events } = useDashboardStats();
  const { transactions, loading, error, refetch } = useTransactions();

  // Loading state
  if (
    loading ||
    revenue.isLoading ||
    attendees.isLoading ||
    coupons.isLoading ||
    events.isLoading
  ) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  // Error state
  if (
    error ||
    revenue.isError ||
    attendees.isError ||
    coupons.isError ||
    events.isError
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
              transactions: error,
            },
            null,
            2
          )}
        </pre>
      </div>
    );
  }

  // KPI values
  const totalAttendees = attendees.data ?? 0;
  const totalEvents = events.data ?? 0;

  const couponsData = Array.isArray(coupons.data) ? coupons.data : [];
  const totalCoupons = couponsData.length;
  const totalCouponsUsed = couponsData.reduce(
    (acc, c) => acc + (c.used ?? 0),
    0
  );

  // Only DONE transactions for revenue
  const doneTransactions = transactions.filter(tx => tx.status === "DONE");
  const totalRevenueFromDone = doneTransactions.reduce(
    (acc, tx) => acc + (tx.totalIdr ?? 0),
    0
  );

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
            <div className="mb-4 text-3xl font-bold text-black">
              {totalRevenueFromDone.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              })}
            </div>
            <ChartAreaAxes transactions={doneTransactions} />
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
              data={transactions} // full transactions list
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}