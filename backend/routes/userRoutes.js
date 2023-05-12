const express = require("express");
const {registerUser,authUser,allUsers,history,patientDetails} = require("../controller/userController")
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()


router.route("/").post(registerUser);
router.route("/details").post(protect, patientDetails);
router.post("/login",authUser);
router.route("/search").get(protect, allUsers);
router.route("/history").get(protect, history);




module.exports = router;