const asyncHandler = require("express-async-handler");

const { nftRequest, licenseRequest } = require("../models/userRequest");
const { User } = require("../models/user");

//********************************************************************************************************************************************** */
//********************************************************************************************************************************************** */
//********************************************************************************************************************************************** */

//MINT REQUESTS

//@description     Request the patient to mint
//@route           POST /api/request/mint
//@access          Public
const userRequest = asyncHandler(async (req, res) => {
  const { request_to, Content } = req.body;
  const sender_username = req.user.username;
  //const cid = req.result.cid
  //console.log(cid)
  //console.log(hospital_username)

  if (!sender_username || !request_to || !Content) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const patientExists = await User.findOne({ username: request_to });
  //console.log(userExists)

  if (patientExists == null) {
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
      request: true,
    });
  } else {
    res.status(400);
    throw new Error("Error in giving request");
  }
});

//@description     To check incoming requests
//@route           GET /api/request/mint/check
//@access          Public
const reqCheck = asyncHandler(async (req, res) => {
<<<<<<< HEAD
  

  const reqs = await nftRequest.find({$and:[{ request_to:req.user.username },{isUserRead:false}]});
=======
  const reqs = await nftRequest.find({
    $and: [{ request_to: req.user.username }, { isUserRead: false }],
  });
>>>>>>> refs/remotes/origin/main

  if (reqs) {
    res.send(reqs);
  } else {
    res.send("Request Not Found");
  }
});
//@description     To accept incoming requests
//@route           POST /api/request/mint/check/accept
//@access          Public
const reqAccept = asyncHandler(async (req, res) => {
  const { reqId } = req.body;
  const change = await nftRequest.findByIdAndUpdate(reqId, {
    $set: { isUserRead: true, isAccept: true },
  });

  if (change) {
    res.status(200).json({
      change: true,
    });
  } else {
    res.send("Accept Is Not Processed");
  }
});
//@description    To decline incoming requests
//@route           POST /api/request/mint/check/decline
//@access          Public
const reqDecline = asyncHandler(async (req, res) => {
  const { reqId } = req.body;
  const change = await nftRequest.findByIdAndUpdate(reqId, {
    $set: { isUserRead: true, isAccept: false },
  });

  if (change) {
    res.status(200).json({
      change: true,
    });
  } else {
    res.send("Accept Is Not Processed");
  }
});

//@description     To track the requests
//@route           GET /api/request/mint/senderCheck
//@access          Public
const senderReq = asyncHandler(async (req, res) => {
<<<<<<< HEAD
  

    const reqs = await nftRequest.find({$and:[{ sender_username:req.user.username },{isSenderRead:false}]});
  
    if (reqs) {
      res.send(reqs)
      }
     else {
      res.send("Request Not Found");
      
    }
=======
  const reqs = await nftRequest.find({
    $and: [{ sender_username: req.user.username }, { isSenderRead: false }],
>>>>>>> refs/remotes/origin/main
  });

  if (reqs) {
    res.send(reqs);
  } else {
    res.send("Request Not Found");
  }
});

//********************************************************************************************************************************************** */
//********************************************************************************************************************************************** */
//********************************************************************************************************************************************** */

//LICENSE REQUESTS

//@description     Request the patient to License
//@route           POST /api/request/license
//@access          Public
const userRequestLicense = asyncHandler(async (req, res) => {
  const { request_to, Content } = req.body;
  const sender_username = req.user.username;
  //const cid = req.result.cid
  //console.log(cid)
  //console.log(hospital_username)

  if (!sender_username || !request_to || !Content) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const patientExists = await User.findOne({ username: request_to });
  //console.log(userExists)

  if (patientExists == null) {
    res.status(400);
    throw new Error("Patient not found");
  }
  const userReq = await licenseRequest.create({
    Content,
    request_to,
    sender_username,
  });

  if (userReq) {
    res.status(201).json({
      request: true,
    });
  } else {
    res.status(400);
    throw new Error("Error in giving request");
  }
});

//@description     To check incoming requests
//@route           GET /api/request/license/check
//@access          Public
const reqCheckLicense = asyncHandler(async (req, res) => {
<<<<<<< HEAD
  

  const reqs = await licenseRequest.find({$and:[{ request_to:req.user.username },{isUserRead:false}]});
=======
  const reqs = await licenseRequest.find({
    $and: [{ request_to: req.user.username }, { isUserRead: false }],
  });
>>>>>>> refs/remotes/origin/main

  if (reqs) {
    res.send(reqs);
  } else {
    res.send("Request Not Found");
  }
});
//@description     To accept incoming requests
//@route           POST /api/request/licensecheck/accept
//@access          Public
const reqAcceptLicense = asyncHandler(async (req, res) => {
  const { reqId } = req.body;
  const change = await licenseRequest.findByIdAndUpdate(reqId, {
    $set: { isUserRead: true, isAccept: true },
  });

  if (change) {
    res.status(200).json({
      change: true,
    });
  } else {
    res.send("Accept Is Not Processed");
  }
});
//@description     To decline incoming requests
//@route           POST /api/request/license/check/decline
//@access          Public
const reqDeclineLicense = asyncHandler(async (req, res) => {
  const { reqId } = req.body;
  const change = await licenseRequest.findByIdAndUpdate(reqId, {
    $set: { isUserRead: true, isAccept: false },
  });

  if (change) {
    res.status(200).json({
      change: true,
    });
  } else {
    res.send("Accept Is Not Processed");
  }
});

//@description     To track the requests
//@route           GET /api/request/license/senderCheck
//@access          Public
const senderReqLicense = asyncHandler(async (req, res) => {
<<<<<<< HEAD
  

    const reqs = await licenseRequest.find({$and:[{ sender_username:req.user.username },{isSenderRead:false}]});
  
    if (reqs) {
      res.send(reqs)
      }
     else {
      res.send("Request Not Found");
      
    }
=======
  const reqs = await licenseRequest.find({
    $and: [{ sender_username: req.user.username }, { isSenderRead: false }],
>>>>>>> refs/remotes/origin/main
  });

  if (reqs) {
    res.send(reqs);
  } else {
    res.send("Request Not Found");
  }
});

module.exports = {
  userRequest,
  reqCheck,
  reqAccept,
  reqDecline,
  senderReq,
  userRequestLicense,
  reqCheckLicense,
  reqAcceptLicense,
  reqDeclineLicense,
  senderReqLicense,
};
