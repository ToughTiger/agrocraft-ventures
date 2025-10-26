"use server";

import { db } from './db';
import type { Product, User, Order, Customer, Category, SalesForMonth } from './types'; 

// Product Queries
export async function getProducts(): Promise<Product[]> {
  const products = await db.product.findMany();
  const categories = await db.category.findMany();
  const categoryMap = new Map(categories.map(c => [c.id, c]));
  return products.map(p => ({
    ...p,
    category: categoryMap.get(p.categoryId),
  }));
}

export async function getProductById(id: string): Promise<Product | null> {
    return db.product.findUnique({ where: { id } });
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = await db.product.findUnique({ where: { slug } });
  if (!product) return null;
  const category = await db.category.findUnique({ where: { id: product.categoryId }});
  return { ...product, category };
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
    return db.product.findManyByIds(ids);
}

export async function getProductsBySlugs(slugs: string[]): Promise<Product[]> {
    return db.product.findManyBySlugs(slugs);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const allProducts = await getProducts();
  return allProducts.slice(0, 4);
}

export async function createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'slug' | 'category'>) {
    const slug = data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    return db.product.create({
        ...data,
        slug: slug,
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


// User and Customer Queries
export async function getUsers(): Promise<User[]> {
    return db.user.findMany();
}

export async function getCustomers(): Promise<Customer[]> {
    return db.customer.findMany();
}

export async function getCustomerById(id: string): Promise<Customer | null> {
    return db.customer.findUnique({ where: { id }});
}

export async function getUser(id: string): Promise<User | null> {
    return db.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: string) {
    return db.user.findUnique({ where: { email } });
}


// Order Queries
export async function getOrders(): Promise<Order[]> {
    const orders = await db.order.findMany();
    const customers = await db.customer.findMany();
    const customerMap = new Map(customers.map(c => [c.id, c]));

    const orderItems = await db.orderItem.findMany();
    const productIds = [...new Set(orderItems.map(i => i.productId))];
    const products = await getProductsByIds(productIds);
    const productMap = new Map(products.map(p => [p.id, p]));
    const categoryMap = new Map((await db.category.findMany()).map(c => [c.id, c]));

    for (const p of products) {
        p.category = categoryMap.get(p.categoryId);
    }
    
    const itemsByOrderId = new Map<string, any[]>();
    for (const item of orderItems) {
        if (!itemsByOrderId.has(item.orderId)) {
            itemsByOrderId.set(item.orderId, []);
        }
        itemsByOrderId.get(item.orderId)!.push({
            ...item,
            product: productMap.get(item.productId)
        });
    }

    return orders.map(o => ({
        ...o,
        customer: customerMap.get(o.customerId),
        items: itemsByOrderId.get(o.id) || [],
    }));
}

export async function getOrdersByCustomerId(customerId: string): Promise<Order[]> {
    const orders = await db.order.findManyByCustomerId(customerId);
    const customer = await getCustomerById(customerId);

    return orders.map(o => ({
        ...o,
        customer,
    }));
}

export async function getOrderById(id: string): Promise<Order | null> {
    const order = await db.order.findUnique({ where: { id }});
    if (!order) return null;
    
    const customer = await db.customer.findUnique({ where: {id: order.customerId }});
    const items = await db.orderItem.findManyByOrderId(order.id);
    const productIds = items.map(i => i.productId);
    const products = await getProductsByIds(productIds);
    const productMap = new Map(products.map(p => [p.id, p]));

    return {
        ...order,
        customer: customer || undefined,
        items: items.map(i => ({...i, product: productMap.get(i.productId)}))
    }
}

// Analytics Queries
export async function getSalesForMonth(monthId: string): Promise<SalesForMonth[]> {
    const allOrders = await getOrders();
    const [monthName, year] = monthId.split('-');
    const yearNumber = parseInt(`20${year}`);

    const filteredOrders = allOrders.filter(order => {
        const orderDate = new Date(order.createdAt);
        const orderMonth = orderDate.toLocaleString('default', { month: 'short' });
        const orderYear = orderDate.getFullYear();
        return orderMonth.toLowerCase() === monthName.toLowerCase() && orderYear === yearNumber;
    });

    const salesByProduct: { [productId: string]: SalesForMonth } = {};

    for (const order of filteredOrders) {
        for (const item of order.items || []) {
            if (item.product) {
                if (salesByProduct[item.productId]) {
                    salesByProduct[item.productId].quantitySold += item.quantity;
                    salesByProduct[item.productId].totalRevenue += item.quantity * item.price;
                } else {
                    salesByProduct[item.productId] = {
                        productId: item.productId,
                        productName: item.product.name,
                        productSlug: item.product.slug,
                        quantitySold: item.quantity,
                        totalRevenue: item.quantity * item.price,
                    };
                }
            }
        }
    }
    return Object.values(salesByProduct).sort((a,b) => b.totalRevenue - a.totalRevenue);
}


// Category Queries
export async function createCategory(name: string) {
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    return db.category.create({ name, slug });
}

export async function getCategories(): Promise<Category[]> {
    return db.category.findMany();
}

export async function deleteCategory(id: string) {
    return db.category.delete(id);
}
