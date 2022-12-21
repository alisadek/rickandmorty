import { AutocompleteInputChangeReason, Grid, Typography } from "@mui/material";
import React from "react";
import { Maybe } from "../../__generated__/graphql";
import SearchBar from "../search-bar/search-bar.component";

type Option = { title: string; value: string };

type Props = {
  name?: Maybe<string>;
  loading: boolean;
  onChange: (event: any) => void;
  options: Option[] | undefined;
};

const SideNav = (props: Props) => {
  const { name, loading, onChange, options } = props;
  return (
    <Grid item bgcolor="#121111c2" xs={2}>
      <SearchBar options={options} onInputChange={onChange} loading={loading} />
      <Typography variant="h4" component="div" color="white">
        {name}
      </Typography>
    </Grid>
  );
};

export default SideNav;
