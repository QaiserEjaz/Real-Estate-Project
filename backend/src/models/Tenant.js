const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" },
    lease: { type: mongoose.Schema.Types.ObjectId, ref: "Lease" },
    documents: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tenant", tenantSchema);
