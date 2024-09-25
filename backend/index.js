require('dotenv').config({path:'../.env'});
const express=require('express');
const connectDb=require('./utils/db');

const app=express();

const PORT=process.env.PORT;
console.log('Mongo URI:', process.env.MONGO_URI); 
console.log('Server Port:', process.env.PORT);

app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).send('Welcome to Kisan');
})

connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running at port ${PORT}`);
    })
})

