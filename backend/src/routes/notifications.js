const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Notification = require("../models/Notification");

// Create notification (admin or system)
router.post("/", auth("admin"), async (req, res) => {
  try {
    const notif = new Notification(req.body);
    await notif.save();
    res.status(201).json(notif);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// List notifications for current user
router.get("/", auth(), async (req, res) => {
  try {
    const notifs = await Notification.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(notifs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mark notification as read
router.patch("/:id/read", auth(), async (req, res) => {
  try {
    const notif = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { read: true },
      { new: true }
    );
    if (!notif) return res.status(404).json({ message: "Not found" });
    res.json(notif);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete notification
router.delete("/:id", auth("admin"), async (req, res) => {
  try {
    const notif = await Notification.findByIdAndDelete(req.params.id);
    if (!notif) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
