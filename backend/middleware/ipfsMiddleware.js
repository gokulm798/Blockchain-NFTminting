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

  const nftDownload = asyncHandler(async (req, res, next) => {
    try{


    const node=await createIPFSNode();
    
    const str= await node.cat(req.body.cid,{ maxBuffer: 10 * 1024 * 1024 })
    //console.log(str)
    let result=''

    for await (const itr of str) {
        const buffer = Buffer.from(itr).toString()
        result+=buffer
        
        
     }
     req.result=result
     console.log(result)
     




    //req.result=await node.add(content)
    //const hash1=await node.cat(req.result.cid)
    //console.log(req.result)
    //await node.stop();
    //console.log("Node has stopped")

    next();
    }catch (error) {
        //res.redirect('/');
        res.status(401);
        throw new Error("Error in IPFS Download");
      }

  });
  
  
  module.exports = { nftUpload ,nftDownload};