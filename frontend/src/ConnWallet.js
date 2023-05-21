import recordNft_abi from "../src/recordNft_abi.json";

import { ethers } from "ethers";

// initialize provider
const provider = new ethers.providers.Web3Provider(window.ethereum);
//Request permission to metamask to connect to user's account
await provider.send("eth_requestAccounts", []);

// initialize signer
const signer = provider.getSigner();

// initialize contract
const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
const contract = new ethers.Contract(contractAddress, recordNft_abi, signer);

export { provider, signer, contract };
