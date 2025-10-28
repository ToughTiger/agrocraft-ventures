import { AdminSidebar, AdminNav } from "@/components/AdminSidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Logo from "@/components/Logo";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:justify-end">
           <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <div className="h-24 flex items-center px-6 border-b">
                        <Link href="/admin">
                            <Logo />
                        </Link>
                    </div>
                    <AdminNav isMobile={true} />
                </SheetContent>
            </Sheet>
           </div>
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0">
          {children}
        </main>
      </div>
    </div>
  );
}
