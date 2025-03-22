import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
} from "@mui/material";

const ViewPackages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/packages") // Fetch from backend
      .then((response) => response.json())
      .then((data) => setPackages(data))
      .catch((error) => console.error("Error fetching packages:", error));
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: "30px" }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Available Tour Packages
      </Typography>
      <Grid container spacing={3}>
        {packages.map((pkg) => (
          <Grid item xs={12} sm={6} md={4} key={pkg._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={pkg.image || "https://source.unsplash.com/400x300/?travel"}
                alt={pkg.name}
              />
              <CardContent>
                <Typography variant="h6">{pkg.name}</Typography>
                <Typography color="textSecondary">{pkg.destination}</Typography>
                <Typography variant="body2">Price: ${pkg.price}</Typography>
                <Button variant="contained" color="primary" fullWidth>
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ViewPackages;
