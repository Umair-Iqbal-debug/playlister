// THESE ARE NODE APIs WE WISH TO USE
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

// CREATE OUR SERVER
dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();

console.log(process.env.NODE_ENV);
// SETUP THE MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["https://playlister-z6nl.onrender.com"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// SETUP OUR OWN ROUTERS AS MIDDLEWARE
const authRouter = require("./routes/auth-router");
app.use("/auth", authRouter);
const apiRouter = require("./routes/api-router");
app.use("/api", apiRouter);

// INITIALIZE OUR DATABASE OBJECT
const db = require("./db");
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// PUT THE SERVER IN LISTENING MODE
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
