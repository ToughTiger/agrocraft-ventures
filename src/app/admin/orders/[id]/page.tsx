
import { getOrderById } from "@/lib/queries";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FormattedCurrency } from "@/components/FormattedCurrency";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Mail, Phone } from "lucide-react";

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending': return 'secondary';
    case 'shipped': return 'default';
    case 'delivered': return 'outline';
    default: return 'destructive';
  }
};

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = await getOrderById(params.id);

  if (!order) {
    notFound();
  }

  const subtotal = order.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const shipping = 50; // Assuming a flat shipping rate
  const total = subtotal + shipping;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/admin/orders"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h1 className="font-headline text-3xl font-bold">Order #{order.id}</h1>
          <p className="text-muted-foreground">
            {new Date(order.createdAt).toLocaleDateString()} &bull; <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
          </p>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden sm:table-cell">Image</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items?.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="hidden sm:table-cell">
                        {item.product && (
                           <div className="relative h-16 w-16 rounded-md overflow-hidden">
                             <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover" />
                           </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{item.product?.name || 'N/A'}</TableCell>
                      <TableCell className="text-center">{item.quantity}</TableCell>
                      <TableCell className="text-right"><FormattedCurrency amount={item.price} /></TableCell>
                      <TableCell className="text-right"><FormattedCurrency amount={item.price * item.quantity} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex flex-col items-end space-y-2">
                <div className="flex justify-between w-full max-w-xs">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span><FormattedCurrency amount={subtotal}/></span>
                </div>
                 <div className="flex justify-between w-full max-w-xs">
                    <span className="text-muted-foreground">Shipping</span>
                    <span><FormattedCurrency amount={shipping}/></span>
                </div>
                <Separator className="my-2 w-full max-w-xs"/>
                 <div className="flex justify-between w-full max-w-xs font-bold text-lg">
                    <span>Total</span>
                    <span><FormattedCurrency amount={total}/></span>
                </div>
            </CardFooter>
          </Card>
        </div>
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                 <User className="h-5 w-5 text-muted-foreground"/>
                 <Link href={`/admin/customers/${order.customer?.id}`} className="font-medium hover:underline">{order.customer?.name}</Link>
              </div>
               <div className="flex items-center gap-3">
                 <Mail className="h-5 w-5 text-muted-foreground"/>
                 <span className="text-muted-foreground">{order.customer?.email}</span>
              </div>
                <div className="flex items-center gap-3">
                 <Phone className="h-5 w-5 text-muted-foreground"/>
                 <span className="text-muted-foreground">{order.customer?.mobile}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
