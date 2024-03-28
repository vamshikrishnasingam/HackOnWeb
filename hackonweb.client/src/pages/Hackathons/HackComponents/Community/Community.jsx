/* eslint-disable no-unused-vars */
import React from 'react';
import { useEffect, useState } from 'react';
import { PhotoIcon, UserCircleIcon} from '@heroicons/react/24/solid'
import { IoCloudUploadOutline } from "react-icons/io5";

function Community() {
    const hacname = "hackathon";
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);

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
    const handleImageUplaod = () => {
        //uplaod image to database
        setImage(null);
    }
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
    const handleFileUplaod = () => {
        //uplaod image to database
        setFile(null);

    }


    return (
        <div>
            <form>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            This information will be displayed publicly so be careful what you share.
                        </p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Cover photo
                                </label>
                                <div>
                                    <label
                                        htmlFor="file-upload"
                                        className="block cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        style={{ display: 'block', padding: '1rem', marginTop: '2rem' }}
                                    >
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                            <div className="text-center">
                                                {image ? (
                                                    <div className="mt-4 text-center">
                                                        <img src={image} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                                                        <button onClick={handleImageUplaod }>upload</button>
                                                    </div>
                                                ) : (
                                                    <div>
                                                         <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                                         <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                              <span>Upload a file</span>
                                                              <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} />
                                                           </div>
                                                           <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                                           <p className="pl-1">or drag and drop</p>
                                                    </div>                                
                                                ) }
                                            </div>
                                    </div>
                                    </label>
                                </div>

                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
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
                                                        <button onClick={handleFileUplaod}>upload</button>
                                                    </div>
                                                ) : (
                                                        <div>
                                                            <IoCloudUploadOutline className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                            <span>Upload a file</span>
                                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                                                        </div>
                                                        <p className="text-xs leading-5 text-gray-600">PDF,XML up to 10MB</p>
                                                        <p className="pl-1">or drag and drop</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </label>
                                </div>

 
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                    About
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
            </form>


        </div>
            
    );
}

export default Community;