const express = require('express');
const { registerAdmin, authAdmin, getAdminProfile } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { getProfile, changePassword } = require('../controllers/adminController');
const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', authAdmin);
router.get('/profile', protect, getAdminProfile);

router.put('/changepassword', protect, async (req, res) => {
    try {
      await changePassword(req, res); // Pass req and res directly to the changePassword function
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;