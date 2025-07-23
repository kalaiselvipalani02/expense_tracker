import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Typography,
} from "@mui/material";

const ExpenseList = ({ expenses }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        No expense records found.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
              Title
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
              Category
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
              Amount
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
              Status
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
              Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((exp) => (
            <TableRow key={exp._id}>
              <TableCell>{exp.title}</TableCell>
              <TableCell>{exp.category}</TableCell>
              <TableCell>₹{exp.amount}</TableCell>
              <TableCell>{exp.status || "Pending"}</TableCell>
              <TableCell>{new Date(exp.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseList;
