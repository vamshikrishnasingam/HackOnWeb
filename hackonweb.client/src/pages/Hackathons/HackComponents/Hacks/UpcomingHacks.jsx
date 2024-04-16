/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Hackathon = ({ hackathon }) => {
    const { startDate, endDate } = hackathon;
    const isOngoing = new Date(startDate) <= new Date() && new Date() <= new Date(endDate);
    const formattedStartDate = new Date(startDate).toLocaleDateString();
    const formattedEndDate = new Date(endDate).toLocaleDateString();


    return (
        <div className={`border rounded-lg p-4 mb-4 ${isOngoing ? 'bg-green-100' : 'bg-blue-100'}`}>
            <h2 className="text-lg font-bold mb-2">{hackathon.hackathonName}</h2>
            <p className="text-sm">ID: {hackathon.id}</p>
            <p className="text-sm">Description: {hackathon.hackathonDescription}</p>
            <p className="text-sm">Start Date: {formattedStartDate}</p>
            <p className="text-sm">End Date: {formattedEndDate}</p>
            <p className="text-sm">Organization :{hackathon.organization}</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2">Register</button>
        </div>
    );
};

const HackathonList = ({ hackathons }) => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Upcoming and Ongoing Hackathons</h1>
            {hackathons.map((hackathon, index) => (
                <Hackathon key={index} hackathon={hackathon} />
            ))}
        </div>
    );
};

const UpcomingHacks = () => {
    const [hackathons, setHackathons] = useState([]);

    useEffect(() => {
        // Fetch hackathon data from the API
        axios.get('https://localhost:7151/api/Hackathons/GetHackathonDetails')
            .then(response => {
                const currentDate = new Date();
                const ongoingHackathons = response.data.filter(hackathon => {
                    const startDate = new Date(hackathon.startDate);
                    const endDate = new Date(hackathon.endDate);
                    return !(startDate <=currentDate && currentDate <= endDate);
                });
                setHackathons(ongoingHackathons);
            })
            .catch(error => {
                console.error('Error fetching hackathons:', error);
            });
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-4">
            <HackathonList hackathons={hackathons} />
        </div>
    );
};

export default UpcomingHacks;
