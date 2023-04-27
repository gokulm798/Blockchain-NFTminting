const IPFS = require('ipfs-core')
//import * as IPFS from 'ipfs-core'


const createIPFSNode = async () => {

  try {


    const ipfsOptions = {
      repo: './ipfs1',
      start: true,
      preload: {
        enabled: false
      },
      EXPERIMENTAL: {
        Pubsub: true,
      },
     /* config: {
        Addresses: {
          Swarm: [
            '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
          ]
        },
      }
    */
    }

          
    const node = await IPFS.create(ipfsOptions)
    console.log('IPFS node is ready')
    return node
    
          
          
            
  }catch(error){
      console.log(`Error:${error.message}`);
      process.exit();

  }
};


async function addFileToIPFS(node, content) {
 // const files = [{ path: '/hello.txt', content: Buffer.from(content) }]
  const results = await node.add(content)
  const cid = results.cid.toString()

  console.log(`Added file with CID ${cid}`)

  const fileContents = await node.cat(cid)
  console.log(`Retrieved file contents: ${fileContents.toString()}`)

  return cid
}

module.exports = {
  createIPFSNode,
  addFileToIPFS
}