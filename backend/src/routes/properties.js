const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Property = require("../models/Property");

// Create property
router.post("/", auth("admin"), async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all properties
router.get("/", auth(), async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
router.put("/:id", auth("admin"), async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!property) return res.status(404).json({ message: "Not found" });
    res.json(property);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete property
router.delete("/:id", auth("admin"), async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
