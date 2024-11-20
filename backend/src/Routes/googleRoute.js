require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

console.log("process.env.JWT_SECRET from googleRoute "+process.env.JWT_SECRET_KEY);
// Redirect to Google for authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route where Google will redirect after authentication
router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        console.log('User authenticated:', req.user); 
        const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        console.log('Generated JWT token:', token);
        res.redirect(`https://kisan-green.vercel.app/login?token=${token}`); // Redirect to frontend with the JWT token
    }
);

module.exports = router;