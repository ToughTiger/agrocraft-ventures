
import { getCustomerById, getOrdersByCustomerId, getProductsBySlugs, getUser } from "@/lib/queries";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingCart, Eye } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link";
import Image from "next/image";
import { FormattedCurrency } from "@/components/FormattedCurrency";

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending': return 'secondary';
    case 'shipped': return 'default';
    case 'delivered': return 'outline';
    default: return 'destructive';
  }
};

export default async function CustomerDetailPage({ params }: { params: { id: string } }) {
  const customer = await getCustomerById(params.id);
  
  if (!customer) {
    notFound();
  }

  const orders = await getOrdersByCustomerId(customer.id);
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

  // In a real app, the user might be linked via customer.userId
  const user = await getUser(customer.userId || customer.id);
  const browsingHistorySlugs = user?.browsingHistory ? user.browsingHistory.split(',') : [];
  const browsedProducts = await getProductsBySlugs(browsingHistorySlugs);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="font-headline text-3xl font-bold">{customer.name}</h1>
            <p className="text-muted-foreground">{customer.email} &bull; {customer.mobile}</p>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold"><FormattedCurrency amount={totalSpent} /></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Browsed</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{browsedProducts.length}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map(order => (
                            <TableRow key={order.id}>
                                <TableCell className="font-mono">#{order.id}</TableCell>
                                <TableCell><Badge variant={getStatusVariant(order.status)}>{order.status}</Badge></TableCell>
                                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right"><FormattedCurrency amount={order.total} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Browsing History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {browsedProducts.length > 0 ? browsedProducts.map(product => (
                     <div key={product.id} className="flex items-center gap-4">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden">
                           <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                        </div>
                        <div>
                            <Link href={`/products/${product.slug}`} className="font-medium hover:underline">{product.name}</Link>
                            <p className="text-sm text-muted-foreground">{product.category?.name}</p>
                        </div>
                     </div>
                )) : (
                    <p className="text-sm text-muted-foreground">No browsing history found.</p>
                )}
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
