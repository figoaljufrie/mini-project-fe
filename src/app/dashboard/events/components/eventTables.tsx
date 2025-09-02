"use client";

import { Event } from "@/app/dashboard/services/eventService";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { eventColumns } from "./eventColumns";

interface EventTableProps {
  events: Event[];
  search: string;
}

export default function EventTable({ events, search }: EventTableProps) {
  const [rowSelection, setRowSelection] = React.useState({});

  // Flatten & filter (unchanged logic)
  const flattenedEvents = React.useMemo(
    () =>
      events
        .map((e) => ({
          eventId: e.eventId,
          title: e.title,
          startsAt: new Date(e.startsAt).toLocaleDateString(),
          quantity: e.quantity,
          priceIdr: e.priceIdr.toLocaleString(),
          organizerName: e.organizer?.name ?? "Unknown",
        }))
        .filter((e) => e.title.toLowerCase().includes(search.toLowerCase())),
    [events, search]
  );

  const columns = React.useMemo(() => eventColumns, []);

  const table = useReactTable({
    data: flattenedEvents,
    columns: columns as ColumnDef<any, any>[],
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

      {/* Pagination (same as Transactions) */}
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
