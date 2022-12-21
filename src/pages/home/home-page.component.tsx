import { Grid } from "@mui/material";
import React from "react";
import ImageCard from "../../components/image-card/image-card.component";
import EpisodesImage from "../../assets/rickandmortyrun.jpg";
import LocationsImage from "../../assets/portal.jpg";
import CharactersImage from "../../assets/characters.jpg";
import { Outlet, useNavigate } from "react-router-dom";
type Props = {};

const Home = (props: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <Grid
        sx={{ height: "80vh" }}
        p={10}
        container
        alignItems="center"
        spacing={20}
      >
        <ImageCard
          onClick={() => navigate("characters")}
          image={CharactersImage}
          name="characters"
        />
        <ImageCard
          onClick={() => navigate("episodes")}
          image={EpisodesImage}
          name="episodes"
        />
        <ImageCard
          onClick={() => navigate("locations")}
          image={LocationsImage}
          name="locations"
        />
      </Grid>

      <Outlet />
    </>
  );
};

export default Home;
