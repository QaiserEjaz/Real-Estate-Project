const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    category: { type: String, required: true },
    description: String,
    paidTo: String,
    document: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
