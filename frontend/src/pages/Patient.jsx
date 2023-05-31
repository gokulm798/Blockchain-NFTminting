import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import RecordContainer from "../components/RecordContainer";
import RequestContainer from "../components/RequestContainer";
import SearchBar from "../components/SearchBar";
import { ethers } from "ethers";
import RecordViewer from "../components/RecordViewer";
import { useLocation } from "react-router-dom";
import PopUp from "../components/PopUp";
import { contract } from "../ConnWallet";
import { toast } from "react-toastify";

const Patient = (props) => {
  const [currentTab, setCurrentTab] = useState("history");
  const [ReqTab, setReqTab] = useState(false);
  const [showReq, setShowReq] = useState("License");
  const [Veiw, setVeiw] = useState(false);
  const [MintRequest, setMintRequest] = useState([]);
  const [LicRequest, setLicRequest] = useState([]);
  const [Record, setRecord] = useState([]);
  const [Details, setDetails] = useState();
  const [fileString, setFileString] = useState("");
  const [Pop, setPop] = useState(false);
  // const location = useLocation();
  const tk = sessionStorage.getItem("tk");
  const [cnt, setCnt] = useState(true);

  const [Meta, setMeta] = useState(false);
  const [Account, setAccount] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/user/details/check",
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
          if (details) {
            if (details.detail == false) {
              console.log("hi");
              setPop(true);
            }
          }
          console.log(details._id);
          setDetails(details);
        } else {
          throw new Error("Request failed with status: " + response.status);
        }
      } catch (error) {
        // console.log(error);

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
  }, [currentTab]);

  useEffect(() => {
    const fetchLicReq = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/request/license/check",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tk}`,
            },
          }
        );

        if (response.ok) {
          const lic = await response.json();
          console.log(lic);
          // console.log(lic._id);
          setLicRequest(lic);
        } else {
          throw new Error("Request failed with status: " + response.status);
        }
      } catch (error) {
        console.log("Error: " + error.message);
      }
    };
    fetchLicReq();

    const fetchMintReq = async () => {
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

          setMintRequest(data);
        } else {
          throw new Error("Request failed with status: " + response.status);
        }
      } catch (error) {
        console.log("Error: " + error.message);
      }
    };
    fetchMintReq();
  }, [cnt, showReq]);

  const acceptLicReq = async (request) => {
    if (Meta) {
      try {
        // sm = await contract.approve();
        console.log(request.researcher_address);
        try {
          await contract.respondToLicenseRequest(
            ethers.utils.getAddress(request.researcher_address),
            true
          );
        } catch (error) {
          toast.error(error.message);
        }
        const response = await fetch(
          "http://localhost:8000/api/request/license/check/accept",
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
          setCnt(!cnt);
          // console.log(cnt);
        } else {
          throw new Error("Request failed with status: " + response.status);
        }
      } catch (error) {
        console.log(error);
        //set popup
      }
    } else toast.info("Connect your wallet");
  };

  const rejectLicReq = async (request) => {
    if (Meta) {
      try {
        await contract.respondToLicenseRequest(false);
        console.log(request.researcher_address);
        await contract.respondToLicenseRequest(
          ethers.utils.getAddress(request.researcher_address),
          true
        );
        const response = await fetch(
          "http://localhost:8000/api/request/license/check/decline",
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
          setCnt(!cnt);
          // console.log(cnt);
        } else {
          throw new Error("Request failed with status: " + response.status);
        }
      } catch (error) {
        console.log(error);
        //set popup
      }
    } else toast.info("Connect your wallet");
  };

  const acceptMintReq = async (request) => {
    console.log(Meta);
    if (Meta) {
      console.log(request._id);
      try {
        await contract.accept();
        // console.log(sm);

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
          setCnt(!cnt);
          // console.log(cnt);
        } else {
          throw new Error("Request failed with status: " + response.status);
        }
      } catch (error) {
        console.log(error);
        //set popup
      }
    } else toast.info("Connect your wallet");
  };

  const rejectMintReq = async (request) => {
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
      setCnt(!cnt);
      console.log(data);
    } else {
      throw new Error("Request failed with status: " + response.status);
    }
  };

  const detailsSubmit = async (e, Gender, BloodGroup, Dob) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/user/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tk}`,
      },
      body: JSON.stringify({
        gender: Gender,
        bloodGroup: BloodGroup,
        DateOfBirth: Dob,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      setCnt(cnt + 1);
      console.log(data);
    } else {
      throw new Error("Request failed with status: " + response.status);
    }

    console.log(Dob);
    setPop(false);
  };
  // const { fileBase64String } = location.state;
  // console.log(fileBase64String);
  const records = ["Demo Post 1", "Demo Post 2", "Demo Post 3", "Demo Post 4"];
  // const record = [{ hi: "demo" }];
  // const requests = ["Demo Request 1", "Demo Request 2"];
  const handleRecordView = async (token, cid, pid) => {
    console.log(cid);
    try {
      const response = await fetch("http://localhost:8000/api/nft/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tk}`,
        },
        body: JSON.stringify({ cid }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log(data.content);
        setFileString(data.content);
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    } catch (error) {
      console.log("Error: " + error.message);
    }

    setVeiw(true);
  };
  return (
    <div>
      <div>
        <Navbar
          items={[]}
          handleConnect={(conn, acc) => {
            setMeta(conn);
            setAccount(acc);
          }}
        />
      </div>
      <div className=" w-screen py-1 bg-white/10 text-white text-sm flex justify-center items-center gap-2 ">
        <div>
          <a href="#" onClick={() => setCurrentTab("history")}>
            History
          </a>
        </div>
        <div>
          <a
            href="#"
            onClick={() => {
              setCurrentTab("requests");
              setReqTab(true);
            }}
          >
            Requests
          </a>
        </div>

        <div className="relative ml-8 ">
          <SearchBar />
        </div>
      </div>
      {ReqTab && (
        <div className=" bg-primary/5 flex w-screen justify-center items-center gap-20 text-sm text-white ">
          <a href="#" onClick={() => setShowReq("License")}>
            License
          </a>
          <a href="#" onClick={() => setShowReq("Mint")}>
            Mint
          </a>
        </div>
      )}
      <div className="flex justify-center items-center w-screen">
        {currentTab === "history" ? (
          <RecordContainer records={Record} recordView={handleRecordView} />
        ) : (
          <>
            {showReq === "License" ? (
              <RequestContainer
                requests={LicRequest}
                aColour="hover:text-green-400"
                rColour="hover:text-red-500"
                aBtn="Accept"
                rBtn="Reject"
                acptF={acceptLicReq}
                rejtF={rejectLicReq}
                RecordDetails={() => {}}
                filter="license"
              />
            ) : (
              <RequestContainer
                requests={MintRequest}
                aColour="hover:text-green-400"
                rColour="hover:text-red-500"
                aBtn="Accept"
                rBtn="Reject"
                acptF={acceptMintReq}
                rejtF={rejectMintReq}
                RecordDetails={() => {}}
                filter="mint"
              />
            )}
          </>
        )}
      </div>
      {Veiw && (
        <div
          className="flex justify-center bg-primary/60 fixed top-0 left-0 w-full h-screen z-20 duration-700"
          onClick={() => setVeiw(false)}
        >
          <RecordViewer base64String={fileString} />
        </div>
      )}
      {Pop && <PopUp handleSubmit={detailsSubmit} />}
    </div>
  );
};

export default Patient;
