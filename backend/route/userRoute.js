const express = require("express");
const router = express.Router();
const userLogInController = require("../controller/User-LogIn-Controller");
const userSignUpController = require("../controller/User-SignUp-Controller");

router.get("/act", userLogInController.getAllUsers);
router.post("/login", userLogInController.Login);
router.post("/register", userSignUpController.createUser);
router.post("/otp-verify", userSignUpController.otpVerification);

module.exports = router;
