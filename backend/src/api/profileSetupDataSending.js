require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const FarmerProfile = require('../models/ProfileSetupSchema'); 

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // For parsing application/json

console.log(FarmerProfile, "ssdsd");
// MongoDB Connection
console.log(process.env.MONGO_URI);
const db = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Route to handle profile setup
app.post('/api/farmer/profile', async (req, res) => {
    try {
        // const farmerProfile = new FarmerProfile(req.body);
        const [name, , soilType, state] = req.body

        const newpro = new FarmerProfile({
            name, soilType, state
        })

        const final = await newpro.save();
        res.status(201).json({ message: 'Profile created successfully', final });
        db.collection("farmer_profiles").insertOne(final, function (err, res) {
            if(err) throw err;
            console.log(res);
            db.close();
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
