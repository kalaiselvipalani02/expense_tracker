import React, { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import {
  Typography,
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import {
  categoryAnalytics,
  monthlyAnalytics,
  logout,
} from "../services/authService";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const drawerWidth = 30;

const Analytics = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const fetchInsights = async () => {
    try {
      const [catRes, monthRes] = await Promise.all([
        await categoryAnalytics(),
        await monthlyAnalytics(),
      ]);

      setCategoryData(catRes);

      const formattedMonthly = monthRes.map((item) => {
        const month = item._id.month;
        const monthIndex = parseInt(month, 10);

        const monthNames = [
          "",
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        return {
          month: monthNames[monthIndex], // "Jul"
          total: item.totalAmount, // 4199
        };
      });

      setMonthlyData(formattedMonthly);
    } catch (error) {
      console.error("Error loading insights:", error);
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUsername(userData.name);
    fetchInsights();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Box p={4} sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Welcome, {username}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar /> {/* Spacer to push content below AppBar */}
        <Typography variant="h4" mb={2}>
          Admin Dashboard - Charts
        </Typography>
        <Typography variant="h6">Total Expenses per Category</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalAmount" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
        <Typography variant="h6">Expenses Over Time (Monthly)</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#f57c00" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default Analytics;
