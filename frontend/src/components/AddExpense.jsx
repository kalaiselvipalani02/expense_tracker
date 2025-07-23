import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { createNewExpense } from "../services/authService";
const AddExpense = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState({ title: "", amount: "", category: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !form.category || !form.date) {
      setError("Please fill all required fields.");
      return;
    }
    setError("");
    const response = await createNewExpense(form);
    console.log(response);
    if (response.message) {
      onClose();
      setForm({
        title: "",
        amount: "",
        category: "",
        date: "",
        description: "",
      });
      onSubmit();
    } else {
      setError(response?.message || "Something went wrong");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          p: 4,
          boxShadow: 24,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Add New Expense
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Amount"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          type="number"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          variant="outlined"
          focused
        />
        <TextField
          fullWidth
          margin="normal"
          label="Notes"
          name="description"
          value={form.description || ""}
          onChange={handleChange}
          multiline
          rows={3}
        />
        <input
          type="file"
          name="receipt"
          label="Upload Bill"
          accept="image/*,.pdf"
          onChange={(e) => setForm({ ...form, receipt: e.target.files[0] })}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default AddExpense;
