'use client';
import React from 'react';
import GoogleMapReact from 'google-map-react';
import MyMarker from './MyMarker';
import { CitiesJsonDto } from '../Dtos';

// const AnyReactComponent = ({ text }: { text: string }) => <div>{text}</div>

export default function SimpleMap({
    cities,
}: {
    cities: Array<CitiesJsonDto>;
}) {
    const defaultProps = {
        center: {
            lat: parseFloat(cities[0].Lat),
            lng: parseFloat(cities[0].Lon),
        },
        zoom: 11,
    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: '' }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
                {cities.map((city) => (
                    <MyMarker
                        key={city.id}
                        lat={city.Lat}
                        lng={city.Lon}
                        tooltip={'title'}
                    />
                ))}
                {/* <MyMarker lat={38} lng={36} tooltip={'title'} /> */}
            </GoogleMapReact>
        </div>
    );
}
