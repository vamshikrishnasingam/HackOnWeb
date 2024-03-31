import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/Login/LoginPage';
import RootLayout from './RootLayout/RootLayout';
import Home from './pages/Home/Home'
import HackRoute from './pages/Hackathons/HackRoute/HackRoute';
import OnGoingHacks from './pages/Hackathons/HackComponents/OnGoingHacks';
import UpcomingHacks from './pages/Hackathons/HackComponents/UpcomingHacks';
import HackHost from './pages/Hackathons/HackComponents/HostHack';
import SignUp from './pages/SignUp/SignUp';
import CommunityComp from './pages/Hackathons/HackComponents/Community/ComunityComp';
import Mentors from './pages/Metors/Mentors';
import Calendar from './pages/Calendar/Calendar'
function App() {
    return (
        <div className='App'>
            <Router>  
                <Routes>
                    <Route path="/" element={<RootLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/mentors" element={<Mentors />} />
                        <Route path="/calendar" element={<Calendar/>} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/sign-up" element={<SignUp/>} />
                        <Route path="/hackathons" element={<HackRoute />}>
                            <Route path="" element={<OnGoingHacks />} />
                            <Route path="upcoming" element={<UpcomingHacks />} />
                            <Route path="hack-host" element={<HackHost />} />
                            <Route path="community" element={<CommunityComp/>
                        } />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
