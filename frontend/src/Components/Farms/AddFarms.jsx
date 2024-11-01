import React, { useState } from 'react';
import { FaCalendarDays, FaPlus } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddFarms = () => {

    const [farmData, setFarmData] = useState({
        farmName: "",
        cropType: "",
        cropName: "",
        soilType: "",
        location: "",
        farmingMethod: "",
        waterSource: "",
        last_crop_sowed: "",
        soilQuality: "",
        currentSeason: "",
        dateOfPlanting: "",
        dateOfHarvest: "",
        sizeOfFarm: "",
        farmImage: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFarmData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFarmData(prevState => ({
            ...prevState,
            farmImage: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            alert('No token found. Please log in again.');
            return;
        }

        const farmDetails = {
            farmName: farmData.farmName,
            cropType: farmData.cropType,
            cropName: farmData.cropName,
            soilType: farmData.soilType,
            location: farmData.location,
            farmingMethod: farmData.farmingMethod,
            waterSource: farmData.waterSource,
            last_crop_sowed: farmData.last_crop_sowed,
            soilQuality: farmData.soilQuality,
            currentSeason: farmData.currentSeason,
            dateOfPlanting: farmData.dateOfPlanting,
            dateOfHarvest: farmData.dateOfHarvest,
            sizeOfFarm: farmData.sizeOfFarm,
        };
    
        try {
            let response;
            if (farmData.farmImage) {
                const farmFormData = new FormData();
                farmFormData.append('farmImage', farmData.farmImage, farmData.farmImage.name);
                farmFormData.append('farmDetails', JSON.stringify(farmDetails)); 
    
                response = await axios.post('http://localhost:5001/api/farms', farmFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },
                });
            } else {
                response = await axios.post('http://localhost:5001/api/farms', farmDetails, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
            }
    
            console.log('Farm added:', response.data);
    
            setFarmData({
                farmName: "",
                cropType: "",
                cropName: "",
                soilType: "",
                location: "",
                farmingMethod: "",
                waterSource: "",
                last_crop_sowed: "",
                soilQuality: "",
                currentSeason: "",
                dateOfPlanting: "",
                dateOfHarvest: "",
                sizeOfFarm: "",
                farmImage: null,
            });
    
            alert('Farm added successfully!');
        } catch (error) {
            console.error('Error adding farm:', error.response?.data || error.message);
    
            if (error.response?.data?.message) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert('Failed to add farm. Please try again.');
            }
        }
    };
    

    return (
        <div className='addFarmContainer container my-5'>
            <h2 className="mb-4">Add New Farm</h2>
            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label className="form-label">Farm Name:</label>
                    <input
                        type="text"
                        name="farmName"
                        className="form-control"
                        value={farmData.farmName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Crop Type:</label>
                    <select
                        name="cropType"
                        className="form-select"
                        value={farmData.cropType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Crop Type</option>
                        <option value="Cereal Crops">Cereal Crops</option>
                        <option value="Cash Crops">Cash Crops</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Oil Seeds">Oil Seeds</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="form-label">Crop Name:</label>
                    <select
                        name="cropName"
                        className="form-select"
                        value={farmData.cropName}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Crop Name</option>
                        <option value="Rice">Rice</option>
                        <option value="Wheat">Wheat</option>
                        <option value="Maize">Maize</option>
                        <option value="Cotton">Cotton</option>
                        <option value="Sugarcane">Sugarcane</option>
                        <option value="Barley">Barley</option>
                        <option value="Millet">Millet</option>
                        <option value="Tobacco">Tobacco</option>
                        <option value="Cabbage">Cabbage</option>
                        <option value="Onion">Onion</option>
                        <option value="Garlic">Garlic</option>
                        <option value="Cauliflower">Cauliflower</option>
                        <option value="Spinach">Spinach</option>
                        <option value="Tomato">Tomato</option>
                        <option value="Pumpkin">Pumpkin</option>
                        <option value="Eggplant">Eggplant</option>
                        <option value="Bitter Gourd">Bitter Gourd</option>
                        <option value="Tea">Tea</option>
                        <option value="Coffee">Coffee</option>
                        <option value="Jowar">Jowar</option>
                        <option value="Bajra">Bajra</option>
                        <option value="Potato">Potato</option>
                        <option value="Peas">Peas</option>
                        <option value="Ragi">Ragi</option>
                        <option value="Soybean">Soybean</option>
                        <option value="Seasame">Sesame</option>
                        <option value="Groundnut">Groundnut</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="form-label">Soil Type:</label>
                    <select
                        name="soilType"
                        className="form-select"
                        value={farmData.soilType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Soil Type</option>
                        <option value="Clay and Loamy">Clay and Loamy</option>
                        <option value="Loamy and Well-Drained">Loamy and Well-Drained</option>
                        <option value="Sandy and Well-Drained">Sandy and Well-Drained</option>
                        <option value="Well-drained Sandy Loam">Well-drained Sandy Loam</option>
                        <option value="Well-Drained and Rich in Organic Matter">Well-Drained and Rich in Organic Matter</option>
                        <option value="Well-drained Sandy or Loamy Soil">Well-drained Sandy or Loamy Soil</option>
                        <option value="Well-drained, Fertile Soil">Well-drained, Fertile Soil</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="form-label">Location:</label>
                    <select
                        name="location"
                        className="form-select"
                        value={farmData.location}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Location</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                        <option value="Daman and Diu">Daman and Diu</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Puducherry">Puducherry</option>
                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        <option value="Ladakh">Ladakh</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="form-label">Farming Method:</label>
                    <select
                        name="farmingMethod"
                        value={farmData.farmingMethod}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Farming Method</option>
                        <option value="organic">Organic Farming</option>
                        <option value="conventional">Conventional Farming</option>
                        <option value="hydroponics">Hydroponics</option>
                        <option value="aquaponics">Aquaponics</option>
                        <option value="permaculture">Permaculture</option>
                        <option value="no-till">No-Till Farming</option>
                        <option value="agroforestry">Agroforestry</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="form-label">Water Source:</label>
                    <select
                        name="waterSource"
                        value={farmData.waterSource}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Water Source</option>
                        <option value="well">Well Water</option>
                        <option value="river">River</option>
                        <option value="lake">Lake</option>
                        <option value="rainwater">Rainwater Harvesting</option>
                        <option value="municipal">Municipal Supply</option>
                        <option value="borewell">Borewell</option>
                        <option value="drip">Drip Irrigation</option>
                        <option value="canal">Canal</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="form-label">Last Crop Sowed:</label>
                    <input
                        type="text"
                        name="last_crop_sowed"
                        className="form-control"
                        value={farmData.last_crop_sowed}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Soil Quality:</label>
                    <select
                        name="soilQuality"
                        className="form-select"
                        value={farmData.soilQuality}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Soil Quality</option>
                        <option value="low">Low</option>
                        <option value="moderate">Moderate</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="form-label">Current Season:</label>
                    <select
                        name="currentSeason"
                        className="form-select"
                        value={farmData.currentSeason}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Current Season</option>
                        <option value="spring">Spring</option>
                        <option value="summer">Summer</option>
                        <option value="autumn">Autumn</option>
                        <option value="winter">Winter</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="form-label d-flex align-items-center"> <FaCalendarDays className="me-2" /> Date of Planting: </label>
                    <input
                        type="date"
                        name="dateOfPlanting"
                        className="form-control"
                        value={farmData.dateOfPlanting}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label d-flex align-items-center"> Date of Harvest: </label>
                    <input
                        type="date"
                        name="dateOfHarvest"
                        className="form-control"
                        value={farmData.dateOfHarvest}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label d-flex align-items-center"> Size of Farm (in Hectares): </label>
                    <input
                        type="number"
                        name="sizeOfFarm"
                        className="form-control"
                        value={farmData.sizeOfFarm}
                        onChange={handleChange}
                        required
                    />
                </div>


                <div className="mb-4">
                    <label className="form-label d-flex align-items-center">Upload Farm Image:  <FiUpload className="me-2" /></label>
                    <input
                        type="file"
                        name="farmImage"
                        className="form-control"
                        accept="image/*"
                        onChange={handleFileChange}
                    />

                </div>

                <div className="d-flex">
                    <button type="submit" className="btn btn-success me-3">Save</button>
                    {/* <button type="submit" className="btn btn-dark d-flex align-items-center">
                        <FaPlus className="me-2" />
                        Add New Farm
                    </button> */}
                </div>


            </form>
            <div className="d-flex justify-content-center align-items-center vh-50">
                <Link to="/" className="btn btn-dark btn-lg rounded-pill mt-3">
                    Go Back
                </Link>
            </div>
        </div>

    );
}

export default AddFarms