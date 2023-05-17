import React, { useState } from "react";
import { provider, signer, contract } from "../ConnWallet";
const ConnButton = ({ handleConnect }) => {
  const [ConBtn, setConBtn] = useState("Connect Wallet");
  const [Connection, setConnection] = useState(false);
  const tk = sessionStorage.getItem("tk");

  console.log(tk);

  const connWallet = async () => {
    if (window.ethereum) {
      // console.log("Metamask detected");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // const accounts = await provider.listAccounts();
      setConBtn(
        String(accounts).substring(0, 4) + "...." + String(accounts).substr(-4)
      );
      console.log(accounts);
      const response = await fetch("http://localhost:8000/api/accounts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tk}`,
        },
        body: JSON.stringify({ address: String(accounts) }),
      });
      if (response.ok) {
        const data = await response.json();
        setConnection(true);
        if (data.anotherAccount) {
        }
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    }
  };
  handleConnect(Connection, accounts);
  return (
    <div>
      <button
        className="relative inline-block overflow-hidden text-xs md:text-sm bg-white text-violet-800 rounded-3xl px-7 border-none hover:bg-violet-800 hover:text-white hover: transition-all duration-200  focus:bg-violet-800 focus:text-white w-[137px] md:w-[150px]"
        onClick={connWallet}
      >
        {ConBtn}
      </button>
    </div>
  );
};

export default ConnButton;
