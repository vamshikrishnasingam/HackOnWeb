import { useEffect, useState } from "react";

function HackathonsCommunity() {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [likes, setLikes] = useState({});
    const [posts, setPosts] = useState([]);
    const id = "asjlidfnvjd90erfsdasxz235kdjf";

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`https://localhost:7151/api/Hackathons/GetCommunityDetails?id=${id}`, {
                    method: 'GET'
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                console.log(data)
                setPosts([data, data, data]);
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDetails();

    }, []);

    // Extract unique team names from posts
    useEffect(() => {
        const fn = () => {
            // Extract all team names from posts
                const allTeams = posts.map(post => post.communityName);
                setTeams(allTeams);
            console.log(allTeams);
        }
        if(posts.length>0)fn();

    }, [posts]);

    const handleShowPosts = (team) => {
        setSelectedTeam(team);
    };

    const handleLikeDislike = (team, action) => {
        setLikes(prevLikes => ({
            ...prevLikes,
            [team]: action === 'like' ? (prevLikes[team] || 0) + 1 : (prevLikes[team] || 0) - 1
        }));
    };

    return (
        <div className="flex justify-center">
            <div className="w-1/4">
                <h1 className="text-3xl text-center m-10">Teams</h1>
                <ul>
                    {teams.map((team, index) => (
                        <li key={index} className="cursor-pointer" onClick={() => handleShowPosts(team)}>{team}</li>
                    ))}
                </ul>
            </div>
            <div className="w-3/4">
                <h1 className="text-3xl text-center m-10">Community Details</h1>
                {selectedTeam && (
                    <div className="flex">
                        <div className="w-1/2 pr-4">
                            <h2>{selectedTeam}</h2>
                            <div>
                                {posts
                                    .filter(post => post.communityName === selectedTeam)
                                    .map((post, index) => (
                                        <div key={index}>
                                            {post.posts.map((data, ind) => (
                                                <div key={ind}>
                                                    {/* Render post content here */}
                                                    {/* For example, render an image */}
                                                    <img className="" src={data.uri} alt="" />
                                                    <button onClick={() => handleLikeDislike(selectedTeam, 'like')}>Like</button>
                                                    <button onClick={() => handleLikeDislike(selectedTeam, 'dislike')}>Dislike</button>
                                                    <span>Likes: {likes[selectedTeam] || 0}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ))}

                            </div>
                        </div>
                        <div className="w-1/2 pl-4">
                            <h2>Comments</h2>
                            {/* Add your comments component here */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HackathonsCommunity;
