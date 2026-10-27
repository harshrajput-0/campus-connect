import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());


// Serve index.html on root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// For about page
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "about.html"));
});

// For Dashboard page
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "dashboard.html"));
});

// For events page
app.get("/events", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "events.html"));
});


// For about page
app.get("/gallery", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "gallery.html"));
});


// For Event registration page
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "register.html"));
});










// Serve 404 page for everything else
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../public", "notfound.html"));
});



app.get("/test", (req, res) => {
  res.send("Server is running, try changing this text");
});

export default app;

