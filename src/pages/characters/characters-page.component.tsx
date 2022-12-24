import React, { useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import { GET_CHARACTERS } from "../../queries.graphql";
import { Characters as CharactersType } from "../../__generated__/graphql";
import { useQuery } from "@apollo/client";
import { Pagination } from "@mui/material";
import SideNav from "../../components/side-nav/side-nav.component";
import { debounce } from "lodash";
import CharactersCollection from "./characters-collection/characters-collection.component";
import Stack from "@mui/material/Stack";
import { Filters } from "../../components/types";

type Props = {};
const Characters = (props: Props) => {
  const [selectedPage, setSelectedPage] = useState<number | null>();
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [activeFilters, setActiveFilters] = useState<Filters>({
    status: "",
    species: "",
    gender: "",
  });
  const handleFilterChange = (filter: Filters) => {
    setActiveFilters({ ...activeFilters, ...filter });
  };
  const clearFilters = () => {
    setActiveFilters({
      status: "",
      species: "",
      gender: "",
    });
  };
  const { data, loading, error } = useQuery<{ characters: CharactersType }>(
    GET_CHARACTERS,
    {
      variables: {
        page: selectedPage,
        name: searchValue,
        status: activeFilters.status,
        species: activeFilters.species,
        gender: activeFilters.gender,
      },
    }
  );
  const handleChange = (e: React.ChangeEvent<unknown>, value: number) =>
    setSelectedPage(value);

  if (error) <p style={{ color: "#fff" }}>{`${error?.message}`}</p>;

  const handleSearchChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    setSearchValue(value);
  };
  const searchDelayed = debounce(handleSearchChange, 200);
  const options = useMemo(
    () =>
      data?.characters?.results?.map((char) => ({
        label: char?.name as string,
        value: {
          id: char?.id,
          name: char?.name,
          image: char?.image,
          status: char?.status,
          species: char?.species,
          gender: char?.gender,
        },
      })),
    [data]
  );
  useEffect(() => {
    console.log("Active Filters: ", activeFilters);
  }, [activeFilters]);
  return (
    <Grid container xs={12} height="95vh">
      <Grid container item xs={2}>
        <SideNav
          loading={loading}
          placeholder="Search Characters"
          withFilters
          onFilterChange={handleFilterChange}
          activeFilters={activeFilters}
          onSearchInputChange={searchDelayed}
          clearFilters={clearFilters}
          inputValue={searchValue}
          options={options}
        />
      </Grid>
      <Grid container item xs={10} paddingX={5}>
        <Stack height="100%" width="100%">
          <CharactersCollection
            characters={data?.characters?.results}
            loading={loading}
          />
          <Pagination
            sx={{ position: "absolute", bottom: "20px", right: "20px" }}
            variant="outlined"
            count={data?.characters.info?.pages as number}
            onChange={handleChange}
            page={selectedPage || 1}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Characters;
