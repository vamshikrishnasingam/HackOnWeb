import React, { useState, useEffect } from "react";
import axios from "axios";
import "./JuryEvaluation.css";

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

function JuryEvaluation() {
    const [teamsData, setTeamsData] = useState([]); // Initialize as an empty array
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [summary, setSummary] = useState("");


    // Fetch files
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get("https://localhost:7151/api/Hackathons/GetAllCommunityDetails");
                // Check if response contains files array
                setTeamsData(response.data);
                console.log(teamsData)
                setSelectedTeam(teamsData[0]);
                console.log(response.data)
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        };
        fetchFiles();
    }, []);

    // Handle file selection
    const handleFileClick = (team) => {
        setSelectedTeam(team);
        setSummary(""); // Clear previous summary
    };

    // Convert the file URL to a File object
    const urlToFile = async (url, fileName) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.blob();
            return new File([data], fileName, { type: data.type });
        } catch (error) {
            console.error("Error converting URL to file:", error);
            throw error;
        }
    };

    // Handle summarization of the selected file
    const handleSummarize = async () => {
        if (!selectedTeam) {
            alert("No file available for summarization!");
            return;
        }

        try {
            // Convert URL to File
            const file = await urlToFile(selectedTeam.uri, selectedTeam.name);

            // Create form data
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post(
                "http://localhost:5000/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setSummary(response.data.summary);
        } catch (error) {
            console.error("Error summarizing the file:", error);
            // Fallback summary
            setSummary("Dummy summary due to error.");
        }
    };

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex bg-gray-100">
            <div className={`bg-gradient-to-r from-gray-800 to-gray-600 text-white flex flex-col justify-between overflow-y-auto c1 ${sidebarOpen ? 'w-64' : 'w-22'} transition-all duration-300`}>
                <div className="p-6">
                    <button
                        onClick={toggleSidebar}
                        className="block w-full text-left text-dark p-2 my-2 rounded hover:bg-gray-700 border border-gray-600"
                    >
                        <i className="fas fa-bars m-2"></i>
                    </button>
                    <div className="text-center mt-6">
                        {teamsData ? (
                            teamsData.map((team) => (
                                <button
                                    key={team.id}
                                    className={`block w-full text-left text-dark p-2 my-2 rounded hover:bg-gray-700 border border-gray-600 ${selectedTeam?.id === team.id ? 'bg-blue-100' : 'hover:bg-gray-200'} ${sidebarOpen ? 'text-dark' : 'text-dark'}`}
                                    onClick={() => handleFileClick(team)}
                                >
                                    <i className="fas fa-user m-2"></i>{sidebarOpen && team.communityName}
                                </button>
                            ))
                        ) : (
                            <li className="text-gray-600">No Data available.</li>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex-1 c1 border rounded-lg p-3 bg-gray-200">
                {selectedTeam ? (
                    <div className="p-8 border rounded-lg bg-white mb-6 shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 m-4">{selectedTeam.communityName}</h2>

                        {selectedTeam.ideaSubmission.uri ? (
                            <div className='flex'>
                                <div className='w-1/2'>{selectedTeam.ideaSubmission.summary && (
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Summary</h3>
                                        <p className="text-gray-600">{selectedTeam.ideaSubmission.summary}</p>
                                    </div>
                                )}</div>
                                <div className='w-1/2 p-4'>
                                    <GoogleDocsViewer fileUrl={selectedTeam.ideaSubmission.uri} />
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-600">No file available.</p>
                        )}
                    </div>
                ) : (
                    <p className="text-gray-600">Select a file to view and summarize.</p>
                )}
            </div>
        </div>
    );
}

export default JuryEvaluation;
