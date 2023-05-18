import recordNft_abi from "../src/recordNft_abi.json";

import { ethers } from "ethers";

// initialize provider
const provider = new ethers.providers.Web3Provider(window.ethereum);

// initialize signer
const signer = provider.getSigner();

// initialize contract
const contractAddress = "0xD973c4D02D4741EC4c70d5926B9790F932b52a49";
const contract = new ethers.Contract(contractAddress, recordNft_abi, signer);

export { provider, signer, contract };
