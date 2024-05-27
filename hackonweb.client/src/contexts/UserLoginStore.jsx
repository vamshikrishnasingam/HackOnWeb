import { useState,useEffect } from "react"
import axios from "axios";
import { loginContext } from "./loginContext";

// eslint-disable-next-line react/prop-types
function UserLoginStore({ children }) {
    const [teams, setTeams] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [verified,setVerified]=useState(false);
    const [loginErr, setLoginErr] = useState("")
    const [userLoginStatus, setUserLoginStatus] = useState(false)
    //function to make user login reuqest
    const fetchTeams = () => {
        setTeams(currentUser.teams);
    }
    const loginUser = async (userCredObj) => {
        console.log(userCredObj)
        try {
            fetch("https://localhost:7151/api/Hackathons/LoginWithPassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userCredObj)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Login failed. Please check your credentials.");
                }
            })
            .then(data => {
                setCurrentUser(data);
                console.log(data);
                setLoginErr("");
                setUserLoginStatus(true);
                setVerified(currentUser.verified);
                setTeams(currentUser.teams)
                // store jwt token in local storage (you need to adjust this based on your actual token handling)
                localStorage.setItem("user", JSON.stringify(data));
            })
            .catch(error => {
                setLoginErr(error.message);
                setUserLoginStatus(false);
            });

        } catch (error) {
            console.error("Error in user login:", error);
            setLoginErr("An error occurred during login.");
        }
    };
    //userlogout
    const logoutUser = () => {
        //clear local or session storage
        localStorage.clear();
        //update user login status
        setUserLoginStatus(false)

    }
    const FetchUser = async () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            await setCurrentUser(JSON.parse(storedUser));
            setUserLoginStatus(true);
            setVerified(storedUser.verified);
            setTeams(storedUser.teams)
        } else {
            return null;
        }
        /*const response = await axios.get(`https://localhost:7151/api/Hackathons/GetUserById?id=${currentUser.id}`)
        const data = response.data[0];
        console.log(data);
        if (data!=currentUser){
            setCurrentUser({})
            setTeams([])
        }*/
    }
    //to add in userlogincontextstore.js
   /* const checkTokenAndFetchUser = async () => {
        // Check if a token exists in local storage
        const token = localStorage.getItem('token');

        if (!token) {
            // No token, return null indicating no authenticated user
            return null;
        }

        // Token exists, send a request to verify it with the server
        try {
            const response = await axios.post('https://localhost:5000/user-api/verify-token', null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.message === 'Token is valid') {
                // Token is valid, fetch user data
                const userDataResponse = await axios.get('https://localhost:5000/user-api/get-user-info', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const user = userDataResponse.data.payload;
                setUserLoginStatus(true);
                setCurrentUser(user)
                // console.log(user)
                // return user;
            } else {
                // Token verification failed, return null
                return null;
            }
        } catch (error) {
            // Handle network errors or any other issues
            console.error(error);
            return null;
        }
    };*/
    useEffect(() => {
        const FetchData = async () => {
            await FetchUser();
        }
        FetchData();
    }, []);
    return (
        <loginContext.Provider value={[currentUser, loginUser, userLoginStatus, loginErr, logoutUser, verified, teams, fetchTeams]}>
            {children}
        </loginContext.Provider>
    )
}
export default UserLoginStore;