import React, { useState, useEffect } from 'react';
function HostHack() {
    const [step, setStep] = useState(1); // Current step
    const [hackathonDetails, setHackathonDetails] = useState({
        HackathonName: '',
        HackathonDescription: '',
        StartDate: '',
        EndDate: '',
        coding: '',
        Organization: '',
        rounds: 3, // Default number of rounds
    });
    const hackModel = {
        "id": "HACK001",
        "hackathonId": "HACK2024",
        "hackathonName": "CodeFest 2024",
        "hackathonDescription": "Join us for an exciting coding competition!",
        "startDate": "2024-05-01",
        "endDate": "2024-05-03",
        "coding": "JavaScript",
        "organization": "TechFest",
        "round1": {
            "round1Name": "Qualification Round",
            "platform": "Codeforces",
            "link": "https://codeforces.com/",
            "codingDate": "2024-05-01",
            "startTime": "09:00 AM",
            "endTime": "12:00 PM"
        },
        "round2": {
            "round2Name": "Semi-final Round",
            "problemStatementsURL": "https://codefest2024/problems",
            "modeOfProblemStatements": "PDF",
            "pptStartDate": "2024-05-02",
            "pptEndDate": "2024-05-02",
            "pptStartTime": "10:00 AM",
            "pptEndTime": "01:00 PM",
            "modeOfSubmission": "Online"
        },
        "round3": {
            "round3Name": "Final Round",
            "discordURL": "https://discord.com/codefest2024",
            "modeOfHack": "Live",
            "hackStartDate": "2024-05-03",
            "hackEndDate": "2024-05-03",
            "hackStartTime": "02:00 PM",
            "hackEndTime": "05:00 PM",
            "venue": "TechFest Auditorium"
        }
    };


    const [roundsData, setRoundsData] = useState([]);
    useEffect(() => {
        setRoundsData(Array.from({ length: hackathonDetails.rounds }, () => ({})));
    }, [hackathonDetails.rounds]);

    const handleSubmitDetails = async() => {
        console.log(hackModel);
        try {
            // Send POST request to upload file
            const response = await fetch('https://localhost:7151/api/Hackathons/UploadHackathonDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(hackModel)
            });
            let data = await response.json();
            console.log('details uploaded succesfully :', data);
            // Once the image is uploaded, update the community details
        } catch (error) {
            console.error('Error uploading:', error);
        }
    }

    const handleChangeHackathonDetails = (e) => {
        const { name, value } = e.target;
        if (name === 'coding') {
            const numRounds = value === 'yes' ? 3 : 2;
            const validNumRounds = Math.min(Math.max(numRounds, 1), 3); // Limit rounds between 1 and 10
            setRoundsData(new Array(validNumRounds).fill({}));
            setHackathonDetails({ ...hackathonDetails, rounds: validNumRounds, [name]: value });
        } else if (name === 'rounds') {
            const validNumRounds = Math.min(Math.max(value, 1), 3); // Limit rounds between 1 and 10
            setRoundsData(new Array(validNumRounds).fill({}));
            setHackathonDetails({ ...hackathonDetails, rounds: validNumRounds });
        } else {
            setHackathonDetails({ ...hackathonDetails, [name]: value });
        }

        // Clear validation error for the current field
        setErrors({ ...errors, [name]: '' });
    };
    // Define handleChangeFile function
   const handleChangeFile = async (e, index) => {
        const file = e.target.files[0];// Get the uploaded file
        const fd = new FormData();
        fd.append('file', file);
        try {
            // Send POST request to upload file
            const response = await fetch('http://localhost:7151/api/Hackathons/UploadFile', {
                method: 'POST',
                body: fd
            });
            let data = await response.json();
            console.log('problem statement file uploaded succesfully :', data.blob);
            const newRoundsData = [...roundsData];
            newRoundsData[index].ProblemStatements = data.blob.uri;
                setRoundsData(newRoundsData);
            // Once the image is uploaded, update the community details
        } catch (error) {
            console.error('Error uploading post image:', error);
        }
        handleChangeRoundDetails(e, step - 2)
    };

    const handleChangeRoundDetails = (e, roundIndex) => {
        const { name, value } = e.target;
        const updatedRoundsData = [...roundsData];
        updatedRoundsData[roundIndex] = { ...updatedRoundsData[roundIndex], [name]: value };
        setRoundsData(updatedRoundsData);

        // Clear validation error for the current field
        setErrors({ ...errors, [name]: '' });
    };
    const [errors, setErrors] = useState({});
    const nextStep = () => {
        // Perform validation before proceeding to the next step
        let hasErrors = false;
        const newErrors = {};

        if (!hackathonDetails.HackathonName) {
            newErrors.HackathonName = 'Hackathon Name is required';
            hasErrors = true;
        }
        if (!hackathonDetails.HackathonDescription) {
            newErrors.HackathonDescription = 'Hackathon Description is required';
            hasErrors = true;
        }
        if (!hackathonDetails.StartDate) {
            newErrors.StartDate = 'Start Date is required';
            hasErrors = true;
        }
        if (!hackathonDetails.EndDate) {
            newErrors.EndDate = 'End Date is required';
            hasErrors = true;
        }
        if (!hackathonDetails.coding) {
            newErrors.coding = 'Coding Round is required';
            hasErrors = true;
        }
        if (!hackathonDetails.organization) {
            newErrors.organization = 'Organization is required';
            hasErrors = true;
        }
        if (step === 2 && hackathonDetails.coding === 'yes') {
            if (!roundsData[step - 2].Round1Name) {
                newErrors.Round1Name = 'Contest Name is required';
                hasErrors = true;
            }
            if (!roundsData[step - 2].platform) {
                newErrors.platform = 'Platform is required';
                hasErrors = true;
            }
            if (!roundsData[step - 2].Link) {
                newErrors.Link = 'Link is required';
                hasErrors = true;
            }
            if (!roundsData[step - 2].CodingDate) {
                newErrors.CodingDate = 'Coding Round Date is required';
                hasErrors = true;
            }
            if (!roundsData[step - 2].StartTime) {
                newErrors.StartTime = 'Start Time is required';
                hasErrors = true;
            }
            if (!roundsData[step - 2].EndTime ){
                newErrors.EndTime = 'End Time is required';
                hasErrors = true;
            }
        }
        if ((step === 3 && hackathonDetails.coding === 'yes') || (step === 2 && hackathonDetails.coding === 'no')) {
            if (!roundsData[step - 2].Round2Name) {
                newErrors.Round2Name = 'Round Name is required';
                hasErrors = true;
            }
            if (!roundsData[step - 2].ProblemStatements) {
                newErrors.ProblemStatements = 'Problem Statements are required';
                hasErrors = true;
            }
            if (!roundsData[step - 2].ModeOfProblemStatements) {
                newErrors.ModeOfProblemStatements = 'Mode Of Problem Statements is required';
                hasErrors = true;
            }
            if (!roundsData[step - 2].ModeOfSubmission) {
                newErrors.ModeOfSubmission = 'Mode Of Submission is required';
                hasErrors = true;
            }
            if (!roundsData[step - 2].PPTStartDate) {
                newErrors.PPTStartDate = 'Start Date is required';
                hasErrors = true;
            }
            if (!roundsData[step - 2].PPTEndDate) {
                newErrors.PPTEndDate = 'End Date is required';
                hasErrors = true;
            }
            if (!roundsData[step - 2].PPTStartTime) {
                newErrors.PPTStartTime = 'Start Time is required';
                hasErrors = true;
            }
            if (!roundsData[step - 2].PPTEndTime) {
                newErrors.PPTEndTime = 'End Time is required';
                hasErrors = true;
            }
        } 
        if ((step === 4 && hackathonDetails.coding === 'yes') || (step === 3 && hackathonDetails.coding === 'no')) {
            if (!roundsData[step - 2].Round3Name) {
                newErrors.Round3Name = 'Round Name is required';
                hasErrors = true;
            }
            if (!roundsData[step - 2].DiscordURL) {
                newErrors.DiscordURL = 'DiscordURL is required';
                hasErrors = true;
            }
            if (!roundsData[step - 2].Venue) {
                newErrors.Venue = 'Venue is required';
                hasErrors = true;
            }
            if (!roundsData[step - 2].ModeOfHack) {
                newErrors.ModeOfHack = 'Mode of Hack is required';
                hasErrors = true;
            }
            if (!roundsData[step - 2].HackStartDate) {
                newErrors.HackStartDate = 'Start Date is required';
                hasErrors = true;
            }
            if (!roundsData[step - 2].HackEndDate) {
                newErrors.HackEndDate = 'End Date is required';
                hasErrors = true;
            }
            if (!roundsData[step - 2].HackStartTime) {
                newErrors.HackStartTime = 'Start Time is required';
                hasErrors = true;
            }
            if (!roundsData[step - 2].HackEndTime) {
                newErrors.HackEndTime = 'End Time is required';
                hasErrors = true;
            }
        }
        hasErrors = false;

        // If there are validation errors, update the errors state and return
        if (hasErrors) {
            setErrors(newErrors);
            console.log(newErrors) 
            return;
        }

        // If no errors, proceed to the next step
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle submission of hackathon details and round details here
        console.log(hackathonDetails)
        console.log(roundsData);
        
    };
    const renderNestedObject = (obj) => {
        return Object.entries(obj).map(([key, value], index) => (
            <div key={index}>
                <p>{key} :</p>
                {typeof value === 'object' ? (
                    <div style={{ marginLeft: '20px' }}>
                        {renderNestedObject(value)}
                    </div>
                ) : (
                    <p style={{ marginLeft: '20px' }}>{value}</p>
                )}
            </div>
        ));
    };

    return (
        <div className="">
            <div className="p-4">
                <h2 className="text-6xl font-bold mb-4 text-center text-blue-900">Hackathon Details</h2>
                <form onSubmit={handleSubmit} className="w-1/2 mx-auto">
                    {step === 1 && (
                        <div>
                            <div className="mb-5">
                                <label htmlFor="HackathonName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Hackathon Name
                                </label>
                                <input
                                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.HackathonName && 'border-red-500'}`}
                                    id="HackathonName"
                                    type="text"
                                    placeholder="Enter Hackathon Name"
                                    name="HackathonName"
                                    value={hackathonDetails.HackathonName}
                                    onChange={handleChangeHackathonDetails}
                                />
                                {errors.HackathonName && <p className="text-red-500 text-sm mt-1">{errors.HackathonName}</p>}
                            </div>
                            <div className="mb-5">
                                <label htmlFor="HackathonDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Hackathon Description
                                </label>
                                <textarea
                                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.HackathonDescription && 'border-red-500'}`}
                                    id="HackathonDescription"
                                    placeholder="Enter Hackathon Description"
                                    name="HackathonDescription"
                                    value={hackathonDetails.HackathonDescription}
                                    onChange={handleChangeHackathonDetails}
                                />
                                {errors.HackathonDescription && <p className="text-red-500 text-sm mt-1">{errors.HackathonDescription}</p>}
                            </div>
                            <div className="mb-5 flex space-x-4">
                                <div className="w-1/2">
                                    <label htmlFor="StartDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Start Date
                                    </label>
                                    <input
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.StartDate && 'border-red-500'}`}
                                        id="StartDate"
                                        type="date"
                                        placeholder="Enter Start Date"
                                        name="StartDate"
                                        value={hackathonDetails.StartDate}
                                        onChange={handleChangeHackathonDetails}
                                    />
                                    {errors.StartDate && <p className="text-red-500 text-sm mt-1">{errors.StartDate}</p>}
                                </div>
                                <div className="w-1/2">
                                    <label htmlFor="EndDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        End Date
                                    </label>
                                    <input
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.EndDate && 'border-red-500'}`}
                                        id="EndDate"
                                        type="date"
                                        placeholder="Enter End Date"
                                        name="EndDate"
                                        value={hackathonDetails.EndDate}
                                        onChange={handleChangeHackathonDetails}
                                    />
                                    {errors.EndDate && <p className="text-red-500 text-sm mt-1">{errors.EndDate}</p>}
                                </div>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="coding" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Coding Round
                                </label>
                                <select
                                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.coding && 'border-red-500'}`}
                                    id="coding"
                                    name="coding"
                                    value={hackathonDetails.coding}
                                    onChange={handleChangeHackathonDetails}
                                >
                                    <option value="">Select option</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                                {errors.coding && <p className="text-red-500 text-sm mt-1">{errors.coding}</p>}
                            </div>
                            <div className="mb-5">
                                <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Organization
                                </label>
                                <input
                                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.organization && 'border-red-500'}`}
                                    id="organiztion"
                                    type="text"
                                    placeholder="Enter Organization"
                                    name="organization"
                                    value={hackathonDetails.organization}
                                    onChange={handleChangeHackathonDetails}
                                />
                                {errors.organization && <p className="text-red-500 text-sm mt-1">{errors.organization}</p>}
                            </div>
                        </div>
                    )}
                    {step > 1 && (
                        <div>
                            {/* Round details inputs */}
                            <div className="grid grid-cols-2 gap-4">
                                {(step === 2 && hackathonDetails.coding === 'yes') && (
                                    <>
                                        <h2 className="text-2xl font-bold mb-4">Coding Round</h2>
                                        <div className="col-span-2 mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`round${step - 1}-Round1Name`}>
                                                Contest Name
                                            </label>
                                            <input
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.Round1Name && 'border-red-500'}`}
                                                id={`round${step - 1}-Round1Name`}
                                                type="text"
                                                placeholder={`Enter round ${step - 1} name`}
                                                name="Round1Name"
                                                value={roundsData[step - 2].Round1Name || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            />
                                            {errors.Round1Name && <p className="text-red-500 text-sm mt-1">{errors.Round1Name}</p>}
                                        </div>
                                        <div className="col-span-2 mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`round${step - 1}-platform`}>
                                                Platform
                                            </label>
                                            <input
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.platform && 'border-red-500'}`}
                                                id={`round${step - 1}-platform`}
                                                type="text"
                                                placeholder="Enter Platform"
                                                name="platform"
                                                value={roundsData[step - 2].platform || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            />
                                            {errors.platform && <p className="text-red-500 text-sm mt-1">{errors.platform}</p>}
                                        </div>
                                        <div className="col-span-2 mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`round${step - 1}-Link`}>
                                                Link
                                            </label>
                                            <input
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.Link && 'border-red-500'}`}
                                                id={`round${step - 1}-Link`}
                                                type="text"
                                                placeholder="Enter Link"
                                                name="Link"
                                                value={roundsData[step - 2].Link || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            />
                                            {errors.Link && <p className="text-red-500 text-sm mt-1">{errors.Link}</p>}
                                        </div>
                                        <div className="col-span-2 mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`round${step - 1}-CodingDate`}>
                                                Coding Date
                                            </label>
                                            <input
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.CodingDate && 'border-red-500'}`}
                                                id={`round${step - 1}-CodingDate`}
                                                type="date"
                                                placeholder="Enter Coding Round Date"
                                                name="CodingDate"
                                                value={roundsData[step - 2].CodingDate || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            />
                                            {errors.CodingDate && <p className="text-red-500 text-sm mt-1">{errors.CodingDate}</p>}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`round${step - 1}-StartTime`}>
                                                Start Time
                                            </label>
                                            <input
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.StartTime && 'border-red-500'}`}
                                                id={`round${step - 1}-StartTime`}
                                                type="time"
                                                placeholder="Enter Start Time"
                                                name="StartTime"
                                                value={roundsData[step - 2].StartTime || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            />
                                            {errors.StartTime && <p className="text-red-500 text-sm mt-1">{errors.StartTime}</p>}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`round${step - 1}-EndTime`}>
                                                End Time
                                            </label>
                                            <input
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.EndTime && 'border-red-500'}`}
                                                id={`round${step - 1}-EndTime`}
                                                type="time"
                                                placeholder="Enter End Time"
                                                name="EndTime"
                                                value={roundsData[step - 2].EndTime || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            />
                                            {errors.EndTime && <p className="text-red-500 text-sm mt-1">{errors.EndTime}</p>}
                                        </div>
                                    </>
                                )}
                                {/* Additional fields for round 2 */}
                                {((step === 3 && hackathonDetails.coding === 'yes') || (step === 2 && hackathonDetails.coding === 'no')) && (
                                    <>
                                        <h2 className="text-2xl font-bold mb-4">Idea Submission</h2>
                                        <div className="col-span-2 mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`round${step - 1}-Round2Name`}>
                                               Round Name
                                            </label>
                                            <input
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.Round2Name && 'border-red-500'}`}
                                                id={`round${step - 1}-Round2Name`}
                                                type="text"
                                                placeholder={`Enter round ${step - 1} name`}
                                                name="Round2Name"
                                                value={roundsData[step - 2].Round2Name || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            />
                                            {errors.Round2Name && <p className="text-red-500 text-sm mt-1">{errors.Round2Name}</p>}
                                        </div>
                                       
                                        <div className="col-span-2 mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`round${step - 1}-ProblemStatements`}>
                                                Problem Statements
                                            </label>
                                            <div className="flex items-center">
                                                <label
                                                    htmlFor={`round${step - 1}-ProblemStatements`}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 flex items-center gap-2"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M6 7V2h8v5h5v11H1V7h5zm0 2H3V4h4v5zm6 0V4h4v5h-4zM5 9H3V7h2v2zm6 0H9V7h2v2zm6 0h-2V7h2v2zm0 2H3v7h14v-7z" clipRule="evenodd" />
                                                    </svg>
                                                    <span>{roundsData[step - 2].ProblemStatements ? 'File uploaded' : 'Upload Problem Statements'}</span>
                                                </label>
                                                <input
                                                    className="hidden"
                                                    type="file"
                                                    id={`round${step - 1}-ProblemStatements`}
                                                    name="ProblemStatements"
                                                    onChange={(e) => handleChangeFile(e, step - 2)}
                                                    
                                                />
                                            </div>
                                            {errors.ProblemStatements && <p className="text-red-500 text-sm mt-1">{errors.ProblemStatements}</p>}
                                        </div>
                                        <div className="col-span-2 mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`round${step - 1}-ModeOfProblemStatements`}>
                                                Mode Of Problem Statements
                                            </label>
                                            <select
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.ModeOfProblemStatements && 'border-red-500'}`}
                                                id={`round${step - 1}-ModeOfProblemStatements`}
                                                name="ModeOfProblemStatements"
                                                value={roundsData[step - 2].ModeOfProblemStatements || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            >
                                                <option value="">Select Mode Of Problem Statements</option>
                                                <option value="Option 1">Random Generated</option>
                                                <option value="Option 2">Manual Choosing</option>
                                                <option value="Option 4">Based on User Choice</option>
                                            </select>
                                            {errors.ModeOfProblemStatements && <p className="text-red-500 text-sm mt-1">{errors.ModeOfProblemStatements}</p>}
                                        </div>
                                        <div className="col-span-2 mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`round${step - 1}-ModeOfSubmission`}>
                                                Mode Of Submission
                                            </label>
                                            <select
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.ModeOfSubmission && 'border-red-500'}`}
                                                id={`round${step - 1}-ModeOfSubmission`}
                                                name="ModeOfSubmission"
                                                value={roundsData[step - 2].ModeOfSubmission || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            >
                                                <option value="">Select Mode of Submission</option>
                                                <option value="Option 1"></option>
                                                <option value="Option 2">Option 2</option>
                                                <option value="Option 3">Option 3</option>
                                                <option value="Option 4">Option 4</option>
                                            </select>
                                            {errors.ModeOfSubmission && <p className="text-red-500 text-sm mt-1">{errors.ModeOfSubmission}</p>}
                                        </div>

                                        {/* Date Inputs */}
                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`round${step - 1}-PPTStartDate`}>
                                                Start Date
                                            </label>
                                            <input
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.PPTStartDate && 'border-red-500'}`}
                                                id={`round${step - 1}-PPTStartDate`}
                                                type="date"
                                                placeholder="Enter Start Date"
                                                name="PPTStartDate"
                                                value={roundsData[step - 2].PPTStartDate || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            />
                                            {errors.PPTStartDate && <p className="text-red-500 text-sm mt-1">{errors.PPTStartDate}</p>}
                                        </div>

                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`round${step - 1}-PPTEndDate`}>
                                                End Date
                                            </label>
                                            <input
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.PPTEndDate && 'border-red-500'}`}
                                                id={`round${step - 1}-PPTEndDate`}
                                                type="date"
                                                placeholder="Enter End Date"
                                                name="PPTEndDate"
                                                value={roundsData[step - 2].PPTEndDate || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            />
                                            {errors.PPTEndDate && <p className="text-red-500 text-sm mt-1">{errors.PPTEndDate}</p>}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`round${step - 1}-PPTStartTime`}>
                                                Start Time
                                            </label>
                                            <input
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.PPTStartTime && 'border-red-500'}`}
                                                id={`round${step - 1}-PPTStartTime`}
                                                type="time"
                                                placeholder="Enter Start Time"
                                                name="PPTStartTime"
                                                value={roundsData[step - 2].PPTStartTime || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            />
                                            {errors.PPTStartTime && <p className="text-red-500 text-sm mt-1">{errors.PPTStartTime}</p>}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`round${step - 1}-PPTEndTime`}>
                                                End Time
                                            </label>
                                            <input
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.PPTEndTime && 'border-red-500'}`}
                                                id={`round${step - 1}-PPTEndTime`}
                                                type="time"
                                                placeholder="Enter End Time"
                                                name="PPTEndTime"
                                                value={roundsData[step - 2].PPTEndTime || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            />
                                            {errors.PPTEndTime && <p className="text-red-500 text-sm mt-1">{errors.PPTEndTime}</p>}
                                        </div>
                                    </>
                                )}

                                {((step === 4 && hackathonDetails.coding === 'yes') || (step === 3 && hackathonDetails.coding === 'no')) && (
                                    <>
                                        <h2 className="text-2xl font-bold mb-4">Hackathon</h2>
                                        <div className="col-span-2 mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`round${step - 1}-Round3Name`}>
                                                Round Name
                                            </label>
                                            <input
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.Round3Name && 'border-red-500'}`}
                                                id={`round${step - 1}-Round3Name`}
                                                type="text"
                                                placeholder={`Enter round ${step - 1} name`}
                                                name="Round3Name"
                                                value={roundsData[step - 2].Round3Name || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            />
                                            {errors.Round3Name && <p className="text-red-500 text-sm mt-1">{errors.Round3Name}</p>}
                                        </div>

                                        <div className="col-span-2 mb-4">
                                            <label htmlFor="Venue" className="font-medium text-gray-900 dark:text-white mb-2">
                                                Venue
                                            </label>
                                            <input
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.Venue && 'border-red-500'}`}
                                                id="Venue"
                                                type="text"
                                                placeholder="Enter Venue"
                                                name="Venue"
                                                value={roundsData[step - 2].Venue || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            />
                                            {errors.Venue && <p className="text-red-500 text-sm mt-1">{errors.Venue}</p>}
                                        </div>

                                        <div className="col-span-2 mb-4">
                                            <label htmlFor="ModeOfHack" className="font-medium text-gray-900 dark:text-white mb-2">
                                                Mode (Offline/Online)
                                            </label>
                                            <select
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.Mode && 'border-red-500'}`}
                                                id="ModeOfHack"
                                                name="ModeOfHack"
                                                value={roundsData[step - 2].ModeOfHack || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            >
                                                <option value="">Select option</option>
                                                <option value="online">Online</option>
                                                <option value="offline">Offline</option>
                                            </select>
                                            {errors.ModeOfHack && <p className="text-red-500 text-sm mt-1">{errors.ModeOfHack}</p>}
                                        </div>
                                        <div className="col-span-2 mb-4">
                                            <label htmlFor="Venue" className="font-medium text-gray-900 dark:text-white mb-2">
                                                Discord URL
                                            </label>
                                            <input
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.DiscordURL && 'border-red-500'}`}
                                                id="DiscordURL"
                                                type="text"
                                                placeholder="Enter Discord URL"
                                                name="DiscordURL"
                                                value={roundsData[step - 2].DiscordURL || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            />
                                            {errors.DiscordURL && <p className="text-red-500 text-sm mt-1">{errors.DiscordURL}</p>}
                                        </div>
                                        {/* Date Inputs */}
                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`round${step - 1}-HackStartDate`}>
                                                Start Date
                                            </label>
                                            <input
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.HackStartDate && 'border-red-500'}`}
                                                id={`round${step - 1}-HackStartDate`}
                                                type="date"
                                                placeholder="Enter Start Date"
                                                name="HackStartDate"
                                                value={roundsData[step - 2].HackStartDate || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            />
                                            {errors.HackStartDate && <p className="text-red-500 text-sm mt-1">{errors.HackStartDate}</p>}
                                        </div>

                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`round${step - 1}-HackEndDate`}>
                                                End Date
                                            </label>
                                            <input
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.HackEndDate && 'border-red-500'}`}
                                                id={`round${step - 1}-HackEndDate`}
                                                type="date"
                                                placeholder="Enter End Date"
                                                name="HackEndDate"
                                                value={roundsData[step - 2].HackEndDate || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            />
                                            {errors.HackEndDate && <p className="text-red-500 text-sm mt-1">{errors.HackEndDate}</p>}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`round${step - 1}-HackStartTime`}>
                                                Start Time
                                            </label>
                                            <input
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.HackStartTime && 'border-red-500'}`}
                                                id={`round${step - 1}-HackStartTime`}
                                                type="time"
                                                placeholder="Enter Start Time"
                                                name="HackStartTime"
                                                value={roundsData[step - 2].HackStartTime || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            />
                                            {errors.HackStartTime && <p className="text-red-500 text-sm mt-1">{errors.HackStartTime}</p>}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`round${step - 1}-HackEndTime`}>
                                                End Time
                                            </label>
                                            <input
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.PPTEndTime && 'border-red-500'}`}
                                                id={`round${step - 1}-HackEndTime`}
                                                type="time"
                                                placeholder="Enter End Time"
                                                name="HackEndTime"
                                                value={roundsData[step - 2].HackEndTime || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            />
                                            {errors.HackEndTime && <p className="text-red-500 text-sm mt-1">{errors.HackEndTime}</p>}
                                        </div>
                                    </>
                                )}

                            </div>
                        </div>
                    )}
                    {step === hackathonDetails.rounds + 2 && (
                        <div className="container mt-4">
                            <h2 className="text-6xl font-bold mb-4 text-center text-blue-900">Preview</h2>
                            {Object.entries(hackModel).map(([key, value], index) => (
                                <div key={index} className="card mb-4">
                                    <div className="card-body">
                                        <h5 className="card-title font-semibold">{key}</h5>
                                        {typeof value === 'object' ? (
                                            <div className="row">
                                                {Object.entries(value).map(([nestedKey, nestedValue], nestedIndex) => (
                                                    <div key={nestedIndex} className="">
                                                        <p className="card-text"><strong>{nestedKey}: </strong>{nestedValue}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="card-text"><strong>{key}: </strong>{value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {console.log(hackModel)}
                        </div>



                    )}


                    {/* Navigation buttons */}
                    <div className="flex justify-between mt-4">
                        {step > 1 && (
                            <div>

                            <button
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                type="button"
                                onClick={prevStep}
                            >
                                Previous
                            </button>
                            </div>
                        )}
                        {step <= hackathonDetails.rounds + 1 && (
                            <div>
                            <button
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                type="button"
                                onClick={nextStep}
                            >
                                Next
                            </button>
                             {/* <button
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    type="button"
                                    onClick={handleSubmitDetails}
                            >
                                Submit
                                </button>*/}
                                </div>
                        )}
                        {step === hackathonDetails.rounds + 2 && (
                            <button
                                className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                type="submit"
                                onClick={handleSubmitDetails}

                            >
                                Submit
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default HostHack;
