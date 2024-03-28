import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function HackNavigationBar() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white dark:bg-gray-900 w-full border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link className="flex items-center space-x-3 rtl:space-x-reverse">
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-expanded="false"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="sr-only">Open main menu</span>   
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <Link
                            to=""
                            className={`flex justify-center items-center block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-green dark:border-gray-700 ${location.pathname === '/hackathons' ? 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' : 'text-gray-900'}`}
                        >
                            OnGoing Hacks
                        </Link>
                        <Link
                            to="upcoming"
                            className={`flex justify-center items-center block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-green dark:border-gray-700 ${location.pathname === '/hackathons/upcoming' ? 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' : 'text-gray-900'}`}
                       >
                            Upcoming Hacks
                        </Link>
                        <Link
                            to="hack-host"
                            className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === '/hackathons/hack-host' ? 'bg-gray-100 text-blue-700 md:text-blue-700' : 'text-gray-900'}`}
                        >
                            <button
                                type="button"
                                className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Host a Hack
                            </button>
                        </Link>
                        <Link
                            to="community"
                            className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === '/hackathons/community' ? 'bg-gray-100 text-blue-700 md:text-blue-700' : 'text-gray-900'}`}
                        >
                            <button
                                type="button"
                                className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Community
                            </button>
                        </Link>
                    </ul>
                </div>
            </div>
        </nav>

    );
}

export default HackNavigationBar;