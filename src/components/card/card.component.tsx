import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Maybe } from "../../__generated__/graphql";
import { CardContent, Chip } from "@mui/material";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";

type Props = {
  image?: Maybe<string>;
  name?: Maybe<string>;
  species?: Maybe<string>;
  status?: Maybe<string>;
};

type Status = "Alive" | "Dead" | "Unknown";
type TColor =
  | "success"
  | "error"
  | "warning"
  | "default"
  | "primary"
  | "secondary"
  | "info";
const statusColor: Record<Status, TColor> = {
  Alive: "success",
  Dead: "error",
  Unknown: "warning",
};

export default function MediaCard(props: Props) {
  const { image, name, species, status } = props;
  const [isShowDetails, setIsShowDetails] = React.useState(false);
  const handleMouseEnter = () => {
    setIsShowDetails(true);
  };
  const handleMouseLeave = () => {
    setIsShowDetails(false);
  };
  React.useEffect(() => {
    console.log("Is Show:", isShowDetails);
  }, [isShowDetails]);
  return (
    <Grid xl={1.7} lg={3} md={4} sm={6} xs={12} item>
      <Card
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          ":hover": { transform: "scale(1.05)" },
          position: "relative",
          backgroundColor: "transparent",
          color: "#fff",
        }}
      >
        <CardActionArea sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            src={`${image}` as string}
            alt={name as string}
          />
          <Chip
            sx={{
              position: "absolute",
              right: "10px",
              top: "10px",
            }}
            color={statusColor[status as Status]}
            label={status}
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
              <Typography variant="body1">Species: {species}</Typography>
            </CardContent>
          )}
        </CardActionArea>

        {/* <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2">Species: {species}</Typography>
      </CardContent> */}
      </Card>
    </Grid>
  );
}
