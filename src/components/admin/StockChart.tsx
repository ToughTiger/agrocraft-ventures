'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { Product } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface StockChartProps {
  products: Product[];
}

export function StockChart({ products }: StockChartProps) {
  const router = useRouter();

  const handleBarClick = (data: any) => {
    if (data && data.activePayload && data.activePayload.length > 0) {
      const productId = data.activePayload[0].payload.id;
      router.push(`/admin/products/${productId}/edit`);
    }
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart 
        data={products} 
        onClick={handleBarClick}
        className="cursor-pointer"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
            dataKey="name" 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={70}
        />
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--background))', 
            borderColor: 'hsl(var(--border))' 
          }}
           formatter={(value, name) => [value, 'Stock']}
        />
        <Bar dataKey="stock" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
