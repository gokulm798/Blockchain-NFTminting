import React, { useState } from "react";
import { provider, contract } from "../ConnWallet";

const MintPage = () => {
  const [Btn, setBtn] = useState("Connect Wallet");
  const [ReqBtn, setReq] = useState("Request");
  const [Acc, setAcc] = useState(null);
  const [CreBtn, setCreBtn] = useState(null);

  // const [contract,setContr]=useState(null);
  // const [provider,setProv]=useState(null);
  // const [signer,setSigner]=useState(null);

  // const contrAddr="0xC0e1Cc47c0b10f3373844430bae21DcaD60b948C"

  const connWallet = async () => {
    if (window.ethereum) {
      // console.log("Metamask detected");
      const Acc = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // debugger;

      const accounts = await provider.listAccounts();
      setBtn("Connected");
      setAcc(accounts);
      // console.log(accounts);
    }
  };
  const reqApproval = (e) => {
    e.preventDefault();
    let tk = parseInt(e.target.tokenID.value);
    console.log(Acc);
    // console.log(String(Acc));
    contract.setOwnersAndRequestApproval(
      String(Acc),
      e.target.patAdd.value,
      tk
    );
    setCreBtn("Create");
  };

  // const sendToken=(tk)=>{
  //     // console.log(tk)

  // }
  const creNft = (e) => {
    e.preventDefault();
    let t = parseInt(e.target.tokenId.value);
    // let nm=document.getElementById("nftName").value;
    let nm = e.target.nftName.value;
    let desc = e.target.nftDesc.value;
    let doc = e.target.nftDoc.value;
    console.log(nm);
    if (nm) {
      // console.log(desc)
      contract.createNFT(t, nm, desc, doc);
    }
  };

  return (
    <div>
      <div className="topPanel">
        <button onClick={connWallet}>{Btn}</button>
      </div>
      <div className="hosp">
        <div>
          <form className="mintForm" onSubmit={reqApproval}>
            <div className="mintContainer">
              <input id="patAdd" placeholder="Patient Address" type={"text"} />
              <input id="tokenID" placeholder="Token ID" type={"text"}></input>
              <button type="submit">{ReqBtn}</button>
            </div>
          </form>
        </div>
        {CreBtn && (
          <div>
            <form onSubmit={creNft}>
              <input id="tokenId" placeholder="Token" type={"text"} />
              <input id="nftName" placeholder="Name" type={"text"} />
              <input id="nftDesc" placeholder="Description" type={"text"} />
              <input id="nftDoc" placeholder="String" type={"text"} />
              <button type="submit">{CreBtn}</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default MintPage;
