const express = require("express");
const { register } = require("../controllers/user.controller")
const router = express.Router();
const { addUserValidation } = require("../validations/user/user.validation")

router.post("/register", addUserValidation, register);

module.exports = router;