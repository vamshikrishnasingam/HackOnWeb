import { useEffect, useState } from "react";
import './HackathonsCommunity.css';


// Component to view the file using Google Docs Viewer
function GoogleDocsViewer({ fileUrl }) {
    return (
        <iframe
            src={`https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`}
            width="100%"
            height="100%"
            title="Google Docs Viewer"
        />

    );
}
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
            const response = await fetch(`https://localhost:7151/api/Hackathons/GetAllCommunityDetails`,
                {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setPosts(data);
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
            setSelectedTeam(allTeams[0]);
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


    const [sidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex bg-gray-100">
            <div className={`bg-gradient-to-r from-gray-800 to-gray-600 text-white flex flex-col justify-between overflow-y-auto sidec ${sidebarOpen ? 'w-64' : 'w-22'} transition-all duration-300`}>
                <div className="p-6">
                    <button
                        onClick={toggleSidebar}
                        className="block w-full text-left text-dark p-2 my-2 rounded hover:bg-gray-700 border border-gray-600"
                    >
                        <i className="fas fa-bars m-2"></i>
                    </button>
                    <div className="text-center mt-6">
                        {teams.map((team, index) => (
                            <button
                                key={index}
                                className={`block w-full text-left text-dark p-2 my-2 rounded hover:bg-gray-700 border border-gray-600 ${sidebarOpen ? 'text-dark' : 'text-dark'}`}
                                onClick={() => handleShowPosts(team)}
                            >
                                <i className="fas fa-user m-2"></i>{sidebarOpen && team}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex-1">
                {selectedTeam && (
                    <div>
                        <h2 className="text-4xl text-center mb-6 font-bold text-gray-800">{selectedTeam}</h2>
                        <div className="flex">

                            <div className="w-1/2 pr-4 overflow-y-auto sidebar1">
                                <h2 className=" text-center mb-6 font-bold text-gray-800">Posts</h2>
                                {posts
                                    .filter(post => post.communityName === selectedTeam)
                                    .map((post, index) => (
                                        <>
                                            <div key={index} className="mb-6 bg-white p-4 rounded-lg shadow-xl">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {post.posts.map((data, ind) => (
                                                        <div key={ind} className="mb-4">
                                                            <img src={data.uri} alt="" className="w-full h-auto rounded-lg shadow" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className='p-2'>
                                                <h2 className="mb-3">Documents</h2>
                                                <GoogleDocsViewer fileUrl={post.ideaSubmission.uri} />
                                            </div>
                                        </>
                                    ))}
                            </div>
                            <div className="w-1/2 pl-4 overflow-y-auto sidebar1">
                                <h2 className="text-center mb-6 font-bold text-gray-800">Likes and Comments</h2>
                                {posts
                                    .filter(post => post.communityName === selectedTeam)
                                    .map((post, index) => (
                                        <div key={index} className="bg-white p-3 rounded-lg shadow-xl">
                                            <div className="mb-3 flex justify-between">
                                                <button onClick={() => handleLikeDislike(post, 'like')} className="bg-green-500 hover:bg-green-700 text-white font-bold rounded-lg shadow-md">
                                                    Like: <span>{post.likes}</span>
                                                </button>
                                                <button onClick={() => handleLikeDislike(post, 'dislike')} className="bg-red-500 hover:bg-red-700 text-white font-bold p rounded-lg shadow-md">
                                                    Dislike: <span>{post.disLikes}</span>
                                                </button>
                                            </div>
                                            <h1 className="text-2xl font-bold m-2">Comment</h1>
                                            <textarea
                                                value={commentInput}
                                                onChange={handleCommentChange}
                                                className="w-full h-24 p-3 border rounded-lg shadow-sm mb-1"
                                                placeholder="Write your comment..."
                                            />
                                            <button onClick={() => handleCommentSubmit(post)} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md">
                                                Submit Comment
                                            </button>
                                            

                                            <h1 className="text-2xl font-bold m-2">Comments</h1>
                                            <div className="scrollable-container bg-white p-4 rounded-3">
                                                {post.comments.length > 0 ? (
                                                    <div>
                                                        {post.comments.map((data, ind) => (
                                                            <div key={ind} className="mb-4">
                                                                <h3 className="font-bold text-gray-800">{data.userName}</h3>
                                                                <p className="text-gray-600">{data.comment}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-700">No Comments.</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    )

}

export default HackathonsCommunity;
