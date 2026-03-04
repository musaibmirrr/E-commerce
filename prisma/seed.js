const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.wishlistItem.deleteMany();
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Create Categories
  const electronics = await prisma.category.create({
    data: { name: "Electronics", description: "Gadgets and devices" },
  });

  const fashion = await prisma.category.create({
    data: { name: "Fashion", description: "Clothing and accessories" },
  });

  const home = await prisma.category.create({
    data: { name: "Home & Living", description: "Furniture and decor" },
  });

  // Create Products
  await prisma.product.createMany({
    data: [
      {
        name: "Wireless Noise-Cancelling Headphones",
        description: "Premium headphones with advanced noise-cancelling technology and 30-hour battery life.",
        price: 299.99,
        inventory: 50,
        categoryId: electronics.id,
        images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"],
      },
      {
        name: "Minimalist Smart Watch",
        description: "Track your fitness and stay connected with this sleek, waterproof smartwatch.",
        price: 199.50,
        inventory: 100,
        categoryId: electronics.id,
        images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"],
      },
      {
        name: "Classic Leather Backpack",
        description: "Handcrafted from genuine leather, perfect for daily use and travel.",
        price: 120.00,
        inventory: 30,
        categoryId: fashion.id,
        images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80"],
      },
      {
        name: "Modern Ceramic Vase",
        description: "Elegant white ceramic vase that complements any interior design.",
        price: 45.00,
        inventory: 200,
        categoryId: home.id,
        images: ["https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&q=80"],
      },
    ],
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
