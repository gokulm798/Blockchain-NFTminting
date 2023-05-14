const express = require("express");
const bodyParser = require('body-parser');
const { upload ,download} = require("../controller/ipfsController")
const { protect } = require("../middleware/authMiddleware")
const { nftUpload ,nftDownload} = require("../middleware/ipfsMiddleware")

const router1= express.Router()


//router1.route("/").post(upload).get(protect);
//router1.post("/",upload);
router1.route("/upload").post(
    bodyParser.json({ limit: '500mb' ,type:'application/json'}),
    bodyParser.urlencoded({ limit: '500mb', extended: true ,parameterLimit:50000000000}),
    nftUpload,
    protect,
    upload
    );
router1.route("/download").post(nftDownload,protect,download);

module.exports = router1;