import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { GET_ALL_CHARACTERS, GET_EPISODES } from "../../queries.graphql";
import {
  Characters as CharactersType,
  Episode,
  Episodes,
} from "../../__generated__/graphql";
import MediaCard from "../../components/card/card.component";
import { useQuery } from "@apollo/client";
import { Pagination, Stack, Typography } from "@mui/material";
import LoadingCard from "../../components/card/card-loading.component";
import SideNav from "../../components/side-nav/side-nav.component";

type Props = {};

const Characters = (props: Props) => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const {
    data: charData,
    loading: charLoading,
    error: charError,
  } = useQuery<{ characters: CharactersType }>(GET_ALL_CHARACTERS, {
    variables: { page: selectedPage },
  });
  const {
    data: epData,
    loading: epLoading,
    error: epError,
  } = useQuery<{ episodes: Episodes }>(GET_EPISODES, {
    variables: { name: searchValue },
  });
  const handleChange = (e: React.ChangeEvent<unknown>, value: number) =>
    setSelectedPage(value);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
  };
  const handleSelectChange = (e: React.ChangeEvent<unknown>) => {
    const { value } = e.target;
    setSelectedEpisode({ name: value });
  };
  const LOADING_LIST = Array(20).fill(0, 0);
  if (epError || charError)
    <p style={{ color: "#fff" }}>{`${
      epError?.message || charError?.message
    }`}</p>;
  React.useEffect(() => {
    console.log("Episodes:", epData);
  }, [epData]);
  return (
    <Grid container>
      <SideNav
        loading={epLoading}
        onChange={handleSearchChange}
        options={epData?.episodes?.results?.map((episode) => ({
          title: episode?.name as string,
          value: episode?.name as string,
        }))}
        name={epData?.episodes?.results?.[0]?.name}
      />
      <Grid item container justifyContent="space-between" xs={10} paddingX={5}>
        <Grid
          sx={{ color: "#fff", height: "90vh" }}
          container
          spacing={3}
          paddingTop={5}
        >
          {charLoading
            ? LOADING_LIST.map(() => <LoadingCard />)
            : charData?.characters?.results?.map((char) => (
                <MediaCard
                  key={char?.id}
                  image={char?.image}
                  name={char?.name}
                  species={char?.species}
                  status={char?.status}
                />
              ))}
        </Grid>
        {/* 
        <Pagination
          sx={{ alignSelf: "flex-end" }}
          variant="outlined"
          count={42}
          onChange={handleChange}
          page={selectedPage}
        /> */}
      </Grid>
    </Grid>
  );
};

export default Characters;
