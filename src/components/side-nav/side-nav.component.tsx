import { Grid, SelectChangeEvent } from "@mui/material";
import React from "react";
import SearchBar from "../search-bar/search-bar.component";
import { Option } from "../types";

type Props = {
  loading: boolean;
  onSearchInputChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => void;
  options: Option<unknown>[] | undefined;
  onSelectChange?: (event: SelectChangeEvent, value: any) => void;
  inputValue?: string;
  selectedValue?: Option<unknown>;
  placeholder?: string;
};

const SideNav = (props: Props) => {
  const {
    loading,
    onSearchInputChange,
    onSelectChange,
    options,
    selectedValue,
    inputValue,
    placeholder,
  } = props;
  return (
    <Grid xs={12} item bgcolor="#121111c2" height="100%" padding={3}>
      <SearchBar
        options={options}
        placeholder={placeholder}
        onInputChange={onSearchInputChange}
        inputValue={inputValue}
        value={selectedValue}
        onSelectChange={onSelectChange}
        loading={loading}
      />
    </Grid>
  );
};

export default SideNav;
