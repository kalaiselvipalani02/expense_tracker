const Expense = require("../models/Expense");

const getCategorySummary = async (req, res) => {
  try {
    const expenses = await Expense.aggregate([
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// getMonthly   Summary
const getMonthlySummary = async (req, res) => {
  try {
    const expenses = await Expense.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);
    res.status(200).json(expenses);
  } catch (error) {
    res.status;
  }
};

module.exports = {
  getCategorySummary,
  getMonthlySummary,
};
