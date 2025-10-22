'use client';

import { useCart } from '@/hooks/use-cart';
import { getProductsByIds, getUser } from '@/lib/queries';
import type { Product, User } from '@prisma/client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Pencil } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function CartItemSkeleton() {
    return (
        <div className="flex items-center gap-4 border-b pb-4">
            <Skeleton className="h-20 w-20 rounded-md" />
            <div className="flex-grow space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-10" />
            </div>
            <Skeleton className="h-6 w-24" />
      </div>
    )
}

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart();
  const [products, setProducts] = useState<(Product & { quantity: number })[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCartData() {
      setLoading(true);
      
      // Fetch user data
      // In a real app, you'd get the user ID from the session/token
      const fetchedUser = await getUser('1');
      setUser(fetchedUser);

      // Fetch product data
      const productIds = items.map((item) => item.productId);
      if (productIds.length > 0) {
        const fetchedProducts = await getProductsByIds(productIds);
        const productsWithQuantities = fetchedProducts.map((product) => ({
          ...product,
          quantity: items.find((item) => item.productId === product.id)?.quantity || 0,
        }));
        setProducts(productsWithQuantities);
      } else {
        setProducts([]);
      }
      setLoading(false);
    }
    fetchCartData();
  }, [items]);

  const subtotal = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

  return (
    <>
        <div className="container max-w-6xl mx-auto px-4 py-12">
          <h1 className="font-headline text-4xl font-bold mb-8 text-center">Your Shopping Cart</h1>
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {loading ? (
                  <div className="space-y-4">
                    <CartItemSkeleton />
                    <CartItemSkeleton />
                  </div>
              ) : products.length === 0 ? (
                <div className="text-center text-muted-foreground py-16">
                  <p className="text-xl">Your cart is empty.</p>
                  <Button asChild className="mt-4">
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center gap-6 border-b pb-6">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-grow">
                        <Link href={`/products/${product.slug}`} className="font-semibold text-lg hover:text-primary">
                          {product.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">{formatCurrency(product.price)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Input
                          type="number"
                          min="1"
                          value={product.quantity}
                          onChange={(e) => updateQuantity(product.id, parseInt(e.target.value, 10))}
                          className="w-20"
                          aria-label={`Quantity for ${product.name}`}
                        />
                        <Button variant="ghost" size="icon" onClick={() => removeItem(product.id)} aria-label={`Remove ${product.name} from cart`}>
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                      <div className="w-28 text-right font-semibold text-lg">
                        {formatCurrency(product.price * product.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-8">
               <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Shipping To
                      <Button variant="ghost" size="icon" asChild>
                        <Link href="/checkout"><Pencil className="h-4 w-4" /></Link>
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    {loading ? (
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    ) : user ? (
                      <>
                        <p className="font-semibold text-foreground">{user.name}</p>
                        <p>{user.address}</p>
                        <p>{user.city}, {user.postalCode}</p>
                        <p>{user.country}</p>
                      </>
                    ) : (
                      <p>User details not available.</p>
                    )}
                  </CardContent>
                </Card>
              
               <Card>
                 <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                 </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="flex justify-between font-medium">
                      <span>Subtotal</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <p className="text-muted-foreground text-sm">Shipping and taxes calculated at checkout.</p>
                    <Button asChild size="lg" className="w-full" disabled={products.length === 0}>
                      <Link href="/checkout">Proceed to Checkout</Link>
                    </Button>
                  </CardContent>
                </Card>
            </div>
          </div>
        </div>
    </>
  );
}
