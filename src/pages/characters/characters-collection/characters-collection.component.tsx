import Grid from "@mui/material/Grid";
import React from "react";
import LoadingCard from "../../../components/card/card-loading.component";
import MediaCard from "../../../components/card/card.component";
import { Character, Maybe } from "../../../__generated__/graphql";

type Props = {
  characters?: Maybe<Maybe<Character>[]>;
  loading?: boolean;
};

const LOADING_LIST = Array(20).fill(0, 0);
const CharactersCollection = (props: Props) => {
  const { loading, characters } = props;

  return (
    <Grid
      sx={{ color: "#fff", maxHeight: "90vh" }}
      container
      spacing={3}
      item
      paddingTop={5}
    >
      {loading
        ? LOADING_LIST.map(() => <LoadingCard />)
        : characters?.map((char) => (
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

export default CharactersCollection;
