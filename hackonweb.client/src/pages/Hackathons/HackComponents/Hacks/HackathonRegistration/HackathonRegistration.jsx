import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { loginContext } from '../../../../../contexts/loginContext';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
const RegistrationAction = ({ action, selectedHackathon }) => {
    const [currentUser, loginUser, userLoginStatus, loginErr, logoutUser, verified, teams, fetchTeams] = useContext(loginContext);
    const [teamName, setTeamName] = useState('');
    const [numberOfMembers, setNumberOfMembers] = useState(1);
    const [team, setTeam] = useState(null);
    const [teamMem, setTeamMem] = useState([currentUser.email]);
    const handleTeamNameChange = (e) => {
        setTeamName(e.target.value);
    };
    let navigate = useNavigate();
    const handleTeamSubmit = async () => {
        try {
            const response = await fetch('https://localhost:7151/api/Hackathons/create-team', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(team),
            });
            console.log(response)
            const result = await response.json();
            console.log(result)
            if (response.ok) {
                alert("Team Created"); // Display the response message in an alert dialog
                navigate('/user-dashboard')
            } else {
                if (result == 3) {

                    alert('Failed to create team: Team Already Exists Please choose another team name');
                } else {
                    alert('Failed to create team: Users Not Added to Team');
                }
            }
        } catch (error) {
            console.error('Error creating team:', error);
        }
    }
    const validateEmails = async (emails) => {
        try {
            const response = await fetch('https://localhost:7151/api/Hackathons/validate-emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( emails ),
            });
            const data = await response.json();
            /*console.log(data)
            console.log(response)*/
            return data.invalidEmails; // assuming the response contains an 'invalidEmails' field which is an array of invalid emails
        } catch (error) {
            console.error('Error validating emails:', error);
            return [];
        }
    };
    /*const generateRandomId = () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    };*/
    const handleNumberOfMembersChange = async() => {
        const invalidEmails = await validateEmails(teamMem);
        if (invalidEmails.length === 0) {
            setNumberOfMembers(numberOfMembers + 1);
            setTeamMem([...teamMem, '']);
        } else {
            alert(`The following emails are invalid: ${invalidEmails.join(', ')}`);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const invalidEmails = await validateEmails(teamMem);
        if (invalidEmails.length === 0) {
            // Simulate team creation
            const newTeam = {
                id: uuidv4(),
                communityName: teamName,
                Members: teamMem,
                HackathonId: selectedHackathon.id,
                StartDate: selectedHackathon.startDate,
                EndDate: selectedHackathon.endDate,
                posts: [],
                files: [],
                comments: [],
                likes: 0,
                dislikes: 0,
                githubLink: '',
                appLink: '',
                description: '',
                visibility: true,
            };
            setTeam(newTeam);
        } else {
            alert(`The following emails are invalid: ${invalidEmails.join(', ')}`);
        }
    };
    const renderTeamMembers = () => {
        return teamMem.map((member, index) => (
            <div key={index} className="mb-4">
                <label htmlFor={`teamMember-${index}`} className="block text-gray-700 font-semibold mb-2">
                    Team Member {index + 1}
                </label>
                <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                    id={`teamMember-${index}`}
                    value={member}
                    disabled={index === 0}
                    readOnly={index === 0}
                    onChange={(e) => {
                        const updatedMembers = [...teamMem];
                        updatedMembers[index] = e.target.value;
                        setTeamMem(updatedMembers);
                    }}
                />
            </div>
        ));
    };

    return (
        <div className="mx-auto p-6 bg-gray-100 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">{action === 'create' ? 'Create Team' : 'Join Team'}</h2>
            {team && action === 'create' ? (
                <div>
                    <h3 className="text-lg font-semibold mb-2">Team: {team.communityName}</h3>
                    <ul className="list-disc pl-4">
                        {team.Members.map((member, index) => (
                            <li key={index}>{member}</li>
                        ))}
                    </ul>
                    <div className='flex mt-4'>
                        <button className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2"
                            onClick={() => setTeam(null)}
                        >
                            Edit Team
                        </button>
                        {/*<button className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md ml-2">
                            Invite
                        </button>*/}
                        <button className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md ml-2"
                            onClick={handleTeamSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    {action === 'create' && (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="teamName" className="block text-gray-700 font-semibold mb-2">Team Name</label>
                                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500" id="teamName" value={teamName} onChange={handleTeamNameChange} />
                            </div>
                            {/*<div className="mb-4">
                                <label htmlFor="numberOfMembers" className="block text-gray-700 font-semibold mb-2">Number of Members</label>
                                <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500" id="numberOfMembers" value={numberOfMembers} onChange={handleNumberOfMembersChange} />
                            </div>*/}                                
                            {renderTeamMembers()}
                            <button
                                type="button"
                                onClick={handleNumberOfMembersChange} className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md mb-4">
                                Add Team Member
                            </button>
                            <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md">
                                {action === 'create' ? 'Create Team' : 'Join Team'}
                            </button>
                        </form>
                    )}
                    {action === 'join' && (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="teamName" className="block text-gray-700 font-semibold mb-2">Team Name</label>
                                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500" id="teamName" value={teamName} onChange={handleTeamNameChange} />
                            </div>
                            <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md">
                                {action === 'create' ? 'Create Team' : 'Join Team'}
                            </button>
                        </form>
                    )}
                </>
            )}
        </div>
    );
};



const HackathonRegistration = () => {
    const hackathon = useSelector(state => state.selectedHackathon);
    const [selectedHackathon, setSelectedHackathon] = useState(null);
    const [selectedAction, setSelectedAction] = useState('create');

    useEffect(() => {
        if (hackathon) {
            localStorage.setItem('selectedHackathon', JSON.stringify(hackathon));
        }
    }, [hackathon]);

    useEffect(() => {
        const storedHackathon = localStorage.getItem('selectedHackathon');
        if (storedHackathon) {
            setSelectedHackathon(JSON.parse(storedHackathon));
        }
    }, []);

    const handleCreateTeamClick = () => {
        setSelectedAction('create');
    };

    const handleJoinTeamClick = () => {
        setSelectedAction('join');
    };

    return (
        <div >
            <div className="w-full flex">
                <div className="w-1/3 overflow-y-auto c1">
                    {selectedHackathon && (
                        <div className="p-4 mb-4">
                            <div className="border rounded-lg p-4 bg-white mb-6">
                                <div>
                                    <img src={"https://media.istockphoto.com/id/1189767041/vector/hackathon-signs-round-design-template-thin-line-icon-concept-vector.jpg?s=612x612&w=0&k=20&c=DW-btIjpNjItFfk35N4KvrMkoGoqd1rEPwb_uV9IZEU="}
                                        alt="Hackathon" className="border border-gray-300 p-2 rounded-lg"
                                        style={{ width: '100%', height: '250px' }}
                                    />
                                </div>
                                <div>
                                    <div className="ml-4 flex-grow">
                                        <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedHackathon.hackathonName}</h2>
                                        <p className="text-lg text-gray-600"><span className="font-semibold">Organization:</span> {selectedHackathon.organization}</p>
                                        <p className="text-lg text-gray-600"><span className="font-semibold">Venue:</span> {selectedHackathon.round3.venue}</p>
                                        <p className="text-lg text-gray-600"><span className="font-semibold">Mode:</span> {selectedHackathon.round3.modeOfHack}</p>
                                        <p className="text-lg text-gray-600"><span className="font-semibold">Description:</span> {selectedHackathon.hackathonDescription}</p>
                                    </div>
                                    <div className="flex">
                                        <div className="justify-between items-center flex text-lg text-gray-800 m-3">
                                            <div>
                                                <p className="mb-1"><span className="font-semibold">Start Date:</span></p>
                                                <p className="text-sm">{selectedHackathon.startDate}</p>
                                            </div>
                                            <div>
                                                <p className="mb-1"><span className="font-semibold">End Date:</span></p>
                                                <p className="text-sm">{selectedHackathon.endDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className='mt-4 m-4 border-gray-500'></hr>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <button className="text-gray-700 font-bold py-2 px-4 hover:border border-gray-100 bg-gray-100 ease-in-out">
                                            Wishlist
                                        </button>
                                    </div>
                                    <div className="flex items-center border border-1 p-2 rounded-2 bg-gray-100 text-sm">
                                        <p className="text-gray-700">Registration Deadline :</p>
                                        <div>
                                            <p className="text-sm text-gray-600">{selectedHackathon.startDate}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className='p-4 mb-4 w-2/3 bg-gray-100 overflow-y-auto c2'>
                    <div className="">
                        <div className='border border rounded-lg p-4 bg-white'>
                            <div className="flex mx-auto">
                                <div className='m-2 w-50'>
                                    <button
                                        onClick={handleCreateTeamClick}
                                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md mb-4"
                                    >
                                        Create Team
                                    </button>
                                </div>
                                {/*<div className='m-2 w-50'>
                                    <button
                                        onClick={handleJoinTeamClick}
                                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
                                    >
                                        Join Team
                                    </button>
                                </div>*/}
                            </div>
                            <div className="w-full">
                                {selectedAction && <RegistrationAction action={selectedAction} selectedHackathon={selectedHackathon} />}
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default HackathonRegistration;
