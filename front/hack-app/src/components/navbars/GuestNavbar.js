import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

export default function GuestNavbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ImpactXchange2024
        </Typography>
        <Box>
          <Button color="inherit" href="/login">Login</Button>
          <Button color="inherit" href="/register">Register</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
