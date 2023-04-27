const {createIPFSNode}= require("../config/ipfsConnect.cjs")
const asyncHandler = require("express-async-handler");


const nftUpload = asyncHandler(async (req, res, next) => {
    try{


    const node=await createIPFSNode();
    const hash=req.body.hash


    req.result=await node.add(hash)
    //const hash1=await node.cat(req.result.cid)
    console.log(req.result)
    //await node.stop();
    //console.log("Node has stopped")

    next();
    }catch (error) {
        //res.redirect('/');
        res.status(401);
        throw new Error("Error in IPFS node");
      }

  });
  
  module.exports = { nftUpload };