const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const auditRoutes = require("./routes/auditRoutes");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

//call db connection
connectDB();

app.get("/", (req, res) => res.send("API running..."));

//user routes
app.use("/api/users", userRoutes);

//expense routes
app.use("/api/expenses", expenseRoutes);

//analytics routes
app.use("/api/analytics", analyticsRoutes);

//auditLog routes
app.use("/api/audit", auditRoutes);
//server run
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
