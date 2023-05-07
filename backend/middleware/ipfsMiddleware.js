const {createIPFSNode,addFileToIPFS}= require("../config/ipfsConnect.js")
const asyncHandler = require("express-async-handler");


const nftUpload = asyncHandler(async (req, res, next) => {
    try{


    const node=await createIPFSNode();
    const content=req.body.hash
    req.result=await addFileToIPFS(node,content);


    //req.result=await node.add(content)
    //const hash1=await node.cat(req.result.cid)
    //console.log(req.result)
    //await node.stop();
    //console.log("Node has stopped")

    next();
    }catch (error) {
        //res.redirect('/');
        res.status(401);
        throw new Error("Error in IPFS Upload");
      }

  });
  
  module.exports = { nftUpload };