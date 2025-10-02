import { Separator } from "@/components/ui/separator";
import Logo from "./Logo";

export function Footer() {
  return (
    <footer className="bg-muted/50">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-muted-foreground text-sm">
              Freshly sourced spices and agricultural materials.
            </p>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Shop</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="/products" className="text-muted-foreground hover:text-primary">All Products</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Spices</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Flours</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">About</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary">Our Story</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Stay Connected</h3>
            <p className="mt-4 text-sm text-muted-foreground">Sign up for our newsletter to get the latest updates.</p>
            {/* Newsletter form can be added here */}
          </div>
        </div>
        <Separator className="my-8" />
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Agrocraft Online. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
