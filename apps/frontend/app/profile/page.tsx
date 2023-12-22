'use client';
import { RequestNextNest } from '@frontendlibs';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
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
            const data = await RequestNextNest(
                'user/profile',
                'GET',
                session?.accessToken
            );

            setUserData(data.Data);
        };
        data();
    }, []);

    if (session) {
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
                                    <div className="mt-8">
                                        <Link href={`/profile/mycomments`}>
                                            My Comments
                                        </Link>
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
