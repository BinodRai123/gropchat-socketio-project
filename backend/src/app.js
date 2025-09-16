const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

/* ---Calling Routes--- */
const userAuthRoutes = require("../src/routes/auth.routes");
const chatRoutes = require("../src/routes/chat.routes");

const app = express();

/* ----Middlewares--- */
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // your React URL
    credentials: true,
}));

/* ---Routes--- */
app.use("/api/auth", userAuthRoutes);
app.use("/api/chat", chatRoutes);

module.exports = app;