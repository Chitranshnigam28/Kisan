// import React, { useState } from "react";
// import ReactApexChart from "react-apexcharts";

// const ApexLineChart = ({ crops, cropName, selectedYear }) => {
//   const prices = crops.map((item) => item.price);
//   const months = crops.map((item) => item.month);

//   // Month names mapping
//   const monthNames = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December",
//   ];

//   // Parse month numbers and map to names
//   const monthLabels = months.map((month) => {
//     const monthIndex = parseInt(month, 10) - 1; // Convert to 0-based index
//     return monthIndex >= 0 && monthIndex < 12 ? monthNames[monthIndex] : month;
//   });

//   const [series] = useState([{ name: "Price", data: prices }]);
//   const [options] = useState({
//     chart: {
//       height: 500,
//       type: "area",
//       toolbar: {
//         show: false,
//       },
//       dropShadow: {
//         enabled: true,
//         color: "#000",
//         top: 10,
//         left: 0,
//         blur: 6,
//         opacity: 0.3,
//       },
//       zoom: {
//         enabled: true,
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     stroke: {
//       curve: "smooth",
//       colors: ["#96C73D"],
//       width: 3,
//     },
//     title: {
//       text: `${cropName || "Wheat"} Prices in ${selectedYear || "2023"}`,
//       align: "center",
//       style: {
//         color: "#333",
//         fontWeight: "bold",
//         fontSize: "18px",
//       },
//     },
//     // grid: {
//     //   show: true,
//     //   borderColor: "#e7e7e7",
//     //   strokeDashArray: 4,
//     // },
//     xaxis: {
//       categories: monthLabels,
//       title: {
//         text: "Months",
//         style: {
//           fontSize: "14px",
//           color: "#666",
//         },
//       },
//       labels: {
//         style: {
//           colors: "#333",
//           fontSize: "12px",
//         },
//       },
//     },
//     yaxis: {
//       title: {
//         text: "Price (in INR)",
//         style: {
//           fontSize: "14px",
//           color: "#666",
//         },
//       },
//       labels: {
//         style: {
//           colors: "#333",
//           fontSize: "12px",
//         },
//       },
//     },
//     fill: {
//       type: "gradient",
//       gradient: {
//         shade: "light",
//         gradientToColors: ["#A8D164"],
//         inverseColors: false,
//         opacityFrom: 0.7,
//         opacityTo: 0.2,
//         stops: [0, 90, 100],
//       },
//     },
//     tooltip: {
//       enabled: true,
//       theme: "dark",
//       x: {
//         format: "MMM",
//       },
//     },
//   });

//   return (
//     <div className="chart-container" style={{ padding: "20px", background: "#f8f8f8", borderRadius: "10px" }}>
//       <ReactApexChart options={options} series={series} type="area" height={400} />
//     </div>
//   );
// };

// export default ApexLineChart;

import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApexLineChart = ({ crops, cropName, selectedYear }) => {
  const prices = crops.map((item) => item.price);
  const months = crops.map((item) => item.month);

  // Month names mapping (shortened to 3 letters)
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  // Parse month numbers and map to short names
  const monthLabels = months.map((month) => {
    const monthIndex = parseInt(month, 10) - 1; // Convert to 0-based index
    return monthIndex >= 0 && monthIndex < 12 ? monthNames[monthIndex] : month;
  });

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
      borderColor: "#96C73D",
      strokeDashArray: 4,
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
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#96C73D"], 
        inverseColors: false,
        opacityFrom: 0.6,
        opacityTo: 0.1,
        stops: [10, 100], 
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        format: "MMM",
      },
    },
  });

  return (
    <div>
      <ReactApexChart options={options} series={series} type="area" height={400} />
    </div>
  );
};

export default ApexLineChart;
