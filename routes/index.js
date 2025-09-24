// routes/index.js
const express = require("express");
const router = express.Router();

// home route
router.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page",
    message: "Hello, MongoDB is connected!",
  });
});


// products
router.get("/products", (req, res) => {
  res.render("products", { title: "Products" });
});

// about
router.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});

// contact
router.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact Us" });
});

// privacy
router.get("/privacy", (req, res) => {
  res.render("privacy", { title: "Privacy Policy" });
});

// terms
router.get("/terms", (req, res) => {
  res.render("terms", { title: "Terms & Conditions" });
});

module.exports = router;
