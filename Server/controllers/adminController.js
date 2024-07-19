const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')



// Generating JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });
  };

  // Register new admin
exports.registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;
  
    const adminExists = await Admin.findOne({ email });
  
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists with this email address' });
    }
  
    const admin = await Admin.create({ name, email, password });
  
    if (admin) {
      res.status(201).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid admin data' });
    }
  };


  // Authenticate admin & get token
  exports.authAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, admin.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(admin._id);

        res.json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



  // Get admin profile
exports.getAdminProfile = async (req, res) => {
    const admin = await Admin.findById(req.admin._id);
  
    if (admin) {
      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email
      });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  };
  

  // Get admin profile
exports.getProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.user.id).select('-password');
  res.json(admin);
});



// Change admin password
exports.changePassword = asyncHandler(async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body; // Adjusted field names

    const admin = await Admin.findById(req.admin._id).select("+password"); // Use admin model and retrieve admin from req.admin

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" }); // Adjusted error message
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, admin.password); // Compare oldPassword with stored password

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Old password is incorrect" }); // Adjusted error message
    }

    if (newPassword === oldPassword) {
      return res.status(400).json({ error: "New password cannot be the same as the old password" }); // Adjusted error message
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    admin.password = hashedPassword;
    await admin.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Internal server error" });
  }
})
