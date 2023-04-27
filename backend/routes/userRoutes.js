const express = require("express");
const {registerUser,authUser,allUsers} = require("../controller/userController")
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()


router.route("/").post(registerUser).get(protect);
router.post("/login",authUser);
router.route("/search").get(protect, allUsers);


module.exports = router;