const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: { type: String, required: true },
    entityType: { type: String, required: true },
    entityId: { type: mongoose.Schema.Types.ObjectId },
    details: mongoose.Schema.Types.Mixed,
    ip: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);
