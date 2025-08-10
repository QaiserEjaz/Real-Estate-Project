const mongoose = require("mongoose");

const leaseSchema = new mongoose.Schema(
  {
    property: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant" },
    startDate: Date,
    endDate: Date,
    rent: Number,
    status: {
      type: String,
      enum: ["active", "expired", "terminated"],
      default: "active",
    },
    documents: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lease", leaseSchema);
