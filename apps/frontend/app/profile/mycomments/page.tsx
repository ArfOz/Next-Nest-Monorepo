'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Comments } from '../../components/Comments';
import { CommentDetails } from '../../Dtos';

const MyComments = () => {
    const { data: session, status, update } = useSession();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const data = async () => {
            const res = await fetch(
                'http://localhost:3300/api/comments/mycomments',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${session?.accessToken}`
                    }
                }
            );
            const response = await res.json();
            console.log('response', response.Data);
            setComments(response.Data);
        };
        data();
    }, []);

    const CommentsMapper = (
        <div className="flex flex-row flex-wrap gap-4 p-8 content-start">
            {comments.map((commentData: CommentDetails) => (
                <Comments key={commentData.id} comments={commentData} />
            ))}
        </div>
    );

    const NoComment = (
        <div className="text-center">Herhangi bir yorum bulunmamaktadır</div>
    );

    return <>{comments.length > 0 ? CommentsMapper : NoComment}</>;
};

export default MyComments;
