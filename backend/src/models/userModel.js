const bcrypt = require('bcryptjs/dist/bcrypt');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
})

userSchema.pre("save",async function(next){
    console.log(this);
    const user=this;
    if(!user.isModified("password")){
        next();
    }

    try{
        const saltRount=await bcrypt.genSalt(10);
        const hash_password=await bcrypt.hash(user.password,saltRount);
        user.password=hash_password;
    }catch(err){
        next(err);
    }
})


userSchema.methods.generateToken=async function (){
    try{
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
        {expiresIn:"30d"}
    );
    }catch(err){
        console.log(err);
        
    }
}

userSchema.methods.comparePassword=async function(password){
    return bcrypt.compare(password,this.password);
}
const User=new mongoose.model("User",userSchema);

module.exports=User;