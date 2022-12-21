import React, { useState } from "react";
import { Card, CardMedia, Grid } from "@mui/material";
import { Box } from "@mui/system";
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
    <Grid item lg={4} md={6} xs={12} onClick={onClick}>
      <Card
        sx={{
          border: "1px solid yellow",
          borderRadius: "10px",
          cursor: "pointer",
          ":hover": { transform: "scale(1.05)" },
        }}
      >
        <CardMedia
          component="img"
          src={image}
          style={{ objectFit: "cover" }}
          alt={name}
        />
        {(isShowDetails || window.innerWidth < 800) && (
          <CardContent
            style={{
              backgroundColor: "#00000050",
              height: "30%",
              width: "100%",
              position: "absolute",
              bottom: "0px",
              padding: "0 10px",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
          </CardContent>
        )}
      </Card>
    </Grid>
  );
};

export default ImageCard;
