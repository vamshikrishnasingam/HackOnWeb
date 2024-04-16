/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Hackathon = ({ hackathon }) => {
    const { name, id, description, startDate, endDate } = hackathon;
    const isOngoing = new Date(startDate) <= new Date() && new Date() <= new Date(endDate);
    const formattedStartDate = new Date(startDate).toLocaleDateString();
    const formattedEndDate = new Date(endDate).toLocaleDateString();

    return (
        <div className={`border rounded-lg p-4 mb-4 ${isOngoing ? 'bg-green-100' : 'bg-blue-100'}`}>
            <h2 className="text-lg font-bold mb-2">{name}</h2>
            <p className="text-sm">ID: {id}</p>
            <p className="text-sm">Description: {description}</p>
            <p className="text-sm">Start Date: {formattedStartDate}</p>
            <p className="text-sm">End Date: {formattedEndDate}</p>
            {isOngoing ? <p className="text-green-600 font-semibold">Status: Ongoing</p> : <p className="text-blue-600 font-semibold">Status: Upcoming</p>}
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2">Register</button>
        </div>
    );
};

const HackathonList = ({ hackathons }) => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Ongoing Hackathons</h1>
            {hackathons.map((hackathon, index) => (
                <Hackathon key={index} hackathon={hackathon} />
            ))}
        </div>
    );
};

const OnGoingHacks= () => {
    const [hackathons, setHackathons] = useState([]);
    const dummyHackathons = [
        {
            id: 1,
            name: "Hackathon 1",
            description: "Description for Hackathon 1",
            startDate: "2024-04-15",
            endDate: "2024-04-18"
        },
        {
            id: 2,
            name: "Hackathon 2",
            description: "Description for Hackathon 2",
            startDate: "2024-04-20",
            endDate: "2024-04-22"
        },
        {
            id: 3,
            name: "Hackathon 3",
            description: "Description for Hackathon 3",
            startDate: "2024-04-25",
            endDate: "2024-04-27"
        }
    ];

    useEffect(() => {
        // Fetch hackathon data from the API
        axios.get('/api/hackathons')
            .then(response => {
                setHackathons(response.data); // Assuming response.data is an array of hackathon objects
            })
            .catch(error => {
                console.error('Error fetching hackathons:', error);
            });
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-4">
            <HackathonList hackathons={dummyHackathons} />
        </div>
    );
};

export default OnGoingHacks;
