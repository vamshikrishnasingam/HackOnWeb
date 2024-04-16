import React, { useState, useEffect } from 'react';

const Hackathon = ({ hackathon }) => {
    const { name, id, description, startDate, endDate } = hackathon;
    const isOngoing = new Date(startDate) <= new Date() && new Date() <= new Date(endDate);
    const formattedStartDate = new Date(startDate).toLocaleDateString();
    const formattedEndDate = new Date(endDate).toLocaleDateString();
    const [showModal, setShowModal] = useState(false);
    const [participantName, setParticipantName] = useState('');
    const [participantEmail, setParticipantEmail] = useState('');

    const handleRegister = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can send the participant data to your backend
        console.log('Participant Name:', participantName);
        console.log('Participant Email:', participantEmail);
        // Show alert upon successful registration
        alert('Registered successfully!');
        setShowModal(false);
    };

    return (
        <div className={`border rounded-lg p-4 mb-4 ${isOngoing ? 'bg-green-100' : 'bg-blue-100'}`}>
            <h2 className="text-lg font-bold mb-2">{name}</h2>
            <p className="text-sm">ID: {id}</p>
            <p className="text-sm">Description: {description}</p>
            <p className="text-sm">Start Date: {formattedStartDate}</p>
            <p className="text-sm">End Date: {formattedEndDate}</p>
            {isOngoing ? <p className="text-green-600 font-semibold">Status: Ongoing</p> : <p className="text-blue-600 font-semibold">Status: Upcoming</p>}
            <button onClick={handleRegister} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2">Register</button>

            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
                        <div className="relative bg-white rounded-lg w-96 p-6">
                            <span className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 cursor-pointer" onClick={handleCloseModal}>&times;</span>
                            <h2 className="text-lg font-bold mb-4">Participant Details</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="participantName" className="block text-sm font-medium text-gray-700">Name:</label>
                                    <input type="text" id="participantName" className="mt-1 p-2 border rounded-md w-full" value={participantName} onChange={(e) => setParticipantName(e.target.value)} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="participantEmail" className="block text-sm font-medium text-gray-700">Email:</label>
                                    <input type="email" id="participantEmail" className="mt-1 p-2 border rounded-md w-full" value={participantEmail} onChange={(e) => setParticipantEmail(e.target.value)} />
                                </div>
                                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
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

const OnGoingHacks = () => {
    const [hackathons, setHackathons] = useState([]);
    const dummyHackathons = [
        {
            id: 1,
            name: "Hackathon 1",
            description: "Description for Hackathon 1",
            startDate: "2024-04-14",
            endDate: "2024-04-18"
        },
        {
            id: 2,
            name: "Hackathon 2",
            description: "Description for Hackathon 2",
            startDate: "2024-04-16",
            endDate: "2024-04-18"
        },
        {
            id: 3,
            name: "Hackathon 3",
            description: "Description for Hackathon 3",
            startDate: "2024-04-15",
            endDate: "2024-04-17"
        }
    ];

    useEffect(() => {
        // Fetch hackathon data from the API
        // For this example, using dummy hackathons data
        setHackathons(dummyHackathons);
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-4">
            <HackathonList hackathons={hackathons} />
        </div>
    );
};

export default OnGoingHacks;
