import { Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Trip Planner Admin
      </Typography>
      <Typography variant="body1" paragraph>
        Manage and create exciting tour packages with ease.
      </Typography>
      <Box mt={4} display="flex" flexDirection="column" gap={2}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/create-package")}
        >
          Create Packages
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => navigate("/manage-packages")}
        >
          Manage Packages
        </Button>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={() => navigate("/view-packages")}
        >
          View Packages
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;