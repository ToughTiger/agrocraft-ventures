import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { DevelopmentNotice } from "@/components/DevelopmentNotice";


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <DevelopmentNotice />
    </div>
  );
}
