"use server";

import { db } from './db';
import type { Product } from '@prisma/client';
import type { User, Order as CustomOrder, Customer } from './types'; 

// Product Queries
export async function getProducts(): Promise<Product[]> {
  return db.product.findMany();
}

export async function getProductById(id: string): Promise<Product | null> {
    return db.product.findUnique({ where: { id } });
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return db.product.findUnique({ where: { slug } });
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
    return db.product.findMany({
        where: { id: { in: ids } }
    });
}

export async function getProductsBySlugs(slugs: string[]): Promise<Product[]> {
    return db.product.findMany({
        where: { slug: { in: slugs } }
    });
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return db.product.findMany({ take: 4 });
}

export async function createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'slug' | 'imageHint'> & { imageUrl: string, category: string }) {
    const slug = data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    return db.product.create({
        data: {
            ...data,
            slug: slug,
            imageHint: data.name, // Simple hint generation
        }
    });
}

export async function updateProduct(id: string, data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>) {
    const slug = data.name ? data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') : undefined;
    return db.product.update({
        where: { id },
        data: {
            ...data,
            ...(slug && { slug }), // Only update slug if name changes
        }
    });
}

export async function deleteProduct(id: string) {
    return db.product.delete({ where: { id } });
}


// User Queries
export async function getUser(id: string): Promise<User | null> {
    const user = await db.user.findUnique({ where: { id } });
    if (!user) return null;
    
    return {
        ...user,
        // The rest of the app expects arrays, so we convert the strings back
        browsingHistory: user.browsingHistory ? user.browsingHistory.split(',') : [],
        purchaseHistory: user.purchaseHistory ? user.purchaseHistory.split(',') : [],
    };
}


// Order Queries
export async function getOrders(): Promise<CustomOrder[]> {
    const orders = await db.order.findMany({
        include: {
            items: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    // Manually parse customerInfo for each order
    return orders.map(order => ({
        ...order,
        customerInfo: JSON.parse(order.customerInfo) as Customer,
    }));
}

export async function createOrder(data: {
    customerInfo: Customer;
    items: { productId: string; quantity: number; price: number }[];
    total: number;
    userId?: string;
}) {
    return db.order.create({
        data: {
            customerInfo: JSON.stringify(data.customerInfo), // stringify the object
            total: data.total,
            userId: data.userId,
            items: {
                create: data.items.map(item => ({
                    quantity: item.quantity,
                    price: item.price,
                    productId: item.productId,
                })),
            },
            status: 'PENDING',
        }
    });
}

// This is a new function for the middleware
export async function getUserByEmail(email: string) {
    const user = await db.user.findUnique({ where: { email } });
     if (!user) return null;
    
    return {
        ...user,
        browsingHistory: user.browsingHistory ? user.browsingHistory.split(',') : [],
        purchaseHistory: user.purchaseHistory ? user.purchaseHistory.split(',') : [],
    };
}
