import type { Product, User, Order, Customer, Category, OrderItem } from './types';

// Mock Data
const categories: Category[] = [
  { id: '1', name: 'Spices', slug: 'spices' },
  { id: '2', name: 'Flours', slug: 'flours' },
];

const products: Product[] = [
  { id: '1', name: 'Turmeric Powder', slug: 'turmeric-powder', description: 'Freshly ground turmeric powder...', price: 5.99, stock: 150, categoryId: '1', imageUrl: "https://images.unsplash.com/photo-1698556735172-1b5b3cd9d2ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHx0dXJtZXJpYyUyMHBvd2RlcnxlbnwwfHx8fDE3NTkzOTU5OTl8MA&ixlib=rb-4.1.0&q=80&w=1080", imageHint: "turmeric powder", createdAt: new Date('2023-10-01'), updatedAt: new Date() },
  { id: '2', name: 'Red Chili Powder', slug: 'chili-powder', description: 'Spicy and flavorful red chili powder...', price: 6.49, stock: 25, categoryId: '1', imageUrl: "https://images.unsplash.com/photo-1702041295471-01b73fd39907?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxjaGlsaSUyMHBvd2RlcnxlbnwwfHx8fDE3NTkzOTYxNjR8MA&ixlib=rb-4.1.0&q=80&w=1080", imageHint: "chili powder", createdAt: new Date('2023-10-05'), updatedAt: new Date() },
  { id: '3', name: 'Coriander Powder', slug: 'coriander-powder', description: 'Aromatic and mild coriander powder...', price: 4.99, stock: 200, categoryId: '1', imageUrl: "https://images.unsplash.com/photo-1750472878210-0778dcbcc5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxjb3JpYW5kZXIlMjBwb3dkZXJ8ZW58MHx8fHwxNzU5Mzk2MTY0fDA&ixlib=rb-4.1.0&q=80&w=1080", imageHint: "coriander powder", createdAt: new Date('2023-10-02'), updatedAt: new Date() },
  { id: '4', name: 'Organic Wheat Flour', slug: 'wheat-flour', description: 'Fine, whole wheat flour...', price: 10.99, stock: 15, categoryId: '2', imageUrl: "https://images.unsplash.com/photo-1702061895070-15d7972d3eef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHx3aGVhdCUyMGZsb3VyfGVufDB8fHx8MTc1OTM1NDg4N3ww&ixlib=rb-4.1.0&q=80&w=1080", imageHint: "wheat flour", createdAt: new Date('2023-11-15'), updatedAt: new Date() },
  { id: '5', name: 'Gram Flour (Besan)', slug: 'gram-flour', description: 'Gluten-free flour made from ground chickpeas...', price: 8.99, stock: 90, categoryId: '2', imageUrl: "https://images.unsplash.com/photo-1586137712370-9b450509c587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxncmFtJTIwZmxvdXJ8ZW58MHx8fHwxNzU5Mzk2MTY0fDA&ixlib=rb-4.1.0&q=80&w=1080", imageHint: "gram flour", createdAt: new Date('2023-11-20'), updatedAt: new Date() },
];

const users: User[] = [
    { id: '1', name: 'Alice', email: 'alice@example.com', mobile: '9876543210', password: 'password123', browsingHistory: 'turmeric-powder,wheat-flour', purchaseHistory: 'turmeric-powder', address: '123 Spice Lane', city: 'Mumbai', postalCode: '400001', country: 'India', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', name: 'Admin User', email: 'admin@example.com', password: 'adminpassword', mobile: '9999999999', browsingHistory: '', purchaseHistory: '', address: '456 Admin Ave', city: 'Control City', postalCode: '110001', country: 'India', createdAt: new Date(), updatedAt: new Date() },
];

const customers: Customer[] = [
    { id: '1', name: 'Bob Johnson', email: 'bob@example.com', mobile: '8887776665', city: 'Delhi', userId: undefined, createdAt: new Date() },
    { id: '2', name: 'Charlie Brown', email: 'charlie@example.com', mobile: '7778889990', city: 'Bengaluru', userId: undefined, createdAt: new Date() },
    { id: '3', name: 'Alice', email: 'alice@example.com', mobile: '9876543210', city: 'Mumbai', userId: '1', createdAt: new Date() },
]

const orders: Order[] = [
    { id: '1', customerId: '1', total: 17.48, status: 'DELIVERED', paymentStatus: 'Paid', createdAt: new Date('2023-11-05T10:00:00Z') },
    { id: '2', customerId: '2', total: 10.99, status: 'SHIPPED', paymentStatus: 'Paid', createdAt: new Date('2023-11-18T14:30:00Z') },
    { id: '3', customerId: '3', total: 12.98, status: 'PENDING', paymentStatus: 'Pending', createdAt: new Date('2023-12-01T09:00:00Z') },
    { id: '4', customerId: '1', total: 5.99, status: 'DELIVERED', paymentStatus: 'Paid', createdAt: new Date('2023-12-02T12:00:00Z') },
    { id: '5', customerId: '3', total: 4.99, status: 'DELIVERED', paymentStatus: 'Paid', createdAt: new Date('2024-01-15T11:00:00Z') },
];

const orderItems: OrderItem[] = [
    { id: '1', orderId: '1', productId: '2', quantity: 1, price: 6.49 },
    { id: '2', orderId: '1', productId: '4', quantity: 1, price: 10.99 },
    { id: '3', orderId: '2', productId: '4', quantity: 1, price: 10.99 },
    { id: '4', orderId: '3', productId: '2', quantity: 2, price: 6.49 },
    { id: '5', orderId: '4', productId: '1', quantity: 1, price: 5.99 },
    { id: '6', orderId: '5', productId: '3', quantity: 1, price: 4.99 },
];

// Mock database object
export const db = {
  product: {
    findMany: async () => [...products],
    findUnique: async ({ where: { id, slug } }: { where: { id?: string; slug?: string } }) =>
      products.find((p) => p.id === id || p.slug === slug) || null,
    findManyByIds: async (ids: string[]) => products.filter((p) => ids.includes(p.id)),
    findManyBySlugs: async (slugs: string[]) => products.filter((p) => slugs.includes(p.slug)),
    create: async (data: any) => {
        const newProduct = { ...data, id: String(products.length + 1), createdAt: new Date(), updatedAt: new Date()};
        products.push(newProduct);
        return newProduct;
    },
    update: async (id: string, data: any) => {
        const index = products.findIndex(p => p.id === id);
        if (index > -1) {
            products[index] = { ...products[index], ...data, updatedAt: new Date() };
            return products[index];
        }
        return null;
    },
    delete: async (id: string) => {
        const index = products.findIndex(p => p.id === id);
        if (index > -1) {
            return products.splice(index, 1);
        }
        return null;
    }
  },
  user: {
    findMany: async () => [...users],
    findUnique: async ({ where: { id, email } }: { where: { id?: string, email?: string } }) =>
      users.find((u) => u.id === id || u.email === email) || null,
  },
  order: {
      findMany: async () => [...orders],
      findManyByCustomerId: async (customerId: string) => orders.filter(o => o.customerId === customerId),
      findUnique: async ({ where: { id } }: { where: { id: string } }) => orders.find(o => o.id === id) || null,
  },
  orderItem: {
      findManyByOrderId: async (orderId: string) => orderItems.filter(i => i.orderId === orderId),
  },
  customer: {
      findMany: async () => [...customers],
      findUnique: async ({ where: { id } }: { where: { id: string } }) => customers.find(c => c.id === id) || null,
  },
  category: {
      findMany: async () => [...categories],
      findUnique: async ({ where: { id } }: { where: { id: string } }) => categories.find(c => c.id === id) || null,
      create: async (data: {name: string, slug: string}) => {
          const newCategory = { ...data, id: String(categories.length + 1) };
          categories.push(newCategory);
          return newCategory;
      },
      delete: async (id: string) => {
        const index = categories.findIndex(c => c.id === id);
        if (index > -1) {
            return categories.splice(index, 1);
        }
        return null;
    }
  }
};
