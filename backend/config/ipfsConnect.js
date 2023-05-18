//const IPFS = require('ipfs-core')
//import * as IPFS from 'ipfs-core'
const { create } = require("ipfs-http-client");
//import { create } from 'ipfs-http-client'

const createIPFSNode = async () => {
  try {
    const node = create(new URL("http://192.168.64.177:5001"));
    console.log("Connected to Daemon");
    return node;
  } catch (error) {
    console.log(`Error:${error.message}`);
    process.exit();
  }
};

async function addFileToIPFS(node, content) {
  // const files = [{ path: '/hello.txt', content: Buffer.from(content) }]
  const ci = await node.add(content);
  //console.log(ci.path)
  node.pin.add(ci.path);

  console.log(`Added file with CID ${ci.path}`);
  return ci.path;
}

module.exports = {
  createIPFSNode,
  addFileToIPFS,
};
