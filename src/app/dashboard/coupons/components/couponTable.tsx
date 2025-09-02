"use client";

import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Coupon } from "../hooks/useCoupon";
import { couponColumns } from "./couponColumn";
import { format } from "date-fns"; // ✅ import date-fns

interface CouponTableProps {
  coupons: Coupon[];
  search: string;
}

export default function CouponTable({ coupons, search }: CouponTableProps) {
  const [rowSelection, setRowSelection] = React.useState({});

  const flattenedCoupons = React.useMemo(
    () =>
      coupons
        .map((c) => ({
          id: c.id,
          code: c.code,
          discountIdr: c.discountIdr.toLocaleString(),
          type: c.type,
          status: c.status,
          expiresAt: c.expiresAt
            ? format(new Date(c.expiresAt), "M/d/yyyy") // ✅ formatted
            : "-",
          createdAt: format(new Date(c.createdAt), "M/d/yyyy"), // ✅ formatted
          quantity: c.quantity ?? 0,
          used: c.used ?? 0,
          remaining: (c.quantity ?? 0) - (c.used ?? 0),
        }))
        .filter(
          (c) =>
            c.code.toLowerCase().includes(search.toLowerCase()) ||
            c.type.toLowerCase().includes(search.toLowerCase()) ||
            c.status.toLowerCase().includes(search.toLowerCase())
        ),
    [coupons, search]
  );

  const columns = React.useMemo(() => couponColumns, []);

  const table = useReactTable({
    data: flattenedCoupons,
    columns: columns as ColumnDef<any, any>[],
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-white/30 overflow-x-auto">
        <Table className="min-w-full text-sm">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-white/30">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-3 py-2 whitespace-nowrap"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
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