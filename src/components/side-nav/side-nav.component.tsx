import { Grid, SelectChangeEvent, Typography } from "@mui/material";
import React from "react";
import { Maybe } from "../../__generated__/graphql";
import SearchBar from "../search-bar/search-bar.component";
import { Option } from "../types";

type Props = {
  name?: Maybe<string>;
  loading: boolean;
  onSearchInputChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => void;
  options: Option<unknown>[] | undefined;
  onSelectChange: (event: SelectChangeEvent, value: any) => void;
  inputValue?: string;
  selectedValue?: Option<unknown>;
  placeholder?: string;
};

const SideNav = (props: Props) => {
  const {
    name,
    loading,
    onSearchInputChange,
    onSelectChange,
    options,
    selectedValue,
    inputValue,
    placeholder,
  } = props;
  return (
    <Grid item bgcolor="#121111c2" xs={2} height="100%" padding={3}>
      <SearchBar
        options={options}
        placeholder={placeholder}
        onInputChange={onSearchInputChange}
        inputValue={inputValue}
        value={selectedValue}
        onSelectChange={onSelectChange}
        loading={loading}
      />
      <Typography variant="h4" component="div" color="white">
        {name}
      </Typography>
    </Grid>
  );
};

export default SideNav;
