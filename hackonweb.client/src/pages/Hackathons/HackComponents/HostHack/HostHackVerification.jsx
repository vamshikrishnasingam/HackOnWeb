import React, { useState } from 'react';
import HostHack from './HostHack'; // Import the HostHack component

const HostHackVerification = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false); // State to track if verification is successful
    const [errors, setErrors] = useState({});

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleDocumentChange = (e) => {
        setDocument(e.target.files[0]);
    };

    const validateInputs = () => {
        const errors = {};

        if (!email.trim()) {
            errors.email = 'Email is required';
        }

        if (!password.trim()) {
            errors.password = 'Password is required';
        }

        if (!document) {
            errors.document = 'Document is required';
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateInputs()) return;

        setLoading(true);

        try {
            // Simulate API call with setTimeout
            await new Promise(resolve => setTimeout(resolve, 2000));

            // For demo purposes, assume verification is successful if all fields are filled
            setVerified(true);
            setErrors({});
        } catch (error) {
            console.error('Verification error:', error);
            // Set error message based on the actual error response from API
            setErrors({ apiError: 'An error occurred while verifying. Please try again later.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="justify-center items-center p-5 mt-10">
            {!verified ? (
                <div className="max-w-xl mx-auto p-10 border rounded-lg bg-gray-50">
                    <h2 className="text-xl font-semibold mb-4 text-center">Host Hack Verification</h2>
                    {errors.apiError && <div className="text-red-600 text-sm mb-4">{errors.apiError}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                className={`mt-2 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.email ? 'border-red-500' : ''}`}
                                value={email}
                                onChange={handleEmailChange}
                               
                            />
                            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                className={`mt-2 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.password ? 'border-red-500' : ''}`}
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="document" className="block text-sm font-medium text-gray-700">Upload Document</label>
                            <input
                                type="file"
                                id="document"
                                className={`mt-1 block w-full ${errors.document ? 'border-red-500' : ''}`}
                                onChange={handleDocumentChange}
                                accept=".pdf,.doc,.docx,.jpg,.png"
                               
                            />
                            {errors.document && <p className="text-red-600 text-sm mt-1">{errors.document}</p>}
                        </div>
                        <button type="submit" className={`bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            {loading ? 'Verifying...' : 'Verify'}
                        </button>
                    </form>
                </div>
            ) : (
                <HostHack />
            )}
        </div>
    );
};

export default HostHackVerification;
