"use server";

import { db } from './db';
import type { Product } from './types';
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
    return db.product.findManyByIds(ids);
}

export async function getProductsBySlugs(slugs: string[]): Promise<Product[]> {
    return db.product.findManyBySlugs(slugs);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const allProducts = await db.product.findMany();
  return allProducts.slice(0, 4);
}

export async function createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'slug' | 'imageHint'> & { imageUrl: string, category: string }) {
    const slug = data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    return db.product.create({
        ...data,
        slug: slug,
        imageHint: data.name,
    });
}

export async function updateProduct(id: string, data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>) {
    const slug = data.name ? data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') : undefined;
    return db.product.update(id, {
        ...data,
        ...(slug && { slug }), // Only update slug if name changes
    });
}

export async function deleteProduct(id: string) {
    return db.product.delete(id);
}


// User Queries
export async function getUser(id: string): Promise<User | null> {
    return db.user.findUnique({ where: { id } });
}

// This is a new function for the middleware
export async function getUserByEmail(email: string) {
    return db.user.findUnique({ where: { email } });
}


// Order Queries
export async function getOrders(): Promise<any[]> { // Should be CustomOrder[] but mock db is simple
    return []; // Mock, not implemented
}

export async function createOrder(data: {
    customerInfo: Customer;
    items: { productId: string; quantity: number; price: number }[];
    total: number;
    userId?: string;
}) {
    return db.order.create({
        data: {
            ...data,
            status: 'PENDING',
        }
    });
}