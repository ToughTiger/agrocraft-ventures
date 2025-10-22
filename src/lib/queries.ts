import { db } from './db';
import type { Product, User } from './types';

export async function getProducts(): Promise<Product[]> {
  return db.product.findMany();
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

export async function getUser(id: string): Promise<User | null> {
  return db.user.findUnique({ where: { id }});
}
