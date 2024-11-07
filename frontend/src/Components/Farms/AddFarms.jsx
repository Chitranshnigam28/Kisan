import React, { useState } from 'react';
import { FaCalendarDays, FaPlus } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import axios from 'axios';
import '../../css/addFarms.css';
import { IoMdArrowBack } from "react-icons/io";
import WellIcon from "../../Assets/Water Source/Well.svg";
import RiverIcon from "../../Assets/Water Source/River.svg";
import RainwaterIcon from "../../Assets/Water Source/Rainwater.svg";
import IrrigationIcon from "../../Assets/Water Source/Irrigation.svg";
import CanalIcon from "../../Assets/Water Source/Canal.svg";
import LakeIcon from "../../Assets/Water Source/Lake.svg";
import BorewellIcon from "../../Assets/Water Source/Borewell.svg";
import MunicipalSupplyIcon from "../../Assets/Water Source/Municipal Supply.svg";
import ClayIcon from "../../Assets/Soil type/Clay.svg"
import SandyIcon from "../../Assets/Soil type/🏜️.svg"
import LoamyIcon from "../../Assets/Soil type/💧.svg"
import SiltIcon from "../../Assets/Soil type/🧱.svg"
import OrganicIcon from "../../Assets/Farming Method/Organic.svg";
import ConventionalIcon from "../../Assets/Farming Method/gardening-tools.svg";
import AgroforestryIcon from "../../Assets/Farming Method/Agroforestry.svg";
import PermacultureIcon from "../../Assets/Farming Method/Permaculture.svg";
import WheatIcon from "../../Assets/Vegetables/wheat.png";
import RiceIcon from "../../Assets/Vegetables/rice.png";
import CornIcon from "../../Assets/Vegetables/Corn.svg";
import TomatoIcon from "../../Assets/Vegetables/tomato.png";

const cropNameIcons = {
    Wheat: WheatIcon,
    Corn: CornIcon,
    Rice: RiceIcon,
    Tomato: TomatoIcon
};

const soilTypeIcons = {
    Clay: ClayIcon,
    Sandy: SandyIcon,
    Loamy: LoamyIcon,
    Silt: SiltIcon
};

const farmingMethodIcons = {
    Organic: OrganicIcon,
    Conventional: ConventionalIcon,
    Agroforestry: AgroforestryIcon,
    Permaculture: PermacultureIcon
};


const waterSourceIcons = {
    Well: WellIcon,
    River: RiverIcon,
    Rainwater: RainwaterIcon,
    Irrigation: IrrigationIcon,
    Canal: CanalIcon,
    Lake: LakeIcon,
    Borewell: BorewellIcon,
    "Municipal Supply": MunicipalSupplyIcon
};

const AddFarms = () => {
    const [currentStep, setCurrentStep] = useState(1);
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

    const handleSelection = (field, value) => {
        setFarmData(prevState => ({
            ...prevState,
            [field]: value
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

        if (currentStep === 2) {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('No token found. Please log in again.');
                return;
            }

            const farmDetails = { ...farmData };

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
                alert('Farm added successfully!');
                resetForm();
            } catch (error) {
                console.error('Error adding farm:', error.response?.data || error.message);
                alert('Failed to add farm. Please try again.');
            }
        }
    };
    const resetForm = () => {
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
        setCurrentStep(1);
    };

    const handleCancel = () => {
        console.log("Cancelled");
        resetForm();
    };

    return (
        <div className='addFarmContainer container my-5'>
            <h2 className="mb-4">Add a New Farm</h2>
            <h5 className="mb-5">Create an account to access and start to set up your farm and garden.</h5>
            <form onSubmit={handleSubmit}>
                <div className={`widget-border ${currentStep === 1 ? 'half' : 'full'}`} />

                {/* Step 1 */}
                {currentStep === 1 && (
                    <div>
                        <h5 className="mb-4">Step 1 of 2</h5>
                        <div className="mb-4">
                            <label className="form-label">Upload Farm Image:</label>
                            <div className="upload-box">
                                <input
                                    type="file"
                                    name="farmImage"
                                    className="upload-input"
                                    onChange={handleFileChange}
                                    id="file-upload"
                                />
                                <label htmlFor="file-upload" className="upload-label">
                                    Upload your farm image
                                </label>
                            </div>
                        </div>
                        <div className="form-group mb-4">
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
                                <label className="form-label">Size of Farm:</label>
                                <input
                                    type="text"
                                    name="sizeOfFarm"
                                    className="form-control"
                                    value={farmData.sizeOfFarm}
                                    onChange={handleChange}
                                    required
                                />
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
                        </div>

                        <div className="button-container">
                            <button type="button" className="main-Btn" onClick={() => setCurrentStep(2)}>Continue</button>
                            <button type="button" className="sec-Btn" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div>
                        <h5 className="mb-4">Step 2 of 2</h5>
                        <div className="form-grp mb-4">
                            <label className="form-label">Soil Quality:</label>
                            <div className="button-group">
                                {["Low", "Moderate", "High"].map((quality) => (
                                    <button
                                        key={quality}
                                        type="button"
                                        className={`custom-button ${farmData.soilQuality === quality ? "selected" : ""}`}
                                        onClick={() => handleSelection("soilQuality", quality)}
                                    >
                                        {quality}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Crop Type */}
                        <div className="form-grp mb-4">
                            <label className="form-label">Crop Type:</label>
                            <div className="button-group">
                                {["Vegetable", "Fruit", "Grain", "Flower"].map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        className={`custom-button ${farmData.cropType === type ? "selected" : ""}`}
                                        onClick={() => handleSelection("cropType", type)}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Crop Name */}
                        <div className="form-grp mb-4">
                            <label className="form-label">Crop Name:</label>
                            <div className="button-group">
                                {["Wheat", "Corn", "Rice", "Tomato"].map((name) => (
                                    <button
                                        key={name}
                                        type="button"
                                        className={`custom-button ${farmData.cropName === name ? "selected" : ""}`}
                                        onClick={() => handleSelection("cropName", name)}
                                    >
                                        <img
                                            src={cropNameIcons[name]}
                                            alt={`${name} icon`}
                                            className="button-icon"
                                        />
                                        {name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Soil Type */}
                        <div className="form-grp mb-4">
                            <label className="form-label">Soil Type:</label>
                            <div className="button-group">
                                {["Clay", "Sandy", "Loamy", "Silt"].map((soil) => (
                                    <button
                                        key={soil}
                                        type="button"
                                        className={`custom-button ${farmData.soilType === soil ? "selected" : ""}`}
                                        onClick={() => handleSelection("soilType", soil)}
                                    >
                                        <img src={soilTypeIcons[soil]} alt={`${soil} icon`} className="button-icon" />
                                        {soil}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Current Season */}
                        <div className="form-grp mb-4">
                            <label className="form-label">Current Season:</label>
                            <div className="button-group">
                                {["Spring", "Summer", "Autumn", "Winter"].map((season) => (
                                    <button
                                        key={season}
                                        type="button"
                                        className={`custom-button ${farmData.currentSeason === season ? "selected" : ""}`}
                                        onClick={() => handleSelection("currentSeason", season)}
                                    >
                                        {season}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Farming Method */}
                        <div className="form-grp mb-4">
                            <label className="form-label">Farming Method:</label>
                            <div className="button-group">
                                {["Organic", "Conventional", "Agroforestry", "Permaculture"].map((method) => (
                                    <button
                                        key={method}
                                        type="button"
                                        className={`custom-button ${farmData.farmingMethod === method ? "selected" : ""}`}
                                        onClick={() => handleSelection("farmingMethod", method)}
                                    >
                                        <img src={farmingMethodIcons[method]} alt={`${method} icon`} className="button-icon" />
                                        {method}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Water Source */}
                        <div className="form-grp mb-4">
                            <label className="form-label">Water Source:</label>
                            <div className="button-group">
                                {["Well", "River", "Rainwater", "Irrigation", "Canal", "Lake", "Borewell", "Municipal Supply"].map((source) => (
                                    <button
                                        key={source}
                                        type="button"
                                        className={`custom-button ${farmData.waterSource === source ? "selected" : ""}`}
                                        onClick={() => handleSelection("waterSource", source)}
                                    >
                                        <img
                                            src={waterSourceIcons[source]} // Make sure waterSourceIcons has the correct path to each SVG
                                            alt={`${source} icon`}
                                            className="button-icon"
                                        />
                                        {source}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="button-container">
                            <button type="submit" className="main-Btn">Submit</button>
                            <button type="button" className="sec-Btn" onClick={handleCancel}>Back</button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default AddFarms;

