// Inside the HackathonDetails component

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const HackathonDetails = () => {
    const hackathon = useSelector(state => state.selectedHackathon);
    const [selectedHackathon, setSelectedHackathon] = useState(null);
    // useEffect to store hackathon data in local storage

    useEffect(() => {
        if (hackathon) {
            localStorage.setItem('selectedHackathon', JSON.stringify(hackathon));
        }
    }, [selectedHackathon]);

    // useEffect to load hackathon data from local storage on component mount
    useEffect(() => {
        const storedHackathon = localStorage.getItem('selectedHackathon');
        if (storedHackathon) {
            setSelectedHackathon(JSON.parse(storedHackathon));
        }
    }, []);
    // Render details of the hackathon
    return (
        <div>
            {selectedHackathon && (
                <>
                    <h1>{selectedHackathon.hackathonName}</h1>
                    <p>ID: {selectedHackathon.id}</p>
                    <p>Description: {selectedHackathon.hackathonDescription}</p>
                    <p>Start Date: {selectedHackathon.startDate}</p>
                    <p>End Date: {selectedHackathon.endDate}</p>
                    <p>Organization: {selectedHackathon.organization}</p>
                    {/* Render other details */}
                </>
            )}
        </div>
    );
};

export default HackathonDetails;
