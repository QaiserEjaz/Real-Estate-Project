const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Payment = require("../models/Payment");

// Create payment
router.post("/", auth("admin"), async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all payments
router.get("/", auth(), async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get payment by ID
router.get("/:id", auth(), async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: "Not found" });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update payment
router.put("/:id", auth("admin"), async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!payment) return res.status(404).json({ message: "Not found" });
    res.json(payment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete payment
router.delete("/:id", auth("admin"), async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
