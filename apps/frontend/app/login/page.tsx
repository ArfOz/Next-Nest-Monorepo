'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { LoginData } from './Dtos/Login.dto';

const Page = () => {
    //   Form validation

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [buttonText, setButtonText] = useState('Login');

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

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

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const isValidForm = handleValidation();
            if (isValidForm) {
                setButtonText('Sending');
                const data: LoginData = {
                    email: email,
                    password: password
                };

                const res = await fetch(
                    'http://localhost:3300/api/user/login',
                    {
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST'
                    }
                );

                const response = await res.json();
                // if (response.Data.Error) {
                //     setShowSuccessMessage(false);
                //     setShowFailureMessage(true);
                //     setButtonText('Send');
                //     // Reset form fields
                //     setFullname('');
                //     setEmail('');
                //     setMessage('');
                //     setSubject('');
                //     return;
                // }
                // setShowSuccessMessage(true);
                // setShowFailureMessage(false);
                setButtonText('Send');
                // Reset form fields
                setPassword('');
                setEmail('');
            }
        } catch (error) {
            console.log(error);
        }
    };

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
