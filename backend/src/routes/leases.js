const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Lease = require("../models/Lease");

// Create lease
router.post("/", auth("admin"), async (req, res) => {
  try {
    const lease = new Lease(req.body);
    await lease.save();
    res.status(201).json(lease);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all leases
router.get("/", auth(), async (req, res) => {
  try {
    const leases = await Lease.find();
    res.json(leases);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
router.put("/:id", auth("admin"), async (req, res) => {
  try {
    const lease = await Lease.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!lease) return res.status(404).json({ message: "Not found" });
    res.json(lease);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete lease
router.delete("/:id", auth("admin"), async (req, res) => {
  try {
    const lease = await Lease.findByIdAndDelete(req.params.id);
    if (!lease) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
