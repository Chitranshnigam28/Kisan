const User = require('../models/userModel');
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
    try {
        res.status(200).send('Welcome to Website from controller');
    } catch (err) {
        console.log(err);
    }
}

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return res.status(400).json({ msg: 'User email already exists' });
        }

        // Hash the password before saving
        const saltRound = 10;
        const hash_password = await bcrypt.hash(password, saltRound);

        // Create the new user with hashed password
        const createdUser = await User.create({
            username,
            email,
            password: hash_password  // Store the hashed password
        });

        if (createdUser) {
            // Generate token and send response
            return res.status(201).json({
                msg: "Registered successfully",
                token: await createdUser.generateToken(),
                userId: createdUser._id.toString()
            });
            
        }
        
        // Fallback response if something goes wrong
        return res.status(500).json({ msg: "Failed to register user" });

    } catch (err) {
        console.log(err);
        next(err);  // Pass error to error-handling middleware
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const userExist = await User.findOne({ email: email });
        if (!userExist) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await userExist.comparePassword(password);
        if (isMatch) {
            // If passwords match, return success response with token
            return res.status(200).json({
                msg: "Logged in successfully",
                token: await userExist.generateToken(),
                userId: userExist._id.toString()
            });
        } else {
            return res.status(401).json({ msg: "Invalid email or password" });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

module.exports = { home, register, login };
