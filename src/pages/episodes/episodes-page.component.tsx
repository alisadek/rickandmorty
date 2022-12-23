import React, { useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import { GET_EPISODES } from "../../queries.graphql";
import {
  Character,
  Episode,
  Episodes,
  Maybe,
} from "../../__generated__/graphql";
import MediaCard from "../../components/card/card.component";
import { useQuery } from "@apollo/client";
import { SelectChangeEvent, Stack, Typography } from "@mui/material";
import LoadingCard from "../../components/card/card-loading.component";
import SideNav from "../../components/side-nav/side-nav.component";
import { Option } from "../../components/types";
import Pagination from "@mui/material/Pagination";

type Props = {};
const Characters = (props: Props) => {
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [selectedEpisode, setSelectedEpisode] =
    useState<Option<Episode> | null>();
  const recordsPerPage = 21;
  const [selectedPage, setSelectedPage] = useState(1);
  const numOfPages = useMemo(() => {
    if (selectedEpisode)
      return Math.ceil(
        selectedEpisode?.value.characters.length / recordsPerPage
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
    const newChars = selectedEpisode?.value?.characters.slice(
      recordsPerPage * selectedPage - recordsPerPage,
      recordsPerPage * selectedPage
    );

    setCharacters(newChars);
  }, [selectedEpisode, selectedPage]);
  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) =>
    setSelectedPage(value);
  const handleSearchChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    setSearchValue(value);
  };
  const handleSelectChange = (e: SelectChangeEvent, value: Option<Episode>) => {
    setSelectedEpisode(value);
  };
  const LOADING_LIST = Array(20).fill(0, 0);
  if (epError) <p style={{ color: "#fff" }}>{`${epError?.message}`}</p>;
  return (
    <Grid container xs={12} height="95vh">
      <SideNav
        loading={epLoading}
        placeholder="Select Episode"
        onSearchInputChange={handleSearchChange}
        onSelectChange={handleSelectChange}
        inputValue={searchValue}
        options={options}
        name={epData?.episodes?.results?.[0]?.name}
      />
      {!selectedEpisode ? (
        <Grid alignItems="center" justifyContent="center" container xs={10}>
          <Typography variant="h4" color="white">
            Select an Episode
          </Typography>
        </Grid>
      ) : (
        <Grid item container xs={10} paddingX={5}>
          <Stack width="100%">
            <Stack>
              <Typography variant="h3" color="white">
                {selectedEpisode?.value.name}
              </Typography>
              <Typography variant="h5" color="white">
                {`Episode: ${selectedEpisode?.value.episode}`}
              </Typography>
              <Typography variant="h5" color="white">
                {`Created: ${
                  selectedEpisode?.value.created &&
                  new Date(selectedEpisode?.value.created).toLocaleDateString()
                }`}
              </Typography>
            </Stack>
            <Grid
              sx={{ color: "#fff", maxHeight: "90vh" }}
              container
              spacing={3}
              paddingTop={5}
              justifyContent="flex-start"
              justifySelf="flex-start"
            >
              {epLoading
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
