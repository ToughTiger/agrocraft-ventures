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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { getColumns } from "./columns"
import { deleteProduct, getProducts } from "@/lib/queries"
import type { Product } from "@/lib/types";
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"

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
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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


export default function ProductsPage() {
    const [data, setData] = React.useState<Product[]>([]);
    const [loading, setLoading] = React.useState(true);
    const { toast } = useToast();
    const router = useRouter();

    const fetchAndSetData = React.useCallback(async () => {
        setLoading(true);
        const products = await getProducts();
        setData(products);
        setLoading(false);
    }, []);

    React.useEffect(() => {
        fetchAndSetData();
    }, [fetchAndSetData]);

    const handleDeleteProduct = async (productId: string) => {
        try {
            await deleteProduct(productId);
            toast({
                title: "Product Deleted",
                description: "The product has been successfully deleted.",
            });
            // Re-fetch data to update the table
            fetchAndSetData();
        } catch (error) {
             toast({
                variant: "destructive",
                title: "Deletion Failed",
                description: "There was a problem deleting the product.",
            });
        }
    }

    const columns = React.useMemo(() => getColumns(handleDeleteProduct), [handleDeleteProduct]);
    
    if (loading) {
        return <div>Loading products...</div>
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-headline text-3xl font-bold">Products</h1>
                <Button asChild>
                  <Link href="/admin/products/new">Add Product</Link>
                </Button>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
