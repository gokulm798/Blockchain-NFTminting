const asyncHandler = require("express-async-handler");

const { nftRequest, licenseRequest } = require("../models/userRequest");
const { User } = require("../models/user");
const account = require("../models/account");
const diagnosis = require("../models/diagnosis");
const {dupdata} = require("../models/ipfs");

//********************************************************************************************************************************************** */
//********************************************************************************************************************************************** */
//********************************************************************************************************************************************** */

//MINT REQUESTS

//@description     Request the patient to mint
//@route           POST /api/request/mint
//@access          Public
const userRequest = asyncHandler(async (req, res) => {
  const { request_to, Content, diagnosis_code, doc_name } = req.body;
  const sender_username = req.user.username;

  const diagnosisData = await diagnosis.findOne(
    { diagnosis_code: req.body.diagnosis_code },
    { diagnosis_code: 0, _id: 0 }
  );
  if (diagnosisData == null) {
    res.status(400);
    throw new Error("Diseases not found");
  }


  const diagnosis_disease = diagnosisData.diagnosis_disease;

  const accountExists = await account.findOne({ owner_username: request_to });
  if (accountExists == null) {
    res.status(400);
    throw new Error("No valid account for user");
  }
  const account_address = accountExists.address;
  //const cid = req.result.cid
  //console.log(cid)
  //console.log(hospital_username)
  const hospitalAccountExists = await account.findOne({
    owner_username: sender_username,
  });
  if (hospitalAccountExists == null) {
    res.status(400);
    throw new Error("No valid account for user");
  }
  const hospital_address = hospitalAccountExists.address;
  
  const hospitalExists = await User.findOne({ username: sender_username });


  const sender_name =hospitalExists.name


  if (
    !sender_username ||
    !request_to ||
    !Content ||
    !diagnosis_code ||
    !doc_name ||
    !account_address ||
    !hospital_address ||
    !diagnosis_disease||
    !sender_name
  ) {
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
    diagnosis_code,
    doc_name,
    account_address,
    hospital_address,
    diagnosis_disease,
    sender_name
  });

  if (userReq) {
    res.status(201).json({
      request: true,
      account_address: userReq.account_address,
      hospital_address: userReq.hospital_address,
      diagnosis_disease: userReq.diagnosis_disease,
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
  const reqs = await nftRequest.find({
    $and: [{ request_to: req.user.username }, { isUserRead: false }],
  });

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
  const reqs = await nftRequest.find({
    $and: [{ sender_username: req.user.username }, { isSenderRead: false }],
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
  const { request_to, time, token, content } = req.body;
  const sender_username = req.user.username;
  //const cid = req.result.cid
  //console.log(cid)
  //console.log(hospital_username)

  if (!sender_username || !request_to || !token || !time || !content) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }
  //console.log("hiiiiiii");
  const patientExists = await User.findOne({ username: request_to });
  //console.log(userExists)

  if (patientExists == null) {
    res.status(400);
    throw new Error("Patient not found");
  }
  const accountExists = await account.findOne({ owner_username: request_to });
  if (accountExists == null) {
    res.status(400);
    throw new Error("No valid account for patient");
  }
  const account_address = accountExists.address;
  //const cid = req.result.cid
  //console.log(cid)
  //console.log(hospital_username)
  const researcherAccountExists = await account.findOne({
    owner_username: sender_username,
  });
  if (researcherAccountExists == null) {
    res.status(400);
    throw new Error("No valid account for researcher");
  }
  const researcher_address=researcherAccountExists.address
  const researcherExists = await User.findOne({ username:  sender_username});
  //console.log(userExists)
  const sender_name = researcherExists.name;

  if (researcherExists == null) {
    res.status(400);
    throw new Error("Researcher not found");
  }
  const diseaseExists = await dupdata.findOne({ token_id:  token});
  if (diseaseExists == null) {
    res.status(400);
    throw new Error("Token not found in feed ");
  }

  const diagnosis_disease=diseaseExists.diagnosis_disease


  const userReq = await licenseRequest.create({
    time,
    request_to,
    sender_username,
    token,
    account_address,
    researcher_address,
    sender_name,
    content,
    diagnosis_disease,
  });

  if (userReq) {
    res.status(201).json({
      request: true,
      researcher_address: researcher_address,
      account_address: account_address,
      token: token,
      content: content,
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
  const reqs = await licenseRequest.find({
    $and: [{ request_to: req.user.username }, { isUserRead: false }],
  });

  if (reqs) {
    res.send(reqs);
  } else {
    res.send("Request Not Found");
  }
});
//@description     To accept incoming requests
//@route           POST /api/request/license/check/accept
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

//@description     To track the requests by researcher
//@route           GET /api/request/license/sender/check
//@access          Public
const senderReqLicense = asyncHandler(async (req, res) => {
  const reqs = await licenseRequest.find({
    $and: [{ sender_username: req.user.username }, { isSenderRead: false }],
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
