import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApexLineChart = ({ crops, cropName, selectedYear }) => {
  const prices = crops.map((item) => item.price);
  const months = crops.map((item) => item.month);

  // Month names mapping
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Parse month numbers and map to names
  const monthLabels = months.map((month) => {
    const monthIndex = parseInt(month, 10) - 1; // Convert to 0-based index
    return monthIndex >= 0 && monthIndex < 12 ? monthNames[monthIndex] : month;
  });

  const [series] = useState([{ name: "Price", data: prices }]);
  const [options] = useState({
    chart: {
      height: 500,
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
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      colors: ["#96C73D"],
      width: 2,
    },
    title: {
      text: `${cropName || "Wheat"} Prices in ${selectedYear || "2023"}`,
      align: "center",
      style: {
        color: "#96C73D",
        fontWeight: "bold",
        fontSize: "16px",
      },
    },
    grid: {
      show: true,
      borderColor: "#96C73D",
      strokeDashArray: 4,
      row: {
        colors: ["transparent", "transparent"], // No row colors
      },
    },
    xaxis: {
      categories: monthLabels,
      title: {
        text: "Months",
        style: {
          fontSize: "14px",
          color: "#003300",
        },
      },
      labels: {
        style: {
          colors: "#96C73D", // Dark color for month labels
          fontSize: "12px",
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 1,
        gradientToColors: ["#96C73D", "#ffffff"],
        inverseColors: false,
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
  });

  return (
    <div className="chart-container">
      <ReactApexChart options={options} series={series} type="area" height={400} />
    </div>
  );
};

export default ApexLineChart;


// import React, { useState } from "react";
// import ReactApexChart from "react-apexcharts";

// const ApexLineChart = ({ crops, cropName, selectedYear }) => {
//   const prices = crops.map((item) => item.price);
//   const months = crops.map((item) => item.month.slice(0, 3));

//   console.log(">>>>", crops, cropName, selectedYear)
//   const [series] = useState([{ name: "Price", data: prices }]);
//   const [options] = useState({
//     chart: {
//       height: 350,
//       type: 'line',
//       dropShadow: {
//         enabled: true,
//         color: "#000",
//         top: 10,
//         left: 0,
//         blur: 6,
//         opacity: 0.4,
//       },
//       xaxis: { categories: months },
//       zoom: {
//         enabled: false
//       }
//     },
//     dataLabels: {
//       enabled: false
//     },
//     stroke: {
//       curve: 'straight'
//     },
//     title: {
//       text: `${cropName || "Wheat"} Prices in ${selectedYear || "2023"}`,
//       align: "center",
//       style: {
//         color: "#003300",
//         fontWeight: "bold",
//       },
//     },
//     grid: {
//       row: {
//         colors: ['#f3f3f3', 'transparent'],
//         opacity: 0.5
//       },
//     },
//     fill: {
//       type: "gradient",
//       gradient: {
//         shade: "dark",
//         type: "vertical",
//         shadeIntensity: 0.9,
//         gradientToColors: ["#003300", "#001a00"],
//         inverseColors: false,
//         opacityFrom: 0.9,
//         opacityTo: 0.5,
//         stops: [0, 100],
//       },
//     },
//     stroke: {
//       curve: "smooth",
//       colors: ["#004d00"],
//       width: 3,
//     },
//     tooltip: {
//       theme: "dark",
//       style: {
//         fontSize: "13px",
//       },
//     },
//   });

//   return (
//     <div id="chart">
//       <ReactApexChart options={options} series={series} type="line" height={350} />
//     </div>
//   );
// };

// export default ApexLineChart;