/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import HostHack from './HostHack'; // Import the HostHack component
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HostHackVerification = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [status, setStatus] = useState('');
    const [showHostHack, setShowHostHack] = useState(false);
    const [showContinue, setShowContinue] = useState(false);
    const [errors, setErrors] = useState({});
    const [extractedText, setExtractedText] = useState('');
    let navigate = useNavigate()
    const handleEmailChange = (e) => {
        setEmail(e.target.value);

        // Clear validation error for the current field
        setErrors({ ...errors, ['email']: '' });

    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);

        // Clear validation error for the current field
        setErrors({ ...errors, ['password']: '' });

    };

    const handleDocumentChange = (e) => {
        setDocument(e.target.files[0]);

        // Clear validation error for the current field
        setErrors({ ...errors, ['document']: '' });
    };

    const validateInputs = () => {
        const errors = {};
        let hasErrors = false;

        if (!email.trim()) {
            errors.email = 'Email is required';
            hasErrors = true;
        }

        if (!password.trim()) {
            errors.password = 'Password is required';
            hasErrors = true;
        }

        if (!document) {
            errors.document = 'Document is required';
            hasErrors = true;
        }
        if (hasErrors) {
            setErrors(errors);
            console.log(errors)
            return;
        }

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateInputs()) return;

        setLoading(true);
        //form data
        const fd = new FormData();
        fd.append('file', document); // 'file' should match the parameter name in your backend controller
        const formData = new FormData();
        formData.append('image', document);

        try {
            const response = await fetch('http://localhost:5000/extract-text', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                setExtractedText(data.extractedText); // Display extracted text
            } else {
                setErrors({ apiError: data.error });
            }
        } catch (error) {
            console.error('Error extracting text:', error);
            setErrors({ apiError: 'An error occurred while extracting text. Please try again later.' });
        }
        try {
            // Send POST request to upload file
            const response = await fetch('https://localhost:7151/api/Hackathons/UploadFile', {
                method: 'POST',
                body: fd
            });
            let data = await response.json();
            console.log('File uploaded Successfully', data.blob.fileName);
            var verificationDocs = data.blob;
            var verifyObj = {
                email: email,
                password: password,
                verificationDocs: verificationDocs
            }
            // Once the image is uploaded, update the community details
            const response2 = await fetch('https://localhost:7151/api/Hackathons/VerifyHost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Set the content type
                },
                body: JSON.stringify(verifyObj)
            });
            let data2 = await response2.json();
            console.log(data2);
            if (data2!=201) {
                setErrors({ apiError: "Error Verification failed"   });
            }
            if (data2==201) {
                try {
                    // Simulate API call with setTimeout
                    await new Promise(resolve => setTimeout(resolve, 2000));

                    // For demo purposes, assume verification is successful if all fields are filled
                    setVerified(true);
                    setStatus('Pending');
                    setShowContinue(true);
                    setShowHostHack(true)
                    setErrors({});
                } catch (error) {
                    console.error('Verification error:', error);
                    // Set error message based on the actual error response from API
                    setErrors({ apiError: 'An error occurred while verifying. Please try again later.' });
                }
            }
        } catch (error) {
            console.error('Error uploading document:', error);
            setErrors({ apiError: 'An error occurred while uploading the document. Please try again later.' });
            return;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (verified) {
            setTimeout(() => {
                setStatus('Verified');
            }, 20000); // Show HostHack component after 2 seconds
        }
    }, [verified]);

    return (
        <div className="justify-center items-center p-5 mt-10">
            {!showHostHack ? (
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
                        {verified ? (
                            <button type="button" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 w-full">
                                <FaCheckCircle className="inline-block mr-2" /> Verified!
                            </button>
                        ) : (
                            <button type="submit" className={`bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
                                {loading ? 'Verifying...' : 'Verify'}
                            </button>
                        )}
                    </form>
                </div>
            ) : (
                    <>
                        {extractedText ? (
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold">Extracted Text:</h3>
                                <p className="text-gray-700">{extractedText}</p>
                            </div>
                        ): (<>Not text</>)}
                    <div className="max-w-xl mx-auto p-10 border rounded-lg bg-gray-50">
                        <h2 className="text-xl font-semibold mb-4 text-center">Verification Status</h2>
                            <p className={`mb-4 text-gray-700 text-center ${status=='pending'? 'text-danger':'text-success'}`}>Status: {status}</p>
                        <button
                                className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 w-full"
                                onClick={() => navigate('../hack-host')}
                        >
                            Continue to Host Hackathon
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default HostHackVerification;
