const express = require('express');
const { fetchProduct } = require('../controllers/productController');

const router = express.Router();
router.get('/', fetchProduct);

module.exports = router;
