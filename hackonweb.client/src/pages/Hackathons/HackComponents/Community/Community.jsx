/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import Switch from '@mui/material/Switch';
import { IoCloudUploadOutline } from "react-icons/io5";
import axios from 'axios';
import './Community.css'

function Community() {
    const teamName = "PHOENIX";
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [data, setData] = useState(null);
    const imageInputRef = useRef(null);
    const fileInputRef = useRef(null);
    const [showImages, setShowImages] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [publics, setPublic] = useState(false);

    //IMAGE RELATED FUNCTIONS

    const callShowImages = (event) => {
        event.preventDefault();
        setShowImages(!showImages)
    }


    useEffect(() => {
        if (showImages)
            loadImagesFromLocalStorage();


        // Load images from local storage when component mounts
    }, [showImages]);

    const loadImagesFromLocalStorage = () => {
        const images = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('uploadedImage')) {
                images.push(localStorage.getItem(key));
            }
        }
        setUploadedImages(images);
    };

    const handleImageChange = (e) => {
        const img = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        if (img) {
            reader.readAsDataURL(img);
        }
    };

    const handleImageUpload = () => {
        //upload image to database
        localStorage.setItem(`uploadedImage${uploadedImages.length + 1}`, image);
        setImage(null);
    };

    const handleImageUploadCancel = () => {
        setImage(null);
        imageInputRef.current.value = null;
    };

    //FILE RELATED FUNCTIONS

    const handleFileChange = (e) => {
        const files = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFile(reader.result);
        };
        if (files) {
            reader.readAsDataURL(files);
        }
    };
    const handleFileUpload = () => {
        //upload file to database
        localStorage.setItem('uploadedFile', file);
        setFile(null);
    };
    const handleFileUploadCancel = () => {
        setFile(null);
        fileInputRef.current.value = null;
    };
    const getUploadedFiles = () => {
        // Retrieve uploaded file from local storage
        return localStorage.getItem('uploadedFile');
    };

    ///OTHER FUNCTIONS

    const handleClickButton = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.get('http://localhost:5014/api/Hackathons/GetAllUsers');
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleSetPublic = (event) => {
        setPublic(!publics)
    }

    return (
        <div>
            <form className="p-10">
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">{teamName}</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Welcome to your team page...!!
                            <br />
                            This information will be displayed publicly so be careful what you share.
                            <br />
                            <p>Make Public <Switch
                                label="Public"
                                checked={publics}
                                onChange={handleSetPublic}
                                inputProps={{ 'aria-label': 'controlled' }}
                            /></p>
                        </p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Upload your POSTS :
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <label
                                        htmlFor="image-upload"
                                        className="block cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        style={{ display: 'block', padding: '1rem', marginTop: '2rem' }}
                                    >
                                        <div className="text-center">
                                            {image ? (
                                                <div className="mt-4 text-center">
                                                    <img src={image} style={{ maxWidth: '100%', maxHeight: '300px' }} />
                                                    <button onClick={handleImageUpload}>upload</button>
                                                    <button onClick={handleImageUploadCancel}>cancel</button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                        <span>Upload a file</span>
                                                        <input id="image-upload" name="image-upload" type="file" className="sr-only" onChange={handleImageChange} ref={imageInputRef} />
                                                    </div>
                                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                            )}
                                        </div>
                                    </label>

                                </div>
                                <button onClick={callShowImages}>Show Images</button>
                                {showImages === true && (
                                    <div className="mt-10 sm:flex sm:overflow-x-auto">
                                        {uploadedImages.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                style={{ maxWidth: '20%', height: '20%', marginRight: '0.5rem' }}
                                                className="sm:max-w-xs sm:h-auto"
                                                alt={`Image ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                )}
                                <label htmlFor="cover-file" className="block text-sm font-medium leading-6 text-gray-900">
                                    File Upload
                                </label>
                                <div>
                                    <label
                                        htmlFor="file-upload"
                                        className="block cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        style={{ display: 'block', padding: '1rem', marginTop: '2rem' }}
                                    >
                                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                            <div className="text-center">
                                                {file ? (
                                                    <div className="mt-4 text-center">
                                                        <img src={file} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                                                        <button onClick={handleFileUpload}>upload</button>
                                                        <button onClick={handleFileUploadCancel}>cancel</button>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <IoCloudUploadOutline className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                            <span>Upload a file</span>
                                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} ref={fileInputRef} />
                                                        </div>
                                                        <p className="text-xs leading-5 text-gray-600">PDF,XML up to 10MB</p>
                                                        <p className="pl-1">or drag and drop</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </label>
                                </div>
                                <div>
                                    <p>Uploaded files</p>
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="about"
                                        name="about"
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Community;