const asyncHandler = require("express-async-handler");

const generateToken = require("../config/generateToken");
const data = require("../models/ipfs");
const User = require("../models/user");


//@description     Upload a new NFT
//@route           POST /api/upload/
//@access          Public
const upload = asyncHandler(async (req, res) => {
  const {patient_username,owner,meta } = req.body;
  const hospital_username=req.user.username
  const cid = req.result
  //console.log(cid)
  //console.log(hospital_username)

  if (!cid|| !patient_username || !hospital_username || !owner ||!meta) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const patientExists = await User.findOne({ username:patient_username });
  //console.log(userExists)

  if (patientExists==null) {
    res.status(400);
    throw new Error("Patient not found");
  }    
    const nft = await data.create({
    cid ,
    patient_username,
    hospital_username,
    owner,
    meta,
    
  });

  if (nft) {
    res.status(201).json({
        upload:true,
        cid:cid,
      
    });
  } else {
    res.status(400);
    throw new Error("Error in uploading");
  }
});

//@description     Download ipfs content
//@route           GET /api/nft/download
//@access          Public
const download = asyncHandler(async (req, res) => {
  //const { cid } = req.body;

  const cidExists = await data.findOne({ cid:req.body.cid });

  if (cidExists==null) {
    res.status(400);
    throw new Error("CID  match not found");
  }   
   res.json({
    download:true,
    content:req.result

   })
  
});

module.exports = { upload ,download};