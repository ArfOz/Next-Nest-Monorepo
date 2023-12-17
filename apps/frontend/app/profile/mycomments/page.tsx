'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import { Comments } from '../../components/Comments';
import { CommentDetails } from '../../Dtos';
import { Suspense } from 'react';

const CommentsMapper = async () => {
    const { data: session, status, update } = useSession();

    const res = await fetch('http://localhost:3300/api/comments/mycomments', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`
        }
    });
    const response = await res.json();

    const comments = response.Data;

    if (response.Data) {
        return comments
            .sort((a: CommentDetails, b: CommentDetails) =>
                a.id > b.id ? 1 : -1
            )
            .map((commentData: CommentDetails) => (
                <Comments key={commentData.id} comments={commentData} />
            ));
    }

    return false;
};

export default async function MyComments() {
    const NoComment = (
        <div className="text-center">Herhangi bir yorum bulunmamaktadır</div>
    );

    const comments = await CommentsMapper();

    return (
        <Suspense fallback={<p>Loading feed...</p>}>
            {comments || NoComment}
        </Suspense>
    );
}
