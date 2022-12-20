import React from "react";
import Grid from "@mui/material/Grid";
import { GET_ALL_CHARACTERS } from "../../queries.graphql";
import { Characters as CharactersType } from "../../__generated__/graphql";
import MediaCard from "../../components/card/card.component";
import { useQuery } from "@apollo/client";

type Props = {};

const Characters = (props: Props) => {
  console.log("GET ALL CHARS:", GET_ALL_CHARACTERS);
  const { data, loading, error } = useQuery<{ characters: CharactersType }>(
    GET_ALL_CHARACTERS
  );
  const URL = `${process.env.REACT_APP_API_URL}`;
  console.log(URL);
  console.log(data);
  if (loading) return <p style={{ color: "#FFF" }}>Loading...</p>;
  if (error)
    return (
      <>
        <p style={{ color: "#fff" }}>{`${error.message}`}</p>
      </>
    );
  return (
    <Grid
      sx={{ color: "#fff" }}
      container
      spacing={3}
      paddingX={5}
      paddingTop={5}
    >
      {data?.characters?.results?.map((char) => (
        <MediaCard
          key={char?.id}
          image={char?.image}
          name={char?.name}
          species={char?.species}
          status={char?.status}
        />
      ))}
    </Grid>
  );
};

export default Characters;
