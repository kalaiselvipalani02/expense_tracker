const AuditLog = require("../models/AuditLog");

const getAuditLog = async (req, res) => {
  try {
    const auditLogs = await AuditLog.find({})
      .populate("userId", "name email")
      .populate("expenseId", "amount category title")
      .sort({ createdAt: -1 });

    res.status(200).json(auditLogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAuditLog };
