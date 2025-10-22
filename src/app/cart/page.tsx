'use client';

import { useCart } from '@/hooks/use-cart';
import { getProductsByIds } from '@/lib/queries';
import type { Product } from '@prisma/client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
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
    fetchProducts();
  }, [items]);

  const subtotal = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <h1 className="font-headline text-4xl font-bold mb-8 text-center">Your Shopping Cart</h1>
          {loading ? (
              <div className="space-y-4">
                <CartItemSkeleton />
                <CartItemSkeleton />
              </div>
          ) : products.length === 0 ? (
            <div className="text-center text-muted-foreground">
              <p>Your cart is empty.</p>
              <Button asChild className="mt-4">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 border-b pb-4">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-grow">
                      <Link href={`/products/${product.slug}`} className="font-semibold hover:text-primary">
                        {product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{formatCurrency(product.price)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="1"
                        value={product.quantity}
                        onChange={(e) => updateQuantity(product.id, parseInt(e.target.value, 10))}
                        className="w-20"
                        aria-label={`Quantity for ${product.name}`}
                      />
                      <Button variant="ghost" size="icon" onClick={() => removeItem(product.id)} aria-label={`Remove ${product.name} from cart`}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="w-24 text-right font-semibold">
                      {formatCurrency(product.price * product.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <div className="w-full max-w-sm">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mt-1">Shipping and taxes calculated at checkout.</p>
                  <Button asChild size="lg" className="w-full mt-4">
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
