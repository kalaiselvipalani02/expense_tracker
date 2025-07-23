const express = require("express");
const router = express.Router();
const { getAuditLog } = require("../controllers/auditController");
const { protect, isAdmin } = require("../middleware/userMiddleware");

router.get("/", protect, isAdmin, getAuditLog);

module.exports = router;
