// const jwt = require('jsonwebtoken');
// const express = require("express");
// const router = express.Router();


// // Middleware to protect routes
// const authMiddleware = (req, res, next) => {
//     // Get the token from the Authorization header
//     const token = req.header('Authorization');

//     // Check if token exists
//     router.get('/test', authMiddleware, (req, res) => {
//         res.json({ user: req.user });
//     });

//     if (!token) {
//         return res.status(401).json({ message: 'No token, authorization denied' });
//     }

//     try {
//         // Verify the token and decode it
//         const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET_KEY);
//         // console.log(decoded )

//         // Attach the user info (from the token) to the request object
//         req.user = {
//             UserId: decoded.userId, // Ensure you're accessing the correct property
//             email: decoded.email,
//             isAdmin: decoded.isAdmin,
//         };
//             // Calling the next middleware
//         next();
//     } catch (error) {
//         console.error('Token verification error:', error);
//         res.status(401).json({ message: 'Token is not valid' });
//     }
// };

// module.exports = authMiddleware;

const jwt = require('jsonwebtoken');

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Ensure the token is extracted correctly

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Attach the user info (from the token) to the request object
        req.user = {
            _id: decoded.userId,  // Attach userId as `_id` to match the User model’s ID reference
            email: decoded.email,
            isAdmin: decoded.isAdmin,
        };

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;