const FarmerProfile = require('../models/ProfileSetupSchema');

const profilesetup = async (req, res) => {
    try {
        // const farmerProfile = new FarmerProfile(req.body);
        // const [name, , soilType, state] = req.body;
        const { name, profilePicture, age, soilType, state, landSize, lastCrop, season } = req.body;

        console.log("HIGH"+req.body);
        console.log("HIGH FROM PROFILE");
        const newpro = new FarmerProfile({
            name, profilePicture, age, soilType, state, landSize, lastCrop, season
        })


        const final = await newpro.save();
        res.status(201).json({ message: 'Profile created successfully', final });
        // db.collection("farmer_profiles").insertOne(final, function (err, res) {
        //     if(err) throw err;
        //     console.log(res);
        //     db.close();
        // })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = profilesetup;