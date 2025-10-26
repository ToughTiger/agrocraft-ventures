'use client';

import { useEffect, useState } from 'react';
import { productRecommendation } from '@/ai/flows/product-recommendation-prompt';
import { getProductsBySlugs, getUser } from '@/lib/queries';
import type { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { Skeleton } from './ui/skeleton';

export function RecommendedProducts() {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        // In a real app, you'd get the current user's ID
        const user = await getUser('1'); 
        if (!user) return;

        const result = await productRecommendation({
          browsingHistory: user.browsingHistory,
          purchaseHistory: user.purchaseHistory,
        });

        if (result.recommendations) {
          // The AI might return product names, not slugs. We'll simulate slugs from names.
          const recommendedSlugs = result.recommendations.map(name => 
            name.toLowerCase().replace(/ /g, '-')
          );
          const recommendedProducts = await getProductsBySlugs(recommendedSlugs);
          setRecommendations(recommendedProducts);
        }
      } catch (error) {
        console.error("Failed to fetch AI recommendations:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecommendations();
  }, []);

  if (loading) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                    <Skeleton className="h-[225px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            ))}
        </div>
    );
  }

  if (recommendations.length === 0) {
    return null; // Don't show the section if there are no recommendations
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {recommendations.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
