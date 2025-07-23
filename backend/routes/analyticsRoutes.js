const express = require("express");
const { isAdmin, protect } = require("../middleware/userMiddleware");
const router = express.Router();
const {
  getCategorySummary,
  getMonthlySummary,
} = require("../controllers/analyticsController");

router.get("/category-summary", protect, isAdmin, getCategorySummary);
router.get("/monthly-summary", protect, isAdmin, getMonthlySummary);

module.exports = router;
