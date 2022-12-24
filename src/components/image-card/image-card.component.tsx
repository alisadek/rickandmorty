import React, { useState } from "react";
import { Card, CardMedia, Grid } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
type Props = {
  image: string;
  name?: string;
  onClick: () => void;
};

const ImageCard = (props: Props) => {
  const { image, name, onClick } = props;
  const [isShowDetails, setIsShowDetails] = useState(false);
  return (
    <Card
      sx={{
        border: "1px solid yellow",
        borderRadius: "10px",
        cursor: "pointer",
        ":hover": { transform: "scale(1.05)" },
        height: window.innerWidth < 800 ? "200px" : "",
      }}
      onClick={onClick}
      onMouseEnter={() => {
        setIsShowDetails(true);
      }}
      onMouseLeave={() => {
        setIsShowDetails(false);
      }}
    >
      <CardMedia
        component="img"
        src={image}
        sx={{ objectFit: "cover" }}
        alt={name}
      />
      {isShowDetails && (
        <CardContent
          sx={{
            backgroundColor: "#00000050",
            height: "100%",
            width: "100%",
            position: "absolute",
            bottom: "0px",
            padding: "0 10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom variant="h3" component="div">
            {name}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default ImageCard;
