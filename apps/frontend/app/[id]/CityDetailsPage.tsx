'use client';
import React from 'react';
import { CityDetailsJsonDto } from '../Dtos/CityDetails.dto';
import { Comments } from '../components/Comments';
import RestaurantDetails from './RestaurantDetails';

export const CityDetailsPage = ({ data }: { data: CityDetailsJsonDto }) => {
    console.log('naber la', data);
    return (
        <>
            <RestaurantDetails data={data.restaurant} />
            <div className="grid grid-cols-4 gap-4 p-8">
                {data.comments.map((comment) => (
                    <Comments key={comment.id} Comment={comment} />
                ))}
            </div>
        </>
    );
};
