import "../css/maps.css";
import { Footer } from "../Components/Dashboard/Footer";
import { useRef, useState, useEffect } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  OverlayView,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

import ahemdabad from "../Assets/mandis/ahemdabad.jpg";
import bangloremandi from "../Assets/mandis/bangloremandi.jpg";
import chennai from "../Assets/mandis/chennai.jpeg";
import delhi from "../Assets/mandis/delhi.webp";
import gurgaonAnazMandi from "../Assets/mandis/gurgaonAnazMandi.jpg";
import hyderabad from "../Assets/mandis/hyderabad.avif";
import kurushetraAnazMandi from "../Assets/mandis/kurushetraAnazMandi.jpg";
import ludhianaAnazMandi from "../Assets/mandis/ludhianaAnazMandi.jpeg";
import pune from "../Assets/mandis/pune.webp";
import Vashimumbai from "../Assets/mandis/Vashimumbai.webp";
import wheat from  "../Assets/Vegetables/wheat.png";
import Rice from "../Assets/Vegetables/rice.png";
import Corn from "../Assets/Vegetables/Corn.png";
import Tomato from "../Assets/Vegetables/tomato.png";
import Onion from "../Assets/Vegetables/onion.png";
import Potato from "../Assets/Vegetables/potatobg.png";

const center = { lat: 30.2458, lng: 75.8421 };

const cropIcons = {
  Wheat: wheat,
  Rice: Rice,
  Corn: Corn,
  Tomato: Tomato,
  Onion:Onion,
  Potato:Potato,
  ShowAll: "/path/to/show-all-icon.png", // Optional
};
const markerLocations = [
  {
    id: 1,
    name: "Gurgaon Anaz Mandi",
    position: { lat: 28.444514, lng: 77.016479 },
    image: gurgaonAnazMandi,
    description: "A popular market for wholesale grains in Gurgaon.",
    vegetables: ["Wheat", "Tomato"],
  },
  {
    id: 2,
    name: "Kurukshetra Anaz Mandi",
    position: { lat: 29.952667, lng: 76.841861 },
    image: kurushetraAnazMandi,
    description: "Well-known market for grains and vegetables in Kurukshetra.",
    vegetables: ["Rice", "Corn"],
  },
  {
    id: 3,
    name: "Ludhiana Anaz Mandi",
    position: { lat: 30.874118, lng: 75.856712 },
    image: ludhianaAnazMandi,
    description: "A major hub for agricultural produce in Ludhiana.",
    vegetables: ["Wheat", "Rice"],
  },
  {
    id: 4,
    name: "Ahmedabad Anaz Mandi",
    position: { lat: 22.867972, lng: 72.594026 },
    image: ahemdabad,
    description: "A large wholesale market for grains in Ahmedabad.",
    vegetables: ["Tomato", "Corn"],
  },
  {
    id: 5,
    name: "Mumbai Vashi Mandi",
    position: { lat: 19.065639, lng: 72.998993 },
    image: Vashimumbai,
    description: "The largest wholesale market for vegetables and fruits in Mumbai.",
    vegetables: ["Onion", "Potato", "Tomato"],
  },
];

function GMaps() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [filteredLocations, setFilteredLocations] = useState(markerLocations);
  const [selectedVegetable, setSelectedVegetable] = useState(null);
  const [showCards, setShowCards] = useState(false);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  const originRef = useRef();
  const destinationRef = useRef();


  const allCrops = [
    ...new Set(markerLocations.flatMap((location) => location.vegetables)),
  ];

  // Handle screen resizing
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 500);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (selectedVegetable === null) {
      setFilteredLocations(markerLocations);
    } else {
      const filtered = markerLocations.filter((location) =>
        location.vegetables.includes(selectedVegetable)
      );
      setFilteredLocations(filtered);
    }
  }, [selectedVegetable]);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  async function calculateRoute() {
    if (!originRef.current.value || !destinationRef.current.value) {
      alert("Please enter both origin and destination.");
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

    // Clear the markers in the scrollable section
    setFilteredLocations([]);
    setShowCards(false);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
    setSelectedVegetable(null);
    setShowCards(false);
    setFilteredLocations(markerLocations); // Reset markers to the initial state
  }

  function handleCardClick(location) {
    destinationRef.current.value = location.name;
  }

  return (
    <div className="app">
      {/* <div className="vegetable-buttons">
        {allCrops.map((crop) => (
          <button
            key={crop}
            onClick={() => {
              setSelectedVegetable(crop);
              setShowCards(true);
            }}
            className={selectedVegetable === crop ? "selected" : ""}
          >
            <img src={cropIcons[crop]} className="cropBtnImage"/>
            {crop}
          </button>
        ))}
        <button
          onClick={() => {
            setSelectedVegetable(null);
            setFilteredLocations(markerLocations);
            setShowCards(true);
          }}
        >
          Show All
        </button>
      </div> */}

      {/* Dropdown for Mobile */}
      {isMobile ? (
        <div className="dropdown-container">
          <select
            className="dropdown-select"
            onChange={(e) => {
              const crop = e.target.value;
              setSelectedVegetable(crop === "Show All" ? null : crop);
              setShowCards(true);
            }}
          >
            <option value="Show All">Show All</option>
            {allCrops.map((crop) => (
              <option key={crop} value={crop}>
                {crop}
              </option>
            ))}
          </select>
        </div>
      ) : (
        // Buttons for Desktop
        <div className="vegetable-buttons">
          {allCrops.map((crop) => (
            <button
              key={crop}
              onClick={() => {
                setSelectedVegetable(crop);
                setShowCards(true);
              }}
              className={selectedVegetable === crop ? "selected" : ""}
            >
              <img src={cropIcons[crop]} className="cropBtnImage" alt={crop} />
              {crop}
            </button>
          ))}
          <button
            onClick={() => {
              setSelectedVegetable(null);
              setFilteredLocations(markerLocations);
              setShowCards(true);
            }}
          >
            Show All
          </button>
        </div>
      )}

      <div className="map-container">
        <GoogleMap
          center={center}
          zoom={12}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          {filteredLocations.map((location) => (
            <OverlayView
              key={location.id}
              position={location.position}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className="custom-card" onClick={() => handleCardClick(location)}>
                <img src={location.image} alt={location.name} className="custom-card-image" />
                <h4>{location.name}</h4>
                <p>{location.description}</p>
              </div>
            </OverlayView>
          ))}

          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </div>

      {showCards && filteredLocations.length > 0 && (
        <div className="scrollable-markers">
          {filteredLocations.map((location) => (
            <div key={location.id} className="marker-card" onClick={() => handleCardClick(location)}>
              <img src={location.image} alt={location.name} />
              <div className="markerNameDescription">
                <h4>{location.name}</h4>
                <p>{location.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="controls-container">
        <div className="inputs">
          <Autocomplete>
            <input type="text" placeholder="Origin" ref={originRef} className="inputsource" />
          </Autocomplete>
          <Autocomplete>
            <input type="text" placeholder="Destination" ref={destinationRef} className="inputdestination" />
          </Autocomplete>
        </div>

        <div className="button-group">
          <button onClick={calculateRoute} className="button">Calculate Route</button>
          <button onClick={clearRoute} className="button clear-button">Clear</button>
        </div>

        <div className="info">
          <p>Distance: {distance}</p>
          <p>Duration: {duration}</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default GMaps;