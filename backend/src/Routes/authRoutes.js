const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const { home, register, login } = require(path.resolve(__dirname, '../controllers/authController'));
// const { home, register, login } = require('../controllers/authController');
const signupSchema = require('../validators/auth-validator');
const validate = require('../middlewares/validate-middleware');
const authMiddleware =require('../middlewares/authMiddleware');
const User=require('../models/userModel');
const bcrypt = require('bcryptjs');
router.get('/', home);

router.post('/register', register);
router.post('/login', login);

// Change Password Endpoint
router.post('/change-password', authMiddleware, async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Check if the current password is correct
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });

        // Hash and update to new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();

        console.log("Updated password hash:", user.password); // Log the updated password hash for verification

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});
// Redirect to Google for authentication
// router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// // Callback route where Google will redirect after authentication
// router.get('/auth/google/callback', 
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     (req, res) => {
//         const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.redirect(`http://localhost:3000?token=${token}`); // Redirect to frontend with the JWT token
//     }
// );

module.exports = router;