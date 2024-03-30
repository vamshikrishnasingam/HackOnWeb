import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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

    const getComments = () => {
        //retreive comments from db
    }
    const comments = [
        {
            author: 'Shashi',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        },
        {
            author: 'Pasha',
            content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
           
        },
    ]

    const mentors = [
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
    ]

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
    ]

    return (
        <div className="bg-white py-24 sm:py-32 flex flex-col">
            {/*  likes component  */}
            <h4 className="text-black font-bold mb-4 mt-0">VOTES</h4>
            <div className="flex gap-4 items-center">
                <div className="flex justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500">
                    LIKES: {likeCount}
                </div>
                <div className="flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500">
                    DISLIKES: {dislikeCount}
                </div>
            </div>
            {/* mentors component  */}
            <h4 className="text-black font-bold mb-4 pt-2">MENTORS :</h4>
                <TableContainer component={Paper}>
                    <Table sx={{ maxWidth:400 }} aria-label="simple table">
                        <TableBody>
                            {mentors.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={row.imageUrl} alt="" />
                                    </TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{row.role}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
            </TableContainer>
            {/* teams component  */}
            <h4 className="text-black font-bold mb-4 pt-2">TEAM MEMBERS :</h4>
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 400 }} aria-label="simple table">
                    <TableBody>
                        {people.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={row.imageUrl} alt="" />
                                </TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.role}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* comments component  */}
            <div>
                <h2 className="text-xl font-bold mb-4">Comments</h2>
                {comments.length > 0 ? (
                    <div className="border border-gray-200 rounded-lg p-4 mb-4">
                        {comments.map((comment, index) => (
                            <div key={index}>
                                <p className="text-gray-700 font-semibold">{comment.author}</p>
                                <p className="text-gray-600">{comment.content}</p>
                                {index !== comments.length - 1 && <hr className="my-4 border-gray-200" />}
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