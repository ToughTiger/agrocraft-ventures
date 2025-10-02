import type { Product, User, Order, Customer } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImageUrl = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl ?? 'https://picsum.photos/seed/error/600/400';
const getImageHint = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageHint ?? '';

export const products: Product[] = [
  { id: '1', name: 'Turmeric Powder', slug: 'turmeric-powder', description: 'Freshly ground turmeric powder with high curcumin content. Adds vibrant color and earthy flavor to your dishes.', price: 5.99, imageUrl: getImageUrl('turmeric-powder'), imageHint: getImageHint('turmeric-powder'), stock: 150, category: 'Spices' },
  { id: '2', name: 'Red Chili Powder', slug: 'chili-powder', description: 'Spicy and flavorful red chili powder, perfect for adding a kick to any meal. Made from sun-dried red chilies.', price: 6.49, imageUrl: getImageUrl('chili-powder'), imageHint: getImageHint('chili-powder'), stock: 120, category: 'Spices' },
  { id: '3', name: 'Coriander Powder', slug: 'coriander-powder', description: 'Aromatic and mild, our coriander powder is an essential ingredient for curries and spice blends.', price: 4.99, imageUrl: getImageUrl('coriander-powder'), imageHint: getImageHint('coriander-powder'), stock: 200, category: 'Spices' },
  { id: '4', name: 'Cumin Seeds', slug: 'cumin-seeds', description: 'Whole cumin seeds with a warm, nutty flavor. Toast them to release their full aroma before using.', price: 7.99, imageUrl: getImageUrl('cumin-seeds'), imageHint: getImageHint('cumin-seeds'), stock: 80, category: 'Spices' },
  { id: '5', name: 'Organic Wheat Flour', slug: 'wheat-flour', description: 'Fine, whole wheat flour, organically grown and stone-ground to preserve nutrients. Ideal for baking bread and chapatis.', price: 10.99, imageUrl: getImageUrl('wheat-flour'), imageHint: getImageHint('wheat-flour'), stock: 100, category: 'Flours' },
  { id: '6', name: 'Gram Flour (Besan)', slug: 'gram-flour', description: 'Gluten-free flour made from ground chickpeas. A versatile ingredient for batters, flatbreads, and sweets.', price: 8.99, imageUrl: getImageUrl('gram-flour'), imageHint: getImageHint('gram-flour'), stock: 90, category: 'Flours' },
  { id: '7', name: 'Black Peppercorns', slug: 'black-pepper', description: 'Bold and pungent whole black peppercorns. Grind fresh for the best flavor.', price: 9.99, imageUrl: getImageUrl('black-pepper'), imageHint: getImageHint('black-pepper'), stock: 110, category: 'Spices' },
  { id: '8', name: 'Cinnamon Sticks', slug: 'cinnamon-sticks', description: 'Sweet and fragrant cinnamon sticks, perfect for infusing flavor into drinks, desserts, and savory dishes.', price: 12.49, imageUrl: getImageUrl('cinnamon-sticks'), imageHint: getImageHint('cinnamon-sticks'), stock: 60, category: 'Spices' },
];

export const users: User[] = [
  {
    id: '1',
    name: 'Alice',
    email: 'alice@example.com',
    browsingHistory: ['turmeric-powder', 'coriander-powder', 'wheat-flour'],
    purchaseHistory: ['turmeric-powder'],
  },
];

export const orders: Order[] = [
    {
        id: 'ORD-001',
        userId: '1',
        items: [
            { productId: '1', quantity: 2, price: 5.99 },
            { productId: '3', quantity: 1, price: 4.99 },
        ],
        total: (5.99 * 2) + 4.99,
        status: 'Delivered',
        createdAt: new Date('2023-10-15T10:00:00Z'),
        shippingAddress: { name: 'Alice', address: '123 Spice Lane', city: 'Flavor Town', zip: '12345' },
    },
    {
        id: 'ORD-002',
        userId: '1',
        items: [
            { productId: '5', quantity: 1, price: 10.99 },
        ],
        total: 10.99,
        status: 'Shipped',
        createdAt: new Date('2023-11-20T14:30:00Z'),
        shippingAddress: { name: 'Alice', address: '123 Spice Lane', city: 'Flavor Town', zip: '12345' },
    }
];

export const customers: Customer[] = [
    {
        id: '1',
        name: 'Alice',
        email: 'alice@example.com',
        totalOrders: 2,
        totalSpent: 26.96,
        joinDate: new Date('2023-10-01T09:00:00Z'),
    },
    {
        id: '2',
        name: 'Bob',
        email: 'bob@example.com',
        totalOrders: 5,
        totalSpent: 102.50,
        joinDate: new Date('2022-05-10T11:00:00Z'),
    },
    {
        id: '3',
        name: 'Charlie',
        email: 'charlie@example.com',
        totalOrders: 1,
        totalSpent: 12.49,
        joinDate: new Date('2024-01-15T18:00:00Z'),
    }
];
