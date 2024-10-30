const express = require('express');
const router = express.Router();
const passport = require('passport');
const { home, register, login } = require('../controllers/authController');
const signupSchema = require('../validators/auth-validator');
const validate = require('../middlewares/validate-middleware');


router.get('/', home);

router.post('/register', register);
router.post('/login', login);

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