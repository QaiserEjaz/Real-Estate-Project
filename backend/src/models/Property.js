const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    description: String,
    images: [String],
    amenities: [String],
    rentalRate: Number,
    units: [{ type: mongoose.Schema.Types.ObjectId, ref: "Unit" }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
