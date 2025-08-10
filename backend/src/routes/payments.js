const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Payment = require("../models/Payment");
const logAction = require("../middleware/auditLog");

// Create payment
router.post("/", auth("admin"), async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    await logAction({
      user: req.user,
      action: "create",
      entityType: "Payment",
      entityId: payment._id,
      details: req.body,
      ip: req.ip,
    });
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all payments with pagination
router.get("/", auth(), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const [payments, total] = await Promise.all([
      Payment.find().skip(skip).limit(limit),
      Payment.countDocuments(),
    ]);
    res.json({
      data: payments,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
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
router.put(":id", auth("admin"), async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!payment) return res.status(404).json({ message: "Not found" });
    await logAction({
      user: req.user,
      action: "update",
      entityType: "Payment",
      entityId: payment._id,
      details: req.body,
      ip: req.ip,
    });
    res.json(payment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete payment
router.delete(":id", auth("admin"), async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) return res.status(404).json({ message: "Not found" });
    await logAction({
      user: req.user,
      action: "delete",
      entityType: "Payment",
      entityId: payment._id,
      details: {},
      ip: req.ip,
    });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
