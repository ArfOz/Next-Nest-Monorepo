import React from 'react';
import { CityDetailsJsonDto } from '../Dtos/CityDetails.dto';
import { Stack } from '@mui/material';
import Rating from '@mui/material/Rating';
import { AvgCalculator } from '@utils';

const RestaurantDetails = ({ data }: { data: CityDetailsJsonDto }) => {
    return (
        <div className="h-32 w-full border-2  flex items-center justify-center bg-emerald-500 text-white">
            <p className="text-2xl">{data.restaurant.name}</p>
            <Stack spacing={1}>
                <Rating
                    name="read-only"
                    value={AvgCalculator(data.comments)}
                    precision={0.1}
                    readOnly
                />
            </Stack>
        </div>
    );
};

export default RestaurantDetails;
