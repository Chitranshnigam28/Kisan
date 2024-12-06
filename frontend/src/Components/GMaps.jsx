// /* global google */
// import "../css/maps.css";
// import {Footer} from "../Components/Dashboard/Footer";
// import { useRef, useState, useEffect } from "react";
// import {
//   useJsApiLoader,
//   GoogleMap,
//   MarkerF,
//   DirectionsRenderer,
//   OverlayView,
//   Autocomplete,
// } from "@react-google-maps/api";

// // Coordinates for the initial center point
// const center = { lat: 30.2458, lng: 75.8421 };

// // Sample data for marker locations
// const markerLocations = [
//   {
//     id: 1,
//     name: "Gurgaon Anaz Mandi",
//     position: { lat: 28.444514, lng: 77.016479 },
//     image: "https://via.placeholder.com/150",
//     description: "A popular market for wholesale grains in Gurgaon.",
//     vegetables: ["Wheat", "Tomato"],
//   },
//   {
//     id: 2,
//     name: "Kurukshetra Anaz Mandi",
//     position: { lat: 29.952667, lng: 76.841861 },
//     image: "https://via.placeholder.com/150",
//     description: "Well-known market for grains and vegetables in Kurukshetra.",
//     vegetables: ["Rice", "Corn"],
//   },
//   {
//     id: 3,
//     name: "Ludhiana Anaz Mandi",
//     position: { lat: 30.874118, lng: 75.856712 },
//     image: "https://via.placeholder.com/150",
//     description: "A major hub for agricultural produce in Ludhiana.",
//     vegetables: ["Wheat", "Rice"],
//   },
//   {
//     id: 4,
//     name: "Ahmedabad Anaz Mandi",
//     position: { lat: 22.867972, lng: 72.594026 },
//     image: "https://via.placeholder.com/150",
//     description: "A large wholesale market for grains in Ahmedabad.",
//     vegetables: ["Tomato", "Corn"],
//   },
// ];

// function GMaps() {
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//     libraries: ["places"],
//   });
//   console.log("process.env.REACT_APP_GOOGLE_MAPS_API_KEY "+process.env.REACT_APP_GOOGLE_MAPS_API_KEY)

//   const [map, setMap] = useState(null);
//   const [directionsResponse, setDirectionsResponse] = useState(null);
//   const [distance, setDistance] = useState("");
//   const [duration, setDuration] = useState("");
//   const [currentLocation, setCurrentLocation] = useState(center);
//   const [selectedVegetable, setSelectedVegetable] = useState(null);
//   const [filteredLocations, setFilteredLocations] = useState(markerLocations);
//   const originRef = useRef();
//   const destinationRef = useRef();

//   // Update filteredLocations based on the selected vegetable
//   useEffect(() => {
//     if (selectedVegetable === null) {
//       setFilteredLocations(markerLocations); // Show all markers if no vegetable is selected
//     } else {
//       const filtered = markerLocations.filter((location) =>
//         location.vegetables.includes(selectedVegetable)
//       );
//       setFilteredLocations(filtered);
//     }
//   }, [selectedVegetable]);

//   if (!isLoaded) {
//     return <p>Loading...</p>;
//   }

//   async function calculateRoute() {
//     if (originRef.current.value === "" || destinationRef.current.value === "") {
//       alert("Please enter both origin and destination.");
//       return;
//     }
//     const directionsService = new google.maps.DirectionsService();
//     const results = await directionsService.route({
//       origin: originRef.current.value,
//       destination: destinationRef.current.value,
//       travelMode: google.maps.TravelMode.DRIVING,
//     });
//     setDirectionsResponse(results);
//     setDistance(results.routes[0].legs[0].distance.text);
//     setDuration(results.routes[0].legs[0].duration.text);
//   }

//   function clearRoute() {
//     setDirectionsResponse(null);
//     setDistance("");
//     setDuration("");
//     originRef.current.value = "";
//     destinationRef.current.value = "";
//     setSelectedVegetable(null);
//   }

//   function panToCurrentLocation() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const userLocation = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };
//           setCurrentLocation(userLocation);
//           map.panTo(userLocation);
//           map.setZoom(15);
//         },
//         () => {
//           alert("Unable to retrieve your location");
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by your browser");
//     }
//   }

//   // Handle map click to clear the selected marker
//   function handleMapClick() {
//     setSelectedVegetable(null);
//   }

//   // Handle marker click to set the destination
//   function handleMarkerClick(location) {
//     destinationRef.current.value = location.name;
//   }

//   return (
//     <div className="app">
//       <div className="vegetable-buttons">
//         {/* Buttons for filtering by vegetable */}
//         {["Wheat", "Rice", "Corn", "Tomato"].map((vegetable) => (
//           <button
//             key={vegetable}
//             onClick={() => setSelectedVegetable(vegetable)}
//             className={selectedVegetable === vegetable ? "selected" : ""}
//           >
//             {vegetable}
//           </button>
//         ))}
//         <button onClick={() => setSelectedVegetable(null)}>Show All</button>
//       </div>

//       <div className="map-container">
//         <GoogleMap
//           center={currentLocation}
//           zoom={15}
//           mapContainerStyle={{ width: "100%", height: "100%" }}
//           options={{
//             zoomControl: false,
//             streetViewControl: false,
//             fullscreenControl: false,
//           }}
//           onLoad={(map) => setMap(map)}
//           onClick={handleMapClick}
//         >
//           {/* Display markers for filtered locations */}
//           {filteredLocations.map((location) => (
//             <OverlayView
//               key={location.id}
//               position={location.position}
//               mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
//             >
//               <div
//                 className="custom-card"
//                 onClick={() => handleMarkerClick(location)}
//               >
//                 <img
//                   src={location.image}
//                   alt={location.name}
//                   className="custom-card-image"
//                 />
//                 <h4 className="custom-card-title">{location.name}</h4>
//                 <p className="custom-card-description">{location.description}</p>
//               </div>
//             </OverlayView>
//           ))}

//           {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
//         </GoogleMap>
//       </div>

//       <div className="controls-container">
//         <div className="inputs">
//           <Autocomplete>
//             <input type="text" placeholder="Origin" ref={originRef} className="input" />
//           </Autocomplete>
//           <Autocomplete>
//             <input type="text" placeholder="Destination" ref={destinationRef} className="input" />
//           </Autocomplete>
//         </div>

//         <div className="button-group">
//           <button onClick={calculateRoute} className="button">
//             Calculate Route
//           </button>
//           <button onClick={clearRoute} className="button clear-button">
//             Clear
//           </button>
//           <button onClick={panToCurrentLocation} className="button location-button">
//             Current Location
//           </button>
//         </div>

//         <div className="info">
//           <p>Distance: {distance}</p>
//           <p>Duration: {duration}</p>
//         </div>
//       </div>
//       <Footer/>
//     </div>
//   );
// }

// export default GMaps;
/* global google */
// import "../css/maps.css";
// import { Footer } from "../Components/Dashboard/Footer";
// import { useRef, useState, useEffect } from "react";
// import {
//   useJsApiLoader,
//   GoogleMap,
//   OverlayView,
//   Autocomplete,
//   DirectionsRenderer,
// } from "@react-google-maps/api";

// import ahemdabad from "../Assets/mandis/ahemdabad.jpg";
// import bangloremandi from "../Assets/mandis/bangloremandi.jpg";
// import chennai from "../Assets/mandis/chennai.jpeg";
// import delhi from "../Assets/mandis/delhi.webp";
// import gurgaonAnazMandi  from "../Assets/mandis/gurgaonAnazMandi.jpg";
// import hyderabad from "../Assets/mandis/hyderabad.avif";
// import kurushetraAnazMandi from "../Assets/mandis/kurushetraAnazMandi.jpg";
// import ludhianaAnazMandi from "../Assets/mandis/ludhianaAnazMandi.jpeg";
// import pune from "../Assets/mandis/pune.webp";
// import Vashimumbai from "../Assets/mandis/Vashimumbai.webp";


// const center = { lat: 30.2458, lng: 75.8421 };

// const markerLocations = [
//   {
//     id: 1,
//     name: "Gurgaon Anaz Mandi",
//     position: { lat: 28.444514, lng: 77.016479 },
//     image: gurgaonAnazMandi,
//     description: "A popular market for wholesale grains in Gurgaon.",
//     vegetables: ["Wheat", "Tomato"],
//   },
//   {
//     id: 2,
//     name: "Kurukshetra Anaz Mandi",
//     position: { lat: 29.952667, lng: 76.841861 },
//     image: kurushetraAnazMandi,
//     description: "Well-known market for grains and vegetables in Kurukshetra.",
//     vegetables: ["Rice", "Corn"],
//   },
//   {
//     id: 3,
//     name: "Ludhiana Anaz Mandi",
//     position: { lat: 30.874118, lng: 75.856712 },
//     image:ludhianaAnazMandi,
//     description: "A major hub for agricultural produce in Ludhiana.",
//     vegetables: ["Wheat", "Rice"],
//   },
//   {
//     id: 4,
//     name: "Ahmedabad Anaz Mandi",
//     position: { lat: 22.867972, lng: 72.594026 },
//     image: ahemdabad,
//     description: "A large wholesale market for grains in Ahmedabad.",
//     vegetables: ["Tomato", "Corn"],
//   },
//   {
//     id: 5,
//     name: "Mumbai Vashi Mandi",
//     position: { lat: 19.065639, lng: 72.998993 },
//     image: Vashimumbai,
//     description: "The largest wholesale market for vegetables and fruits in Mumbai.",
//     vegetables: ["Onion", "Potato", "Tomato"],
//   },
//   {
//     id: 6,
//     name: "Delhi Azadpur Mandi",
//     position: { lat: 28.704060, lng: 77.199009 },
//     image: delhi,
//     description: "One of the largest fruit and vegetable wholesale markets in Asia.",
//     vegetables: ["Apple", "Banana", "Tomato"],
//   },
//   {
//     id: 7,
//     name: "Bangalore Yeshwanthpur Mandi",
//     position: { lat: 13.024809, lng: 77.560356 },
//     image: bangloremandi,
//     description: "A key wholesale market for vegetables and grains in Bangalore.",
//     vegetables: ["Carrot", "Capsicum", "Rice"],
//   },
//   {
//     id: 8,
//     name: "Hyderabad Bowenpally Mandi",
//     position: { lat: 17.470331, lng: 78.487487 },
//     image: hyderabad,
//     description: "A well-known wholesale market for vegetables in Hyderabad.",
//     vegetables: ["Brinjal", "Chili", "Cabbage"],
//   },
//   {
//     id: 9,
//     name: "Pune Market Yard",
//     position: { lat: 18.501760, lng: 73.857736 },
//     image: pune,
//     description: "A major hub for fresh produce and vegetables in Pune.",
//     vegetables: ["Cauliflower", "Spinach", "Onion"],
//   },
//   {
//     id: 10,
//     name: "Chennai Koyambedu Market",
//     position: { lat: 13.082680, lng: 80.270718 },
//     image: chennai,
//     description: "The largest wholesale market for fruits and vegetables in Chennai.",
//     vegetables: ["Tomato", "Pumpkin", "Beans"],
//   },
// ];



// function GMaps() {
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//     libraries: ["places"],
//   });

//   const [map, setMap] = useState(null);
//   const [filteredLocations, setFilteredLocations] = useState(markerLocations);
//   const [selectedVegetable, setSelectedVegetable] = useState(null);
//   const [showCards, setShowCards] = useState(false);
//   const [directionsResponse, setDirectionsResponse] = useState(null);
//   const [distance, setDistance] = useState("");
//   const [duration, setDuration] = useState("");
//   const originRef = useRef();
//   const destinationRef = useRef();

//   const allCrops = [
//     ...new Set(markerLocations.flatMap((location) => location.vegetables)),
//   ];

//   useEffect(() => {
//     if (selectedVegetable === null) {
//       setFilteredLocations(markerLocations);
//     } else {
//       const filtered = markerLocations.filter((location) =>
//         location.vegetables.includes(selectedVegetable)
//       );
//       setFilteredLocations(filtered);
//     }
//   }, [selectedVegetable]);

//   if (!isLoaded) {
//     return <p>Loading...</p>;
//   }

//   async function calculateRoute() {
//     if (!originRef.current.value || !destinationRef.current.value) {
//       alert("Please enter both origin and destination.");
//       return;
//     }
//     const directionsService = new google.maps.DirectionsService();
//     const results = await directionsService.route({
//       origin: originRef.current.value,
//       destination: destinationRef.current.value,
//       travelMode: google.maps.TravelMode.DRIVING,
//     });
//     setDirectionsResponse(results);
//     setDistance(results.routes[0].legs[0].distance.text);
//     setDuration(results.routes[0].legs[0].duration.text);
//   }

//   function clearRoute() {
//     setDirectionsResponse(null);
//     setDistance("");
//     setDuration("");
//     originRef.current.value = "";
//     destinationRef.current.value = "";
//     setSelectedVegetable(null);
//     setShowCards(false);
//   }

//   function handleCardClick(location) {
//     destinationRef.current.value = location.name;
//   }

//   return (
//     <div className="app">
//       <div className="vegetable-buttons">
//         {allCrops.map((crop) => (
//           <button
//             key={crop}
//             onClick={() => {
//               setSelectedVegetable(crop);
//               setShowCards(true);
//             }}
//             className={selectedVegetable === crop ? "selected" : ""}
//           >
//             {crop}
//           </button>
//         ))}
//         <button
//           onClick={() => {
//             setSelectedVegetable(null);
//             setFilteredLocations(markerLocations);
//             setShowCards(true);
//           }}
//         >
//           Show All
//         </button>
//       </div>

//       <div className="map-container">
//         <GoogleMap
//           center={center}
//           zoom={12}
//           mapContainerStyle={{ width: "100%", height: "100%" }}
//           options={{
//             zoomControl: false,
//             streetViewControl: false,
//             fullscreenControl: false,
//           }}
//           onLoad={(map) => setMap(map)}
//         >
//           {filteredLocations.map((location) => (
//             <OverlayView
//               key={location.id}
//               position={location.position}
//               mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
//             >
//               <div className="custom-card" onClick={() => handleCardClick(location)}>
//                 <img src={location.image} alt={location.name} className="custom-card-image" />
//                 <h4>{location.name}</h4>
//                 <p>{location.description}</p>
//               </div>
//             </OverlayView>
//           ))}

//           {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
//         </GoogleMap>
//       </div>

//       {showCards && filteredLocations.length > 0 && (
//         <div className="scrollable-markers">
//           {filteredLocations.map((location) => (
//             <div key={location.id} className="marker-card" onClick={() => handleCardClick(location)}>
//               <img src={location.image} alt={location.name} />
//               <div className="markerNameDescription">
//                 <h4>{location.name}</h4>
//                 <p>{location.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="controls-container">
//         <div className="inputs">
//           <Autocomplete>
//             <input type="text" placeholder="Origin" ref={originRef} className="inputsource" />
//           </Autocomplete>
//           <Autocomplete>
//             <input type="text" placeholder="Destination" ref={destinationRef} className="inputdestination" />
//           </Autocomplete>
//         </div>

//         <div className="button-group">
//           <button onClick={calculateRoute} className="button">Calculate Route</button>
//           <button onClick={clearRoute} className="button clear-button">Clear</button>
//         </div>

//         <div className="info">
//           <p>Distance: {distance}</p>
//           <p>Duration: {duration}</p>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default GMaps;
/* global google */

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
import Modal from './Modal';
import tomatoImg from "../Assets/Vegetables/tomato.png";
import wheatImg from "../Assets/Vegetables/wheat.png";
import potatoImg from "../Assets/Vegetables/Potato.svg";
import cornImg from "../Assets/Vegetables/Corn.png";
import riceImg from "../Assets/Vegetables/rice.png";
import onionImg from "../Assets/Vegetables/onion.png";

const center = { lat: 30.2458, lng: 75.8421 };

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

const vegetableIcons = {
  Tomato: tomatoImg,
  Wheat: wheatImg,
  Potato: potatoImg,
  Corn: cornImg,
  Rice: riceImg,
  Onion: onionImg,
};

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
  const originRef = useRef();
  const destinationRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const allCrops = [
    ...new Set(markerLocations.flatMap((location) => location.vegetables)),
  ];

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
      setModalMessage("Please enter both origin and destination.");
      setShowModal(true);
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
      <div className="vegetable-buttons">
        {showModal && (
          <Modal
            title="Information"
            message={modalMessage}
            onClose={() => setShowModal(false)}
          />
        )}

        {allCrops.map((crop) => (
          <button
            key={crop}
            onClick={() => {
              setSelectedVegetable(crop);
              setShowCards(true);
            }}
            className={selectedVegetable === crop ? "selected" : ""}
          >
            <img src={vegetableIcons[crop]} alt={crop} className="crop-icon-map" />
            {crop}
          </button>
        ))}
      </div>

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