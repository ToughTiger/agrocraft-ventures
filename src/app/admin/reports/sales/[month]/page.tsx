
import { getSalesForMonth } from "@/lib/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FormattedCurrency } from "@/components/FormattedCurrency";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function MonthlySalesReportPage({
  params,
}: {
  params: { month: string };
}) {
  const salesData = await getSalesForMonth(params.month);
  
  if (!salesData) {
    notFound();
  }

  const [monthName, year] = params.month.split('-');
  const formattedMonth = new Date(`${monthName} 1, 20${year}`).toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="icon">
                <Link href="/admin"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <div>
                <h1 className="font-headline text-3xl font-bold">
                    Sales Report
                </h1>
                <p className="text-muted-foreground">For {formattedMonth}</p>
            </div>
        </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Performance</CardTitle>
          <CardDescription>
            Product-wise sales breakdown for {formattedMonth}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Quantity Sold</TableHead>
                <TableHead className="text-right">Total Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesData.map((sale) => (
                <TableRow key={sale.productId}>
                  <TableCell>
                    <Link href={`/products/${sale.productSlug}`} className="font-medium hover:underline">
                      {sale.productName}
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">{sale.quantitySold}</TableCell>
                  <TableCell className="text-right">
                    <FormattedCurrency amount={sale.totalRevenue} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
