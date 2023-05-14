import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { useLocation } from "react-router-dom";

const MintNft = () => {
  const location = useLocation();
  // const data = location.state;
  // const tk = data.tk;
  // Get data from session storage
  const tk = sessionStorage.getItem("tk");

  console.log(tk);

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

  const reqApproval = async (e) => {
    e.preventDefault();
    console.log(e.target.UserID.value);
    request_to = e.target.UserID.value;
    Content = e.target.Content.value;
    const result = await fetch("http://localhost:8000/api/request/mint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tk}`,
      },
      body: JSON.stringify({ request_to, Content }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.request);
      })
      .catch((err) => {
        console.log("error:" + err);
      });

    // setResult(result.output);
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
      <Navbar items={["Demo 1", "Demo 2"]} handleItemClick={handleItemClick} />

      <div className="flex justify-center">
        <div>
          <form className="mintForm " onSubmit={reqApproval}>
            <div className="mintContainer">
              <input id="UserID" placeholder="UserID" type={"text"} />
              <input id="Content" placeholder="Content" type={"text"}></input>
              <button type="submit">{ReqBtn}</button>
            </div>
          </form>
        </div>
        {/* {CreBtn && (
          <div>
            <form onSubmit={creNft}>
              <input id="tokenId" placeholder="Token" type={"text"} />
              <input id="nftName" placeholder="Name" type={"text"} />
              <input id="nftDesc" placeholder="Description" type={"text"} />
              <input id="nftDoc" placeholder="String" type={"text"} />
              <button type="submit">{CreBtn}</button>
            </form>
          </div>
        )} */}
      </div>
    </>
  );
};

export default MintNft;
