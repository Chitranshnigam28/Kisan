/* global google */
import "../css/maps.css";
import { useRef, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

// Coordinates for the initial center point
const center = { lat: 30.2458, lng: 75.8421 };

function GMaps() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"], // libraries to be used
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [currentLocation, setCurrentLocation] = useState(center);

  const originRef = useRef();
  const destinationRef = useRef();

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  }

  function panToCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(userLocation);
          map.panTo(userLocation);
          map.setZoom(15);
        },
        () => {
          alert("Unable to retrieve your location");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  }

  return (
      <div className="app">
        <div className="map-container">
          {/* Google Map Box */}
          <GoogleMap
            center={currentLocation} // Use currentLocation to dynamically center the map
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              fullscreenControl: false,
            }}
            onLoad={(map) => setMap(map)}
          >
            <MarkerF position={currentLocation} />{" "}
            {/* Show marker at current location */}
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </div>

        <div className="controls-container">
          <div className="inputs">
            <Autocomplete>
              <input
                type="text"
                placeholder="Origin"
                ref={originRef}
                className="input"
              />
            </Autocomplete>
            <Autocomplete>
              <input
                type="text"
                placeholder="Destination"
                ref={destinationRef}
                className="input"
              />
            </Autocomplete>
          </div>

          <div className="button-group">
            <button onClick={calculateRoute} className="button">
              Calculate Route
            </button>
            <button onClick={clearRoute} className="button clear-button">
              Clear
            </button>
            <button
              onClick={panToCurrentLocation}
              className="button location-button"
            >
              Current Location
            </button>
          </div>

          <div className="info">
            <p>Distance: {distance}</p>
            <p>Duration: {duration}</p>
            <button
              className="location-button"
              onClick={() => {
                map.panTo(center);
                map.setZoom(15);
              }}
            >
              Center Map
            </button>
          </div>
        </div>
      </div>
  );
}

export default GMaps;
