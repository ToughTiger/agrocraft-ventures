
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/queries";
import type { Product } from "@/lib/types";

export default async function ProductsPage() {
  const products: Product[] = await getProducts();
  
  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    if (product.category) {
      if (!acc[product.category.id]) {
        acc[product.category.id] = {
          ...product.category,
          products: [],
        };
      }
      acc[product.category.id].products.push(product);
    }
    return acc;
  }, {} as Record<string, { id: string; name: string; slug: string; products: Product[] }>);

  const categoriesWithProducts = Object.values(productsByCategory);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-headline text-4xl font-bold mb-4">All Products</h1>
      <p className="text-muted-foreground mb-8">
        Browse our collection of premium spices and flours.
      </p>

      {categoriesWithProducts.map(category => (
        <div key={category.id} className="mb-12">
          <h2 className="font-headline text-2xl font-bold mb-6">{category.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {category.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
