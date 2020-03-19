import express from "express";

const app = express();

const PORT = 4000;

// Controller
const handleListening = () =>
  console.log(`✅ Listening on: http://localhost:${PORT}`);
const handleHome = (req, res) => res.send("Hello from home");
const handleProfile = (req, res) => res.send("You are on my profile");

// Router
app.get("/", handleHome);
app.get("/profile", handleProfile);

// Initialize
app.listen(PORT, handleListening);
