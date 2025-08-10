const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema(
  {
    property: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
    number: { type: String, required: true },
    floorPlan: String,
    available: { type: Boolean, default: true },
    amenities: [String],
    rentalRate: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Unit", unitSchema);
