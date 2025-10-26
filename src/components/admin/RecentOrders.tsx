'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Order } from '@/lib/types';
import { Badge } from '../ui/badge';
import { FormattedCurrency } from '../FormattedCurrency';
import Link from 'next/link';
import { Button } from '../ui/button';

interface RecentOrdersProps {
  orders: Order[];
}

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending': return 'secondary';
    case 'shipped': return 'default';
    case 'delivered': return 'outline';
    default: return 'destructive';
  }
};

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead className="text-right">View</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>
              <div className="font-medium">{order.customer?.name}</div>
              <div className="text-sm text-muted-foreground">{order.customer?.email}</div>
            </TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
            </TableCell>
            <TableCell className="text-right">
              <FormattedCurrency amount={order.total} />
            </TableCell>
             <TableCell className="text-right">
                <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/orders/${order.id}`}>Details</Link>
                </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
