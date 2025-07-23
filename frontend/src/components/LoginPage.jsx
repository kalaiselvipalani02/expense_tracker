import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (formData.email === "" || formData.password === "") {
        setError("Please enter email and password");
        return;
      }
      setLoading(true);
      setError("");
      const response = await login(formData);

      const { token, ...user } = response;

      // Check if response contains token and user
      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setLoading(false);
        if (user.role === "admin") navigate("/category");
        else navigate("/dashboard");
      } else {
        setLoading(false);
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Login failed. Please try again."
      );
    }
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} sx={{ padding: 4, width: 300 }}>
        <Typography variant="h5" mb={2}>
          Login
        </Typography>
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
        />
        {error && (
          <Typography color="error" fontSize="0.875rem" mt={1}>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Login"}
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;
