import { useState, useEffect,useContext } from "react"
import axios from "axios";
import { communityContext } from "./communityContext";
import { loginContext } from "./loginContext";

// eslint-disable-next-line react/prop-types
function CommunityStore({ children }) {
    const [team,setTeam] = useState({});
    const [mainCommunityDetails, setCommunityDetails] = useState(null);
    let [currentUser, loginUser, userLoginStatus, loginErr, logoutUser, verified, teams, fetchTeams] = useContext(loginContext)
    const changeCommunityDetails = (data) => {
        setCommunityDetails(data);
    }
    const GetCommunityDetails = async () => {
        try {
            console.log(teams)
            for (let i = 0; i < teams.length; i++) {
                if (teams[i].status === 1) {
                    console.log("response of search",teams[i]); 
                    setTeam(teams[i]);
                    break;
                }
            }
            if (team != undefined){
                const response = await axios.get(`https://localhost:7151/api/Hackathons/GetCommunityDetails?Id=${team.teamId}`);
                if (response.data !== null) {
                    setCommunityDetails(response.data);
                    console.log("response of comm",response.data);
                }
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
        fetchTeams();
        setTimeout(GetCommunityDetails, 2000);
    }, []);
    return (
        <communityContext.Provider value={[mainCommunityDetails, changeCommunityDetails, GetCommunityDetails, handleDataFromCommunity]}>
            {children}
        </communityContext.Provider>
    )
}
export default CommunityStore;