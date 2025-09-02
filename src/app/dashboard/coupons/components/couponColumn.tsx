"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

export const couponColumns: ColumnDef<any>[] = [
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
  { accessorKey: "id", header: "ID" },
  { accessorKey: "code", header: "Code" },
  { accessorKey: "discountIdr", header: "Discount (IDR)" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "expiresAt", header: "Expires At" },
  { accessorKey: "createdAt", header: "Created At" },
  { accessorKey: "quantity", header: "Quantity" },  // ✅ new
  { accessorKey: "used", header: "Used" },          // ✅ new
];