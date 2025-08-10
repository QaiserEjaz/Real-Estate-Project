const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const AuditLog = require("../models/AuditLog");
const User = require("../models/User");

// List audit logs (admin only)
router.get("/", auth("admin"), async (req, res) => {
  try {
    const logs = await AuditLog.find()
      .populate("user")
      .sort({ createdAt: -1 })
      .limit(200);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
