import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import { Location } from "../../../__generated__/graphql";

type Props = {
  location: Location;
};

const LocationInfo = (props: Props) => {
  const { location } = props;
  return (
    <Stack>
      <Typography variant="h3" color="white">
        {location.name}
      </Typography>
      <Typography variant="h5" color="white">
        {`Dimension: ${location.dimension}`}
      </Typography>
      <Typography variant="h5" color="white">
        {`Created: ${
          location.created && new Date(location.created).toLocaleDateString()
        }`}
      </Typography>
      <Typography variant="h5" color="white">
        {`Type: ${location.type}`}
      </Typography>
    </Stack>
  );
};

export default LocationInfo;
