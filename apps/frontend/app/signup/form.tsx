'use client';

import { signIn } from 'next-auth/react';
import { ChangeEvent, useState } from 'react';

export const RegisterForm = () => {
    const [loading, setLoading] = useState(false);
    const [buttonText, setButtonText] = useState('Register');

    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
        email: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        username: ''
    });

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showFailureMessage, setShowFailureMessage] = useState(false);

    const handleValidation = () => {
        const tempErrors: any = {};
        let isValid = true;

        if (formValues.email.length <= 0) {
            tempErrors['email'] = true;
            isValid = false;
        }

        if (formValues.password.length <= 0) {
            tempErrors['password'] = true;
            isValid = false;
        }
        if (formValues.username.length <= 10) {
            tempErrors['username'] = true;
            isValid = false;
        }

        setErrors({ ...tempErrors });
        console.log('errors', errors);
        return isValid;
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // setLoading(true);

        const isValidForm = handleValidation();
        console.log('formValues', formValues, 'isvaliddd', isValidForm);

        try {
            if (isValidForm) {
                setButtonText('Sending');

                const res = await fetch(
                    'http://localhost:3300/api/user/register',
                    {
                        method: 'POST',
                        body: JSON.stringify(formValues),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                const response = await res.json();

                console.log('response signin page', response);

                setLoading(false);
                if (response?.error) {
                    console.log('burada', response.error);
                    setShowSuccessMessage(false);
                    setShowFailureMessage(true);
                    // Reset form fields
                    setFormValues({ username: '', email: '', password: '' });

                    return;
                }

                setShowSuccessMessage(true);
                setShowFailureMessage(false);
                setButtonText('Send');
                // Reset form fields
                setFormValues({
                    email: '',
                    password: '',
                    username: ''
                });
            }
        } catch (error) {
            console.log('login catch block', error);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const input_style =
        'form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none';

    return (
        <form onSubmit={onSubmit}>
            <div className="mb-6">
                <input
                    required
                    type="username"
                    name="username"
                    value={formValues.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className={`${input_style}`}
                />
                {errors?.username && (
                    <p className="text-red-500">
                        Username have to be at last 10 chars.
                    </p>
                )}
            </div>
            <div className="mb-6">
                <input
                    required
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className={`${input_style}`}
                />
                {/* {errors.email && (
                    <p className="text-red-500">Email cannot be empty.</p>
                )} */}
            </div>
            <div className="mb-6">
                <input
                    required
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={`${input_style}`}
                />
            </div>
            <button
                type="submit"
                style={{ backgroundColor: `${loading ? '#ccc' : '#3446eb'}` }}
                className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                disabled={loading}
            >
                {loading ? 'loading...' : 'Sign Up'}
            </button>
        </form>
    );
};
