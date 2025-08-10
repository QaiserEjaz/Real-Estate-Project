require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/properties", require("./routes/properties"));
app.use("/api/tenants", require("./routes/tenants"));
app.use("/api/leases", require("./routes/leases"));
app.use("/api/payments", require("./routes/payments"));
app.use("/api/maintenance", require("./routes/maintenance"));
app.use("/api/documents", require("./routes/documents"));
app.use("/api/notifications", require("./routes/notifications"));
app.use("/api/reports", require("./routes/reports"));
app.use("/api/expenses", require("./routes/expenses"));
app.use("/api/settings", require("./routes/settings"));
app.use("/api/esign", require("./routes/esign"));
app.use("/api/webhooks", require("./routes/webhooks"));
app.use("/api/audit", require("./routes/audit"));

app.get("/", (req, res) => {
  res.send("Property Management Backend API");
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
