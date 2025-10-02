export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  imageHint: string;
  stock: number;
  category: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
};

export type Order = {
  id: string;
  userId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: Date;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    zip: string;
  };
};

export type User = {
  id: string;
  name: string;
  email: string;
  browsingHistory: string[]; // for AI, simple array of product slugs
  purchaseHistory: string[]; // for AI, simple array of product slugs
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  joinDate: Date;
};
