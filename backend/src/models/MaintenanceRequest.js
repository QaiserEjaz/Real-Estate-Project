const mongoose = require("mongoose");

const maintenanceRequestSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" },
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant" },
    title: { type: String, required: true },
    description: String,
    status: {
      type: String,
      enum: ["open", "in_progress", "resolved", "closed"],
      default: "open",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        message: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    attachments: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("MaintenanceRequest", maintenanceRequestSchema);
