const { getProduct } = require('../services/productService');

async function fetchProduct(req, res, next) {
  try {
    const result = await getProduct();
    res.set('X-Cache', result.cache);
    res.json({ data: result.product, cache: result.cache });
  } catch (error) {
    next(error);
  }
}

module.exports = { fetchProduct };
