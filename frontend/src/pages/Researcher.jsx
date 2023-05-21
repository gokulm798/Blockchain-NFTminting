import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import RecordContainer from "../components/RecordContainer";
import RequestContainer from "../components/RequestContainer";
import PopUp from "../components/PopUp";
import { contract } from "../ConnWallet";
import RecordViewer from "../components/RecordViewer";

const Researcher = () => {
  const [currentTab, setCurrentTab] = useState("history");
  const [expanded, setExpanded] = useState(false);
  const [Feed, setFeed] = useState([]);
  const [OrgFeed, setOrgFeed] = useState([]);
  const [Request, setRequest] = useState([]);
  // const [cnt, setCnt] = useState(true);
  const [token, setToken] = useState("");
  // const [cid, setCid] = useState("");
  const [pid, setPid] = useState("");
  const [Veiw, setVeiw] = useState(false);
  const [Meta, setMeta] = useState(false);
  const [Account, setAccount] = useState("");
  const [fileString, setFileString] = useState("");

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
          setOrgFeed(feed);
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

  useEffect(() => {
    const fetchReq = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/request/license/sender/check",
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
          console.log(data);
          //evide
          setRequest(data);
        } else {
          throw new Error("Request failed with status: " + response.status);
        }
      } catch (error) {
        console.log("Error: " + error.message);
      }
    };
    fetchReq();
    // console.log(cnt);
  }, []);
  // setInterval(() => {
  //   setCnt(!cnt);
  // }, 20000);
  /*
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

  const handleSearch = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/feed/search/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tk}`,
      },
      body: JSON.stringify({ keyword: e.target.value }),
    });
    if (response.ok) {
      const datas = await response.json();
      console.log(datas);
      if (!e.target.value) return setFeed(OrgFeed);
      setFeed(
        datas.filter((data) => {
          const lowerCaseValue = e.target.value.toLowerCase();
          const lowerCaseDisease = data.diagnosis_disease.toLowerCase();

          return (
            lowerCaseDisease.startsWith(lowerCaseValue) ||
            lowerCaseDisease.includes(lowerCaseValue)
          );
        })
      );
    } else {
      throw new Error("Request failed with status: " + response.status);
    }

    // useEffect(() => {}, [rsltArray]);
  };

  const handleLicenseReq = async (e, time) => {
    e.preventDefault();
    console.log(Meta);
    if (Meta) {
      try {
        await contract.requestApprovalForLicense(token, time);
        let content = `License`;
        console.log(pid);
        console.log(String(time));
        console.log(token);

        const response = await fetch(
          "http://localhost:8000/api/request/license",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tk}`,
            },
            body: JSON.stringify({
              request_to: pid,
              time: String(time),
              token,
              content,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          console.log(data.content);
          // setFileString(data.content);
        } else {
          throw new Error("Request failed with status: " + response.status);
        }
      } catch (error) {
        console.log("Error: " + error.message);
      }

      setExpanded(false);
    }
  };

  const handleViewNft = (e) => {
    e.preventDefault();
    // console.log(cid);
    setExpanded(!expanded);
  };

  const handleLicensedNft = async (request) => {
    console.log(request.token);
    let token = request.token;
    // console.warn(cid);
    let cid = await contract.getNFT(token);
    console.warn(cid);
    if (cid != "") {
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
          setFileString("");
        }
      } catch (error) {
        console.log("Error: " + error.message);
        setFileString("");
      }
      setVeiw(true);
    }
  };

  return (
    <div>
      {/* <PopUp /> */}
      <Navbar
        items={[]}
        handleConnect={(conn, acc) => {
          setMeta(conn);
          setAccount(acc);
        }}
      />
      <div className=" w-screen py-1 bg-white/10 text-white text-sm flex justify-center items-center gap-2 ">
        <a href="#" onClick={() => setCurrentTab("history")}>
          Feeds
        </a>
        <a href="#" onClick={() => setCurrentTab("requests")}>
          Requests
        </a>
        <div className="relative ml-8 ">
          <SearchBar handleSearch={handleSearch} />
        </div>
      </div>
      <div className="flex justify-center ">
        {currentTab === "history" ? (
          <RecordContainer
            records={Feed}
            licenseNft={handleViewNft}
            recordView={(token, cid, pid) => {
              // setCid(cid);
              setPid(pid);
              setToken(token);
            }}
            getTime={handleLicenseReq}
            expanded={expanded}
          />
        ) : (
          <RequestContainer
            requests={Request}
            filterAcceptedOnly={false}
            RecordDetails={handleLicensedNft}
          />
        )}
      </div>
      {Veiw && (
        <div
          className="flex justify-center bg-primary fixed top-0 left-0 w-full h-screen z-20 duration-700"
          onClick={() => setVeiw(false)}
        >
          <RecordViewer base64String={fileString} />
        </div>
      )}
    </div>
  );
};

export default Researcher;
