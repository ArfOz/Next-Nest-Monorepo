'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Suspense } from 'react';
import { RequestNextNest } from '@frontendlibs';
import { CommentDetails, Comments } from '../../components';

export default function MyComments() {
    const { data: session, status, update } = useSession();
    const [comments, setComments] = useState([]);

    const NoComment = (
        <div className="text-center">Herhangi bir yorum bulunmamaktadır</div>
    );
    useEffect(() => {
        const takeComments = async () => {
            const res = await RequestNextNest(
                'comments/mycomments',
                'GET',
                session?.accessToken
            );

            setComments(res.Data);
        };
        takeComments();
    }, []);

    return (
        <Suspense fallback={<p>Loading feed...</p>}>
            {comments.length > 0
                ? comments
                      ?.sort((a: CommentDetails, b: CommentDetails) =>
                          a.id > b.id ? 1 : -1
                      )
                      .map((commentData: CommentDetails) => (
                          <Comments
                              key={commentData.id}
                              comments={commentData}
                          />
                      ))
                : NoComment}
        </Suspense>
    );
}
