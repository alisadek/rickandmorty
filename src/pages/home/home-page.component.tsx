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
        container
        xs={12}
        justifyContent="center"
        alignItems="center"
        minHeight="95vh"
      >
        <Grid
          justifyContent="center"
          alignItems="center"
          container
          xs={10}
          spacing={10}
        >
          <Grid item lg={4} xs={12}>
            <ImageCard
              onClick={() => navigate("/characters")}
              image={CharactersImage}
              name="Characters"
            />
          </Grid>
          <Grid item lg={4} xs={12}>
            <ImageCard
              onClick={() => navigate("/episodes")}
              image={EpisodesImage}
              name="Episodes"
            />
          </Grid>
          <Grid item lg={4} xs={12}>
            <ImageCard
              onClick={() => navigate("/locations")}
              image={LocationsImage}
              name="Locations"
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
