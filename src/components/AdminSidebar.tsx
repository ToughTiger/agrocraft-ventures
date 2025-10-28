'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Gauge, Package, ShoppingCart, Users, Home, LogOut, Tags } from 'lucide-react';
import Logo from './Logo';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { useAuth } from '@/hooks/use-auth';

export const adminNavLinks = [
  { href: '/admin', label: 'Dashboard', icon: Gauge },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/categories', label: 'Categories', icon: Tags },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/customers', label: 'Customers', icon: Users },
];

export function AdminNav({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();
  return (
    <nav className={cn("flex flex-col gap-2", isMobile ? "p-4 text-lg font-medium" : "flex-1 px-4 py-6 space-y-2")}>
        {adminNavLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
              { 'bg-muted text-primary': pathname.startsWith(link.href) && (link.href !== '/admin' || pathname === '/admin') }
            )}
          >
            <link.icon className="h-5 w-5" />
            {link.label}
          </Link>
        ))}
      </nav>
  )
}

export function AdminSidebar() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-background">
      <div className="h-24 flex items-center px-6 border-b">
        <Link href="/admin">
          <Logo />
        </Link>
      </div>
      <AdminNav />
      <div className="mt-auto p-4">
        <Separator className="my-4" />
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary mb-2"
        >
          <Home className="h-4 w-4" />
          Back to Store
        </Link>
        <Button variant="ghost" className="w-full justify-start gap-3 px-3" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
