import type { Product as PrismaProduct, User as PrismaUser, Order as PrismaOrder, Customer as PrismaCustomer } from '@prisma/client';

export type Product = PrismaProduct;
export type User = {
    id: string;
    name: string;
    email: string;
    password?: string; // In a real app this would be a hash
    browsingHistory: string[]; // for AI, simple array of product slugs
    purchaseHistory: string[]; // for AI, simple array of product slugs
    address: string;
    city: string;
    postalCode: string;
    country: string;
};
export type Order = Omit<PrismaOrder, 'total'> & { total: number };
export type Customer = PrismaCustomer;


export type CartItem = {
  productId: string;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
};
