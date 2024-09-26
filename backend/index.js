require('dotenv').config();
const express = require('express');
const connectDb = require('./src/utils/db');
const authRoutes = require("./src/Routes/authRoutes")
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use("/api", authRoutes);


app.get('/', (req, res) => {
    res.status(200).send('Welcome to Kisan');
})

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running at port ${PORT}`);
    })
})

