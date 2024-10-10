import React from 'react'
import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const TemperatureAndDetails = ({ weather }) => {
    // Handle the case where weather is not passed or undefined
    if (!weather) {
        return <p className="text-center text-white">Temperature details not available</p>;
    }

    const { details, icon, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like } = weather;

    const verticalDetails = [
        {
            id: 1,
            Icon: FaThermometerEmpty,
            title: "Real Feel",
            value: feels_like ? `${feels_like.toFixed()}°` : 'N/A'
        },
        {
            id: 2,
            Icon: BiSolidDropletHalf,
            title: "Humidity",
            value: humidity ? `${humidity.toFixed()}%` : 'N/A'
        },
        {
            id: 3,
            Icon: FiWind,
            title: "Wind",
            value: speed ? `${speed.toFixed()} km/h` : 'N/A'
        },
    ];

    const horizontalDetails = [
        {
            id: 1,
            Icon: GiSunrise,
            title: "Sunrise",
            value: sunrise || 'N/A',
        },
        {
            id: 2,
            Icon: GiSunset,
            title: "Sunset",
            value: sunset || 'N/A',
        },
        {
            id: 3,
            Icon: MdKeyboardArrowUp,
            title: "High",
            value: temp_max ? `${temp_max.toFixed()}°` : 'N/A',
        },
        {
            id: 4,
            Icon: MdKeyboardArrowDown,
            title: "Low",
            value: temp_min ? `${temp_min.toFixed()}°` : 'N/A',
        },
    ];

    return (
        <div>
            <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
                <p>{details}</p>
            </div>
            <div className="flex flex-row items-center justify-between py-3">
                <img src={icon} alt="weather icon" className='w-20' />
                <p className="text-5x1">{`${temp.toFixed()}°`}</p>
                <div className="flex flex-col space-y-3 items-start">
                    {verticalDetails.map(({ id, Icon, title, value }) => (
                        <div key={id} className="flex font-light text-sm items-center justify-center">
                            <Icon size={18} className="mr-1" />
                            {title} <span className="font-medium ml-1">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-row items-center justify-center space-x-10 text-sm py-3">
                {horizontalDetails.map(({ id, Icon, title, value }) => (
                    <div key={id} className="flex flex-row items-center">
                        <Icon size={30} />
                        <p className="font-light ml-1">
                            {`${title}: `}
                            <span className="font-medium ml-1">{value}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TemperatureAndDetails;
