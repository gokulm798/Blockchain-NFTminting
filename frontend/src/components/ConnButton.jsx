import React, { useState } from "react";
import { provider, signer, contract } from "../ConnWallet";
const ConnButton = () => {
  const [ConBtn, setConBtn] = useState("Connect Wallet");
  const connWallet = async () => {
    if (window.ethereum) {
      // console.log("Metamask detected");
      const Acc = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // debugger;

      const accounts = await provider.listAccounts();
      setConBtn(
        String(accounts).substring(0, 4) + "...." + String(accounts).substr(-4)
      );
      // setAcc(accounts);
      // console.log(accounts);
    }
  };
  return (
    <div>
      <button
        className="relative inline-block overflow-hidden text-xs md:text-sm bg-white text-violet-800 rounded-3xl px-7 border-none hover:bg-violet-800 hover:text-white hover: transition-all duration-200 focus:bg-violet-800 focus:text-white w-[137px] md:w-[150px]"
        onClick={connWallet}
      >
        {ConBtn}
      </button>
    </div>
  );
};

export default ConnButton;
