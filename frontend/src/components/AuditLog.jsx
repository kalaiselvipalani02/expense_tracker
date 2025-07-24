import React, { useEffect, useState } from "react";
import { getAuditLogs, logout } from "../services/authService";
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  CssBaseline,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";

import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import HeaderBar from "./HeaderBar";

const drawerWidth = 30;

const AuditLog = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUsername(userData.name);
    const fetchLogs = async () => {
      try {
        const data = await getAuditLogs();
        console.log(data);
        setLogs(data);
      } catch (error) {
        console.error("Failed to fetch audit logs:", error);
      }
    };
    setLoading(false);
    fetchLogs();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Box p={4} sx={{ display: "flex" }}>
      <CssBaseline />
      <HeaderBar username={username} />
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
          Admin Dashboard - Audit Logs
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                    Action
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                    Message
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                    User
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                    Expense
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                    Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.map((log, index) => (
                  <TableRow
                    key={log._id}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                    }}
                  >
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.message}</TableCell>
                    <TableCell>{log.userId?.name || "N/A"}</TableCell>
                    <TableCell>
                      {log.expenseId
                        ? `${log.expenseId.category} ($${log.expenseId.amount})`
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {new Date(log.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default AuditLog;
