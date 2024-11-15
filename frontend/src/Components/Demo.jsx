import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Demo = ({crops}) => {
    console.log(crops,'crops');
   const prices = crops.map((item) => item.price); 
   const years = crops.map((item) => item.month); 

//   const seriesData = [10, 41, 35, 51, 49, 62, 69, 91, 148];
  const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

  // Validate the data
  const isValidData = prices.every(value => typeof value === 'number' && !isNaN(value));
  const isValidCategories = years.length === prices.length;
  

  if (!isValidData) {
    console.error('Invalid data in series:', prices);
  }

  if (!isValidCategories) {
    console.error('Mismatch between categories and data length');
  }

  const [series] = useState([{
    name: "Wheat",
    data: isValidData ? prices : [] // Use valid data or an empty array
  }]);

  const [options] = useState({
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Product Trends by Month',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: isValidCategories ? years : [], // Use valid categories or an empty array
    }
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="line" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default Demo; 
