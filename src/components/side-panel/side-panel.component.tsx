import { Grid, SelectChangeEvent, Stack } from "@mui/material";
import React from "react";
import FilterAccordion from "../filter-accordion/filter-accordion.component";
import SearchBar from "../search-bar/search-bar.component";
import { Filters, Option } from "../types";

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
  onFilterChange?: (filter: Filters) => void;
  setFilters?: React.Dispatch<React.SetStateAction<string[]>>;
  activeFilters?: Filters;
  withFilters?: boolean;
  clearFilters?: () => void;
};

const SidePanel = (props: Props) => {
  const {
    loading,
    onSearchInputChange,
    onSelectChange,
    options,
    selectedValue,
    placeholder,
    activeFilters,
    onFilterChange,
    clearFilters,
    withFilters = false,
  } = props;
  return (
    <Stack
      padding={2}
      spacing={3}
      bgcolor="#121111c2"
      width="100%"
      justifyContent="start"
    >
      <SearchBar
        options={options}
        placeholder={placeholder}
        onInputChange={onSearchInputChange}
        value={selectedValue}
        onSelectChange={onSelectChange}
        loading={loading}
      />
      {withFilters && (
        <FilterAccordion
          activeFilters={activeFilters}
          onFilterValueChanged={onFilterChange}
          clearFilters={clearFilters}
        />
      )}
    </Stack>
  );
};

export default SidePanel;
