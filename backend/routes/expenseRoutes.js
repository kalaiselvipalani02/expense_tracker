const express = require("express");
const router = express.Router();
const {
  createExpense,
  getExpenses,
  updateExpenseStatus,
} = require("../controllers/expenseController");
const { protect, isAdmin } = require("../middleware/userMiddleware");
const upload = require("../middleware/upload");

// All routes require login
router.post("/", protect, upload.single("receipt"), createExpense);
// get expense
router.get("/", protect, getExpenses);

router.put("/:id/status", protect, isAdmin, updateExpenseStatus);

module.exports = router;
