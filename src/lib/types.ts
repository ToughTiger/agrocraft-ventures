import type { Product as PrismaProduct, User as PrismaUser, Order as PrismaOrder, OrderItem as PrismaOrderItem } from '@prisma/client';

export type Product = PrismaProduct;

// This represents the user object used throughout the application,
// with history fields correctly typed as arrays.
export type User = Omit<PrismaUser, 'password' | 'browsingHistory' | 'purchaseHistory'> & {
    password?: string;
    browsingHistory: string[];
    purchaseHistory: string[];
};

export type Customer = {
    name: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
}

// This represents the Order object used in the application,
// with customerInfo correctly typed as a structured object.
export type Order = Omit<PrismaOrder, 'customerInfo'> & {
    customerInfo: Customer;
    items: (PrismaOrderItem & { product: PrismaProduct })[];
};


export type CartItem = {
  productId: string;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
};
