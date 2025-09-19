// server.js
const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const session = require("express-session"); // Added for user sessions
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-secret", // keep secret in .env
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set to true only if using HTTPS
      maxAge: 1 * 60 * 1000, // 15 minutes (in milliseconds)
    },
  })
);

// Session expiration middleware
app.use((req, res, next) => {
  // Check if user is logged in
  if (req.session && !req.session.user && req.originalUrl !== "/users/login") {
    req.session.message = "Your session has expired. Please log in again.";
    return res.redirect("/users/login");
  }
  
  // If a logout happens, set message
  if (req.session && req.session.message && req.originalUrl === "/users/login") {
    return next();
  }
  
  next();
});

// Routes
const indexRoute = require("./routes/index");
const usersRoute = require("./routes/users");
app.use("/", indexRoute);
app.use("/users", usersRoute);
// MongoDB Setup
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
// Expose client & dbName to routes
app.locals.client = client;
app.locals.dbName = process.env.DB_NAME || "ecommerceDB";
async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection failed", err);
  }
}
main();
