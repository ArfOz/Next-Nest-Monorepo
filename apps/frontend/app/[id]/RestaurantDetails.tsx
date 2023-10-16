import React from 'react';
import { CitiesJsonDto } from '../Dtos';

const RestaurantDetails = ({ data }: { data: CitiesJsonDto }) => {
    return (
        <div className="h-32 w-full border-2  flex items-center justify-center bg-emerald-500 text-white">
            <p className="text-2xl">{data.name}</p>
        </div>
    );
};

export default RestaurantDetails;
