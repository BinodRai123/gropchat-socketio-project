const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userAuth = require("../src/routes/auth.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // your React URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use("/api/auth", userAuth)

module.exports = app;