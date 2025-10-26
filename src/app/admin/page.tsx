import { getOrders, getProducts, getUsers } from "@/lib/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import { SalesChart } from "@/components/admin/SalesChart";
import { StockChart } from "@/components/admin/StockChart";
import { AIInsights } from "@/components/admin/AIInsights";
import { FormattedCurrency } from "@/components/FormattedCurrency";
import { SalesByCategoryChart } from "@/components/admin/SalesByCategoryChart";
import { RecentOrders } from "@/components/admin/RecentOrders";
import { PaymentStatusChart } from "@/components/admin/PaymentStatusChart";

export default async function AdminDashboard() {
  const orders = await getOrders();
  const products = await getProducts();
  const users = await getUsers();

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalCustomers = users.filter(u => u.email !== 'admin@example.com').length;
  const totalProducts = products.length;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-headline text-3xl font-bold">
        Admin Dashboard
      </h1>
      
      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <FormattedCurrency amount={totalRevenue} />
            </div>
            <p className="text-xs text-muted-foreground">
              Across {totalOrders} orders
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              Total orders placed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              Total unique customers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              Total products in store
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Primary Charts */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>
              A chart showing total sales per month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SalesChart orders={orders} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>
              Revenue distribution across product categories.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <SalesByCategoryChart orders={orders} />
          </CardContent>
        </Card>
      </div>
      
      {/* AI Insights & Recent Activity */}
       <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>AI Business Insights</CardTitle>
             <CardDescription>
              Actionable insights from your data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AIInsights orders={orders} products={products} />
          </CardContent>
        </Card>
         <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
             <CardDescription>
              Your 5 most recent orders.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentOrders orders={orders.slice(0, 5)} />
          </CardContent>
        </Card>
      </div>
      
      {/* Inventory & Payments */}
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Product Stock Levels</CardTitle>
                <CardDescription>Current inventory levels for all products.</CardDescription>
            </CardHeader>
            <CardContent>
                <StockChart products={products} />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Payment Status</CardTitle>
                <CardDescription>Overview of order payment statuses.</CardDescription>
            </CardHeader>
            <CardContent>
                <PaymentStatusChart orders={orders} />
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
