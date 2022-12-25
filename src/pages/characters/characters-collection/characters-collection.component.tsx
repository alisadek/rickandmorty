import Grid from "@mui/material/Grid";
import React from "react";
import { useNavigate } from "react-router-dom";
import LoadingCard from "../../../components/card/card-loading.component";
import MediaCard from "../../../components/card/card.component";
import { Character, Maybe } from "../../../__generated__/graphql";

type Props = {
  characters?: Maybe<Maybe<Character>[]>;
  loading?: boolean;
};

const LOADING_LIST = Array(21).fill(0, 0);
const CharactersCollection = (props: Props) => {
  const { loading, characters } = props;
  const navigate = useNavigate();
  return (
    <Grid sx={{ color: "#fff" }} container spacing={3} item paddingTop={5}>
      {loading
        ? LOADING_LIST.map((v, idx) => (
            <Grid
              key={idx}
              xl={1.7}
              lg={3}
              md={4}
              sm={6}
              xs={12}
              item
              flexGrow={0}
            >
              <LoadingCard />
            </Grid>
          ))
        : characters?.map((char) => (
            <MediaCard
              key={char?.id}
              image={char?.image}
              name={char?.name}
              species={char?.species}
              status={char?.status}
              onClick={(id) => {
                navigate(`/character/${char?.id}`);
              }}
            />
          ))}
    </Grid>
  );
};

export default CharactersCollection;
