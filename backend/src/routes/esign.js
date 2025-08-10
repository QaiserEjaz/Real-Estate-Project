const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Document = require("../models/Document");

// Initiate e-signature request (placeholder)
router.post("/:id/esign", auth("admin"), async (req, res) => {
  try {
    // In a real integration, call DocuSign/HelloSign API here
    const { provider, signerEmail } = req.body;
    const doc = await Document.findByIdAndUpdate(
      req.params.id,
      {
        esignStatus: "pending",
        esignProvider: provider,
        esignSignerEmail: signerEmail,
        esignEnvelopeId: "placeholder-envelope-id",
      },
      { new: true }
    );
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json({ message: "E-signature request initiated (placeholder)", doc });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mark document as signed (simulate callback)
router.post("/:id/esign/complete", auth("admin"), async (req, res) => {
  try {
    const doc = await Document.findByIdAndUpdate(
      req.params.id,
      {
        esignStatus: "signed",
        esignSignedAt: new Date(),
      },
      { new: true }
    );
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Document marked as signed (placeholder)", doc });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
