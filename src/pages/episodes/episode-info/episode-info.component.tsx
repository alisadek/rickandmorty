import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import { Episode } from "../../../__generated__/graphql";

type Props = {
  episode: Episode;
};

const EpisodeInfo = (props: Props) => {
  const { episode } = props;
  return (
    <Stack>
      <Typography variant="h3" color="white">
        {episode.name}
      </Typography>
      <Typography variant="h5" color="white">
        {`Episode: ${episode.episode}`}
      </Typography>
      <Typography variant="h5" color="white">
        {`Created: ${
          episode.created && new Date(episode.created).toLocaleDateString()
        }`}
      </Typography>
    </Stack>
  );
};

export default EpisodeInfo;
