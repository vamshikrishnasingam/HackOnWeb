import { useState } from "react"
import axios from "axios";
import { loginContext } from "./loginContext";

// eslint-disable-next-line react/prop-types
function UserLoginStore({ children }) {
    const [currentUser, setCurrentUser] = useState({});
    const [loginErr, setLoginErr] = useState("")
    const [userLoginStatus, setUserLoginStatus] = useState(false)
    //function to make user login reuqest
    const loginUser = async (userCredObj) => {
        try {
            const response = await axios.post("https://localhost:7151/api/Hackathons/LoginWithPassword", userCredObj);
            if (response.status === 200) {
                setCurrentUser(response.data);
                setLoginErr("");
                setUserLoginStatus(true);
                // store jwt token in local storage (you need to adjust this based on your actual token handling)
                localStorage.setItem("user", JSON.stringify(response.data));
            } else {
                setLoginErr("Login failed. Please check your credentials.");
            }
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
            const response = await axios.post('http://localhost:5000/user-api/verify-token', null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.message === 'Token is valid') {
                // Token is valid, fetch user data
                const userDataResponse = await axios.get('http://localhost:5000/user-api/get-user-info', {
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
   /* useEffect(() => {
        checkTokenAndFetchUser();
    }, []);*/
    return (
        <loginContext.Provider value={[currentUser, loginUser, userLoginStatus, loginErr, logoutUser]}>
            {children}
        </loginContext.Provider>
    )
}
export default UserLoginStore;