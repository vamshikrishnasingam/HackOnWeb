import Community from "./Community";
import Community2 from "./Community2";
import './Community.css';

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
function ComunityComp() {


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
    return (
        <motion.div className="total flex flex-wrap"
            initial="hidden"
            variants={popInVariant}
            animate={sectionInView ? "visible" : "hidden"}
            ref={sectionRef}>
            <div className="md:w-3/5 overflow-y-auto c1 overflow-hidden lg:pb-[90px] bg-white dark:bg-dark animate__animated animate__fadeIn"
                variants={itemVariants}
                initial="hidden"
                animate={visionInView ? "visible" : "hidden"}
                ref={sectionRef}>
                <div className="">
                    <Community />
                </div>
            </div>
            <div className="md:w-2/5 overflow-y-auto relative c2">
                <div className="">
                    <Community2 />
                </div>
            </div>
        </motion.div>
    );
}

export default ComunityComp;