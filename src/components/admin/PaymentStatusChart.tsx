'use client';

import * as React from 'react';
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';
import type { Order } from '@/lib/types';

interface PaymentStatusChartProps {
  orders: Order[];
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))'];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-background border rounded-lg shadow-sm">
          <p className="label">{`${payload[0].name} : ${payload[0].value} orders`}</p>
        </div>
      );
    }
  
    return null;
  };

export function PaymentStatusChart({ orders }: PaymentStatusChartProps) {
  const paymentData = React.useMemo(() => {
    const data = orders.reduce((acc, order) => {
        const status = order.paymentStatus;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return Object.entries(data).map(([name, value]) => ({ name, value }));
  }, [orders]);

  if (!paymentData || paymentData.length === 0) {
    return <p className="text-center text-muted-foreground">No payment data available.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={paymentData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
        >
          {paymentData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
