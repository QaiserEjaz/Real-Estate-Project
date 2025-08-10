const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    lease: { type: mongoose.Schema.Types.ObjectId, ref: "Lease" },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["paid", "pending", "failed"],
      default: "pending",
    },
    method: {
      type: String,
      enum: ["stripe", "paypal", "manual"],
      default: "manual",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
