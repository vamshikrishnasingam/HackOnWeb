import React, { useState,useEffect } from 'react';
import './Community2.css';
import axios from 'axios';
export default function Community2({ mainCommunityDetails, sendDataToParent }) {
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDisLikeCount] = useState(0);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const response = mainCommunityDetails;
        if (response !== null) {
            console.log(response);
            setLikeCount(response.likes);
            setDisLikeCount(response.disLikes);
            setComments(response.comments);
        }
    }, [mainCommunityDetails]);

    const getComments = () => {
        //retreive comments from db
    }


    const mentors = [
        {
            name: 'Shashi',
            role: 'Co-Founder / CEO',
            imageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            },
        {
            name: 'Pasha',
            role: 'Co-Founder / CEO',
            imageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

            },
    ]

    const people = [
        {
            name: 'Shashi',
            role: 'team lead',
            imageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

            },
        {
            name: 'Pasha',
            role: 'frontend',
            imageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

        },
        {
            name: 'Vamshi',
            role: 'backend',
            imageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

          },
        {
            name: 'Charan',
            role: 'tester',
            imageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

        },
    ]

    return (
        <div className="sm:py-8 px-3 flex flex-col">
            {/* teams component  */}
            <h4 className="heading" id="members">TEAM MEMBERS :</h4>
            <section className="members">
                <div className="mx-auto">
                    <div className="max-w-full">
                        <table className="w-full table-auto">
                            <tbody>
                                {people.map((row, index) => (
                                    <tr key={index}>
                                        <td><img className="h-12 w-12  flex-none rounded-full" src={row.imageUrl} alt="" /></td>
                                        <td>{row.name}</td>
                                        <td>{row.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            {/* mentors component  */}
            <h4 className="heading" id="mentors">MENTORS :</h4>
            <section className="mentors">
                <div className="mx-auto">
                    <div className="max-w-full">
                        <table className="w-full table-auto">
                            <tbody>
                                {mentors.map((row, index) => (
                                    <tr key={index}>
                                        <td><img className="h-12 w-12  flex-none rounded-full" src={row.imageUrl} alt="" /></td>
                                        <td>{row.name}</td>
                                        <td>{row.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            {/*  likes component  */}
            <div className="flex gap-4 items-center mt-4">
                <h4 className="votes">VOTES :</h4>
                <div className="flex justify-center rounded-md bg-white px-3 py-2 border border-success font-bold text-success">
                    LIKES: <p className="text-black pl-2">{likeCount}</p>
                </div>
                <div className="flex justify-center rounded-md bg-white px-3 py-2 border border-danger font-bold text-danger">
                    DISLIKES: <p className="text-black pl-2">{dislikeCount}</p>
                </div>
            </div>

            {/* comments component  */}
            <div>
                <h2 className="heading" id="comments">COMMENTS</h2>
                {comments.length > 0 ? (
                    <div className="comments">
                        {comments.map((comment, index) => (
                            <div key={index}>
                                <p className="comments_header">{comment.userName}</p>
                                <p className="comments_content">{comment.comment}</p>
                                {index !== comments.length - 1 && <hr className="my-2 border-gray-200" />}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No comments yet</p>
                )}
            </div>

        </div>
    )
}