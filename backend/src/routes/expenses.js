const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Expense = require("../models/Expense");
const Property = require("../models/Property");
const Unit = require("../models/Unit");
const { Parser } = require("json2csv");

// Create expense (admin/manager)
router.post("/", auth(["admin", "manager"]), async (req, res) => {
  try {
    const expense = new Expense({ ...req.body, createdBy: req.user.id });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// List expenses (filter by property/unit)
router.get("/", auth(), async (req, res) => {
  try {
    const { property, unit } = req.query;
    const filter = {};
    if (property) filter.property = property;
    if (unit) filter.unit = unit;
    const expenses = await Expense.find(filter).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete expense (admin/manager)
router.delete("/:id", auth(["admin", "manager"]), async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Export expenses as CSV
router.get("/export/csv", auth(), async (req, res) => {
  try {
    const expenses = await Expense.find();
    const fields = [
      "_id",
      "property",
      "unit",
      "amount",
      "date",
      "category",
      "description",
      "paidTo",
    ];
    const parser = new Parser({ fields });
    const csv = parser.parse(expenses);
    res.header("Content-Type", "text/csv");
    res.attachment("expenses.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
