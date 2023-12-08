// 'use client';
import React, { useState } from 'react';
import { CommentDetails } from '../Dtos/CityDetails.dto';
import { Stack } from '@mui/material';
import Rating from '@mui/material/Rating';

import DropdownThreedots from './Dropdown/Dropdown';

// export const Comments = ({
//     comments,
//     ondelete
// }: {
//     comments: CommentDetails;
//     ondelete?: any;
// }) => {
//     // console.log('commentssss', comments);
//     const DeletePost = () => {
//         console.log('arif');
//     };

//     return (
//         <div className="bg-white shadow-2xl w-96">
//             <div className="mx-auto max-w-7xl ">
//                 <div
//                     className="mx-5 grid max-w-2xl
//                                     grid-cols-1 gap-x-8
//                                     gap-y-16 p-10 lg:grid-cols-1"
//                 >
//                     <article
//                         className="flex max-w-xl flex-col
//                                             items-start justify-between"
//                     >
//                         <div className="flex items-center gap-x-4 text-sm w-full justify-between">
//                             <p className="font-semibold text-gray-900">
//                                 {comments.user.username}
//                             </p>
//                             <div>
//                                 <Stack spacing={1}>
//                                     <Rating
//                                         name="read-only"
//                                         value={comments.star}
//                                         precision={0.1}
//                                         readOnly
//                                     />
//                                 </Stack>
//                             </div>

//                             <DropdownThreedots
//                                 DeletePost={() => DeletePost()}
//                             />
//                         </div>
//                         <div className="group relative">
//                             <h3
//                                 className="mt-3 text-lg font-semibold
//                                                leading-6 text-gray-900
//                                                group-hover:text-gray-600"
//                             >
//                                 <a>
//                                     <span className="absolute inset-0"></span>
//                                     {comments.title}
//                                 </a>
//                             </h3>
//                             <p
//                                 className="mt-5 line-clamp-3 text-sm
//                                               leading-6 text-gray-600"
//                             >
//                                 {comments.comment}
//                             </p>
//                         </div>
//                         <div
//                             className="relative mt-8 flex
//                                             items-center gap-x-4"
//                         >
//                             <div
//                                 // dateTime="2023-03-16"
//                                 className="text-gray-500 text-xs"
//                             >
//                                 {new Date(Date.parse(comments.updatedAt))
//                                     .toDateString()
//                                     .toString()}
//                             </div>
//                             <div className="text-sm leading-6">
//                                 <p className="text-gray-600">
//                                     {/* {props.content.designation} */}
//                                 </p>
//                             </div>
//                         </div>
//                     </article>
//                 </div>
//             </div>
//         </div>
//     );
// };

export const Comments = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [postText, setPostText] = useState(
        'LinkedIn gönderi metni buraya gelecek. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    );

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        // Burada postText'i kaydetme veya başka bir işlem yapma işlemleri gerçekleştirilebilir.
    };

    return (
        <div className="bg-white p-4 shadow-md rounded-md max-w-md mx-auto mt-8">
            <div className="flex items-center space-x-4">
                <img
                    src="profil-resmi-url"
                    alt="Profil Resmi"
                    className="w-10 h-10 rounded-full"
                />
                <div>
                    <p className="font-semibold">Ad Soyad</p>
                    <p className="text-gray-500 text-sm">Başlık / Pozisyon</p>
                </div>
            </div>

            {isEditing ? (
                <textarea
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    className="mt-4 p-2 border border-gray-300 rounded-md w-full"
                />
            ) : (
                <p className="mt-4 text-gray-800">{postText}</p>
            )}

            <div className="flex items-center mt-4">
                {isEditing ? (
                    <button
                        onClick={handleSaveClick}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
                    >
                        Kaydet
                    </button>
                ) : (
                    <button
                        onClick={handleEditClick}
                        className="text-gray-500 hover:text-blue-500"
                    >
                        Düzenle
                    </button>
                )}

                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        {/* Beğeni ikonu SVG buraya gelecek */}
                    </svg>
                    <span>Beğen</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 ml-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        {/* Yorum ikonu SVG buraya gelecek */}
                    </svg>
                    <span>Yorum Yap</span>
                </button>
            </div>
        </div>
    );
};
