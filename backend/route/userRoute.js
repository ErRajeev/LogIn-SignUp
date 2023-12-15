const express = require("express");
const router = express.Router();
const userLogInController = require("../controller/User-LogIn-Controller");

router.get("/", userLogInController.getAllUsers);
router.post("/login", userLogInController.Login);

module.exports = router;
