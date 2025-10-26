'use client';

import { useState, useEffect, useCallback } from 'react';
import { generateBusinessInsights } from '@/ai/flows/business-insights-flow';
import type { Order, Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Sparkles, Bot, ThumbsUp, TrendingUp, TrendingDown, CircleDollarSign, Lightbulb } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

interface AIInsightsProps {
  orders: Order[];
  products: Product[];
}

const InsightIcon = ({ insightType }: { insightType: string }) => {
  switch (insightType) {
    case 'Positive Trend': return <TrendingUp className="h-5 w-5 text-primary" />;
    case 'Area for Improvement': return <TrendingDown className="h-5 w-5 text-destructive" />;
    case 'Opportunity': return <Lightbulb className="h-5 w-5 text-yellow-500" />;
    default: return <CircleDollarSign className="h-5 w-5 text-muted-foreground" />;
  }
}

export function AIInsights({ orders, products }: AIInsightsProps) {
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInsights = useCallback(async () => {
    setLoading(true);
    try {
      // Simplify data for the model
      const productData = products.map(p => ({ id: p.id, name: p.name, stock: p.stock, price: p.price }));
      const orderData = orders.map(o => ({ id: o.id, total: o.total, status: o.status, createdAt: o.createdAt.toISOString() }));

      const result = await generateBusinessInsights({ products: productData, orders: orderData });
      if (result.insights) {
        setInsights(result.insights);
      }
    } catch (error) {
      console.error("Failed to generate AI insights:", error);
      setInsights([{type: 'Error', summary: 'Could not generate insights at this time.'}]);
    } finally {
      setLoading(false);
    }
  }, [orders, products]);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
        </div>
      ) : (
        <ul className="space-y-4">
          {insights.map((insight, index) => (
            <li key={index} className="flex items-start gap-4 p-3 bg-muted/50 rounded-lg">
              <div className='flex-shrink-0 mt-1'>
                <InsightIcon insightType={insight.type} />
              </div>
              <div>
                <p className="font-semibold text-sm">{insight.type}</p>
                <p className="text-muted-foreground text-sm">{insight.summary}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
       <Button onClick={fetchInsights} disabled={loading} size="sm" variant="ghost" className="w-full">
        <Sparkles className="mr-2 h-4 w-4" />
        {loading ? 'Generating...' : 'Regenerate Insights'}
      </Button>
    </div>
  );
}
