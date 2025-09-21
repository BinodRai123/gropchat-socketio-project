const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

/* ---Calling Routes--- */
const userAuthRoutes = require("../src/routes/auth.routes");
const chatRoutes = require("../src/routes/chat.routes");
const uploadImage = require("../src/routes/uploadImage.routes");

const app = express();

/* ----Middlewares--- */
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // your React URL
    credentials: true,
}));
app.use(express.static(path.join(__dirname, '../public')))

/* ---Routes--- */
app.use("/api/auth", userAuthRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/uploadImage", uploadImage);

app.get("*name", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

module.exports = app;