const asyncHandler = require("express-async-handler");

const generateToken = require("../config/generateToken");
const data = require("../models/ipfs");
const {User,detail} = require("../models/user");
const diagnosis = require("../models/diagnosis");


//@description     Upload a new NFT
//@route           POST /api/upload/
//@access          Public
const upload = asyncHandler(async (req, res) => {
  const {patient_username,diagnosis_code,doc_name ,account_address,token_id} = req.body;
  const hospital_username=req.user.username
  const cid = req.result
  //console.log(cid)
  //console.log(hospital_username)

  if (!cid|| !patient_username || !hospital_username ||!diagnosis_code ||!doc_name ||!account_address||!token_id) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const diagnosisData = await diagnosis.findOne({ diagnosis_code:req.body.diagnosis_code },{diagnosis_code:0,_id:0});
  if (diagnosisData==null) {
    res.status(400);
    throw new Error("Diseasesnot found");
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