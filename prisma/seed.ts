import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const placeholderImages = [
  {
    id: 'turmeric-powder',
    imageUrl: "https://images.unsplash.com/photo-1698556735172-1b5b3cd9d2ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHx0dXJtZXJpYyUyMHBvd2RlcnxlbnwwfHx8fDE3NTkzOTU5OTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "turmeric powder"
  },
  {
    id: 'chili-powder',
    imageUrl: "https://images.unsplash.com/photo-1702041295471-01b73fd39907?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxjaGlsaSUyMHBvd2RlcnxlbnwwfHx8fDE3NTkzOTYxNjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "chili powder"
  },
  {
    id: 'coriander-powder',
    imageUrl: "https://images.unsplash.com/photo-1750472878210-0778dcbcc5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxjb3JpYW5kZXIlMjBwb3dkZXJ8ZW58MHx8fHwxNzU5Mzk2MTY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "coriander powder"
  },
  {
    id: 'cumin-seeds',
    imageUrl: "https://images.unsplash.com/photo-1622222250466-08eeb5f9999e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxjdW1pbiUyMHNlZWRzfGVufDB8fHx8MTc1OTM5NjE2NHww&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "cumin seeds"
  },
  {
    id: 'wheat-flour',
    imageUrl: "https://images.unsplash.com/photo-1702061895070-15d7972d3eef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHx3aGVhdCUyMGZsb3VyfGVufDB8fHx8MTc1OTM1NDg4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "wheat flour"
  },
  {
    id: 'gram-flour',
    imageUrl: "https://images.unsplash.com/photo-1586137712370-9b450509c587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxncmFtJTIwZmxvdXJ8ZW58MHx8fHwxNzU5Mzk2MTY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "gram flour"
  },
  {
    id: 'black-pepper',
    imageUrl: "https://images.unsplash.com/photo-1641661548431-87172338d58c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxibGFjayUyMHBlcHBlcmNvcm5zfGVufDB8fHx8MTc1OTM5NjE2NHww&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "black peppercorns"
  },
  {
    id: 'cinnamon-sticks',
    imageUrl: "https://images.unsplash.com/photo-1632644365325-3b4246e9b9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxjaW5uYW1vbiUyMHN0aWNrc3xlbnwwfHx8fDE3NTkzOTYxNjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "cinnamon sticks"
  }
];

const getImageUrl = (slug: string) => placeholderImages.find(img => img.id === slug)?.imageUrl ?? 'https://picsum.photos/seed/error/600/400';
const getImageHint = (slug: string) => placeholderImages.find(img => img.id === slug)?.imageHint ?? '';

const productsToSeed = [
  { name: 'Turmeric Powder', slug: 'turmeric-powder', description: 'Freshly ground turmeric powder with high curcumin content. Adds vibrant color and earthy flavor to your dishes.', price: 5.99, stock: 150, category: 'Spices' },
  { name: 'Red Chili Powder', slug: 'chili-powder', description: 'Spicy and flavorful red chili powder, perfect for adding a kick to any meal. Made from sun-dried red chilies.', price: 6.49, stock: 120, category: 'Spices' },
  { name: 'Coriander Powder', slug: 'coriander-powder', description: 'Aromatic and mild, our coriander powder is an essential ingredient for curries and spice blends.', price: 4.99, stock: 200, category: 'Spices' },
  { name: 'Cumin Seeds', slug: 'cumin-seeds', description: 'Whole cumin seeds with a warm, nutty flavor. Toast them to release their full aroma before using.', price: 7.99, stock: 80, category: 'Spices' },
  { name: 'Organic Wheat Flour', slug: 'wheat-flour', description: 'Fine, whole wheat flour, organically grown and stone-ground to preserve nutrients. Ideal for baking bread and chapatis.', price: 10.99, stock: 100, category: 'Flours' },
  { name: 'Gram Flour (Besan)', slug: 'gram-flour', description: 'Gluten-free flour made from ground chickpeas. A versatile ingredient for batters, flatbreads, and sweets.', price: 8.99, stock: 90, category: 'Flours' },
  { name: 'Black Peppercorns', slug: 'black-pepper', description: 'Bold and pungent whole black peppercorns. Grind fresh for the best flavor.', price: 9.99, stock: 110, category: 'Spices' },
  { name: 'Cinnamon Sticks', slug: 'cinnamon-sticks', description: 'Sweet and fragrant cinnamon sticks, perfect for infusing flavor into drinks, desserts, and savory dishes.', price: 12.49, stock: 60, category: 'Spices' },
];

const usersToSeed = [
    {
      id: '1',
      name: 'Alice',
      email: 'alice@example.com',
      password: 'password123', // In a real app, this would be a hash
      browsingHistory: 'turmeric-powder,coriander-powder,wheat-flour',
      purchaseHistory: 'turmeric-powder',
      address: '123 Spice Lane',
      city: 'Flavor Town',
      postalCode: '12345',
      country: 'India'
    },
    {
      id: '2',
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'adminpassword',
      browsingHistory: '',
      purchaseHistory: '',
      address: '456 Admin Avenue',
      city: 'Control City',
      postalCode: '54321',
      country: 'India'
    },
];

async function main() {
  console.log(`Start seeding ...`);

  // Upsert products
  for (const p of productsToSeed) {
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        stock: p.stock,
        category: p.category,
        imageUrl: getImageUrl(p.slug),
        imageHint: getImageHint(p.slug),
      },
    });
    console.log(`Upserted product with id: ${product.id}`);
  }

  // Upsert users
  for (const u of usersToSeed) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: u,
    });
    console.log(`Upserted user with id: ${user.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
