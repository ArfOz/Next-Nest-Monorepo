'use client';
import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signIn } from 'next-auth/react';

export const RegisterForm = () => {
    const [buttonText, setButtonText] = useState('Register');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showFailureMessage, setShowFailureMessage] = useState(false);
    const [error, setError] = useState('');

    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(5, 'Username must be at least 5 chars')
            .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Required')
    });

    const onSubmit = async (
        values: typeof initialValues,
        { resetForm }: { resetForm: any }
    ) => {
        // Handle form submission
        console.log(values);

        const sendata = {
            email: values.email,
            username: values.username,
            password: values.password
        };

        try {
            setButtonText('Sending');
            const res = await fetch('http://localhost:3300/api/user/register', {
                method: 'POST',
                body: JSON.stringify(sendata),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const response = await res.json();

            console.log('response signin page', response);

            if (response?.Error) {
                console.log('burada', response.Details);
                setShowSuccessMessage(false);
                setShowFailureMessage(true);
                setError(response.Details);
                setButtonText('Register');

                // Reset form fields
                resetForm();

                return;
            }
            if (response?.Success) {
                console.log('response.', response);
                setError('');
                setShowSuccessMessage(true);
                setShowFailureMessage(false);
                setButtonText('Register');

                // Reset form fields
                resetForm();
                return;
            }
            setButtonText('Thanks');

            // signIn(undefined, { callbackUrl: '/' });
        } catch (error: any) {
            setError(error);
        }
    };

    const onReset = (
        values: typeof initialValues,
        { resetForm }: { resetForm: any }
    ) => {
        // Handle reset button click
        resetForm();
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(formik) => (
                <Form className="max-w-md mx-auto mt-8 p-8 bg-white shadow-md rounded">
                    <h1 className="mb-8 text-3xl text-center">Sign Up</h1>
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Username
                        </label>
                        <Field
                            type="text"
                            id="username"
                            name="username"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage
                            name="username"
                            component="div"
                            className="text-red-500 text-xs"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Email
                        </label>
                        <Field
                            type="email"
                            id="email"
                            name="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-xs"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Password
                        </label>
                        <Field
                            type="password"
                            id="password"
                            name="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-500 text-xs"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Confirm Password
                        </label>
                        <Field
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage
                            name="confirmPassword"
                            component="div"
                            className="text-red-500 text-xs"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {buttonText}
                        </button>
                        <button
                            type="button"
                            onClick={() => onReset(formik.values, formik)}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Reset
                        </button>
                    </div>
                    <div className="text-red-500 text-xs">
                        {showFailureMessage && error}
                    </div>
                    <div className="text-green-600 text-lg">
                        {showSuccessMessage && 'User Saved Successfully'}
                    </div>
                </Form>
            )}
        </Formik>
    );
};
