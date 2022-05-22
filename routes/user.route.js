const express = require("express");
const { register, registerView } = require("../controllers/user.controller")
const router = express.Router();
const { addUserValidation } = require("../validations/user/user.validation")

router.get("/register", registerView);
router.post("/register", addUserValidation, register);

module.exports = router;