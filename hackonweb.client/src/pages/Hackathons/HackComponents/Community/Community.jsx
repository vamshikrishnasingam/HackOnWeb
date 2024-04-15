/* eslint-disable no-unused-vars */
import { React, useRef, useEffect, useState } from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { OverlayTrigger, Tooltip, Button, Form, InputGroup } from 'react-bootstrap';
import Switch from '@mui/material/Switch';
import { IoCloudUploadOutline } from "react-icons/io5";
import axios from 'axios';
import './Community.css';

function Community() {
    const teamName = "PHOENIX";
    const [communityDetails, setCommunityDetails] = useState(null);
    const [image, setImage] = useState(null);
    const [githubLink, setGithubLink] = useState('');
    const [appLink, setAppLink] = useState('');
    const [description, setDescription] = useState('');
    const [readerImage, setReaderImage] = useState(null);
    const [readerFile1, setReaderFile1] = useState(null);
    const [readerFile2, setReaderFile2] = useState(null);
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const imageInputRef = useRef(null);
    const fileInputRef1 = useRef(null);
    const fileInputRef2 = useRef(null);
    const [showImages, setShowImages] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [visibility, setVisibility] = useState(false);

    useEffect(() => {
        GetCommunityDetails();
        console.log(communityDetails);
    }, []);

    const GetCommunityDetails = async () => {
        try {
            const Id = "asjlidfnvjd90erfsdasxz235kdjf";
            const response = await axios.get(`https://localhost:7151/api/Hackathons/GetCommunityDetails?Id=${Id}`);
            if (response.data!==null) {
                setCommunityDetails(response.data);
                setUploadedImages(response.data.posts);
                setUploadedFiles(response.data.files);
                setAppLink(response.data.appLink);
                setGithubLink(response.data.githubLink);
                setDescription(response.data.description);
                setVisibility(response.data.visibility);
            }
            console.log(uploadedImages);
            console.log('Data fetched successfully:', communityDetails);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    //IMAGE RELATED FUNCTIONS

    const callShowImages = (event) => {
        event.preventDefault();
        setShowImages(!showImages)
    }

    const handleImageChange = (e) => {
        e.preventDefault()
        const img = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(img);
            setReaderImage(reader.result)
        };
        if (img) {
            reader.readAsDataURL(img);
        }
    };

    const handleImageUpload = async () => {
        event.preventDefault();
        if (!image) {
            console.error('No image selected');
            return;
        };
        // Create FormData object
        const fd = new FormData();
        fd.append('file', image); // 'file' should match the parameter name in your backend controller
        try {
            // Send POST request to upload file
           const response = await fetch('https://localhost:7151/api/Hackathons/UploadFile', {
                method: 'POST',
                body: fd
            });
            let data = await response.json();

            console.log('Image uploaded successfully:', data.blob.fileName);
            // Once the image is uploaded, update the community details
            const updatedPosts = [...uploadedImages, data.blob];
            const updatedDetails = { ...communityDetails, posts: updatedPosts };
            const response2 = await fetch('https://localhost:7151/api/Hackathons/UpdateCommunityDetails', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json' // Set the content type
                },
                body: JSON.stringify(updatedDetails)
            });
            await GetCommunityDetails();
        } catch (error) {
            console.error('Error uploading post image:', error);
        }
        setImage(null);
        setReaderImage(null);
    };

    const handleImageUploadCancel = () => {
        event.preventDefault();
        setImage(null);
        setReaderImage(null); 
        imageInputRef.current = null;
    };

    //FILE RELATED FUNCTIONS

    const handleFileChange1 = (e) => {
        e.preventDefault()
        const files = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setReaderFile1(reader.result);
            setFile1(files)
        };
        if (files) {
            reader.readAsDataURL(files);
        }
    };
    const handleFileChange2 = (e) => {
        e.preventDefault()
        const files = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setReaderFile2(reader.result);
            setFile2(files)
        };
        if (files) {
            reader.readAsDataURL(files);
        }
    };

    const handleFileUpload1 = async() => {
        event.preventDefault();
        if (!file1) {
            console.error('No file1 selected');
            return;
        }
        //upload image to database
        //localStorage.setItem(`uploadedImage${uploadedImages.length + 1}`, image);
        // Create FormData object
        const fd = new FormData();
        fd.append('file', file1); // 'file' should match the parameter name in your backend controller
        try {
            // Send POST request to upload file
            const response = await fetch('https://localhost:7151/api/Hackathons/UploadFile', {
                method: 'POST',
                body: fd
            });
            let data = await response.json();

            console.log('File1 uploaded successfully:', data.blob.fileName);
            // Once the image is uploaded, update the community details
            const updatedFiles = [...uploadedFiles, data.blob];
            const updatedDetails = { ...communityDetails, files: updatedFiles };
            const response2 = await fetch('https://localhost:7151/api/Hackathons/UpdateCommunityDetails', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json' // Set the content type
                },
                body: JSON.stringify(updatedDetails)
            });
            await GetCommunityDetails();
        } catch (error) {
            console.error('Error uploading file1:', error);
        }
        setFile1(null);
        setReaderFile1(null);
    };
    const handleFileUpload2 = async() => {
        event.preventDefault();
        if (!file2) {
            console.error('No file2 selected');
            return;
        }
        // Create FormData object
        const fd = new FormData();
        fd.append('file', file2); // 'file' should match the parameter name in your backend controller
        try {
            // Send POST request to upload file
            const response = await fetch('https://localhost:7151/api/Hackathons/UploadFile', {
                method: 'POST',
                body: fd
            });
            let data = await response.json();

            console.log('File2 uploaded successfully:', data.blob.fileName);
            // Once the image is uploaded, update the community details
            const updatedFiles = [...uploadedFiles, data.blob];
            const updatedDetails = { ...communityDetails, files: updatedFiles };
            const response2 = await fetch('https://localhost:7151/api/Hackathons/UpdateCommunityDetails', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json' // Set the content type
                },
                body: JSON.stringify(updatedDetails)
            });
            await GetCommunityDetails();
        } catch (error) {
            console.error('Error uploading file2:', error);
        }
        setFile2(null);
        setReaderFile2(null);
    };
    const handleFileUploadCancel1 = () => {
        event.preventDefault()
        setFile1(null);
        setReaderFile1(null);
        fileInputRef1.current = null;
    };
    const handleFileUploadCancel2 = () => {
        event.preventDefault()
        setFile2(null);
        setReaderFile2(null);
        fileInputRef2.current = null;
    };

    ///OTHER FUNCTIONS

    const handleClickButton = async (event) => {
        try {
            const response = await axios.get('http://localhost:5014/api/Hackathons/GetAllUsers');
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const UpdateCommDetails = async (updatedDetails) => {
        await fetch('https://localhost:7151/api/Hackathons/UpdateCommunityDetails', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' // Set the content type
            },
            body: JSON.stringify(updatedDetails)
        });
    };
    const handleChangeVisibility = async () => {
        try {
            const updatedDetails = { ...communityDetails, visibility: !visibility }; // Update the community details with the new visibility value
            await UpdateCommDetails(updatedDetails); // Call the function to update community details
            await GetCommunityDetails(); // Refresh community details
        } catch (error) {
            console.error('Error updating visibility:', error);
        }
    };

    // Function to handle changes in githubLink input
    const handleGithubLinkChange = (e) => {
        e.preventDefault();
        setGithubLink(e.target.value);
    };

    const handleGithubLinkSubmit = async() => {
        event.preventDefault();
        try {
            // Once the image is uploaded, update the community details
            const updatedDetails = { ...communityDetails, githubLink: githubLink };
            await UpdateCommDetails(updatedDetails);
            await GetCommunityDetails();
        } catch (error) {
            console.error('Error changing github link:', error);
        }
    };

    // Function to handle changes in appLink input
    const handleAppLinkChange = (e) => {
        e.preventDefault();
        setAppLink(e.target.value);
    };
    const handleAppLinkSubmit = async() => {
        event.preventDefault();
        try {
            // Once the image is uploaded, update the community details
            const updatedDetails = { ...communityDetails, appLink: appLink };
            await UpdateCommDetails(updatedDetails);
            await GetCommunityDetails();
        } catch (error) {
            console.error('Error changing app link:', error);
        }
    };

    const handleDescriptionChange = (e) => {
        e.preventDefault();
        setDescription(e.target.value);
    };

    const handleDescriptionSubmit = async () => {
        event.preventDefault();
        try {
            // Once the image is uploaded, update the community details
            const updatedDetails = { ...communityDetails, description: description };
            await UpdateCommDetails(updatedDetails);
            await GetCommunityDetails();
        } catch (error) {
            console.error('Error changing app link:', error);
        }
    };

    const handleDescriptionCancel = async () => {
        event.preventDefault();
        setDescription(communityDetails.description);
    }

    return (
        <div className="">
            <form className="p-10">
                <div className="">
                    <div className="">
                        <div className="profile">
                            <h2 className="mb-2 font-bold text">{teamName}</h2>
                            <div className="mx-auto text-m">
                                Welcome to your team page...!!
                                <br />
                                This information will be posted on your community so be careful what you share.
                                <br />
                                <p>Make Public
                                    <Switch
                                        label="Public"
                                        checked={visibility}
                                        onChange={handleChangeVisibility}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1">
                            <div className="col-span-full">
                                <h4 className="heading" id="posts">POST YOUR THOUGHTS</h4>
                                <div className="posts flex justify-center border border-gray-900 px-5 py-5">
                                    <label
                                        htmlFor="image-upload"
                                        className="block cursor-pointer  font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        style={{ display: 'block', padding: '10px' }}
                                    >
                                        <div className="text-center">
                                            {image ? (
                                                <div className="mt-4 text-center">
                                                    <img src={readerImage} style={{ maxWidth: '100%', maxHeight: '300px' }} alt="Preview" />
                                                    <button onClick={handleImageUpload}>Upload</button>
                                                    <button onClick={handleImageUploadCancel}>Cancel</button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <PhotoIcon className="mx-auto h-20 w-12 text-gray-300" aria-hidden="true" />
                                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                        <span>Upload a file</span>
                                                        <input
                                                            id="image-upload"
                                                            name="image-upload"
                                                            type="file"
                                                            className="sr-only"
                                                            onChange={handleImageChange}
                                                            ref={imageInputRef}
                                                        />
                                                    </div>
                                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                            )}
                                        </div>
                                    </label>
                                </div>
                                <button className="show" onClick={callShowImages}>Show Posts</button>
                                {showImages === true && (
                                    <div className="mt-3 sm:flex sm:overflow-x-auto">
                                        {uploadedImages.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image.uri}
                                                style={{ maxWidth: '20%', height: '20%', marginRight: '0.5rem' }}
                                                className="sm:max-w-xs sm:h-auto"
                                                alt={`Image ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                )}
                                <h4 className="heading" id="files">UPLOAD FILES & LINKS</h4>
                                <div className=" mt-2 grid gap-4 grid-cols-2" style={{ gridTemplateColumns: '1fr 3fr' }}>
                                    {/* first 2 pdfs */}
                                    <div className="flex justify-start gap-5">
                                        {/* First File Upload */}
                                        <div>
                                            <label
                                                htmlFor="file-upload-1"
                                                className="block cursor-pointer  bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <div className="files flex justify-center" style={{ width: '100px', height: '100px' }}>
                                                    <div className="text-center" style={{ width: '100%', height: '100%' }}>
                                                        <div className="flex items-center justify-center h-full">
                                                            {file1 ?
                                                                <div className="mt-4 text-center">
                                                                    <button onClick={handleFileUpload1}>&#x2713;</button>
                                                                    <button onClick={handleFileUploadCancel1}>O</button>
                                                                </div>    
                                                                :
                                                                <div>
                                                                    <IoCloudUploadOutline className="text-2xl text-gray-900" />
                                                                    < input id="file-upload-1" name="file-upload" type="file" className="sr-only" onChange={handleFileChange1} ref={fileInputRef1} />
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                        {/* Second File Upload */}
                                        <div>
                                            <label
                                                htmlFor="file-upload-2"
                                                className="block cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <div className="files flex justify-center" style={{ width: '100px', height: '100px' }}>
                                                    <div className="text-center" style={{ width: '100%', height: '100%' }}>
                                                        <div className="flex items-center justify-center h-full">
                                                            {file2 ?
                                                                <div className="mt-4 text-center">
                                                                    <button onClick={handleFileUpload2}>&#x2713;</button>
                                                                    <button onClick={handleFileUploadCancel2}>O</button>
                                                                </div>
                                                                :
                                                                <div>
                                                                    <IoCloudUploadOutline className="text-2xl text-gray-900" />
                                                                    < input id="file-upload-2" name="file-upload" type="file" className="sr-only" onChange={handleFileChange2} ref={fileInputRef2} />
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    {/*end of first 2 pdfs */}
                                    <div className="grid grid-rows-2 gap-1">
                                        <div className="linkbox flex  bg-white pl-2">
                                            <input
                                                type="text"
                                                className="w-full outline-none"
                                                value={githubLink} // Bind value to state variable
                                                onChange={handleGithubLinkChange} // Call function on change
                                            />
                                            <div className="">
                                                <button className="flex buttonlink" onClick={handleGithubLinkSubmit}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" h-7">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                                    </svg>
                                                    upload
                                                </button>
                                            </div>
                                        </div>
                                        <div className="linkbox flex  bg-white pl-2">
                                            <input
                                                type="text"
                                                className="w-full outline-none"
                                                value={appLink} // Bind value to state variable
                                                onChange={handleAppLinkChange} // Call function on change
                                            />
                                            <div>
                                                <button className="flex buttonlink" onClick={handleAppLinkSubmit}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7">
                                                        <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 0 1 .878.645 49.17 49.17 0 0 1 .376 5.452.657.657 0 0 1-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 0 0-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 0 1-.595 4.845.75.75 0 0 1-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 0 1-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 0 1-.658.643 49.118 49.118 0 0 1-4.708-.36.75.75 0 0 1-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 0 0 5.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 0 0 .659-.663 47.703 47.703 0 0 0-.31-4.82.75.75 0 0 1 .83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 0 0 .657-.642Z" />
                                                    </svg>
                                                    upload
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                </div>
                            </div>
                            <div className="col-span-full">
                                <h4 className="heading" id="desc">DESCRIPTION</h4>
                                <div className="">
                                    <textarea
                                        id="about"
                                        name="about"
                                        rows={5}
                                        placeholder="Describe your project"
                                        className="desc  block w-full p-1 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={description} // Bind value to state variable
                                        onChange={handleDescriptionChange} // Call function on change
                                    />
                                    {communityDetails!==null && description !== communityDetails.description && (<div className="mt-4 text-center">
                                        <button onClick={handleDescriptionSubmit}>&#x2713;</button>
                                        <button onClick={handleDescriptionCancel}>O</button>
                                    </div>)}
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