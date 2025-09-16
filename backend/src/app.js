const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

/* ---Calling Routes--- */
const userAuth = require("../src/routes/auth.routes");
const chat = require("../src/routes/chat.routes");

const app = express();

/* ----Middlewares--- */
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // your React URL
    credentials: true,
}));

/* ---Routes--- */
app.use("/api/auth", userAuth);
app.use("/api/chat", chat);

module.exports = app;