import { products, users, orders, customers } from './db';
import type { Product, User, Order, Customer } from './types';

// Using async functions to simulate real database calls
export async function getProducts(): Promise<Product[]> {
  return Promise.resolve(products);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return Promise.resolve(products.find(p => p.slug === slug));
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
    return Promise.resolve(products.filter(p => ids.includes(p.id)));
}

export async function getProductsBySlugs(slugs: string[]): Promise<Product[]> {
    return Promise.resolve(products.filter(p => slugs.includes(p.slug)));
}

export async function getFeaturedProducts(): Promise<Product[]> {
  // For now, just return the first 4 products
  return Promise.resolve(products.slice(0, 4));
}

export async function getUser(id: string): Promise<User | undefined> {
  return Promise.resolve(users.find(u => u.id === id));
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
    return Promise.resolve(orders.filter(o => o.userId === userId));
}

export async function getAllOrders(): Promise<Order[]> {
    return Promise.resolve(orders);
}

export async function getCustomers(): Promise<Customer[]> {
    return Promise.resolve(customers);
}
