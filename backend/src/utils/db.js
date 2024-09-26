const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'../../.env'});

const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI)
    console.log('MongoDB connected', mongoURI);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  }
};

module.exports = connectDB;
