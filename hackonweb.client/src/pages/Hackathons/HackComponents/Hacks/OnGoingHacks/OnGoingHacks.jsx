/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { selectHackathon } from '../Redux/actions';
import { useNavigate } from 'react-router-dom';

const HackathonCard = ({ hackathon, onClick, isClicked }) => {
    const { startDate, endDate } = hackathon;
    const isOngoing = new Date(startDate) <= new Date() && new Date() <= new Date(endDate);
    const formattedStartDate = new Date(startDate).toLocaleDateString();
    const formattedEndDate = new Date(endDate).toLocaleDateString();

    return (
        <div className={`border rounded-lg p-4 mb-4 cursor-pointer ${isOngoing ? 'bg-blue-100' : 'bg-green-100'} ${isClicked ? 'bg-green-200' : ''}`} onClick={onClick}>
            <h2 className="text-lg font-bold mb-2">{hackathon.hackathonName}</h2>
            <p className="text-sm">ID: {hackathon.id}</p>
            <p className="text-sm">Description: {hackathon.hackathonDescription}</p>
            <p className="text-sm">Start Date: {formattedStartDate}</p>
            <p className="text-sm">End Date: {formattedEndDate}</p>
            <p className="text-sm">Organization: {hackathon.organization}</p>
        </div>
    );
};

const HackathonDetailsComp = ({ hackathon }) => {
    console.log(hackathon);
    const navigate = useNavigate();
    const { id, hackathonName, hackathonDescription, startDate, endDate, organization, round1, round2, round3 } = hackathon;
    const formattedStartDate = new Date(startDate).toLocaleString();
    const formattedEndDate = new Date(endDate).toLocaleString();
    const dispatch = useDispatch();

    const handleDetailsClick = () => {
        dispatch(selectHackathon(hackathon));
    };
    return (
        <>
            <div className="border rounded-lg p-4 mb-4 bg-gray-100">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold mb-2">{hackathonName}</h2>
                    <div>
                        <button className="bg-green-800 hover:bg-green-600 border border-green-600 text-white font-bold py-2 px-4 rounded mt-2"
                            onClick={() => {
                                handleDetailsClick();
                                navigate('/hackathons/hackathon-details')
                            }}
                        >
                            Register
                        </button>
                    </div>
                </div>
                <p className="text-sm">Description: {hackathonDescription}</p>
                <p className="text-sm">Start Date: {formattedStartDate}</p>
                <p className="text-sm">End Date: {formattedEndDate}</p>
                <p className="text-sm">Organization: {organization}</p>
                <div className="mt-4">
                    <h3 className="text-lg font-bold mb-2">Rounds Information:</h3>
                    {round1 && (<div className="border rounded-lg p-4 bg-white mb-4">
                        <h4 className="text-md font-bold mb-2">{round1.round1Name}</h4>
                        <p className="text-sm">Platform: {round1.platform}</p>
                        <p className="text-sm">Date: {new Date(round1.codingDate).toLocaleDateString()}</p>
                        <p className="text-sm">Time: {round1.startTime} - {round1.endTime}</p>
                    </div>)}
                    <div className="border rounded-lg p-4 bg-white mb-4">
                        <h4 className="text-md font-bold mb-2">{round2.round2Name}</h4>
                        <p className="text-sm">Problem Statements URL: {round2.problemStatementsURL}</p>
                        <p className="text-sm">Date: {new Date(round2.pptStartDate).toLocaleDateString()} - {new Date(round2.pptEndDate).toLocaleDateString()}</p>
                        <p className="text-sm">Time: {round2.pptStartTime} - {round2.pptEndTime}</p>
                    </div>
                    <div className="border rounded-lg p-4 bg-white">
                        <h4 className="text-md font-bold mb-2">{round3.round3Name}</h4>
                        <p className="text-sm">Discord URL: {round3.discordURL}</p>
                        <p className="text-sm">Date: {new Date(round3.hackStartDate).toLocaleDateString()} - {new Date(round3.hackEndDate).toLocaleDateString()}</p>
                        <p className="text-sm">Time: {round3.hackStartTime} - {round3.hackEndTime}</p>
                        <p className="text-sm">Venue: {round3.venue}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

const HackathonList = ({ hackathons, onHackathonClick }) => {
    return (
        <div>
            <div className="border rounded-lg p-4 mb-4 bg-gray-100">
                {hackathons.map((hackathon, index) => (
                    <HackathonCard key={index} hackathon={hackathon} onClick={() => onHackathonClick(index)} isClicked={hackathon.clicked} />
                ))}
            </div>
            
        </div>
    );
};

const OnGoingHacks = () => {
    const [hackathons, setHackathons] = useState([]);
    const [selectedHackathon, setSelectedHackathon] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
    // Fetch hackathon data from the API
    axios.get('https://localhost:7151/api/Hackathons/GetHackathonDetails')
        .then(response => {
            const currentDate = new Date();
            const Hackathons = response.data.filter(hackathon => {
                const startDate = new Date(hackathon.startDate);
                const endDate = new Date(hackathon.endDate);
                return startDate <= currentDate && currentDate <= endDate;
            });
            // Add the clicked and isOngoing properties to the filtered hackathons
            const Ongoinghackathons = Hackathons.map(hackathon => ({
                ...hackathon,
                clicked: false,
                isOngoing: true
            }));
            setHackathons(Ongoinghackathons);
            if (Ongoinghackathons.length > 0) {
                setSelectedHackathon(Ongoinghackathons[0]); // Select the first hackathon by default
                dispatch(selectHackathon(Ongoinghackathons[0])); // Dispatch the selected hackathon to Redux
                // Set clicked to true for the first hackathon
                Ongoinghackathons[0].clicked = true;
                setHackathons(Ongoinghackathons);
            }
        })
        .catch(error => {
            console.error('Error fetching hackathons:', error);
        });
}, []);


    const handleDetailsClick = (index) => {
        setSelectedHackathon(hackathons[index]);
        dispatch(selectHackathon(hackathons[index]));
        const currentDate = new Date();
        const updatedHackathons = hackathons.map((hackathon, i) => {
            const startDate = new Date(hackathon.startDate);
            const endDate = new Date(hackathon.endDate);
            if (i === index) {
                return { ...hackathon, clicked: true};
            } else {
                return { ...hackathon, clicked: false };
            }
        });
        setHackathons(updatedHackathons);
    };

    return (
        <div className="flex">
            <div className="max-w-3xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">On Going Hackathons</h1>
                <div className='overflow-y-auto c1' >
                    <HackathonList hackathons={hackathons} onHackathonClick={handleDetailsClick} />
                </div>
            </div>
            <div className="flex-1 p-4">
                <h1 className="text-2xl font-bold mb-4">Hackathon Details</h1>
                <div className="overflow-y-auto c2">
                    {selectedHackathon && <HackathonDetailsComp hackathon={selectedHackathon} />}
                </div>
            </div>
        </div>
    );
};

export default OnGoingHacks;
