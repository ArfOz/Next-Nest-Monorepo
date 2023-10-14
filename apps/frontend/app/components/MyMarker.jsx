// "use client"
// import React,{useState} from "react";
// import {
//   GoogleMap,
//   InfoWindow,
//   Marker,
//   useLoadScript,
// } from "@react-google-maps/api";
// import { FaMapMarkerAlt } from 'react-icons/fa';

// const MyMarker = ({  key, lng, lat, tooltip, $hover  }) => {

//     const [mapRef, setMapRef] = useState();
//     const [isOpen, setIsOpen] = useState(false);
//     const [infoWindowData, setInfoWindowData] = useState();

//   const handleMarkerClick = (lng, lat, tooltip, id) => {
//     console.log(`You clicked on ${tooltip}`);
//       mapRef?.panTo({ lat, lng });
//     setInfoWindowData({ id, tooltip });
//     setIsOpen(true);
//   };

//   return (
//     <Marker className={$hover ? "circle hover" : "circle"} onClick={()=> {handleMarkerClick(lng, lat, tooltip)}}>
//       <FaMapMarkerAlt color="red" size="25"/>
//       {isOpen && infoWindowData?.id === key && (
//                 <InfoWindow
//                   onCloseClick={() => {
//                     setIsOpen(false);
//                   }}
//                 >
//                   <h3>{infoWindowData.address}</h3>
//                 </InfoWindow>
//               )}
//     </Marker>
//   )
// }

// export default MyMarker;
