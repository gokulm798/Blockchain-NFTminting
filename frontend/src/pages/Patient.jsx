import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import RecordContainer from "../components/RecordContainer";
import RequestContainer from "../components/RequestContainer";
import SearchBar from "../components/SearchBar";

import RecordViewer from "../components/RecordViewer";
import { useLocation } from "react-router-dom";
import PopUp from "../components/PopUp";

const Patient = (props) => {
  const [currentTab, setCurrentTab] = useState("history");
  const [Veiw, setVeiw] = useState(false);
  const [Request, setRequest] = useState([]);
  const [Record, setRecord] = useState([]);
  const [Details, setDetails] = useState();
  const [Pop, setPop] = useState(false);
  // const location = useLocation();
  const tk = sessionStorage.getItem("tk");
  const [cnt, setCnt] = useState(0);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/details/check",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tk}`,
            },
          }
        );

        if (response.ok) {
          const details = await response.json();
          console.log(details);
          console.log(details._id);
          setDetails(details);
        } else {
          throw new Error("Request failed with status: " + response.status);
        }
      } catch (error) {
        if (error == 400) {
          setPop(true);
        }
        console.log("Error: " + error.message);
      }
    };
    fetchDetails();

    const fetchHistory = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user/history", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tk}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          console.log(data._id);
          setRecord(data);
        } else {
          throw new Error("Request failed with status: " + response.status);
        }
      } catch (error) {
        console.log("Error: " + error.message);
      }
    };
    fetchHistory();
  }, []);

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

  // const { fileBase64String } = location.state;
  // console.log(fileBase64String);
  const records = ["Demo Post 1", "Demo Post 2", "Demo Post 3", "Demo Post 4"];
  // const record = [{ hi: "demo" }];
  // const requests = ["Demo Request 1", "Demo Request 2"];
  const handleRecordView = () => {
    setVeiw(true);
  };
  return (
    <div>
      <div>
        <Navbar items={[]} />
      </div>
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
      <div className="flex justify-center items-center w-screen">
        {currentTab === "history" ? (
          <RecordContainer records={Record} recordView={handleRecordView} />
        ) : (
          <RequestContainer
            requests={Request}
            aColour="green-400"
            rColour="red-500"
            aBtn="Accept"
            rBtn="Reject"
            acptF={acceptReq}
            rejtF={rejectReq}
          />
        )}
      </div>
      {Veiw && (
        <div
          className="flex justify-center bg-primary/60 fixed top-0 left-0 w-full h-screen z-20 duration-700"
          onClick={() => setVeiw(false)}
        >
          <RecordViewer base64String={fileBase64String} />
        </div>
      )}
      {Pop && <PopUp />}
    </div>
  );
};

export default Patient;
