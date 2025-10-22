
import { Separator } from "@/components/ui/separator";
import Logo from "./Logo";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-muted/50">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 space-y-4">
            <Logo />
            <p className="text-muted-foreground text-sm">
              Freshly sourced spices and agricultural materials.
            </p>
             <div className="space-y-2 text-sm">
              <a href="mailto:info@agrocraftventures.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                <Mail className="h-4 w-4" />
                info@agrocraftventures.com
              </a>
              <a href="tel:+917021738884" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                <Phone className="h-4 w-4" />
                +91 7021738884
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Shop</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/products" className="text-muted-foreground hover:text-primary">All Products</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-primary">Spices</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-primary">Flours</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">About</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/#about" className="text-muted-foreground hover:text-primary">Our Story</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
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
          © {new Date().getFullYear()} Agrocraft Ventures. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
