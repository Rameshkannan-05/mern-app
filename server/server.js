const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const recordsRoutes = require("./routes/records");
const securityMiddleware = require("./middleware/security");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/mern-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // 100 requests per 15 minutes
app.use(securityMiddleware);

// Routes
app.use("/api/records", recordsRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
