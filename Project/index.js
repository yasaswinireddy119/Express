const express = require("express");

const app = express();
const PORT = 3000;

// Home Route
app.get("/home", (req, res) => {
  res.json({ message: "This is home page" });
});

// Contact Us Route
app.get("/contactus", (req, res) => {
  res.json({ message: "Contact us at contact@contact.com" });
});

// About Route (Bonus)
app.get("/about", (req, res) => {
  res.json({ message: "Welcome to the About page!" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
