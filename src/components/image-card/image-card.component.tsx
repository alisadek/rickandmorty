import React from "react";
import { Box } from "@mui/material";
type Props = {
  image: string;
};

const ImageCard = (props: Props) => {
  const { image } = props;
  return (
    <Box
      sx={{
        width: "23%",
        height: "70%",
        border: "1px solid yellow",
        borderRadius: "10px",
        cursor: "pointer",
        ":hover": { transform: "scale(1.05)" },
      }}
    >
      <img
        src={image}
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
        alt="Episodes"
      />
    </Box>
  );
};

export default ImageCard;
