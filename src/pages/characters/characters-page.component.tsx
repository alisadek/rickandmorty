import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { GET_ALL_CHARACTERS } from "../../queries.graphql";
import { Characters as CharactersType } from "../../__generated__/graphql";
import MediaCard from "../../components/card/card.component";
import { useQuery } from "@apollo/client";
import { Pagination, Stack } from "@mui/material";
import LoadingCard from "../../components/card/card-loading.component";

type Props = {};

const Characters = (props: Props) => {
  const [selectedPage, setSelectedPage] = useState(1);
  const { data, loading, error } = useQuery<{ characters: CharactersType }>(
    GET_ALL_CHARACTERS,
    { variables: { page: selectedPage } }
  );
  const handleChange = (e: React.ChangeEvent<unknown>, value: number) =>
    setSelectedPage(value);

  const LOADING_LIST = Array(20).fill(0, 0);
  console.log(LOADING_LIST);
  if (error) <p style={{ color: "#fff" }}>{`${error?.message}`}</p>;

  return (
    <Stack sx={{ height: "92vh" }} justifyContent="space-between" paddingX={5}>
      <Grid
        sx={{ color: "#fff", height: "90vh", overflowY: "" }}
        container
        spacing={3}
        paddingTop={5}
      >
        {loading
          ? LOADING_LIST.map(() => <LoadingCard />)
          : data?.characters?.results?.map((char) => (
              <MediaCard
                key={char?.id}
                image={char?.image}
                name={char?.name}
                species={char?.species}
                status={char?.status}
              />
            ))}
      </Grid>

      <Pagination
        sx={{ alignSelf: "flex-end" }}
        variant="outlined"
        count={42}
        onChange={handleChange}
        page={selectedPage}
      />
    </Stack>
  );
};

export default Characters;
