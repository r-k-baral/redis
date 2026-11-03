require('dotenv').config();
const connectDatabase = require('./config/database');
const { connectRedis, redisClient } = require('./config/redis');
const Product = require('./models/Product');

async function seed() {
  await connectDatabase();
  await connectRedis();

  // Keep exactly one predictable demo product in MongoDB.
  await Product.deleteMany({});
  const product = await Product.create({
    name: 'Redis Demo Mug',
    description: 'One sample product to demonstrate Redis caching.',
    price: 12.5,
    category: 'Demo',
    stock: 10,
    imageUrl: ''
  });

  // Start with an empty Redis cache so the first fetch is a MISS.
  await redisClient.del('product:demo');
  console.log(`Seeded one product: ${product.name}`);

  await redisClient.quit();
  await require('mongoose').disconnect();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
