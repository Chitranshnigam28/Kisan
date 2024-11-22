import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApexLineChart = ({ crops, cropName, selectedYear }) => {
  const prices = crops.map((item) => item.price);
  const months = crops.map((item) => item.month);

  const monthAbbreviations = {
    January: "Jan",
    February: "Feb",
    March: "Mar",
    April: "Apr",
    May: "May",
    June: "Jun",
    July: "Jul",
    August: "Aug",
    September: "Sep",
    October: "Oct",
    November: "Nov",
    December: "Dec",
  };

  const monthLabels = months.map((month) => monthAbbreviations[month] || "N/A");

  const [series] = useState([{ name: "Price", data: prices }]);
  const [options] = useState({
    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["#3CB371"],
    },
    title: {
      text: `${cropName || "Wheat"} Prices in ${selectedYear || "2023"}`,
      align: "center",
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#333",
      },
    },
    grid: {
      show: false, 
    },
    xaxis: {
      categories: monthLabels, 
      title: {
        style: {
          color: "#666",
          fontSize: "14px",
        },
      },
      labels: {
        style: {
          fontSize: "12px",
          colors: "#333",
        },
      },
    },
    yaxis: {
      title: {
        text: "Price (in INR)",
        style: {
          color: "#666",
          fontSize: "14px",
        },
      },
      labels: {
        style: {
          fontSize: "12px",
          colors: "#333",
        },
      },
      min: Math.min(...prices) * 0.9, 
      max: Math.max(...prices) * 1.1,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#96C73D"],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.1,
        stops: [10, 100],
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        formatter: function (value) {
          const index = parseInt(value, 10) - 1; 
          return monthLabels[index] || "N/A"; 
        },
      },
    },    
  });

  return (
    <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
      <ReactApexChart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default ApexLineChart;
