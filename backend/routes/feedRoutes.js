const express = require("express");
const {feed} = require("../controller/feedController")
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()



router.route("/").get(protect, feed);


module.exports = router;