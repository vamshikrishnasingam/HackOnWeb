import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const AddJuryMentor = () => {
    const [hostVerified, setHostVerified] = useState(false);
    const [personName, setPersonName] = useState('');
    const [personEmail, setPersonEmail] = useState('');
    const [personType, setPersonType] = useState('');
    const [people, setPeople] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const verifyHost = () => {
        // Your logic to verify the host, e.g., API call
        // Once verified, set hostVerified to true
        setHostVerified(true);
    };

    const handleAddPerson = async () => {
        setIsLoading(true);
        setError('');

        try {
            if (personName && personEmail && personType) {
                const newPerson = { name: personName, email: personEmail, type: personType };
                setPeople([...people, newPerson]);
                setPersonName('');
                setPersonEmail('');
                setPersonType('');

                // Your API call to store person details
                await axios.post('your_api_endpoint', newPerson);
            } else {
                throw new Error('Please fill in all fields.');
            }
        } catch (error) {
            setError(error.message || 'Failed to add person. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Add Jury or Mentor</h2>
            {!hostVerified ? (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4"
                >
                    <p className="text-gray-700 mb-2">Host verification required before adding jurors or mentors.</p>
                    <button
                        onClick={verifyHost}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none"
                    >
                        Verify Host
                    </button>
                </motion.div>
            ) : (
                <>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleAddPerson();
                        }}
                            className="mb-4 p-10 border rounded-lg bg-gray-50"
                    >
                        <div className="gap-4">
                                <label className="block mb-2">
                                    <span className="text-gray-700">Name:</span>
                                    <input
                                        type="text"
                                        value={personName}
                                        onChange={(e) => setPersonName(e.target.value)}
                                        className="mt-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    />
                                </label>
                                <label className="block mb-2">
                                    <span className="text-gray-700">Email:</span>
                                    <input
                                        type="email"
                                        value={personEmail}
                                        onChange={(e) => setPersonEmail(e.target.value)}
                                        className="mt-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    />
                                </label>
                            <div>
                                <label className="block mb-2">
                                    <span className="text-gray-700">Type:</span>
                                    <select
                                        value={personType}
                                        onChange={(e) => setPersonType(e.target.value)}
                                        className="mt-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    >
                                        <option value="">Select Type</option>
                                        <option value="mentor">Mentor</option>
                                        <option value="jury">Jury</option>
                                    </select>
                                </label>
                            </div>
                            <div className="md:col-span-2 mt-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none"
                                >
                                    {isLoading ? 'Adding...' : 'Add Person'}
                                </button>
                                {error && <p className="text-red-600 mt-2">{error}</p>}
                            </div>
                        </div>
                    </form>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Added People:</h3>
                        <ul>
                            {people.map((person, index) => (
                                <li key={index} className="mb-2">
                                    <p><span className="font-semibold">Name:</span> {person.name}</p>
                                    <p><span className="font-semibold">Email:</span> {person.email}</p>
                                    <p><span className="font-semibold">Type:</span> {person.type}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default AddJuryMentor;
