'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';

import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem(product.id);
    toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
    });
  }

  return (
    <Card className="flex flex-col overflow-hidden h-full">
      <CardHeader className="p-0">
        <Link href={`/products/${product.slug}`} className="block aspect-video relative">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            data-ai-hint={product.imageHint}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-lg mb-2">
          <Link href={`/products/${product.slug}`} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </CardTitle>
        <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="font-semibold text-lg">{formatCurrency(product.price)}</p>
        <Button size="icon" variant="outline" onClick={handleAddToCart}>
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add to cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
