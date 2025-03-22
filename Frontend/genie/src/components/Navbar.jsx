import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Journey Genie
        </Typography>
        <Button color="inherit" onClick={() => navigate("/")}>
          Home
        </Button>
        <Button color="inherit" onClick={() => navigate("/create-package")}>
          Create Package
        </Button>
        <Button color="inherit" onClick={() => navigate("/manage-packages")}>
          Manage Packages
        </Button>
        <Button color="inherit" onClick={() => navigate("/view-packages")}>
          View Packages
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
    