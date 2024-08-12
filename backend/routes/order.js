const express = require('express');
const { getProducts } = require('../controllers/productController');
const router = express.Router();

router.route('/order').post(getProducts);

module.exports = router;