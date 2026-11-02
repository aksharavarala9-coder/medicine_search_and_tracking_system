require("dotenv").config();

const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/pharmacy", require("./routes/pharmacyRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

app.use((error, req, res, next) => {
  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({ message: error.message });
  }
  if (error.code === 11000) {
    return res.status(409).json({ message: "A record with that value already exists." });
  }
  console.error(error);
  return res.status(500).json({ message: "An unexpected server error occurred." });
});

async function start() {
  await connectDB();
  app.listen(port, () => {
    console.log(`Medicine search API listening on port ${port}`);
  });
}

if (require.main === module) {
  start().catch((error) => {
    console.error("Could not start the server:", error.message);
    process.exitCode = 1;
  });
}

module.exports = app;
