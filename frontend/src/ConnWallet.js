import recordNft_abi from "../src/recordNft_abi.json";

import { ethers } from "ethers";

// initialize provider
const provider = new ethers.providers.Web3Provider(window.ethereum);

// initialize signer
const signer = provider.getSigner();

// initialize contract
const contractAddress = "0x8034180398A7d796fBFA65081fA25753b5fB4904";
const contract = new ethers.Contract(contractAddress, recordNft_abi, signer);

export { provider, signer, contract };
