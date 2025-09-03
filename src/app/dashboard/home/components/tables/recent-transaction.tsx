// src/app/dashboard/home/components/tables/recent-transaction.tsx
"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  transactionService,
  Transaction,
  Event,
  User,
} from "@/app/dashboard/services/transactionService";

// Extend transaction to include relations
export interface TransactionWithRelations extends Transaction {
  id: number;
  userId: number;
  eventId: number;
  status: string;
  totalIdr: number;
  user?: { id: number; name: string };
  event?: { eventId: number; title: string };
  createdAt: string; // <-- add this
}

type DataTableProps<TData> = {
  columns: ColumnDef<TData, any>[];
  data: TData[];
};

export function DataTable<TData>({ columns, data }: DataTableProps<TData>) {
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-white/30 overflow-x-auto">
        <Table className="min-w-full text-sm">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-white/30"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-3 py-2 whitespace-nowrap"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-white/10 hover:bg-white/5 transition"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-3 py-2 whitespace-nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-sm text-muted-foreground"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

// Transaction columns
export const transactionColumns = (
  refetch: () => void
): ColumnDef<TransactionWithRelations>[] => [
  {
    accessorKey: "user",
    header: "Customer",
    cell: ({ row }) => row.original.user?.name || "-",
  },
  {
    accessorKey: "event",
    header: "Event",
    cell: ({ row }) => row.original.event?.title || "-",
  },
  {
    accessorKey: "totalIdr",
    header: "Amount Paid",
    cell: ({ row }) => (
      <span>
        {typeof row.original.totalIdr === "number"
          ? row.original.totalIdr.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            })
          : "-"}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status || "UNKNOWN";
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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const tx = row.original as TransactionWithRelations;

      if (tx.status !== "WAITING_FOR_ADMIN_CONFIRMATION") {
        return <span className="text-gray-400">-</span>;
      }

      const handleApprove = async () => {
        try {
          // Optimistic update: update local state first
          tx.status = "DONE";
          refetch(); // fetch fresh from backend
          await transactionService.updateStatus(Number(tx.id), "DONE");
        } catch (err: any) {
          console.error("Failed to approve transaction:", err);
          alert(err?.response?.data?.message || err.message);
        }
      };

      const handleReject = async () => {
        try {
          tx.status = "REJECTED";
          refetch();
          await transactionService.updateStatus(Number(tx.id), "REJECTED");
        } catch (err: any) {
          console.error("Failed to reject transaction:", err);
          alert(err?.response?.data?.message || err.message);
        }
      };

      return (
        <div className="flex gap-2">
          <Button
            size="sm"
            className="bg-green-500 text-white hover:bg-green-600"
            onClick={handleApprove}
          >
            Approve
          </Button>
          <Button
            size="sm"
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={handleReject}
          >
            Reject
          </Button>
        </div>
      );
    },
  },
];
