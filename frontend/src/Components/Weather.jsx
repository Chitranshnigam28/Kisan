import React from 'react'
import {useState,useEffect} from 'react';



const Weather = () => {

    const [location,setLocation]=useState(null);
    const [weather,setWeather]=useState(null);

    const fetchWeather=async ()=>{
        const res=await fetch('http://localhost:5005/weather',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(location)

        })
        const data=await res.json();
        // console.log(data);
        setWeather(data);
    }
    useEffect(()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (pos)=>{
                const lat=pos.coords.latitude;
                const lon=pos.coords.longitude;
                setLocation({lat,lon});
                // fetchWeather();
            },(err)=>{
                console.log('Error getting location'+err);
            });
        }

        // console.log(location);
    },[])
    useEffect(()=>{
        if(location){
           fetchWeather();
        //    console.log(weather);
        }
    })
  return (
    <div>Weather</div>
  )
}

export default Weather