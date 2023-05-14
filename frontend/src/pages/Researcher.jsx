import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import RecordContainer from "../components/RecordContainer";
import RequestContainer from "../components/RequestContainer";
import PopUp from "../components/PopUp";

const Researcher = () => {
  const [currentTab, setCurrentTab] = useState("history");
  const [expanded, setExpanded] = useState(false);
  const [Feed, setFeed] = useState([]);
  const [Request, setRequest] = useState([]);
  // const records = ["Demo Post 1", "Demo Post 2", "Demo Post 3"];
  // const requests = ["Demo Request 1", "Demo Request 2"];
  const tk = sessionStorage.getItem("tk");
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/feed/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tk}`,
          },
        });

        if (response.ok) {
          const feed = await response.json();
          console.log(feed);

          //  console.log(details._id);
          setFeed(feed);
        } else {
          throw new Error("Request failed with status: " + response.status);
        }
      } catch (error) {
        // console.log(error);

        console.log("Error: " + error.message);
      }
    };
    fetchFeed();
  }, []);

  /*




useEffect(() => {
  const fetchReq = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/request/mint/check",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tk}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log(data._id);
        setRequest(data);
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };
  fetchReq();
  console.log(cnt);
}, [cnt]);

const acceptReq = async (request) => {
  console.log(request._id);

  const response = await fetch(
    "http://localhost:8000/api/request/mint/check/accept",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tk}`,
      },
      body: JSON.stringify({ reqId: request._id }),
    }
  );
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    setCnt(cnt + 1);
    // console.log(cnt);
  } else {
    throw new Error("Request failed with status: " + response.status);
  }
};

const rejectReq = async (request) => {
  const response = await fetch(
    "http://localhost:8000/api/request/mint/check/decline",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tk}`,
      },
      body: JSON.stringify({ reqId: request._id }),
    }
  );
  if (response.ok) {
    const data = await response.json();
    setCnt(cnt + 1);
    console.log(data);
  } else {
    throw new Error("Request failed with status: " + response.status);
  }
};*/

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
            records={Feed}
            licenseNft={handleViewNft}
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
