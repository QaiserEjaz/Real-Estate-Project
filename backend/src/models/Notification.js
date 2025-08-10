const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["system", "maintenance", "payment", "lease", "other"],
      default: "system",
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    data: { type: Object },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
