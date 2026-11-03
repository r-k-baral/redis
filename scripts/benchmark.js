require('dotenv').config();
const { performance } = require('node:perf_hooks');
const connectDatabase = require('../src/config/database');
const { connectRedis, redisClient } = require('../src/config/redis');
const Product = require('../src/models/Product');
const { getProduct } = require('../src/services/productService');

async function run() {
  const iterations = Number(process.env.BENCH_ITERATIONS || 100);
  await connectDatabase();
  await connectRedis();

  const product = await Product.findOne().lean();
  if (!product) throw new Error('No demo product found. Run npm run seed first.');

  let started = performance.now();
  for (let i = 0; i < iterations; i += 1) await Product.findById(product._id).lean();
  const mongoMs = performance.now() - started;

  // Warm Redis once; all measured calls below should be cache hits.
  await getProduct();
  started = performance.now();
  for (let i = 0; i < iterations; i += 1) await getProduct();
  const redisMs = performance.now() - started;

  console.log(`\nOne product, ${iterations} sequential reads`);
  console.log(`MongoDB direct: ${(mongoMs / iterations).toFixed(2)} ms average`);
  console.log(`Redis cache:    ${(redisMs / iterations).toFixed(2)} ms average`);

  await redisClient.quit();
  await require('mongoose').disconnect();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
