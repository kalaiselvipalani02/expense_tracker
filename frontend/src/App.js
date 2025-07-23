import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import SignUpPage from "./components/SignUpPage";
import AdminDashboard from "./components/AdminDashboard";
import Analytics from "./components/Analytics";
import AuditLog from "./components/AuditLog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/category" element={<Analytics />} />
      <Route path="/auditlogs" element={<AuditLog />} />
    </Routes>
  );
}

export default App;
