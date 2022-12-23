import React, { useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import { GET_EPISODES } from "../../queries.graphql";
import {
  Character,
  Episode,
  Episodes,
  Maybe,
} from "../../__generated__/graphql";
import { useQuery } from "@apollo/client";
import { SelectChangeEvent, Stack, Typography } from "@mui/material";
import SideNav from "../../components/side-nav/side-nav.component";
import { Option } from "../../components/types";
import Pagination from "@mui/material/Pagination";
import { debounce } from "lodash";
import { getCharsPerPage, getNumOfPages } from "../../utils/pagination.utils";
import CharactersCollection from "../characters/characters-collection/characters-collection.component";
import EpisodeInfo from "./episode-info/episode-info.component";

type Props = {};
const Characters = (props: Props) => {
  const [searchValue, setSearchValue] = useState<string | undefined>("");
  const [selectedEpisode, setSelectedEpisode] = useState<Option<Episode>>();
  const recordsPerPage = 21;
  const [selectedPage, setSelectedPage] = useState(1);
  const numOfPages = useMemo(() => {
    if (selectedEpisode)
      return getNumOfPages(
        recordsPerPage,
        selectedEpisode?.value.characters.length
      );
  }, [selectedEpisode]);
  const {
    data: epData,
    loading: epLoading,
    error: epError,
  } = useQuery<{ episodes: Episodes }>(GET_EPISODES, {
    variables: { name: searchValue },
  });
  const [characters, setCharacters] = useState<Maybe<Character>[]>();
  const options = useMemo(
    () =>
      epData?.episodes?.results?.map((episode) => ({
        label: episode?.name as string,
        value: {
          id: episode?.id,
          created: episode?.created,
          name: episode?.name,
          episode: episode?.episode,
          characters: episode?.characters,
        },
      })),
    [epData]
  );
  useEffect(() => {
    setSelectedPage(1);
  }, [selectedEpisode]);
  useEffect(() => {
    const newChars =
      selectedEpisode &&
      getCharsPerPage(
        selectedEpisode?.value?.characters,
        recordsPerPage,
        selectedPage
      );
    setCharacters(newChars);
  }, [selectedEpisode, selectedPage]);

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) =>
    setSelectedPage(value);

  const handleSelectChange = (e: SelectChangeEvent, value: Option<Episode>) => {
    setSelectedEpisode(value);
  };
  if (epError) <p style={{ color: "#fff" }}>{`${epError?.message}`}</p>;
  const handleSearchChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    setSearchValue(value);
  };
  const searchDelayed = debounce(handleSearchChange, 200);

  return (
    <Grid container xs={12} height="95vh">
      <Grid container item xs={2}>
        <SideNav
          loading={epLoading}
          placeholder="Search Episode"
          onSearchInputChange={searchDelayed}
          onSelectChange={handleSelectChange}
          inputValue={searchValue}
          options={options}
        />
      </Grid>

      {!selectedEpisode ? (
        <Grid
          xs={10}
          alignItems="center"
          justifyContent="center"
          container
          item
        >
          <Typography variant="h4" color="white">
            Select an Episode
          </Typography>
        </Grid>
      ) : (
        <Grid xs={10} item container paddingX={5}>
          <Stack width="100%">
            <EpisodeInfo episode={selectedEpisode?.value} />
            <CharactersCollection characters={characters} loading={epLoading} />
            {selectedEpisode?.value.characters.length > recordsPerPage && (
              <Pagination
                sx={{ position: "absolute", bottom: "20px", right: "40px" }}
                variant="outlined"
                count={numOfPages || 0}
                onChange={handlePageChange}
                page={selectedPage}
              />
            )}
          </Stack>
        </Grid>
      )}
    </Grid>
  );
};

export default Characters;
