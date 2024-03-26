// DynamicComponent.jsx
import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

function LoginPage() {
    const [isLoginForm, setIsLoginForm] = useState(true);

    const toggleForm = () => {
        setIsLoginForm(!isLoginForm);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        onSubmit: values => {
            if (isLoginForm) {
                // Handle login form submission
                handleLogin(values);
            } else {
                // Handle signup form submission
                handleSignup(values);
            }
        },
        validate: values => {
            const errors = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            }
            // Add more validation rules as needed
            return errors;
        }
    });

    const handleLogin = async (values) => {
        try {
            const response = await axios.post('http://localhost:3000/login', values);
            console.log(response.data); // handle successful login
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleSignup = async (values) => {
        try {
            const response = await axios.post('http://localhost:3000/signup', values);
            console.log(response.data); // handle successful signup
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-100 p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">{isLoginForm ? 'Login' : 'Signup'}</h2>
                <form onSubmit={formik.handleSubmit}>
                    {isLoginForm ? (
                        <div>
                            <label className="block mb-2">Email:</label>
                            <input type="email" name="email" placeholder="Enter your email" className="w-full border-gray-300 border rounded-md p-2 mb-4" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                            {formik.touched.email && formik.errors.email ? <div className="text-red-500">{formik.errors.email}</div> : null}
                            <label className="block mb-2">Password:</label>
                            <input type="password" name="password" placeholder="Enter your password" className="w-full border-gray-300 border rounded-md p-2 mb-4" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                            {formik.touched.password && formik.errors.password ? <div className="text-red-500">{formik.errors.password}</div> : null}
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Login</button>
                            <p className="mt-4">Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={toggleForm}>Signup</span></p>
                        </div>
                    ) : (
                        <div>
                            <label className="block mb-2">Name:</label>
                            <input type="text" name="name" placeholder="Enter your name" className="w-full border-gray-300 border rounded-md p-2 mb-4" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
                            <label className="block mb-2">Email:</label>
                            <input type="email" name="email" placeholder="Enter your email" className="w-full border-gray-300 border rounded-md p-2 mb-4" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                            {formik.touched.email && formik.errors.email ? <div className="text-red-500">{formik.errors.email}</div> : null}
                            <label className="block mb-2">Password:</label>
                            <input type="password" name="password" placeholder="Enter your password" className="w-full border-gray-300 border rounded-md p-2 mb-4" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                            {formik.touched.password && formik.errors.password ? <div className="text-red-500">{formik.errors.password}</div> : null}
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Signup</button>
                            <p className="mt-4">Already have an account? <span className="text-blue-500 cursor-pointer" onClick={toggleForm}>Login</span></p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
