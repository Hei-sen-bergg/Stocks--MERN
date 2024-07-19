// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const upload = require('../middleware/multer');

const fs = require('fs');
const dir = './uploads';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}


// Create a new category
router.post('/',upload.single('image'), categoryController.createCategory);

// Get all categories
router.get('/', categoryController.getAllCategories);

// Get one category by ID
router.get('/:id', categoryController.getCategoryById);

// Update a category by ID
router.put('/:id', upload.single('image'),categoryController.updateCategory);

// Delete a category by ID
router.delete('/:id', categoryController.deleteCategory);



module.exports = router;
