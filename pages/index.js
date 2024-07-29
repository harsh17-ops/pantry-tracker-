// pages/index.js
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        backgroundColor: "#f0f4f8",
        padding: 3,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h2" gutterBottom sx={{ color: "#1976d2", fontWeight: 600 }}>
          Pantry Tracker
        </Typography>
        <Typography variant="h5" gutterBottom>
          Developed by Jeet Dekivadia
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ color: "#555" }}>
          Tech Stack: Next.js, React.js, Firebase, MUI, Framer Motion
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ color: "#333", marginY: 2 }}>
          Welcome to Pantry Tracker! Manage your pantry with ease and get personalized recipe suggestions. Track your items, manage quantities, and explore new recipes based on the ingredients you have.
        </Typography>
        
        <Grid container spacing={3} justifyContent="center" sx={{ marginY: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 2, backgroundColor: "#fff" }}>
              <Typography variant="h6" sx={{ fontWeight: 500, marginBottom: 1 }}>
                Key Features
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                • Add and manage pantry items
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                • View items expiring soon
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                • Get recipe suggestions based on available ingredients
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Typography variant="body1" gutterBottom sx={{ color: "#333", marginY: 2 }}>
          To get started, click on the "Sign Up" button to create an account, or "Login" if you already have one.
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button variant="contained" color="primary" href="/auth" sx={{ width: '200px' }}>
            Sign Up
          </Button>
          <Button variant="outlined" color="secondary" href="/auth" sx={{ width: '200px' }}>
            Login
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
}
