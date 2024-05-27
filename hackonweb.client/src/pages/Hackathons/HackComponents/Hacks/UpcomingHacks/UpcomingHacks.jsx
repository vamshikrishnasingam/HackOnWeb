/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { selectHackathon } from '../Redux/actions';
import { useNavigate } from 'react-router-dom';
import { TbUsersPlus } from "react-icons/tb";
import { IoTimerOutline } from "react-icons/io5";

const HackathonCard = ({ hackathon, onClick, isClicked }) => {
    const { startDate, endDate } = hackathon;
    const isUpcoming = new Date(startDate) <= new Date() && new Date() <= new Date(endDate);
    const formattedStartDate = new Date(startDate).toLocaleDateString();
    const formattedEndDate = new Date(endDate).toLocaleDateString();
    const registrationDeadline = Math.ceil((new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24))
    const registeredCount = 20;

    return (
        <div className={`border rounded-lg p-2 mb-4 cursor-pointer ${isUpcoming ? 'bg-blue-100' : 'bg-green-100'} ${isClicked ? 'bg-blue-200 hover:border border-success' : ''}`} onClick={onClick}>
             <div className='flex'>
                {/* Image */}
                <img src={"https://media.istockphoto.com/id/1189767041/vector/hackathon-signs-round-design-template-thin-line-icon-concept-vector.jpg?s=612x612&w=0&k=20&c=DW-btIjpNjItFfk35N4KvrMkoGoqd1rEPwb_uV9IZEU="} alt="Hackathon" className="w-1/3 border border-4  rounded-lg" />

                {/* Hackathon details */}
                <div className="ml-4 w-2/3 m-2">
                    <div className='m-2'>
                        <h2 className="text-2xl">{hackathon.hackathonName}</h2>
                        <p className="text-md mt-1 font-light ">{hackathon.organization}</p>
                    </div>

                    <div className="flex items-center">
                        <div className='m-1 fontbold'>
                            < TbUsersPlus />
                        </div>
                        <p className="text-sm">{registeredCount} Registered</p>
                    </div>
                    <div className='flex items-center'>
                        <div className='m-1 fontbold'>
                            <IoTimerOutline />
                        </div>
                        {/* Calculate time left for registration */}
                        {registrationDeadline && (
                            <p className="text-sm">{registrationDeadline} Days Left</p>
                        )}
                    </div>
                </div>
            </div>
            <p className="text-sm m-2 text-center">{hackathon.hackathonDescription}</p>
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
                <div className="border rounded-lg p-4 bg-white mb-6 shadow-md">
                    <div className="flex">
                        <div>
                            <img src={"https://media.istockphoto.com/id/1189767041/vector/hackathon-signs-round-design-template-thin-line-icon-concept-vector.jpg?s=612x612&w=0&k=20&c=DW-btIjpNjItFfk35N4KvrMkoGoqd1rEPwb_uV9IZEU="} alt="Hackathon" className="border border-gray-300 p-2 rounded-lg" width='150' />
                        </div>
                        <div className="ml-4 flex-grow">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">{hackathonName}</h2>
                            <p className="text-lg text-gray-600"><span className="font-semibold">Organization:</span> {organization}</p>
                            <p className="text-lg text-gray-600"><span className="font-semibold">Venue:</span> {round3.venue}</p>
                            <p className="text-lg text-gray-600"><span className="font-semibold">Mode:</span> {round3.modeOfHack}</p>
                            <p className="text-lg text-gray-600"><span className="font-semibold">Description:</span> {hackathonDescription}</p>
                        </div>
                        <div className="ml-4">
                            <div className="text-lg text-gray-800 m-3">
                                <p className="mb-1"><span className="font-semibold">Start Date:</span></p>
                                <p className="text-sm">{formattedStartDate}</p>
                                <p className="mt-4 mb-1"><span className="font-semibold">End Date:</span></p>
                                <p className="text-sm">{formattedEndDate}</p>
                            </div>
                        </div>
                    </div>
                    <hr className='mt-4 border-gray-500'></hr>
                    <div className="flex justify-between items-center">
                        <div>
                            <button className="text-gray-700 font-bold py-2 px-4 hover:border border-gray-100 bg-gray-100 ease-in-out">
                                Wishlist
                            </button>
                        </div>
                        <div className="flex items-center border border-1 p-2 rounded-2 bg-gray-100 text-sm">
                            <p className="text-gray-700">Registration Deadline :</p>
                            <div>
                                <p className="text-sm text-gray-600">{formattedStartDate}</p>
                            </div>
                        </div>

                        <div className='m-2'>
                            <button className="bg-green-800 hover:bg-green-600 border border-green-600 text-white font-bold py-2 px-4 rounded mt-2"
                                onClick={() => {
                                    handleDetailsClick();
                                    navigate('/hackathons/hackathon-registration')
                                }}
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-bold m-2">Rounds Information:</h3>
                    {round1 && (<div className="border rounded-lg p-4 bg-white mb-4 shadow-md">
                        <h4 className="text-md font-bold mb-2">{round1.round1Name}</h4>
                        <p className="text-sm">Platform: {round1.platform}</p>
                        <p className="text-sm">Date: {new Date(round1.codingDate).toLocaleDateString()}</p>
                        <p className="text-sm">Time: {round1.startTime} - {round1.endTime}</p>
                    </div>)}
                    {
                        round2 && (
                            <div className="border rounded-lg p-4 bg-white mb-4 shadow-md">
                                <h4 className="text-md font-bold mb-2">{round2.round2Name}</h4>
                                <p className="text-sm">Problem Statements URL: {round2.problemStatementsURL}</p>
                                <p className="text-sm">Date: {new Date(round2.pptStartDate).toLocaleDateString()} - {new Date(round2.pptEndDate).toLocaleDateString()}</p>
                                <p className="text-sm">Time: {round2.pptStartTime} - {round2.pptEndTime}</p>
                            </div>
                        )
                    }
                    {
                        round3 && (
                            <div className="border rounded-lg p-4 bg-white shadow-md">
                                <h4 className="text-md font-bold mb-2">{round3.round3Name}</h4>
                                <p className="text-sm">Discord URL: {round3.discordURL}</p>
                                <p className="text-sm">Date: {new Date(round3.hackStartDate).toLocaleDateString()} - {new Date(round3.hackEndDate).toLocaleDateString()}</p>
                                <p className="text-sm">Time: {round3.hackStartTime} - {round3.hackEndTime}</p>
                                <p className="text-sm">Venue: {round3.venue}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
};

const HackathonList = ({ hackathons, onHackathonClick }) => {
    return (
        <div>
            <div className="border rounded-lg p-4 mb-4 bg-gray-100">
                {hackathons.length === 0 && <div> No Hackathons at this moment</div>}
                {hackathons.map((hackathon, index) => (
                    <HackathonCard key={index} hackathon={hackathon} onClick={() => onHackathonClick(index)} isClicked={hackathon.clicked} />
                ))}
            </div>

        </div>
    );
};

const UpcomingHacks = () => {
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
                    return (startDate > currentDate);
                });

                // Sort hackathons according to dates in descending order
                const sortedHackathons = Hackathons.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

                // Add the clicked and isOngoing properties to the filtered hackathons
                const Ongoinghackathons = sortedHackathons.map(hackathon => ({
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
            <div className="w-1/3 mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">On Going Hackathons</h1>
                <div className='overflow-y-auto c1' >
                    <HackathonList hackathons={hackathons} onHackathonClick={handleDetailsClick} />
                </div>
            </div>
            <div className="w-2/3 flex-1 p-4">
                <h1 className="text-2xl font-bold mb-4">Hackathon Details</h1>
                <div className="overflow-y-auto c2">
                    {selectedHackathon && <HackathonDetailsComp hackathon={selectedHackathon} />}
                </div>
            </div>
        </div>
    );
};

export default UpcomingHacks;
