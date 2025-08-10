const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Tenant = require("../models/Tenant");

// Create tenant
router.post("/", auth("admin"), async (req, res) => {
  try {
    const tenant = new Tenant(req.body);
    await tenant.save();
    res.status(201).json(tenant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all tenants
router.get("/", auth(), async (req, res) => {
  try {
    const tenants = await Tenant.find();
    res.json(tenants);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
router.put("/:id", auth("admin"), async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tenant) return res.status(404).json({ message: "Not found" });
    res.json(tenant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete tenant
router.delete("/:id", auth("admin"), async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndDelete(req.params.id);
    if (!tenant) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
