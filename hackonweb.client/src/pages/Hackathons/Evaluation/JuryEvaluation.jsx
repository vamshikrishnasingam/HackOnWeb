/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

function JuryEvaluation() {
    const [pptFiles, setPPTFiles] = useState([]);
    const [selectedPPT, setSelectedPPT] = useState(null);

    useEffect(() => {
        fetchPPTFiles();
    }, []);

    const fetchPPTFiles = async () => {
        try {
            const response = await axios.get('https://localhost:7151/api/Hackathons/ListFiles');
            console.log('All files:', response.data);
            // Filter out only the PPT files
            const pptFiles = response.data.filter(file => file.uri.endsWith('.ppt') || file.uri.endsWith('.pptx'));
            console.log('PPT files:', pptFiles);
            setPPTFiles(pptFiles);
        } catch (error) {
            console.error('Error fetching PPT files:', error);
        }
    };


    const handlePPTSelect = (ppt) => {
        setSelectedPPT(ppt);
    };

    const summarizePPT = async () => {
        try {
            const response = await axios.post('http://localhost:5000/summarize', { ppt: selectedPPT });
            alert('Summary: ' + response.data.summary);
        } catch (error) {
            console.error('Error summarizing PPT:', error);
        }
    };

    return (
        <div>
            <h2>PPT Viewer</h2>
            <div>
                {pptFiles.map((ppt, index) => (
                    <div key={index}>
                        <button onClick={() => handlePPTSelect(ppt.uri)}>{ppt.uri}</button>
                    </div>
                ))}
            </div>
            {selectedPPT && (
                <div>
                    <h3>Selected PPT: {selectedPPT}</h3>
                    <button onClick={summarizePPT}>Summarize</button>
                </div>
            )}
        </div>
    );
}

export default JuryEvaluation;
*//*





import React, { useState, useEffect } from "react";
import axios from "axios";
function JuryEvaluation() {
    const [pptFiles, setPPTFiles] = useState([]);
    const [selectedPPT, setSelectedPPT] = useState(null);
    const [summary, setSummary] = useState("");

    useEffect(() => {
        fetchPPTFiles();
    }, []);

    const fetchPPTFiles = async () => {
        try {
            const response = await axios.get('https://localhost:7151/api/Hackathons/ListFiles');
            console.log('All files:', response.data);
            // Filter out only the PPT files
            const pptFiles = response.data.filter(file => file.uri.endsWith('.ppt') || file.uri.endsWith('.pptx'));
            console.log('PPT files:', pptFiles);
            setPPTFiles(pptFiles);
        } catch (error) {
            console.error('Error fetching PPT files:', error);
        }
    };


    const handlePPTSelect = (ppt) => {
        setSelectedPPT(ppt);
    };

    const summarizePPT = async () => {
        try {
            const response = await axios.post("http://localhost:5000/summarize", { ppt: selectedPPT });
            console.log(response.data.summary);
            setSummary(response.data.summary);
        } catch (error) {
            console.error("Error summarizing PPT:", error);
        }
    };

    return (
        <div className="FileUpload">
            <h1>Choose a PowerPoint file</h1>
            <div>
                {pptFiles.map((ppt, index) => (
                    <div key={index}>
                        <button onClick={() => handlePPTSelect(ppt)}>{ppt.uri}</button>
                    </div>
                ))}
            </div>
            {selectedPPT && (
                <div>
                    <h2>Selected PPT: {selectedPPT.name}</h2>
                    <button onClick={summarizePPT}>Summarize</button>
                </div>
            )}
            {summary && (
                <div>
                    <h2>Summary</h2>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
}

export default JuryEvaluation;
*/

import React, { useState } from "react";
import axios from "axios";
import "./JuryEvaluation.css";

function JuryEvaluation() {
    const [file, setFile] = useState(null);
    const [summary, setSummary] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
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
        } catch (error) {
            console.error("There was an error uploading the file!", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Upload a PowerPoint file</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Upload
                    </button>
                </form>
                {summary && (
                    <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-inner">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Summary</h2>
                        <p className="text-gray-600">{summary}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default JuryEvaluation;
