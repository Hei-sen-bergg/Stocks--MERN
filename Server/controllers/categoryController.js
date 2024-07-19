const asyncHandler = require("express-async-handler")
const Category = require("../models/categoryModel")


// Create a new category

const createCategory = asyncHandler(async(req,res)=>{
    const{name,description} = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const category = new Category({
        name,
        description,
        image
    })
    try{
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    }catch (err) {
        res.status(400).json({ message: err.message });
      }

})

// Get all categories

const getAllCategories = asyncHandler(async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // Get one category by ID

const getCategoryById = asyncHandler(async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (category == null) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(category);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


  // Update a category by ID
  const updateCategory = asyncHandler(async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (category == null) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      if (req.body.name != null) {
        category.name = req.body.name;
      }
      if (req.body.description != null) {
        category.description = req.body.description;
      }
      if (req.file != null) {
        category.image = `/uploads/${req.file.filename}`; // Save the path of the uploaded image
      }
  
      const updatedCategory = await category.save();
      res.status(200).json(updatedCategory);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Delete a category by ID
const deleteCategory = asyncHandler(async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (category == null) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      await category.deleteOne({_id:req.params.id})
      res.status(200).json({ message: 'Category deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  
  

  module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
  }