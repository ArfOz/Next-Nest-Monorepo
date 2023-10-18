'use client';
import React from 'react';
import { CityDetailsJsonDto } from '../Dtos/CityDetails.dto';
import { Comments } from '../components/Comments';
import RestaurantDetails from './RestaurantDetails';

export const CityDetailsPage = ({ data }: { data: CityDetailsJsonDto }) => {
    return (
        <>
            <RestaurantDetails data={data} />
            <div className="flex flex-row flex-wrap gap-4 p-8 content-start">
                {data.comments.map((comment) => (
                    <Comments key={comment.id} Comment={comment} />
                ))}
            </div>
        </>
    );
};
