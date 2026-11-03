
const Product = require('../models/Product');
const { redisClient } = require('../config/redis');

const PRODUCT_CACHE_KEY = 'product:demo';

const cacheTtlSeconds = Number(
  process.env.PRODUCT_CACHE_TTL_SECONDS || 60
);

// Stores currently running operations
const pendingRequests = new Map();

async function getProduct() {
  // 1. Check Redis first
  const cachedProduct = await redisClient.get(PRODUCT_CACHE_KEY);

  if (cachedProduct) {
    return {
      product: JSON.parse(cachedProduct),
      cache: 'HIT'
    };
  }

  // 2. Check whether another request is already fetching this product
  if (pendingRequests.has(PRODUCT_CACHE_KEY)) {
    const product = await pendingRequests.get(PRODUCT_CACHE_KEY);

    return {
      product,
      cache: 'COALESCED'
    };
  }

  // 3. Start one MongoDB operation
  const promise = (async () => {
    try {
      const product = await Product.findOne().lean();

      if (!product) {
        throw new Error(
          'No demo product found. Run npm run seed first.'
        );
      }

      // 4. Populate Redis
      await redisClient.set(
        PRODUCT_CACHE_KEY,
        JSON.stringify(product),
        { EX: cacheTtlSeconds }
      );

      return product;
    } finally {
      // 5. Remove completed operation
      pendingRequests.delete(PRODUCT_CACHE_KEY);
    }
  })();

  // 6. Save the running Promise immediately
  pendingRequests.set(PRODUCT_CACHE_KEY, promise);

  const product = await promise;

  return {
    product,
    cache: 'MISS'
  };
}

module.exports = { getProduct };
