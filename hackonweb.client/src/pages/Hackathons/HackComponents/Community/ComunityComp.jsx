import Community from "./Community";
import Community2 from "./Community2";
function ComunityComp() {
    return (
        <div className="flex flex-wrap">
            <div className="w-full md:w-2/3 overflow-y-auto c1">
                <div className="h-full community2-container">
                    <Community />
                </div>
            </div>
            <div className="w-full md:w-1/3 overflow-y-auto relative c2">
                <div className="h-full">
                    <Community2 />
                </div>
            </div>
        </div>
    );
}

export default ComunityComp;