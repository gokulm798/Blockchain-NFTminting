const express = require("express");
const { userRequest,reqCheck ,reqAccept,reqDecline,senderReq,userRequestLicense,reqCheckLicense,reqAcceptLicense,reqDeclineLicense,senderReqLicense} = require("../controller/reqController")
const { protect } = require("../middleware/authMiddleware")
//const { nftUpload } = require("../middleware/ipfsMiddleware")

const router2= express.Router()


//router1.route("/").post(upload).get(protect);
//router1.post("/",upload);

router2.route("/mint").post(protect,userRequest);
router2.route("/mint/check").get(protect,reqCheck);
router2.route("/mint/check/accept").post(protect,reqAccept);
router2.route("/mint/check/decline").post(protect,reqDecline);
router2.route("/mint/sender/check").get(protect,senderReq);




router2.route("/license").post(protect,userRequestLicense);
router2.route("/license/check").get(protect,reqCheckLicense);
router2.route("/license/check/accept").post(protect,reqAcceptLicense);
router2.route("/license/check/decline").post(protect,reqDeclineLicense);
router2.route("/license/sender/check").get(protect,senderReqLicense);

module.exports = router2;