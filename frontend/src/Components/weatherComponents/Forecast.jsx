import React from 'react'

const Forecast = ({title,data}) => {
    if (!data || !Array.isArray(data)) {
        return <p className="text-center text-white">No forecast data available</p>;
      }
    return (
        <div>
            <div className="flex items-center justify-start mt-6">
                <p className="font-medium uppercase">{title}</p>
            </div>
            <hr className="my-1" />
            <div className="flex items-center justify-between">
                {data.map((d, index) => (
                <div key={index} className="flex flex-col items-center justify-center">
                    <p className="font-light text-sm">{d.title}</p>
                    <img
                    src="http://openweathermap.org/img/wn/01d@2x.png"
                    alt="weather icon"
                    className="w-12 my-1"/>
                    <p className="font-medium">{`${d.temp.toFixed()}°`}</p>
                </div>
                ))}
            </div>
    </div>
  )
}

export default Forecast