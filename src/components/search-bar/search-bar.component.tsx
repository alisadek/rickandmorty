import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, {
  AutocompleteInputChangeReason,
} from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

type Option = { title: string; value: string };
type Props = {
  loading: boolean;
  options: Option[] | undefined;
  onInputChange: (event: React.SyntheticEvent<Element, Event>) => void;
};
export default function SearchBar(props: Props) {
  const { loading, options, onInputChange } = props;

  return (
    <Autocomplete
      id="asynchronous-search-bar"
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      options={options || [{ title: "", value: "" }]}
      onInputChange={onInputChange}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search..."
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
