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
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table"
import { useSearchParams, useRouter } from 'next/navigation'

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
import Link from "next/link"
import { Input } from "@/components/ui/input"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  initialFilters?: ColumnFiltersState,
}

function DataTable<TData, TValue>({
  columns,
  data,
  initialFilters = [],
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(initialFilters)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
        sorting,
        columnFilters,
    }
  })

  return (
    <div>
       <div className="flex items-center py-4">
        <Input
          placeholder="Filter products..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
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

function ProductsPageContent() {
    const [data, setData] = React.useState<Product[]>([]);
    const [loading, setLoading] = React.useState(true);
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const categoryFilter = searchParams.get('category');

    const initialFilters: ColumnFiltersState = React.useMemo(() => {
      const filters: ColumnFiltersState = [];
      if (categoryFilter) {
          filters.push({ id: 'category', value: categoryFilter });
      }
      return filters;
    }, [categoryFilter]);


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

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <DataTable columns={columns} data={data} initialFilters={initialFilters} />
        </div>
    )
}

export default function ProductsPage() {
    return (
        <React.Suspense fallback={<div>Loading products...</div>}>
            <ProductsPageContent />
        </React.Suspense>
    )
}
