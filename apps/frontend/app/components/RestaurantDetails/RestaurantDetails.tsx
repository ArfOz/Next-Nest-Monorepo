import React from 'react';
import { Stack } from '@mui/material';
import Rating from '@mui/material/Rating';
import { AvgCalculator } from '@frontendlibs';
import { CityDetailsJsonDto } from '../dtos';

const RestaurantDetails = ({ data }: { data: CityDetailsJsonDto }) => {
    const average = AvgCalculator(data.restaurant);

    return (
        <div className="h-32 w-full border-2  flex items-center justify-center bg-emerald-500 text-white">
            <p className="text-2xl">{data.restaurant.name}</p>
            <Stack spacing={1}>
                <Rating
                    name="read-only"
                    value={average}
                    precision={0.1}
                    readOnly
                />
            </Stack>
        </div>
    );
};

export default RestaurantDetails;
