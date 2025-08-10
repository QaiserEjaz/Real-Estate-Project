const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const MaintenanceRequest = require("../models/MaintenanceRequest");

// Create maintenance request (tenant or admin)
router.post("/", auth(), async (req, res) => {
  try {
    const request = new MaintenanceRequest(req.body);
    await request.save();
    res.status(201).json(request);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all maintenance requests (admin/manager)
router.get("/", auth("admin"), async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find()
      .populate("property unit tenant")
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get maintenance request by ID
router.get("/:id", auth(), async (req, res) => {
  try {
    const request = await MaintenanceRequest.findById(req.params.id).populate(
      "property unit tenant"
    );
    if (!request) return res.status(404).json({ message: "Not found" });
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update maintenance request (admin/manager)
router.put("/:id", auth("admin"), async (req, res) => {
  try {
    const request = await MaintenanceRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!request) return res.status(404).json({ message: "Not found" });
    res.json(request);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete maintenance request (admin/manager)
router.delete("/:id", auth("admin"), async (req, res) => {
  try {
    const request = await MaintenanceRequest.findByIdAndDelete(req.params.id);
    if (!request) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
