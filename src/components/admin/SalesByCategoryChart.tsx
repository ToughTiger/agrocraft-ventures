'use client';

import * as React from 'react';
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';
import type { Order } from '@/lib/types';
import { FormattedCurrency } from '../FormattedCurrency';
import { useRouter } from 'next/navigation';

interface SalesByCategoryChartProps {
  orders: Order[];
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', '#8884d8', '#82ca9d'];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-background border rounded-lg shadow-sm">
          <p className="label">{`${payload[0].name} : `} <FormattedCurrency amount={payload[0].value} /></p>
        </div>
      );
    }
  
    return null;
  };

export function SalesByCategoryChart({ orders }: SalesByCategoryChartProps) {
  const router = useRouter();

  const salesByCategory = React.useMemo(() => {
    const data: { [key: string]: number } = {};
    orders.forEach(order => {
      order.items?.forEach(item => {
        const categoryName = item.product?.category?.name || 'Uncategorized';
        if (data[categoryName]) {
          data[categoryName] += item.price * item.quantity;
        } else {
          data[categoryName] = item.price * item.quantity;
        }
      });
    });

    return Object.entries(data).map(([name, value]) => ({ name, value }));
  }, [orders]);

  const handlePieClick = (data: any) => {
    if (data && data.name) {
      router.push(`/admin/products?category=${data.name}`);
    }
  };

  if (!salesByCategory || salesByCategory.length === 0) {
    return <p className="text-center text-muted-foreground">No sales data available.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={salesByCategory}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          onClick={(data) => handlePieClick(data)}
          className="cursor-pointer"
        >
          {salesByCategory.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
