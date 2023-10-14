'use client';
import React from 'react';
import { CityDetailsJsonDto } from '../Dtos/CityDetails.dto';
import { Comments } from '../components/Comments';

export const CityDetailsPage = ({ data }: { data: CityDetailsJsonDto }) => {
    console.log('naber la', data);
    return (
        <>
            {data.comments.map((comment) => (
                <Comments key={comment.id} Comment={comment} />
            ))}
        </>
    );
};
