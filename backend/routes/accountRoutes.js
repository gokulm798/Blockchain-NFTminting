const express = require("express");
const {addAccount,showAccount} = require("../controller/accountController")
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()



router.route("/").post(protect, addAccount);
router.route("/show").get(protect, showAccount);


module.exports = router;