import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const TopCropsChart = () => {
    const [topCrops, setTopCrops] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopCrops = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/top-crops?state=Punjab');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTopCrops(data);
            } catch (error) {
                console.error('Error fetching top crops:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopCrops();
    }, []);

    const chartData = {
        series: topCrops.map(crop => crop.estimated_revenue ?? 0),
        options: {
            chart: {
                type: 'pie',
                height: 350,
            },
            title: {
                text: 'Top 5 Crops by Estimated Revenue',
            },
            labels: topCrops.map(crop => crop.crop_name ?? 'Unknown Crop'),
            legend: {
                position: 'bottom',
            },
        },
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="pie"
                    height={350}
                />
            )}
        </div>
    );
};

export default TopCropsChart;
