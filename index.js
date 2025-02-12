const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes"); // Semua routes digabung di sini

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Koneksi ke MongoDB
mongoose
  .connect("mongodb://localhost:27017/uhmk3b", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("Selamat datang di API CRUD dengan MongoDB! 🎉");
});

app.use("/api", userRoutes); // Semua routes (User, Product, Order) ada di sini

// Jalankan Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});