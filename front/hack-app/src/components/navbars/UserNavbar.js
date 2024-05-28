import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

export default function UserNavbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ImpactXchange2024
        </Typography>
        <Box>
          <Button color="inherit" href="/teams">Teams</Button>
          <Button color="inherit" href="/members">Members</Button>
          <Button color="inherit" href={"/members/" + sessionStorage.getItem("id")}>
            My Profile
          </Button>
          <Button color="inherit" href="/logout">Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
