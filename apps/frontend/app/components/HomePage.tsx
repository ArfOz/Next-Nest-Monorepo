'use client';
/* global google */
import {
    GoogleMap,
    InfoWindow,
    Marker,
    useLoadScript
} from '@react-google-maps/api';
import React, { useState } from 'react';
import '../App.css';
import { CitiesJsonDto } from './dtos';
import Link from 'next/link';

const App = ({ cities }: { cities: Array<CitiesJsonDto> }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NX_REACT_APP_GOOGLE_API_KEY as string
    });
    const [mapRef, setMapRef] = useState({
        panTo: { lat: 1.2, lng: 1.2 }
    });
    const [isOpen, setIsOpen] = useState(false);
    const [infoWindowData, setInfoWindowData] = useState({
        Id: '',
        Name: ''
    });

    const onMapLoad = (map: typeof GoogleMap.arguments) => {
        setMapRef(map);
        const bounds = new google.maps.LatLngBounds();
        cities?.forEach(({ lat, lon }) =>
            bounds.extend({ lat: parseFloat(lat), lng: parseFloat(lon) })
        );
        map.fitBounds(bounds);
    };

    const handleMarkerClick = (
        Id: string,
        lat: number,
        lon: number,
        Name: string
    ) => {
        setMapRef({ panTo: { lat, lng: lon } });
        setInfoWindowData({ Id, Name });
        setIsOpen(true);
    };

    return (
        <div className="grow">
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
                                lng: parseFloat(city.lon)
                            }}
                            onClick={() =>
                                handleMarkerClick(
                                    city.id,
                                    parseFloat(city.lat),
                                    parseFloat(city.lon),
                                    city.name
                                )
                            }
                        >
                            {isOpen && infoWindowData?.Id === city.id && (
                                <InfoWindow
                                    onCloseClick={() => {
                                        setIsOpen(false);
                                    }}
                                >
                                    <React.Fragment>
                                        <h3>{infoWindowData?.Name}</h3>
                                        {/* {AvgCalculator()} */}
                                        <Link href={`/${city.id}`}>
                                            Click for more details
                                        </Link>
                                    </React.Fragment>
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
