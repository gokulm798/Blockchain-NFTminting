const express = require("express");
const {feed,feedSearch} = require("../controller/feedController")
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()



router.route("/").get(protect, feed);
router.route("/search").get(protect, feedSearch);


module.exports = router;