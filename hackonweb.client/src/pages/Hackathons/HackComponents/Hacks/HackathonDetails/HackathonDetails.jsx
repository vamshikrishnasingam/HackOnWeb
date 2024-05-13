import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const HackathonDetails = () => {
    const hackathon = useSelector(state => state.selectedHackathon);
    const [selectedHackathon, setSelectedHackathon] = useState(null);

    // useEffect to save selected hackathon to local storage
    useEffect(() => {
        if (hackathon) {
            localStorage.setItem('selectedHackathon', JSON.stringify(hackathon));
        }
    }, [hackathon]);

    // useEffect to load selected hackathon from local storage
    useEffect(() => {
        const storedHackathon = localStorage.getItem('selectedHackathon');
        if (storedHackathon) {
            setSelectedHackathon(JSON.parse(storedHackathon));
        }
    }, []);

    return (
        <div className="flex">
            {selectedHackathon && (
                <>
                    {/* Left section for hackathon image and registration details */}
                    <div className="w-1/3">
                        <img src={selectedHackathon.imageURL} alt="Hackathon" className="w-full" />
                        <div className="mt-4">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Register</button>
                            <p className="mt-2">Registered: {selectedHackathon.registeredCount}</p>
                            <p>Registration Deadline: {selectedHackathon.registrationDeadline}</p>
                        </div>
                    </div>
                    {/* Right section for hackathon details */}
                    <div className="w-2/3 px-4">
                        <h1 className="text-2xl font-bold">{selectedHackathon.HackathonName}</h1>
                        <p className="text-gray-600">ID: {selectedHackathon.id}</p>
                        <p className="mt-2">{selectedHackathon.HackathonDescription}</p>
                        <div className="mt-4">
                            <p><span className="font-semibold">Start Date:</span> {selectedHackathon.StartDate}</p>
                            <p><span className="font-semibold">End Date:</span> {selectedHackathon.EndDate}</p>
                            <p><span className="font-semibold">Organization:</span> {selectedHackathon.organization}</p>
                        </div>
                        {/* round details */}
                        <div className="mt-6">
                            <div>
                                <h2 className="text-xl font-bold">round 1</h2>
                                <p>Name: {selectedHackathon.round1.round1Name}</p>
                                <p>Platform: {selectedHackathon.round1.platform}</p>
                                <p>Date: {selectedHackathon.round1.CodingDate}</p>
                                <p>Time: {selectedHackathon.round1.StartTime} - {selectedHackathon.round1.EndTime}</p>
                                {/* Render round 1 details */}
                            </div>
                            <div className="mt-4">
                                <h2 className="text-xl font-bold">round 2</h2>
                                <p>Name: {selectedHackathon.round2.round2Name}</p>
                                <p>Problem Statements: {selectedHackathon.round2.ProblemStatementsURL}</p>
                                <p>Date: {selectedHackathon.round2.PPTStartDate} - {selectedHackathon.round2.PPTEndDate}</p>
                                <p>Time: {selectedHackathon.round2.PPTStartTime} - {selectedHackathon.round2.PPTEndTime}</p>
                                {/* Render round 2 details */}
                            </div>
                            <div className="mt-4">
                                <h2 className="text-xl font-bold">round 3</h2>
                                <p>Name: {selectedHackathon.round3.round3Name}</p>
                                <p>Discord URL: {selectedHackathon.round3.DiscordURL}</p>
                                <p>Date: {selectedHackathon.round3.HackStartDate} - {selectedHackathon.round3.HackEndDate}</p>
                                <p>Time: {selectedHackathon.round3.HackStartTime} - {selectedHackathon.round3.HackEndTime}</p>
                                <p>Venue: {selectedHackathon.round3.Venue}</p>
                                {/* Render round 3 details */}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default HackathonDetails;
