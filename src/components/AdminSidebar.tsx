'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gauge, Package, ShoppingCart, Users, Home } from 'lucide-react';
import Logo from './Logo';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';

const adminNavLinks = [
  { href: '/admin', label: 'Dashboard', icon: Gauge },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/customers', label: 'Customers', icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-background">
      <div className="h-24 flex items-center px-6 border-b">
        <Logo />
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {adminNavLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
              { 'bg-muted text-primary': pathname === link.href }
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto p-4">
        <Separator className="my-4" />
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <Home className="h-4 w-4" />
          Back to Store
        </Link>
      </div>
    </aside>
  );
}
