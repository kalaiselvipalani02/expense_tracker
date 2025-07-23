import axios from "axios";

const API_URL = "http://localhost:4000/api/users";
const EXPENSE_URL = "http://localhost:4000/api/expenses";
const ANALYTICS_URL = "http://localhost:4000/api/analytics";
const AUDITLOG_URL = "http://localhost:4000/api/audit";

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data; // includes token, user info, etc.
};

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const getExpense = async (queryParams) => {
  const token = localStorage.getItem("token");

  const queryString = new URLSearchParams(queryParams).toString();
  const response = await axios.get(`${EXPENSE_URL}?${queryString}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateStatus = async (expenseId, status) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    `${EXPENSE_URL}/${expenseId}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
export const logout = () => {
  localStorage.removeItem("token"); // Clear token from storage
  localStorage.removeItem("user");
};

export const categoryAnalytics = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${ANALYTICS_URL}/category-summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const monthlyAnalytics = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${ANALYTICS_URL}/monthly-summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getAuditLogs = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${AUDITLOG_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createNewExpense = async (expenseData) => {
  const res = await axios.post(`${EXPENSE_URL}`, expenseData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};
