import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/queries";

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-headline text-4xl font-bold mb-4">All Products</h1>
      <p className="text-muted-foreground mb-8">
        Browse our collection of premium spices and flours.
      </p>

      {categories.map(category => (
        <div key={category} className="mb-12">
          <h2 className="font-headline text-2xl font-bold mb-6">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.filter(p => p.category === category).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
