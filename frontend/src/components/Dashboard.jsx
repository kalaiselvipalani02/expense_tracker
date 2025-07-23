import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Toolbar,
  AppBar,
  CssBaseline,
  Container,
  Paper,
} from "@mui/material";
import { getExpense, logout } from "../services/authService";
import AddExpense from "./AddExpense";
import ExpenseList from "./ExpenseList";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const fetchExpenses = async (user) => {
    const data = await getExpense(user);
    setExpenses(data);
  };

  const handleAddExpense = async (form) => {
    setOpen(false);
    fetchExpenses(); // Refresh the list
  };

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    setUsername(user.name);
    fetchExpenses(user);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Welcome, {username}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" mb={2}>
            Dashboard
          </Typography>

          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{ mb: 3 }}
          >
            Add Expense
          </Button>

          <AddExpense
            open={open}
            onClose={() => setOpen(false)}
            onSubmit={handleAddExpense}
          />

          <ExpenseList expenses={expenses} />
        </Paper>
      </Container>
    </Box>
  );
};

export default Dashboard;
