'use client';
import React from 'react';
import { CommentDetails } from '../Dtos/CityDetails.dto';
import { Stack } from '@mui/material';
import Rating from '@mui/material/Rating';
import { CiFaceSmile, CiFaceMeh, CiFaceFrown } from 'react-icons/ci';

export const Comments = ({ comments }: { comments: CommentDetails }) => {
    // console.log('commentssss', comments);
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
                                <p className="font-semibold text-gray-900">
                                    <a href="#">
                                        <span className="absolute inset-0"></span>
                                        {/* Author name */}
                                        {comments.user.username}
                                    </a>
                                </p>

                                <Stack spacing={1}>
                                    <Rating
                                        name="read-only"
                                        value={comments.star}
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
                                        {comments.title}
                                    </a>
                                </h3>
                                <p
                                    className="mt-5 line-clamp-3 text-sm  
                                              leading-6 text-gray-600"
                                >
                                    {comments.comment}
                                </p>
                            </div>
                            <div
                                className="relative mt-8 flex  
                                            items-center gap-x-4"
                            >
                                {/* {comments.star > 4 ? (
                                    <CiFaceSmile />
                                ) : comments.star > 2 ? (
                                    <CiFaceMeh />
                                ) : (
                                    <CiFaceFrown />
                                )} */}
                                <div
                                    // dateTime="2023-03-16"
                                    className="text-gray-500 text-xs"
                                >
                                    {new Date(Date.parse(comments.updatedAt))
                                        .toDateString()
                                        .toString()}
                                </div>

                                <div className="text-sm leading-6">
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
