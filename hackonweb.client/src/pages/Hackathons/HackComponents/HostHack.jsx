import React, { useState } from 'react';

function HostHack() {
    const [step, setStep] = useState(1); // Current step
    const [hackathonDetails, setHackathonDetails] = useState({
        HackathonName: '',
        HackathonDescription: '',
        startDate: '',
        endDate: '',
        coding: '',
        location: '',
        rounds: 3, // Default number of rounds
    });

    const [roundsData, setRoundsData] = useState([]);
    for (let i = 0; i < 3; i++) {
        roundsData.push({});
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
    const handleChangeFile = (e, index) => {
        const file = e.target.files[0]; // Get the uploaded file
        if (file) {
            // If a file is uploaded, read its contents
            const reader = new FileReader();
            reader.onload = (event) => {
                // Update the state with the file contents
                const newRoundsData = [...roundsData];
                newRoundsData[index].ProblemStatements = event.target.result;
                setRoundsData(newRoundsData);
            };
            reader.readAsText(file); // Read the file as text
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
        if (!hackathonDetails.startDate) {
            newErrors.startDate = 'Start Date is required';
            hasErrors = true;
        }
        if (!hackathonDetails.endDate) {
            newErrors.endDate = 'End Date is required';
            hasErrors = true;
        }
        if (!hackathonDetails.coding) {
            newErrors.coding = 'Coding Round is required';
            hasErrors = true;
        }
        if (!hackathonDetails.location) {
            newErrors.location = 'Location is required';
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
            if (!roundsData[step - 2].StartDate1) {
                newErrors.StartDate1 = 'Start Date is required';
                hasErrors = true;
            }
            if (!roundsData[step - 2].endDate1) {
                newErrors.endDate1 = 'End Date is required';
                hasErrors = true;
            }
        }
        if ((step === 3 && hackathonDetails.coding === 'yes') || (step === 2 && hackathonDetails.coding === 'no')) {
            if (!roundsData[step - 2].ProblemStatements) {
                newErrors.ProblemStatements = 'Problem Statements are required';
                hasErrors = true;
            }
            if (!roundsData[step - 2].ModeOfSubmission) {
                newErrors.ModeOfSubmission = 'Mode Of Submission is required';
                hasErrors = true;
            }
            if (!roundsData[step - 2].StartDate2) {
                newErrors.StartDate2 = 'Start Date is required';
                hasErrors = true;
            }
            if (!roundsData[step - 2].EndDate2) {
                newErrors.EndDate2 = 'End Date is required';
                hasErrors = true;
            }
        }        

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
        let hasErrors = false;
        const newErrors = {};
        if ((step === 4 && hackathonDetails.coding === 'yes') || (step === 3 && hackathonDetails.coding === 'no')) {
            if (!roundsData[step - 2].venue) {
                newErrors.venue = 'Venue is required';
                hasErrors = true;
            }
            if (!roundsData[step - 2].mode) {
                newErrors.mode = 'Mode is required';
                hasErrors = true;
            }
            if (!roundsData[step - 2].StartDate3) {
                newErrors.StartDate3 = 'Start Date is required';
                hasErrors = true;
            }
            if (!roundsData[step - 2].EndDate3) {
                newErrors.EndDate3 = 'End Date is required';
                hasErrors = true;
            }
        }
        // If there are validation errors, update the errors state and return
        if (hasErrors) {
            setErrors(newErrors);
            return;
        } 

        // Clear validation error for the current field
        setErrors({ ...errors, [name]: '' });
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
                                    <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Start Date
                                    </label>
                                    <input
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.startDate && 'border-red-500'}`}
                                        id="startDate"
                                        type="date"
                                        placeholder="Enter Start Date"
                                        name="startDate"
                                        value={hackathonDetails.startDate}
                                        onChange={handleChangeHackathonDetails}
                                    />
                                    {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                                </div>
                                <div className="w-1/2">
                                    <label htmlFor="endDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        End Date
                                    </label>
                                    <input
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.endDate && 'border-red-500'}`}
                                        id="endDate"
                                        type="date"
                                        placeholder="Enter End Date"
                                        name="endDate"
                                        value={hackathonDetails.endDate}
                                        onChange={handleChangeHackathonDetails}
                                    />
                                    {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
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
                                    Location
                                </label>
                                <input
                                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.location && 'border-red-500'}`}
                                    id="location"
                                    type="text"
                                    placeholder="Enter Location"
                                    name="location"
                                    value={hackathonDetails.location}
                                    onChange={handleChangeHackathonDetails}
                                />
                                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
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
                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`round${step - 1}-StartDate1`}>
                                                Start Date
                                            </label>
                                            <input
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.StartDate1 && 'border-red-500'}`}
                                                id={`round${step - 1}-ModeOfProblemStatements`}
                                                type="date"
                                                placeholder="Enter Start Date"
                                                name="StartDate1"
                                                value={roundsData[step - 2].StartDate1 || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            />
                                            {errors.StartDate1 && <p className="text-red-500 text-sm mt-1">{errors.StartDate1}</p>}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`round${step - 1}-EndDate1`}>
                                                End Date
                                            </label>
                                            <input
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.endDate1 && 'border-red-500'}`}
                                                id={`round${step - 1}-ModeOfProblemStatements`}
                                                type="date"
                                                placeholder="Enter End Date"
                                                name="endDate1"
                                                value={roundsData[step - 2].endDate1 || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            />
                                            {errors.endDate1 && <p className="text-red-500 text-sm mt-1">{errors.endDate1}</p>}
                                        </div>
                                    </>
                                )}
                                {/* Additional fields for round 2 */}
                                {((step === 3 && hackathonDetails.coding === 'yes') || (step === 2 && hackathonDetails.coding === 'no')) && (
                                    <>
                                        <h2 className="text-2xl font-bold mb-4">Idea Submission</h2>
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
                                                <option value="">Select Mode Of Problem Statements</option>
                                                <option value="Option 1">Option 1</option>
                                                <option value="Option 2">Option 2</option>
                                                <option value="Option 3">Option 3</option>
                                                <option value="Option 4">Option 4</option>
                                            </select>
                                            {errors.ModeOfSubmission && <p className="text-red-500 text-sm mt-1">{errors.ModeOfSubmission}</p>}
                                        </div>

                                        {/* Date Inputs */}
                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`round${step - 1}-StartDate2`}>
                                                Start Date
                                            </label>
                                            <input
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.StartDate2 && 'border-red-500'}`}
                                                id={`round${step - 1}-StartDate2`}
                                                type="date"
                                                placeholder="Enter Start Date"
                                                name="StartDate2"
                                                value={roundsData[step - 2].StartDate2 || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            />
                                            {errors.StartDate2 && <p className="text-red-500 text-sm mt-1">{errors.StartDate2}</p>}
                                        </div>

                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`round${step - 1}-EndDate2`}>
                                                End Date
                                            </label>
                                            <input
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.EndDate2 && 'border-red-500'}`}
                                                id={`round${step - 1}-EndDate2`}
                                                type="date"
                                                placeholder="Enter End Date"
                                                name="EndDate2"
                                                value={roundsData[step - 2].EndDate2 || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            />
                                            {errors.EndDate2 && <p className="text-red-500 text-sm mt-1">{errors.EndDate2}</p>}
                                        </div>
                                    </>
                                )}

                                {((step === 4 && hackathonDetails.coding === 'yes') || (step === 3 && hackathonDetails.coding === 'no')) && (
                                    <>
                                        <h2 className="text-2xl font-bold mb-4">Hackathon</h2>
                                        <div className="col-span-2 mb-4">
                                            <label htmlFor="venue" className="font-medium text-gray-900 dark:text-white mb-2">
                                                Venue
                                            </label>
                                            <input
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.Venue && 'border-red-500'}`}
                                                id="venue"
                                                type="text"
                                                placeholder="Enter venue"
                                                name="venue"
                                                value={roundsData[step - 2].venue || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            />
                                            {errors.venue && <p className="text-red-500 text-sm mt-1">{errors.venue}</p>}
                                        </div>

                                        <div className="col-span-2 mb-4">
                                            <label htmlFor="mode" className="font-medium text-gray-900 dark:text-white mb-2">
                                                Mode (Offline/Online)
                                            </label>
                                            <select
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.Mode && 'border-red-500'}`}
                                                id="mode"
                                                name="mode"
                                                value={roundsData[step - 2].mode || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            >
                                                <option value="">Select option</option>
                                                <option value="online">Online</option>
                                                <option value="offline">Offline</option>
                                            </select>
                                            {errors.mode && <p className="text-red-500 text-sm mt-1">{errors.mode}</p>}
                                        </div>

                                        {/* Date Inputs */}
                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`round${step - 1}-StartDate3`}>
                                                Start Date
                                            </label>
                                            <input
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.StartDate3 && 'border-red-500'}`}
                                                id={`round${step - 1}-StartDate3`}
                                                type="date"
                                                placeholder="Enter Start Date"
                                                name="StartDate3"
                                                value={roundsData[step - 2].StartDate3 || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            />
                                            {errors.StartDate3 && <p className="text-red-500 text-sm mt-1">{errors.StartDate3}</p>}
                                        </div>

                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={`round${step - 1}-EndDate3`}>
                                                End Date
                                            </label>
                                            <input
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.EndDate3 && 'border-red-500'}`}
                                                id={`round${step - 1}-EndDate3`}
                                                type="date"
                                                placeholder="Enter End Date"
                                                name="EndDate3"
                                                value={roundsData[step - 2].EndDate3 || ''}
                                                onChange={(e) => handleChangeRoundDetails(e, step - 2)}
                                            />
                                            {errors.EndDate3 && <p className="text-red-500 text-sm mt-1">{errors.EndDate3}</p>}
                                        </div>
                                    </>
                                )}

                            </div>
                        </div>
                    )}
                    {/* Navigation buttons */}
                    <div className="flex justify-between mt-4">
                        {step > 1 && (
                            <button
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                type="button"
                                onClick={prevStep}
                            >
                                Previous
                            </button>
                        )}
                        {step < hackathonDetails.rounds + 1 && (
                            <button
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                type="button"
                                onClick={nextStep}
                            >
                                Next
                            </button>
                        )}
                        {step === hackathonDetails.rounds + 1 && (
                            <button
                                className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                type="submit"
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
