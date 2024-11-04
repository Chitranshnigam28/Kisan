import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const TopCropsChart = ({ onLocationChange }) => {
  const [location, setLocation] = useState("Delhi");
  const [topCrops, setTopCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const fetchTopCrops = async () => {
    //   setLoading(true);
    //   try {
    //     const response = await axios.get(`http://localhost:5001/api/recommend-crop/`, {
    //         params: { location },
    //     });
    //     if (Array.isArray(response.data.crops)) {
    //       setTopCrops(response.data.crops);
    //     } else {
    //       console.error('Unexpected response format:', response.data);
    //       setTopCrops([]);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching top crops:', error);
    //     setTopCrops([]); // Set to empty on error
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    const fetchTopCrops = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5001/api/recommend-crop/`, {
          params: { location },
        });
        console.log("API response:", response.data);
        if (Array.isArray(response.data.crops)) {
          setTopCrops(response.data.crops);
        } else {
          console.error('Unexpected response format:', response.data);
          setTopCrops([]);
        }
      } catch (error) {
        console.error('Error fetching top crops:', error.response ? error.response.data : error.message);
        setTopCrops([]); // Set to empty on error
      } finally {
        setLoading(false);
      }
    };
  
    fetchTopCrops();
  }, [location]);
  

  // Handle location change
  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    setLocation(newLocation);
    if (onLocationChange) {
      onLocationChange(newLocation);
    }
  };

  // Default crops data for "Delhi" if no data is available
  const defaultCrops = [
    { crop_name: "Wheat", percentage: 40 },
    { crop_name: "Rice", percentage: 30 },
    { crop_name: "Pulses", percentage: 20 },
    { crop_name: "Sugarcane", percentage: 5 },
    { crop_name: "Cotton", percentage: 5 }
  ];
  
  const chartData = topCrops.length > 0
  ? {
      series: topCrops.map((crop) => crop?.percentage ?? 0),
      options: {
        chart: {
          type: 'donut',
          height: 350,
        },
        title: {
          text: `Top 5 Crops in ${location}`,
          align: 'center',
        },
        labels: topCrops.map((crop) => crop?.crop_name ?? "Unknown"),
        legend: { position: 'bottom' },
        plotOptions: {
          pie: {
            expandOnClick: true,
            customScale: 1,
            donut: {
              size: '70%',
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: '22px',
                  color: undefined,
                  offsetY: 5,
                },
                value: {
                  show: true,
                  fontSize: '16px',
                  color: 'black',
                  offsetY: -5,
                },
              },
            },
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: 'vertical',
            shadeIntensity: 0.5,
            gradientToColors: ['#B2EBF2', '#81C784', '#4CAF50', '#388E3C', '#1B5E20'],
            stops: [0, 100, 100, 100, 100],
          },
        },
        colors: ['#B2EBF2', '#81C784', '#4CAF50', '#388E3C', '#1B5E20'],
      },
    }
  : {
      series: defaultCrops.map((crop) => crop.percentage),
      options: {
        labels: defaultCrops.map((crop) => crop.crop_name),
        chart: {
          type: 'donut',
          height: 350,
        },
        title: {
          text: `Top 5 Crops in Delhi`,
          align: 'center',
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: 'vertical',
            shadeIntensity: 0.5,
            gradientToColors: ['#B2EBF2', '#81C784', '#4CAF50', '#388E3C', '#1B5E20'],
            stops: [0, 100, 100, 100, 100],
          },
        },
        colors: ['#B2EBF2', '#81C784', '#4CAF50', '#388E3C', '#1B5E20'],
      },
    };

  

  return (
    <div>
      <label htmlFor="state-dropdown">Select Location: </label>
      <select
        id="state-dropdown"
        value={location}
        onChange={handleLocationChange}
      >
        <option value="">Select Location</option>
        {[
          "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
          "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
          "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
          "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
          "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
          "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli",
          "Daman and Diu", "Lakshadweep", "Delhi", "Puducherry", "Jammu and Kashmir", "Ladakh"
        ].map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      {loading ? (
      <p>Loading top crops...</p>
    ) : (
      topCrops.length > 0 ? (
        <>
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="donut"
            height={350}
          />
          {console.log("Chart data series:", chartData.series)}
          {console.log("Chart data labels:", chartData.options.labels)}
        </>
      ) : (
        <p>No data available for the selected location.</p>
      )
    )}
    </div>
  );
};

export default TopCropsChart;
