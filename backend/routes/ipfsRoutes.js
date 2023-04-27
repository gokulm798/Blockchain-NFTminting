const express = require("express");
const { upload } = require("../controller/ipfsController")
const { protect } = require("../middleware/authMiddleware")
const { nftUpload } = require("../middleware/ipfsMiddleware")

const router1= express.Router()


//router1.route("/").post(upload).get(protect);
//router1.post("/",upload);
router1.route("/").post(nftUpload,protect,upload);

module.exports = router1;