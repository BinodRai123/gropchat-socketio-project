const express = require("express");
const cookieParser = require("cookie-parser");

const userAuth = require("../src/routes/auth.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", userAuth)

module.exports = app;