'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Order } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface SalesChartProps {
  orders: Order[];
}

export function SalesChart({ orders }: SalesChartProps) {
  const salesData = orders.reduce((acc, order) => {
    const month = new Date(order.createdAt).toLocaleString('default', { month: 'short', year: '2-digit' });
    const existingEntry = acc.find(entry => entry.month === month);

    if (existingEntry) {
      existingEntry.total += order.total;
    } else {
      acc.push({ month, total: order.total });
    }

    return acc;
  }, [] as { month: string; total: number }[]);

  // Ensure chronological order
  salesData.sort((a, b) => {
    const [aMonth, aYear] = a.month.split(' ');
    const [bMonth, bYear] = b.month.split(' ');
    const aDate = new Date(`${aMonth} 1, 20${aYear}`);
    const bDate = new Date(`${bMonth} 1, 20${bYear}`);
    return aDate.getTime() - bDate.getTime();
  });

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={salesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <YAxis 
          stroke="hsl(var(--muted-foreground))" 
          fontSize={12}
          tickFormatter={(value) => formatCurrency(value as number)}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--background))', 
            borderColor: 'hsl(var(--border))' 
          }}
          formatter={(value) => [formatCurrency(value as number), 'Sales']}
        />
        <Legend />
        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
