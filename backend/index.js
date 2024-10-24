require('dotenv').config();
const express = require('express');
const connectDb = require('./src/utils/db');
const authRoutes = require("./src/Routes/authRoutes")
const cropRoutes = require('./src/Routes/cropRoute');
const priceRoute = require('./src/Routes/priceRoute');
const topCropRoute = require('./src/Routes/topCropRoute');
const farmRoutes = require('./src/Routes/farmRoutes');
const profileSetupRoute = require('./src/Routes/profileSetupRoute');
const weatherRoute = require('./src/Routes/weatherRoute');
const funFactsRoute = require('./src/Routes/funFactRoutes')
const tipsRoute = require('./src/Routes/tipsRoute')
const cropRecomendRoute=require('./src/Routes/croprecommendRoute');
const translateRoute = require('./src/Routes/translationRoutes');

const app = express();
const cors = require('cors');

const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", cropRoutes);
app.use("/api", priceRoute);
app.use("/api", topCropRoute);
app.use("/api", profileSetupRoute);
app.use("/api", farmRoutes);
app.use("/api", weatherRoute);
app.use("/api", funFactsRoute);
app.use("/api", tipsRoute);
app.use("/api",cropRecomendRoute);
app.use("/api",translateRoute);

app.get('/', (req, res) => {
    res.status(200).send('Welcome to Kisan');
})

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running at port ${PORT}`);
    })
})



