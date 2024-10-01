import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const CropPriceChart = ({ crop }) => {
    const [cropPrices, setCropPrices] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch crop prices from the backend
    const fetchCropPrices = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/crops/price?crop=Wheat`);
            console.log(response.data());
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // Extract historical prices
            const historicalPrices = data.market_price.historical_prices;
            console.log(historicalPrices);
            setCropPrices(historicalPrices);
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

    return (
        <div>
            <h1> Enter The Crop </h1>
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