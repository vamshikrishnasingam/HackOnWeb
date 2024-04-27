import { useEffect, useState } from "react";

function HackathonsCommunity() {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [likes, setLikes] = useState({});
    const [posts, setPosts] = useState([]);
    const [commentInput, setCommentInput] = useState("");
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);


    //intital fetching of the data to show
    //need to change the fetching function based on hackathonid
    const fetchDetails = async () => {
        try {
            const response = await fetch(`https://localhost:7151/api/Hackathons/GetAllCommunityDetails
`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setPosts(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    useEffect(() => {
        const fn = () => {
            // Extract  team names from posts
            const allTeams = posts.map(post => post.communityName);
            setTeams(allTeams);
            console.log(allTeams);
        }
        if (posts.length > 0) fn();
    }, [posts]);


    

    const handleShowPosts = (team) => {
        setSelectedTeam(team);
    };

    //completely done with liking and disliking functions for an user for fetching to updating
    const handleLikeDislike = async(post,action) => {
        let updatedDetails;
        if (action === 'like') {
            if (liked === false) {
                updatedDetails = { ...post, likes: post.likes + 1 };
                post.likes += 1;
                setLiked(true);
                if (disliked === true)
                    updatedDetails = { ...updatedDetails, disLikes: post.disLikes - 1 };
                post.disLikes -= 1;
                setDisliked(false);
            }
            else {
                console.log('already liked');
            }
        }
        else {
            if (disliked === false) {
                updatedDetails = { ...post, disLikes: post.disLikes + 1 };
                post.disLikes += 1;
                setDisliked(true);
                if (liked === true) {
                    updatedDetails = { ...updatedDetails, likes: post.likes - 1 };
                    post.likes -= 1;
                    setLiked(false);
                }
            }
            else {
                console.log('already disliked');
            }
            
        }
        const response2 = await fetch('https://localhost:7151/api/Hackathons/UpdateCommunityDetails', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' // Set the content type
            },
            body: JSON.stringify(updatedDetails)
        });
        console.log(response2);

    };
    const handleCommentChange = () => {
        setCommentInput(event.target.value);
    };
    const handleCommentSubmit = async(post) => {
        // Check if the user has already commented
        const comments_ = post.comments;    
        const obj = {
            userId: 'userdummy',
            userName: 'big dummy',
            comment: commentInput
        }
        comments_.push(obj);
        const updatedDetails = { ...post, comments: comments_ };
        console.log(posts, updatedDetails);
        const response2 = await fetch('https://localhost:7151/api/Hackathons/UpdateCommunityDetails', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' // Set the content type
            },
            body: JSON.stringify(updatedDetails)
        });
        fetchDetails();

    };

    return (
        <div className="flex justify-center">
            <div className="w-1/5 overflow-y-auto c1 overflow-hidden">
                <h1 className="text-3xl text-center m-10">Teams</h1>
                <div className="w-100 text-center">
                    <ul className='m-2'>
                        {teams.map((team, index) => (
                            <li key={index} className="cursor-pointer text-xl capitalize m-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" role="button" onClick={() => handleShowPosts(team)}>{team}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="w-3/4 overflow-y-auto c1 overflow-hidden">
                <h1 className="text-3xl text-center m-10">Community Details</h1>
                {selectedTeam && (
                    <div>
                        <h2 className="text-3xl text-center mb-4 capitalize">{selectedTeam}</h2>

                        <div className="flex">
                            <div className="w-1/2 pr-4  overflow-y-auto c1 overflow-hidden">
                                <div>
                                    {posts
                                        .filter(post => post.communityName === selectedTeam)
                                        .map((post, index) => (
                                            <div key={index}>
                                                {post.posts.map((data, ind) => (
                                                    <div key={ind}>
                                                        <img className="" src={data.uri} alt="" />
                                                        <br />
                                                    </div>
                                                ))}
                                            </div>
                                        ))}

                                </div>
                            </div>
                            <div className="w-1/2 pl-4 overflow-y-auto relative c2">
                                {posts
                                    .filter(post => post.communityName === selectedTeam)
                                    .map((post, index) => (
                                        <>
                                            <div key={index}>
                                                <button onClick={() => handleLikeDislike(post, 'like')} >Like  :  <span>{post.likes}</span></button>
                                                <button onClick={() => handleLikeDislike(post, 'dislike')} >Dislike :  <span>{post.disLikes}</span></button>
                                            </div>
                                            <h1>Comments</h1>
                                            <div key={index}>
                                                <textarea
                                                    value={commentInput}
                                                    onChange={() => handleCommentChange()}
                                                    style={{ width: '35vw', height: '100px' }} // Adjust the width and height as needed
                                                />
                                                <button onClick={() => handleCommentSubmit(post)}>Submit Comment</button>
                                            </div>
                                            <div key={index}>
                                                {post.comments.map((data, ind) => (
                                                    <div key={ind}>
                                                        <h3>{data.userName}</h3>
                                                        <p>{data.comment}</p>
                                                    </div>
                                                ))}
                                            </div>

                                        </>
                                    ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HackathonsCommunity;
