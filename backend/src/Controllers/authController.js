const User=require('../models/userModel');
const bcrypt=require("bcryptjs");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


// Transporter for sending emails
// const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });
//   console.log("process.env.EMAIL "+process.env.EMAIL);
//   console.log("process.env.EMAIL_PASSWORD "+process.env.EMAIL_PASSWORD);
//   transporter.verify((error, success) => {
//     if (error) {
//       console.log("Error with transporter configuration:", error);
//     } else {
//       console.log("Email transporter is set up correctly");
//     }
//   });
  
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
        const {username,email,phone,password}=req.body;
        console.log("username"+username);
        console.log("email"+email);
        console.log("phone"+phone);
        console.log("password"+password);
        const userExists=await User.findOne({email:email});

        if(userExists){
            res.status(400).json({msg:'user email already exits'});
        }

        //hash the pwd

    //     const saltRound=10;
    //     const hash_password=await bcrypt.hash(password,saltRound);
    //    const createdUser= await User.create({username,email,phone,password:hash_password});
       const createdUser= await User.create({username,email,phone,password});
       if(createdUser){
        res.status(200).json(
            {
                msg:"registered sucessfully",
                token:await createdUser.generateToken(),
                userId:createdUser._id.toString()
            });
       }
        
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
        console.log("user 55 "+user);
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

// Forgot Password - Send OTP to email
// const forgotPassword = async (req, res) => {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
  
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
  
//     // Generate OTP and set expiry
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiry = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
  
//     user.otp = otp;
//     user.otpExpiry = otpExpiry;
//     await user.save();
  
//     // Send OTP email
//     const mailOptions = {
//       from: process.env.EMAIL,
//       to: email,
//       subject: 'Password Reset OTP',
//       text: `Your OTP for password reset is: ${otp}`,
//     };
  
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         return res.status(500).json({ message: 'Failed to send email' });
//       }
//       res.json({ message: 'OTP sent to your email' });
//     });
//   };
  
  // Verify OTP
  // const verifyOtp = async (req, res) => {
  //   const { email, otp } = req.body;
  //   const user = await User.findOne({ email });
  
  //   if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
  //     return res.status(400).json({ message: 'Invalid or expired OTP' });
  //   }
  
  //   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });
  //   res.json({ message: 'OTP verified', token });
  // };
  
  // Reset Password
  // const resetPassword = async (req, res) => {
  //   const { token, newPassword } = req.body;
  
  //   try {
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  //     const user = await User.findById(decoded.id);
  
  //     if (!user) {
  //       return res.status(404).json({ message: 'User not found' });
  //     }
  
  //     user.password = newPassword;
  //     user.otp = null;
  //     user.otpExpiry = null;
  //     await user.save();
  
  //     res.json({ message: 'Password reset successful' });
  //   } catch (err) {
  //     res.status(400).json({ message: 'Invalid or expired token' });
  //   }
  // };

module.exports={home,register,login};