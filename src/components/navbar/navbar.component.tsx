import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
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
            <img
              onClick={() => navigate("/")}
              src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg"
              alt="logo"
              style={{ objectFit: "contain", cursor: "pointer" }}
              width="100px"
            />
          </Grid>
          <Grid
            width="40%"
            justifyContent="flex-end"
            container
            gap={4}
            flexWrap="nowrap"
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
