/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { loginContext } from '../../../contexts/loginContext';
import axios from 'axios';
const HackSubmissions = () => {
    const [
        currentUser,
        loginUser,
        userLoginStatus,
        loginErr,
        logoutUser,
        verified,
        teams,
        fetchTeams
    ] = useContext(loginContext);

    const [uploadedIdeaFile, setUploadedIdeaFile] = useState(null);
    const [uploadedHackathonPpt, setUploadedHackathonPpt] = useState(null);
    const [uploadedVideo, setUploadedVideo] = useState(null);
    const [hackathonOnline, setHackathonOnline] = useState(true); // Change this to false for offline
    const hackathon = useSelector(state => state.selectedHackathon);
    const [selectedHackathon, setSelectedHackathon] = useState(null);
    const [userTeam, setUserTeam] = useState(null);
    const [activeRound, setActiveRound] = useState('round1');
    const [file, setFile] = useState(null);
    const [summary, setSummary] = useState("");

    const handlePPTChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handlePPTSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please upload a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(
                "http://localhost:5000/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response.data.summary);
            setSummary(response.data.summary);
            const uploadResponse = await fetch('https://localhost:7151/api/Hackathons/UploadFile', {
                method: 'POST',
                body: formData
            });
            let data = await uploadResponse.json();
            console.log(data);
            data.Summary=response.data.summary
            console.log('PPT uploaded successfully:', data.blob.fileName);
            const updatedTeam = { ...userTeam, IdeaSubmission: data.blob };
            const response2 = await fetch('https://localhost:7151/api/Hackathons/UpdateCommunityDetails', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json' // Set the content type
                },
                body: JSON.stringify(updatedTeam)
            });
            console.log(response2)
        } catch (error) {
            console.error("There was an error uploading the file!", error);
        }
    };
    useEffect(() => {
        if (hackathon) {
            localStorage.setItem('selectedHackathon', JSON.stringify(hackathon));
        }
    }, [hackathon]);

    useEffect(() => {
        const storedHackathon = localStorage.getItem('selectedHackathon');
        if (storedHackathon) {
            const parsedHackathon = JSON.parse(storedHackathon);
            setSelectedHackathon(parsedHackathon);
            setHackathonOnline(parsedHackathon.round3.modeOfHack === 'online');
        }
    }, []);

    useEffect(() => {
        if (currentUser && currentUser.teams) {
            fetchTeams();
            console.log(teams)
            const team = currentUser.teams.find(team => team.hackathonId === selectedHackathon?.id);
            if (team) {
                setUserTeam(team); // Store the team ID in the state
            }
            
        }
        console.log(teams)
    }, [currentUser, teams]);

    const handleFileUpload = (event, setFileFunction) => {
        const file = event.target.files[0];
        setFileFunction(file);
    };

    const handleNavClick = (round) => {
        setActiveRound(round);
    };

    return (
        <div className="bg-gray-100">
            {selectedHackathon ? (
                <div className="w-full flex">
                    <div className="w-1/3 overflow-y-auto c1">
                        {selectedHackathon && (
                            <div>
                                <div className="p-5 bg-white">
                                    <div>
                                        <img src={"https://media.istockphoto.com/id/1189767041/vector/hackathon-signs-round-design-template-thin-line-icon-concept-vector.jpg?s=612x612&w=0&k=20&c=DW-btIjpNjItFfk35N4KvrMkoGoqd1rEPwb_uV9IZEU="}
                                            alt="Hackathon" className="border border-gray-300 p-2 rounded-lg"
                                            style={{ width: '100%', height: '250px' }}
                                        />
                                    </div>
                                    <div>
                                        <div className="ml-4 flex-grow">
                                            <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedHackathon.hackathonName}</h2>
                                            <p className="text-lg text-gray-600"><span className="font-semibold">Organization:</span> {selectedHackathon.organization}</p>
                                            <p className="text-lg text-gray-600"><span className="font-semibold">Venue:</span> {selectedHackathon.round3.venue}</p>
                                            <p className="text-lg text-gray-600"><span className="font-semibold">Mode:</span> {selectedHackathon.round3.modeOfHack}</p>
                                            <p className="text-lg text-gray-600"><span className="font-semibold">Description:</span> {selectedHackathon.hackathonDescription}</p>
                                        </div>
                                        <div className="flex">
                                            <div className="justify-between items-center flex text-lg text-gray-800 m-3">
                                                <div>
                                                    <p className="mb-1"><span className="font-semibold">Start Date:</span></p>
                                                    <p className="text-sm">{selectedHackathon.startDate}</p>
                                                </div>
                                                <div>
                                                    <p className="mb-1"><span className="font-semibold">End Date:</span></p>
                                                    <p className="text-sm">{selectedHackathon.endDate}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className='mt-4 m-4 border-gray-500'></hr>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <button className="text-gray-700 font-bold py-2 px-4 hover:border border-gray-100 bg-gray-100 ease-in-out">
                                                Wishlist
                                            </button>
                                        </div>
                                        <div className="flex items-center border border-1 p-2 rounded-2 bg-gray-100 text-sm">
                                            <p className="text-gray-700">Registration Deadline :</p>
                                            <div>
                                                <p className="text-sm text-gray-600">{selectedHackathon.startDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='p-4 w-2/3 bg-gray-100 overflow-y-auto c1'>
                        <h1 className="text-3xl font-bold mb-6 text-gray-800">Hackathon Rounds</h1>
                        <nav className="mb-4">
                            <div className="flex space-x-4">
                                {selectedHackathon.round1 && (
                                    <button onClick={() => handleNavClick('round1')} className={`px-4 py-2 rounded-lg ${activeRound === 'round1' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-500 hover:text-white transition duration-300`}>
                                        Coding Round
                                    </button>
                                )}
                                {selectedHackathon.round2 && (
                                    <button onClick={() => handleNavClick('round2')} className={`px-4 py-2 rounded-lg ${activeRound === 'round2' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-500 hover:text-white transition duration-300`}>
                                        Idea Submission Round
                                    </button>
                                )}
                                {selectedHackathon.round3 && (
                                    <button onClick={() => handleNavClick('round3')} className={`px-4 py-2 rounded-lg ${activeRound === 'round3' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-500 hover:text-white transition duration-300`}>
                                        Hackathon Round
                                    </button>
                                )}
                            </div>
                        </nav>
                        <div className='scrollable-container'>
                            {activeRound === 'round1' && (
                                <section className="mb-8 bg-white p-6 rounded-lg shadow-md" id="round1">
                                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Round 1: Coding Round</h2>
                                    <p>
                                        <a
                                            href="https://example.com/coding-platform"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 underline"
                                        >
                                            Click here to access the coding platform
                                        </a>
                                    </p>
                                </section>

                            )}
                            {activeRound === 'round2' && (
                                <section className="mb-8 bg-white p-6 rounded-lg shadow-md" id="round2">
                                    {selectedHackathon.round1 ? (<h2 className="text-2xl font-semibold mb-4 text-gray-700">Round 2: Idea Submission Round</h2>) : (
                                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Round 1: Idea Submission Round</h2>)}
                                    
                                    <div className="mb-4">
                                        <form onSubmit={handlePPTSubmit} className="space-y-6">
                                            <input
                                                type="file"
                                                onChange={handlePPTChange}
                                                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                            />
                                            <button
                                                type="submit"
                                                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            >
                                                Upload
                                            </button>
                                        </form>
                                    </div>
                                    {uploadedIdeaFile && (
                                        <div className="mb-4">
                                            <p>Uploaded File: {uploadedIdeaFile.name}</p>
                                        </div>
                                    )}
                                    <div>
                                        {selectedHackathon && selectedHackathon.round2 && (
                                            <p>
                                                <a
                                                    href={selectedHackathon.round2.ProblemStatementsURL}
                                                    download
                                                    className="text-blue-500 underline"
                                                >
                                                    Download previous problem statement details file
                                                </a>
                                            </p>
                                        )}
                                    </div>
                                </section>
                            )}

                            {activeRound === 'round3' && (
                                <section className="mb-8 bg-white p-6 rounded-lg shadow-md" id="round3">
                                    {selectedHackathon.round1 ? (<h2 className="text-2xl font-semibold mb-4 text-gray-700">Round 3: Hackathon Round</h2>)
                                        : (<h2 className="text-2xl font-semibold mb-4 text-gray-700">Round 2: Hackathon Round</h2>)}
                                    {hackathonOnline ? (
                                        <div>
                                            <div className="mb-4">
                                                <label className="block mb-2 font-medium text-gray-700">Upload your PPT: </label>
                                                <input
                                                    type="file"
                                                    accept=".ppt,.pptx"
                                                    onChange={(event) => handleFileUpload(event, setUploadedHackathonPpt)}
                                                    className="block w-full border border-gray-300 rounded-lg p-2"
                                                />
                                            </div>
                                            {uploadedHackathonPpt && (
                                                <div className="mb-4">
                                                    <p>Uploaded File: {uploadedHackathonPpt.name}</p>
                                                </div>
                                            )}
                                            <div className="mb-4">
                                                <label className="block mb-2 font-medium text-gray-700">Upload your Prototype Video: </label>
                                                <input
                                                    type="file"
                                                    accept="video/*"
                                                    onChange={(event) => handleFileUpload(event, setUploadedVideo)}
                                                    className="block w-full border border-gray-300 rounded-lg p-2"
                                                />
                                            </div>
                                            {uploadedVideo && (
                                                <div className="mb-4">
                                                    <p>Uploaded Video: {uploadedVideo.name}</p>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="text-gray-700">The hackathon will be held offline.</p>
                                            <p className="text-gray-700">Venue: XYZ Convention Center</p>
                                            <p className="text-gray-700">Date: 1st June 2024</p>
                                        </div>
                                    )}
                                </section>
                            )}

                            {userTeam && (
                                <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
                                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Team</h2>
                                    <p className="mb-2 text-gray-700">Team Name: {userTeam.communityName}</p>
                                    <p className="text-gray-700">Members:</p>
                                    <ul className="list-disc list-inside text-gray-700">
                                        {userTeam.members.map(member => (
                                            <li key={member}>{member}</li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                        </div>
                    </div>

                </div>
            ):(<>
            </>)}            
        </div>
    );
};

export default HackSubmissions;
