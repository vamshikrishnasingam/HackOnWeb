/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { loginContext } from '../../contexts/loginContext';
import { Button } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './UserDashboard.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectHackathon } from '../Hackathons/HackComponents/Hacks/Redux/actions';


const Profile = ({ userDetails }) => {
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-2xl font-bold mb-4">Welcome, {userDetails.firstname}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="text-gray-700"><strong>Username:</strong> {userDetails.username}</p>
                <p className="text-gray-700"><strong>First Name:</strong> {userDetails.firstname}</p>
                <p className="text-gray-700"><strong>Last Name:</strong> {userDetails.lastname}</p>
                <p className="text-gray-700"><strong>Email:</strong> {userDetails.email}</p>
                <p className="text-gray-700"><strong>Phone:</strong> {userDetails.phone}</p>
                <p className="text-gray-700"><strong>Verified:</strong> {userDetails.verified ? 'Yes' : 'No'}</p>
                <p className="text-gray-700"><strong>Member since:</strong> {new Date(userDetails.memberSince).toLocaleDateString()}</p>
            </div>
        </div>
    );
};


const Hackathons = ({ hackathons }) => {
    const [filter, setFilter] = useState('ongoing');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDetailsClick = (hackathon) => {
        dispatch(selectHackathon(hackathon));
    };

    const now = new Date();

    const ongoingHackathons = hackathons.filter(hackathon =>
        new Date(hackathon.startDate) <= now && new Date(hackathon.endDate) >= now
    );
    const upcomingHackathons = hackathons.filter(hackathon =>
        new Date(hackathon.startDate) > now
    );
    const completedHackathons = hackathons.filter(hackathon =>
        new Date(hackathon.endDate) < now
    );

    let displayedHackathons;
    switch (filter) {
        case 'ongoing':
            displayedHackathons = ongoingHackathons;
            break;
        case 'upcoming':
            displayedHackathons = upcomingHackathons;
            break;
        case 'completed':
            displayedHackathons = completedHackathons;
            break;
        default:
            displayedHackathons = [];
    }

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Registered Hackathons</h2>
            <nav className="mb-4">
                <button
                    className={`mr-2 px-4 py-2 ${filter === 'ongoing' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                    onClick={() => setFilter('ongoing')}
                >
                    Ongoing
                </button>
                <button
                    className={`mr-2 px-4 py-2 ${filter === 'upcoming' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                    onClick={() => setFilter('upcoming')}
                >
                    Upcoming
                </button>
                <button
                    className={`px-4 py-2 ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                    onClick={() => setFilter('completed')}
                >
                    Completed
                </button>
            </nav>
            <div className="scrollable-container bg-white p-4 rounded-3">
                {displayedHackathons.length > 0 ? (
                    <ul className="scrollable-list">
                        {displayedHackathons.map(hackathon => (
                            <li key={hackathon.id} className="mb-4 p-4 border-b border-gray-300">
                                <h3 className="text-lg font-semibold">{hackathon.hackathonName}</h3>
                                <p className="text-gray-700">Date: {new Date(hackathon.startDate).toLocaleDateString()}</p>
                                <p className="text-gray-700">Description: {hackathon.hackathonDescription}</p>
                                <div className='m-2'>
                                    <button className="bg-green-800 hover:bg-green-600 border border-green-600 text-white font-bold py-2 px-4 rounded mt-2"
                                        onClick={() => {
                                            handleDetailsClick(hackathon)
                                            navigate('/hackathons/hack-submission')
                                        }}
                                    >
                                        Go to Submissions
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                ) : (
                    <p className="text-gray-700">No {filter} hackathons.</p>
                )}
            </div>
        </div>
    );
};


const Certificates = () => {
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Certificates</h2>
            <p className="text-gray-700">No certificates available.</p>
        </div>
    );
};

const Sidebar = ({ activeSection, setActiveSection, logoutUser, sidebarOpen, toggleSidebar }) => {
    return (
        <div className={`bg-gray-700 text-dark flex flex-col justify-between overflow-y-auto sidec ${sidebarOpen ? 'w-64' : 'w-22'} transition-all duration-300`}>
            <div className="p-6">
                <button
                    onClick={toggleSidebar}
                    className="block w-full text-left p-2  my-2 rounded hover:bg-gray-600 border-white"
                >
                    <i className="fas fa-bars m-2"></i>
                </button>
                <button
                    onClick={() => setActiveSection('profile')}
                    className={`block w-full text-left p-2 my-2 rounded ${activeSection === 'profile' ? 'bg-gray-600 text-white border-white' : 'hover:bg-gray-600 border-white'}`}
                >
                    <i className="fas fa-user m-2 fw-2"></i> {sidebarOpen && 'Profile'}
                </button>
                <button
                    onClick={() => setActiveSection('hackathons')}
                    className={`block w-full text-left p-2 my-2 rounded ${activeSection === 'hackathons' ? 'bg-gray-600 text-white border-white' : 'hover:bg-gray-600 border-white'}`}
                >
                    <i className="fas fa-code m-2"></i> {sidebarOpen && 'Registrations'}
                </button>
                <button
                    onClick={() => setActiveSection('certificates')}
                    className={`block w-full text-left p-2 my-2 rounded ${activeSection === 'certificates' ? 'bg-gray-600 text-white border-white' : 'hover:bg-gray-600 border-white'}`}
                >
                    <i className="fas fa-certificate m-2"></i> {sidebarOpen && 'Certificates'}
                </button>
            </div>
            <div className="p-6">
                <Link to="/login" onClick={logoutUser}>
                    <button className="block w-full text-left text-dark p-2 my-2 rounded hover:bg-gray-600 border-white">
                        <i className="fas fa-sign-out-alt m-2"></i> {sidebarOpen && 'Logout'}
                    </button>
                </Link>
            </div>
        </div>
    );
};
function UserDashboard() {
    const [currentUser, loginUser, userLoginStatus, loginErr, logoutUser, verified] = useContext(loginContext);
    const [userDetails, setUserDetails] = useState(null);
    const [hackathons, setHackathons] = useState([]);
    const [activeSection, setActiveSection] = useState('profile');

    useEffect(() => {
        if (currentUser && currentUser.id) {
            setUserDetails(currentUser);
            /*const fetchUserDetails = async () => {
                try {
                    const response = await axios.get(`https://localhost:7151/api/Hackathons/GetUserById?id=${currentUser.id}`);
                    setUserDetails(response.data[0]);
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            };*/

            const fetchHackathons = async () => {
                try {
                    const response = await axios.get(`https://localhost:7151/api/Hackathons/GetHackathonDetails`);
                    setHackathons(response.data);
                } catch (error) {
                    console.error('Error fetching hackathons:', error);
                }
            };

            //fetchUserDetails();
            fetchHackathons();
        }
    }, [currentUser]);

    const renderSection = () => {
        switch (activeSection) {
            case 'profile':
                return userDetails ? <Profile userDetails={userDetails} /> : <p className="text-gray-700">Loading user details...</p>;
            case 'hackathons':
                return <Hackathons hackathons={hackathons} />;
            case 'certificates':
                return <Certificates />;
            default:
                return null;
        }
    };
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            {userLoginStatus ? (
                <div className="flex">
                    <Sidebar
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                        logoutUser={logoutUser}
                        sidebarOpen={sidebarOpen}
                        toggleSidebar={toggleSidebar}
                    />
                    <div className="p-6 flex-1 overflow-y-auto sidec">
                        {renderSection()}
                    </div>
                </div>
            ) : (
                    <div className="mx-auto col-lg-6 p-5 mt-5 border border-5 bg-secondary bg-opacity-10">
                        <h1 className="display-1 text-danger">You are Logged Out</h1>
                        <p className="display-6">Please Login to continue</p>
                        {/* <p className='display-6'>Please Login to continue</p> */}
                        <Button variant="success" className="mt-4 fw-bold fs-4 bg-success text-decoration-none text-white hover:bg-gray-700">
                            <Link
                                to="/login"
                                className='text-decoration-none text-white'
                            >
                                Login
                            </Link>
                        </Button>
                    </div>
            )}
        </>
    );
}

export default UserDashboard;
