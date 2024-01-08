'use client';
import React from 'react';
import { CityDetailsJsonDto } from '../dtos';
import { Comments } from '../Comments';
import RestaurantDetails from '../RestaurantDetails/RestaurantDetails';
import AddComment from '../AddComment/AddComment';

export const CityDetailsPage = ({ data }: { data: CityDetailsJsonDto }) => {
    const CommentsMapper = (
        <div className="flex flex-col items-center">
            {data.comments.map((commentData) => (
                <Comments key={commentData.id} comments={commentData} />
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
