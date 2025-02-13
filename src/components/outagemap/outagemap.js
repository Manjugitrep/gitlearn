// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import L from "leaflet";
// import "./outagemap.css";
// import NavigationComponent from "../NavigationComponent";

// // Custom marker icon
// const redMarkerIcon = new L.Icon({
//   iconUrl: process.env.PUBLIC_URL + "/images/danger.png",
//   shadowUrl: process.env.PUBLIC_URL + "/images/marker-shadow.png",
//   iconSize: [30, 45],
//   iconAnchor: [15, 45],
//   popupAnchor: [0, -40],
//   shadowSize: [41, 41],
// });

// const OutageMap = () => {
//   const [markers, setMarkers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedMap, setSelectedMap] = useState("street");

//   useEffect(() => {
//     const fetchOutages = async () => {
//       try {
//         const response = await axios.get("http://localhost:9829/outage/outageLocations");
//         const parsedMarkers = response.data.map((outage, index) => ({
//           id: `marker-${index}`,
//           latitude: parseFloat(outage[2]),
//           longitude: parseFloat(outage[3]),
//           address: outage[1],
//           count: outage[4],
//         }));
//         setMarkers(parsedMarkers);
//         setLoading(false);
//       } catch (error) {
//         setError("Failed to fetch outage data.");
//         setLoading(false);
//       }
//     };

//     fetchOutages();
//   }, []);

//   const mapTypes = {
//     street: {
//       url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     },
//     satellite: {
//       url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
//       attribution: "&copy; Esri, Maxar, Earthstar Geographics",
//     },
//     terrain: {
//       url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
//       attribution:
//         "Map data: &copy; <a href='https://opentopomap.org'>OpenTopoMap</a> contributors",
//     },
//   };

//   const CustomMarker = ({ marker }) => {
//     const map = useMap();

//     const handleClick = () => {
//       map.flyTo([marker.latitude, marker.longitude], 18, {
//         animate: true,
//         duration: 1.5,
//       });
//     };

//     return (
//       <Marker position={[marker.latitude, marker.longitude]} icon={redMarkerIcon} eventHandlers={{ click: handleClick }}>
//         <Popup>
//           <div className="popup-content">
//             <h3 style={{ color: "red" }}>⚠️ Outage Report</h3>
//             <p><strong>Address:</strong> {marker.address}</p>
//             <p><strong>Issue Count:</strong> {marker.count}</p>
//             <p><strong>Latitude:</strong> {marker.latitude}</p>
//             <p><strong>Longitude:</strong> {marker.longitude}</p>
//           </div>
//         </Popup>
//       </Marker>
//     );
//   };

//   return (
//     <div className="outage-map-container">
//       <h1 className="map-title">🚨 Outage Map</h1>

//       <div className="map-controls">
//         <label htmlFor="mapTypeSelect">Select Map Type: </label>
//         <select
//           id="mapTypeSelect"
//           value={selectedMap}
//           onChange={(e) => setSelectedMap(e.target.value)}
//         >
//           <option value="street">Street Map</option>
//           <option value="satellite">Satellite Map</option>
//           <option value="terrain">Terrain Map</option>
//         </select>
//       </div>

//       {loading && <p className="map-message">Loading outages...</p>}
//       {error && <p className="map-message error">{error}</p>}

//       {!loading && !error && (
//         <div className="map-wrapper">
//           <MapContainer
//             center={[37.0902, -95.7129]}
//             zoom={5}
//             style={{ height: "500px", width: "100%" }}
//             whenCreated={(map) => {
//               L.control.fullscreen({
//                 position: "topleft",
//                 title: "Show Fullscreen",
//                 titleCancel: "Exit Fullscreen",
//                 forceSeparateButton: true,
//               }).addTo(map);
//             }}
//           >
//             <TileLayer
//               url={mapTypes[selectedMap].url}
//               attribution={mapTypes[selectedMap].attribution}
//             />
//             {markers.map((marker) => (
//               <CustomMarker key={marker.id} marker={marker} />
//             ))}
//           </MapContainer>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OutageMap;
