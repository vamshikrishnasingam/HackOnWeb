import { useState, useEffect,useContext } from "react"
import axios from "axios";
import { communityContext } from "./communityContext";
import { loginContext } from "./loginContext";

// eslint-disable-next-line react/prop-types
function CommunityStore({ children }) {
    const [mainCommunityDetails, setCommunityDetails] = useState(null);
    let [currentUser, loginUser, userLoginStatus, loginErr, logoutUser, verified] = useContext(loginContext)
    const [teams,setTeams] = useState([]);
    const changeCommunityDetails = (data) => {
        setCommunityDetails(data);
    }
    const GetCommunityDetails = async () => {
        try {
            console.log(teams)
            const team = await teams.filter(item => item.Status === 1);
            console.log(team)
            const response = await axios.get(`https://localhost:7151/api/Hackathons/GetCommunityDetails?Id=${team.TeamId}`);
            if (response.data !== null) {
                setCommunityDetails(response.data);
                console.log(response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleDataFromCommunity = (data) => {
        if (data)
            GetCommunityDetails();
    };
    useEffect(() => {
        setTeams(currentUser.teams);
        /*checkTokenAndFetchUser();*/
       /* FetchUser();*/
    }, []);
    return (
        <communityContext.Provider value={[mainCommunityDetails, changeCommunityDetails, GetCommunityDetails, handleDataFromCommunity]}>
            {children}
        </communityContext.Provider>
    )
}
export default CommunityStore;