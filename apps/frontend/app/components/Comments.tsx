// 'use client';
import React, { useState } from 'react';
import { CommentDetails } from '../Dtos/CityDetails.dto';
import { Stack } from '@mui/material';
import Rating from '@mui/material/Rating';

import DropdownThreedots from './Dropdown/Dropdown';

export const Comments = ({
    comments,
    ondelete
}: {
    comments: CommentDetails;
    ondelete?: any;
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [postText, setPostText] = useState('');

    const UpdatePost = () => {
        console.log('update');
        setIsEditing(true);
    };

    const DeletePost = () => {
        console.log('delete');
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        // Burada postText'i kaydetme veya başka bir işlem yapma işlemleri gerçekleştirilebilir.
    };

    return (
        <div className="bg-white p-4 shadow-md rounded-md max-w-md mx-auto mt-8">
            <div className="flex items-center gap-x-4 text-sm w-full justify-between">
                <div>
                    <p className="font-semibold">{comments.user.username}</p>
                    <p className="text-gray-500 text-sm">
                        {new Date(Date.parse(comments.updatedAt))
                            .toDateString()
                            .toString()}
                    </p>
                </div>
                <Stack spacing={1}>
                    <Rating
                        name="read-only"
                        value={comments.star}
                        precision={0.1}
                        readOnly
                    />
                </Stack>

                <DropdownThreedots
                    DeletePost={() => DeletePost()}
                    UpdatePost={() => UpdatePost()}
                />
            </div>

            {isEditing ? (
                <textarea
                    value={comments.comment}
                    onChange={(e) => setPostText(e?.target?.value)}
                    className="mt-4 p-2 border border-gray-300 rounded-md w-full"
                />
            ) : (
                <p className="mt-4 text-gray-800">{comments.comment}</p>
            )}

            <div className="flex items-center mt-4">
                {isEditing && (
                    <button
                        onClick={handleSaveClick}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
                    >
                        Kaydet
                    </button>
                )}

                {/* <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500"> */}
                {/* <svg */}
                {/* xmlns="http://www.w3.org/2000/svg" */}
                {/* fill="none" */}
                {/* viewBox="0 0 24 24" */}
                {/* stroke="currentColor" */}
                {/* className="w-5 h-5" */}
                {/* > */}
                {/* Beğeni ikonu SVG buraya gelecek */}
                {/* </svg> */}
                {/* <span>Beğen</span> */}
                {/* </button> */}

                {/* <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 ml-4"> */}
                {/* <svg */}
                {/* xmlns="http://www.w3.org/2000/svg" */}
                {/* fill="none" */}
                {/* viewBox="0 0 24 24" */}
                {/* stroke="currentColor" */}
                {/* className="w-5 h-5" */}
                {/* // > */}
                {/* Yorum ikonu SVG buraya gelecek */}
                {/* </svg> */}
                {/* <span>Yorum Yap</span> */}
                {/* </button> */}
            </div>
        </div>
    );
};
