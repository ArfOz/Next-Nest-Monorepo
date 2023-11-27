'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const MyComments = () => {
    const { data: session, status, update } = useSession();
    const [comments, setComments] = useState({});

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
            console.log('response', response);
            setComments(response);
        };
        data();
    }, []);

    return <div>page</div>;
};

export default MyComments;
