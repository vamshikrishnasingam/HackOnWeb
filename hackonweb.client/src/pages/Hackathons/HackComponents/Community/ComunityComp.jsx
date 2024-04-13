import Community from "./Community";
import Community2 from "./Community2";
import './Community.css';
function ComunityComp() {
    return (
        <div className="total flex flex-wrap">
            <div className="md:w-3/5 overflow-y-auto c1">
                <div className="">
                    <Community />
                </div>
            </div>
            <div className="md:w-2/5 overflow-y-auto relative c2">
                <div className="">
                    <Community2 />
                </div>
            </div>
        </div>
    );
}

export default ComunityComp;