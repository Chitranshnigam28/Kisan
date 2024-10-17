const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
})

userSchema.pre("save", async function (next) {
    console.log(this);
    const user = this;
    console.log("user "+user);
    if (!user.isModified("password")) {
        next();
    }

    try {
        const saltRount = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRount);
        user.password = hash_password;
        console.log("user.password "+user.password);
        console.log("hash_password "+hash_password);
    } catch (err) {
        next(err);
    }
})


userSchema.methods.generateToken = async function() {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
    } catch (err) {
        throw new Error('Token generation failed',err);
    }
};


userSchema.methods.comparePassword = async function (password) {
    console.log("password"+password+ "this.password"+this.password);
    console.log("bcrypt.compare(password, this.password)"+bcrypt.compare(password, this.password));
    const isMatch=await bcrypt.compare(password, this.password);
    return isMatch;
}
const User = new mongoose.model("User", userSchema);

module.exports = User;