const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Property = require("../models/Property");
const Unit = require("../models/Unit");
const Tenant = require("../models/Tenant");
const Lease = require("../models/Lease");
const Payment = require("../models/Payment");
const User = require("../models/User");
const { Parser } = require("json2csv");

// Dashboard summary (admin/owner)
router.get("/summary", auth(), async (req, res) => {
  try {
    const [
      propertyCount,
      unitCount,
      tenantCount,
      leaseCount,
      paymentCount,
      totalRent,
      paidRent,
    ] = await Promise.all([
      Property.countDocuments(),
      Unit.countDocuments(),
      Tenant.countDocuments(),
      Lease.countDocuments(),
      Payment.countDocuments(),
      Lease.aggregate([{ $group: { _id: null, total: { $sum: "$rent" } } }]),
      Payment.aggregate([
        { $match: { status: "paid" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
    ]);
    res.json({
      properties: propertyCount,
      units: unitCount,
      tenants: tenantCount,
      leases: leaseCount,
      payments: paymentCount,
      totalRent: totalRent[0]?.total || 0,
      paidRent: paidRent[0]?.total || 0,
      occupancyRate: unitCount ? (leaseCount / unitCount) * 100 : 0,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Export payments as CSV (admin)
router.get("/payments/export", auth("admin"), async (req, res) => {
  try {
    const payments = await Payment.find().populate("lease");
    const fields = ["_id", "amount", "date", "status", "method", "lease"];
    const parser = new Parser({ fields });
    const csv = parser.parse(payments);
    res.header("Content-Type", "text/csv");
    res.attachment("payments.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Owner dashboard summary
router.get("/owner/summary", auth("owner"), async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.id });
    const propertyIds = properties.map((p) => p._id);
    const units = await Unit.find({ property: { $in: propertyIds } });
    const leases = await Lease.find({ property: { $in: propertyIds } });
    const payments = await Payment.find({
      lease: { $in: leases.map((l) => l._id) },
    });
    res.json({
      properties: properties.length,
      units: units.length,
      leases: leases.length,
      payments: payments.length,
      totalRent: leases.reduce((sum, l) => sum + (l.rent || 0), 0),
      paidRent: payments
        .filter((p) => p.status === "paid")
        .reduce((sum, p) => sum + (p.amount || 0), 0),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
