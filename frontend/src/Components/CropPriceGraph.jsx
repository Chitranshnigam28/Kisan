import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import '../css/dashboard.css'

const CropPriceChart = ({ crop }) => {
    const [cropPrices, setCropPrices] = useState([]);
    const [cropName,setCropName]=useState('');
    const [loading, setLoading] = useState(true);

    // Fetch crop prices from the backend
    const fetchCropPrices = async () => {
        try {
            const cropSent=cropName?cropName:'Wheat';
            console.log("cropSent "+cropSent);
            const response = await fetch(`http://localhost:5001/api/crops/price?crop=${cropSent}`);
            // console.log("response.data()"+response.data());
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            console.log("data received new "+JSON.stringify(data));
            // Extract historical prices
            const historicalPrices = data[0].market_price.historical_prices;

            // console.log("historicalPrices "+historicalPrices);
            setCropPrices(historicalPrices);
            console.log("cropPrices after historicalPrices "+cropPrices);
        } catch (error) {
            console.error('Error fetching crop prices:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCropPrices();
    }, [crop]);

    // Prepare data for ApexCharts
    const chartData = {
        series: [{
            name: 'Price',
            data: cropPrices.map(item => item.price)
        }],
        options: {
            chart: {
                type: 'line',
                height: 350
            },
            title: {
                text: `${crop} Prices Over Time`
            },
            xaxis: {
                categories: cropPrices.map(item => item.year) 
            }
        }
    };
    const handleCropName=(e)=>{
        const crpName=e.target.value;
        setCropName(crpName);
        
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true);
        fetchCropPrices();
        console.log(cropName);
    }
    return (
        <div>
            
            <form onSubmit={handleSubmit} className="flex flex-col m-auto w-2/3 place-items-center mt-8">
            <h1>Crop Prices Trends</h1>
                <input type="text" value={cropName}onChange={handleCropName} className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 my-4"/>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >Get Prices</button>
            </form>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="line"
                    height={350}
                />
            )}
        </div>
    );
};

export default CropPriceChart;