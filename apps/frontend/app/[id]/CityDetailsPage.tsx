'use client';
import React from 'react';
import { CityDetailsJsonDto } from '../Dtos/CityDetails.dto';
import { Comments } from '../components/Comments';
import RestaurantDetails from './RestaurantDetails';
import AddComment from '../components/AddComment';

export const CityDetailsPage = ({ data }: { data: CityDetailsJsonDto }) => {
    const CommentsMapper = (
        <div className="flex flex-row flex-wrap gap-4 p-8 content-start">
            {data.comments.map((comment) => (
                <Comments key={comment.id} Comment={comment} />
            ))}
        </div>
    );

    const NoComment = (
        <div className="text-center">Herhangi bir yorum bulunmamaktadır</div>
    );

    return (
        <>
            <RestaurantDetails data={data} />
            {data.comments.length > 0 ? CommentsMapper : NoComment}
            <AddComment restaurant_id={data.restaurant.id} />
        </>
    );
};
