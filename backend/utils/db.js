const mongoose=require('mongoose');

const URI=process.env.MONGODB_URI;

const connectDb=async ()=>{
    try{
        await mongoose.connect(URI);
        console.log('db connection sucessfull');
        
    }catch(err){
        console.log('db connection failed.')
        process.exit(0);
    }
}

module.exports=connectDb;