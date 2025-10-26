'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { Product } from '@/lib/types';

interface StockChartProps {
  products: Product[];
}

export function StockChart({ products }: StockChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={products}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
            dataKey="name" 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
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
