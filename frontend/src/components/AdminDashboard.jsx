import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  CircularProgress,
  Grid,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextField,
  AppBar,
  Toolbar,
  CssBaseline,
} from "@mui/material";
import { getExpense, updateStatus, logout } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const drawerWidth = 30;
const AdminDashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [username, setUsername] = useState("");

  const [filters, setFilters] = useState({
    status: "",
    category: "",
    startDate: "",
    endDate: "",
  });

  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleStatusChange = async (id, status) => {
    await updateStatus(id, status);
    fetchExpenses();
  };
  const applyFilters = async () => {
    try {
      setLoading(true);

      const queryParams = new URLSearchParams(filters).toString();

      const res = await getExpense(queryParams);
      setExpenses(res);
    } catch (error) {
      console.error("Error fetching filtered expenses:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchExpenses = async () => {
    try {
      const res = await getExpense();

      setLoading(false);
      setExpenses(res);
    } catch (error) {
      console.error("Error loading expenses:", error);
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUsername(userData.name);
    fetchExpenses();
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
          Admin Dashboard - All User Expenses
        </Typography>
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={filters.status}
                label="Status"
                onChange={handleFilterChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              name="category"
              label="Category"
              value={filters.category}
              onChange={handleFilterChange}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              name="startDate"
              type="date"
              label="Start Date"
              value={filters.startDate}
              variant="outlined"
              onChange={handleFilterChange}
              focused
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              name="endDate"
              type="date"
              label="End Date"
              value={filters.endDate}
              variant="outlined"
              onChange={handleFilterChange}
              focused
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" onClick={applyFilters}>
              Apply Filters
            </Button>
          </Grid>
        </Grid>
        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                    User Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                    Title
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                    Amount
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                    Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.map((exp, index) => (
                  <TableRow
                    key={exp._id}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                    }}
                  >
                    <TableCell>{exp.createdBy?.name}</TableCell>
                    <TableCell>{exp.createdBy?.email}</TableCell>
                    <TableCell>{exp.title}</TableCell>
                    <TableCell>₹{exp.amount}</TableCell>
                    <TableCell>
                      {new Date(exp.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={selectedStatuses[exp._id] ?? exp.status}
                        name="expenseStatus"
                        onChange={(e) =>
                          setSelectedStatuses({
                            ...selectedStatuses,
                            [exp._id]: e.target.value,
                          })
                        }
                      >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Approved">Approved</MenuItem>
                        <MenuItem value="Rejected">Rejected</MenuItem>
                      </Select>
                      <Button
                        onClick={() =>
                          handleStatusChange(
                            exp._id,
                            selectedStatuses[exp._id] ?? exp.status
                          )
                        }
                      >
                        Change Status
                      </Button>
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

export default AdminDashboard;
