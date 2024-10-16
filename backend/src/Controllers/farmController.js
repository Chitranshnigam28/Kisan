const Farm = require("../models/farmModel");

const createFarm = async (req, res) => {
    try {
        // const { farmerName,  soilType, state,last_crop_sowed,soilQuality,currentSeason} = req.body;
        // console.log(req.user, req.user._id)
        // Ensure req.user is defined
        console.log(req.user);
        const {
            farmName,
            cropType,
            soilType,
            location,
            farmingMethod,
            waterSource,
            last_crop_sowed,
            soilQuality,
            currentSeason,
            dateOfPlanting,
            dateOfHarvest,
            sizeOfFarm,
            farmImage
        } = req.body;

        if (!req.user || !req.user.UserId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const newFarm = new Farm({
            farmName,
            cropType,
            soilType,
            location, 
            farmingMethod,
            waterSource,
            last_crop_sowed,
            soilQuality,
            currentSeason,
            dateOfPlanting,
            dateOfHarvest,
            sizeOfFarm,
            farmImage,
            owner: req.user.UserId 
        });

        const savedFarm = await newFarm.save();
        res.status(201).json(savedFarm);

    } catch (error) {
        res.status(500).json({ message: "Failed to create farm", error: error.message });
    }
}

const getFarms = async (req, res) => {
    try {
        const farms = await Farm.find(); 

        if (!farms || farms.length === 0) {
            return res.status(404).json({ message: "No farms found" });
        }

        res.json(farms);
    } catch (error) {
        console.error('Error fetching farms:', error);  
        res.status(500).json({ message: "Failed to fetch farms", error: error.message });
    }
};


const updateFarms = async (req, res) => {
    const { id } = req.params;
    try {
        const updateFarms = await Farm.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

        if (!updateFarms) return res.status(404).json({ message: "Farm not found" })
        res.json(updateFarms)
    } catch (error) {
        res.status(500).json({ message: "Failed to update farm", error: error.message })
    }
}

const deleteFarms = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedFarm = await Farm.findByIdAndDelete(id);
        if (!deletedFarm) return res.status(404).json({ message: "Farm not found" });
        res.json({ message: "Farm deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete farm", error: error.message });
    }
};

module.exports = { createFarm, getFarms, updateFarms, deleteFarms };