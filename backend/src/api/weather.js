const express = require('express');
const dbConnect = require('../utils/db');
const { connect } = require('mongoose');
const connectDB = require('../utils/db');

const app = express();
connectDB();
app.use(express.json());



//starting the server
const port = 3000;
app.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
})