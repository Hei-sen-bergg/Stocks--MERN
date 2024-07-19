const asyncHandler = require("express-async-handler")
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');



// Create a new product
exports.createProduct = asyncHandler(async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Request File:', req.file);

    const { name, price, barcode, category, count } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    // Check if barcode is exactly 12 characters
    if (!/^[A-Za-z0-9]{12}$/.test(barcode)) {
      return res.status(400).json({ message: 'Barcode must be exactly 12 alphanumeric characters.' });
    }

    const product = new Product({ name, price, barcode, category, count, image });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error); // Enhanced logging
    if (error.code === 11000) { // Duplicate key error
      res.status(400).json({ message: 'Barcode must be unique.' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});


  
  // Get all products in a category
  exports.getProductsByCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
      const products = await Product.find({ category: categoryId }).populate('category', 'name');
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error });
    }
  };
  

  // Get a particular product
exports.getProductById = asyncHandler(async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


// Update a product
exports.updateProduct = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.params;

    // If updating barcode, ensure it is exactly 12 characters
    if (req.body.barcode && !/^[A-Za-z0-9]{12}$/.test(req.body.barcode)) {
      return res.status(400).json({ message: 'Barcode must be exactly 12 alphanumeric characters.' });
    }

    let updatedProductData = { ...req.body };

    // Handle file upload if there's a file in the request
    if (req.file) {
      const imageUrl = `/uploads/${req.file.filename}`;
      updatedProductData = { ...updatedProductData, image: imageUrl };
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error
      res.status(400).json({ message: 'Barcode must be unique.' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});


  // Delete a product
exports.deleteProduct = asyncHandler(async (req, res) => {
    try {
      const { productId } = req.params;
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update product count (increase or decrease)
exports.updateProductCount = asyncHandler(async (req, res) => {
    try {
      const { productId } = req.params;
      const { count } = req.body;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      product.count += count;  // You can pass positive or negative values for increasing or decreasing the count
      await product.save();
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
  