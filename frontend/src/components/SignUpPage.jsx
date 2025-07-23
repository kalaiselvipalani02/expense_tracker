import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (
        formData.name === "" ||
        formData.email === "" ||
        formData.password === ""
      ) {
        setError("Please enter name , email and password");
        return;
      }

      setLoading(true);
      setError("");
      const response = await register(formData);

      const { token, ...user } = response;

      // Check if response contains token and user
      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setLoading(false);
        navigate("/dashboard");
      } else {
        setLoading(false);
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      setError(
        error.response?.data?.message ||
          error.message ||
          "SingUp failed. Please try again."
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
      <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
        <Typography variant="h5" mb={2}>
          Sign Up
        </Typography>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
        />
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
          onClick={handleSignUp}
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Sign Up"}
        </Button>
        <Typography variant="body2" mt={2} textAlign="center">
          Already have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignUpPage;
