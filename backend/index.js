require('dotenv').config();
const express = require('express');
const connectDb = require('./src/utils/db');
const authRoutes = require("./src/Routes/authRoutes")
const cropRoutes=require('./src/Routes/cropRoute');
const priceRoute=require('./src/Routes/priceRoute');
const topCropRoute=require('./src/Routes/topCropRoute');
const farmRoutes = require('./src/Routes/farmRoutes'); 
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", cropRoutes);
app.use("/api", priceRoute);
app.use("/api", topCropRoute);

app.use("/api", farmRoutes);


app.get('/', (req, res) => {
    res.status(200).send('Welcome to Kisan');
})

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running at port ${PORT}`);
    })
})

