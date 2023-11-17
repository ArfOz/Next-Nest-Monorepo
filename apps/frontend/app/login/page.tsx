'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { LoginData } from './Dtos/Login.dto';
import { signIn, useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

type Props = {
    className?: string;
    callbackUrl?: string;
    error?: string;
};

const Page = () => {
    //   Form validation

    const { data: session, status, update } = useSession();

    const router = useRouter();
    if (session) {
        router.push('/profile');
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [buttonText, setButtonText] = useState('Login');

    const searchParams = useSearchParams();
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showFailureMessage, setShowFailureMessage] = useState(false);

    const callbackUrl = searchParams.get('callbackUrl') || '/profile';

    const handleValidation = () => {
        const tempErrors: any = {};
        let isValid = true;

        if (email.length <= 0) {
            tempErrors['email'] = true;
            isValid = false;
        }

        if (password.length <= 0) {
            tempErrors['message'] = true;
            isValid = false;
        }

        setErrors({ ...tempErrors });
        console.log('errors', errors);
        return isValid;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const isValidForm = handleValidation();

            if (isValidForm) {
                setButtonText('Sending');

                const res = await signIn('credentials', {
                    redirect: false,
                    email: email,
                    password: password
                });
                console.log('res geldi login page', res);
                if (!res?.error) {
                    router.push('http://localhost:3000/profile');
                }
                if (res?.error) {
                    console.log('burada', res.error);
                    setShowSuccessMessage(false);
                    setShowFailureMessage(true);
                    setButtonText('Send');
                    // Reset form fields
                    setEmail('');
                    setPassword('');
                    return;
                }
                setShowSuccessMessage(true);
                setShowFailureMessage(false);
                setButtonText('Send');
                // Reset form fields
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            console.log('login catch block', error);
        }
    };

    // const handleSubmit = async (e: { preventDefault: () => void }) => {
    //     e.preventDefault();
    //     try {
    //         const isValidForm = handleValidation();
    //         if (isValidForm) {
    //             setButtonText('Sending');

    //             const res = await signIn('credentials', {
    //                 email,
    //                 password,
    //                 redirect: false
    //             });
    //             // location.reload();

    //             console.log('selam', res);

    //             // const response = await res.json();
    //             // if (response.Data.Error) {
    //             //     setShowSuccessMessage(false);
    //             //     setShowFailureMessage(true);
    //             //     setButtonText('Send');
    //             //     // Reset form fields
    //             //     setFullname('');
    //             //     setEmail('');
    //             //     setMessage('');
    //             //     setSubject('');
    //             //     return;
    //             // }
    //             // setShowSuccessMessage(true);
    //             // setShowFailureMessage(false);
    //             setButtonText('Send');
    //             // Reset form fields
    //             setPassword('');
    //             setEmail('');
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-bold text-center text-gray-700">
                    Logo
                </h1>
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            value={email}
                            name="email"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            value={password}
                            name="password"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    {/* <Link
                        href="/forget"
                        className="text-xs text-blue-600 hover:underline"
                    >
                        Forget Password?
                    </Link> */}
                    <div className="mt-2">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                        >
                            {buttonText}
                        </button>
                    </div>
                </form>

                <p className="mt-4 text-sm text-center text-gray-700">
                    {"Don't have an account?"}
                    <Link
                        href="/signup"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Page;
