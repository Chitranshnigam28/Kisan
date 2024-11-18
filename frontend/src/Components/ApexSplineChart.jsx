import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import SimpleLoader  from './SimpleLoader';
const ApexSplineChart = ({ priceData, loading }) => {

    const placeholderData = [
        {
            crop_name: "Loading...",
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Sept", "Oct"],
            prices: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
    ];

    const chartOptions = useMemo(() => ({
        series: priceData && priceData.length >= 2
            ? [
                { name: priceData[0].crop_name, data: priceData[0].prices },
                { name: priceData[1].crop_name, data: priceData[1].prices }
              ]
            : [
                { name: placeholderData[0].crop_name, data: placeholderData[0].prices },
                { name: placeholderData[0].crop_name, data: placeholderData[0].prices }
              ],
        options: {
            chart: { type: "line", height: 350 },
            xaxis: { categories: priceData?.[0]?.months || placeholderData[0].months },
            stroke: { curve: "smooth" },
            tooltip: { x: { format: "MMM YYYY" } },
            fill: { opacity: 0.5 },
            colors: ["#28a745", "#8B4513"],
        },
    }), [priceData]);

    if (loading) return <SimpleLoader />;

    return (
        <div>
            {priceData && priceData.length >= 2 ? (
                <ReactApexChart
                    options={chartOptions.options}
                    series={chartOptions.series}
                    type="line"
                    height={350}
                />
            ) : (
                // <p>Loading chart data...</p>
                <SimpleLoader />
            )}
        </div>
    );
};

export default ApexSplineChart;