const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    originalName: String,
    mimetype: String,
    size: Number,
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    relatedType: {
      type: String,
      enum: ["lease", "maintenance", "property", "tenant", "other"],
      default: "other",
    },
    relatedId: { type: mongoose.Schema.Types.ObjectId },
    // E-signature integration fields
    esignStatus: {
      type: String,
      enum: ["none", "pending", "signed", "declined", "error"],
      default: "none",
    },
    esignProvider: {
      type: String,
      enum: ["none", "docusign", "hellosign"],
      default: "none",
    },
    esignEnvelopeId: String,
    esignSignerEmail: String,
    esignSignedAt: Date,
    esignError: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);
