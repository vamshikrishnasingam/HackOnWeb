import Community from "./Community";
import Community2 from "./Community2";

function ComunityComp() {
    return (
      <div className="flex flex-wrap">
            <div className="flex w-full flex-col md:w-3/4">
                <Community/>
            </div>
            <div className="pointer-events-none relative hidden select-none bg-black md:block md:w-1/4">
                    <Community2/>
             </div>
        </div>
  );
}

export default ComunityComp;