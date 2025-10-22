// This represents the Product object used throughout the application.
export type Product = {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    imageUrl: string;
    imageHint: string;
    createdAt: Date;
    updatedAt: Date;
};

// This represents the user object used throughout the application,
// with history fields correctly typed as arrays.
export type User = {
    id: string;
    name: string;
    email: string;
    password?: string;
    browsingHistory: string[];
    purchaseHistory: string[];
    address: string;
    city: string;
    postalCode: string;
    country: string;
};

export type Customer = {
    name: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
}

// This represents the Order object used in the application,
// with customerInfo correctly typed as a structured object.
export type Order = {
    id: string;
    customerInfo: Customer;
    items: {
        id: string;
        quantity: number;
        price: number;
        product: Product;
    }[];
    total: number;
    status: string;
    createdAt: Date;
};


export type CartItem = {
  productId: string;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
};
