"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

export const eventColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  { accessorKey: "eventId", header: "Event ID" },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "startsAt", header: "Start Date" },
  { accessorKey: "quantity", header: "Quantity" },
  { accessorKey: "priceIdr", header: "Price (IDR)" },
  { accessorKey: "organizerName", header: "Organizer" },
];
