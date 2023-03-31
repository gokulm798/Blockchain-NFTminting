import recordNft_abi from "../src/recordNft_abi.json";

import { ethers } from "ethers";

// initialize provider
const provider = new ethers.providers.Web3Provider(window.ethereum);

// initialize signer
const signer = provider.getSigner();

// initialize contract
const contractAddress = "0x51cD8cDF897646Cd9bBbBf2FA3f9FB81D2d6f35a";
const contract = new ethers.Contract(contractAddress, recordNft_abi, signer);

export { provider, signer, contract };
