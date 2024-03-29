'use client';
import React, { useState } from 'react';
import { Rating, Stack } from '@mui/material';
import { useSession } from 'next-auth/react';
import { RequestNextNest } from '@frontendlibs';
import { SendCommentDto } from '../dtos';

type Props = {
    restaurant_id: string;
};

export default function AddComment(props: Props) {
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [starValue, setStarValue] = useState(3);
    const [buttonText, setButtonText] = useState('Send Comment');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showFailureMessage, setShowFailureMessage] = useState(false);
    const [error, setError] = useState('');

    const { data: session, status, update } = useSession();

    //   Form validation
    const [errors, setErrors] = useState({
        title: '',
        comment: ''
    });

    // setTimeout(function () {
    //     window.location.reload();
    // }, 5000);

    const handleValidation = () => {
        const tempErrors: any = {};
        let isValid = true;

        if (title.length < 5) {
            tempErrors['title'] = true;
            isValid = false;
        }
        if (comment.length < 20) {
            tempErrors['comment'] = true;
            isValid = false;
        }

        setErrors({ ...tempErrors });
        // console.log('errors', errors);
        return isValid;
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const isValidForm = handleValidation();
            // const isValidForm = true;

            if (isValidForm) {
                setButtonText('Sending');
                const data: SendCommentDto = {
                    restaurantId: props.restaurant_id,
                    title,
                    comment,
                    star: starValue
                };

                const res = await RequestNextNest(
                    'comments/addcomments',
                    'POST',
                    session?.accessToken,
                    data
                );

                if (res?.error) {
                    setShowSuccessMessage(false);
                    setShowFailureMessage(true);
                    setButtonText('Send');
                    // Reset form fields
                    setTitle('');
                    setComment('');
                    setStarValue(3);
                    setError(res.message);

                    return;
                }

                if (res?.Error) {
                    setShowSuccessMessage(false);
                    setShowFailureMessage(true);
                    setButtonText('Send');
                    // Reset form fields
                    setTitle('');
                    setComment('');
                    setStarValue(3);
                    setError(res.Details);

                    return;
                }

                if (res?.Success) {
                    setError('');
                    setShowSuccessMessage(true);
                    setShowFailureMessage(false);
                    setButtonText('Sent');

                    setTimeout(function () {
                        window.location.reload();
                    }, 2000);
                }

                // setShowSuccessMessage(true);
                // setShowFailureMessage(false);
                // setButtonText('Send');
                // // Reset form fields
                // setComment('');
                // setTitle('');
                // setStarValue(0);
                // setSubject('');
                // window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (session) {
        return (
            <div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input
                            type="hidden"
                            name="remember"
                            defaultValue="true"
                        />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="title" className="sr-only">
                                    Title
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Title"
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                    }}
                                />
                                {errors.title && (
                                    <p className="text-red-500">
                                        Title cannot be less than 5 characaters.
                                    </p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="comment" className="sr-only">
                                    Comment
                                </label>
                                <textarea
                                    id="comment"
                                    name="comment"
                                    required
                                    rows={3}
                                    className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Comment"
                                    onChange={(e) => {
                                        setComment(e.target.value);
                                    }}
                                />
                                {errors.comment && (
                                    <p className="text-red-500">
                                        Comment cannot be less than 20
                                        characaters.
                                    </p>
                                )}
                                {showSuccessMessage && (
                                    <p className="text-red-500">
                                        Comment added Successfully
                                    </p>
                                )}
                            </div>
                            <div>
                                <Stack spacing={1}>
                                    <Rating
                                        name="simple-controlled"
                                        value={starValue}
                                        onChange={(event, newValue) => {
                                            setStarValue(newValue!);
                                        }}
                                    />
                                </Stack>
                            </div>
                        </div>
                        <div className="text-red-500 text-xs">
                            {showFailureMessage && error}
                        </div>
                        <div className="text-green-600 text-lg">
                            {showSuccessMessage && 'User Saved Successfully'}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center
                py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500"
                            >
                                {buttonText}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                To add comment please sign in.
            </div>
        </div>
    );
}
