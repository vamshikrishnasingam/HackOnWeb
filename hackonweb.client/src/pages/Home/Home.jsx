import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Home = () => {
    // Sample data for hackathon events
    const hackathons = [
        { title: 'Hackathon 1', date: 'April 15-17, 2024', location: 'Online' },
        { title: 'Hackathon 2', date: 'May 20-22, 2024', location: 'San Francisco, CA' },
        { title: 'Hackathon 3', date: 'June 25-27, 2024', location: 'New York, NY' },
        { title: 'Hackathon 4', date: 'April 15-17, 2024', location: 'Online' },
        { title: 'Hackathon 5', date: 'May 20-22, 2024', location: 'San Francisco, CA' },
        { title: 'Hackathon 6', date: 'June 25-27, 2024', location: 'New York, NY' },
        // Add more hackathon events as needed
    ];

    // Configuration for the carousel
    const carouselConfig = {
        responsive: {
            superLargeDesktop: {
                breakpoint: { max: 3700, min: 2000 },
                items: 5,
            },
            desktop: {
                breakpoint: { max: 2400, min: 1024 },
                items: 3,
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
            },
        },
    };
    return (
        <div>
            {/* Hero section */}
            <div className="bg-gray-700 text-white py-20">
                <div className="container p-10">
                    <h1 className="text-5xl font-bold mb-4">Welcome to Our Hackathon Platform</h1>
                    <p className="text-lg mb-8">Empowering innovators to solve real-world problems through technology.</p>
                    <button className="bg-white text-blue-900 font-bold py-2 px-4 rounded-full">Join Now</button>
                </div>
            </div>

            {/* About Us section */}
            <div className="bg-gray-100 py-16">
                <div className="container mx-auto p-10">
                    <h2 className="text-3xl font-bold mb-8">About Us</h2>
                    <p className="text-lg mb-4">
                        We are passionate about fostering creativity and collaboration among developers, designers, and
                        entrepreneurs to build solutions that make a difference.
                    </p>
                    <p className="text-lg">
                        Our hackathons provide a platform for participants to showcase their skills, learn from industry experts,
                        and network with like-minded individuals.
                    </p>
                </div>
            </div>

            {/* How It Works section */}
            <div className="py-16">
                <div className="container mx-auto p-10">
                    <h2 className="text-3xl font-bold mb-8">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-4">1. Register</h3>
                            <p className="text-lg">
                                Sign up for an account on our platform and register for upcoming hackathons that interest you.
                            </p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-4">2. Participate</h3>
                            <p className="text-lg">
                                Join a hackathon team or work solo to develop innovative solutions within the specified time frame.
                            </p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-4">3. Win Prizes</h3>
                            <p className="text-lg">
                                Showcase your project to judges and compete for prizes, recognition, and potential opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upcoming Hackathons section */}
            <div className="bg-gray-100 py-16">
                <div className="container mx-auto p-10">
                    <h2 className="text-3xl font-bold mb-8">Upcoming Hackathons</h2>
                    <Carousel {...carouselConfig}>
                        {hackathons.map((hackathon, index) => (
                            <div key={index} className="bg-white shadow-md rounded-lg p-6 mx-2">
                                <h2 className="text-xl font-semibold mb-2">{hackathon.title}</h2>
                                <p className="text-gray-600 mb-2">{hackathon.date}</p>
                                <p className="text-gray-600">{hackathon.location}</p>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>

            {/* Call to Action section */}
            <div className="bg-gray-700 text-white py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Join a Hackathon?</h2>
                    <p className="text-lg mb-8">Don't miss out on the opportunity to innovate and make an impact!</p>
                    <button className="bg-white text-blue-900 font-bold py-2 px-4 rounded-full">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
