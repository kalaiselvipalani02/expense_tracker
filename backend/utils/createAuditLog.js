const AuditLog = require("../models/AuditLog");

const createAuditLog = async (action, message, expenseId, userId) => {
  const auditLog = new AuditLog({ action, message, expenseId, userId });

  try {
    await AuditLog.create({
      action,
      message,
      expenseId,
      userId,
    });
  } catch (error) {
    console.log("Audit log creation failed:", error.message);
  }
};

module.exports = createAuditLog;
