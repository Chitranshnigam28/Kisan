const express = require('express');
const router = express.Router();
const passport = require('passport');
const { home, register, login } = require('../controllers/authController');
const signupSchema = require('../validators/auth-validator');
const validate = require('../middlewares/validate-middleware');


router.get('/', home);

router.post('/register', register);
router.post('/login', login);

// // Forgot password routes
// router.post('/forgot-password', forgotPassword); // Initiates OTP sending
// router.post('/verify-otp', verifyOtp);           // Verifies OTP
// router.post('/reset-password', resetPassword);    // Resets the password

module.exports = router;