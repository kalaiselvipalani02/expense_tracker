const Expense = require("../models/Expense");
const createAuditLog = require("../utils/createAuditLog");

//get  expenses
const getExpenses = async (req, res) => {
  const { _id, role } = req.query;

  try {
    let filter = req.user.role === "admin" ? {} : { createdBy: req.user.id };

    const { status, category, startDate, endDate } = req.query;

    // Apply filters
    if (status && status !== "all") {
      filter.status = status;
    }

    if (category) {
      filter.category = category;
    }

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const expenses = await Expense.find(filter)
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email");
    console.log(expenses);
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//create expense
const createExpense = async (req, res) => {
  const { title, amount, category, date, description } = req.body;
  console.log(req.file.path);
  const receiptUrl = req.file ? req.file.path : null;
  try {
    const expense = await Expense.create({
      title,
      amount,
      category,
      date,
      description,
      createdBy: req.user.id,
      receiptUrl,
    });

    await createAuditLog(
      "CREATE_EXPENSE",
      "Expense created",
      expense.id,
      req.user.id
    );
    res.status(201).json({
      message: "Expense created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update expense status
const updateExpenseStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    expense.status = status;
    await expense.save();
    await createAuditLog(
      "UPDATE_STATUS",
      `Status Updated ${status} for expense ${expense.title} `,
      expense.id,
      req.user.id
    );
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getExpenses, createExpense, updateExpenseStatus };
