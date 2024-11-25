import React, { useState,useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

const ProfileSetup = () => {
    const [formData, setFormData] = useState({
        name: '',
        profilePicture: '',
        age: '',
        soilType: '',
        state: '',
        landSize: '',
        lastCrop: '',
        season: ''
    });

    const location = useLocation();
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate(); // Hook to navigate between pages

    // Extract userId from query params
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const userIdFromQuery = searchParams.get('userId');
        setUserId(userIdFromQuery);
    }, [location.search]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const profileData = { ...formData, userId }; // Attach the userId to the profile data
            console.log("profileData "+profileData);
            const response = await fetch(`http:localhost:5001/api/farmer/profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Convert form data to JSON
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Profile submitted:', data);
            // Handle success (e.g., reset form, show success message, etc.)

            window.alert('Profile & Account created successfully!. Redirecting you to login page');
            navigate('/login'); 
        } catch (error) {
            console.error('Error submitting profile:', error);
            // Handle error (e.g., show error message)
        }
    };
    const inputStyles={
        border:"1px solid black"
    }

    return (
        <div>
            <h1>Farmer Profile Setup</h1>
            <form onSubmit={handleSubmit}>
                {/* Your form fields go here, similar to the previous example */}
                
                {/* Name Field */}
                <div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        style={inputStyles}
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Profile Picture Field */}
                <div>
                    <label>Profile Picture URL:</label>
                    <input 
                        type="text" 
                        
                        name="profilePicture" 
                        value={formData.profilePicture} 
                        onChange={handleChange}
                        style={inputStyles}
                    />
                </div>

                {/* Age Field */}
                <div>
                    <label>Age:</label>
                    <input 
                        type="number" 
                        name="age" 
                        value={formData.age} 
                        onChange={handleChange}
                        min="0"
                        required
                        style={inputStyles}
                    />
                </div>

                {/* Soil Type Dropdown */}
                <div>
                    <label>Soil Type:</label>
                    <select 
                        name="soilType" 
                        value={formData.soilType} 
                        onChange={handleChange}
                        required
                        style={inputStyles}
                    >
                        <option value="">Select Soil Type</option>
                        <option value="Loamy">Loamy</option>
                        <option value="Clay">Clay</option>
                        <option value="Sandy">Sandy</option>
                        <option value="Silty">Silty</option>
                    </select>
                </div>

                {/* State Dropdown */}
                <div>
                    <label>State:</label>
                    <select 
                        name="state" 
                        value={formData.state} 
                        onChange={handleChange}
                        required
                        style={inputStyles}
                    >
                        <option value="">Select State</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Haryana">Haryana</option>
                        {/* Add other states */}
                    </select>
                </div>

                {/* Land Size Field */}
                <div>
                    <label>Land Size (in acres):</label>
                    <input 
                        type="number" 
                        name="landSize" 
                        value={formData.landSize} 
                        onChange={handleChange}
                        min="0"
                        required
                        style={inputStyles}
                    />
                </div>

                {/* Last Crop Field */}
                <div>
                    <label>Last Crop Sowed:</label>
                    <input 
                        type="text" 
                        style={inputStyles}
                        name="lastCrop" 
                        value={formData.lastCrop} 
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Season Dropdown */}
                <div>
                    <label>Season:</label>
                    <select 
                        name="season" 
                        value={formData.season} 
                        onChange={handleChange}
                        required
                        style={inputStyles}
                    >
                        <option value="">Select Season</option>
                        <option value="Summer">Summer</option>
                        <option value="Monsoon">Monsoon</option>
                        <option value="Winter">Winter</option>
                    </select>
                </div>
                
                <button type="submit" style={inputStyles}>Submit</button>
            </form>
        </div>
    );
};

export default ProfileSetup;
