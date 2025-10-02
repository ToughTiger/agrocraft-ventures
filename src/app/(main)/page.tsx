import { Button } from "@/components/ui/button";
import { getFeaturedProducts } from "@/lib/queries";
import { ProductCard } from "@/components/ProductCard";
import Image from "next/image";
import { RecommendedProducts } from "@/components/RecommendedProducts";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white">
        <Image 
          src="https://picsum.photos/seed/hero/1800/1200" 
          alt="A vibrant display of assorted spices"
          fill
          className="object-cover -z-10 brightness-50"
          priority
          data-ai-hint="assorted spices"
        />
        <div className="container px-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold">
            The Essence of Purity
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl">
            Discover a world of authentic flavors with Agrocraft's premium selection of spices and agricultural products, sourced directly from nature.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <a href="/products">Shop Now</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Recommendations Section */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
            Recommended For You
          </h2>
          <RecommendedProducts />
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 md:py-24">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
                From Farm to Your Table
              </h2>
              <p className="text-muted-foreground mb-4">
                At Agrocraft Ventures, we are passionate about bringing you the finest quality agricultural products. Our journey begins with dedicated farmers who use sustainable practices to cultivate the best crops. We ensure that every product is handled with care, preserving its natural goodness until it reaches your kitchen.
              </p>
              <Button variant="outline">Learn More</Button>
            </div>
            <div className="relative aspect-square">
              <Image 
                src="https://picsum.photos/seed/farm/600/600" 
                alt="A beautiful farm landscape" 
                fill
                className="object-cover rounded-lg shadow-lg"
                data-ai-hint="farm landscape"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-muted/50 py-16 md:py-24">
        <div className="container px-4 text-center">
           <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
              Get in Touch
            </h2>
            <p className="max-w-xl mx-auto text-muted-foreground mb-8">
              Have questions? We'd love to hear from you. Reach out to us for inquiries, feedback, or just to say hello.
            </p>
            <Button size="lg">Contact Us</Button>
        </div>
      </section>
    </>
  );
}
