const express = require("express");
const {feed,feedSearch,displayDisease} = require("../controller/feedController")
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()



router.route("/").get(protect, feed);
router.route("/diagnosis").get(protect, displayDisease);
router.route("/search").post(protect, feedSearch);


module.exports = router;