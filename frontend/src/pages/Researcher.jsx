import React, { useState } from "react";
import { provider, contract } from "../ConnWallet";
const Researcher = () => {
  const [Btn, setBtn] = useState("Connect Wallet");
  const [ReqBtn, setReq] = useState("Request");
  const [Acc, setAcc] = useState(null);
  const connWallet = async () => {
    if (window.ethereum) {
      console.log("Metamask detected");
      const Acc = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      //   const accounts = await provider.listAccounts();
      setBtn("Connected");
      setAcc(Acc);
    }
  };
  const reqLicense = (e) => {
    e.preventDefault();
    let tok = parseInt(e.target.tID.value);
    let time = parseInt(e.target.time.value);
    contract.requestApprovalForLicense(tok, time);
    setReq("Requested");
  };
  const getNft = async (e) => {
    e.preventDefault();
    const nft = await contract.getNFT(e.target.TokenID.value);
    console.log(nft);
  };

  return (
    <div>
      <div className="topPanel">
        <button onClick={connWallet}>{Btn}</button>
      </div>
      <div className="mintForm">
        <form onSubmit={reqLicense}>
          <div className="mintContainer">
            <input id="tID" placeholder="Token ID" type={"text"}></input>
            <input
              id="time"
              placeholder="Duration(in seconds)"
              type={"text"}
            ></input>
            <button>{ReqBtn} License</button>
          </div>
        </form>
      </div>
      <div className="patContainer">
        <p>Get NFT</p>
        <input id="TokenID" placeholder="Token ID" type={"text"} />
        <button onClick={getNft}>Get</button>
      </div>
    </div>
  );
};

export default Researcher;
