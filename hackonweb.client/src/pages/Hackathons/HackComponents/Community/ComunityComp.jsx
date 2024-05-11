import Community from "./Community";
import Community2 from "./Community2";
import { React, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './Community.css';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { loginContext } from "../../../../contexts/loginContext";
function ComunityComp() {
    const [team, setTeam] = useState({});
    const [mainCommunityDetails, setCommunityDetails] = useState({});
    let [currentUser, loginUser, userLoginStatus, loginErr, logoutUser, verified, teams, fetchTeams] = useContext(loginContext)
    const GetCommunityDetails = async () => {
        try {
            console.log(teams)
            for (let i = 0; i < teams.length; i++) {
                if (teams[i].status === 1) {
                    console.log("response of search", teams[i]);
                    setTeam(teams[i]);
                    break;
                }
            }
            if (team != undefined) {
                const response = await axios.get(`https://localhost:7151/api/Hackathons/GetCommunityDetails?Id=${team.teamId}`);
                if (response.data !== null) {
                    setCommunityDetails(response.data);
                    console.log("response of comm", response.data);
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
    const [sectionRef, sectionInView] = useInView();
    const [visionRef, visionInView] = useInView();
    const popInVariant = {
        hidden: { scale: 0 },
        visible: {
            scale: 1,
            transition: { duration: 1.5, ease: "easeOut" },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, delay: 0.5 },
        },
    };

    useEffect(() => {
        GetCommunityDetails();
    }, [])

   
    return (
        <motion.div className="total flex flex-wrap"
            initial="hidden"
            variants={itemVariants}
            animate={sectionInView ? "visible" : "hidden"}
            ref={sectionRef}>
            <div className="md:w-3/5 overflow-y-auto c1 overflow-hidden lg:pb-[90px] bg-white dark:bg-dark animate__animated animate__fadeIn"
                variants={itemVariants}
                initial="hidden"
                animate={visionInView ? "visible" : "hidden"}
                ref={sectionRef}>
                <div className="">
                    <Community mainCommunityDetails={mainCommunityDetails} sendDataToParent={handleDataFromCommunity} />
                </div>
            </div>
            <div className="md:w-2/5 overflow-y-auto relative c2">
                <div className="">
                    <Community2 mainCommunityDetails={mainCommunityDetails} sendDataToParent={handleDataFromCommunity} />
                </div>
            </div>
        </motion.div>
    );
}

export default ComunityComp;