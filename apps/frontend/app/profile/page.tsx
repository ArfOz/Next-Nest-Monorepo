'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Profile() {
    const { data: session, status, update } = useSession();
    const [userData, setUserData] = useState({
        email: '',
        username: ''
    });

    const router = useRouter();
    useEffect(() => {
        const data = async () => {
            const res = await fetch('http://localhost:3300/api/user/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.accessToken}`
                }
            });
            const response = await res.json();
            setUserData(response);
        };
        data();
    }, []);

    if (session) {
        // return 'Loading or not authenticated...';

        return (
            <>
                <section className="bg-ct-blue-600  min-h-screen pt-20">
                    <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
                        <div>
                            <p className="mb-3 text-5xl text-center font-semibold">
                                Profile Page
                            </p>
                            {!session.user ? (
                                <p>Loading...</p>
                            ) : (
                                <div className="flex items-center gap-8">
                                    <div></div>
                                    <div className="mt-8">
                                        {userData?.email}
                                    </div>
                                    <div className="mt-8">
                                        {userData?.username}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </>
        );
    }

    return router.push('/login');
}
