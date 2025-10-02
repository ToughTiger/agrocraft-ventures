import { getProductBySlug, getProducts } from "@/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/ProductCard";
import { RecommendedProducts } from "@/components/RecommendedProducts";

// Client component for interactivity
function AddToCartButton({ productId }: { productId: string }) {
    'use client';
    const { useCart } = require('@/hooks/use-cart');
    const { addItem } = useCart();
    return <Button size="lg" onClick={() => addItem(productId)}>Add to Cart</Button>;
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  
  if (!product) {
    notFound();
  }

  const relatedProducts = (await getProducts()).filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <>
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint={product.imageHint}
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
            <h1 className="font-headline text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-3xl font-semibold mb-6">${product.price.toFixed(2)}</p>
            <Separator className="my-6" />
            <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>
            
            <AddToCartButton productId={product.id} />
            
            <p className="text-sm text-muted-foreground mt-4">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </p>
          </div>
        </div>
      </div>

      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4">
            <h2 className="font-headline text-3xl font-bold text-center mb-12">
            Customers also viewed
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(p => <ProductCard key={p.id} product={p}/>)}
            </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4">
            <h2 className="font-headline text-3xl font-bold text-center mb-12">
            Personalized For You
            </h2>
            <RecommendedProducts />
        </div>
      </section>
    </>
  );
}
