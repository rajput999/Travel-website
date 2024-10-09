require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors"); // Import CORS

// Route Imports
const { connectToMongoDB } = require("./connection");
const {
  handleCreateBookingById,
  handleDeleteBookingById,
} = require("./controllers/authBooking");
const {
  sendVerificationEmail,
  handleVerifyEmail,
  handleUserSignup,
  handleUserSignin,
  GiveTokens,
  giveUserForToken,
} = require("./controllers/authUser");
const { restrictedToLoggedinUsersOnly } = require("./middlewares/auth");
const getfixedpackages = require("./controllers/packages");
const populardestinations = require("./controllers/populardestinations");

const app = express();
const PORT = 8000;

// MongoDB connection
const mongoURL = process.env.MONGODB_URL;
connectToMongoDB(mongoURL).then(() => console.log("MongoDB Connected"));

// Set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Enable CORS for your frontend
app.use(cors({
  origin: "http://localhost:3000", // Your frontend URL
  credentials: true, // Allow credentials like cookies
}));

// Routes
app.use("/packages",getfixedpackages);
app.use("/popular-destinations",populardestinations);
app.use("/handleUserSignup", handleUserSignup);
app.use("/handleUserSignin", handleUserSignin);
app.use("/handleCreateBookingById", restrictedToLoggedinUsersOnly, handleCreateBookingById);
app.use("/handleDeleteBookingById", restrictedToLoggedinUsersOnly, handleDeleteBookingById);
app.use("/sendVerificationMail", sendVerificationEmail);
app.use("/handleVerifyEmail", handleVerifyEmail);
app.use("/GiveToken", GiveTokens);
app.use("/giveUserForToken", giveUserForToken);

// Start server
app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
