const asyncHandler = require("express-async-handler");
const fs = require('fs');
const path = require('path');

const generateToken = require("../config/generateToken");
const {data,dupdata} = require("../models/ipfs");
const {User,detail} = require("../models/user");
const diagnosis = require("../models/diagnosis");
const account = require("../models/account");
const { nftRequest } = require("../models/userRequest");


//@description     Upload a new NFT
//@route           POST /api/upload/
//@access          Public
const upload = asyncHandler(async (req, res) => {
  const {patient_username,diagnosis_code,doc_name , token_id} = req.body;
  const hospital_username=req.user.username
  const cid = req.result
  const accountExists = await account.findOne({owner_username:patient_username})
  if(accountExists==null){
    res.status(400);
    throw new Error("No valid account for user");
  }
  const account_address=accountExists.address
  //console.log(cid)
  //console.log(hospital_username)

  if (!cid|| !patient_username || !hospital_username ||!diagnosis_code ||!doc_name ||!account_address||!token_id) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const diagnosisData = await diagnosis.findOne({ diagnosis_code:req.body.diagnosis_code },{diagnosis_code:0,_id:0});
  if (diagnosisData==null) {
    res.status(400);
    throw new Error("Diseases not found");
  }    
  const patientExists = await User.findOne({ username:patient_username });
  if (patientExists==null) {
    res.status(400);
    throw new Error("Patient not found");
  }  
  const patientDetail = await detail.findOne({ username :patient_username});

  if (patientDetail==null) {
    res.status(400);
    throw new Error("Deatils not found");
      
    
  }
  //console.log(diagnosis_dis)
  //diagnosis_dis.diagnose_disease
  const diagnosis_disease = diagnosisData.diagnosis_disease
  
  const gender =patientDetail.gender
  const bloodGroup=patientDetail.bloodGroup
  const dateOfBirth=patientDetail.dateOfBirth

 // console.log(diagnosis_disease)
    
    const nft = await data.create({
    cid ,
    patient_username,
    hospital_username,
    diagnosis_disease,
    doc_name,
    account_address,
    token_id,
    gender,
    bloodGroup,
    dateOfBirth
     
  });

  if (nft) {
    res.status(201).json({
        upload:true,
        cid:cid,
        id:nft._id,
      
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

  const cidExists = await dupdata.findOne({ cid:req.body.cid });
   
  if (cidExists==null) {
    res.status(400);
    throw new Error("CID  match not found");
  } 
  
  
  const base64String = req.result

  const binaryData = Buffer.from(base64String, 'base64');

  // Generate a temporary file path
  const tempFilePath = path.join(__dirname, 'temp', 'output.pdf');

  // Write the binary data to a temporary file
  fs.writeFileSync(tempFilePath, binaryData);
  // Send the file as the response
  res.sendFile(tempFilePath, () => {
    // Cleanup: delete the temporary file after sending
  fs.unlinkSync(tempFilePath);
});
  //console.log(req.result) 
  //  res.json({
  //   download:true,
  //   content:req.result
  // })

  // res.setHeader('Content-Type', 'text/plain');
  // res.setHeader('Content-Length', Buffer.byteLength(req.result, 'utf-8'));
  // res.send(req.result);
  
});

//@description     To set the feed and  history, real upload
//@route           GET /api/nft/upload/mint
//@access          Public
const orgUpload = asyncHandler(async (req, res) => {
  const  {cid,mint,reqId} = req.body;
  //console.log(cid)
  //const { reqId } = req.body;
  const change = await nftRequest.findByIdAndUpdate(reqId, {
    $set: { isSenderRead: true },
  });
  const cidExists = await data.findOne({ cid:cid});
   
  if (cidExists==null) {
    res.status(400);
    throw new Error("CID  match not found");
  } 
  //console.log(cidExists)

  const patient_username=cidExists.patient_username
  const hospital_username=cidExists.hospital_username
  const diagnosis_disease=cidExists.diagnosis_disease
  const doc_name=cidExists.doc_name
  const account_address=cidExists.account_address
  const token_id=cidExists.token_id
  const gender=cidExists.gender
  const bloodGroup=cidExists.bloodGroup
  const dateOfBirth =cidExists.dateOfBirth
  

  const nft = await dupdata.create({
    cid ,
    patient_username,
    hospital_username,
    diagnosis_disease,
    doc_name,
    account_address,
    token_id,
    gender,
    bloodGroup,
    dateOfBirth,
    mint
     
  });

  if (nft) {
    res.status(201).json({
        duplicateCreated:true,
        cid:cid,
      
    });
  } else {
    res.status(400);
    throw new Error("Error in uploading");
  }

  

  //console.log(req.result) 
   
   
  // res.setHeader('Content-Type', 'text/plain');
  // res.setHeader('Content-Length', Buffer.byteLength(req.result, 'utf-8'));
  // res.send(req.result);
  
});

module.exports = { upload ,download, orgUpload};