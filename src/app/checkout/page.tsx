'use client';

import { useCart } from '@/hooks/use-cart';
import { getProductsByIds, createOrder, getUser } from '@/lib/queries';
import type { Product, User } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const checkoutSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [products, setProducts] = useState<(Product & { quantity: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
    },
  });

  useEffect(() => {
    async function fetchInitialData() {
      // In a real app, you'd get the user ID from the session/token
      const user = await getUser('1'); 
      if (user) {
        form.reset({
          name: user.name,
          email: user.email,
          address: user.address,
          city: user.city,
          postalCode: user.postalCode,
          country: user.country,
        });
      }

      const productIds = items.map((item) => item.productId);
      if (productIds.length > 0) {
        const fetchedProducts = await getProductsByIds(productIds);
        const productsWithQuantities = fetchedProducts.map((product) => ({
          ...product,
          quantity: items.find((item) => item.productId === product.id)?.quantity || 0,
        }));
        setProducts(productsWithQuantities);
      } else if (items.length === 0 && !loading) {
        router.replace('/products');
      }
      setLoading(false);
    }
    fetchInitialData();
  }, [items, loading, router, form]);
  
  const subtotal = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
        const orderData = {
            customerInfo: data,
            items: products.map(p => ({ productId: p.id, quantity: p.quantity, price: p.price })),
            total: subtotal,
        }
        await createOrder(orderData);
        toast({
            title: "Order Placed!",
            description: "Thank you for your purchase. Your order has been successfully placed.",
        });
        clearCart();
        router.push('/');
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Order Failed",
            description: "There was a problem placing your order. Please try again.",
        });
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-headline text-4xl font-bold mb-8 text-center">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="postalCode" render={({ field }) => (
                        <FormItem><FormLabel>Postal Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                <FormField control={form.control} name="country" render={({ field }) => (
                    <FormItem><FormLabel>Country</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />

                <Button type="submit" size="lg" className="w-full mt-6" disabled={form.formState.isSubmitting || items.length === 0}>
                    {form.formState.isSubmitting ? 'Placing Order...' : `Place Order - ${formatCurrency(subtotal)}`}
                </Button>
            </form>
          </Form>
        </div>

        <div className="bg-muted/50 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="flex items-center gap-4">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="rounded-md object-cover"
                />
                <div className="flex-grow">
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {product.quantity} x {formatCurrency(product.price)}
                  </p>
                </div>
                <p className="font-semibold">{formatCurrency(product.price * product.quantity)}</p>
              </div>
            ))}
          </div>
          <Separator className="my-6" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>{formatCurrency(subtotal)}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p>Free</p>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>{formatCurrency(subtotal)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
