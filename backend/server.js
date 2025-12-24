import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import db from "./db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


dotenv.config();

const app = express();

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  let token = req.headers.authorization || "";
  if (token.startsWith("Bearer ")) token = token.slice(7);

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id; // 🔥 THIS IS THE KEY
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};


const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "https://full-stack-notes-app-lemon.vercel.app";

app.use(cors({
  origin: CLIENT_ORIGIN,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());


// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

// SIGNUP
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  // hash password
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, hashedPassword], (err) => {
    if (err) {
      return res.status(400).json({ error: "User already exists" });
    }
    res.json({ message: "Signup successful" });
  });
});

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=?";
  db.query(sql, [email], (err, data) => {
    if (data.length === 0) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const user = data[0];

    // compare password
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // create token
    const token = jwt.sign(
      { id: user.id },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
    });
  });
});


// ADD NOTE (protected)
app.post("/add-note", auth, (req, res) => {
  const { title, details } = req.body;
  const userId = req.userId;

  const sql = "INSERT INTO notes (title, details, user_id) VALUES (?, ?, ?)";
  db.query(sql, [title, details, userId], (err) => {
    if (err) return res.status(500).json({ error: "Failed to save note" });
    res.json({ message: "Note saved" });
  });
});


// EDIT NOTE (protected)
app.put("/edit-note/:id", auth, (req, res) => {
  const { title, details } = req.body;
  const { id } = req.params;
  const userId = req.userId;

  const sql = "UPDATE notes SET title=?, details=? WHERE id=? AND user_id=?";
  db.query(sql, [title, details, id, userId], (err, result) => {
    if (err) return res.status(500).json({ error: "Update failed" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Note not found or not authorized" });
    res.json({ message: "Note updated" });
  });
});


// DELETE NOTE (protected)
app.delete("/delete-note/:id", auth, (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  const sql = "DELETE FROM notes WHERE id=? AND user_id=?";
  db.query(sql, [id, userId], (err, result) => {
    if (err) return res.status(500).json({ error: "Delete failed" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Note not found or not authorized" });
    res.json({ message: "Note deleted" });
  });
});

// GET NOTES (protected)
app.get("/notes", auth, (req, res) => {
  const userId = req.userId;
  db.query("SELECT id, title, details FROM notes WHERE user_id=?", [userId], (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to fetch notes" });
    res.json(data);
  });
});

// app.listen(5000, () => {
//   console.log("🚀 Backend running on port 5000");
// });

export default app;
