import { Box, Grid, Skeleton } from "@mui/material";

import React from "react";

type Props = {};

const LoadingCard = (props: Props) => {
  return (
    <Grid xl={1.7} lg={3} md={4} sm={6} xs={12} item>
      <Skeleton variant="rectangular" animation="pulse" height="60%" />

      <Box sx={{ pt: 0.5 }}>
        <Skeleton />
        <Skeleton width="60%" />
      </Box>
    </Grid>
  );
};

export default LoadingCard;
