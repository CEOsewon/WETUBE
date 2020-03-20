import express from "express";

const app = express();

const PORT = 4000;

// Function
const handleListening = () =>
  console.log(`✅ Listening on: http://localhost:${PORT}`);
const handleHome = (req, res) => res.send("Hello from home");
const handleProfile = (req, res) => res.send("You are on my profile");
const betweenHome = (req, res, next) => {
  console.log("I'm between");
  next();
};

// Middleware
app.use(betweenHome);

// Router
app.get("/", handleHome);
app.get("/profile", handleProfile);

// Initialize
app.listen(PORT, handleListening);
