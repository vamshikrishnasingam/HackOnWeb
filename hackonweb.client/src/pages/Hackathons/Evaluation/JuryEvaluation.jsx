import React, { useState, useEffect } from "react";
import axios from "axios";
import "./JuryEvaluation.css";

// Component to view the file using Google Docs Viewer
function GoogleDocsViewer({ fileUrl }) {
    return (
        <iframe
            src={`https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`}
            width="100%"
            height="350px"
            title="Google Docs Viewer"
        />
    );
}

function JuryEvaluation() {
    const [files, setFiles] = useState([]); // Initialize as an empty array
    const [selectedFile, setSelectedFile] = useState(null);
    const [summary, setSummary] = useState("");

    // Fetch files
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get("https://localhost:7151/api/Hackathons/ListFiles");
                // Check if response contains files array
                if (response.data && Array.isArray(response.data.files)) {
                    setFiles(response.data.files);
                    console.log(response.data)
                } else {
                    console.error("Invalid response structure:", response.data);
                    setFiles(response.data); // Fallback to empty array
                }
            } catch (error) {
                console.error("Error fetching files:", error);
                // Fallback to dummy data in case of an error
                setFiles([
                    { id: 1, url: "https://fileblob1421.blob.core.windows.net/files/5c728ef5-2bc3-455b-987a-67a0a6569892.pptx", name: "TeamAlpha.pptx" },
                    { id: 2, url: "http://example.com/TeamBeta.pptx", name: "TeamBeta.pptx" },
                    { id: 3, url: "http://example.com/TeamGamma.pptx", name: "TeamGamma.pptx" },
                ]);
            }
        };
        fetchFiles();
    }, []);

    // Handle file selection
    const handleFileClick = (file) => {
        setSelectedFile(file);
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
        if (!selectedFile) {
            alert("No file available for summarization!");
            return;
        }

        try {
            // Convert URL to File
            const file = await urlToFile(selectedFile.uri, selectedFile.name);

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

    return (
        <div className="min-h-screen flex bg-gray-100">
            <aside className="bg-white shadow-lg rounded-lg p-4 w-1/4">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Files</h1>
                <ul className="text-dark">
                    {files ? (
                        files.map((file) => (
                            <li
                                key={file.id}
                                className={`cursor-pointer text-dark py-2 px-4 mb-2 rounded-lg ${selectedFile?.id === file.id ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
                                onClick={() => handleFileClick(file)}
                            >
                                {file.uri}
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-600">No files available.</li>
                    )}
                </ul>
            </aside>
            <main className="flex-grow p-8 flex flex-col items-center">
                {selectedFile ? (
                    <div className="bg-white shadow-lg rounded-lg p-8 w-full">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedFile.name}</h2>
                        {selectedFile.uri ? (
                            <div>
                                <GoogleDocsViewer fileUrl={selectedFile.uri} />
                                <button
                                    onClick={handleSummarize}
                                    className="w-full py-2 px-4 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Summarize
                                </button>
                                {summary && (
                                    <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-inner">
                                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Summary</h3>
                                        <p className="text-gray-600">{summary}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="text-gray-600">No file available.</p>
                        )}
                    </div>
                ) : (
                    <p className="text-gray-600">Select a file to view and summarize.</p>
                )}
            </main>
        </div>
    );
}

export default JuryEvaluation;
