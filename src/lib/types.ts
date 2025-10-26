// Represents a physical or digital product that can be sold.
export type Product = {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    // Relates to the Category table
    categoryId: string;
    // This will be populated by a join
    category?: Category;
    imageUrl: string;
    imageHint: string;
    createdAt: Date;
    updatedAt: Date;
};

// Represents a category that a product can belong to.
export type Category = {
    id: string;
    name: string;
    slug: string;
}

// Represents a user of the application, could be a customer or admin.
export type User = {
    id: string;
    name: string;
    email: string;
    password?: string;
    // Browsing/purchase history stored as a comma-separated string of product slugs
    browsingHistory: string;
    purchaseHistory: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    createdAt: Date;
    updatedAt: Date;
};

// Represents a customer who has placed an order.
export type Customer = {
    id: string;
    name: string;
    email: string;
    userId?: string;
    createdAt: Date;
};

// Represents a sales order.
export type Order = {
    id: string;
    customerId: string;
    customer?: Customer;
    total: number;
    status: string; // e.g., 'PENDING', 'SHIPPED', 'DELIVERED', 'CANCELED'
    createdAt: Date;
    items?: OrderItem[];
};

// Represents an item within a sales order.
export type OrderItem = {
    id: string;
    orderId: string;
    productId: string;
    product?: Product;
    quantity: number;
    price: number;
};


// Represents a row in the product dimension table for analytics.
export type ProductDimension = {
    product_key: number;
    product_id: string;
    name: string;
    category: string;
    price: number;
};

// Represents a row in the date dimension table for analytics.
export type DateDimension = {
    date_key: number;
    date: Date;
    year: number;
    quarter: number;
    month: number;
    day: number;
    day_of_week: number;
};

// Represents a row in the sales fact table for analytics.
export type SalesFact = {
    sale_id: number;
    date_key: number;
    product_key: number;
    customer_id: string;
    quantity_sold: number;
    total_revenue: number;
};


export type CartItem = {
  productId: string;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
};
