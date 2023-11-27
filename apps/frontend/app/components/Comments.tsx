'use client';
import React from 'react';
import { CommentDetails } from '../Dtos/CityDetails.dto';
import { Stack } from '@mui/material';
import Rating from '@mui/material/Rating';
import { CiFaceSmile, CiFaceMeh, CiFaceFrown } from 'react-icons/ci';

export const Comments = ({ Comment }: { Comment: CommentDetails }) => {
    return (
        <div>
            <div className="bg-white shadow-2xl w-96">
                <div className="mx-auto max-w-7xl ">
                    <div
                        className="mx-5 grid max-w-2xl  
                                    grid-cols-1 gap-x-8  
                                    gap-y-16 p-10 lg:grid-cols-1"
                    >
                        <article
                            className="flex max-w-xl flex-col  
                                            items-start justify-between"
                        >
                            <div className="flex items-center gap-x-4 text-xs">
                                <div
                                    // dateTime="2023-03-16"
                                    className="text-gray-500"
                                >
                                    {new Date(Date.parse(Comment.date))
                                        .toDateString()
                                        .toString()}
                                </div>

                                <Stack spacing={1}>
                                    <Rating
                                        name="read-only"
                                        value={Comment.stars}
                                        precision={0.1}
                                        readOnly
                                    />
                                </Stack>
                            </div>
                            <div className="group relative">
                                <h3
                                    className="mt-3 text-lg font-semibold  
                                               leading-6 text-gray-900  
                                               group-hover:text-gray-600"
                                >
                                    <a href="#">
                                        <span className="absolute inset-0"></span>
                                        {Comment.name}
                                    </a>
                                </h3>
                                <p
                                    className="mt-5 line-clamp-3 text-sm  
                                              leading-6 text-gray-600"
                                >
                                    {Comment.comment}
                                </p>
                            </div>
                            <div
                                className="relative mt-8 flex  
                                            items-center gap-x-4"
                            >
                                {Comment.stars > 4 ? (
                                    <CiFaceSmile />
                                ) : Comment.stars > 2 ? (
                                    <CiFaceMeh />
                                ) : (
                                    <CiFaceFrown />
                                )}
                                <div className="text-sm leading-6">
                                    <p className="font-semibold text-gray-900">
                                        <a href="#">
                                            <span className="absolute inset-0"></span>
                                            {/* Author name */}
                                            {Comment.user_id}
                                        </a>
                                    </p>
                                    <p className="text-gray-600">
                                        {/* {props.content.designation} */}
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    );
};
