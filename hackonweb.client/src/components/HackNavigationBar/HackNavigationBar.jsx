import React, { useState,useRef,useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './HackNavigationBar.css'
import { FaChevronDown } from 'react-icons/fa'
function HackNavigationBar() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isDropOpen, setIsDropOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsDropOpen(!isOpen);
    };

    return (
        <nav className="hacknav  dark:bg-gray-900 w-full border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
                <Link className="flex items-center space-x-3 rtl:space-x-reverse">
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-black-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-expanded="false"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="sr-only">Open main menu</span>   
                    </button>
                </div>
                <div className=" items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                    <ul className=" navele flex flex-col md:p-0 font-medium  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <Link
                            to=""
                            className={`flex justify-center items-center block py-2 px-3 rounded hover:bg-green-800 hover:text-white md:hover:bg-green dark:border-gray-700 ${location.pathname === '/hackathons' ? 'text-white bg-blue-700 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' : 'text-gray-900'}`}
                        >
                            OnGoing Hacks
                        </Link>
                        <Link
                            to="upcoming"
                            className={`flex justify-center items-center block py-2 px-3 rounded hover:bg-green-800 hover:text-white md:hover:bg-green dark:border-gray-700 ${location.pathname === '/hackathons/upcoming' ? 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' : 'text-gray-900'}`}
                       >
                            Upcoming Hacks
                        </Link>
                       {/* <Link
                            to="hack-host"
                            className={`flex justify-center items-center block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-green dark:border-gray-700 ${location.pathname === '/hackathons/hack-host' ? 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' : 'text-gray-900'}`}
                        >
                            Host A Hack
                        </Link>*/}
                        <Link ref={dropdownRef} 
                            className={`relative inline-block text-left flex justify-center items-center block rounded hover:bg-green-800 hover:text-white md:hover:bg-green dark:border-gray-700 ${(location.pathname === '/hackathons/hack-host' || location.pathname === '/hackathons/mentors') ? 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 px-2 py-1 rounded-lg text-sm  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' : 'text-gray-900'}`}
                      >
                            <button
                                id="dropdownHoverButton"
                                onMouseEnter={toggleDropdown}
                                className='border-0'
                                  type="button"
                            >
                                Host A Hack
                            </button>

                            {/* Dropdown menu */}
                            {isDropOpen && (
                                <div
                                    id="dropdownHover"
                                    className="z-10 absolute top-full left-0 mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                                >
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                                        <li>
                                            <Link
                                                to="host-verify"
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Verify Host
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="hack-host"
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Host A Hack
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="jury-mentors"
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Add Mentor/Jury
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </Link>
                       
                        <Link
                            to="community"
                            className={`flex justify-center items-center block py-2 px-3 rounded hover:bg-green-800 hover:text-white md:hover:bg-green dark:border-gray-700 ${location.pathname === '/hackathons/community' ? 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' : 'text-gray-900'}`}
                        >
                            community
                        </Link>
                        <Link
                            to=""
                            className={`flex justify-center items-center block py-2 px-3 rounded hover:bg-green-800 hover:text-white md:hover:bg-green dark:border-gray-700 ${location.pathname === '/hackathons/community' ? 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' : 'text-gray-900'}`}
                        >
                            Hackathon
                        </Link>
                    </ul>
                </div>
            </div>
        </nav>

    );
}

export default HackNavigationBar;