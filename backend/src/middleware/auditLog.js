const AuditLog = require("../models/AuditLog");

async function logAction({ user, action, entityType, entityId, details, ip }) {
  try {
    await AuditLog.create({
      user: user?.id,
      action,
      entityType,
      entityId,
      details,
      ip,
    });
  } catch (err) {
    // Optionally log error
  }
}

module.exports = logAction;
