const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Tenant = require("../models/Tenant");
const logAction = require("../middleware/auditLog");

// Create tenant
router.post("/", auth("admin"), async (req, res) => {
  try {
    const tenant = new Tenant(req.body);
    await tenant.save();
    await logAction({
      user: req.user,
      action: "create",
      entityType: "Tenant",
      entityId: tenant._id,
      details: req.body,
      ip: req.ip,
    });
    res.status(201).json(tenant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all tenants with pagination
router.get("/", auth(), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const [tenants, total] = await Promise.all([
      Tenant.find().skip(skip).limit(limit),
      Tenant.countDocuments(),
    ]);
    res.json({
      data: tenants,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get tenant by ID
router.get("/:id", auth(), async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    if (!tenant) return res.status(404).json({ message: "Not found" });
    res.json(tenant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update tenant
router.put(":id", auth("admin"), async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tenant) return res.status(404).json({ message: "Not found" });
    await logAction({
      user: req.user,
      action: "update",
      entityType: "Tenant",
      entityId: tenant._id,
      details: req.body,
      ip: req.ip,
    });
    res.json(tenant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete tenant
router.delete(":id", auth("admin"), async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndDelete(req.params.id);
    if (!tenant) return res.status(404).json({ message: "Not found" });
    await logAction({
      user: req.user,
      action: "delete",
      entityType: "Tenant",
      entityId: tenant._id,
      details: {},
      ip: req.ip,
    });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
