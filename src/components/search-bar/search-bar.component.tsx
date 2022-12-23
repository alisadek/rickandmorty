import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { Option } from "../types";

type Props = {
  loading: boolean;
  options: Option<unknown>[] | undefined;
  onSelectChange: (event: any, value: Option<unknown> | null) => void;
  value?: Option<unknown>;
  inputValue?: string;
  placeholder?: string;
  onInputChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => void;
};
export default function SearchBar(props: Props) {
  const {
    loading,
    options,
    onInputChange,
    onSelectChange,
    placeholder = "Search...",
  } = props;

  return (
    <Autocomplete
      id="asynchronous-search-bar"
      isOptionEqualToValue={(option, value) => option.label === value.label}
      getOptionLabel={(option) => option.label}
      options={options || [{ label: "", value: "" }]}
      onInputChange={onInputChange}
      value={props.value}
      inputValue={props.inputValue}
      placeholder={placeholder || "Search..."}
      onChange={onSelectChange}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={placeholder}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
