'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { EnquiryForm } from './EnquiryForm';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isEnquiryFormOpen, setIsEnquiryFormOpen] = useState(false);

  return (
    <>
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
        <CardFooter className="p-4">
          <Button className="w-full" onClick={() => setIsEnquiryFormOpen(true)}>Price on request</Button>
        </CardFooter>
      </Card>
      <EnquiryForm 
        product={product}
        open={isEnquiryFormOpen}
        onOpenChange={setIsEnquiryFormOpen}
      />
    </>
  );
}
