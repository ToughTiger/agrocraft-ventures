import { db } from './db';
import type { Product, User, Order } from './types';

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
  return db.product.findFeatured();
}

export async function createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'slug' | 'imageHint'>): Promise<Product> {
    return db.product.create(data);
}

export async function updateProduct(id: string, data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Product | null> {
    return db.product.update(id, data);
}

export async function deleteProduct(id: string): Promise<Product | null> {
    return db.product.delete(id);
}


// User Queries
export async function getUser(id: string): Promise<User | null> {
  return db.user.findUnique({ where: { id }});
}


// Order Queries
export async function getOrders(): Promise<Order[]> {
    return db.order.findMany();
}

export async function createOrder(data: any): Promise<Order> {
    return db.order.create(data);
}
