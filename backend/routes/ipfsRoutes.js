const express = require("express");
const { upload ,download} = require("../controller/ipfsController")
const { protect } = require("../middleware/authMiddleware")
const { nftUpload ,nftDownload} = require("../middleware/ipfsMiddleware")

const router1= express.Router()


//router1.route("/").post(upload).get(protect);
//router1.post("/",upload);
router1.route("/upload").post(nftUpload,protect,upload);
router1.route("/download").get(nftDownload,protect,download);

module.exports = router1;