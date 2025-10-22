import type { Product as PrismaProduct, User as PrismaUser, Order as PrismaOrder, Customer as PrismaCustomer } from '@prisma/client';

export type Product = PrismaProduct;
export type User = {
    id: string;
    name: string;
    email: string;
    browsingHistory: string[]; // for AI, simple array of product slugs
    purchaseHistory: string[]; // for AI, simple array of product slugs
};
export type Order = PrismaOrder;
export type Customer = PrismaCustomer;


export type CartItem = {
  productId: string;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
};
