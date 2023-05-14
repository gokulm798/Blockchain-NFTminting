import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import RecordContainer from "../components/RecordContainer";
import RequestContainer from "../components/RequestContainer";
import PopUp from "../components/PopUp";

const Researcher = () => {
  const [currentTab, setCurrentTab] = useState("history");
  const [expanded, setExpanded] = useState(false);
  const records = ["Demo Post 1", "Demo Post 2", "Demo Post 3"];
  const requests = ["Demo Request 1", "Demo Request 2"];

  const handleViewNft = (e) => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  return (
    <div>
      {/* <PopUp /> */}
      <Navbar items={[]} />
      <div className=" w-screen py-1 bg-white/10 text-white text-sm flex justify-center items-center gap-2 ">
        <a href="#" onClick={() => setCurrentTab("history")}>
          History
        </a>
        <a href="#" onClick={() => setCurrentTab("requests")}>
          Requests
        </a>
        <div className="relative ml-8 ">
          <SearchBar />
        </div>
      </div>
      <div className="flex justify-center ">
        {currentTab === "history" ? (
          <RecordContainer
            records={records}
            recordView={handleViewNft}
            expanded={expanded}
          />
        ) : (
          <RequestContainer requests={requests} />
        )}
      </div>
    </div>
  );
};

export default Researcher;
