import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Outlet, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#000" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Grid container>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Button sx={{ color: "#fff", alignItems: "center" }}>Home</Button>
          </Grid>
          <Grid
            width="40%"
            justifyContent="flex-end"
            container
            gap={4}
            flexDirection="row"
          >
            <Button
              color="inherit"
              variant="text"
              onClick={() => navigate("characters")}
            >
              Characters
            </Button>
            <Button
              color="inherit"
              variant="text"
              onClick={() => navigate("episodes")}
            >
              Episodes
            </Button>
            <Button
              color="inherit"
              variant="text"
              onClick={() => navigate("locations")}
            >
              Locations
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}
