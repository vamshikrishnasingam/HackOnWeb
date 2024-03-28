import React, { useState } from 'react';
export default function Community2() {
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const handleLike = () => {
        if (!liked && !disliked) {
            setLikeCount(prevCount => prevCount + 1);
            setLiked(true);
        } else if (liked) {
            setLikeCount(prevCount => prevCount - 1);
            setLiked(false);
        } else if (disliked) {
            setLikeCount(prevCount => prevCount + 1);
            setDislikeCount(prevCount => prevCount - 1);
            setLiked(true);
            setDisliked(false);
        }
    };

    const handleDislike = () => {
        if (!liked && !disliked) {
            setDislikeCount(prevCount => prevCount + 1);
            setDisliked(true);
        } else if (disliked) {
            setDislikeCount(prevCount => prevCount - 1);
            setDisliked(false);
        } else if (liked) {
            setLikeCount(prevCount => prevCount - 1);
            setDislikeCount(prevCount => prevCount + 1);
            setLiked(false);
            setDisliked(true);
        }
    };

    const people = [
        {
            name: 'Shashi',
            role: 'Co-Founder / CEO',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            name: 'Pasha',
            role: 'Co-Founder / CEO',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            name: 'Vamshi',
            role: 'Co-Founder / CEO',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            name: 'charan',
            role: 'Co-Founder / CEO',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },

        // More people...
    ]
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our leadership</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim vitae ullamcorper
                        suspendisse.
                    </p>
                </div>
                <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                    {people.map((person) => (
                        <li key={person.name}>
                            <div className="flex items-center gap-x-6">
                                <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" />
                                <div>
                                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                                    <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <h1 className="text-3xl text-black font-bold mb-4">Vote Here</h1>
            <div className="flex gap-4 items-center justify-content-center">
                <button onClick={handleLike} className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${liked && 'opacity-50 cursor-not-allowed'}`}>
                    <i className="far fa-thumbs-up mr-2"></i> Like
                </button>
                <button onClick={handleDislike} className={`bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 ${disliked && 'opacity-50 cursor-not-allowed'}`}>
                    <i className="far fa-thumbs-down mr-2"></i> Dislike
                </button>
                <p className="text-xl text-black  mt-4">Likes: {likeCount}</p>
                <p className="text-xl text-black mt-2">Dislikes: {dislikeCount}</p>
            </div>
           

        </div>
    )
}