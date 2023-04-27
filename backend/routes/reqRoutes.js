const express = require("express");
const { userRequest,reqCheck ,reqAccept,reqDecline,senderReq} = require("../controller/reqController")
const { protect } = require("../middleware/authMiddleware")
//const { nftUpload } = require("../middleware/ipfsMiddleware")

const router2= express.Router()


//router1.route("/").post(upload).get(protect);
//router1.post("/",upload);
router2.route("/").post(protect,userRequest);
router2.route("/check").get(protect,reqCheck);
router2.route("/check/accept").post(protect,reqAccept);
router2.route("/check/decline").post(protect,reqDecline);
router2.route("/sender/check").get(protect,senderReq);

module.exports = router2;