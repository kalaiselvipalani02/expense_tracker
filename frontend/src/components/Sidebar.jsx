import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Toolbar,
  Box,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Chart", path: "/category" },
    { label: "Expense List", path: "/admindashboard" },
    { label: "Audit Log", path: "/auditlogs" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.label}
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
