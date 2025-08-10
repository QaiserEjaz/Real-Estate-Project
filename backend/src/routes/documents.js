const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const auth = require("../middleware/auth");
const Document = require("../models/Document");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Upload document
router.post("/upload", auth(), upload.single("file"), async (req, res) => {
  try {
    const { relatedType, relatedId } = req.body;
    const doc = new Document({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      uploadedBy: req.user.id,
      relatedType,
      relatedId,
    });
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Download document
router.get("/:id/download", auth(), async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    const filePath = path.join(__dirname, "../../uploads", doc.filename);
    res.download(filePath, doc.originalName);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// List documents (optionally filter by relatedType/relatedId)
router.get("/", auth(), async (req, res) => {
  try {
    const { relatedType, relatedId } = req.query;
    const filter = {};
    if (relatedType) filter.relatedType = relatedType;
    if (relatedId) filter.relatedId = relatedId;
    const docs = await Document.find(filter).sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete document
router.delete("/:id", auth("admin"), async (req, res) => {
  try {
    const doc = await Document.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    // Delete file from disk
    const fs = require("fs");
    const filePath = require("path").join(
      __dirname,
      "../../uploads",
      doc.filename
    );
    fs.unlink(filePath, (err) => {
      // Ignore file not found errors
      res.json({ message: "Deleted" });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
