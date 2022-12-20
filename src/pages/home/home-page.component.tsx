import { Grid } from "@mui/material";
import React from "react";
import ImageCard from "../../components/image-card/image-card.component";
import EpisodesImage from "../../assets/rickandmortyrun.jpg";
import LocationsImage from "../../assets/portal.jpg";
import CharactersImage from "../../assets/characters.jpg";
import { Outlet } from "react-router-dom";
type Props = {};

const Home = (props: Props) => {
  return (
    <>
      <Grid
        sx={{ height: "100vh" }}
        container
        justifyContent="space-around"
        alignItems="center"
      >
        <ImageCard image={CharactersImage} />
        <ImageCard image={EpisodesImage} />
        <ImageCard image={LocationsImage} />
      </Grid>
      <Outlet />
    </>
  );
};

export default Home;
