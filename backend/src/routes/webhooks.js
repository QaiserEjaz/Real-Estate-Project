const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");

// Stripe/PayPal webhook endpoint (placeholder)
router.post(
  "/payment",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      // In a real integration, verify signature and parse event
      // Example: const event = req.body; (for Stripe, use stripe.webhooks.constructEvent)
      const event = req.body; // Placeholder
      // Simulate event type and payment ID
      const { eventType, paymentId, status } = event;
      if (eventType === "payment_intent.succeeded" || status === "paid") {
        await Payment.findByIdAndUpdate(paymentId, { status: "paid" });
      } else if (
        eventType === "payment_intent.payment_failed" ||
        status === "failed"
      ) {
        await Payment.findByIdAndUpdate(paymentId, { status: "failed" });
      }
      res.status(200).json({ received: true });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

module.exports = router;
