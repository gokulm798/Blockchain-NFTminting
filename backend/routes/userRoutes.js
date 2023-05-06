const express = require("express");
const {registerUser,authUser,allUsers,history} = require("../controller/userController")
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()


router.route("/").post(registerUser).get(protect);
router.post("/login",authUser);
router.route("/search").get(protect, allUsers);
router.route("/history").get(protect, history);



module.exports = router;