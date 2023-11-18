'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Profile() {
    const { data: session, status, update } = useSession();

    const router = useRouter();

    console.log('profilepage', session);
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
                            {/* {!user ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="flex items-center gap-8">
                                <div></div>
                                <div className="mt-8">
                                    {JSON.stringify(session.user)}
                                </div>
                            </div>
                        )} */}
                        </div>
                    </div>
                </section>
            </>
        );
    }

    return router.push('/login');
}
