const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Lease = require("../models/Lease");
const logAction = require("../middleware/auditLog");

// Create lease
router.post("/", auth("admin"), async (req, res) => {
  try {
    const lease = new Lease(req.body);
    await lease.save();
    await logAction({
      user: req.user,
      action: "create",
      entityType: "Lease",
      entityId: lease._id,
      details: req.body,
      ip: req.ip,
    });
    res.status(201).json(lease);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all leases with pagination
router.get("/", auth(), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const [leases, total] = await Promise.all([
      Lease.find().skip(skip).limit(limit),
      Lease.countDocuments(),
    ]);
    res.json({
      data: leases,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get lease by ID
router.get("/:id", auth(), async (req, res) => {
  try {
    const lease = await Lease.findById(req.params.id);
    if (!lease) return res.status(404).json({ message: "Not found" });
    res.json(lease);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update lease
router.put(":id", auth("admin"), async (req, res) => {
  try {
    const lease = await Lease.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!lease) return res.status(404).json({ message: "Not found" });
    await logAction({
      user: req.user,
      action: "update",
      entityType: "Lease",
      entityId: lease._id,
      details: req.body,
      ip: req.ip,
    });
    res.json(lease);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete lease
router.delete(":id", auth("admin"), async (req, res) => {
  try {
    const lease = await Lease.findByIdAndDelete(req.params.id);
    if (!lease) return res.status(404).json({ message: "Not found" });
    await logAction({
      user: req.user,
      action: "delete",
      entityType: "Lease",
      entityId: lease._id,
      details: {},
      ip: req.ip,
    });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
