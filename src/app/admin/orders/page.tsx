"use client"
import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { getOrders } from "@/lib/queries"
import type { Order } from "@/lib/types";
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'secondary';
    case 'shipped':
      return 'default';
    case 'delivered':
      return 'outline';
    default:
      return 'destructive';
  }
};

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => <div className="font-mono">#{row.getValue("id")}</div>
  },
  {
    accessorKey: "customer.name",
    header: "Customer",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge variant={getStatusVariant(row.getValue("status"))}>{row.getValue("status")}</Badge>
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => <div className="text-right font-medium">{formatCurrency(row.getValue("total"))}</div>,
  },
   {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
                <Link href={`/admin/orders/${order.id}`}>View order details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Mark as shipped</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
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
  )
}


export default function OrdersPage() {
    const [data, setData] = React.useState<Order[]>([]);
    const [loading, setLoading] = React.useState(true);

    const fetchAndSetData = React.useCallback(async () => {
        setLoading(true);
        const orders = await getOrders();
        setData(orders);
        setLoading(false);
    }, []);

    React.useEffect(() => {
        fetchAndSetData();
    }, [fetchAndSetData]);
    
    if (loading) {
        return <div>Loading orders...</div>
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-headline text-3xl font-bold">Orders</h1>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
