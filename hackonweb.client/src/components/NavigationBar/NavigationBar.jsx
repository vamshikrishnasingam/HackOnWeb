import { Fragment, useState, useEffect,useContext } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'
import { loginContext } from '../../contexts/loginContext';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function NavigationBar() {
    const [navigation, setNavigation] = useState([
        { name: 'Home', to: '/', current: true },
        { name: 'Hackathons', to: '/hackathons', current: true },
        { name: 'Mentors', to: '/mentors', current: true },
        { name: 'Calendar', to: '/calendar', current: true },
    ]);


    let [currentUser, loginUser, userLoginStatus, loginErr, logoutUser, verified,,] = useContext(loginContext);
    const location = useLocation(); // Get the current location

    useEffect(() => {
        // Update the 'current' property in the navigation array based on the current location
        const updatedNavigation = navigation.map(item => ({
            ...item,
            current: item.to === location.pathname // Check if the item's 'to' matches the current path
        }));

        setNavigation(updatedNavigation); // Update the state with the modified navigation array
    }, [location.pathname]); // Re-run the effect when the pathname changes

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <div className="sticky-top">
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-20 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <img
                                        className="h-8 w-auto"
                                        src="https://i.pinimg.com/originals/e5/91/75/e59175aaae1d67d34b21dd77a2fc7a93.jpg"
                                        alt="Your Company"
                                    />
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.to}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    type="button"
                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src="https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
                                                alt=""
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {/*<Menu.Item>
                                                 {({ active }) => (
                                                     <a
                                                         href="#"
                                                         className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                     >
                                                         Your Profile
                                                     </a>
                                                 )}
                                             </Menu.Item>
                                             <Menu.Item>
                                                 {({ active }) => (
                                                     <a
                                                         href="#"
                                                         className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                     >
                                                         Settings
                                                     </a>
                                                 )}
                                             </Menu.Item>
                                             <Menu.Item>
                                                 {({ active }) => (
                                                     <a
                                                         href="#"
                                                         className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                     >
                                                         Sign out
                                                     </a>
                                                 )}
                                             </Menu.Item>*/}
                                            {userLoginStatus ? (
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to="/user-dashboard"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Profile
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            ) : (
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                to="/sign-up"
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                SignUp
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                            )}
                                            {userLoginStatus ? (
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to="/login"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            onClick={logoutUser}
                                                        >
                                                            Logout
                                                        </Link>
                                             
                                                    )}
                                                </Menu.Item>
                                            ) : (
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                to="/login"
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Login
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                            )}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.to}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </div>
            )}
        </Disclosure>
    )
}

export default NavigationBar;
