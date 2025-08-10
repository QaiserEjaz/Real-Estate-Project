const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Setting = require("../models/Setting");

// Get all settings
router.get("/", auth("admin"), async (req, res) => {
  try {
    const settings = await Setting.find();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get setting by key
router.get("/:key", auth("admin"), async (req, res) => {
  try {
    const setting = await Setting.findOne({ key: req.params.key });
    if (!setting) return res.status(404).json({ message: "Not found" });
    res.json(setting);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create or update setting
router.post("/", auth("admin"), async (req, res) => {
  try {
    const { key, value, description } = req.body;
    const setting = await Setting.findOneAndUpdate(
      { key },
      { value, description },
      { upsert: true, new: true }
    );
    res.status(201).json(setting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete setting
router.delete("/:key", auth("admin"), async (req, res) => {
  try {
    const setting = await Setting.findOneAndDelete({ key: req.params.key });
    if (!setting) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
