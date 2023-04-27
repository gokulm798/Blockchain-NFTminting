const asyncHandler = require("express-async-handler");

const generateToken = require("../config/generateToken");
const nftRequest = require("../models/userRequest");
const User = require("../models/user");


//@description     Request the patient to mint
//@route           POST /api/request/
//@access          Public
const userRequest = asyncHandler(async (req, res) => {
  const {request_to,Content} = req.body;
  const sender_username=req.user.username
  //const cid = req.result.cid
  //console.log(cid)
  //console.log(hospital_username)

  if (!sender_username|| !request_to || !Content) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const patientExists = await User.findOne({ username:request_to});
  //console.log(userExists)

  if (patientExists==null) {
    res.status(400);
    throw new Error("Patient not found");
  }    
    const userReq = await nftRequest.create({
    Content,
    request_to,
    sender_username,
    
  });

  if (userReq) {
    res.status(201).json({
        request:true,
        
      
    });
  } else {
    res.status(400);
    throw new Error("Error in giving request");
  }
});

//@description     To check incoming requests
//@route           GET /api/request/check
//@access          Public
const reqCheck = asyncHandler(async (req, res) => {
  

  const reqs = await nftRequest.find({$and:[{ request_to:req.user.username },{isRead:'false'}]});

  if (reqs) {
    res.send(reqs)
    }
   else {
    res.send("Request Not Found");
    
  }
});
//@description     To accept incoming requests
//@route           POST /api/request/check/accept
//@access          Public
const reqAccept= asyncHandler(async (req, res) => {
  
    const {reqId}=req.body
    const change = await nftRequest.findByIdAndUpdate(reqId ,{ $set: { isUserRead:true,isAccept:true} });
  
    if (change) {
      res.status(200).json({
        change:true,
      })
      }
     else {
      res.send("Accept Is Not Processed");
      
    }
  });
//@description    To decline incoming requests
//@route           POST /api/request/check/decline
//@access          Public
const reqDecline = asyncHandler(async (req, res) => {
  
    const {reqId}=req.body
    const change = await nftRequest.findByIdAndUpdate( reqId,{ $set: { isUserRead:true,isAccept:false} });
  
    if (change) {
      res.status(200).json({
        change:true,
      })
      }
     else {
      res.send("Accept Is Not Processed");
      
    }
  });
  




//@description     To track the requests
//@route           GET /api/request/senderCheck
//@access          Public
const senderReq = asyncHandler(async (req, res) => {
  

    const reqs = await nftRequest.find({$and:[{ sender_username:req.user.username },{isSenderRead:'false'}]});
  
    if (reqs) {
      res.send(reqs)
      }
     else {
      res.send("Request Not Found");
      
    }
  });


module.exports = { userRequest,reqCheck,reqAccept,reqDecline,senderReq};