const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Database
require("./config/database");

// Routes
const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes");
console.log("✅ donorRoutes loaded:", donorRoutes);
const bloodStockRoutes = require("./routes/bloodStockRoutes");
const bloodRequestRoutes = require("./routes/bloodRequestRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
// Test Routes
app.get("/", (req, res) => {
    res.send("🩸 Blood Bank Management System Backend is Running...");
});

app.get("/test", (req, res) => {
    res.send("Test route is working");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/donors", (req, res, next) => {
    console.log("✅ /api/donors route hit");
    next();
}, donorRoutes);app.use("/api/blood-stock", bloodStockRoutes);
app.use("/api/requests", bloodRequestRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/dashboard", dashboardRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});