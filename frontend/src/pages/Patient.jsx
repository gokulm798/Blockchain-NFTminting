import React, { useState } from "react";
import "../styles/patStyle.css";
import { provider, signer, contract } from "../ConnWallet";
import Modal from "react-modal";
import { Link } from "react-router-dom";
// const { ethers } = require("ethers");
Modal.setAppElement("body");

const Patient = () => {
  // console.log(ethers.version)
  const [Acc, setAcc] = useState(null);
  const [Token, setToken] = useState(null);
  const [btnText, setBtnText] = useState("Connect Wallet");

  const [modalContent, setmodalContent] = useState(null);
  const [dispModal, setdispModal] = useState(false);
  const [SelectedAccount, setSelectedAccount] = useState(null);

  const connWallet = async () => {
    console.log("hi");
    if (window.ethereum) {
      console.log("Metamask detected");
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      // // debugger;

      // window.ethereum.on("accountsChanged", connWallet);
      // let accounts= await provider.listAccounts();
      console.log(accounts.length);
      if (accounts.length === 1) {
        setSelectedAccount(accounts[0]);
        return;
      } else {
        const accList = accounts.map((account) => (
          <li
            key={account}
            style={{ color: "#000" }}
            onClick={() => handleAccountSelect(account)}
          >
            <Link>{account}</Link>
          </li>
        ));

        const handleAccountSelect = (account) => {
          setSelectedAccount(account);
          setBtnText("Connected");
          closeModal();
        };
        <ul>{accList}</ul>;
        openModal();
        setmodalContent;
        // }
      }
    } else console.log("No metamask");
  };

  const openModal = () => {
    setdispModal(true);
  };
  const closeModal = () => {
    setdispModal(false);
  };
  const approveNft = (e) => {
    e.preventDefault();
    contract.respondToNFTApproval(true);
  };
  const declineNft = () => {
    contract.respondToNFTApproval(false);
  };
  const approveAccess = () => {
    contract.respondToNFTApproval(true);
  };
  const declineAccess = () => {
    contract.respondToNFTApproval(true);
  };
  const getNft = async (e) => {
    e.preventDefault();
    const nft = await contract.getNFT(e.target.TokenID.value);
    console.log(nft);
  };

  return (
    <div>
      <div className="topPanel" style={{ display: "flex", marginLeft: "auto" }}>
        <div>
          {" "}
          <button id="metaConnbtn" onClick={connWallet}>
            {btnText}
          </button>
        </div>

        {/* <div className="panel"></div> */}
        <Modal isOpen={dispModal} onRequestClose={closeModal}>
          ariaHideApp={false}
          {modalContent}
          <button onClick={closeModal}>Close Modal</button>
        </Modal>
      </div>
      <div className="patContainer">
        <p>Request for minting NFT</p>
        <button onClick={approveNft}>Approve</button>
        <button onClick={declineNft}>Reject</button>
      </div>
      <div className="patContainer">
        <p>Request for licensing NFT</p>
        <button onClick={approveAccess}>Approve</button>
        <button onClick={declineAccess}>Reject</button>
      </div>
      <div className="patContainer">
        <p>Get NFT</p>
        <input id="TokenID" placeholder="Token ID" type={"text"} />
        <button onClick={getNft}>Get</button>
      </div>
    </div>
  );
};

export default Patient;
