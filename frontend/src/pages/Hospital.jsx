import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { useLocation } from "react-router-dom";
import RequestContainer from "../components/RequestContainer";
import { v4 as uuidv4 } from "uuid";
import Mint from "./Mint";

const Hospital = () => {
  // const location = useLocation();
  const [currentTab, setCurrentTab] = useState("Home");
  const [selectedFile, setSelectedFile] = useState([]);
  const [pop, setPop] = useState(false);
  const [tokenId, SetTokenId] = useState("");
  const [Pid, setPid] = useState("");
  const [Doc, setDoc] = useState("");
  const [DiaCode, setDiaCode] = useState("");
  const [fileBase64String, setFileBase64String] = useState("");

  const [Meta, setMeta] = useState(false);
  const [Account, setAccount] = useState("");

  const tk = sessionStorage.getItem("tk");
  const [cnt, setCnt] = useState(true);
  console.log(tk);
  const [Request, setRequest] = useState([]);
  // const [Btn, setBtn] = useState("Connect Wallet");
  const [ReqBtn, setReq] = useState("Request");
  let request_to, Content;
  // const [request_to, setRequest_to] = useState();
  // const [Content, setContent] = useState();
  // const [Acc, setAcc] = useState(null);
  // const [CreBtn, setCreBtn] = useState(null);

  // const connWallet = async () => {
  //   if (window.ethereum) {
  //     // console.log("Metamask detected");
  //     const Acc = await window.ethereum.request({
  //       method: "eth_requestAccounts",
  //     });
  //     // debugger;

  //     const accounts = await provider.listAccounts();
  //     setBtn("Connected");
  //     setAcc(accounts);
  //     // console.log(accounts);
  //   }
  // };
  // `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWZiNjQ2YzkzZGFlNGQ2YTQzY2ZlOCIsImlhdCI6MTY4Mzk5NDE4MywiZXhwIjoxNjg2NTg2MTgzfQ.SORh5FXSTAsmbgPwtlTfVs50h6Vu1AlxJQUsU7WOP4o`,

  useEffect(() => {
    const fetchReq = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/request/mint/sender/check",
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
  // setInterval(() => {
  //   setCnt(!cnt);
  // }, 600000);

  const reqApproval = async (e, Pid, Doc, DiaCode) => {
    if (Meta) {
      e.preventDefault();
      console.log(Pid);
      let token_id = uuidv4();
      SetTokenId(tokenId);

      contract.setOwnersAndRequestApproval(String(Account), patAdd, tokenId);

      // request_to = e.target.UserID.value;
      // Content = e.target.Content.value;
      Content = `Request to mint your medical records for ${DiaCode} under Dr.${Doc}`;
      const result = await fetch("http://localhost:8000/api/request/mint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tk}`,
        },
        body: JSON.stringify({
          request_to: Pid,
          Content,
          diagnosis_code: DiaCode,
          doc_name: Doc,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.request);
        })
        .catch((err) => {
          console.log("error:" + err);
        });
    }
    // setResult(result.output);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files);
    console.log(e.target.files[0]);
  };
  const encodeFileBase64 = (file) => {
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        var Base64 = reader.result;
        console.log(Base64.substring(Base64.indexOf(",") + 1));
        // console.log(Base64);
        setFileBase64String(Base64.substring(Base64.indexOf(",") + 1));
      };
      reader.onerror = (error) => {
        console.log("error: ", error);
      };
    }
  };
  useEffect(() => {
    encodeFileBase64(selectedFile[0]);
  }, [selectedFile]);
  const handleMintUpload = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/nft/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tk}`,
      },
      body: JSON.stringify({
        token_id: tokenId,
        patient_username: Pid,
        hash: fileBase64String,
        diagnosis_code: DiaCode,
        doc_name: Doc,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      setPop(!pop);
      console.log(data);
    } else {
      throw new Error("Request failed with status: " + response.status);
    }
  };

  const handleUpload = async (request) => {
    setPid(request.request_to);
    setDiaCode(request.diagnosis_code);
    setDoc(request.doc_name);
    setPop(!pop);
  };

  //   e.preventDefault();
  //   let tk = parseInt(e.target.tokenID.value);
  //   console.log(Acc);
  //   // console.log(String(Acc));
  //   contract.setOwnersAndRequestApproval(
  //     String(Acc),
  //     e.target.patAdd.value,
  //     tk
  //   );
  //   setCreBtn("Create");
  // };

  // const creNft = async (e) => {
  //   e.preventDefault();

  // let t = parseInt(e.target.tokenId.value);
  // // let nm=document.getElementById("nftName").value;
  // let nm = e.target.nftName.value;
  // let desc = e.target.nftDesc.value;
  // let doc = e.target.nftDoc.value;
  // console.log(nm);
  // if (nm) {
  //   // console.log(desc)
  //   contract.createNFT(t, nm, desc, doc);
  // }
  // };

  const handleItemClick = (text) => {
    console.log(text);
  };
  return (
    <>
      <Navbar
        items={["Demo 1", "Demo 2"]}
        handleItemClick={handleItemClick}
        handleConnect={(conn, acc) => {
          setMeta(conn);
          setAccount(acc);
        }}
      />

      <div className=" w-screen py-1 bg-white/10 text-white text-sm flex justify-center items-center gap-10 ">
        <a href="#" onClick={() => setCurrentTab("Home")}>
          Home
        </a>
        <a href="#" onClick={() => setCurrentTab("Notifications")}>
          Notifications
        </a>
        {/* <div className="relative ml-8 ">
          <SearchBar handleSearch={handleSearch} />
        </div> */}
      </div>
      <div className="flex justify-center items-center h-[100vh-110px]">
        {currentTab === "Home" ? (
          <>
            <div className="flex justify-center items-center h-screen">
              <Mint handleSubmit={reqApproval} />
            </div>
          </>
        ) : (
          <RequestContainer requests={Request} RecordDetails={handleUpload} />
        )}
      </div>
      <div className="flex justify-center items-center">{/* <div> */}</div>
      {pop && (
        <div className=" absolute justify-center items-center bg-primary/90  top-0 left-0 w-full h-screen z-20">
          <div className="flex justify-center items-center w-screen h-screen">
            <form
              className="flex flex-col bg-primary justify-center items-center w-[390px] h-[200px] border-2 border-green-400 rounded-xl text-green-300"
              onSubmit={handleMintUpload}
            >
              <label className=" inline-block">
                Upload medical record to be minted as Nft
              </label>
              <input
                type="file"
                className="w-35 mb-3 border-b-[1px] border-solid  border-white bg-transparent focus:outline-none my-6"
                onClick={handleFileChange}
              />
              <button
                type="submit"
                className="bg-green-400 text-white hover:bg-violet-600 hover:brightness-125 duration-200"
              >
                Mint
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Hospital;
