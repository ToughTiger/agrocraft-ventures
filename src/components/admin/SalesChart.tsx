'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Order } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { RupeeSymbol } from '../RupeeSymbol';

interface SalesChartProps {
  orders: Order[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-background border rounded-lg shadow-sm">
        <p className="label">{`${label}`}</p>
        <p className="intro flex items-center">
            <RupeeSymbol className="mr-1"/> {new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(payload[0].value)}
        </p>
      </div>
    );
  }

  return null;
};

export function SalesChart({ orders }: SalesChartProps) {
  const router = useRouter();
  
  const salesData = orders.reduce((acc, order) => {
    const month = new Date(order.createdAt).toLocaleString('default', { month: 'short', year: '2-digit' }).replace(' ', '-');
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
    const aDate = new Date(a.month.replace('-', ' 1, 20'));
    const bDate = new Date(b.month.replace('-', ' 1, 20'));
    return aDate.getTime() - bDate.getTime();
  });
  
  const handleBarClick = (data: any) => {
    if (data && data.activeLabel) {
      const monthId = data.activeLabel;
      router.push(`/admin/reports/sales/${monthId}`);
    }
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={salesData} onClick={handleBarClick} className="cursor-pointer">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <YAxis 
          stroke="hsl(var(--muted-foreground))" 
          fontSize={12}
          tickFormatter={(value) => `₹${new Intl.NumberFormat('en-IN').format(value as number)}`}
        />
        <Tooltip 
            cursor={{fill: 'hsl(var(--muted))'}}
            content={<CustomTooltip />}
        />
        <Legend />
        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
