import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApexLineChart = ({ crops, cropName, selectedYear }) => {
  const prices = crops.map((item) => item.price);
  const months = crops.map((item) => item.month.slice(0, 3)); // Extract first 3 letters of each month

  console.log(">>>>", crops, cropName, selectedYear);

  const [series] = useState([{ name: "Price", data: prices }]);
  const [options] = useState({
    chart: {
      height: 350,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 10,
        left: 0,
        blur: 6,
        opacity: 0.4,
      },
      zoom: {
        enabled: true, // Enable zoom functionality
        type: "x", // Zoom only along the X-axis
        autoScaleYaxis: true, // Automatically scale the Y-axis when zooming
      },
      toolbar: {
        tools: {
          zoom: true, // Enable zoom tool
          zoomin: true, // Enable zoom-in tool
          zoomout: true, // Enable zoom-out tool
          pan: true, // Enable pan tool
          reset: true, // Enable reset zoom tool
        },
      },
    },
    xaxis: {
      categories: months, // Place categories here to show months
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      colors: ["#004d00"],
      width: 3,
    },
    title: {
      text: `${cropName || "Wheat"} Prices in ${selectedYear || "2023"}`,
      align: "center",
      style: {
        color: "#003300",
        fontWeight: "bold",
      },
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.9,
        gradientToColors: ["#003300", "#001a00"],
        inverseColors: false,
        opacityFrom: 0.9,
        opacityTo: 0.5,
        stops: [0, 100],
      },
    },
    tooltip: {
      theme: "dark",
      style: {
        fontSize: "13px",
      },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default ApexLineChart;
