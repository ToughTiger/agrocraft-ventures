'use server';

import db from './db';
import type { Product, User, Order, Customer, Category, SalesForMonth } from './types'; 

// Product Queries
export async function getProducts(): Promise<Product[]> {
  const products = await db.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      name: 'asc'
    }
  });
  return products;
}

export async function getProductById(id: string): Promise<Product | null> {
    const product = await db.product.findUnique({ 
        where: { id },
        include: { category: true }
    });
    if (!product) return null;
    return product;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = await db.product.findUnique({ 
      where: { slug },
      include: { category: true }
  });
  if (!product) return null;
  return product;
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
    const products = await db.product.findMany({
        where: {
            id: { in: ids }
        },
        include: { category: true }
    });
    return products;
}

export async function getProductsBySlugs(slugs: string[]): Promise<Product[]> {
    const products = await db.product.findMany({
        where: {
            slug: { in: slugs }
        },
        include: { category: true }
    });
    return products;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const allProducts = await db.product.findMany({
      take: 4,
      include: { category: true }
  });
  return allProducts;
}

export async function createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'slug' | 'category'>) {
    const slug = data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    return db.product.create({
        data: {
            ...data,
            slug: slug,
        }
    });
}

export async function updateProduct(id: string, data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>) {
    const slug = data.name ? data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') : undefined;
    const updatedData: any = { ...data };
    if (slug) {
        updatedData.slug = slug;
    }
    
    await db.product.update({
        where: { id },
        data: updatedData,
    });
    
    // Refetch the product to ensure all relations are populated correctly
    return getProductById(id);
}


export async function deleteProduct(id: string) {
    return db.product.delete({ where: { id } });
}


// User and Customer Queries
export async function getUsers(): Promise<User[]> {
    return db.user.findMany();
}

export async function getCustomers(): Promise<Customer[]> {
    return db.customer.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
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
    const orders = await db.order.findMany({
        include: {
            customer: true,
            items: {
                include: {
                    product: {
                        include: {
                            category: true
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return orders.map(o => ({
        ...o,
        status: o.status as Order['status'], // Type assertion
    }));
}

export async function getOrdersByCustomerId(customerId: string): Promise<Order[]> {
    const orders = await db.order.findMany({
        where: { customerId },
        include: {
            customer: true,
        },
         orderBy: {
            createdAt: 'desc'
        }
    });
     return orders.map(o => ({
        ...o,
        status: o.status as Order['status'],
    }));
}

export async function getOrderById(id: string): Promise<Order | null> {
    const order = await db.order.findUnique({ 
        where: { id },
        include: {
            customer: true,
            items: {
                include: {
                    product: {
                        include: {
                            category: true
                        }
                    }
                }
            }
        }
    });
    if (!order) return null;

    return {
        ...order,
        status: order.status as Order['status'],
    }
}

// Analytics Queries
export async function getSalesForMonth(monthId: string): Promise<SalesForMonth[]> {
    const [monthName, year] = monthId.split('-');
    const yearNumber = parseInt(`20${year}`);
    const monthIndex = new Date(Date.parse(monthName +" 1, 2012")).getMonth();

    const startDate = new Date(yearNumber, monthIndex, 1);
    const endDate = new Date(yearNumber, monthIndex + 1, 0);

    const orders = await db.order.findMany({
        where: {
            createdAt: {
                gte: startDate,
                lte: endDate,
            },
        },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    });

    const salesByProduct: { [productId: string]: SalesForMonth } = {};

    for (const order of orders) {
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
    return db.category.create({
      data: {
        name,
        slug,
      },
    });
}

export async function getCategories(): Promise<Category[]> {
    return db.category.findMany();
}

export async function deleteCategory(id: string) {
    // Check if any products are using this category
    const products = await db.product.findMany({ where: { categoryId: id } });
    if (products.length > 0) {
        throw new Error('Cannot delete category with associated products.');
    }
    return db.category.delete({ where: { id } });
}
