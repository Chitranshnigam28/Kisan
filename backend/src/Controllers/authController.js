const User=require('../models/userModel');
const bcrypt=require("bcryptjs");
const home=async (req,res)=>{
    try{
        res.status(200).send('Welcome to Website from controller');
    }catch(err){
        console.log(err);
    }
}

const register=async (req,res,next)=>{
    try{
        // console.log(req.body);
        const {username,email,password}=req.body;
        const userExists=await User.findOne({email:email});

        if(userExists){
            res.status(400).json({msg:'user email already exits'});
        }

        //hash the pwd

    //     const saltRound=10;
    //     const hash_password=await bcrypt.hash(password,saltRound);
    //    const createdUser= await User.create({username,email,phone,password:hash_password});
         const createdUser= await User.create({username,email,password});
       if(createdUser){
        res.status(200).json(
            {
                msg:"registered sucessfully",
                token:await createdUser.generateToken(),
                userId:createdUser._id.toString()
            });
       }
        res.status(200).send({msg:req.body});
    }catch(err){
        console.log(err);
        next(err);
    }
}

const login = async (req,res)=>{
    try{
        const {email,password}=req.body;
        const userExist=await User.findOne({email:email});
        console.log(userExist);
        

        if(!userExist){
            return res.status(400).json({msg:"Invalid credentials"});
        }

        // const user=await bcrypt.compare(password,userExist.password);
        const user=await userExist.comparePassword(password);

        if(user){
            res.status(200).json(
                {
                    msg:"Logged in sucessfully",
                    token:await userExist.generateToken(),
                    userId:userExist._id.toString()
                });
        }else{
            res.status(401).json({msg:"Invalid email or password"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:"Internal Server Error"});
    }
}

module.exports={home,register,login};