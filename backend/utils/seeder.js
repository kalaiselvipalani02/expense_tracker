const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const User = require("../models/User"); // Your Mongoose models
const Expense = require("../models/Expense");
const AuditLog = require("../models/AuditLog");
const connectDB = require("../config/db");

const seed = async () => {
  try {
    await connectDB();
    await User.deleteMany();
    await Expense.deleteMany();
    await AuditLog.deleteMany();

    /*await User.insertMany([
    {
      name: "Admin User",
      email: "admin@example.com",
      password: "hashed_password",
      role: "admin",
    },
    {
      name: "Kalai",
      email: "kalai@example.com",
      password: "hashed_password",
      role: "user",
    },
  ]); */

    const [admin, kalai] = await User.insertMany([
      {
        name: "Admin User",
        email: "admin@example.com",
        password:
          "$2b$10$8Y7GCjguN0BIL8axgycKsOtorx9re6UQvBPv07VAdN.36TPJ1ibPG", // hash before insert in real use
        role: "admin",
      },
      {
        name: "Kalai",
        email: "kalai@example.com",
        password:
          "$2b$10$8Y7GCjguN0BIL8axgycKsOtorx9re6UQvBPv07VAdN.36TPJ1ibPG",
        role: "employee",
      },
    ]);

    /*await Expense.insertMany([
    {
      title: "Grocery Shopping",
      amount: 1500,
      category: "Food",
      description: "Weekly groceries at Big Bazaar",
      date: new Date("2025-07-01"),
      status: "Pending",
      createdBy: "64b0011001abcdef000002", // Replace with a valid User _id
      receiptUrl: "",
    },
    {
      title: "Electricity Bill",
      amount: 1200,
      category: "Bills",
      description: "June month TNEB bill payment",
      date: new Date("2025-07-05"),
      status: "Approved",
      createdBy: "64b0011001abcdef000002",
      receiptUrl: "",
    },
    {
      title: "Bus Travel to Chennai",
      amount: 500,
      category: "Travel",
      description: "Bus ticket to attend a client meeting",
      date: new Date("2025-07-10"),
      status: "Rejected",
      createdBy: "64b0011001abcdef000002",
      receiptUrl: "",
    },
    {
      title: "Internet Bill",
      amount: 999,
      category: "Utilities",
      description: "July month ACT Fibernet",
      date: new Date("2025-07-15"),
      status: "Approved",
      createdBy: "64b0011001abcdef000002",
      receiptUrl: "",
    },

    // ...other expenses
  ]); */
    const [grocery, electricity, bus, internet] = await Expense.insertMany([
      {
        title: "Grocery Shopping",
        amount: 1500,
        category: "Food",
        description: "Weekly groceries at Big Bazaar",
        date: new Date("2025-07-01"),
        status: "Pending",
        createdBy: kalai._id,
        receiptUrl: "",
      },
      {
        title: "Electricity Bill",
        amount: 1200,
        category: "Bills",
        description: "June month TNEB bill payment",
        date: new Date("2025-07-05"),
        status: "Approved",
        createdBy: kalai._id,
        receiptUrl: "",
      },
      {
        title: "Bus Travel to Chennai",
        amount: 500,
        category: "Travel",
        description: "Bus ticket to attend a client meeting",
        date: new Date("2025-07-10"),
        status: "Rejected",
        createdBy: kalai._id,
        receiptUrl: "",
      },
      {
        title: "Internet Bill",
        amount: 999,
        category: "Utilities",
        description: "July month ACT Fibernet",
        date: new Date("2025-07-15"),
        status: "Approved",
        createdBy: kalai._id,
        receiptUrl: "",
      },
    ]);
    await AuditLog.insertMany([
      {
        action: "CREATE_EXPENSE",
        message: "Created expense: Grocery Shopping",
        expenseId: grocery._id,
        userId: kalai._id,
        createdAt: new Date("2025-07-01T10:30:00Z"),
      },
      {
        action: "UPDATE_STATUS",
        message: "Approved expense: Electricity Bill",
        expenseId: electricity._id,
        userId: admin._id,
        createdAt: new Date("2025-07-05T11:45:00Z"),
      },
      {
        action: "UPDATE_STATUS",
        message: "Rejected expense: Bus Travel to Chennai",
        expenseId: bus._id,
        userId: admin._id,
        createdAt: new Date("2025-07-10T12:15:00Z"),
      },
    ]);
    /*await AuditLog.insertMany([
    {
      action: "CREATE_EXPENSE",
      message: "Created expense: Grocery Shopping",
      expenseId: "64b0011001abcdef100001", // Replace with real Expense _id
      userId: "64b0011001abcdef000002", // Kalai's user _id
      createdAt: new Date("2025-07-01T10:30:00Z"),
    },
    {
      action: "UPDATE_STATUS",
      message: "Approved expense: Electricity Bill",
      expenseId: "64b0011001abcdef100002",
      userId: "64b0011001abcdef000001", // Admin's user _id
      createdAt: new Date("2025-07-05T11:45:00Z"),
    },
    {
      action: "UPDATE_STATUS",
      message: "Rejected expense: Bus Travel to Chennai",
      expenseId: "64b0011001abcdef100003",
      userId: "64b0011001abcdef000001",
      createdAt: new Date("2025-07-10T12:15:00Z"),
    },
  ]);
*/
    console.log("✅ Seed data inserted");
  } catch (error) {
    console.error("❌ Error inserting seed data:", error);
    mongoose.connection.close();
  }
};

seed();
