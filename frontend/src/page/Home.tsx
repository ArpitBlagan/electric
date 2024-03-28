import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import Vechile from "./Vechile";
import Report from "./Report";
import Land from "./Land";
const Home = () => {
  const [sele, setSele] = useState("Home");
  const [show, setS] = useState(false);
  return (
    <div className="flex mt-2 mx-2 gap-2 relative">
      <div className="w-1/6 p-2 pt-4 border h-screen border-gary-300 rounded-xl hidden md:block">
        <Sidebar sele={sele} setSele={setSele} />
      </div>
      {show && (
        <div className="h-screen w-1/2 left-0 top-0 p-2 pt-4 absolute flex flex-col bg-white rounded-e-lg">
          <div className="flex justify-end items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              onClick={() => {
                setS(false);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <Sidebar sele={sele} setSele={setSele} />
        </div>
      )}
      <div className="flex-1 overflow-y-scroll p-2 border border-gary-300 rounded-xl">
        <Navbar title={sele} setS={setS} />
        {sele == "Home" && <Land />}
        {sele == "Vechile" && <Vechile />}
        {sele == "Report" && <Report />}
      </div>
    </div>
  );
};

export default Home;
