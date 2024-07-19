const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/multer');

const fs = require('fs');
const dir = './uploads';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// Create a new product
router.post('/', upload.single('image'),productController.createProduct);

// Get all products in a category
router.get('/category/:categoryId', productController.getProductsByCategory);

// Get a particular product
router.get('/:productId', productController.getProductById);

// Update a product
router.put('/:productId',upload.single('image'), productController.updateProduct);

// Delete a product
router.delete('/:productId', productController.deleteProduct);

// Update product count
router.patch('/:productId/count', productController.updateProductCount);


module.exports = router;
