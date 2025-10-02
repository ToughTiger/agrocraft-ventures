'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

type CartState = {
  items: CartItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (productId) => {
        const { toast } = useToast.getState();
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.productId === productId);

        if (existingItem) {
          get().updateQuantity(productId, existingItem.quantity + 1);
        } else {
          set({ items: [...currentItems, { productId, quantity: 1 }] });
        }
        toast({
            title: "Added to cart",
            description: "Product has been added to your cart.",
        });
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.productId !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity === 0) {
          get().removeItem(productId);
        } else {
          set({
            items: get().items.map((item) =>
              item.productId === productId ? { ...item, quantity } : item
            ),
          });
        }
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
