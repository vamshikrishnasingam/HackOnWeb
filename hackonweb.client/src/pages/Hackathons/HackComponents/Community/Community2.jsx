import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Community2.css';
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
            role: 'Co-Founder / CEO',
            imageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

            },
        {
            name: 'Pasha',
            role: 'Co-Founder / CEO',
            imageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

        },
        {
            name: 'Vamshi',
            role: 'Co-Founder / CEO',
            imageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

          },
        {
            name: 'charan',
            role: 'Co-Founder / CEO',
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
            {/*<TableContainer component={Paper} className="mentors">
                <Table sx={{ maxWidth: 400 }} aria-label="simple table">
                    <TableBody className="table_body">
                        {mentors.map((row) => (
                            <TableRow 
                                key={row.name}

                            >
                                <TableCell component="th" scope="row">
                                    <img className="h-12 w-12 flex-none rounded-full" src={row.imageUrl} alt="" />
                                </TableCell>
                                <TableCell className="cell text-violet" align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.role}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>*/}
           

            {/* comments component  */}
            <div>
                <h2 className="heading" id="comments">COMMENTS</h2>
                {comments.length > 0 ? (
                    <div className="comments">
                        {comments.map((comment, index) => (
                            <div key={index}>
                                <p className="comments_header">{comment.author}</p>
                                <p className="comments_content">{comment.content}</p>
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