const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Property = require("../models/Property");
const logAction = require("../middleware/auditLog");

// Create property
router.post("/", auth("admin"), async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    await logAction({
      user: req.user,
      action: "create",
      entityType: "Property",
      entityId: property._id,
      details: req.body,
      ip: req.ip,
    });
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all properties with pagination
router.get("/", auth(), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const [properties, total] = await Promise.all([
      Property.find().skip(skip).limit(limit),
      Property.countDocuments(),
    ]);
    res.json({
      data: properties,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get property by ID
router.get("/:id", auth(), async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Not found" });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update property
router.put(":id", auth("admin"), async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!property) return res.status(404).json({ message: "Not found" });
    await logAction({
      user: req.user,
      action: "update",
      entityType: "Property",
      entityId: property._id,
      details: req.body,
      ip: req.ip,
    });
    res.json(property);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete property
router.delete(":id", auth("admin"), async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ message: "Not found" });
    await logAction({
      user: req.user,
      action: "delete",
      entityType: "Property",
      entityId: property._id,
      details: {},
      ip: req.ip,
    });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
