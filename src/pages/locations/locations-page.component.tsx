import React, { useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import { GET_LOCATIONS } from "../../queries.graphql";
import {
  Character,
  Location,
  Locations,
  Maybe,
} from "../../__generated__/graphql";
import { useQuery } from "@apollo/client";
import { SelectChangeEvent, Stack, Typography } from "@mui/material";
import SidePanel from "../../components/side-panel/side-panel.component";
import { Option } from "../../components/types";
import Pagination from "@mui/material/Pagination";
import { debounce } from "lodash";
import { getCharsPerPage, getNumOfPages } from "../../utils/pagination.utils";
import CharactersCollection from "../characters/characters-collection/characters-collection.component";
import LocationInfo from "./location-info/location-info.component";

type Props = {};
const LocationsPage = (props: Props) => {
  const [searchValue, setSearchValue] = useState<string | undefined>("");
  const [selectedLocation, setSelectedLocation] = useState<Option<Location>>();
  const recordsPerPage = 21;
  const [selectedPage, setSelectedPage] = useState(1);
  const numOfPages = useMemo(() => {
    if (selectedLocation)
      return getNumOfPages(
        recordsPerPage,
        selectedLocation?.value.residents.length
      );
  }, [selectedLocation]);
  const { data, loading, error } = useQuery<{ locations: Locations }>(
    GET_LOCATIONS,
    {
      variables: { name: searchValue },
    }
  );
  const [characters, setCharacters] = useState<Maybe<Character>[]>();
  const options = useMemo(
    () =>
      data?.locations?.results?.map((location) => ({
        label: location?.name as string,
        value: {
          id: location?.id,
          created: location?.created,
          name: location?.name,
          dimension: location?.dimension,
          residents: location?.residents,
          type: location?.type,
        },
      })),
    [data]
  );
  useEffect(() => {
    setSelectedPage(1);
  }, [selectedLocation]);
  useEffect(() => {
    const newChars =
      selectedLocation &&
      getCharsPerPage(
        selectedLocation?.value?.residents,
        recordsPerPage,
        selectedPage
      );
    setCharacters(newChars);
  }, [selectedLocation, selectedPage]);
  useEffect(() => {
    console.log("DATA: ", data);
  }, [data]);
  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) =>
    setSelectedPage(value);

  const handleSelectChange = (
    e: SelectChangeEvent,
    value: Option<Location>
  ) => {
    setSelectedLocation(value);
  };
  if (error) <p style={{ color: "#fff" }}>{`${error?.message}`}</p>;
  const handleSearchChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    setSearchValue(value);
  };
  const searchDelayed = debounce(handleSearchChange, 200);

  return (
    <Grid container xs={12} height="95vh">
      <Grid container item xs={2} height="100%">
        <SidePanel
          loading={loading}
          placeholder="Search Location"
          onSearchInputChange={searchDelayed}
          onSelectChange={handleSelectChange}
          inputValue={searchValue}
          options={options}
        />
      </Grid>

      {!selectedLocation ? (
        <Grid
          xs={10}
          alignItems="center"
          justifyContent="center"
          container
          item
        >
          <Typography variant="h4" color="white">
            Select a Location
          </Typography>
        </Grid>
      ) : (
        <Grid xs={10} item container paddingX={5}>
          <Stack width="100%">
            <LocationInfo location={selectedLocation?.value} />
            <CharactersCollection characters={characters} loading={loading} />
            {selectedLocation?.value.residents.length > recordsPerPage && (
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

export default LocationsPage;
