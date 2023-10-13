'use client';
/* global google */
import {
    GoogleMap,
    InfoWindow,
    Marker,
    useLoadScript,
} from '@react-google-maps/api';
import { useState } from 'react';
import '../App.css';
import { CitiesJsonDto } from '../Dtos';

const App = ({ cities }: { cities: Array<CitiesJsonDto> }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || '',
    });
    const [mapRef, setMapRef] = useState({
        panTo: { lat: 0, lng: 0 },
    });
    const [isOpen, setIsOpen] = useState(false);
    const [infoWindowData, setInfoWindowData] = useState({
        Id: '',
        Name: '',
    });

    const onMapLoad = (map) => {
        setMapRef(map);
        const bounds = new google.maps.LatLngBounds();
        cities?.forEach(({ lat, lon }) =>
            bounds.extend({ lat: parseFloat(lat), lng: parseFloat(lon) }),
        );
        map.fitBounds(bounds);
    };

    const handleMarkerClick = (
        Id: string,
        lat: string,
        lon: string,
        Name: string,
    ) => {
        mapRef?.panTo({ lat: parseFloat(lat), lng: parseFloat(lon) });
        setInfoWindowData({ Id, Name });
        setIsOpen(true);
    };

    return (
        <div className="App">
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <GoogleMap
                    mapContainerClassName="map-container"
                    onLoad={onMapLoad}
                    onClick={() => setIsOpen(false)}
                >
                    {cities.map((city) => (
                        <Marker
                            key={city.id}
                            position={{
                                lat: parseFloat(city.lat),
                                lng: parseFloat(city.lon),
                            }}
                            onClick={() => {
                                handleMarkerClick(
                                    city.id,
                                    city.lat,
                                    city.lon,
                                    city.name,
                                );
                            }}
                        >
                            {isOpen && infoWindowData?.Id === city.id && (
                                <InfoWindow
                                    onCloseClick={() => {
                                        setIsOpen(false);
                                    }}
                                >
                                    <h3>{infoWindowData?.Name}</h3>
                                </InfoWindow>
                            )}
                        </Marker>
                    ))}
                </GoogleMap>
            )}
        </div>
    );
};

export default App;

// 'use client';
// import React from 'react';
// import GoogleMapReact from 'google-map-react';
// import MyMarker from './MyMarker';
// import { CitiesJsonDto } from '../Dtos';

// // const AnyReactComponent = ({ text }: { text: string }) => <div>{text}</div>

// export default function SimpleMap({
//     cities,
// }: {
//     cities: Array<CitiesJsonDto>;
// }) {
//     const defaultProps = {
//         center: {
//             lat: parseFloat(cities[0].Lat),
//             lng: parseFloat(cities[0].Lon),
//         },
//         zoom: 11,
//     };

//     return (
//         // Important! Always set the container height explicitly
//         <div style={{ height: '100vh', width: '100%' }}>
//             <GoogleMapReact
//                 bootstrapURLKeys={{ key: '' }}
//                 defaultCenter={defaultProps.center}
//                 defaultZoom={defaultProps.zoom}
//                 // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
//             >
//                 {cities.map((city) => (
//                     <MyMarker
//                         key={city.id}
//                         lat={city.Lat}
//                         lng={city.Lon}
//                         tooltip={city.name}
//                         $hover={''}
//                     />
//                 ))}
//                 {/* <MyMarker lat={38} lng={36} tooltip={'title'} /> */}
//             </GoogleMapReact>
//         </div>
//     );
// }
