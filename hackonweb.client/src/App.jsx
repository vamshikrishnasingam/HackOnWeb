import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RootLayout from './RootLayout/RootLayout';
import Home from './pages/Home'
import HackRoute from './pages/Hackathons/HackRoute/HackRoute';
import OnGoingHacks from './pages/Hackathons/HackComponents/OnGoingHacks';
import UpcomingHacks from './pages/Hackathons/HackComponents/UpcomingHacks';
import HackHost from './pages/Hackathons/HackComponents/HostHack';
function App() {
    return (
        <div className='App'>
            <Router>  
                <Routes>
                    <Route path="/" element={<RootLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/hackathons" element={<HackRoute />}>
                            <Route path="" element={<OnGoingHacks />} />
                            <Route path="upcoming" element={<UpcomingHacks />} />
                            <Route path="hack-host" element={<HackHost/>} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
