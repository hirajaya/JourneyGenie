import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/packages")
      .then((response) => response.json())
      .then((data) => setPackages(data))
      .catch((error) => console.error("Error fetching packages:", error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/packages/${id}`, { method: "DELETE" });
      setPackages(packages.filter((pkg) => pkg._id !== id));
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Manage Packages
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Package Name</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Price ($)</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packages.map((pkg) => (
              <TableRow key={pkg._id}>
                <TableCell>{pkg.name}</TableCell>
                <TableCell>{pkg.destination}</TableCell>
                <TableCell>{pkg.price}</TableCell>
                <TableCell>
                  <IconButton color="secondary" onClick={() => handleDelete(pkg._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ManagePackages;
