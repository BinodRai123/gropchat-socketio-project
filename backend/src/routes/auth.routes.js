const express = require("express");
const {authRegister, authLogin} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register",authRegister);
router.post("/login",authLogin);

module.exports = router;