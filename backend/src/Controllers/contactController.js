const Contact=require('../models/contactModel');

const contactForm=async (req,res)=>{
    try{
        const response=req.body;
        await Contact.create(response);
        res.status(200).json({msg:"Message sent sucessfully."})
    }catch(err){
        // next(err);
        res.status(500).json({msg:"Message not sent sucessfully."})
    }
}

module.exports=contactForm;