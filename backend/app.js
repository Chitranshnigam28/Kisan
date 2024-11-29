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
const googleRoute=require('./src/Routes/googleRoute');
const session = require('express-session');
const passport = require('passport');
const topCropRoutes = require('./src/api/fetchTopCrops');
const marketInsights = require('./src/api/marketInsigtsai')
const splineChart = require('./src/api/splineChart')
const chatBot = require('./src/api/chatBot');
const passportSetup=require('./src/middlewares/passport');
const translateRoute = require('./src/Routes/translationRoutes');
const chatRoutes = require('./src/Routes/chatBotRoute'); 

const app = express();
const cors = require('cors');

const PORT = process.env.PORT||5001;
app.use(cors());
app.use(express.json());

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: true,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
app.use("/",googleRoute);
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
app.use('/api', topCropRoutes);
app.use('/api', marketInsights);
app.use('/api', splineChart);
app.use("/api", chatRoutes);

app.get('/', (req, res) => {
    res.status(200).send('Welcome to Kisan');
})

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running at port ${PORT}`);
    })
})



module.exports=app;