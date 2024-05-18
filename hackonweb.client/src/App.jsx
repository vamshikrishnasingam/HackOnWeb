import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/Login/LoginPage';
import RootLayout from './RootLayout/RootLayout';
import Home from './pages/Home/Home'
import HackRoute from './pages/Hackathons/HackRoute/HackRoute';
import OnGoingHacks from './pages/Hackathons/HackComponents/Hacks/OnGoingHacks/OnGoingHacks';
import UpcomingHacks from './pages/Hackathons/HackComponents/Hacks/UpcomingHacks/UpcomingHacks';
import HostHack from './pages/Hackathons/HackComponents/HostHack/HostHack';
import SignUp from './pages/SignUp/SignUp';
import CommunityComp from './pages/Hackathons/HackComponents/Community/ComunityComp';
import Mentors from './pages/Metors/Mentors';
import Calendar from './pages/Calendar/Calendar'
import HostHackVerification from './pages/Hackathons/HackComponents/HostHack/HostHackVerification';
import AddJuryMentor from './pages/Hackathons/HackComponents/MentorJury/AddJuryMentor';
import HackathonsCommunity from './pages/Hackathons/HackComponents/CommunityDetails/HackathonsCommunity';
import HackathonRegistration from './pages/Hackathons/HackComponents/Hacks/HackathonRegistration/HackathonRegistration';
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
                            <Route path="hackathon-registration" element={<HackathonRegistration/>} />
                            <Route path="upcoming" element={<UpcomingHacks />} />
                            <Route path="hack-host" element={<HostHack/>} />
                            <Route path="host-verify" element={<HostHackVerification />} />
                            <Route path="community" element={<CommunityComp />} />
                            <Route path="jury-mentors" element={<AddJuryMentor />} />
                            <Route path="hack-community" element={<HackathonsCommunity/>} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
